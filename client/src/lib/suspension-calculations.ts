// Suspension calculation engine - converted from Python backend
// Units: SI (kg, m, N, s, rad). Frequencies in Hz. Accelerations in g.

import { SuspensionInputs, CalculationResults } from "@/types/suspension";

// Constants
const G = 9.80665; // gravity m/s²

// Helper functions
function hzFromKwheelM(kWheel: number, mass: number): number {
  // f = (1/(2π)) * sqrt(k_wheel/m)
  return (1.0 / (2.0 * Math.PI)) * Math.sqrt(kWheel / mass);
}

function ksFromFreqMassMr(freq: number, mass: number, motionRatio: number): number {
  // k_spring = ((2π f)^2 * m) / MR^2
  return ((2.0 * Math.PI * freq) ** 2 * mass) / (motionRatio ** 2);
}

function kwheelFromKsMr(kSpring: number, motionRatio: number): number {
  // k_wheel = k_spring * MR^2
  return kSpring * (motionRatio ** 2);
}

function criticalDamping(kWheel: number, mass: number): number {
  // c_crit = 2*sqrt(k_wheel * m)
  return 2.0 * Math.sqrt(kWheel * mass);
}

function axleRollStiffness(kWheelPerWheel: number, track: number): number {
  // K_phi_axle = k_wheel_per_wheel * t^2 / 2 (Nm/rad)
  return kWheelPerWheel * (track ** 2) / 2.0;
}

function rollAngleDeg(totalRollMoment: number, kphiTotal: number): [number, number] {
  // phi (rad) = M / Kphi; return [deg, rad]
  const phiRad = kphiTotal > 0 ? totalRollMoment / kphiTotal : 0.0;
  return [phiRad * (180 / Math.PI), phiRad];
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// Performance categorization functions
function categorizeRideFrequency(freq: number, vehicleType: string = "sport"): string {
  // Based on ATV performance thresholds
  if (vehicleType === "racing") {
    if (freq > 3.5) return "Excellent";
    if (freq > 3.0) return "Good";
    if (freq > 2.5) return "Neutral";
    return "Poor";
  } else if (vehicleType === "baja") {
    if (freq > 3.0) return "Excellent";
    if (freq > 2.5) return "Good";
    if (freq > 2.0) return "Neutral";
    return "Poor";
  } else if (vehicleType === "utility") {
    if (freq >= 2.0 && freq <= 2.8) return "Excellent";
    if (freq >= 1.5) return "Good";
    if (freq >= 1.0) return "Neutral";
    return "Poor";
  } else { // sport (default)
    if (freq >= 2.8 && freq <= 3.5) return "Excellent";
    if (freq >= 2.3) return "Good";
    if (freq >= 1.8) return "Neutral";
    return "Poor";
  }
}

function categorizeDampingRatio(zeta: number): string {
  if (zeta >= 0.40 && zeta <= 0.60) return "Excellent";
  if (zeta >= 0.30) return "Good";
  if (zeta >= 0.20) return "Neutral";
  return "Poor";
}

function categorizeRollGradient(rollGrad: number, vehicleType: string = "sport"): string {
  if (vehicleType === "racing") {
    if (rollGrad < 6) return "Excellent";
    if (rollGrad <= 10) return "Good";
    if (rollGrad <= 15) return "Neutral";
    return "Poor";
  } else if (vehicleType === "sport") {
    if (rollGrad < 8) return "Excellent";
    if (rollGrad <= 12) return "Good";
    if (rollGrad <= 16) return "Neutral";
    return "Poor";
  } else if (vehicleType === "baja") {
    if (rollGrad < 10) return "Excellent";
    if (rollGrad <= 14) return "Good";
    if (rollGrad <= 18) return "Neutral";
    return "Poor";
  } else { // utility
    if (rollGrad < 12) return "Excellent";
    if (rollGrad <= 16) return "Good";
    if (rollGrad <= 20) return "Neutral";
    return "Poor";
  }
}

function categorizeRollStiffnessDist(frontPercent: number): string {
  if (frontPercent >= 45 && frontPercent <= 55) return "Excellent (Balanced)";
  if ((frontPercent >= 40 && frontPercent < 45) || (frontPercent > 55 && frontPercent <= 60)) return "Good";
  if ((frontPercent >= 35 && frontPercent < 40) || (frontPercent > 60 && frontPercent <= 65)) return "Neutral";
  return "Poor";
}

function categorizeLoadTransfer(transferPercent: number, type: "lateral" | "longitudinal"): string {
  if (type === "lateral") {
    if (transferPercent < 30) return "Excellent";
    if (transferPercent <= 40) return "Good";
    if (transferPercent <= 50) return "Neutral";
    return "Poor";
  } else { // longitudinal
    if (transferPercent < 20) return "Excellent";
    if (transferPercent <= 30) return "Good";
    if (transferPercent <= 40) return "Neutral";
    return "Poor";
  }
}

function calculateRideQualityScore(
  frontFreq: number,
  rearFreq: number,
  frontZeta: number,
  rearZeta: number,
  rollGrad: number
): number {
  // Composite score based on ideal ranges
  let score = 0;
  
  // Frequency scoring (target 2.5-3.0 Hz)
  const avgFreq = (frontFreq + rearFreq) / 2;
  if (avgFreq >= 2.5 && avgFreq <= 3.0) score += 30;
  else if (avgFreq >= 2.0 && avgFreq <= 3.5) score += 20;
  else if (avgFreq >= 1.5 && avgFreq <= 4.0) score += 10;
  
  // Damping scoring (target 0.3-0.6)
  const avgZeta = (frontZeta + rearZeta) / 2;
  if (avgZeta >= 0.3 && avgZeta <= 0.6) score += 30;
  else if (avgZeta >= 0.2 && avgZeta <= 0.7) score += 20;
  else if (avgZeta >= 0.1) score += 10;
  
  // Roll gradient scoring (target < 12 deg/g)
  if (rollGrad < 8) score += 25;
  else if (rollGrad < 12) score += 20;
  else if (rollGrad < 16) score += 10;
  else if (rollGrad < 20) score += 5;
  
  // Balance bonus
  if (Math.abs(frontFreq - rearFreq) < 0.3) score += 15; // frequency balance
  
  return Math.min(100, Math.max(0, score));
}

// Main calculation function
export function calculateSuspension(inputs: SuspensionInputs): CalculationResults {
  const { vehicle, suspension, scenarios } = inputs;
  
  // Derived masses and static loads
  const mSprung = vehicle.mass * vehicle.sprungMassFraction;
  const mUnsprungTotal = vehicle.mass - mSprung;
  
  // Axle masses
  const mFrontTotal = vehicle.mass * (vehicle.weightDistribution / 100);
  const mRearTotal = vehicle.mass - mFrontTotal;
  
  // Per-corner sprung masses
  const mSprungFrontAxle = mSprung * (vehicle.weightDistribution / 100);
  const mSprungRearAxle = mSprung - mSprungFrontAxle;
  const mSprungPerWheelF = mSprungFrontAxle / 2.0;
  const mSprungPerWheelR = mSprungRearAxle / 2.0;
  
  // Unsprung masses per corner (estimated)
  const mUnsFront = suspension.unsprungMassFront;
  const mUnsRear = suspension.unsprungMassRear;
  const mUnsprungFrontAxle = 2.0 * mUnsFront;
  const mUnsprungRearAxle = 2.0 * mUnsRear;
  
  // Static vertical loads (N)
  const wTotal = vehicle.mass * G;
  const wfStatic = mFrontTotal * G;
  const wrStatic = mRearTotal * G;
  
  // Spring rates from target ride frequencies
  const kSpringF = ksFromFreqMassMr(suspension.frontRideFreq, mSprungPerWheelF, suspension.frontMotionRatio);
  const kSpringR = ksFromFreqMassMr(suspension.rearRideFreq, mSprungPerWheelR, suspension.rearMotionRatio);
  
  // Wheel rates
  const kWheelF = kwheelFromKsMr(kSpringF, suspension.frontMotionRatio);
  const kWheelR = kwheelFromKsMr(kSpringR, suspension.rearMotionRatio);
  
  // Frequency check
  const fFCheck = hzFromKwheelM(kWheelF, mSprungPerWheelF);
  const fRCheck = hzFromKwheelM(kWheelR, mSprungPerWheelR);
  
  // Damping
  const ccritF = criticalDamping(kWheelF, mSprungPerWheelF);
  const ccritR = criticalDamping(kWheelR, mSprungPerWheelR);
  const cF = suspension.frontDampingRatio * ccritF;
  const cR = suspension.rearDampingRatio * ccritR;
  
  // Roll stiffness calculations
  const kphiFSpr = axleRollStiffness(kWheelF, vehicle.frontTrack);
  const kphiRSpr = axleRollStiffness(kWheelR, vehicle.rearTrack);
  const kphiF = kphiFSpr + suspension.arbFront;
  const kphiR = kphiRSpr + suspension.arbRear;
  const kphiTotal = kphiF + kphiR || 1e-9;
  
  // Roll calculations
  const ay = scenarios.lateralAccel * G;
  const mRoll = mSprung * ay * vehicle.cgHeight;
  const [phiDeg, phiRad] = rollAngleDeg(mRoll, kphiTotal);
  const rollGradDegPerG = scenarios.lateralAccel !== 0 ? phiDeg / scenarios.lateralAccel : 0;
  const frontRollStiffFrac = kphiF / kphiTotal;
  
  // Lateral load transfer
  const hWheelCenter = 0.30; // estimated wheel center height
  const dWSprungF = (kphiF / kphiTotal) * (mSprung * ay * vehicle.cgHeight) / vehicle.frontTrack;
  const dWSprungR = (kphiR / kphiTotal) * (mSprung * ay * vehicle.cgHeight) / vehicle.rearTrack;
  const dWUnsF = (mUnsprungFrontAxle * ay * hWheelCenter) / vehicle.frontTrack;
  const dWUnsR = (mUnsprungRearAxle * ay * hWheelCenter) / vehicle.rearTrack;
  const dWF = dWSprungF + dWUnsF;
  const dWR = dWSprungR + dWUnsR;
  
  // Corner loads
  const wfInside = (wfStatic / 2.0) - (dWF / 2.0);
  const wfOutside = (wfStatic / 2.0) + (dWF / 2.0);
  const wrInside = (wrStatic / 2.0) - (dWR / 2.0);
  const wrOutside = (wrStatic / 2.0) + (dWR / 2.0);
  
  // Longitudinal weight transfer
  const axAccel = scenarios.longAccel * G;
  const axBrake = scenarios.brakingDecel * G;
  const dWAccel = (vehicle.mass * axAccel * vehicle.cgHeight) / vehicle.wheelbase;
  const dWBrake = (vehicle.mass * axBrake * vehicle.cgHeight) / vehicle.wheelbase;
  
  const wfAccel = wfStatic - dWAccel;
  const wrAccel = wrStatic + dWAccel;
  const wfBrake = wfStatic + dWBrake;
  const wrBrake = wrStatic - dWBrake;
  
  // Bump response
  const fspringBumpF = kWheelF * scenarios.bumpTravel;
  const fdamperBumpF = cF * scenarios.bumpVelocity;
  const fwheelTotalBumpF = fspringBumpF + fdamperBumpF;
  
  // Performance analysis
  const rideQualityScore = calculateRideQualityScore(
    fFCheck, fRCheck, suspension.frontDampingRatio, suspension.rearDampingRatio, rollGradDegPerG
  );
  
  const avgFreq = (fFCheck + fRCheck) / 2;
  const avgZeta = (suspension.frontDampingRatio + suspension.rearDampingRatio) / 2;
  const frontRollPercent = frontRollStiffFrac * 100;
  
  // Load transfer percentages
  const lateralTransferPercent = (dWF + dWR) / (wTotal) * 100;
  const longitudinalTransferPercent = (Math.abs(dWBrake) / wTotal) * 100;
  
  // Generate recommendation
  let recommendation = "Suspension setup ";
  const rideFreqCategory = categorizeRideFrequency(avgFreq);
  const rollGradCategory = categorizeRollGradient(rollGradDegPerG);
  const balanceCategory = categorizeRollStiffnessDist(frontRollPercent);
  
  if (rideQualityScore >= 80) {
    recommendation += "shows excellent balance between ride comfort and handling. ";
  } else if (rideQualityScore >= 60) {
    recommendation += "shows good overall performance with room for fine-tuning. ";
  } else {
    recommendation += "needs attention for optimal performance. ";
  }
  
  if (rollGradDegPerG > 15) {
    recommendation += "Consider increasing roll stiffness (ARB) to reduce body roll. ";
  }
  if (frontRollPercent > 60) {
    recommendation += "Reduce front roll stiffness for better turn-in response. ";
  } else if (frontRollPercent < 40) {
    recommendation += "Increase front roll stiffness to reduce oversteer tendency. ";
  }
  
  return {
    springsAndDamping: {
      springRateFront: Math.round(kSpringF / 1000 * 100) / 100, // Convert to kN/m
      springRateRear: Math.round(kSpringR / 1000 * 100) / 100,
      wheelRateFront: Math.round(kWheelF / 1000 * 100) / 100,
      wheelRateRear: Math.round(kWheelR / 1000 * 100) / 100,
      criticalDampingFront: Math.round(ccritF),
      actualDampingFront: Math.round(cF)
    },
    rideAndRoll: {
      naturalFrequencyFront: Math.round(fFCheck * 100) / 100,
      naturalFrequencyRear: Math.round(fRCheck * 100) / 100,
      rollStiffnessTotal: Math.round(kphiTotal),
      rollGradient: Math.round(rollGradDegPerG * 100) / 100,
      rollStiffnessDist: `${Math.round(frontRollPercent)}% F / ${Math.round(100 - frontRollPercent)}% R`
    },
    cornering: {
      lateralAcceleration: Number(scenarios.lateralAccel) || 1.0,
      loadTransferFront: Math.round(dWF / G * 10) / 10,
      loadTransferRear: Math.round(dWR / G * 10) / 10,
      outsideFrontLoad: Math.round(wfOutside / G * 10) / 10,
      outsideRearLoad: Math.round(wrOutside / G * 10) / 10,
      insideFrontLoad: Math.round(wfInside / G * 10) / 10,
      insideRearLoad: Math.round(wrInside / G * 10) / 10
    },
    longitudinal: {
      accelWeightTransfer: Math.round(dWAccel / G * 10) / 10,
      brakingWeightTransfer: Math.round(dWBrake / G * 10) / 10,
      frontLoadAccel: Math.round(wfAccel / G * 10) / 10,
      rearLoadAccel: Math.round(wrAccel / G * 10) / 10,
      frontLoadBraking: Math.round(wfBrake / G * 10) / 10,
      rearLoadBraking: Math.round(wrBrake / G * 10) / 10
    },
    bumpResponse: {
      springForce: Math.round(fspringBumpF),
      damperForce: Math.round(fdamperBumpF),
      totalWheelForce: Math.round(fwheelTotalBumpF),
      contactPatchLoad: Math.round(fwheelTotalBumpF / G * 10) / 10,
      loadVariation: `${Math.round((fwheelTotalBumpF / (wfStatic/2)) * 100 - 100)}%`
    },
    performanceSummary: {
      rideQualityScore: Number((rideQualityScore).toFixed(1)),
      handlingBalance: balanceCategory,
      rollCompliance: rollGradCategory,
      bumpCompliance: categorizeLoadTransfer(lateralTransferPercent, "lateral"),
      recommendation: recommendation.trim()
    }
  };
}
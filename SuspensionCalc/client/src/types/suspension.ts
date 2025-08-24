export interface VehicleSetup {
  mass: number;
  weightDistribution: number;
  sprungMassFraction: number;
  cgHeight: number;
  wheelbase: number;
  frontTrack: number;
  rearTrack: number;
}

export interface SuspensionSetup {
  frontMotionRatio: number;
  rearMotionRatio: number;
  frontRideFreq: number;
  rearRideFreq: number;
  frontDampingRatio: number;
  rearDampingRatio: number;
  arbFront: number;
  arbRear: number;
  unsprungMassFront: number;
  unsprungMassRear: number;
}

export interface DrivingScenarios {
  lateralAccel: number;
  longAccel: number;
  brakingDecel: number;
  bumpTravel: number;
  bumpVelocity: number;
}

export interface SuspensionInputs {
  vehicle: VehicleSetup;
  suspension: SuspensionSetup;
  scenarios: DrivingScenarios;
}

export interface CalculationResults {
  springsAndDamping: {
    springRateFront: number;
    springRateRear: number;
    wheelRateFront: number;
    wheelRateRear: number;
    criticalDampingFront: number;
    actualDampingFront: number;
  };
  rideAndRoll: {
    naturalFrequencyFront: number;
    naturalFrequencyRear: number;
    rollStiffnessTotal: number;
    rollGradient: number;
    rollStiffnessDist: string;
  };
  cornering: {
    lateralAcceleration: number;
    loadTransferFront: number;
    loadTransferRear: number;
    outsideFrontLoad: number;
    outsideRearLoad: number;
    insideFrontLoad: number;
    insideRearLoad: number;
  };
  longitudinal: {
    accelWeightTransfer: number;
    brakingWeightTransfer: number;
    frontLoadAccel: number;
    rearLoadAccel: number;
    frontLoadBraking: number;
    rearLoadBraking: number;
  };
  bumpResponse: {
    springForce: number;
    damperForce: number;
    totalWheelForce: number;
    contactPatchLoad: number;
    loadVariation: string;
  };
  performanceSummary: {
    rideQualityScore: number;
    handlingBalance: string;
    rollCompliance: string;
    bumpCompliance: string;
    recommendation: string;
  };
}

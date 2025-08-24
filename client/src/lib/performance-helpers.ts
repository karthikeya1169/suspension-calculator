// Performance categorization and help text
export interface PerformanceGrade {
  label: string;
  color: string;
  bgColor: string;
}

export function gradeRideQualityScore(score: number): PerformanceGrade {
  if (score >= 8) return { label: "Excellent", color: "text-green-400", bgColor: "bg-green-500/20" };
  if (score >= 6) return { label: "Good", color: "text-yellow-400", bgColor: "bg-yellow-500/20" };
  if (score >= 4) return { label: "Fair", color: "text-orange-400", bgColor: "bg-orange-500/20" };
  return { label: "Poor", color: "text-red-400", bgColor: "bg-red-500/20" };
}

export function gradeHandlingBalance(balance: string): PerformanceGrade {
  if (balance.includes("Excellent") || balance.includes("Balanced")) {
    return { label: "Excellent", color: "text-green-400", bgColor: "bg-green-900/20" };
  }
  if (balance.includes("Good")) {
    return { label: "Good", color: "text-yellow-400", bgColor: "bg-yellow-900/20" };
  }
  if (balance.includes("Neutral")) {
    return { label: "Acceptable", color: "text-yellow-400", bgColor: "bg-yellow-900/20" };
  }
  return { label: "Poor", color: "text-red-400", bgColor: "bg-red-900/20" };
}

export function gradeRollCompliance(compliance: string): PerformanceGrade {
  if (compliance === "Excellent") {
    return { label: "Excellent", color: "text-green-400", bgColor: "bg-green-900/20" };
  }
  if (compliance === "Good") {
    return { label: "Good", color: "text-yellow-400", bgColor: "bg-yellow-900/20" };
  }
  if (compliance === "Neutral") {
    return { label: "Acceptable", color: "text-yellow-400", bgColor: "bg-yellow-900/20" };
  }
  return { label: "Poor", color: "text-red-400", bgColor: "bg-red-900/20" };
}

export function gradeBumpCompliance(compliance: string): PerformanceGrade {
  if (compliance === "Excellent") {
    return { label: "Excellent", color: "text-green-400", bgColor: "bg-green-900/20" };
  }
  if (compliance === "Good") {
    return { label: "Good", color: "text-yellow-400", bgColor: "bg-yellow-900/20" };
  }
  if (compliance === "Neutral") {
    return { label: "Acceptable", color: "text-yellow-400", bgColor: "bg-yellow-900/20" };
  }
  return { label: "Poor", color: "text-red-400", bgColor: "bg-red-900/20" };
}

// Input validation functions
export function validateVehicleMass(mass: number): { isValid: boolean; message?: string; severity?: 'error' | 'warning' } {
  if (mass < 50) return { isValid: false, message: "Vehicle mass too low for realistic suspension", severity: 'error' };
  if (mass > 3000) return { isValid: false, message: "Vehicle mass unusually high for ATVs", severity: 'warning' };
  if (mass < 150) return { isValid: false, message: "Consider if mass is realistic for your vehicle type", severity: 'warning' };
  return { isValid: true };
}

export function validateFrequency(freq: number): { isValid: boolean; message?: string; severity?: 'error' | 'warning' } {
  if (freq < 0.5) return { isValid: false, message: "Frequency too low - suspension may be too soft", severity: 'error' };
  if (freq > 6.0) return { isValid: false, message: "Frequency too high - suspension may be too stiff", severity: 'error' };
  if (freq < 1.0) return { isValid: false, message: "Very low frequency may cause poor handling", severity: 'warning' };
  if (freq > 4.0) return { isValid: false, message: "Very high frequency may cause harsh ride", severity: 'warning' };
  return { isValid: true };
}

export function validateDampingRatio(zeta: number): { isValid: boolean; message?: string; severity?: 'error' | 'warning' } {
  if (zeta < 0.1) return { isValid: false, message: "Damping too low - may cause oscillation", severity: 'error' };
  if (zeta > 1.0) return { isValid: false, message: "Damping too high - overdamped suspension", severity: 'error' };
  if (zeta < 0.2) return { isValid: false, message: "Low damping may reduce stability", severity: 'warning' };
  if (zeta > 0.7) return { isValid: false, message: "High damping may reduce comfort", severity: 'warning' };
  return { isValid: true };
}

// Help text definitions
export const helpTexts = {
  // Performance Summary
  rideQualityScore: {
    title: "Ride Quality Score",
    content: "A comprehensive measure of suspension comfort and terrain absorption capability. Scores of 8-10 indicate excellent comfort with good bump absorption. Scores below 5 suggest a harsh ride that may cause fatigue and reduce vehicle control on rough terrain.",
    safeRange: "Target: 7-10 for good comfort"
  },
  handlingBalance: {
    title: "Handling Balance",
    content: "Indicates the vehicle's steering behavior during cornering. 'Balanced' means neutral steering with predictable handling. Understeer makes the vehicle push wide in turns, while oversteer causes the rear to slide out. Balanced handling is safest for most driving conditions.",
    safeRange: "Target: Balanced to slight understeer"
  },
  rollCompliance: {
    title: "Roll Compliance",
    content: "Measures how well the suspension controls body roll during cornering. 'Excellent' means minimal lean with stable cornering. 'Poor' indicates excessive body roll that can reduce tire contact and compromise handling, especially dangerous in emergency maneuvers.",
    safeRange: "Target: Excellent to Good for stability"
  },
  bumpCompliance: {
    title: "Bump Compliance",
    content: "The suspension's ability to absorb sudden impacts without losing tire contact or vehicle control. 'Excellent' compliance keeps wheels in contact with the ground over rough terrain. 'Poor' compliance can cause dangerous loss of traction and control over bumps.",
    safeRange: "Target: Excellent to Good for rough terrain"
  },
  
  // Springs & Damping
  springRates: {
    title: "Spring Rates",
    content: "Determines how much force is needed to compress the suspension. Higher rates = stiffer suspension with less body roll but harsher ride. Lower rates = softer ride but more body movement.",
    safeRange: "ATV Range: 20-80 kN/m depending on use"
  },
  wheelRates: {
    title: "Wheel Rates",
    content: "The effective spring rate felt at the wheel, accounting for suspension geometry. This is what the tire actually experiences and affects ride quality directly.",
    safeRange: "Should match target ride frequencies"
  },
  criticalDamping: {
    title: "Critical Damping",
    content: "The theoretical damping needed to prevent oscillation. Critical damping prevents bouncing but may feel too stiff for comfort.",
    safeRange: "Reference value for damping calculations"
  },
  actualDamping: {
    title: "Actual Damping",
    content: "The chosen damping level, typically 30-60% of critical damping. Controls how quickly the suspension settles after impacts and affects ride quality.",
    safeRange: "Target: 30-60% of critical damping"
  },
  
  // Ride & Roll
  naturalFrequency: {
    title: "Natural Frequency",
    content: "How quickly the suspension oscillates naturally. Lower frequencies = softer, more comfortable ride. Higher frequencies = stiffer, more controlled handling but harsher ride.",
    safeRange: "ATV Range: 1.5-3.5 Hz (2.0-3.0 ideal)"
  },
  rollStiffness: {
    title: "Roll Stiffness",
    content: "Resistance to body lean during cornering. Higher values reduce body roll and improve handling but can make the ride feel harsher over uneven terrain.",
    safeRange: "Balance between handling and comfort"
  },
  rollGradient: {
    title: "Roll Gradient",
    content: "Degrees of body lean per g of lateral acceleration. Lower values mean less leaning in turns, which improves tire contact and handling feel.",
    safeRange: "Target: <12 deg/g for good handling"
  },
  
  // Vehicle Parameters
  vehicleMass: {
    title: "Vehicle Mass",
    content: "Total weight of the vehicle including fuel and typical gear. Affects all suspension calculations and determines required spring rates and damping.",
    safeRange: "ATV Range: 150-800 kg typically"
  },
  weightDistribution: {
    title: "Weight Distribution",
    content: "Percentage of weight on the front axle. Most vehicles are front-heavy (55-65%). Affects handling balance and load transfer calculations.",
    safeRange: "Typical: 50-65% front for stability"
  },
  cgHeight: {
    title: "Center of Gravity Height",
    content: "Height of the vehicle's balance point above ground. Lower CG improves stability and reduces roll. Higher CG increases rollover risk.",
    safeRange: "ATV Range: 0.4-0.7m above ground"
  },
  motionRatio: {
    title: "Motion Ratio",
    content: "Ratio of wheel movement to spring/damper movement. Affects how spring rates translate to wheel rates and influences suspension leverage.",
    safeRange: "Typical: 0.7-1.2 depending on design"
  }
};
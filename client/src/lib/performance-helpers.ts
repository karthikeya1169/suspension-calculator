// Performance categorization and help text
export interface PerformanceGrade {
  label: string;
  color: string;
  bgColor: string;
}

export function gradeRideQualityScore(score: number): PerformanceGrade {
  if (score >= 8) return { label: "Excellent", color: "text-green-400", bgColor: "bg-green-900/20" };
  if (score >= 5) return { label: "Good", color: "text-yellow-400", bgColor: "bg-yellow-900/20" };
  return { label: "Poor", color: "text-red-400", bgColor: "bg-red-900/20" };
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

// Help text definitions
export const helpTexts = {
  rideQualityScore: {
    title: "Ride Quality Score",
    content: "A comprehensive measure of suspension comfort and terrain absorption capability. Scores of 8-10 indicate excellent comfort with good bump absorption. Scores below 5 suggest a harsh ride that may cause fatigue and reduce vehicle control on rough terrain."
  },
  handlingBalance: {
    title: "Handling Balance",
    content: "Indicates the vehicle's steering behavior during cornering. 'Balanced' means neutral steering with predictable handling. Understeer makes the vehicle push wide in turns, while oversteer causes the rear to slide out. Balanced handling is safest for most driving conditions."
  },
  rollCompliance: {
    title: "Roll Compliance",
    content: "Measures how well the suspension controls body roll during cornering. 'Excellent' means minimal lean with stable cornering. 'Poor' indicates excessive body roll that can reduce tire contact and compromise handling, especially dangerous in emergency maneuvers."
  },
  bumpCompliance: {
    title: "Bump Compliance",
    content: "The suspension's ability to absorb sudden impacts without losing tire contact or vehicle control. 'Excellent' compliance keeps wheels in contact with the ground over rough terrain. 'Poor' compliance can cause dangerous loss of traction and control over bumps."
  }
};
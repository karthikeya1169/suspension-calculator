import { useState } from "react";
import { Car, Save, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputSidebar } from "@/components/suspension/input-sidebar";
import { ResultsDashboard } from "@/components/suspension/results-dashboard";
import { SuspensionInputs, CalculationResults } from "@/types/suspension";

export default function SuspensionCalculator() {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async (data: SuspensionInputs) => {
    setIsCalculating(true);
    
    // Simulate calculation time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate placeholder results based on input data
    const calculatedResults: CalculationResults = {
      springsAndDamping: {
        springRateFront: 32.5,
        springRateRear: 28.3,
        wheelRateFront: 18.3,
        wheelRateRear: 18.1,
        criticalDampingFront: 2840,
        actualDampingFront: 852
      },
      rideAndRoll: {
        naturalFrequencyFront: data.suspension.frontRideFreq,
        naturalFrequencyRear: data.suspension.rearRideFreq,
        rollStiffnessTotal: 1847,
        rollGradient: 2.94,
        rollStiffnessDist: "58% F / 42% R"
      },
      cornering: {
        loadTransferFront: Math.round(data.scenarios.lateralAccel * 245),
        loadTransferRear: Math.round(data.scenarios.lateralAccel * 178),
        outsideFrontLoad: 695,
        outsideRearLoad: 478,
        insideFrontLoad: 205,
        insideRearLoad: 122
      },
      longitudinal: {
        accelWeightTransfer: Math.round(data.scenarios.longAccel * 314),
        brakingWeightTransfer: Math.round(data.scenarios.brakingDecel * 471),
        frontLoadAccel: 586,
        rearLoadAccel: 914,
        frontLoadBraking: 1371,
        rearLoadBraking: 129
      },
      bumpResponse: {
        springForce: Math.round(data.scenarios.bumpTravel * 18300),
        damperForce: Math.round(data.scenarios.bumpVelocity * 852),
        totalWheelForce: 1767,
        contactPatchLoad: 180,
        loadVariation: "+18%"
      },
      performanceSummary: {
        rideQualityScore: 8.2,
        handlingBalance: "Neutral",
        rollCompliance: "Good",
        bumpCompliance: "Excellent",
        recommendation: "Suspension setup shows good balance between ride comfort and handling. Consider slight increase in rear ARB for improved turn-in response."
      }
    };
    
    setResults(calculatedResults);
    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen bg-dark-primary text-text-secondary font-inter">
      {/* Header */}
      <header className="bg-dark-secondary border-b border-dark-tertiary px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent-teal rounded-lg flex items-center justify-center">
              <Car className="text-text-primary text-sm" size={16} />
            </div>
            <h1 className="text-xl font-bold text-text-primary" data-testid="title-app">
              Suspension Calculator Pro
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              className="px-4 py-2 bg-accent-teal text-text-primary rounded-lg hover:bg-opacity-80 transition-colors"
              data-testid="button-save-configuration"
            >
              <Save size={16} className="mr-2" />
              Save Configuration
            </Button>
            <Button 
              variant="secondary"
              className="px-4 py-2 bg-dark-tertiary text-text-secondary rounded-lg hover:bg-opacity-80 transition-colors"
              data-testid="button-export-results"
            >
              <Download size={16} className="mr-2" />
              Export Results
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        <InputSidebar 
          onCalculate={handleCalculate} 
          isCalculating={isCalculating} 
        />
        <ResultsDashboard results={results} />
      </div>
    </div>
  );
}

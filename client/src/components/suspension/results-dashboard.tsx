import { CalculationResults } from "@/types/suspension";
import { ResultCard } from "./result-card";
import { Activity, BarChart3, TrendingUp, ArrowLeftRight, Mountain, Target, HelpCircle } from "lucide-react";
import { 
  gradeRideQualityScore, 
  gradeHandlingBalance, 
  gradeRollCompliance, 
  gradeBumpCompliance, 
  helpTexts 
} from "@/lib/performance-helpers";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ResultsDashboardProps {
  results: CalculationResults | null;
  isMobile?: boolean;
  onExportToWord?: () => void;
}

export function ResultsDashboard({ results, isMobile = false, onExportToWord }: ResultsDashboardProps) {
  if (!results) {
    return (
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-dark-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 md:mb-0" data-testid="title-calculation-results">
              Analysis Results
            </h2>
            {isMobile && onExportToWord && results && (
              <button
                onClick={onExportToWord}
                className="px-4 py-2 bg-accent-blue text-text-primary rounded-lg hover:bg-opacity-80 transition-colors text-sm"
                data-testid="button-mobile-export"
              >
                📄 Export Word
              </button>
            )}
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <p className="text-text-muted text-lg" data-testid="text-no-results">
                Enter parameters and tap the <span className="text-yellow-500 font-semibold">Calculate</span> button
              </p>
              <p className="text-text-muted text-sm mt-2">
                Your suspension analysis will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-dark-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 md:mb-0" data-testid="title-calculation-results">
            Analysis Results
          </h2>
          {isMobile && onExportToWord && (
            <button
              onClick={onExportToWord}
              className="px-4 py-2 bg-accent-blue text-text-primary rounded-lg hover:bg-opacity-80 transition-colors text-sm"
              data-testid="button-mobile-export"
            >
              📄 Export Word
            </button>
          )}
        </div>
        
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'lg:grid-cols-2 xl:grid-cols-3 gap-6'}`}>
          {/* Springs & Damping Card */}
          <ResultCard
            title="Springs & Damping"
            icon={<Activity className="text-accent-teal" size={20} />}
            accentColor="bg-accent-teal"
            items={[
              {
                label: "Spring Rate Front",
                value: `${results.springsAndDamping.springRateFront} N/mm`,
                isHighlight: true
              },
              {
                label: "Spring Rate Rear",
                value: `${results.springsAndDamping.springRateRear} N/mm`,
                isHighlight: true
              },
              {
                label: "Wheel Rate Front",
                value: `${results.springsAndDamping.wheelRateFront} N/mm`
              },
              {
                label: "Wheel Rate Rear",
                value: `${results.springsAndDamping.wheelRateRear} N/mm`
              },
              {
                label: "Critical Damping Front",
                value: `${results.springsAndDamping.criticalDampingFront} Ns/m`
              },
              {
                label: "Actual Damping Front",
                value: `${results.springsAndDamping.actualDampingFront} Ns/m`
              }
            ]}
          />

          {/* Ride & Roll Card */}
          <ResultCard
            title="Ride & Roll"
            icon={<BarChart3 className="text-accent-blue" size={20} />}
            accentColor="bg-accent-blue"
            items={[
              {
                label: "Natural Frequency Front",
                value: `${results.rideAndRoll.naturalFrequencyFront} Hz`,
                isHighlight: true
              },
              {
                label: "Natural Frequency Rear",
                value: `${results.rideAndRoll.naturalFrequencyRear} Hz`,
                isHighlight: true
              },
              {
                label: "Roll Stiffness Total",
                value: `${results.rideAndRoll.rollStiffnessTotal} Nm/deg`
              },
              {
                label: "Roll Gradient",
                value: `${results.rideAndRoll.rollGradient} deg/g`
              },
              {
                label: "Roll Stiffness Dist",
                value: results.rideAndRoll.rollStiffnessDist
              }
            ]}
          />

          {/* Cornering Card */}
          <ResultCard
            title={`Cornering @ ${Number(results.cornering.lateralAcceleration).toFixed(1)}g`}
            icon={<TrendingUp className="text-accent-amber" size={20} />}
            accentColor="bg-accent-amber"
            items={[
              {
                label: "Load Transfer Front",
                value: `${results.cornering.loadTransferFront} kg`,
                isHighlight: true
              },
              {
                label: "Load Transfer Rear",
                value: `${results.cornering.loadTransferRear} kg`,
                isHighlight: true
              },
              {
                label: "Outside Front Load",
                value: `${results.cornering.outsideFrontLoad} kg`
              },
              {
                label: "Outside Rear Load",
                value: `${results.cornering.outsideRearLoad} kg`
              },
              {
                label: "Inside Front Load",
                value: `${results.cornering.insideFrontLoad} kg`
              },
              {
                label: "Inside Rear Load",
                value: `${results.cornering.insideRearLoad} kg`
              }
            ]}
          />

          {/* Longitudinal Card */}
          <ResultCard
            title="Longitudinal"
            icon={<ArrowLeftRight className="text-accent-teal" size={20} />}
            accentColor="bg-accent-teal"
            items={[
              {
                label: "Accel Weight Transfer",
                value: `${results.longitudinal.accelWeightTransfer} kg`,
                isHighlight: true
              },
              {
                label: "Braking Weight Transfer",
                value: `${results.longitudinal.brakingWeightTransfer} kg`,
                isHighlight: true
              },
              {
                label: "Front Load (Accel)",
                value: `${results.longitudinal.frontLoadAccel} kg`
              },
              {
                label: "Rear Load (Accel)",
                value: `${results.longitudinal.rearLoadAccel} kg`
              },
              {
                label: "Front Load (Braking)",
                value: `${results.longitudinal.frontLoadBraking} kg`
              },
              {
                label: "Rear Load (Braking)",
                value: `${results.longitudinal.rearLoadBraking} kg`
              }
            ]}
          />

          {/* Bump Response Card */}
          <ResultCard
            title="Bump Response"
            icon={<Mountain className="text-accent-blue" size={20} />}
            accentColor="bg-accent-blue"
            items={[
              {
                label: "Spring Force",
                value: `${results.bumpResponse.springForce} N`,
                isHighlight: true
              },
              {
                label: "Damper Force",
                value: `${results.bumpResponse.damperForce} N`,
                isHighlight: true
              },
              {
                label: "Total Wheel Force",
                value: `${results.bumpResponse.totalWheelForce} N`
              },
              {
                label: "Contact Patch Load",
                value: `${results.bumpResponse.contactPatchLoad} kg`
              },
              {
                label: "Load Variation",
                value: results.bumpResponse.loadVariation
              }
            ]}
          />

          {/* Performance Summary Card */}
          <div className="lg:col-span-2 xl:col-span-1">
            <div className="bg-dark-secondary rounded-xl shadow-card hover:shadow-card-hover transition-shadow p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-accent-amber bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                  <Target className="text-accent-amber" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary" data-testid="title-performance-summary">
                  Performance Summary
                </h3>
              </div>
              <div className="space-y-3">
                {/* Ride Quality Score */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary" data-testid="label-ride-quality-score">Ride Quality Score</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-text-muted hover:text-accent-teal cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs p-3">
                        <div className="space-y-1">
                          <p className="font-semibold">{helpTexts.rideQualityScore.title}</p>
                          <p className="text-sm">{helpTexts.rideQualityScore.content}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-semibold" data-testid="value-ride-quality-score">
                      {results.performanceSummary.rideQualityScore}/10
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      gradeRideQualityScore(results.performanceSummary.rideQualityScore).color
                    } ${
                      gradeRideQualityScore(results.performanceSummary.rideQualityScore).bgColor
                    }`}>
                      {gradeRideQualityScore(results.performanceSummary.rideQualityScore).label}
                    </span>
                  </div>
                </div>
                
                {/* Handling Balance */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary" data-testid="label-handling-balance">Handling Balance</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-text-muted hover:text-accent-teal cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs p-3">
                        <div className="space-y-1">
                          <p className="font-semibold">{helpTexts.handlingBalance.title}</p>
                          <p className="text-sm">{helpTexts.handlingBalance.content}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono" data-testid="value-handling-balance">
                      {results.performanceSummary.handlingBalance}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      gradeHandlingBalance(results.performanceSummary.handlingBalance).color
                    } ${
                      gradeHandlingBalance(results.performanceSummary.handlingBalance).bgColor
                    }`}>
                      {gradeHandlingBalance(results.performanceSummary.handlingBalance).label}
                    </span>
                  </div>
                </div>
                
                {/* Roll Compliance */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary" data-testid="label-roll-compliance">Roll Compliance</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-text-muted hover:text-accent-teal cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs p-3">
                        <div className="space-y-1">
                          <p className="font-semibold">{helpTexts.rollCompliance.title}</p>
                          <p className="text-sm">{helpTexts.rollCompliance.content}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono" data-testid="value-roll-compliance">
                      {results.performanceSummary.rollCompliance}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      gradeRollCompliance(results.performanceSummary.rollCompliance).color
                    } ${
                      gradeRollCompliance(results.performanceSummary.rollCompliance).bgColor
                    }`}>
                      {gradeRollCompliance(results.performanceSummary.rollCompliance).label}
                    </span>
                  </div>
                </div>
                
                {/* Bump Compliance */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary" data-testid="label-bump-compliance">Bump Compliance</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-text-muted hover:text-accent-teal cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs p-3">
                        <div className="space-y-1">
                          <p className="font-semibold">{helpTexts.bumpCompliance.title}</p>
                          <p className="text-sm">{helpTexts.bumpCompliance.content}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono" data-testid="value-bump-compliance">
                      {results.performanceSummary.bumpCompliance}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      gradeBumpCompliance(results.performanceSummary.bumpCompliance).color
                    } ${
                      gradeBumpCompliance(results.performanceSummary.bumpCompliance).bgColor
                    }`}>
                      {gradeBumpCompliance(results.performanceSummary.bumpCompliance).label}
                    </span>
                  </div>
                </div>
                <div className="bg-dark-tertiary rounded-lg p-3 mt-4">
                  <p className="text-sm text-text-muted" data-testid="text-recommendation">
                    {results.performanceSummary.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useForm } from "react-hook-form";
import { Car, Settings, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CollapsibleSection } from "./collapsible-section";
import { SuspensionInputs } from "@/types/suspension";

interface InputSidebarProps {
  onCalculate: (data: SuspensionInputs) => void;
  isCalculating: boolean;
  isMobile?: boolean;
}

export function InputSidebar({ onCalculate, isCalculating, isMobile = false }: InputSidebarProps) {
  const { register, handleSubmit, watch, setValue } = useForm<SuspensionInputs>({
    defaultValues: {
      vehicle: {
        mass: 1500,
        weightDistribution: 60,
        sprungMassFraction: 0.85,
        cgHeight: 0.52,
        wheelbase: 2.65,
        frontTrack: 1.55,
        rearTrack: 1.52,
      },
      suspension: {
        frontMotionRatio: 0.75,
        rearMotionRatio: 0.80,
        frontRideFreq: 1.2,
        rearRideFreq: 1.4,
        frontDampingRatio: 0.3,
        rearDampingRatio: 0.3,
        arbFront: 15000,
        arbRear: 12000,
        unsprungMassFront: 45,
        unsprungMassRear: 40,
      },
      scenarios: {
        lateralAccel: 1.0,
        longAccel: 0.8,
        brakingDecel: 1.2,
        bumpTravel: 0.05,
        bumpVelocity: 1.0,
      },
    },
  });

  const weightDistribution = watch("vehicle.weightDistribution");

  return (
    <div className={`${isMobile ? 'w-full' : 'w-80'} bg-dark-secondary ${!isMobile ? 'border-r border-dark-tertiary' : ''} overflow-y-auto`}>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6" data-testid="title-input-parameters">
          Input Parameters
        </h2>
        
        <form onSubmit={handleSubmit(onCalculate)} className="space-y-0">
          {/* Vehicle Setup Section */}
          <CollapsibleSection
            title="Vehicle Setup"
            icon={<Car size={16} />}
            accentColor="text-accent-teal"
          >
            <div>
              <Label className="block text-sm font-medium text-text-secondary mb-2">
                Vehicle Mass (kg)
              </Label>
              <Input
                type="number"
                {...register("vehicle.mass", { valueAsNumber: true })}
                className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                data-testid="input-vehicle-mass"
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-text-secondary mb-2">
                Front/Rear Weight Distribution (%)
              </Label>
              <div className="relative">
                <Slider
                  value={[weightDistribution]}
                  onValueChange={(value) => setValue("vehicle.weightDistribution", value[0])}
                  min={40}
                  max={70}
                  step={1}
                  className="w-full slider"
                  data-testid="slider-weight-distribution"
                />
                <div className="flex justify-between text-xs text-text-muted mt-1">
                  <span>40%</span>
                  <span data-testid="value-weight-distribution">{weightDistribution}%</span>
                  <span>70%</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-text-secondary mb-2">
                Sprung Mass Fraction
              </Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                max="1"
                {...register("vehicle.sprungMassFraction", { valueAsNumber: true })}
                className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                data-testid="input-sprung-mass-fraction"
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-text-secondary mb-2">
                CG Height (m)
              </Label>
              <Input
                type="number"
                step="0.01"
                {...register("vehicle.cgHeight", { valueAsNumber: true })}
                className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                data-testid="input-cg-height"
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-text-secondary mb-2">
                Wheelbase (m)
              </Label>
              <Input
                type="number"
                step="0.01"
                {...register("vehicle.wheelbase", { valueAsNumber: true })}
                className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                data-testid="input-wheelbase"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  Front Track (m)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("vehicle.frontTrack", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-front-track"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  Rear Track (m)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("vehicle.rearTrack", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-rear-track"
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Suspension Setup Section */}
          <CollapsibleSection
            title="Suspension Setup"
            icon={<Settings size={16} />}
            accentColor="text-accent-blue"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  Front Motion Ratio
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("suspension.frontMotionRatio", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-front-motion-ratio"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  Rear Motion Ratio
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("suspension.rearMotionRatio", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-rear-motion-ratio"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  Front Ride Freq (Hz)
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  {...register("suspension.frontRideFreq", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-front-ride-freq"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  Rear Ride Freq (Hz)
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  {...register("suspension.rearRideFreq", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-rear-ride-freq"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  Front Damping Ratio (ζ)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("suspension.frontDampingRatio", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-front-damping-ratio"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  Rear Damping Ratio (ζ)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("suspension.rearDampingRatio", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-rear-damping-ratio"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  ARB Front (Nm/rad)
                </Label>
                <Input
                  type="number"
                  {...register("suspension.arbFront", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-arb-front"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  ARB Rear (Nm/rad)
                </Label>
                <Input
                  type="number"
                  {...register("suspension.arbRear", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-arb-rear"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  Unsprung Mass Front (kg/corner)
                </Label>
                <Input
                  type="number"
                  {...register("suspension.unsprungMassFront", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-unsprung-mass-front"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  Unsprung Mass Rear (kg/corner)
                </Label>
                <Input
                  type="number"
                  {...register("suspension.unsprungMassRear", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-unsprung-mass-rear"
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Driving Scenarios Section */}
          <CollapsibleSection
            title="Driving Scenarios"
            icon={<Navigation size={16} />}
            accentColor="text-accent-amber"
          >
            <div>
              <Label className="block text-sm font-medium text-text-secondary mb-2">
                Cornering Lateral Acceleration (g)
              </Label>
              <Input
                type="number"
                step="0.1"
                {...register("scenarios.lateralAccel", { valueAsNumber: true })}
                className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                data-testid="input-lateral-accel"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  Longitudinal Accel (g)
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  {...register("scenarios.longAccel", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-long-accel"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  Braking Decel (g)
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  {...register("scenarios.brakingDecel", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-braking-decel"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  Bump Travel (m)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("scenarios.bumpTravel", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-bump-travel"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-text-secondary mb-2">
                  Bump Velocity (m/s)
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  {...register("scenarios.bumpVelocity", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-dark-tertiary border border-dark-tertiary rounded-lg text-text-secondary focus:border-accent-teal focus:outline-none transition-colors"
                  data-testid="input-bump-velocity"
                />
              </div>
            </div>
          </CollapsibleSection>

          <Button
            type="submit"
            disabled={isCalculating}
            className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 text-text-primary rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
            data-testid="button-calculate-results"
          >
            {isCalculating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Calculating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2V4a2 2 0 012-2h11a2 2 0 00-2-2H4zm6 9a1 1 0 100-2 1 1 0 000 2zm-4-1a1 1 0 11-2 0 1 1 0 012 0zm8 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Calculate Results
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

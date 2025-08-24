import { useState, useEffect } from "react";
import { Car, Save, Download, BarChart3, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputSidebar } from "@/components/suspension/input-sidebar";
import { ResultsDashboard } from "@/components/suspension/results-dashboard";
import { SuspensionInputs, CalculationResults } from "@/types/suspension";
import { calculateSuspension } from "@/lib/suspension-calculations";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableCell, TableRow, WidthType, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import { useToast } from "@/hooks/use-toast";

export default function SuspensionCalculator() {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showInputs, setShowInputs] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [calculationStatus, setCalculationStatus] = useState<string>("");
  const { toast } = useToast();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCalculate = async (data: SuspensionInputs) => {
    setIsCalculating(true);
    setCalculationStatus("Calculating suspension parameters...");
    
    try {
      // Add realistic calculation delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Use the real calculation engine
      const calculatedResults = calculateSuspension(data);
      
      setResults(calculatedResults);
      setCalculationStatus("Calculation completed successfully!");
      
      // On mobile, automatically show results
      if (isMobile) {
        setShowResults(true);
        setShowInputs(false);
      }
      
      toast({
        title: "Calculation Complete",
        description: "Suspension analysis has been generated successfully.",
      });
    } catch (error) {
      setCalculationStatus("Calculation failed. Please check your inputs.");
      toast({
        title: "Calculation Error",
        description: "There was an error processing your inputs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
      setTimeout(() => setCalculationStatus(""), 3000);
    }
  };

  const handleExportToWord = async () => {
    if (!results) return;
    
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: "SuspendX Pro - Suspension Analysis Report", bold: true, size: 32 })],
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER
            }),
            new Paragraph({ text: "" }), // spacing
            new Paragraph({
              children: [new TextRun({ text: "Springs & Damping Analysis", bold: true, size: 24 })],
              heading: HeadingLevel.HEADING_1
            }),
            new Paragraph({ text: `Spring Rate Front: ${results.springsAndDamping.springRateFront} kN/m` }),
            new Paragraph({ text: `Spring Rate Rear: ${results.springsAndDamping.springRateRear} kN/m` }),
            new Paragraph({ text: `Wheel Rate Front: ${results.springsAndDamping.wheelRateFront} kN/m` }),
            new Paragraph({ text: `Wheel Rate Rear: ${results.springsAndDamping.wheelRateRear} kN/m` }),
            new Paragraph({ text: `Critical Damping Front: ${results.springsAndDamping.criticalDampingFront} Ns/m` }),
            new Paragraph({ text: `Actual Damping Front: ${results.springsAndDamping.actualDampingFront} Ns/m` }),
            new Paragraph({ text: "" }),
            new Paragraph({
              children: [new TextRun({ text: "Ride & Roll Characteristics", bold: true, size: 24 })],
              heading: HeadingLevel.HEADING_1
            }),
            new Paragraph({ text: `Natural Frequency Front: ${results.rideAndRoll.naturalFrequencyFront} Hz` }),
            new Paragraph({ text: `Natural Frequency Rear: ${results.rideAndRoll.naturalFrequencyRear} Hz` }),
            new Paragraph({ text: `Roll Stiffness Total: ${results.rideAndRoll.rollStiffnessTotal} Nm/deg` }),
            new Paragraph({ text: `Roll Gradient: ${results.rideAndRoll.rollGradient} deg/g` }),
            new Paragraph({ text: `Roll Stiffness Distribution: ${results.rideAndRoll.rollStiffnessDist}` }),
            new Paragraph({ text: "" }),
            new Paragraph({
              children: [new TextRun({ text: "Cornering Analysis", bold: true, size: 24 })],
              heading: HeadingLevel.HEADING_1
            }),
            new Paragraph({ text: `Load Transfer Front: ${results.cornering.loadTransferFront} kg` }),
            new Paragraph({ text: `Load Transfer Rear: ${results.cornering.loadTransferRear} kg` }),
            new Paragraph({ text: `Outside Front Load: ${results.cornering.outsideFrontLoad} kg` }),
            new Paragraph({ text: `Outside Rear Load: ${results.cornering.outsideRearLoad} kg` }),
            new Paragraph({ text: `Inside Front Load: ${results.cornering.insideFrontLoad} kg` }),
            new Paragraph({ text: `Inside Rear Load: ${results.cornering.insideRearLoad} kg` }),
            new Paragraph({ text: "" }),
            new Paragraph({
              children: [new TextRun({ text: "Performance Summary", bold: true, size: 24 })],
              heading: HeadingLevel.HEADING_1
            }),
            new Paragraph({ text: `Ride Quality Score: ${results.performanceSummary.rideQualityScore}/10` }),
            new Paragraph({ text: `Handling Balance: ${results.performanceSummary.handlingBalance}` }),
            new Paragraph({ text: `Roll Compliance: ${results.performanceSummary.rollCompliance}` }),
            new Paragraph({ text: `Bump Compliance: ${results.performanceSummary.bumpCompliance}` }),
            new Paragraph({ text: "" }),
            new Paragraph({
              children: [new TextRun({ text: "Recommendations:", bold: true })]
            }),
            new Paragraph({ text: results.performanceSummary.recommendation }),
          ]
        }]
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, "suspension-analysis-report.docx");
      
      toast({
        title: "Export Successful",
        description: "Report exported to Word document successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Error",
        description: "Failed to export report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary text-text-secondary font-inter">
      {/* Header */}
      <header className="bg-dark-secondary border-b border-dark-tertiary px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent-teal rounded-lg flex items-center justify-center">
              <BarChart3 className="text-text-primary text-sm" size={16} />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-text-primary" data-testid="title-app">
              SuspendX Pro
            </h1>
          </div>
          
          {/* Mobile Toggle Buttons */}
          {isMobile && (
            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => {
                  setShowInputs(!showInputs);
                  setShowResults(!showInputs ? false : showResults);
                }}
                className="px-3 py-2 bg-accent-blue text-text-primary rounded-lg hover:bg-opacity-80 transition-colors"
                data-testid="button-toggle-inputs"
              >
                <Menu size={16} className={showInputs ? "" : "hidden"} />
                <X size={16} className={showInputs ? "hidden" : ""} />
              </Button>
              {results && (
                <Button 
                  onClick={() => {
                    setShowResults(!showResults);
                    setShowInputs(!showResults ? false : showInputs);
                  }}
                  className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-text-primary rounded-lg transition-colors"
                  data-testid="button-toggle-results"
                >
                  <BarChart3 size={16} />
                </Button>
              )}
            </div>
          )}
          
          {/* Desktop Header Buttons */}
          {!isMobile && (
            <div className="flex items-center space-x-4">
              <Button 
                className="px-4 py-2 bg-accent-teal text-text-primary rounded-lg hover:bg-opacity-80 transition-colors"
                data-testid="button-save-configuration"
              >
                <Save size={16} className="mr-2" />
                Save Config
              </Button>
              <Button 
                onClick={handleExportToWord}
                disabled={!results}
                className="px-4 py-2 bg-accent-blue text-text-primary rounded-lg hover:bg-opacity-80 transition-colors disabled:opacity-50"
                data-testid="button-export-results"
              >
                <Download size={16} className="mr-2" />
                Export Word
              </Button>
            </div>
          )}
        </div>
        
        {/* Mobile Status Message */}
        {isMobile && calculationStatus && (
          <div className="mt-3 px-4 py-2 bg-accent-teal bg-opacity-20 rounded-lg">
            <p className="text-sm text-accent-teal font-medium" data-testid="text-calculation-status">
              {calculationStatus}
            </p>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className={`flex ${isMobile ? 'flex-col' : ''} h-screen`}>
        {/* Input Sidebar */}
        <div className={`${
          isMobile 
            ? showInputs ? 'block' : 'hidden'
            : 'block'
        } ${isMobile ? 'w-full' : 'w-80'}`}>
          <InputSidebar 
            onCalculate={handleCalculate} 
            isCalculating={isCalculating}
            isMobile={isMobile}
          />
        </div>
        
        {/* Results Dashboard */}
        <div className={`${
          isMobile 
            ? showResults ? 'block' : 'hidden'
            : 'block'
        } flex-1`}>
          <ResultsDashboard 
            results={results} 
            isMobile={isMobile}
            onExportToWord={handleExportToWord}
          />
        </div>
        
        {/* Mobile Results Toggle FAB */}
        {isMobile && results && !showResults && (
          <div className="fixed bottom-6 right-6">
            <Button 
              onClick={() => {
                setShowResults(true);
                setShowInputs(false);
              }}
              className="w-14 h-14 bg-yellow-600 hover:bg-yellow-700 text-text-primary rounded-full shadow-lg transition-all hover:scale-105"
              data-testid="button-show-results-fab"
            >
              <BarChart3 size={24} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

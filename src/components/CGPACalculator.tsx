import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Target, TrendingUp } from "lucide-react";

export const CGPACalculator = () => {
  const [completedSemesters, setCompletedSemesters] = useState<number>(4);
  const [sgpaValues, setSgpaValues] = useState<string[]>(Array(4).fill(""));
  const [goalCGPA, setGoalCGPA] = useState<string>("");
  const [currentCGPA, setCurrentCGPA] = useState<number | null>(null);
  const [requiredSGPA, setRequiredSGPA] = useState<number | null>(null);

  const handleCompletedSemestersChange = (value: number) => {
    setCompletedSemesters(value);
    setSgpaValues(Array(value).fill(""));
    setCurrentCGPA(null);
    setRequiredSGPA(null);
  };

  const handleSgpaChange = (index: number, value: string) => {
    const newValues = [...sgpaValues];
    newValues[index] = value;
    setSgpaValues(newValues);
  };

  const calculateCGPA = () => {
    const validSgpas = sgpaValues
      .map(val => parseFloat(val))
      .filter(val => !isNaN(val) && val >= 0 && val <= 10);
    
    if (validSgpas.length === 0) return;
    
    const cgpa = validSgpas.reduce((sum, sgpa) => sum + sgpa, 0) / validSgpas.length;
    setCurrentCGPA(Math.round(cgpa * 100) / 100);

    // Calculate required SGPA for remaining semesters
    if (goalCGPA && validSgpas.length === completedSemesters) {
      const goal = parseFloat(goalCGPA);
      if (!isNaN(goal) && goal >= 0 && goal <= 10) {
        const totalRequired = goal * 8;
        const currentTotal = validSgpas.reduce((sum, sgpa) => sum + sgpa, 0);
        const remainingRequired = totalRequired - currentTotal;
        const remainingSemesters = 8 - completedSemesters;
        const avgRequired = remainingRequired / remainingSemesters;
        setRequiredSGPA(Math.round(avgRequired * 100) / 100);
      }
    }
  };

  const reset = () => {
    setSgpaValues(Array(completedSemesters).fill(""));
    setGoalCGPA("");
    setCurrentCGPA(null);
    setRequiredSGPA(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="w-full max-w-4xl mx-auto bg-card backdrop-blur-sm border border-border shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-terminal rounded-2xl flex items-center justify-center shadow-terminal border border-primary/30">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">
            CGPA Calculator
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Calculate your current CGPA and predict required SGPA to reach your academic goals
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Semester Selection */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Completed Semesters
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <Button
                    key={num}
                    variant={completedSemesters === num ? "default" : "outline"}
                    onClick={() => handleCompletedSemestersChange(num)}
                    size="lg"
                    className={`w-12 h-12 ${
                      completedSemesters === num 
                        ? "" 
                        : ""
                    }`}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* SGPA Input Section */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Enter SGPA for Each Semester
              </h3>
              <p className="text-sm text-muted-foreground">Semesters 1 to {completedSemesters}</p>
            </div>
            
            <div className={`grid gap-4 ${
              completedSemesters <= 4 
                ? `grid-cols-1 md:grid-cols-${completedSemesters}` 
                : "grid-cols-1 md:grid-cols-4 lg:grid-cols-4"
            }`}>
              {sgpaValues.map((value, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`sgpa-${index + 1}`} className="text-sm font-medium">
                    Semester {index + 1}
                  </Label>
                  <Input
                    id={`sgpa-${index + 1}`}
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    value={value}
                    onChange={(e) => handleSgpaChange(index, e.target.value)}
                    placeholder="0.00"
                    className="text-center font-medium transition-all duration-300 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Goal CGPA Section */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Target CGPA (Optional)
              </h3>
              <p className="text-muted-foreground text-sm">Enter your goal CGPA to see required SGPA</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Input
                type="number"
                min="0"
                max="10"
                step="0.01"
                value={goalCGPA}
                onChange={(e) => setGoalCGPA(e.target.value)}
                placeholder="Enter your target CGPA"
                className="text-center font-medium text-lg transition-all duration-300 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={calculateCGPA}
              variant="professional"
              size="lg"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate CGPA
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              size="lg"
            >
              Reset
            </Button>
          </div>

          {/* Results Section */}
          {(currentCGPA !== null || requiredSGPA !== null) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
            >
              {currentCGPA !== null && (
                <div className="bg-card border border-border rounded-lg p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Current CGPA</h3>
                  </div>
                  <p className="text-4xl font-bold text-primary">
                    {currentCGPA}
                  </p>
                </div>
              )}

              {requiredSGPA !== null && (
                <div className="bg-card border border-border rounded-lg p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold">Required Avg SGPA</h3>
                  </div>
                  <p className="text-4xl font-bold text-success">
                    {requiredSGPA}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    for Semesters {completedSemesters + 1}–8 to reach goal
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Feature Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-muted/50 rounded-lg p-6 border border-border"
          >
            <h4 className="text-base font-semibold mb-3 text-center text-foreground">
              📊 How It Works
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Calculate your current CGPA based on completed semesters, and optionally predict the average SGPA needed in remaining semesters to reach your target CGPA.
              </p>
              <div className="mt-4 space-y-1.5">
                <p className="font-medium text-foreground">Steps:</p>
                <p>• Select completed semesters (1-7)</p>
                <p>• Enter SGPA for each semester</p>
                <p>• Optionally, enter target CGPA</p>
                <p>• View current CGPA and required average SGPA</p>
              </div>
              <p className="mt-4 text-center font-medium text-primary text-xs">
                Designed for 8-semester engineering programs
              </p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
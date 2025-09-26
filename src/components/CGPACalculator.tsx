import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Target, TrendingUp } from "lucide-react";

export const CGPACalculator = () => {
  const [sgpaValues, setSgpaValues] = useState<string[]>(["", "", "", ""]);
  const [goalCGPA, setGoalCGPA] = useState<string>("");
  const [currentCGPA, setCurrentCGPA] = useState<number | null>(null);
  const [requiredSGPA, setRequiredSGPA] = useState<number | null>(null);

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
    if (goalCGPA && validSgpas.length === 4) {
      const goal = parseFloat(goalCGPA);
      if (!isNaN(goal) && goal >= 0 && goal <= 10) {
        const totalRequired = goal * 8;
        const currentTotal = validSgpas.reduce((sum, sgpa) => sum + sgpa, 0);
        const remainingRequired = totalRequired - currentTotal;
        const avgRequired = remainingRequired / 4;
        setRequiredSGPA(Math.round(avgRequired * 100) / 100);
      }
    }
  };

  const reset = () => {
    setSgpaValues(["", "", "", ""]);
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
      <Card className="w-full max-w-4xl mx-auto glass-morphism border-tech shadow-tech">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-neural rounded-full flex items-center justify-center">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-neural bg-clip-text text-transparent">
            CGPA Calculator
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Hi! I'm your friendly study buddy 💙. Along with attendance, I can also help you calculate your CGPA. Just enter your SGPA for each semester you've completed, and I'll instantly tell you your current CGPA.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* SGPA Input Section */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Enter SGPA for Semesters 1 to 4
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Enter your Goal CGPA
              </h3>
              <p className="text-muted-foreground text-sm">(like 8.5)</p>
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
              className="px-8 py-3 text-lg font-medium bg-gradient-neural hover:shadow-tech transition-all duration-300"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate CGPA
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              className="px-8 py-3 text-lg font-medium border-tech hover:bg-tech/10 transition-all duration-300"
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
                <div className="bg-gradient-to-br from-primary/5 via-accent-violet/5 to-accent-emerald/5 rounded-lg p-6 border border-tech/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold">Current CGPA</h3>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-neural bg-clip-text text-transparent">
                    {currentCGPA}
                  </p>
                </div>
              )}

              {requiredSGPA !== null && (
                <div className="bg-gradient-to-br from-accent-emerald/5 via-primary/5 to-accent-violet/5 rounded-lg p-6 border border-tech/20">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-accent-emerald" />
                    <h3 className="text-lg font-semibold">Required Average SGPA</h3>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-tech bg-clip-text text-transparent">
                    {requiredSGPA}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    for Semesters 5–8 to reach your goal
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
            className="bg-gradient-to-br from-primary/3 via-accent-violet/3 to-accent-emerald/3 rounded-lg p-6 border border-tech/20"
          >
            <h4 className="text-lg font-semibold mb-3 text-center">
              ✨ Bonus Feature
            </h4>
            <div className="space-y-2 text-muted-foreground">
              <p>
                If you upload SGPA of your first 4 semesters and tell me your goal CGPA for graduation (8 semesters total), I'll calculate how much SGPA you'll need in the remaining semesters to reach your dream CGPA.
              </p>
              <div className="mt-4 space-y-1 text-sm">
                <p className="font-medium">📌 Example:</p>
                <p>• Enter SGPA for Semesters 1 to 4</p>
                <p>• Enter your Goal CGPA (like 8.5)</p>
                <p>• I'll show you the required average SGPA for Semesters 5–8</p>
              </div>
              <p className="mt-4 text-center font-medium text-primary">
                This feature is specially designed for engineering students (8 semesters only). Let's make your journey stress-free and lovable 🤗
              </p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
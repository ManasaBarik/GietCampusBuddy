import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RotateCcw, GraduationCap, FileCheck } from "lucide-react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Subject {
  name: string;
  credits: string;
  grade: string;
}

// Subject data for different branches, academic years, and semesters
const subjectData: {
  [key: string]: {
    [key: string]: {
      [key: string]: Array<{ name: string; credits: string }>;
    };
  };
} = {
  "2023-27": {
    "CSEDS": {
      "1": [
        { name: "Engineering Physics", credits: "3" },
        { name: "Engineering Mathematics-I", credits: "4" },
        { name: "Basic Electrical and Electronics Engineering", credits: "3" },
        { name: "Basic Electrical and Electronics Engineering Lab", credits: "1" },
        { name: "Engineering Graphics and Design", credits: "2" },
        { name: "Programming for Problem Solving", credits: "3" },
        { name: "Programming for Problem Solving Lab", credits: "2" },
        { name: "Communicative English and Soft Skills", credits: "2" },
        { name: "Human Values and Professional Ethics", credits: "1" },
        { name: "Communicative English and Soft Skills Lab", credits: "1" },
        { name: "Induction Program", credits: "0" },
      ],
      "2": [
        { name: "Engineering Mathematics - II", credits: "4" },
        { name: "Elements of Mechanical Engineering", credits: "4" },
        { name: "Dietetics and Nutrition", credits: "1" },
        { name: "Engineering Workshop", credits: "2" },
        { name: "Fundamental of Web Technology", credits: "3" },
        { name: "Data Structures and Algorithms", credits: "3" },
        { name: "Data Structures and Algorithms LAB", credits: "2" },
        { name: "Communicative English and Technical Communication", credits: "2" },
        { name: "Communicative English and Technical Communication LAB", credits: "1" },
        { name: "NSS / YOGA", credits: "0" },
      ],
      "3": [
        { name: "Summer Internship - I", credits: "1" },
        { name: "Learning Project - I", credits: "1" },
        { name: "Intermediate Communication Skills and Critical Thinking", credits: "1" },
        { name: "Intermediate Communication Skills and Critical Thinking Laboratory", credits: "1" },
        { name: "Applied Statistics", credits: "4" },
        { name: "Digital Electronics", credits: "3" },
        { name: "Digital Electronics Laboratory", credits: "1" },
        { name: "Database Management Systems", credits: "3" },
        { name: "Object Oriented Programming through Java", credits: "3" },
        { name: "Database Management Systems Laboratory", credits: "1" },
        { name: "Object Oriented Programming through Java Laboratory", credits: "1" },
        { name: "Introduction to Data Science", credits: "3" },
        { name: "Environmental Sciences", credits: "0" },
      ],
      "4": [
        { name: "Advance Communication Skills and Professional Ethics", credits: "1" },
        { name: "Advance Communication Skills and Professional Ethics Lab", credits: "1" },
        { name: "Python Programming for Data Science", credits: "3" },
        { name: "Computer Organization & Architecture", credits: "3" },
        { name: "Design and Analysis of Algorithms", credits: "3" },
        { name: "Operating Systems", credits: "3" },
        { name: "Python Programming Lab", credits: "1" },
        { name: "Design and Analysis of Algorithms Lab", credits: "1" },
        { name: "Data Analytics Tool Laboratory", credits: "1" },
        { name: "Predictive Modeling and Analytics", credits: "3" },
        { name: "Learning Project-II", credits: "1" },
        { name: "Essence of Indian Traditional Knowledge", credits: "0" },
      ],
    },
  },
};
const gradePoints: {
  [key: string]: number;
} = {
  "O": 10,
  "E": 9,
  "A": 8,
  "B": 7,
  "C": 6,
  "D": 5,
  "F": 0,
  "Satisfacto": 0
};
export const SGPACalculator = () => {
  const [academicYear, setAcademicYear] = useLocalStorage<string>("sgpa_academic_year", "");
  const [branch, setBranch] = useLocalStorage<string>("sgpa_branch", "");
  const [semester, setSemester] = useLocalStorage<string>("sgpa_semester", "");
  const [subjects, setSubjects] = useLocalStorage<Subject[]>("sgpa_subjects", Array.from({
    length: 13
  }, () => ({
    name: "",
    credits: "",
    grade: ""
  })));
  const [sgpa, setSgpa] = useState<number | null>(null);

  // Auto-fill subjects when academic year, branch, and semester are selected
  useEffect(() => {
    if (academicYear && branch && semester) {
      const semesterData = subjectData[academicYear]?.[branch]?.[semester];
      if (semesterData) {
        const newSubjects = semesterData.map(subject => ({
          name: subject.name,
          credits: subject.credits,
          grade: ""
        }));
        // Fill remaining slots with empty subjects
        while (newSubjects.length < 13) {
          newSubjects.push({ name: "", credits: "", grade: "" });
        }
        setSubjects(newSubjects);
        toast.success("Subjects auto-filled for your selection!");
      } else {
        // Reset to empty subjects for unsupported combinations
        const emptySubjects = Array.from({ length: 13 }, () => ({
          name: "",
          credits: "",
          grade: ""
        }));
        setSubjects(emptySubjects);
        toast.info("Please enter subject details manually for this selection");
      }
    }
  }, [academicYear, branch, semester]);
  const handleSubjectChange = (index: number, field: keyof Subject, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };
  const calculateSGPA = () => {
    if (!academicYear || !branch || !semester) {
      toast.error("Please select academic year, branch and semester");
      return;
    }
    let totalCredits = 0;
    let totalGradePoints = 0;
    let hasValidSubject = false;
    subjects.forEach(subject => {
      if (subject.credits && subject.grade && subject.grade !== "Satisfacto") {
        const credits = parseFloat(subject.credits);
        const gradePoint = gradePoints[subject.grade];
        if (!isNaN(credits) && gradePoint !== undefined) {
          totalCredits += credits;
          totalGradePoints += credits * gradePoint;
          hasValidSubject = true;
        }
      }
    });
    if (!hasValidSubject) {
      toast.error("Please enter at least one subject with credits and grade");
      return;
    }
    const calculatedSgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    setSgpa(calculatedSgpa);
    toast.success("SGPA calculated successfully!");
  };
  const reset = () => {
    setAcademicYear("");
    setBranch("");
    setSemester("");
    setSubjects(Array.from({
      length: 13
    }, () => ({
      name: "",
      credits: "",
      grade: ""
    })));
    setSgpa(null);
    toast.info("Calculator reset");
  };
  return <div className="w-full max-w-5xl mx-auto space-y-8 px-4">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        <Card className="border-2 border-primary/20 shadow-xl bg-card/95 backdrop-blur">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-cyber bg-clip-text text-transparent">
                SGPA Calculator
              </CardTitle>
            </div>
            <CardDescription className="text-base">
              Calculate your Semester Grade Point Average (SGPA) for GIET University
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Academic Year, Branch and Semester Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="academicYear">Academic Year</Label>
                <Select value={academicYear} onValueChange={setAcademicYear}>
                  <SelectTrigger id="academicYear">
                    <SelectValue placeholder="Select Academic Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-27">2023-27</SelectItem>
                    <SelectItem value="2024-28">2024-28</SelectItem>
                    <SelectItem value="2025-29">2025-29</SelectItem>
                    <SelectItem value="2026-30">2026-30</SelectItem>
                    <SelectItem value="2027-31">2027-31</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger id="branch">
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSE">CSE (Computer Science & Engineering)</SelectItem>
                    <SelectItem value="CSEDS">CSE(DS) (Data Science)</SelectItem>
                    <SelectItem value="CSEAIML">CSE(AIML) (AI & Machine Learning)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({
                    length: 8
                  }, (_, i) => i + 1).map(sem => <SelectItem key={sem} value={sem.toString()}>
                        Semester {sem}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Auto-fill indicator */}
            {academicYear === "2023-27" && branch === "CSEDS" && semester && parseInt(semester) <= 4 && (
              <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <FileCheck className="w-5 h-5 text-primary" />
                <p className="text-sm text-foreground">
                  <strong>Auto-filled:</strong> Subjects and credits are pre-filled for CSE(DS) 2023-27 batch. Just select your grades!
                </p>
              </div>
            )}

            {/* Subjects Table */}
            {academicYear && branch && semester && <motion.div initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: "auto"
          }} transition={{
            duration: 0.3
          }} className="space-y-4">
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Enter Subject Details
                  </h3>
                  
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {subjects.map((subject, index) => <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end p-3 bg-background rounded-md border">
                        <div className="md:col-span-1 text-sm font-medium text-muted-foreground">
                          {index + 1}.
                        </div>
                        <div className="md:col-span-5 space-y-1">
                          <Label className="text-xs">Subject Name</Label>
                          <Input placeholder="e.g., Data Structures" value={subject.name} onChange={e => handleSubjectChange(index, "name", e.target.value)} />
                        </div>
                        <div className="md:col-span-3 space-y-1">
                          <Label className="text-xs">Credits</Label>
                          <Select value={subject.credits} onValueChange={value => handleSubjectChange(index, "credits", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Credits" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Credit</SelectItem>
                              <SelectItem value="2">2 Credits</SelectItem>
                              <SelectItem value="3">3 Credits</SelectItem>
                              <SelectItem value="4">4 Credits</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-3 space-y-1">
                          <Label className="text-xs">Grade</Label>
                          <Select value={subject.grade} onValueChange={value => handleSubjectChange(index, "grade", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="O">O (90-100%) - Outstanding</SelectItem>
                              <SelectItem value="E">E (80-90%) - Excellent</SelectItem>
                              <SelectItem value="A">A (70-80%) - Very Good</SelectItem>
                              <SelectItem value="B">B (60-70%) - Good</SelectItem>
                              <SelectItem value="C">C (50-60%) - Average</SelectItem>
                              <SelectItem value="D">D (40-50%) - Pass</SelectItem>
                              <SelectItem value="F">F (Below 40%) - Fail</SelectItem>
                              <SelectItem value="Satisfacto">Satisfacto</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={calculateSGPA} variant="professional" className="flex-1 h-12 text-base font-semibold" size="lg">
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate SGPA
                  </Button>
                  <Button onClick={reset} variant="outline" className="flex-1 h-12 text-base font-semibold" size="lg">
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Reset
                  </Button>
                </div>
              </motion.div>}
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Card */}
      {sgpa !== null && <motion.div initial={{
      opacity: 0,
      scale: 0.9
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.5,
      type: "spring"
    }}>
          <Card className="border-2 border-primary shadow-xl bg-gradient-to-br from-primary/10 to-accent-cyber/10">
            <CardHeader>
              <CardTitle className="text-2xl">Your SGPA Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-5xl font-bold text-primary">
                  {sgpa.toFixed(2)}
                </div>
                <p className="text-muted-foreground">
                  {academicYear} | {branch} - Semester {semester}
                </p>
                <div className="pt-4 text-sm text-muted-foreground">
                  {sgpa >= 9 ? "🎉 Outstanding Performance!" : sgpa >= 8 ? "⭐ Excellent Work!" : sgpa >= 7 ? "👍 Good Job!" : sgpa >= 6 ? "✓ Keep it up!" : "📚 Work harder next time!"}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>}

      {/* How It Works */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2,
      duration: 0.5
    }}>
        <Card className="border border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl">How SGPA is Calculated</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p><strong>Formula:</strong> SGPA = Σ(Credit × Grade Point) / Σ(Credits)</p>
            <div>
              <strong>Grade Points:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>O (90-100%) = 10 points - Outstanding</li>
                <li>E (80-90%) = 9 points - Excellent</li>
                <li>A (70-80%) = 8 points - Very Good</li>
                <li>B (60-70%) = 7 points - Good</li>
                <li>C (50-60%) = 6 points - Average</li>
                <li>D (40-50%) = 5 points - Pass</li>
                <li>F (Below 40%) = 0 points - Fail</li>
                <li>Satisfactory = Not counted in SGPA</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>;
};
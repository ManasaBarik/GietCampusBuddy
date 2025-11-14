import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I calculate my attendance percentage for GIET University?",
      answer: "Enter your total classes and attended classes in the Attendance Calculator. It will show your current percentage and tell you how many classes to attend or skip to maintain your desired percentage. The calculator works with GIET ERP data."
    },
    {
      question: "What is the minimum attendance required at GIET University?",
      answer: "GIET University typically requires a minimum of 75% attendance to be eligible for semester exams. Our calculator helps you track and maintain this requirement throughout the semester."
    },
    {
      question: "How do I calculate SGPA for my GIET semester?",
      answer: "Select your branch and semester in the SGPA Calculator. Add your subjects with credits and grades (O, E, A, B, C, D, or F). The calculator will automatically compute your SGPA based on GIET University's grading system."
    },
    {
      question: "How is CGPA calculated at GIET University?",
      answer: "CGPA is the cumulative grade point average across all semesters. Enter your SGPA for each completed semester in the CGPA Calculator, and it will calculate your overall CGPA. You can also set a goal CGPA to see what you need in future semesters."
    },
    {
      question: "Does this calculator save my data?",
      answer: "Yes! All your inputs are automatically saved in your browser's local storage. Your data persists across sessions and you can access it anytime. Use the 'Clear All Saved Data' button at the bottom of the homepage to reset everything if needed."
    },
    {
      question: "What grade points does GIET University use?",
      answer: "GIET University uses a 10-point grading scale: O (10), E (9), A (8), B (7), C (6), D (5), and F (0). Our SGPA and CGPA calculators are pre-configured with this grading system."
    },
    {
      question: "Can I use this calculator offline?",
      answer: "Yes! This is a Progressive Web App (PWA). Install it on your device using the 'Install Now' button, and you can use all calculators offline without internet connectivity."
    },
    {
      question: "Which branches and semesters are supported?",
      answer: "We support all GIET University engineering branches including CSE, ECE, EEE, ME, CE, and more. Subject data is available for semesters 1-8, and you can also manually add subjects if your branch isn't listed."
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full"
        >
          <HelpCircle className="w-5 h-5 text-primary" />
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </motion.div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Quick answers about GIET attendance, SGPA, and CGPA calculations
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-border/50 rounded-lg px-4 bg-card/50 backdrop-blur-sm"
          >
            <AccordionTrigger className="text-left hover:no-underline">
              <span className="font-semibold text-sm sm:text-base">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm sm:text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
};

export default FAQ;

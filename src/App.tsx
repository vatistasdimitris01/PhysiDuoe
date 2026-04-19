/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  BookOpen, 
  Target, 
  Brain, 
  Home as HomeIcon, 
  Star, 
  User,
  ArrowRight,
  ChevronLeft,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// === TYPES ===
type StepType = 'theory' | 'quiz';

interface Step {
  type: StepType;
  text?: string;
  question?: string;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
}

interface Module {
  id: string;
  title: string;
  color: string;
  lightColor: string;
  icon: React.ReactNode;
  steps: Step[];
}

interface LessonData {
  [key: string]: Module;
}

// === MARKDOWN RENDERER ===
const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="markdown-body w-full">
      <ReactMarkdown 
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h3: ({...props}) => <h3 className="text-2xl md:text-3xl font-black text-[#111827] mt-8 mb-4 tracking-tight" {...props} />,
          p: ({...props}) => <p className="text-lg md:text-xl text-[#4b5563] leading-relaxed mb-6" {...props} />,
          blockquote: ({...props}) => (
            <blockquote className="border-l-4 border-[#10b981] pl-6 py-4 my-8 bg-gray-50 rounded-r-2xl italic text-lg text-[#374151]" {...props} />
          ),
          ul: ({...props}) => <ul className="list-disc pl-6 space-y-3 mb-8 text-lg text-[#4b5563]" {...props} />,
          li: ({...props}) => <li className="pl-2" {...props} />,
          code: ({...props}) => <code className="bg-gray-100 text-[#059669] px-1.5 py-0.5 rounded font-mono font-semibold" {...props} />
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

const LESSON_DATA: LessonData = {
  collisions: {
    id: 'collisions',
    title: 'Κεφ 5: Κρούσεις',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
    icon: <Target className="w-8 h-8 text-blue-500" />,
    steps: [
      { type: 'theory', text: '### Η Ορμή ($p$)\n\nΗ **Ορμή** είναι η "δύναμη" που έχει ένα σώμα επειδή κινείται. Μετράει την κινητική κατάσταση του σώματος.\n\n**Τύπος:**\n> $p = m \\cdot v$' },
      { type: 'quiz', question: 'Ποιος είναι ο σωστός τύπος της ορμής;', options: ['$p = m / v$', '$p = m \\cdot v$', '$p = v / m$'], correctIndex: 1, explanation: '**Σωστά!** Η ορμή είναι το γινόμενο της μάζας επί την ταχύτητα: $p = m \\cdot v$.' },
      { type: 'theory', text: '### Ελαστική vs Πλαστική\n\n- **Ελαστική:** Σαν τα μπαλάκια του τένις. **Δεν χάνεται ενέργεια**. Τα σώματα χωρίζουν μετά.\n- **Πλαστική:** Σαν δύο τσίχλες που κολλάνε. Τα σώματα γίνονται ένα (**συσσωμάτωμα**).' },
      { type: 'quiz', question: 'Τι συμβαίνει στα σώματα μετά από μια Πλαστική Κρούση;', options: ['Χωρίζουν αμέσως', 'Γίνονται ένα συσσωμάτωμα', 'Σταματούν να κινούνται'], correctIndex: 1, explanation: '**Ακριβώς!** Στην πλαστική κρούση τα σώματα ενώνονται σε ένα σώμα με κοινή ταχύτητα.' },
      { type: 'theory', text: '### Απώλεια Ενέργειας ($Q$)\n\nΣτην πλαστική κρούση, ένα μέρος της ενέργειας μετατρέπεται σε **θερμότητα**.\n\n**Τύπος:**\n> $Q = K_{\\text{πριν}} - K_{\\text{μετά}}$' },
      { type: 'quiz', question: 'Πώς υπολογίζουμε την ενέργεια που χάθηκε ως θερμότητα ($Q$);', options: ['$Q = K_{\\text{μετά}} - K_{\\text{πριν}}$', '$Q = K_{\\text{πριν}} - K_{\\text{μετά}}$', '$Q = P_{\\text{πριν}} - P_{\\text{μετά}}$'], correctIndex: 1, explanation: '**Σωστά!** Αφαιρούμε την τελική κινητική ενέργεια από την αρχική.' },
    ]
  },
  rigid_body: {
    id: 'rigid_body',
    title: 'Κεφ 2-3: Στερεό & Ροπή',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100',
    icon: <Brain className="w-8 h-8 text-purple-500" />,
    steps: [
      { type: 'theory', text: '### Κύλιση χωρίς ολίσθηση\n\nΌταν ένας τροχός κυλάει κανονικά και **δεν γλιστράει** (π.χ. στον πάγο), η ταχύτητα του κέντρου μάζας του συνδέεται με τη γωνιακή ταχύτητα:\n\n**Τύπος:**\n> $v_{\\text{cm}} = \\omega \\cdot R$' },
      { type: 'quiz', question: 'Ποιος τύπος ισχύει στην κύλιση χωρίς ολίσθηση;', options: ['$v_{\\text{cm}} = \\omega / R$', '$v_{\\text{cm}} = \\omega \\cdot R$', '$v_{\\text{cm}} = R / \\omega$'], correctIndex: 1, explanation: '**Μπράβο!** Η ταχύτητα του κέντρου μάζας είναι $\\omega \\cdot R$.' },
      { type: 'theory', text: '### Η Ροπή ($\\tau$)\n\nΗ Ροπή μετράει πόσο εύκολα μια δύναμη **στρίβει** κάτι. Εξαρτάται από τη δύναμη $F$ και τον μοχλοβραχίονα $l$ (κάθετη απόσταση).\n\n**Τύπος:**\n> $\\tau = F \\cdot l$' },
      { type: 'quiz', question: 'Τι συμβαίνει στη ροπή αν η δύναμη περνάει από το κέντρο (άξονα) περιστροφής;', options: ['Γίνεται μέγιστη', 'Είναι μηδέν (0)', 'Δεν αλλάζει'], correctIndex: 1, explanation: '**Σωστά!** Αν η δύναμη τέμνει τον άξονα, ο μοχλοβραχίονας είναι 0, άρα $\\tau = 0$.' },
    ]
  },
  equilibrium: {
    id: 'equilibrium',
    title: 'Κεφ 4: Ισορροπία',
    color: 'bg-green-500',
    lightColor: 'bg-green-100',
    icon: <CheckCircle2 className="w-8 h-8 text-green-500" />,
    steps: [
      { type: 'theory', text: '### Συνθήκες Ισορροπίας\n\nΓια να μην κουνιέται ένα στερεό, πρέπει να ισχύουν **δύο** πράγματα:\n\n1. **Δεν μεταφέρεται:** $\\Sigma F = 0$ (Πάνω = Κάτω, Δεξιά = Αριστερά)\n2. **Δεν στρίβει:** $\\Sigma \\tau = 0$ (Ροπές δεξιά = Ροπές αριστερά)' },
      { type: 'quiz', question: 'Πόσες συνθήκες πρέπει να ισχύουν ταυτόχρονα για την πλήρη ισορροπία ενός στερεού;', options: ['Μία ($\\Sigma F = 0$)', 'Δύο ($\\Sigma F = 0$ και $\\Sigma \\tau = 0$)', 'Καμία'], correctIndex: 1, explanation: '**Σωστά!** Πρέπει να εξασφαλίσουμε ότι το σώμα ούτε μεταφέρεται, ούτε περιστρέφεται.' },
    ]
  },
  strategy: {
    id: 'strategy',
    title: 'Οδηγός Επίλυσης',
    color: 'bg-orange-500',
    lightColor: 'bg-orange-100',
    icon: <Star className="w-8 h-8 text-orange-500" />,
    steps: [
      { type: 'theory', text: '### Βήμα 1: Σχεδίασε Δυνάμεις\n\nΜην ξεκινήσεις **ΠΟΤΕ** αν δεν βάλεις όλα τα βέλη στο σχήμα:\n- $W$ (Βάρος)\n- $N$ (Κάθετη αντίδραση)\n- $T$ (Τριβή)\n- $T_{\\nu}$ (Νήματα)' },
      { type: 'theory', text: '### Το Μυστικό: Σημείο για Ροπές\n\nΔιάλεξε το σημείο όπου ακουμπάνε οι **περισσότερες άγνωστες δυνάμεις** (π.χ. μια άρθρωση). \n\nΈτσι, οι ροπές τους γίνονται μηδέν και "φεύγουν" από την εξίσωση $\\Sigma \\tau = 0$!' },
      { type: 'quiz', question: 'Ποιο είναι το πιο κρίσιμο κριτήριο για την επιλογή του σημείου των ροπών;', options: ['Να είναι το κέντρο μάζας', 'Να εξουδετερώνει τις περισσότερες άγνωστες δυνάμεις', 'Να είναι το άκρο της ράβδου'], correctIndex: 1, explanation: '**Ακριβώς!** Διαλέγουμε το σημείο που μας "γλιτώνει" από τις περισσότερες άγνωστες δυνάμεις στις εξισώσεις μας.' },
    ]
  }
};


export default function App() {
  const [view, setView] = useState<'home' | 'lesson' | 'summary'>('home');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [xp, setXp] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Quiz states
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startModule = (moduleId: string) => {
    setActiveModuleId(moduleId);
    setCurrentStep(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setView('lesson');
  };

  const activeModule = activeModuleId ? LESSON_DATA[activeModuleId] : null;

  const handleAnswerSelect = (index: number) => {
    if (isCorrect !== null || !activeModule) return; 
    setSelectedAnswer(index);
    const correct = index === activeModule.steps[currentStep].correctIndex;
    setIsCorrect(correct);
    if (correct) {
      setXp(prev => prev + 20);
    }
  };

  const nextStep = () => {
    if (!activeModule) return;
    if (currentStep < activeModule.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setView('summary');
    }
  };

  const renderHome = () => (
    <motion.div 
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#f3f4f6] flex flex-col md:flex-row font-sans text-[#1f2937]"
    >
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden bg-white p-4 flex justify-between items-center border-b border-[#e5e7eb] sticky top-0 z-20">
        <div className="flex items-center gap-3 font-extrabold text-xl text-[#111827]">
          <div className="w-8 h-8 bg-[#10b981] rounded-lg flex items-center justify-center text-white text-lg">Φ</div>
          PhysiDuo
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#c2410c] font-black bg-[#fff7ed] border border-[#ffedd5] px-3 py-1.5 rounded-xl text-sm">
            <Trophy className="w-4 h-4" />
            <span>{xp} XP</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1 text-gray-600"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* --- FULL SCREEN MOBILE MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3 font-extrabold text-2xl text-[#111827]">
                <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center text-white text-xl">Φ</div>
                PhysiDuo
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-gray-100 rounded-full text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-5 text-[#065f46] font-black text-2xl bg-[#dcfce7] p-6 rounded-3xl w-full text-left"
              >
                <HomeIcon className="w-8 h-8" />
                ΜΑΘΗΜΑΤΑ
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-5 text-[#6b7280] font-black text-2xl hover:bg-gray-50 p-6 rounded-3xl transition-colors w-full text-left border-2 border-transparent"
              >
                <Star className="w-8 h-8 text-yellow-500" />
                ΑΠΟΣΤΟΛΕΣ
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-5 text-[#6b7280] font-black text-2xl hover:bg-gray-50 p-6 rounded-3xl transition-colors w-full text-left"
              >
                <User className="w-8 h-8 text-purple-500" />
                ΠΡΟΦΙΛ
              </button>
            </nav>

            <div className="mt-auto bg-[#fff7ed] border-2 border-[#ffedd5] p-8 rounded-[40px] flex items-center justify-between shadow-sm">
              <div>
                <div className="text-sm text-[#9a3412] font-black uppercase tracking-widest mb-1">Συνολικό XP</div>
                <div className="text-4xl font-black text-[#c2410c] tracking-tight">{xp} XP</div>
              </div>
              <Trophy className="w-12 h-12 text-[#f59e0b]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DESKTOP SIDEBAR --- */}
      <div className="hidden md:flex flex-col w-72 bg-white border-r border-[#e5e7eb] p-8 h-screen sticky top-0 shrink-0">
        <div className="flex items-center gap-3 font-extrabold text-2xl text-[#111827] mb-12">
          <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center text-white text-xl">Φ</div>
          PhysiDuo
        </div>
        
        <nav className="flex flex-col gap-3 flex-1">
          <button className="flex items-center gap-4 text-[#065f46] font-bold text-lg bg-[#dcfce7] p-4 rounded-2xl w-full text-left transition-all">
            <HomeIcon className="w-6 h-6" />
            ΜΑΘΗΜΑΤΑ
          </button>
          <button className="flex items-center gap-4 text-[#6b7280] font-bold text-lg hover:bg-gray-50 p-4 rounded-2xl transition-colors w-full text-left">
            <Star className="w-6 h-6" />
            ΑΠΟΣΤΟΛΕΣ
          </button>
          <button className="flex items-center gap-4 text-[#6b7280] font-bold text-lg hover:bg-gray-50 p-4 rounded-2xl transition-colors w-full text-left">
            <User className="w-6 h-6" />
            ΠΡΟΦΙΛ
          </button>
        </nav>

        <div className="bg-[#fff7ed] border-2 border-[#ffedd5] p-5 rounded-3xl flex items-center justify-between mt-auto">
          <div>
            <div className="text-[12px] text-[#9a3412] font-extrabold uppercase tracking-wider mb-1">Συνολικό XP</div>
            <div className="text-2xl font-black text-[#c2410c]">{xp} XP</div>
          </div>
          <Trophy className="w-8 h-8 text-[#f59e0b]" />
        </div>
      </div>
      
      {/* --- MAIN CONTENT (PATH) --- */}
      <div className="flex-1 flex justify-center p-8 md:p-12 pb-24 overflow-y-auto">
        <div className="w-full max-w-xl text-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-12"
          >
            <h1 className="text-[32px] font-extrabold text-[#111827] mb-2 font-display">Η Επανάληψή σου</h1>
            <p className="text-[#6b7280] text-lg">Προετοιμασία για το διαγώνισμα Φυσικής</p>
          </motion.div>
          
          <div className="flex flex-col items-center gap-6 relative">
            {Object.values(LESSON_DATA).map((mod, index) => (
              <motion.div 
                key={mod.id} 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center w-full"
              >
                <div className="relative">
                  <button 
                    onClick={() => startModule(mod.id)}
                    className={`w-24 h-[90px] rounded-full border-b-[8px] border-[#e5e7eb] bg-white shadow-md flex items-center justify-center transition-all hover:-translate-y-1 active:translate-y-1 active:border-b-0 relative z-10 ${
                      index === 0 ? 'ring-4 ring-emerald-400 ring-offset-4 ring-offset-[#f3f4f6]' : ''
                    }`}
                  >
                    <div className={index === 0 ? 'text-[#3b82f6]' : 'text-gray-400'}>
                      {mod.icon}
                    </div>
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2 bg-[#ef4444] text-white text-[10px] px-2 py-1 rounded-full font-black shadow-sm">
                        LIVE
                      </div>
                    )}
                  </button>
                </div>
                <div className="mt-4 text-center text-[#1f2937] font-extrabold bg-white px-6 py-2.5 rounded-2xl shadow-sm border border-[#e5e7eb] text-sm">
                  {mod.title}
                </div>
                {index < Object.keys(LESSON_DATA).length - 1 && (
                  <div className="h-10 w-3 bg-[#e5e7eb] mt-3 rounded-full"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderLesson = () => {
    if (!activeModule) return null;
    const step = activeModule.steps[currentStep];
    const progress = (currentStep / activeModule.steps.length) * 100;

    return (
      <motion.div 
        key="lesson"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-white flex flex-col font-sans text-[#1f2937]"
      >
        {/* --- MINIMAL STICKY HEADER --- */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 flex items-center px-4 md:px-8 justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView('home')} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
            >
              <ChevronLeft className="w-6 h-6 text-gray-500 group-hover:text-black" />
            </button>
            <div className="hidden md:block">
              <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-0.5">{activeModule.title}</h4>
              <p className="text-xs font-bold text-gray-500">ΒΗΜΑ {currentStep + 1} ΑΠΟ {activeModule.steps.length}</p>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${activeModule.color} rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#c2410c] font-black bg-[#fff7ed] border border-[#ffedd5] px-4 py-1.5 rounded-xl">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">{xp} XP</span>
          </div>
        </header>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 mt-16 md:mt-24 pb-32 flex justify-center">
          <div className="w-full max-w-[1200px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* CONTENT COLUMN */}
            <div className={`${step.type === 'theory' ? 'lg:col-span-12 max-w-4xl mx-auto' : 'lg:col-span-7'} w-full`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`step-${currentStep}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="w-full"
                >
                  {step.type === 'theory' ? (
                    <div className="space-y-8">
                      <div className="inline-flex items-center gap-3 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm">
                        <BookOpen className="w-4 h-4" />
                        ΘΕΩΡΙΑ & ΤΥΠΟΙ
                      </div>
                      <MarkdownRenderer text={step.text || ''} />
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-sm">
                        <Target className="w-4 h-4" />
                        ΠΡΑΚΤΙΚΗ ΕΞΑΣΚΗΣΗ
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-[#111827] leading-[1.1] tracking-tight antialiased">
                        {step.question}
                      </h2>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* INTERACTION COLUMN (Only for Quizzes) */}
            {step.type === 'quiz' && (
              <div className="lg:col-span-5 flex flex-col">
                <div className="grid grid-cols-1 gap-4">
                  {step.options?.map((opt, idx) => {
                    let btnStyle = "bg-white border-2 border-gray-100 text-[#1f2937] hover:border-[#e5e7eb] hover:bg-gray-50";
                    
                    if (selectedAnswer !== null) {
                      if (idx === step.correctIndex) {
                        btnStyle = "bg-[#dcfce7] border-[#10b981] text-[#065f46] ring-4 ring-emerald-50";
                      } else if (idx === selectedAnswer && !isCorrect) {
                        btnStyle = "bg-[#fee2e2] border-[#ef4444] text-[#991b1b] ring-4 ring-red-50";
                      } else {
                        btnStyle = "bg-white border-gray-100 text-gray-300 opacity-50";
                      }
                    }

                    return (
                      <motion.button
                        key={idx}
                        whileHover={selectedAnswer === null ? { x: 4 } : {}}
                        onClick={() => handleAnswerSelect(idx)}
                        disabled={selectedAnswer !== null}
                        className={`w-full text-left p-6 rounded-[24px] font-bold text-lg md:text-xl transition-all shadow-sm ${btnStyle}`}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {selectedAnswer !== null && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-10 p-8 rounded-[32px] border-2 shadow-sm ${isCorrect ? 'bg-[#f0fdf4] border-emerald-100' : 'bg-[#fef2f2] border-red-100'}`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-full ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        </div>
                        <span className={`font-black text-lg ${isCorrect ? 'text-emerald-800' : 'text-red-800'}`}>
                          {isCorrect ? 'ΕΞΑΙΡΕΤΙΚΑ!' : 'ΠΡΟΣΟΧΗ...'}
                        </span>
                      </div>
                      <MarkdownRenderer text={step.explanation || ''} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </main>

        {/* --- FLOATING ACTION BAR --- */}
        <footer className="fixed bottom-0 left-0 right-0 p-6 md:p-8 flex justify-center z-50">
          <div className="w-full max-w-4xl flex justify-end">
            <button
              onClick={nextStep}
              disabled={step.type === 'quiz' && selectedAnswer === null}
              className={`group flex items-center gap-4 px-12 py-6 rounded-[32px] font-black text-xl transition-all transform active:scale-95 shadow-2xl ${
                (step.type === 'quiz' && selectedAnswer === null) 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#111827] text-white hover:bg-black hover:px-14'
              }`}
            >
              {step.type === 'theory' ? 'ΣΥΝΕΧΕΙΑ' : (isCorrect !== null ? 'ΕΠΟΜΕΝΟ ΜΑΘΗΜΑ' : 'ΕΠΙΛΟΓΗ ΑΠΑΝΤΗΣΗΣ')}
              <ArrowRight className={`w-6 h-6 transition-transform group-hover:translate-x-2 ${step.type === 'quiz' && selectedAnswer === null ? 'hidden' : ''}`} />
            </button>
          </div>
        </footer>
      </motion.div>
    );
  };

  const renderSummary = () => {
    if (!activeModule) return null;
    return (
      <motion.div 
        key="summary"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.1, opacity: 0 }}
        className="min-h-screen bg-[#f3f4f6] flex justify-center items-center font-sans md:p-6"
      >
        <div className="w-full h-screen md:h-auto md:max-w-2xl md:bg-white md:rounded-[40px] md:shadow-2xl flex flex-col items-center justify-center p-12 md:p-20 text-center border-[#e5e7eb] border">
          <motion.div 
            animate={{ 
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            className="w-48 h-48 bg-[#fff7ed] rounded-full flex items-center justify-center mb-10 shadow-inner border-2 border-[#ffedd5]"
          >
            <Trophy className="w-24 h-24 text-[#f59e0b]" />
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black text-[#111827] mb-6 font-display">Ενότητα Ολοκληρώθηκε!</h1>
          <p className="text-xl text-[#6b7280] mb-12 max-w-md">Είσαι ένα βήμα πιο κοντά στο να σκίσεις στο αυριανό διαγώνισμα.</p>
          
          <div className="bg-[#fff7ed] px-10 py-6 rounded-3xl flex items-center gap-4 mb-16 border-2 border-[#ffedd5]">
            <span className="text-4xl font-black text-[#c2410c]">+{activeModule.steps.filter(s => s.type === 'quiz').length * 20} XP</span>
          </div>

          <button
            onClick={() => setView('home')}
            className="w-full max-w-sm bg-[#10b981] hover:bg-[#059669] text-white font-black py-6 rounded-[28px] text-xl shadow-lg shadow-emerald-100 active:translate-y-1 active:shadow-none transition-all"
          >
            ΠΙΣΩ ΣΤΑ ΜΑΘΗΜΑΤΑ
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {view === 'home' && renderHome()}
        {view === 'lesson' && renderLesson()}
        {view === 'summary' && renderSummary()}
      </AnimatePresence>
    </>
  );
}

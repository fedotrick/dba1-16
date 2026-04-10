import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  ChevronRight, 
  GraduationCap, 
  Menu, 
  Layout, 
  AlertCircle,
  Timer,
  RotateCcw,
  Trophy
} from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import data from './data.json';

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface Module {
  id: string;
  title: string;
  content: string;
  quiz: Question[];
}

const App = () => {
  const [activeTab, setActiveTab] = useState<'study' | 'exam' | 'dashboard'>('dashboard');
  const [currentModuleId, setCurrentModuleId] = useState<string>('00');
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dba1_progress');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const currentModule = data.modules.find(m => m.id === currentModuleId) as Module;

  const markAsComplete = (moduleId: string) => {
    const newProgress = { ...progress, [moduleId]: true };
    setProgress(newProgress);
    localStorage.setItem('dba1_progress', JSON.stringify(newProgress));
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-slate-900 text-white transition-all duration-300 flex flex-col shrink-0 overflow-y-auto`}>
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-pgblue p-2 rounded-lg">
            <Layout className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight">DBA1 Master</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-pgblue text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Layout className="w-5 h-5" />
            <span className="font-medium">Панель управления</span>
          </button>

          <button 
            onClick={() => setActiveTab('exam')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'exam' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <GraduationCap className="w-5 h-5" />
            <span className="font-medium">Финальный Экзамен</span>
          </button>

          <div className="pt-6 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Модули курса
          </div>
          
          {data.modules.map(mod => (
            <button
              key={mod.id}
              onClick={() => {
                setCurrentModuleId(mod.id);
                setActiveTab('study');
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group ${activeTab === 'study' && currentModuleId === mod.id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 border-2 ${progress[mod.id] ? 'bg-green-500 border-green-500 text-white' : 'border-slate-700 text-slate-500 group-hover:border-slate-500'}`}>
                {progress[mod.id] ? <CheckCircle className="w-4 h-4" /> : mod.id}
              </div>
              <span className="text-sm font-medium truncate">{mod.title}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-slate-400 uppercase">Прогресс</span>
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden mt-1">
                <div 
                  className="h-full bg-green-500 transition-all duration-500" 
                  style={{ width: `${(Object.keys(progress).length / data.modules.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'dashboard' && <Dashboard progress={progress} setTab={(id: string) => { setCurrentModuleId(id); setActiveTab('study'); }} setMode={(t: 'study' | 'exam' | 'dashboard') => setActiveTab(t)} />}
            {activeTab === 'study' && <ModuleView module={currentModule} onComplete={() => markAsComplete(currentModuleId)} />}
            {activeTab === 'exam' && <ExamView questions={data.exam50} />}
          </div>
        </main>
      </div>
    </div>
  );
};

// --- Sub-components ---

const Dashboard = ({ progress, setTab, setMode }: { progress: any, setTab: any, setMode: any }) => {
  const completedCount = Object.keys(progress).length;
  const totalCount = data.modules.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-pgblue to-pgblue-dark rounded-3xl p-10 text-white shadow-2xl overflow-hidden relative">
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Твой путь к DBA1</h1>
          <p className="text-pgblue-light text-lg mb-8 max-w-lg leading-relaxed font-medium">
            Добро пожаловать в тренажер для подготовки к сертификации PostgreSQL. 
            Здесь собраны все материалы курса и интерактивные тесты.
          </p>
          <div className="flex items-center gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4">
              <div className="text-4xl font-black">{percent}%</div>
              <div className="text-xs uppercase font-bold tracking-widest opacity-60">Прогресс<br/>обучения</div>
            </div>
            <button 
              onClick={() => setMode('exam')}
              className="bg-white text-pgblue hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-xl"
            >
              Начать Экзамен
            </button>
          </div>
        </div>
        <GraduationCap className="absolute -right-12 -bottom-12 w-80 h-80 opacity-10 rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-slate-400 font-bold text-xs uppercase mb-1">Пройдено модулей</div>
          <div className="text-3xl font-black text-slate-800">{completedCount} / {totalCount}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-slate-400 font-bold text-xs uppercase mb-1">Всего вопросов</div>
          <div className="text-3xl font-black text-slate-800">{data.exam50.length + data.modules.reduce((acc, m) => acc + m.quiz.length, 0)}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-slate-400 font-bold text-xs uppercase mb-1">Дней до экзамена</div>
          <div className="text-3xl font-black text-amber-600">18</div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-pgblue" />
          Продолжить изучение
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.modules.slice(0, 4).map(mod => (
            <button 
              key={mod.id}
              onClick={() => setTab(mod.id)}
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-pgblue hover:shadow-md transition-all text-left flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-pgblue mb-1">Модуль {mod.id}</div>
                <div className="font-bold text-slate-800 text-lg group-hover:text-pgblue transition-colors">{mod.title}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-pgblue group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ModuleView = ({ module, onComplete }: { module: Module, onComplete: () => void }) => {
  const [view, setView] = useState<'text' | 'quiz'>('text');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-sm font-bold text-pgblue uppercase tracking-widest mb-1">Модуль {module.id}</div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight">{module.title}</h1>
        </div>
        <div className="bg-slate-100 p-1 rounded-xl flex">
          <button 
            onClick={() => setView('text')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${view === 'text' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Конспект
          </button>
          <button 
            onClick={() => setView('quiz')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${view === 'quiz' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Тест ({module.quiz.length})
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {view === 'text' ? (
          <div className="p-10 markdown">
            <Markdown>{module.content}</Markdown>
            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
              <button 
                onClick={() => setView('quiz')}
                className="bg-pgblue text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-pgblue-dark transition-all transform hover:scale-105 shadow-xl"
              >
                Перейти к тесту
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-10 space-y-12">
            {module.quiz.map((q, idx) => (
              <QuizCard key={q.id} question={q} index={idx + 1} />
            ))}
            <div className="flex justify-center pt-8">
              <button 
                onClick={onComplete}
                className="bg-green-600 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-green-700 transition-all transform hover:scale-105 shadow-xl"
              >
                <CheckCircle className="w-6 h-6" />
                Модуль освоен!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const QuizCard = ({ question, index }: { question: Question, index: number }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const isCorrect = selected === question.answer;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex gap-4">
        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 shrink-0">
          {index}
        </div>
        <div className="text-xl font-bold text-slate-800 leading-snug">{question.question}</div>
      </div>

      <div className="grid grid-cols-1 gap-3 ml-14">
        {['A', 'B', 'C', 'D'].map((letter, i) => (
          <button
            key={letter}
            disabled={selected !== null}
            onClick={() => setSelected(letter)}
            className={`
              p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 group
              ${selected === null ? 'border-slate-100 hover:border-pgblue hover:bg-slate-50' : ''}
              ${selected === letter && isCorrect ? 'border-green-500 bg-green-50 text-green-900 ring-4 ring-green-100' : ''}
              ${selected === letter && !isCorrect ? 'border-red-500 bg-red-50 text-red-900 ring-4 ring-red-100' : ''}
              ${selected !== null && letter === question.answer && !isCorrect ? 'border-green-500 bg-green-50' : ''}
              ${selected !== null && selected !== letter && letter !== question.answer ? 'opacity-40 grayscale' : ''}
            `}
          >
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-colors
              ${selected === null ? 'bg-slate-100 text-slate-500 group-hover:bg-pgblue group-hover:text-white' : ''}
              ${letter === question.answer && selected !== null ? 'bg-green-500 text-white' : ''}
              ${selected === letter && !isCorrect ? 'bg-red-500 text-white' : ''}
              ${selected !== null && letter !== question.answer && selected !== letter ? 'bg-slate-200 text-slate-400' : ''}
            `}>
              {letter}
            </div>
            <span className="font-semibold">{question.options[i]}</span>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className={`ml-14 p-6 rounded-2xl animate-in zoom-in-95 duration-300 ${isCorrect ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <div className="font-black mb-1 uppercase text-xs tracking-wider">{isCorrect ? 'Верно!' : 'Не совсем...'}</div>
              <p className="text-sm leading-relaxed opacity-90">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ExamView = ({ questions }: { questions: Question[] }) => {
  const [examStarted, setExamStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(75 * 60); // 75 minutes

  useEffect(() => {
    let timer: any;
    if (examStarted && !showResults && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setShowResults(true);
    }
    return () => clearInterval(timer);
  }, [examStarted, showResults, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!examStarted) {
    return (
      <div className="text-center space-y-8 py-20 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto text-amber-600 mb-6">
          <Timer className="w-12 h-12" />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Симуляция экзамена</h1>
          <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
            50 вопросов из всех разделов курса. <br/>
            Время ограничено: <strong>75 минут</strong>. <br/>
            Для успеха нужно набрать <strong>75% (38 из 50)</strong>.
          </p>
        </div>
        <button 
          onClick={() => setExamStarted(true)}
          className="bg-amber-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-amber-700 transition-all transform hover:scale-105 shadow-2xl shadow-amber-200"
        >
          ПОЕХАЛИ!
        </button>
      </div>
    );
  }

  if (showResults) {
    const score = Object.entries(answers).filter(([idx, ans]) => questions[parseInt(idx)].answer === ans).length;
    const passed = score >= 38;

    return (
      <div className="text-center space-y-8 py-20 animate-in zoom-in-95 duration-500">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto text-white shadow-2xl mb-6 ${passed ? 'bg-green-500 shadow-green-200' : 'bg-red-500 shadow-red-200'}`}>
          {passed ? <Trophy className="w-16 h-16" /> : <RotateCcw className="w-16 h-16" />}
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-black text-slate-900">{passed ? 'Поздравляем!' : 'Нужно подтянуть...'}</h1>
          <p className="text-slate-500 text-2xl">
            Твой результат: <span className={`font-black ${passed ? 'text-green-600' : 'text-red-600'}`}>{score} из 50</span>
          </p>
          <div className="text-slate-400 font-bold uppercase tracking-widest">{passed ? 'Ты готов к сертификации!' : 'Попробуй пройти обучение еще раз.'}</div>
        </div>
        <button 
          onClick={() => {
            setExamStarted(false);
            setAnswers({});
            setCurrentIdx(0);
            setTimeLeft(75 * 60);
            setShowResults(false);
          }}
          className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
        >
          Вернуться назад
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xs font-black uppercase tracking-widest text-slate-400">Вопрос {currentIdx + 1} / 50</div>
          <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500" style={{ width: `${((currentIdx + 1) / 50) * 100}%` }}></div>
          </div>
        </div>
        <div className={`flex items-center gap-2 font-black text-2xl ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
          <Timer className="w-6 h-6" />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 space-y-10">
        <div className="text-2xl font-bold text-slate-800 leading-tight">{q.question}</div>
        
        <div className="grid grid-cols-1 gap-4">
          {['A', 'B', 'C', 'D'].map((letter, i) => (
            <button
              key={letter}
              onClick={() => setAnswers({...answers, [currentIdx]: letter})}
              className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 group ${answers[currentIdx] === letter ? 'border-amber-500 bg-amber-50 shadow-md ring-4 ring-amber-100' : 'border-slate-100 hover:border-amber-200 hover:bg-slate-50'}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${answers[currentIdx] === letter ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-amber-200 group-hover:text-amber-700'}`}>
                {letter}
              </div>
              <span className="font-bold text-lg">{q.options[i]}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-between pt-6">
          <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="px-8 py-3 rounded-xl font-bold text-slate-400 hover:text-slate-800 disabled:opacity-30 transition-all"
          >
            Назад
          </button>
          {currentIdx === 49 ? (
            <button 
              onClick={() => setShowResults(true)}
              className="bg-green-600 text-white px-12 py-4 rounded-2xl font-black text-xl hover:bg-green-700 transition-all shadow-xl shadow-green-100"
            >
              Завершить экзамен
            </button>
          ) : (
            <button 
              onClick={() => setCurrentIdx(currentIdx + 1)}
              className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
            >
              Далее
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

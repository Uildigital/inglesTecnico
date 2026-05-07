import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, ChevronRight, MessageSquareCode, Loader2, Eye, PenTool, BookOpen, Volume2, Languages, Turtle, Rabbit, Zap } from 'lucide-react';
import { analyzeAnswer, translateExample } from '../lib/ai';

const WordCard = ({ term, onNext }) => {
  const [mode, setMode] = useState('study'); 
  const [translation, setTranslation] = useState('');
  const [description, setDescription] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [exampleTranslation, setExampleTranslation] = useState(null);
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.7);

  const speak = (text, lang = 'en-US') => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = speechRate;
    window.speechSynthesis.speak(utterance);
  };

  const handleReveal = async () => {
    setRevealed(true);
    if (term.example) {
      setIsLoadingTranslation(true);
      const translated = await translateExample(term.example);
      setExampleTranslation(translated);
      setIsLoadingTranslation(false);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const feedback = await analyzeAnswer(term, translation, description);
      setAiFeedback(feedback);
      if (term.example && !exampleTranslation) {
        const translated = await translateExample(term.example);
        setExampleTranslation(translated);
      }
      setShowResult(true);
    } catch (error) {
      setAiFeedback("Erro ao conectar com a IA. Tente novamente.");
      setShowResult(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setRevealed(false);
    setTranslation('');
    setDescription('');
    setAiFeedback(null);
    setExampleTranslation(null);
    onNext();
  };

  const getRateStyle = (rate) => {
    const isActive = speechRate === rate;
    return isActive 
      ? "btn-selected px-4 py-2 scale-105" 
      : "text-text-muted hover:bg-white/5 px-4 py-2";
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* SELETOR DE MODO */}
      <div className="flex bg-black/20 p-1 rounded-2xl border border-white/5 mb-8 w-full max-w-[280px]">
        <button 
          onClick={() => { setMode('study'); setShowResult(false); setRevealed(false); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs md:text-sm transition-all duration-300 ${mode === 'study' ? 'btn-selected' : 'text-text-muted hover:text-white'}`}
        >
          <Eye className="w-4 h-4" /> Memorizar
        </button>
        <button 
          onClick={() => { setMode('practice'); setShowResult(false); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs md:text-sm transition-all duration-300 ${mode === 'practice' ? 'btn-selected' : 'text-text-muted hover:text-white'}`}
        >
          <PenTool className="w-4 h-4" /> Praticar
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!showResult && !revealed ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-6 md:p-10 flex flex-col gap-6"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-2 text-sn-green">
                <BookOpen className="w-4 h-4" />
                <span className="font-mono text-[10px] md:text-xs tracking-[0.15em] uppercase font-black">
                   NÍVEL: {term.level}
                </span>
              </div>
              <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] text-text-muted font-black uppercase border border-white/5">
                {term.context}
              </span>
            </div>

            <div className="text-center py-4 flex flex-col items-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-tight">{term.word}</h2>
                <button 
                  onClick={() => speak(term.word)}
                  className="p-4 md:p-6 rounded-full bg-sn-green text-sn-navy hover:scale-105 transition-all active:scale-95 shadow-2xl shadow-sn-green/30 shrink-0"
                >
                  <Volume2 className="w-8 h-8 md:w-10 md:h-10" />
                </button>
              </div>

              {/* SELETOR DE VELOCIDADE */}
              <div className="flex items-center gap-1 bg-black/30 p-1 rounded-2xl border border-white/5 mb-8">
                <button
                  onClick={() => setSpeechRate(0.5)}
                  className={`flex flex-col items-center gap-1 rounded-xl transition-all duration-300 ${getRateStyle(0.5)}`}
                >
                  <Turtle className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase">Lento</span>
                </button>
                <button
                  onClick={() => setSpeechRate(0.7)}
                  className={`flex flex-col items-center gap-1 rounded-xl transition-all duration-300 ${getRateStyle(0.7)}`}
                >
                  <Rabbit className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase">Médio</span>
                </button>
                <button
                  onClick={() => setSpeechRate(1.0)}
                  className={`flex flex-col items-center gap-1 rounded-xl transition-all duration-300 ${getRateStyle(1.0)}`}
                >
                  <Zap className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase">Normal</span>
                </button>
              </div>
              
              {term.phonetic && (
                <div className="bg-sn-navy/40 px-5 py-2 rounded-xl border border-white/5">
                  <p className="text-text-muted font-mono text-xs md:text-sm tracking-widest">{term.phonetic}</p>
                </div>
              )}
            </div>

            {mode === 'practice' ? (
              <div className="space-y-6 pt-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-70">Sua Tradução</label>
                  <input
                    type="text"
                    className="glass-input p-4 text-sm"
                    placeholder="Traduzir..."
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-70">Conceito Técnico</label>
                  <textarea
                    className="glass-input min-h-[120px] resize-none p-4 text-sm"
                    placeholder="Explique o conceito..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleAnalyze}
                  className="btn-primary w-full py-5 text-base md:text-lg shadow-2xl shadow-sn-green/20"
                  disabled={!translation || !description || isAnalyzing}
                >
                  {isAnalyzing ? <Loader2 className="animate-spin" /> : 'ANAlISAR COM IA'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleReveal}
                className="btn-primary w-full py-6 md:py-8 text-xl md:text-2xl shadow-2xl shadow-sn-green/30 mt-4 active:scale-[0.98] transition-transform"
              >
                VER SIGNIFICADO
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 md:p-10 flex flex-col gap-8"
          >
            <div className="flex items-center gap-3 text-sn-green border-b border-white/5 pb-5">
              {mode === 'practice' ? <Brain className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
              <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">
                {mode === 'practice' ? 'Feedback do Mentor' : 'Significado'}
              </h3>
            </div>

            <div className="space-y-8">
              {aiFeedback && mode === 'practice' && (
                <div className="p-6 bg-sn-green/5 rounded-3xl border-l-4 border-sn-green shadow-inner">
                  <p className="text-sn-green-light italic leading-relaxed text-sm md:text-lg font-medium">"{aiFeedback}"</p>
                </div>
              )}
              
              <div className="bg-sn-navy/40 p-6 md:p-8 rounded-[2.5rem] border border-sn-green/10">
                <div className="mb-10">
                  <h4 className="text-[10px] font-black text-sn-green uppercase tracking-[0.2em] mb-4 flex items-center gap-2 opacity-70">
                    <MessageSquareCode className="w-3 h-3" /> Resposta Correta
                  </h4>
                  <p className="text-2xl md:text-4xl font-bold text-white leading-[1.1]">{term.explanation}</p>
                </div>
                
                <div className="p-6 md:p-8 bg-black/30 rounded-3xl border border-white/5 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] opacity-70">Exemplo de Uso</h4>
                      <button 
                        onClick={() => speak(term.example)}
                        className="p-2.5 rounded-full bg-white/5 text-text-muted hover:text-sn-green hover:bg-sn-green/10 transition-all"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="font-mono text-sn-green-light text-sm md:text-lg italic leading-relaxed">"{term.example}"</p>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <h4 className="text-[10px] font-black text-sn-green/60 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <Languages className="w-3 h-3" /> Tradução Livre
                    </h4>
                    {isLoadingTranslation ? (
                      <div className="text-text-muted text-xs italic flex items-center gap-3">
                        <Loader2 className="w-4 h-4 animate-spin" /> Processando tradução...
                      </div>
                    ) : (
                      <p className="text-text-muted text-sm md:text-lg leading-relaxed font-medium">{exampleTranslation}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="btn-primary w-full py-6 md:py-8 text-xl md:text-2xl font-black shadow-2xl shadow-sn-green/30 mt-4 active:scale-[0.98] transition-transform"
            >
              PRÓXIMO TERMO
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WordCard;

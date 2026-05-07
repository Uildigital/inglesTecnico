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

  // Cores dinâmicas para o seletor de velocidade
  const getRateStyle = (rate) => {
    const isActive = speechRate === rate;
    return isActive 
      ? "bg-sn-green text-sn-navy scale-110 shadow-[0_0_15px_rgba(130,223,0,0.4)]" 
      : "bg-white/5 text-text-muted hover:bg-white/10";
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6">
      <div className="flex justify-center mb-8">
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
          <button 
            onClick={() => { setMode('study'); setShowResult(false); setRevealed(false); }}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs md:text-sm transition-all ${mode === 'study' ? 'bg-sn-green text-sn-navy font-bold' : 'text-text-muted hover:text-white'}`}
          >
            <Eye className="w-4 h-4" /> Memorizar
          </button>
          <button 
            onClick={() => { setMode('practice'); setShowResult(false); }}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs md:text-sm transition-all ${mode === 'practice' ? 'bg-sn-green text-sn-navy font-bold' : 'text-text-muted hover:text-white'}`}
          >
            <PenTool className="w-4 h-4" /> Praticar
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResult && !revealed ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-6 md:p-8 flex flex-col gap-6"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-2 text-sn-green">
                <BookOpen className="w-4 h-4" />
                <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase font-bold">
                   NÍVEL: {term.level}
                </span>
              </div>
              <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] text-text-muted font-bold uppercase">
                {term.context}
              </span>
            </div>

            <div className="text-center py-6 md:py-8 flex flex-col items-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white">{term.word}</h2>
                <button 
                  onClick={() => speak(term.word)}
                  className="p-4 md:p-5 rounded-full bg-sn-green text-sn-navy hover:scale-110 transition-all active:scale-95 shadow-xl shadow-sn-green/20"
                >
                  <Volume2 className="w-8 h-8" />
                </button>
              </div>

              {/* Seletor de Velocidade Reforçado */}
              <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-black/20 border border-white/5 mb-8">
                <button
                  onClick={() => setSpeechRate(0.5)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${getRateStyle(0.5)}`}
                >
                  <Turtle className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase">Lento</span>
                </button>
                <button
                  onClick={() => setSpeechRate(0.7)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${getRateStyle(0.7)}`}
                >
                  <Rabbit className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase">Médio</span>
                </button>
                <button
                  onClick={() => setSpeechRate(1.0)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${getRateStyle(1.0)}`}
                >
                  <Zap className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase">Normal</span>
                </button>
              </div>
              
              {term.phonetic && (
                <div className="inline-flex items-center gap-2 bg-sn-navy/40 px-4 py-2 rounded-lg border border-white/5">
                  <p className="text-text-muted font-mono text-xs md:text-sm">{term.phonetic}</p>
                </div>
              )}
            </div>

            {mode === 'practice' ? (
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Sua Tradução</label>
                  <input
                    type="text"
                    className="glass-input w-full"
                    placeholder="Sua tradução..."
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Explicação Técnica</label>
                  <textarea
                    className="glass-input min-h-[100px] resize-none w-full text-sm"
                    placeholder="O que isso faz no ServiceNow?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleAnalyze}
                  className="btn-primary w-full py-5 text-lg"
                  disabled={!translation || !description || isAnalyzing}
                >
                  {isAnalyzing ? <Loader2 className="animate-spin" /> : 'Analisar Resposta'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleReveal}
                className="btn-primary w-full py-6 text-xl shadow-2xl shadow-sn-green/30"
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
            className="glass-card p-6 md:p-8 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 text-sn-green border-b border-white/5 pb-4">
              {mode === 'practice' ? <Brain className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
              <h3 className="text-lg font-bold uppercase tracking-tight">
                {mode === 'practice' ? 'Feedback do Mentor' : 'Significado'}
              </h3>
            </div>

            <div className="space-y-6">
              {aiFeedback && mode === 'practice' && (
                <div className="p-4 bg-sn-green/5 rounded-xl border-l-4 border-sn-green">
                  <p className="text-sn-green-light italic text-sm md:text-base">"{aiFeedback}"</p>
                </div>
              )}
              
              <div className="bg-sn-navy/50 p-6 rounded-2xl border border-sn-green/10">
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold text-sn-green uppercase tracking-widest mb-2 flex items-center gap-2">
                    <MessageSquareCode className="w-3 h-3" /> Resposta Correta
                  </h4>
                  <p className="text-xl md:text-2xl font-bold text-white leading-tight">{term.explanation}</p>
                </div>
                
                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Exemplo</h4>
                      <button 
                        onClick={() => speak(term.example)}
                        className="p-2 rounded-full bg-white/5 text-text-muted hover:text-sn-green transition-all"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-mono text-sn-green-light text-sm md:text-base italic leading-relaxed">"{term.example}"</p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <h4 className="text-[10px] font-bold text-sn-green/60 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Languages className="w-3 h-3" /> Tradução
                    </h4>
                    {isLoadingTranslation ? (
                      <div className="text-text-muted text-xs italic flex items-center gap-2">
                        <Loader2 className="w-3 h-3 animate-spin" /> Traduzindo...
                      </div>
                    ) : (
                      <p className="text-text-muted text-sm md:text-base leading-relaxed">{exampleTranslation}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="btn-primary w-full py-5 text-xl"
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

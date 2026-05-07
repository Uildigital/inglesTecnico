import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, ChevronRight, MessageSquareCode, Loader2, Eye, PenTool, BookOpen, Volume2, Languages, Gauge, Rabbit, Turtle, Zap } from 'lucide-react';
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

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6">
      {/* Seletor de Modo Principal */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 shadow-inner">
          <button 
            onClick={() => { setMode('study'); setShowResult(false); setRevealed(false); }}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs md:text-sm transition-all duration-300 ${mode === 'study' ? 'bg-sn-green text-sn-navy font-bold shadow-lg shadow-sn-green/30' : 'text-text-muted hover:text-white'}`}
          >
            <Eye className="w-4 h-4" /> Memorizar
          </button>
          <button 
            onClick={() => { setMode('practice'); setShowResult(false); }}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs md:text-sm transition-all duration-300 ${mode === 'practice' ? 'bg-sn-green text-sn-navy font-bold shadow-lg shadow-sn-green/30' : 'text-text-muted hover:text-white'}`}
          >
            <PenTool className="w-4 h-4" /> Praticar
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResult && !revealed ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="glass-card p-6 md:p-8 flex flex-col gap-6"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sn-green" />
                <span className="text-sn-green font-mono text-[10px] md:text-xs tracking-widest uppercase font-bold">
                   NÍVEL: {term.level}
                </span>
              </div>
              <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] text-text-muted font-bold tracking-tight">
                {term.context}
              </span>
            </div>

            <div className="text-center py-6 md:py-8 flex flex-col items-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white">{term.word}</h2>
                <button 
                  onClick={() => speak(term.word)}
                  className="p-4 md:p-5 rounded-full bg-sn-green text-sn-navy hover:bg-sn-green-light transition-all active:scale-90 shadow-xl shadow-sn-green/20"
                  title="Ouvir Pronúncia"
                >
                  <Volume2 className="w-8 h-8" />
                </button>
              </div>

              {/* Seletor de Velocidade Integrado */}
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5 mb-8">
                <button
                  onClick={() => setSpeechRate(0.5)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${speechRate === 0.5 ? 'bg-sn-green text-sn-navy shadow-lg' : 'text-text-muted hover:bg-white/5'}`}
                >
                  <Turtle className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase">Lento</span>
                </button>
                <button
                  onClick={() => setSpeechRate(0.7)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${speechRate === 0.7 ? 'bg-sn-green text-sn-navy shadow-lg' : 'text-text-muted hover:bg-white/5'}`}
                >
                  <Rabbit className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase">Médio</span>
                </button>
                <button
                  onClick={() => setSpeechRate(1.0)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${speechRate === 1.0 ? 'bg-sn-green text-sn-navy shadow-lg' : 'text-text-muted hover:bg-white/5'}`}
                >
                  <Zap className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase">Normal</span>
                </button>
              </div>
              
              {term.phonetic && (
                <div className="inline-flex items-center gap-2 bg-sn-navy/40 px-4 py-2 rounded-lg border border-white/5">
                  <p className="text-text-muted font-mono text-xs md:text-sm tracking-wide">{term.phonetic}</p>
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
                    placeholder="O que significa?"
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Conceito ServiceNow</label>
                  <textarea
                    className="glass-input min-h-[100px] resize-none w-full text-sm"
                    placeholder="Explique o termo técnico..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleAnalyze}
                  className="btn-primary flex items-center justify-center gap-2 mt-4 w-full py-5 shadow-xl shadow-sn-green/10"
                  disabled={!translation || !description || isAnalyzing}
                >
                  {isAnalyzing ? <Loader2 className="animate-spin" /> : <Brain className="w-6 h-6" />}
                  Analisar e Revelar
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleReveal}
                  className="btn-primary flex items-center justify-center gap-2 w-full py-6 text-xl shadow-2xl shadow-sn-green/30 active:scale-95 transition-transform"
                >
                  <Eye className="w-7 h-7" />
                  REVELAR SIGNIFICADO
                </button>
              </div>
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
                {mode === 'practice' ? 'Feedback do Mentor' : 'Resultado'}
              </h3>
            </div>

            <div className="space-y-6">
              {aiFeedback && mode === 'practice' && (
                <div className="p-5 bg-sn-green/5 rounded-2xl border-l-4 border-sn-green shadow-inner">
                  <p className="text-sn-green-light italic leading-relaxed text-sm md:text-base">"{aiFeedback}"</p>
                </div>
              )}
              
              <div className="bg-sn-navy/50 p-6 rounded-3xl border border-sn-green/10">
                <div className="mb-8">
                  <h4 className="text-[10px] font-bold text-sn-green uppercase tracking-widest mb-3 flex items-center gap-2 opacity-60">
                    <MessageSquareCode className="w-3 h-3" /> Significado Oficial
                  </h4>
                  <p className="text-xl md:text-2xl font-semibold leading-tight text-white">{term.explanation}</p>
                </div>
                
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">Exemplo (Inglês)</h4>
                      <button 
                        onClick={() => speak(term.example)}
                        className="p-2 rounded-full bg-white/5 text-text-muted hover:text-sn-green transition-all"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="font-mono text-sn-green-light text-sm md:text-base italic leading-relaxed">"{term.example}"</p>
                  </div>

                  <div className="pt-5 border-t border-white/5">
                    <h4 className="text-[10px] font-bold text-sn-green/60 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Languages className="w-3 h-3" /> Tradução do Exemplo
                    </h4>
                    {isLoadingTranslation ? (
                      <div className="flex items-center gap-2 text-text-muted text-xs italic">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Traduzindo...
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
              className="btn-primary flex items-center justify-center gap-2 py-5 md:py-6 text-xl shadow-xl shadow-sn-green/20"
            >
              PRÓXIMO TERMO
              <ChevronRight className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WordCard;

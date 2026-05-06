import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, ChevronRight, MessageSquareCode, Loader2, Eye, PenTool, BookOpen, Volume2, Languages } from 'lucide-react';
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

  // Função para ouvir a palavra ou frase
  const speak = (text, lang = 'en-US') => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
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
      
      // Traduzir exemplo também na análise
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
      <div className="flex justify-center gap-4 mb-6">
        <button 
          onClick={() => { setMode('study'); setShowResult(false); setRevealed(false); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm transition-all ${mode === 'study' ? 'bg-sn-green text-sn-navy font-bold' : 'bg-white/5 text-text-muted'}`}
        >
          <Eye className="w-4 h-4" /> Memorizar
        </button>
        <button 
          onClick={() => { setMode('practice'); setShowResult(false); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm transition-all ${mode === 'practice' ? 'bg-sn-green text-sn-navy font-bold' : 'bg-white/5 text-text-muted'}`}
        >
          <PenTool className="w-4 h-4" /> Praticar
        </button>
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
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sn-green" />
                <span className="text-sn-green font-mono text-[10px] md:text-xs tracking-widest uppercase">
                  Nível: {term.level}
                </span>
              </div>
              <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] text-text-muted font-medium">
                Contexto: {term.context}
              </span>
            </div>

            <div className="text-center py-6 md:py-10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">{term.word}</h2>
                <button 
                  onClick={() => speak(term.word)}
                  className="p-3 rounded-full bg-sn-green/10 text-sn-green hover:bg-sn-green/20 transition-all active:scale-95"
                  title="Ouvir Pronúncia"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>
              
              {term.phonetic && (
                <div className="inline-flex items-center gap-2 bg-sn-navy/40 px-4 py-2 rounded-lg border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-sn-green/60">Símbolos Fonéticos:</span>
                  <p className="text-text-muted font-mono text-sm md:text-base">{term.phonetic}</p>
                </div>
              )}
            </div>

            {mode === 'practice' ? (
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-tighter">Sua Tradução</label>
                  <input
                    type="text"
                    className="glass-input w-full"
                    placeholder="Sua tradução..."
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-tighter">O que é no ServiceNow?</label>
                  <textarea
                    className="glass-input min-h-[100px] resize-none w-full text-sm"
                    placeholder="Explique o conceito técnico..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleAnalyze}
                  className="btn-primary flex items-center justify-center gap-2 mt-4 w-full py-4 shadow-lg shadow-sn-green/10"
                  disabled={!translation || !description || isAnalyzing}
                >
                  {isAnalyzing ? <Loader2 className="animate-spin" /> : <Brain className="w-5 h-5" />}
                  Analisar e Revelar
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-center text-text-muted text-sm italic mb-4">
                  Pense no significado antes de revelar...
                </p>
                <button
                  onClick={handleReveal}
                  className="btn-primary flex items-center justify-center gap-2 w-full py-5 text-lg shadow-xl shadow-sn-green/20"
                >
                  <Eye className="w-6 h-6" />
                  Ver Significado
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
                {mode === 'practice' ? 'Análise do Mentor' : 'Significado Revelado'}
              </h3>
            </div>

            <div className="space-y-6">
              {aiFeedback && mode === 'practice' && (
                <div className="p-4 bg-sn-green/5 rounded-xl border-l-4 border-sn-green shadow-inner">
                  <p className="text-sn-green-light italic leading-relaxed text-sm md:text-base">"{aiFeedback}"</p>
                </div>
              )}
              
              <div className="bg-sn-navy/50 p-6 rounded-2xl border border-sn-green/10">
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold text-sn-green uppercase tracking-widest mb-3 flex items-center gap-2">
                    <MessageSquareCode className="w-3 h-3" /> Significado
                  </h4>
                  <p className="text-xl font-medium leading-tight text-white">{term.explanation}</p>
                </div>
                
                <div className="p-5 bg-white/5 rounded-xl border border-white/5 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Exemplo (Inglês)</h4>
                      <button 
                        onClick={() => speak(term.example)}
                        className="p-1.5 rounded-lg bg-white/5 text-text-muted hover:text-sn-green transition-all"
                        title="Ouvir Exemplo"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-mono text-sn-green-light text-sm italic leading-snug">"{term.example}"</p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <h4 className="text-[10px] font-bold text-sn-green/60 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Languages className="w-3 h-3" /> Tradução do Exemplo
                    </h4>
                    {isLoadingTranslation ? (
                      <div className="flex items-center gap-2 text-text-muted text-xs">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Traduzindo com IA...
                      </div>
                    ) : (
                      <p className="text-text-muted text-sm leading-snug">{exampleTranslation}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="btn-primary flex items-center justify-center gap-2 py-4 md:py-5 text-lg"
            >
              Próximo Termo
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WordCard;

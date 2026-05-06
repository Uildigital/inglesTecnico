import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, HelpCircle, ChevronRight, MessageSquareCode, Loader2, Eye, PenTool, BookOpen } from 'lucide-react';
import { analyzeAnswer } from '../lib/ai';

const WordCard = ({ term, onNext }) => {
  const [mode, setMode] = useState('study'); // 'study' ou 'practice'
  const [translation, setTranslation] = useState('');
  const [description, setDescription] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const feedback = await analyzeAnswer(term, translation, description);
      setAiFeedback(feedback);
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
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6">
      {/* Seletor de Modo Interno */}
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
              <h2 className="text-4xl md:text-6xl mb-4 font-bold tracking-tight text-white">{term.word}</h2>
              {term.phonetic && (
                <div className="inline-flex items-center gap-2 bg-sn-navy/40 px-4 py-2 rounded-lg border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-sn-green/60">Pronúncia:</span>
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
                    placeholder="Ex: Registro, Tabela..."
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
                  className="btn-primary flex items-center justify-center gap-2 mt-4 w-full py-4"
                  disabled={!translation || !description || isAnalyzing}
                >
                  {isAnalyzing ? <Loader2 className="animate-spin" /> : <Brain className="w-5 h-5" />}
                  Analisar com IA
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-center text-text-muted text-sm italic mb-4">
                  Pense no significado antes de revelar...
                </p>
                <button
                  onClick={() => setRevealed(true)}
                  className="btn-primary flex items-center justify-center gap-2 w-full py-5 text-lg shadow-lg shadow-sn-green/20"
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
                {mode === 'practice' ? 'Feedback do Mentor IA' : 'Memorização Concluída'}
              </h3>
            </div>

            <div className="space-y-6">
              {aiFeedback && mode === 'practice' && (
                <div className="p-4 bg-sn-green/5 rounded-xl border-l-4 border-sn-green shadow-inner">
                  <p className="text-sn-green-light italic leading-relaxed text-sm md:text-base">"{aiFeedback}"</p>
                </div>
              )}
              
              <div className="bg-sn-navy/50 p-6 rounded-2xl border border-sn-green/10">
                <h4 className="text-[10px] font-bold text-sn-green uppercase tracking-widest mb-3 flex items-center gap-2">
                  <MessageSquareCode className="w-3 h-3" /> Significado Técnico
                </h4>
                <p className="text-lg md:text-xl font-medium leading-tight text-white mb-6">{term.explanation}</p>
                
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">Exemplo na Prática</h4>
                  <p className="font-mono text-sn-green-light text-xs md:text-sm italic leading-snug">"{term.example}"</p>
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

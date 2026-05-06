import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, HelpCircle, ChevronRight, MessageSquareCode, Loader2, Eye, PenTool } from 'lucide-react';
import { analyzeAnswer } from '../lib/ai';

const WordCard = ({ term, onNext }) => {
  const [mode, setMode] = useState('study'); // 'study' (flashcard) ou 'practice' (escrita)
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
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${mode === 'study' ? 'bg-sn-green text-sn-navy font-bold' : 'bg-white/5 text-text-muted'}`}
        >
          <Eye className="w-4 h-4" /> Modo Memorizar
        </button>
        <button 
          onClick={() => { setMode('practice'); setShowResult(false); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${mode === 'practice' ? 'bg-sn-green text-sn-navy font-bold' : 'bg-white/5 text-text-muted'}`}
        >
          <PenTool className="w-4 h-4" /> Modo Praticar
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!showResult && !revealed ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-8 flex flex-col gap-6"
          >
            <div className="flex justify-between items-center">
              <span className="text-sn-green font-mono text-sm tracking-widest uppercase">
                {term.level} | {term.context}
              </span>
              <HelpCircle className="text-text-muted w-5 h-5" />
            </div>

            <div className="text-center py-8">
              <h2 className="text-4xl md:text-6xl mb-2 font-bold tracking-tight">{term.word}</h2>
              {term.phonetic && <p className="text-text-muted font-mono text-base">{term.phonetic}</p>}
            </div>

            {mode === 'practice' ? (
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-muted">Tradução</label>
                  <input
                    type="text"
                    className="glass-input w-full"
                    placeholder="Sua tradução..."
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-muted">Explicação técnica</label>
                  <textarea
                    className="glass-input min-h-[100px] resize-none w-full text-sm"
                    placeholder="O que isso faz no ServiceNow?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleAnalyze}
                  className="btn-primary flex items-center justify-center gap-2 mt-4 w-full"
                  disabled={!translation || !description || isAnalyzing}
                >
                  {isAnalyzing ? <Loader2 className="animate-spin" /> : <Brain className="w-5 h-5" />}
                  Analisar com IA
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-center text-text-muted italic mb-4">
                  Tente lembrar o significado técnico deste termo...
                </p>
                <button
                  onClick={() => setRevealed(true)}
                  className="btn-primary flex items-center justify-center gap-2 w-full py-4 text-lg"
                >
                  <Eye className="w-6 h-6" />
                  Revelar Resposta
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 text-sn-green">
              {mode === 'practice' ? <Brain className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
              <h3 className="text-xl font-bold">{mode === 'practice' ? 'Feedback do Mentor' : 'Memorização'}</h3>
            </div>

            <div className="bg-sn-navy/50 p-6 rounded-2xl border border-sn-green/20">
              {aiFeedback && mode === 'practice' && (
                <div className="mb-6 p-4 bg-sn-green/5 rounded-xl border-l-4 border-sn-green">
                  <p className="text-sn-green-light italic leading-relaxed">{aiFeedback}</p>
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-sn-green uppercase tracking-wider mb-2 flex items-center gap-2">
                    <MessageSquareCode className="w-3 h-3" /> Significado Oficial
                  </h4>
                  <p className="text-xl font-medium leading-snug">{term.explanation}</p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Exemplo de Uso</h4>
                  <p className="font-mono text-sn-green-light text-sm">{term.example}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="btn-primary flex items-center justify-center gap-2 py-4 text-lg"
            >
              Próxima Palavra
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WordCard;

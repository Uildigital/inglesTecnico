import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, HelpCircle, ChevronRight, MessageSquareCode, Loader2 } from 'lucide-react';
import { analyzeAnswer } from '../lib/ai';

const WordCard = ({ term, onNext }) => {
  const [translation, setTranslation] = useState('');
  const [description, setDescription] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
    setTranslation('');
    setDescription('');
    setAiFeedback(null);
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-8 flex flex-col gap-6"
          >
            <div className="flex justify-between items-center">
              <span className="text-sn-green font-mono text-sm tracking-widest uppercase">
                {term.level} | {term.context}
              </span>
              <HelpCircle className="text-text-muted w-5 h-5" />
            </div>

            <div className="text-center py-4 md:py-8">
              <h2 className="text-3xl md:text-5xl mb-2 font-bold">{term.word}</h2>
              {term.phonetic && <p className="text-text-muted font-mono text-sm md:text-base">{term.phonetic}</p>}
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-muted">Tradução</label>
                <input
                  type="text"
                  className="glass-input w-full"
                  placeholder="Como você traduziria esse termo?"
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value)}
                  disabled={isAnalyzing}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-muted">O que é isso no ServiceNow?</label>
                <textarea
                  className="glass-input min-h-[120px] resize-none w-full"
                  placeholder="Explique o conceito técnico..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isAnalyzing}
                />
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              className="btn-primary flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
              disabled={!translation || !description || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  Analisar com IA Real
                </>
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 text-sn-green">
              <Brain className="w-6 h-6" />
              <h3 className="text-xl">Feedback do Mentor IA</h3>
            </div>

            <div className="bg-sn-navy/50 p-6 rounded-xl border border-sn-green/20">
              <p className="text-sn-green-light italic mb-4 leading-relaxed">
                {aiFeedback}
              </p>
              
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-sm text-text-muted mb-1 flex items-center gap-2">
                    <MessageSquareCode className="w-4 h-4" /> Resposta Padrão:
                  </h4>
                  <p className="text-lg leading-relaxed">{term.explanation}</p>
                </div>
                
                <div>
                  <h4 className="text-sm text-text-muted mb-1">Exemplo de uso:</h4>
                  <p className="font-mono text-sn-green-light text-sm">{term.example}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="btn-primary flex items-center justify-center gap-2"
            >
              Próximo Termo
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WordCard;

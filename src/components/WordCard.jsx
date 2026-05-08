import React, { useState } from 'react';
import { Brain, CheckCircle, ChevronRight, MessageSquare, Loader2, Volume2, Eye, PenTool, Settings2, Lightbulb, Database, Info } from 'lucide-react';
import { analyzeAnswer, translateExample } from '../lib/ai';

const WordCard = ({ term, onNext, progress }) => {
  const [mode, setMode] = useState('study'); 
  const [translation, setTranslation] = useState('');
  const [description, setDescription] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [exampleTranslation, setExampleTranslation] = useState(null);
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.8);
  const [showSpeedSettings, setShowSpeedSettings] = useState(false);

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
      setAiFeedback("Falha na conexão com a IA.");
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
    setShowSpeedSettings(false);
    onNext();
  };

  return (
    <div className="premium-card flex flex-col w-full h-full">
      
      {/* Cabeçalho do Card */}
      <div className="flex items-center justify-between p-4 border-b border-[#334155] bg-[#1e293b]">
        <div className="flex gap-2 bg-[#0f172a] p-1 rounded-lg border border-[#334155]">
          <button 
            onClick={() => { setMode('study'); setShowResult(false); setRevealed(false); }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${mode === 'study' ? 'bg-[#334155] text-white' : 'text-text-muted hover:text-white'}`}
          >
            <Eye className="w-3.5 h-3.5" /> Memorizar
          </button>
          <button 
            onClick={() => { setMode('practice'); setShowResult(false); }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${mode === 'practice' ? 'bg-[#334155] text-white' : 'text-text-muted hover:text-white'}`}
          >
            <PenTool className="w-3.5 h-3.5" /> Praticar
          </button>
        </div>
        <span className="text-xs font-mono text-text-muted bg-[#0f172a] px-3 py-1 rounded-md border border-[#334155]">
          {progress}
        </span>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-1 overflow-y-auto custom-scrollbar">
        
        {/* Metadados da Palavra */}
        <div className="flex items-center justify-center gap-2 mb-6 w-full">
          <span className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-semibold rounded uppercase tracking-wider text-center">
            {term.context}
          </span>
        </div>

        {/* Palavra Principal */}
        <div className="text-center mb-8 relative w-full flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center">
            {term.word}
          </h2>
          
          <div className="flex items-center justify-center gap-3 relative w-full">
            <button 
              onClick={() => speak(term.word)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover transition-colors shadow-lg shrink-0"
              title="Ouvir"
            >
              <Volume2 className="w-6 h-6" />
            </button>
            
            {/* Controle de Velocidade Compacto */}
            <div className="relative">
              <button 
                onClick={() => setShowSpeedSettings(!showSpeedSettings)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#334155] text-text-muted hover:text-white transition-colors"
                title="Ajustar Velocidade"
              >
                <Settings2 className="w-5 h-5" />
              </button>
              
              {showSpeedSettings && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#0f172a] border border-[#334155] rounded-xl p-2 shadow-xl z-20 flex gap-1">
                  {[0.3, 0.5, 0.8, 1.0].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => { setSpeechRate(rate); setShowSpeedSettings(false); speak(term.word); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${speechRate === rate ? 'bg-accent text-white' : 'text-text-muted hover:bg-[#334155]'}`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {term.phonetic && (
            <p className="mt-4 text-text-muted font-mono text-sm">{term.phonetic}</p>
          )}
        </div>

        {/* Área Interativa (Não Revelado) */}
        {!showResult && !revealed ? (
          <div className="flex-1 flex flex-col justify-end">
            {mode === 'practice' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5 ml-1">Sua Tradução</label>
                  <input
                    type="text"
                    className="premium-input"
                    placeholder="Ex: Registro"
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5 ml-1">Conceito Técnico</label>
                  <textarea
                    className="premium-input min-h-[100px] resize-none"
                    placeholder="Para que serve no ServiceNow?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleAnalyze}
                  className="btn-primary mt-6"
                  disabled={!translation || !description || isAnalyzing}
                >
                  {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
                  {isAnalyzing ? 'Analisando...' : 'Analisar Resposta'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleReveal}
                className="btn-primary mt-auto"
              >
                Ver Significado
              </button>
            )}
          </div>
        ) : (
          /* Área de Resultado (Revelado) */
          <div className="flex-1 flex flex-col animate-fade space-y-4 pb-4">
            
            {aiFeedback && mode === 'practice' && (
              <div className="bg-[#0f172a] border-l-4 border-accent p-4 rounded-r-lg mb-2 shadow-sm">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Brain className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Feedback IA</span>
                </div>
                <p className="text-sm text-white leading-relaxed">{aiFeedback}</p>
              </div>
            )}

            {/* Bloco de Conceito Dual (Comum vs Sistema) */}
            {term.system_meaning || term.common_meaning ? (
              <div className="grid grid-cols-1 gap-3">
                {term.common_meaning && (
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-blue-400 mb-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Inglês Comum</span>
                    </div>
                    <p className="text-sm text-blue-100/80">{term.common_meaning}</p>
                  </div>
                )}
                
                {term.system_meaning && (
                  <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-accent mb-1">
                      <Database className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">ServiceNow System</span>
                    </div>
                    <p className="text-sm text-white font-medium">{term.system_meaning}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#0f172a] rounded-xl border border-[#334155] p-5">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Info className="w-3 h-3" /> Definição
                </h4>
                <p className="text-lg font-medium text-white">{term.explanation}</p>
              </div>
            )}

            {/* Pro Tip do Especialista */}
            {term.pro_tip && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Lightbulb className="w-8 h-8 text-amber-500" />
                </div>
                <div className="flex items-center gap-2 text-amber-500 mb-1 relative z-10">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Pro Tip / Macete</span>
                </div>
                <p className="text-sm text-amber-100/90 relative z-10 leading-relaxed font-medium">
                  {term.pro_tip}
                </p>
              </div>
            )}

            {/* Exemplo Prático */}
            <div className="bg-[#0f172a] rounded-xl border border-[#334155] p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">Exemplo em Contexto</h4>
                  <p className="text-sm text-accent/90 italic font-mono mb-2">"{term.example}"</p>
                  
                  {isLoadingTranslation ? (
                    <div className="flex items-center gap-2 text-[10px] text-text-muted">
                      <Loader2 className="w-2.5 h-2.5 animate-spin" /> Traduzindo...
                    </div>
                  ) : (
                    <p className="text-sm text-text-muted leading-relaxed">{exampleTranslation}</p>
                  )}
                </div>
                <button 
                  onClick={() => speak(term.example)}
                  className="p-2 bg-[#1e293b] rounded-lg text-text-muted hover:text-white border border-[#334155] transition-colors shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="btn-primary !mt-6"
            >
              Próximo <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default WordCard;

import React, { useState } from 'react';
import { Brain, CheckCircle, ChevronRight, MessageSquare, Loader2, Volume2, Eye, PenTool, Settings2 } from 'lucide-react';
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

      <div className="p-6 md:p-8 flex flex-col flex-1">
        
        {/* Metadados da Palavra */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-semibold rounded uppercase tracking-wider">
            {term.context}
          </span>
        </div>

        {/* Palavra Principal */}
        <div className="text-center mb-8 relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {term.word}
          </h2>
          
          <div className="flex items-center justify-center gap-3 relative">
            <button 
              onClick={() => speak(term.word)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover transition-colors shadow-lg"
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
                <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#0f172a] border border-[#334155] rounded-xl p-2 shadow-xl z-10 flex gap-1">
                  {[0.5, 0.8, 1.0].map((rate) => (
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
          <div className="flex-1 flex flex-col animate-fade">
            
            {aiFeedback && mode === 'practice' && (
              <div className="bg-[#0f172a] border-l-4 border-accent p-4 rounded-r-lg mb-6 shadow-sm">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Brain className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Feedback IA</span>
                </div>
                <p className="text-sm text-white leading-relaxed">{aiFeedback}</p>
              </div>
            )}

            <div className="bg-[#0f172a] rounded-xl border border-[#334155] p-5 mb-6">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Definição Oficial</h4>
              <p className="text-lg font-medium text-white mb-5">{term.explanation}</p>

              <div className="border-t border-[#334155] pt-4 mt-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Exemplo Prático</h4>
                    <p className="text-sm text-accent/90 italic font-mono mb-2">"{term.example}"</p>
                    
                    {isLoadingTranslation ? (
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <Loader2 className="w-3 h-3 animate-spin" /> Traduzindo...
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
            </div>

            <button
              onClick={handleNext}
              className="btn-primary mt-auto"
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

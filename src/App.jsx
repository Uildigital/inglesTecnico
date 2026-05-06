import React, { useState, useEffect } from 'react';
import WordCard from './components/WordCard';
import { supabase } from './lib/supabase';
import { BookOpen, Award, Terminal, Layout, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [currentLevel, setCurrentLevel] = useState('beginner');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTerms();
  }, [currentLevel]);

  const fetchTerms = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('terms')
        .select('*')
        .eq('level', currentLevel)
        .eq('is_active', true)
        .order('id', { ascending: true });

      if (error) throw error;
      
      // Embaralhar (Shuffle) os dados recebidos
      const shuffled = (data || []).sort(() => Math.random() - 0.5);
      
      setTerms(shuffled);
      setCurrentIndex(0);
    } catch (err) {
      console.error('Error fetching terms:', err);
      setError('Erro ao carregar dados do Supabase. Verifique suas chaves no arquivo .env.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < terms.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Parabéns! Você completou este nível.");
      setCurrentIndex(0);
    }
  };

  const changeLevel = (level) => {
    if (level !== currentLevel) {
      setCurrentLevel(level);
    }
  };

  const currentTerm = terms[currentIndex];

  return (
    <div className="min-h-screen p-4 md:p-12 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-4xl flex flex-col items-center mb-12 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-sn-green/10 p-3 rounded-2xl mb-4 border border-sn-green/20"
        >
          <Terminal className="text-sn-green w-10 h-10" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl mb-2 bg-gradient-to-r from-white to-sn-gray-300 bg-clip-text text-transparent">
          SN Tech English
        </h1>
        <p className="text-text-muted text-lg max-w-md">
          Aprimore seu inglês técnico para a certificação ServiceNow da Capgemini.
        </p>
      </header>

      {/* Level Selector */}
      <nav className="grid grid-cols-3 gap-1 md:gap-4 mb-8 md:mb-12 glass-card p-1 md:p-2 rounded-2xl w-full max-w-md mx-auto">
        {[
          { id: 'beginner', label: 'Básico', icon: BookOpen },
          { id: 'intermediate', label: 'Interm.', icon: Layout },
          { id: 'advanced', label: 'Avanç.', icon: Award }
        ].map((level) => (
          <button
            key={level.id}
            onClick={() => changeLevel(level.id)}
            className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-6 py-2 md:py-3 rounded-xl transition-all text-[10px] md:text-base ${
              currentLevel === level.id 
                ? 'bg-sn-green text-sn-navy font-bold shadow-lg shadow-sn-green/20' 
                : 'hover:bg-white/5 text-text-muted'
            }`}
          >
            <level.icon className="w-4 h-4" />
            <span className="truncate">{level.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="w-full flex-grow flex items-start justify-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4 mt-20">
            <Loader2 className="w-10 h-10 text-sn-green animate-spin" />
            <p className="text-text-muted">Conectando ao banco de dados...</p>
          </div>
        ) : error ? (
          <div className="text-center p-8 glass-card border-red-500/20 max-w-md">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={fetchTerms} className="btn-primary">Tentar Novamente</button>
          </div>
        ) : currentTerm ? (
          <WordCard 
            term={currentTerm} 
            onNext={handleNext} 
          />
        ) : (
          <div className="text-center p-12 glass-card">
            <p className="text-text-muted">Nenhum termo encontrado para este nível.</p>
          </div>
        )}
      </main>

      {/* Progress Footer */}
      {!loading && !error && terms.length > 0 && (
        <footer className="mt-8 md:mt-12 text-text-muted text-sm flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-8">
          <div className="h-1.5 w-48 md:w-64 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-sn-green transition-all duration-500 shadow-[0_0_10px_rgba(129,181,50,0.5)]" 
              style={{ width: `${((currentIndex + 1) / terms.length) * 100}%` }}
            />
          </div>
          <span className="font-mono">{currentIndex + 1} de {terms.length} termos</span>
        </footer>
      )}
    </div>
  );
}

export default App;

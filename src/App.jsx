import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import WordCard from './components/WordCard';
import { Layout, Search, BookOpen, Layers } from 'lucide-react';

function App() {
  const [level, setLevel] = useState('beginner');
  const [terms, setTerms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTerms();
  }, [level]);

  const fetchTerms = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('terms')
        .select('*')
        .eq('level', level)
        .eq('is_active', true)
        .order('id', { ascending: true });

      if (error) throw error;
      
      const shuffled = (data || []).sort(() => Math.random() - 0.5);
      setTerms(shuffled);
      setCurrentIndex(0);
    } catch (err) {
      console.error('Error fetching terms:', err);
    } finally {
      setLoading(false);
    }
  };

  const nextTerm = () => {
    if (currentIndex < terms.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      fetchTerms();
    }
  };

  return (
    <div className="w-full max-w-4xl min-h-screen flex flex-col items-center pb-24">
      {/* HEADER CENTRALIZADO */}
      <header className="py-8 md:py-16 text-center w-full px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-sn-green p-2.5 rounded-2xl shadow-xl shadow-sn-green/20">
            <Layout className="text-sn-navy w-7 h-7 md:w-9 md:h-9" />
          </div>
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight">
            SN <span className="text-sn-green">Tech</span> English
          </h1>
        </div>
        <p className="text-text-muted text-xs md:text-lg max-w-md mx-auto leading-relaxed">
          Domine o vocabulário técnico da ServiceNow para sua carreira na Capgemini.
        </p>
      </header>

      {/* NAV RESPONSIVA */}
      <nav className="w-full max-w-md px-4 mb-12">
        <div className="flex bg-black/20 p-1.5 rounded-3xl border border-white/5 shadow-2xl justify-between items-center gap-1">
          <button
            onClick={() => setLevel('beginner')}
            className={`flex-1 flex flex-col items-center gap-1 py-3 px-1 rounded-2xl transition-all duration-300 ${level === 'beginner' ? 'btn-selected' : 'text-text-muted hover:bg-white/5'}`}
          >
            <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-[9px] md:text-[10px] uppercase font-black tracking-widest">Iniciante</span>
          </button>
          <button
            onClick={() => setLevel('intermediate')}
            className={`flex-1 flex flex-col items-center gap-1 py-3 px-1 rounded-2xl transition-all duration-300 ${level === 'intermediate' ? 'btn-selected' : 'text-text-muted hover:bg-white/5'}`}
          >
            <Layers className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-[9px] md:text-[10px] uppercase font-black tracking-widest">Interm.</span>
          </button>
          <button
            onClick={() => setLevel('advanced')}
            className={`flex-1 flex flex-col items-center gap-1 py-3 px-1 rounded-2xl transition-all duration-300 ${level === 'advanced' ? 'btn-selected' : 'text-text-muted hover:bg-white/5'}`}
          >
            <Search className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-[9px] md:text-[10px] uppercase font-black tracking-widest">Avançado</span>
          </button>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="w-full max-w-2xl px-4 flex-1 flex flex-col items-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <div className="w-14 h-14 border-4 border-sn-green border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sn-green/60 font-mono text-sm animate-pulse uppercase tracking-widest">Acessando Data Center...</p>
          </div>
        ) : terms.length > 0 ? (
          <WordCard 
            term={terms[currentIndex]} 
            onNext={nextTerm} 
          />
        ) : (
          <div className="text-center py-20 glass-card p-10">
            <p className="text-text-muted">Nenhum termo disponível para este nível.</p>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-sn-navy/90 backdrop-blur-xl border-t border-white/5 text-center z-50">
        <p className="text-[9px] md:text-[10px] text-text-muted uppercase tracking-[0.2em] font-black opacity-80">
          SN Tech English &bull; Capgemini Training Tool &bull; 2026
        </p>
      </footer>
    </div>
  );
}

export default App;

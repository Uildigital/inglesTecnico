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
    <>
      <header className="w-full text-center py-6 md:py-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Layout className="text-sn-green w-6 h-6" />
          <h1 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase">
            SN <span className="text-sn-green">Tech</span> English
          </h1>
        </div>
        <p className="text-text-muted text-[10px] md:text-sm uppercase tracking-[0.2em] font-bold opacity-60">
          Capgemini Study Tool
        </p>
      </header>

      <nav className="w-full mb-8">
        <div className="flex bg-black/30 p-1 rounded-2xl border border-white/5 shadow-inner">
          <button
            onClick={() => setLevel('beginner')}
            className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl transition-all duration-300 ${level === 'beginner' ? 'btn-selected' : 'text-text-muted opacity-60'}`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tighter">Iniciante</span>
          </button>
          <button
            onClick={() => setLevel('intermediate')}
            className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl transition-all duration-300 ${level === 'intermediate' ? 'btn-selected' : 'text-text-muted opacity-60'}`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tighter">Interm.</span>
          </button>
          <button
            onClick={() => setLevel('advanced')}
            className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl transition-all duration-300 ${level === 'advanced' ? 'btn-selected' : 'text-text-muted opacity-60'}`}
          >
            <Search className="w-4 h-4" />
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tighter">Avançado</span>
          </button>
        </div>
      </nav>

      <main className="w-full flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-sn-green border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sn-green/40 text-[10px] uppercase font-black tracking-widest">Acessando Banco...</p>
          </div>
        ) : terms.length > 0 ? (
          <WordCard 
            term={terms[currentIndex]} 
            onNext={nextTerm} 
          />
        ) : (
          <div className="text-center py-20 glass-card">
            <p className="text-text-muted text-sm uppercase font-bold">Nenhum termo disponível.</p>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-sn-navy/95 backdrop-blur-xl border-t border-white/5 text-center z-50">
        <p className="text-[8px] text-text-muted uppercase tracking-[0.3em] font-black opacity-50">
          ServiceNow Learning Framework &bull; 2026
        </p>
      </footer>
    </>
  );
}

export default App;

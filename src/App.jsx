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
    <div className="min-h-screen pb-20">
      <header className="p-6 md:p-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-sn-green p-2 rounded-lg shadow-lg shadow-sn-green/20">
            <Layout className="text-sn-navy w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
            SN <span className="text-sn-green">Tech</span> English
          </h1>
        </div>
        <p className="text-text-muted text-sm md:text-base max-w-md mx-auto">
          Acelere seu inglês técnico para a certificação ServiceNow da Capgemini.
        </p>
      </header>

      <nav className="max-w-xl mx-auto px-6 mb-10">
        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 shadow-2xl justify-between overflow-hidden">
          <button
            onClick={() => setLevel('beginner')}
            className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all duration-300 ${level === 'beginner' ? 'btn-selected' : 'text-text-muted hover:bg-white/5'}`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold tracking-widest">Iniciante</span>
          </button>
          <button
            onClick={() => setLevel('intermediate')}
            className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all duration-300 ${level === 'intermediate' ? 'btn-selected' : 'text-text-muted hover:bg-white/5'}`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold tracking-widest">Interm.</span>
          </button>
          <button
            onClick={() => setLevel('advanced')}
            className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all duration-300 ${level === 'advanced' ? 'btn-selected' : 'text-text-muted hover:bg-white/5'}`}
          >
            <Search className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold tracking-widest">Avançado</span>
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-sn-green border-t-transparent rounded-full animate-spin"></div>
            <p className="text-text-muted font-mono animate-pulse">Carregando termos técnicos...</p>
          </div>
        ) : terms.length > 0 ? (
          <WordCard 
            term={terms[currentIndex]} 
            onNext={nextTerm} 
          />
        ) : (
          <div className="text-center py-20">
            <p className="text-text-muted">Nenhum termo encontrado para este nível.</p>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-sn-navy/80 backdrop-blur-md border-t border-white/5 text-center">
        <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">
          SN Tech English &copy; 2026 | Capgemini Study Tool
        </p>
      </footer>
    </div>
  );
}

export default App;

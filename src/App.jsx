import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import WordCard from './components/WordCard';
import { BookOpen, Layers, Search, GraduationCap, Activity, CheckCircle2, AlertCircle } from 'lucide-react';

function App() {
  const [level, setLevel] = useState('beginner');
  const [terms, setTerms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState(null); // 'testing', 'success', 'error'
  const [testMessage, setTestMessage] = useState('');

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

  const checkConnection = async () => {
    setConnectionStatus('testing');
    setTestMessage('Testando conexão...');
    
    try {
      // Pequeno delay para feedback visual
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const { count, error } = await supabase
        .from('terms')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      
      setConnectionStatus('success');
      setTestMessage(`Conectado! ${count} termos encontrados.`);
      
      // Limpa a mensagem após 5 segundos
      setTimeout(() => {
        setConnectionStatus(null);
        setTestMessage('');
      }, 5000);
    } catch (err) {
      setConnectionStatus('error');
      setTestMessage('Falha na conexão: ' + (err.message || 'Erro desconhecido'));
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
    <div className="flex flex-col min-h-screen w-full px-4 py-6 md:py-10">
      
      {/* Header Limpo */}
      <header className="mb-8 w-full flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <GraduationCap className="text-accent w-8 h-8 md:w-10 md:h-10" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center">
            Certificado <span className="font-light text-text-muted">Tech English</span>
          </h1>
        </div>
        <p className="text-text-muted text-sm md:text-base text-center">
          Preparação para Certificação
        </p>
      </header>

      {/* Navegação Profissional (Segmented Control) */}
      <nav className="mb-8 w-full max-w-lg mx-auto">
        <div className="segmented-control overflow-x-auto">
          <button
            onClick={() => setLevel('basic')}
            className={`segmented-btn min-w-[70px] ${level === 'basic' ? 'active' : ''}`}
          >
            <BookOpen className="w-5 h-5 mb-1" />
            <span className="text-[10px] md:text-xs">Básico</span>
          </button>
          <button
            onClick={() => setLevel('beginner')}
            className={`segmented-btn min-w-[70px] ${level === 'beginner' ? 'active' : ''}`}
          >
            <Layers className="w-5 h-5 mb-1" />
            <span className="text-[10px] md:text-xs">Iniciante</span>
          </button>
          <button
            onClick={() => setLevel('intermediate')}
            className={`segmented-btn min-w-[70px] ${level === 'intermediate' ? 'active' : ''}`}
          >
            <Search className="w-5 h-5 mb-1" />
            <span className="text-[10px] md:text-xs">Interm.</span>
          </button>
          <button
            onClick={() => setLevel('advanced')}
            className={`segmented-btn min-w-[70px] ${level === 'advanced' ? 'active' : ''}`}
          >
            <GraduationCap className="w-5 h-5 mb-1" />
            <span className="text-[10px] md:text-xs">Avançado</span>
          </button>
          <button
            onClick={() => setLevel('csa')}
            className={`segmented-btn min-w-[70px] ${level === 'csa' ? 'active' : ''}`}
          >
            <Layers className="w-5 h-5 mb-1 text-accent" />
            <span className="text-[10px] md:text-xs font-bold text-accent">CSA Prep</span>
          </button>
        </div>
      </nav>

      {/* Área Principal de Estudo */}
      <main className="flex-1 w-full max-w-lg mx-auto flex flex-col">
        {loading ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-4">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="text-text-muted text-sm font-medium">Carregando módulo...</p>
          </div>
        ) : terms.length > 0 ? (
          <WordCard 
            term={terms[currentIndex]} 
            onNext={nextTerm} 
            progress={`${currentIndex + 1} / ${terms.length}`}
          />
        ) : (
          <div className="premium-card p-10 text-center flex-1 flex items-center justify-center">
            <p className="text-text-muted">Nenhum termo disponível para esta categoria.</p>
          </div>
        )}
      </main>

      {/* Rodapé com Teste de Conexão */}
      <footer className="mt-8 w-full max-w-lg mx-auto flex flex-col items-center">
        <button 
          onClick={checkConnection}
          disabled={connectionStatus === 'testing'}
          className="flex items-center gap-2 text-xs font-medium text-text-muted hover:text-accent transition-colors py-2 px-4 rounded-full border border-card-border bg-card-bg/50"
        >
          {connectionStatus === 'testing' ? (
            <div className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Activity className="w-3 h-3" />
          )}
          Testar Conexão com Supabase
        </button>
        
        {testMessage && (
          <div className={`mt-3 flex items-center gap-2 text-xs px-4 py-2 rounded-lg border animate-in fade-in slide-in-from-bottom-2 duration-300 ${
            connectionStatus === 'success' 
              ? 'bg-accent/10 border-accent/20 text-accent' 
              : connectionStatus === 'error'
              ? 'bg-danger/10 border-danger/20 text-danger'
              : 'bg-card-bg border-card-border text-text-muted'
          }`}>
            {connectionStatus === 'success' && <CheckCircle2 className="w-3 h-3" />}
            {connectionStatus === 'error' && <AlertCircle className="w-3 h-3" />}
            {testMessage}
          </div>
        )}
      </footer>

    </div>
  );
}

export default App;

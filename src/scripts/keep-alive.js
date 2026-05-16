import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Carregar variáveis de ambiente (local ou CI)
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('ERRO: Credenciais do Supabase não encontradas.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function keepAlive() {
  console.log('Iniciando pulso de atividade (Keep-alive) no Supabase...')
  
  try {
    const { data, error, count } = await supabase
      .from('terms')
      .select('*', { count: 'exact', head: true })

    if (error) throw error

    console.log(`Sucesso! O Supabase respondeu. Total de termos na base: ${count}`)
    console.log('Projeto mantido ativo com sucesso.')
  } catch (err) {
    console.error('Falha ao conectar com o Supabase:', err.message)
    process.exit(1)
  }
}

keepAlive()

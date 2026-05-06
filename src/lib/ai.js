import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Apenas para uso local de estudos
});

export const analyzeAnswer = async (term, userTranslation, userExplanation) => {
  const prompt = `
    Você é um mentor especialista em ServiceNow e Inglês Técnico da Capgemini.
    O usuário está estudando o termo: "${term.word}" (Nível: ${term.level}, Contexto: ${term.context}).
    
    A tradução do usuário: "${userTranslation}"
    A explicação técnica do usuário: "${userExplanation}"
    
    Analise a resposta do usuário e retorne um feedback curto (máximo 4 frases) em Português do Brasil.
    No seu feedback:
    1. Valide se a tradução está correta para o contexto técnico.
    2. Avalie se a explicação técnica faz sentido dentro do ServiceNow.
    3. Dê uma dica extra ou uma correção amigável se necessário.
    
    Mantenha um tom encorajador e profissional.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Versão rápida e barata
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Erro na OpenAI:", error);
    return "Ops! Tive um pequeno problema ao processar sua análise. Mas continue estudando!";
  }
};

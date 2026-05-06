-- 1. Criar a tabela de termos
CREATE TABLE IF NOT EXISTS public.terms (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    level TEXT NOT NULL,
    word TEXT NOT NULL,
    context TEXT,
    phonetic TEXT,
    example TEXT,
    explanation TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. Inserir os termos iniciais
INSERT INTO public.terms (level, word, context, phonetic, example, explanation)
VALUES 
('beginner', 'Record', 'Database', '/ˈrek.ɔːrd/', 'Each row in a ServiceNow table is a record.', 'Um "Record" é um registro individual dentro de uma tabela. Imagine como uma linha em uma planilha.'),
('beginner', 'Table', 'Data Structure', '/ˈteɪ.bəl/', 'The Incident table stores all incident records.', 'Uma "Table" é uma coleção de registros. No ServiceNow, tudo é guardado em tabelas.'),
('beginner', 'Field', 'Form', '/fiːld/', 'The "Short Description" field is mandatory.', 'Um "Field" é um campo específico de dados em um registro (ex: Nome, Data).'),
('beginner', 'Instance', 'Environment', '/ˈɪn.stəns/', 'We are working on the development instance.', 'Uma "Instance" é o seu ambiente específico do ServiceNow (ex: suaempresa.service-now.com).'),
('beginner', 'Role', 'Security', '/roʊl/', 'The user needs the "itil" role to manage incidents.', 'Uma "Role" define o que um usuário pode ou não fazer no sistema.'),
('intermediate', 'UI Policy', 'Client Side Logic', '/ˌjuː.aɪ ˈpɒl.ə.si/', 'A UI Policy can hide fields based on conditions.', 'Regra de interface que roda no navegador para esconder campos ou torná-los obrigatórios.'),
('intermediate', 'Client Script', 'Browser Scripting', '/ˈklaɪ.ənt skrɪpt/', 'Use an onChange Client Script to validate input.', 'Scripts em JavaScript que rodam no navegador do usuário.'),
('intermediate', 'Flow Designer', 'Automation', '/floʊ dɪˈzaɪ.nər/', 'Build your approvals using Flow Designer.', 'Interface visual para criar automações e fluxos de trabalho sem código.'),
('intermediate', 'Script Include', 'Server Side Logic', '/skrɪpt ɪnˈkluːd/', 'Call this Script Include from a Business Rule.', 'Scripts reutilizáveis que ficam no servidor.'),
('intermediate', 'ACL', 'Security', '/ˌeɪ.siːˈel/', 'Check the ACL if the user cannot see the record.', 'Access Control List. Define quem pode ler, escrever ou deletar dados.'),
('advanced', 'Update Set', 'Deployment', '/ˈʌp.deɪt set/', 'Remember to complete your Update Set before moving it.', 'Pacote que captura customizações para movê-las entre ambientes.'),
('advanced', 'Business Rule', 'Server Logic', '/ˈbɪz.nɪs ruːl/', 'This rule runs "Before" the record is saved.', 'Lógica que roda no servidor quando um dado é inserido ou atualizado.'),
('advanced', 'IntegrationHub', 'Integration', '/ˌɪn.təˈɡreɪ.ʃən hʌb/', 'Use IntegrationHub to connect with Slack or Jira.', 'Extensão do Flow Designer para conectar com sistemas externos.'),
('advanced', 'Dictionary Entry', 'Configuration', '/ˈdɪk.ʃə.ner.i ˈen.tri/', 'Modify the Dictionary Entry to change the field label.', 'A definição mestre de um campo ou tabela.'),
('advanced', 'Uncaught ReferenceError: "x" is not defined', 'Debug', '', 'The browser log shows a ReferenceError in the script.', 'Erro de log que indica que o código tentou usar algo que não existe.'),
('beginner', 'Filter', 'List Navigation', '/ˈfɪl.fər/', 'Apply a filter to see only active incidents.', 'Ferramenta para reduzir a lista de registros exibidos.');

-- Script de Preparação Intensiva para a Certificação CSA (ServiceNow)

INSERT INTO public.terms (level, word, context, phonetic, example, explanation)
VALUES 
-- Conceitos Fundamentais da Prova
('csa', 'Impersonate User', 'Security', '/ɪmˈpɜːr.sə.neɪt/', 'Administrators can impersonate other users for testing.', 'Simular Usuário. Recurso para ver a instância como se você fosse outra pessoa. Muito cobrado na prova.'),
('csa', 'Access Control List (ACL)', 'Security', '/ˈæk.ses kənˈtroʊl/', 'ACLs define what data a user can access.', 'Lista de Controle de Acesso. Define quem pode ver/editar o quê. Essencial para segurança.'),
('csa', 'Dictionary Entry', 'Data Schema', '/ˈdɪk.ʃə.ner.i/', 'The Dictionary Entry defines the table and field properties.', 'Entrada de Dicionário. A definição mestre de um campo ou tabela.'),
('csa', 'Business Rule', 'Server Side', '/ˈbɪz.nɪs ruːl/', 'Business Rules run when a record is displayed, inserted, or updated.', 'Regra de Negócio. Lógica que roda no servidor (Server-side).'),
('csa', 'Client Script', 'Client Side', '/ˈklaɪ.ənt skrɪpt/', 'Use a Client Script to make a field mandatory on the browser.', 'Script de Cliente. Lógica que roda no navegador do usuário (Client-side).'),
('csa', 'UI Policy', 'Client Side', '/ˌjuː.aɪ ˈpɒl.ə.si/', 'A UI Policy is used to hide or show fields on a form.', 'Política de Interface. Usada para esconder ou tornar campos obrigatórios sem usar código.'),

-- Estrutura de Dados e CMDB
('csa', 'Configuration Item (CI)', 'CMDB', '/kənˌfɪɡ.jəˈreɪ.ʃən ˈaɪ.təm/', 'A server or a laptop is a Configuration Item.', 'Item de Configuração. Qualquer componente (hardware/software) rastreado no CMDB.'),
('csa', 'CMDB', 'Data', '/ˌsiː.em.diː.biː/', 'The CMDB stores relationships between Configuration Items.', 'Configuration Management Database. O banco que guarda os itens e suas relações.'),
('csa', 'Reference Field', 'Data Schema', '/ˈref.ər.əns fiːld/', 'The Caller field is a reference field to the User table.', 'Campo de Referência. Um campo que puxa dados de outra tabela (como um "look up").'),
('csa', 'Inheritance', 'Table Structure', '/ɪnˈher.ɪ.təns/', 'The Incident table inherits fields from the Task table.', 'Herança. Quando uma tabela "filha" recebe campos de uma tabela "mãe" (Task).'),

-- Automação e Fluxo
('csa', 'Flow Designer', 'Automation', '/floʊ dɪˈzaɪ.nər/', 'Flow Designer allows you to automate business processes.', 'Ferramenta visual para criar fluxos de trabalho e automações.'),
('csa', 'Update Set', 'Deployment', '/ˈʌp.deɪt set/', 'Always capture your changes in an Update Set.', 'Pacote de Atualização. Usado para mover customizações de uma instância para outra.'),
('csa', 'Service Catalog', 'Self-Service', '/ˈsɜː.vɪs ˈkæt.ə.lɒɡ/', 'Users can request items through the Service Catalog.', 'Catálogo de Serviços. Onde os usuários pedem hardware, software ou serviços.'),
('csa', 'Order Guide', 'Service Catalog', '/ˈɔːr.dər ɡaɪd/', 'An Order Guide groups multiple items into one request.', 'Guia de Pedido. Agrupa vários itens do catálogo em um único pedido (ex: kit de novo funcionário).'),

-- Comandos e Verbos Frequentes em Questões
('csa', 'Mandatory', 'Requirement', '/ˈmæn.də.tɔːr.i/', 'Ensure the Short Description field is mandatory.', 'Obrigatório. O campo não pode ficar vazio.'),
('csa', 'Read-only', 'Requirement', '/ˌriːdˈoʊn.li/', 'Set the field to read-only after the ticket is closed.', 'Somente leitura. O usuário pode ver o dado, mas não pode alterá-lo.'),
('csa', 'Trigger', 'Automation', '/ˈtrɪɡ.ər/', 'What event triggers the Business Rule?', 'Gatilho. O evento que faz uma ação começar (ex: clicar em salvar).'),
('csa', 'Best Practice', 'Methodology', '/best ˈpræk.tɪs/', 'Using UI Policies instead of Client Scripts is a best practice.', 'Melhor Prática. A maneira recomendada pela ServiceNow de fazer algo.'),
('csa', 'Schema Map', 'Visualization', '/ˈskiː.mə mæp/', 'The Schema Map displays the relationships between tables.', 'Mapa de Esquema. Visualização gráfica das relações entre as tabelas.'),
('csa', 'Dot-walking', 'Data Access', '/dɒt ˈwɔː.kɪŋ/', 'Use dot-walking to reference fields from a parent table.', 'Navegação por ponto. Técnica para acessar campos de tabelas relacionadas através de um campo de referência.');

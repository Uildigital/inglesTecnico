-- Script Parte 2: Mais 30 termos essenciais para a Certificação CSA (ServiceNow)

INSERT INTO public.terms (level, word, context, phonetic, example, explanation)
VALUES 
-- Gerenciamento de Dados e Importação (Cai muito!)
('csa', 'Import Set', 'Data Import', '/ˈɪm.pɔːrt set/', 'An Import Set is used to pull data from external sources.', 'Conjunto de Importação. Ferramenta para trazer dados de fora para dentro do ServiceNow.'),
('csa', 'Transform Map', 'Data Import', '/trænsˈfɔːrm mæp/', 'The Transform Map guides data from the source table to the target table.', 'Mapa de Transformação. Define como os campos importados se encaixam nas tabelas do sistema.'),
('csa', 'Coalesce', 'Data Import', '/ˌkoʊ.əˈles/', 'Use Coalesce to prevent duplicate records during import.', 'Coalescer (Unir). Campo usado como chave única para evitar registros duplicados.'),
('csa', 'Data Policy', 'Data Integrity', '/ˈdeɪ.tə ˈpɒl.ə.si/', 'Data Policies are enforced on all data entries, including imports.', 'Política de Dados. Regras de obrigatoriedade que valem tanto na tela quanto na importação.'),

-- Relatórios e Dashboards
('csa', 'Report Designer', 'Reporting', '/rɪˈpɔːrt dɪˈzaɪ.nər/', 'Use Report Designer to create bar charts and pie charts.', 'Criador de Relatórios. Interface para gerar gráficos e tabelas de dados.'),
('csa', 'Metric', 'Reporting', '/ˈmet.rɪk/', 'Metrics track how long an incident stays in a specific state.', 'Métrica. Mede o tempo ou desempenho de um processo (ex: quanto tempo ficou "Em Aberto").'),
('csa', 'Performance Analytics', 'Reporting', '/pərˈfɔːr.məns ˌæn.əˈlɪt.ɪks/', 'Performance Analytics tracks trends over time.', 'Análise de Desempenho. Ferramenta para ver tendências históricas (não apenas o dado de agora).'),

-- Conhecimento e Colaboração
('csa', 'Knowledge Base', 'Knowledge', '/ˈnɒl.ɪdʒ beɪs/', 'The Knowledge Base stores articles and troubleshooting guides.', 'Base de Conhecimento. Onde ficam guardados os artigos de ajuda e manuais.'),
('csa', 'Knowledge Article', 'Knowledge', '/ˈnɒl.ɪdʒ ˈɑːr.tɪ.kəl/', 'Publish a Knowledge Article to help users solve common issues.', 'Artigo de Conhecimento. O texto/manual individual dentro da base.'),
('csa', 'User Criteria', 'Security', '/ˈjuː.zər kraɪˈtɪə.ri.ə/', 'User Criteria defines who can read or contribute to a knowledge base.', 'Critérios de Usuário. Define grupos de pessoas que podem ver ou editar artigos.'),

-- Notificações e Eventos
('csa', 'Notification', 'Communication', '/ˌnoʊ.tɪ.fɪˈkeɪ.ʃən/', 'Set up a notification to alert the user via email.', 'Notificação. Avisos enviados (e-mail, SMS, push) quando algo acontece.'),
('csa', 'Event', 'System Logic', '/ɪˈvent/', 'An event triggers a notification.', 'Evento. Um sinal no sistema que diz "algo aconteceu", disparando uma ação.'),

-- Interface de Usuário Avançada
('csa', 'UI Action', 'UI Element', '/ˌjuː.aɪ ˈæk.ʃən/', 'A UI Action adds a button or a link to a form.', 'Ação de Interface. Botões (como "Submit" ou "Resolve") criados pelo administrador.'),
('csa', 'View', 'UI Element', '/vjuː/', 'Users can switch between different views of a form.', 'Visualização. Diferentes layouts do mesmo formulário para diferentes pessoas.'),
('csa', 'Formatter', 'UI Element', '/ˈfɔːr.mæt.ər/', 'The Activity Stream is a common formatter on the Incident form.', 'Formatador. Elementos especiais no formulário (ex: o campo de histórico de atividades).'),

-- Tabelas e Relacionamentos
('csa', 'Task Table', 'Table Structure', '/tæsk ˈteɪ.bəl/', 'The Task table is a base table for Incident and Change.', 'Tabela de Tarefas. A tabela "pai" de quase tudo que gera trabalho no ServiceNow.'),
('csa', 'Base Table', 'Table Structure', '/beɪs ˈteɪ.bəl/', 'A base table is a table that is extended by other tables.', 'Tabela Base. Uma tabela que serve de fundação para outras (ex: Task).'),
('csa', 'Core Table', 'Table Structure', '/kɔːr ˈteɪ.bəl/', 'Core tables are provided by ServiceNow out-of-the-box.', 'Tabelas Core. Tabelas que já vêm prontas no sistema (ex: User, Group).'),

-- Segurança e Perfis
('csa', 'Role', 'Security', '/roʊl/', 'Assign a role to a group to manage permissions.', 'Papel / Função. Conjunto de permissões dado a usuários ou grupos.'),
('csa', 'Group', 'Security', '/ɡruːp/', 'It is a best practice to assign roles to groups, not users.', 'Grupo. Conjunto de usuários (ex: Time de Suporte).'),
('csa', 'Elevated Privilege', 'Security', '/ˈel.ə.veɪ.tɪd ˈprɪv.əl.ɪdʒ/', 'Use elevated privileges only when performing security configurations.', 'Privilégio Elevado. Nível extra de acesso (ex: security_admin) para tarefas críticas.'),

-- Prova: Conceitos de Pergunta
('csa', 'Workflow', 'Automation', '/ˈwɜːrk.floʊ/', 'The workflow automates the approval process.', 'Fluxo de Trabalho. Sequência de passos automáticos.'),
('csa', 'Service Portal', 'Self-Service', '/ˈsɜː.vɪs ˈpɔːr.təl/', 'End-users interact with ServiceNow through the Service Portal.', 'Portal de Serviço. A interface amigável para o usuário final.'),
('csa', 'Catalog Item', 'Service Catalog', '/ˈkæt.ə.lɒɡ ˈaɪ.təm/', 'A laptop is a common catalog item.', 'Item de Catálogo. O "produto" que o usuário pede no portal.'),
('csa', 'Variable', 'Service Catalog', '/ˈveə.ri.ə.bəl/', 'Variables collect information from the user on a catalog item.', 'Variável. As perguntas que aparecem no formulário do catálogo (ex: Cor do celular).'),
('csa', 'Record Producer', 'Service Catalog', '/ˈrek.ɔːrd prəˈdʒuː.sər/', 'A Record Producer creates a record in a target table from the portal.', 'Gerador de Registro. Um item do catálogo que vira um registro (ex: abrir um Incidente).'),
('csa', 'Guided Setup', 'Configuration', '/ˈɡaɪ.dɪd ˈset.ʌp/', 'Use Guided Setup to configure a new application.', 'Configuração Guiada. Passo a passo oficial para configurar módulos.'),
('csa', 'Delegate', 'System Admin', '/ˈdel.ɪ.ɡət/', 'Users can delegate their approvals to others.', 'Delegar. Passar a responsabilidade de aprovação para outra pessoa temporariamente.'),
('csa', 'Branding', 'Configuration', '/ˈbrændɪŋ/', 'Use branding to change the colors and logo of the instance.', 'Identidade Visual. Configurar cores e logos para a cara da empresa.'),
('csa', 'Banner Image', 'Configuration', '/ˈbæn.ər ˈɪm.ɪdʒ/', 'Change the banner image in the System Properties.', 'Imagem do Banner. O logo que fica no topo da tela do ServiceNow.');

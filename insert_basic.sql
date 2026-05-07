-- Execute este script no SQL Editor do Supabase para adicionar o Módulo Básico.

INSERT INTO public.terms (level, word, context, phonetic, example, explanation)
VALUES 
-- Verbos Estruturais Básicos
('basic', 'To Create', 'Action', '/tə kriˈeɪt/', 'I need to create a new user.', 'Verbo "Criar". Usado para tudo que é novo no sistema. Ex: Create an account (Criar uma conta).'),
('basic', 'To Save', 'Action', '/tə seɪv/', 'Save the form before leaving.', 'Verbo "Salvar". Gravar as informações que você acabou de digitar.'),
('basic', 'To Update', 'Action', '/tə ʌpˈdeɪt/', 'Please update the status to Closed.', 'Verbo "Atualizar". Mudar uma informação que já existe para uma mais recente.'),
('basic', 'To Delete', 'Action', '/tə dɪˈliːt/', 'Do not delete this record.', 'Verbo "Deletar" ou "Excluir". Apagar permanentemente algo do sistema.'),

-- Frases Prontas Essenciais (Sobrevivência)
('basic', 'How to...?', 'Question', '/haʊ tə/', 'How to reset my password?', 'Estrutura "Como... ?". Muito usada para pesquisar no Google ou perguntar algo. (Como resetar minha senha?).'),
('basic', 'What is...?', 'Question', '/wɒt ɪz/', 'What is an incident?', 'Estrutura "O que é...?". Essencial para descobrir o significado das coisas. (O que é um incidente?).'),
('basic', 'Where is...?', 'Question', '/weər ɪz/', 'Where is the submit button?', 'Estrutura "Onde está...?". Usada para procurar menus, botões ou páginas.'),

-- Interface Básica (O que você vê)
('basic', 'Button', 'UI Element', '/ˈbʌt.ən/', 'Click the green button.', 'Significa "Botão". Qualquer coisa clicável na tela para executar uma ação.'),
('basic', 'Form', 'UI Element', '/fɔːrm/', 'Fill out this form.', 'Significa "Formulário". A tela cheia de campos onde você digita as informações do cliente.'),
('basic', 'List', 'UI Element', '/lɪst/', 'Check the list of active users.', 'Significa "Lista". Uma tabela com várias linhas mostrando vários registros de uma vez.'),
('basic', 'Menu', 'UI Element', '/ˈmen.juː/', 'Open the navigation menu.', 'Significa "Menu". A lista de opções que geralmente fica na esquerda da tela.'),

-- Termos de Usuário
('basic', 'User', 'People', '/ˈjuː.zər/', 'The user forgot the password.', 'Significa "Usuário". A pessoa que está usando o sistema.'),
('basic', 'Password', 'Security', '/ˈpæs.wɜːrd/', 'Enter your password.', 'Significa "Senha". O código secreto para entrar no sistema.'),
('basic', 'Login', 'Security', '/ˈlɒɡ.ɪn/', 'Click here to login.', 'A ação de entrar no sistema colocando seu usuário e senha.'),
('basic', 'Submit', 'Action', '/səbˈmɪt/', 'Submit the request.', 'Significa "Enviar" ou "Submeter". Clicar no botão final para mandar o formulário pronto para o servidor.');

-- Execute este script no SQL Editor do Supabase para adicionar 50 termos do Módulo Básico.

INSERT INTO public.terms (level, word, context, phonetic, example, explanation)
VALUES 
-- 1. Ações Básicas (Verbos Essenciais)
('basic', 'To Create', 'Action', '/tə kriˈeɪt/', 'Create a new user.', 'Criar. Usado para adicionar algo novo.'),
('basic', 'To Save', 'Action', '/tə seɪv/', 'Save your work.', 'Salvar. Guardar as informações no sistema.'),
('basic', 'To Update', 'Action', '/tə ʌpˈdeɪt/', 'Update the status.', 'Atualizar. Modificar ou renovar um dado existente.'),
('basic', 'To Delete', 'Action', '/tə dɪˈliːt/', 'Delete this file.', 'Deletar / Excluir. Apagar um registro ou arquivo.'),
('basic', 'To Edit', 'Action', '/tə ˈed.ɪt/', 'Edit the form.', 'Editar. Alterar o conteúdo de um formulário ou texto.'),
('basic', 'To Cancel', 'Action', '/tə ˈkæn.səl/', 'Cancel the operation.', 'Cancelar. Abortar uma ação antes que ela seja concluída.'),
('basic', 'To Search', 'Action', '/tə sɜːtʃ/', 'Search for the incident.', 'Pesquisar / Buscar. Procurar por uma informação específica.'),
('basic', 'To Select', 'Action', '/tə sɪˈlekt/', 'Select an option from the list.', 'Selecionar. Escolher uma opção em um menu ou lista.'),
('basic', 'To Open', 'Action', '/tə ˈoʊ.pən/', 'Open the record.', 'Abrir. Acessar um registro, arquivo ou menu.'),
('basic', 'To Close', 'Action', '/tə kloʊz/', 'Close the window.', 'Fechar. Encerrar uma tela, chamado ou janela.'),

-- 2. Estruturas de Pergunta e Frases Prontas
('basic', 'How to...?', 'Structure', '/haʊ tə/', 'How to reset my password?', 'Como...? Usado para pedir instruções ou tutoriais.'),
('basic', 'What is...?', 'Structure', '/wɒt ɪz/', 'What is an incident?', 'O que é...? Usado para perguntar o significado de algo.'),
('basic', 'Where is...?', 'Structure', '/weər ɪz/', 'Where is the button?', 'Onde está...? Usado para localizar menus ou opções.'),
('basic', 'Why is...?', 'Structure', '/waɪ ɪz/', 'Why is the system slow?', 'Por que (motivo)...? Usado para entender a razão de um problema.'),
('basic', 'I need to...', 'Structure', '/aɪ niːd tə/', 'I need to change my password.', 'Eu preciso... Usado para expressar uma necessidade ou ação que você vai fazer.'),
('basic', 'Please, wait', 'Communication', '/pliːz, weɪt/', 'Please, wait for the system to load.', 'Por favor, aguarde. Muito comum em telas de carregamento.'),
('basic', 'Are you sure?', 'Confirmation', '/ɑːr juː ʃʊər/', 'Are you sure you want to delete?', 'Você tem certeza? Mensagem de confirmação comum antes de ações destrutivas.'),
('basic', 'Click here', 'Instruction', '/klɪk hɪər/', 'Click here to continue.', 'Clique aqui. Instrução básica de navegação.'),
('basic', 'Go to...', 'Instruction', '/ɡoʊ tə/', 'Go to the homepage.', 'Vá para... Instrução para navegar até outra página.'),
('basic', 'Try again', 'Error', '/traɪ əˈɡen/', 'Error. Please try again.', 'Tente novamente. Aparece muito quando ocorre uma falha no sistema.'),

-- 3. Interface e Navegação (O que você vê na tela)
('basic', 'Button', 'UI Element', '/ˈbʌt.ən/', 'Click the green button.', 'Botão. Elemento clicável.'),
('basic', 'Form', 'UI Element', '/fɔːrm/', 'Fill out the form.', 'Formulário. Página com campos de texto para preencher dados.'),
('basic', 'List', 'UI Element', '/lɪst/', 'Check the list.', 'Lista. Tabela com várias linhas (registros).'),
('basic', 'Menu', 'UI Element', '/ˈmen.juː/', 'Open the menu.', 'Menu. Lista de opções de navegação.'),
('basic', 'Window', 'UI Element', '/ˈwɪn.doʊ/', 'Close the current window.', 'Janela. A tela ou pop-up do navegador.'),
('basic', 'Link', 'UI Element', '/lɪŋk/', 'Open this link.', 'Link / Atalho. Texto clicável que te leva a outra página.'),
('basic', 'Icon', 'UI Element', '/ˈaɪ.kɒn/', 'Click the gear icon for settings.', 'Ícone. Pequena imagem que representa uma ação (ex: ícone de engrenagem).'),
('basic', 'Tab', 'UI Element', '/tæb/', 'Go to the next tab.', 'Aba. Divisão horizontal em uma tela para organizar informações.'),
('basic', 'Dashboard', 'UI Element', '/ˈdæʃ.bɔːrd/', 'Look at the main dashboard.', 'Painel de controle. Tela inicial com gráficos e resumos importantes.'),
('basic', 'Checkbox', 'UI Element', '/ˈtʃek.bɒks/', 'Check the box to confirm.', 'Caixa de seleção. Aquele quadradinho onde você clica para marcar "Sim" (✓).'),

-- 4. Status e Condições de Sistema
('basic', 'Active', 'Status', '/ˈæk.tɪv/', 'The user is active.', 'Ativo. Significa que está funcionando ou habilitado.'),
('basic', 'Inactive', 'Status', '/ɪnˈæk.tɪv/', 'This account is inactive.', 'Inativo. Significa que está desabilitado ou pausado.'),
('basic', 'Pending', 'Status', '/ˈpen.dɪŋ/', 'The approval is pending.', 'Pendente. Aguardando uma ação ou aprovação.'),
('basic', 'Approved', 'Status', '/əˈpruːvd/', 'Your request is approved.', 'Aprovado. A solicitação foi aceita.'),
('basic', 'Rejected', 'Status', '/rɪˈdʒek.tɪd/', 'The request was rejected.', 'Rejeitado. A solicitação foi negada.'),
('basic', 'Error', 'Status', '/ˈer.ər/', 'System error.', 'Erro. Algo falhou ou quebrou.'),
('basic', 'Success', 'Status', '/səkˈses/', 'Operation completed with success.', 'Sucesso. A ação deu certo e terminou bem.'),
('basic', 'Warning', 'Status', '/ˈwɔːr.nɪŋ/', 'Warning: High memory usage.', 'Aviso / Alerta. Uma mensagem para você prestar atenção, mas que ainda não é um erro fatal.'),
('basic', 'Empty', 'Status', '/ˈemp.ti/', 'The list is empty.', 'Vazio. Não contém dados ou resultados.'),
('basic', 'Full', 'Status', '/fʊl/', 'The database is full.', 'Cheio. A capacidade máxima foi atingida.'),

-- 5. Pessoas, Segurança e Dados Essenciais
('basic', 'User', 'People', '/ˈjuː.zər/', 'The user logged in.', 'Usuário. A pessoa utilizando o sistema.'),
('basic', 'Admin', 'People', '/ˈæd.mɪn/', 'Contact your system admin.', 'Administrador. O usuário com acesso total para configurar o sistema.'),
('basic', 'Password', 'Security', '/ˈpæs.wɜːrd/', 'Type your password.', 'Senha. O código secreto de acesso.'),
('basic', 'Login', 'Security', '/ˈlɒɡ.ɪn/', 'Please login.', 'Entrar no sistema.'),
('basic', 'Logout', 'Security', '/ˈlɒɡ.aʊt/', 'Logout when you finish.', 'Sair do sistema. Encerrar a sessão.'),
('basic', 'Data', 'System', '/ˈdeɪ.tə/', 'Save the data.', 'Dados / Informações. Tudo que fica armazenado no banco de dados.'),
('basic', 'File', 'System', '/faɪl/', 'Upload the file.', 'Arquivo. (Ex: PDF, Imagem, Documento de texto).'),
('basic', 'System', 'System', '/ˈsɪs.təm/', 'The system is down.', 'Sistema. O software ou aplicativo como um todo.'),
('basic', 'Network', 'System', '/ˈnet.wɜːrk/', 'Check your network connection.', 'Rede / Internet. A conexão de comunicação.'),
('basic', 'Access', 'Security', '/ˈæk.ses/', 'Access denied.', 'Acesso. A permissão para ver ou entrar em alguma área do sistema.');

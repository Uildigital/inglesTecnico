-- Script para inserir termos com contexto técnico dual (Inglês Comum vs ServiceNow)
-- Execute no SQL Editor do Supabase após rodar o comando de ALTER TABLE

INSERT INTO public.terms (level, word, context, common_meaning, system_meaning, pro_tip, example, explanation)
VALUES 
(
    'intermediate', 
    'Breadcrumbs', 
    'Navigation', 
    'Migalhas de pão (como na história de João e Maria).', 
    'O caminho de filtros que aparece no topo de uma lista.', 
    'Dica de Prova: Você pode clicar em qualquer parte das breadcrumbs para remover filtros rapidamente.', 
    'Click on the breadcrumbs to remove the filter.', 
    'Indica o caminho da filtragem atual na lista de registros.'
),
(
    'intermediate', 
    'Impersonate', 
    'Testing', 
    'Fingir ser outra pessoa ou imitar alguém.', 
    'Ação de acessar o sistema "na pele" de outro usuário para testar permissões.', 
    'Muito usado por administradores para ver o que um usuário comum está vendo.', 
    'I will impersonate the requester to test the UI Policy.', 
    'Permite que um administrador veja a interface exatamente como outro usuário vê.'
),
(
    'advanced', 
    'Dictionary', 
    'Database', 
    'Livro de definições de palavras.', 
    'A tabela mestre (sys_dictionary) que define as propriedades de cada campo.', 
    'Se você mudar algo no Dictionary, a mudança afeta o sistema inteiro, não apenas um formulário.', 
    'Check the Dictionary Entry for this field.', 
    'Onde as definições "raiz" do banco de dados são guardadas.'
),
(
    'intermediate', 
    'Elevate Roles', 
    'Security', 
    'Subir de cargo ou promoção.', 
    'Ativar temporariamente permissões de segurança (como security_admin).', 
    'Você precisa elevar roles para mexer em ACLs (regras de acesso).', 
    'You must elevate your roles to edit this ACL.', 
    'Ação de segurança para confirmar que você realmente quer usar permissões sensíveis.'
),
(
    'advanced', 
    'Staging Table', 
    'Import Sets', 
    'Um palco de apresentações.', 
    'Uma tabela temporária onde os dados ficam "esperando" antes de serem importados oficialmente.', 
    'Pense nela como uma sala de espera para os dados serem limpos antes de entrar no sistema.', 
    'The data is currently in the staging table.', 
    'Tabela intermediária usada durante a importação de dados externos.'
),
(
    'intermediate', 
    'Reference Field', 
    'Data Type', 
    'Um campo de referência bibliográfica.', 
    'Um campo que busca dados de outra tabela (como um link).', 
    'Sempre que você vê um ícone de lupa, é um Reference Field.', 
    'The "Caller" field is a reference to the User table.', 
    'Campo que estabelece um relacionamento entre duas tabelas diferentes.'
);

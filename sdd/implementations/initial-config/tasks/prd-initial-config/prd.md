# Documento de Requisitos de Produto (PRD) - Configuração Inicial da Infraestrutura

## Visão Geral

Este PRD define a configuração inicial da infraestrutura do Daily Health API, uma aplicação que registra dados de saúde dos usuários (sono, hidratação, alimentação e exercícios). A configuração estabelecerá a base para desenvolvimento local e deploy em produção, permitindo que desenvolvedores trabalhem em ambos os ambientes sem conflitos.

O Daily Health API é um back-end NestJS que armazena dados de saúde coletados de smartwatches e input manual, com PostgreSQL como banco de dados e Vercel como plataforma de deploy.

## Objetivos

- **Sucesso**: O projeto deve buildar e executar corretamente tanto em ambiente local quanto em produção
- **Métricas principais**:
  - Build sem erros em ambos os ambientes
  - Conexão funcional com banco de dados local e remoto
  - Deploy bem-sucedido no Vercel
- **Objetivos de negócio**: Estabelecer infraestrutura estável para desenvolvimento contínuo da aplicação de monitoramento de saúde

## Histórias de Usuário

- **Como desenvolvedor**, quero configurar o banco de dados PostgreSQL local para que eu possa desenvolver e testar funcionalidades sem depender de recursos externos
- **Como desenvolvedor**, quero configurar o banco de dados remoto (Vercel Neon) para que eu possa fazer deploy em produção
- **Como desenvolvedor**, quero que o sistema alterne automaticamente entre banco local e remoto baseado no ambiente para que eu não precise configurar manualmente a cada mudança
- **Como desenvolvedor**, quero configurar o TypeORM com suporte a migrations para que eu possa gerenciar evoluções do schema do banco de dados
- **Como desenvolvedor**, quero configurar o Blob store do Vercel para que a aplicação possa armazenar arquivos .fit de exercícios
- **Como desenvolvedor**, quero configurar o deploy no Vercel para que eu possa publicar a aplicação em produção

## Funcionalidades Principais

### 1. Configuração do Banco de Dados PostgreSQL

**O que faz**: Configura conexões PostgreSQL para ambientes local e remoto (Vercel Neon)

**Por que é importante**: Permite desenvolvimento isolado e deploy em produção sem conflitos de dados

**Como funciona em alto nível**: Sistema detecta ambiente automaticamente e utiliza configuração apropriada

**Requisitos funcionais**:
1.1. O sistema deve suportar configuração de banco de dados local (PostgreSQL instalado localmente)
1.2. O sistema deve suportar configuração de banco de dados remoto (Vercel Neon PostgreSQL)
1.3. O sistema deve alternar automaticamente entre banco local e remoto baseado no ambiente de execução
1.4. Em ambiente local, o sistema deve utilizar banco de dados local
1.5. Em ambiente de produção, o sistema deve utilizar banco de dados remoto do Vercel

### 2. Configuração do Blob Store do Vercel

**O que faz**: Configura integração com Vercel Blob Storage para armazenamento de arquivos

**Por que é importante**: Permite armazenar arquivos .fit de exercícios de forma escalável

**Como funciona em alto nível**: Configuração de credenciais e integração com SDK do Vercel Blob

**Requisitos funcionais**:
2.1. O sistema deve configurar o Blob store do Vercel com as credenciais fornecidas
2.2. O sistema deve permitir upload e download de arquivos .fit
2.3. O sistema deve integrar o Blob store com a aplicação NestJS

### 3. Configuração do ORM (TypeORM)

**O que faz**: Configura TypeORM como ORM para interação com PostgreSQL

**Por que é importante**: Fornece abstração robusta para operações de banco de dados e gerenciamento de schema

**Como funciona em alto nível**: Configuração de módulo TypeORM com suporte a migrations

**Requisitos funcionais**:
3.1. O sistema deve configurar TypeORM como ORM padrão
3.2. O sistema deve configurar suporte a migrations para gerenciamento de schema
3.3. O sistema deve configurar TypeORM para funcionar com PostgreSQL
3.4. O sistema deve suportar execução de migrations em ambos os ambientes (local e produção)

### 4. Configuração para Deploy no Vercel

**O que faz**: Configura a aplicação para deploy na plataforma Vercel

**Por que é importante**: Permite publicação automatizada e escalável da aplicação

**Como funciona em alto nível**: Configuração de variáveis de ambiente e scripts de build para Vercel

**Requisitos funcionais**:
4.1. O sistema deve configurar variáveis de ambiente necessárias para o Vercel
4.2. O sistema deve configurar scripts de build compatíveis com Vercel
4.3. O sistema deve configurar a aplicação para executar corretamente no ambiente serverless do Vercel

## Experiência do Usuário

**Personas de usuário**: Desenvolvedores trabalhando no projeto Daily Health API

**Fluxos principais**:
- Desenvolvedor clona o projeto e configura ambiente local
- Desenvolvedor executa `npm run build` sem erros
- Desenvolvedor executa aplicação localmente com banco de dados local
- Desenvolvedor faz deploy para Vercel com banco de dados remoto
- Sistema alterna automaticamente entre configurações baseado no ambiente

**Considerações de UI/UX**: Não aplicável (configuração de infraestrutura)

**Requisitos de acessibilidade**: Não aplicável (configuração de infraestrutura)

## Restrições Técnicas de Alto Nível

**Integrações externas requeridas**:
- PostgreSQL (local e Vercel Neon)
- Vercel Blob Storage
- Vercel Platform para deploy

**Mandatos de conformidade**: Nenhum especificado

**Metas de performance/escalabilidade**:
- Suportar conexões simultâneas em ambiente de produção
- Latência de conexão com banco de dados aceitável para operações CRUD

**Considerações de sensibilidade de dados/privacidade**:
- Credenciais de banco de dados e Blob store devem ser gerenciadas via variáveis de ambiente
- Dados de saúde dos usuários requerem tratamento seguro (implementação futura)

**Requisitos não negociáveis de tecnologia**:
- NestJS como framework
- PostgreSQL como banco de dados
- TypeORM como ORM
- Vercel como plataforma de deploy

## Fora de Escopo

**Funcionalidades explicitamente excluídas**:
- Criação de tabelas do banco de dados
- Seeds iniciais de dados
- Configuração de CI/CD
- Implementação de lógica de negócio da aplicação
- Configuração de segurança adicional (autenticação, autorização)
- Implementação de endpoints da API

**Considerações futuras**:
- Configuração de ambiente de staging
- Implementação de testes automatizados
- Configuração de monitoramento e logging
- Implementação de backup e restore

**Limites e limitações**:
- Configuração focada apenas em ambientes de desenvolvimento e produção
- Sem suporte a ambientes adicionais (staging, QA)

## Questões em Aberto

Nenhuma - todas as questões foram esclarecidas com o usuário.

## Restrições - Não fazer em hipótese alguma

- Não expor credenciais de banco de dados ou Blob store no código fonte
- Não commitar arquivos com dados sensíveis no repositório
- Não configurar ambientes adicionais além de desenvolvimento e produção
- Não implementar funcionalidades de negócio nesta fase

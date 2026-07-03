# Tarefa 1.0: Configurar ConfigModule e variáveis de ambiente

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

<complexity>LOW</complexity>
<depends_on>0</depends_on>

Configurar o módulo de configuração do NestJS para gerenciamento centralizado de variáveis de ambiente, criando o template .env.example e configurando o ConfigModule como módulo global. Esta é a base para todas as outras configurações de infraestrutura.

<requirements>
- Instalar @nestjs/config
- Criar arquivo .env.example com todas as variáveis necessárias
- Configurar ConfigModule como módulo global no AppModule
- Validar que variáveis de ambiente são carregadas corretamente
</requirements>

## Subtarefas

- [ ] 1.1 Instalar dependência @nestjs/config
- [ ] 1.2 Criar arquivo .env.example com template de variáveis de ambiente
- [ ] 1.3 Configurar ConfigModule.forRootAsync no AppModule com isGlobal: true
- [ ] 1.4 Criar testes para validar carregamento de variáveis de ambiente

## Detalhes de Implementação

Referência: techspec.md seção "Sequenciamento de Desenvolvimento" - item 1

**Escopo da implementação:**
- Modificar `src/app.module.ts` para configurar ConfigModule
- Criar `.env.example` na raiz do projeto com variáveis:
  - ENVIRONMENT (local/production)
  - DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME (para local)
  - DATABASE_URL (para produção/Vercel Neon)
  - BLOB_STORE_ID, BLOB_READ_WRITE_TOKEN (para Vercel Blob)
  - DB_LOGGING, DB_SYNCHRONIZE (flags de configuração)
- Modificar `package.json` para adicionar @nestjs/config

**Arquivos afetados:**
- `src/app.module.ts`
- `.env.example` (novo arquivo)
- `package.json`

## Critérios de Sucesso

- Build do projeto completa sem erros após instalação de @nestjs/config
- .env.example contém todas as variáveis necessárias documentadas
- ConfigModule é configurado como módulo global
- Aplicação inicia sem erros de configuração

## Testes da Tarefa

- [ ] Teste de unidade: validar que ConfigModule carrega variáveis corretamente
- [ ] Teste de integração: validar que variáveis estão acessíveis em qualquer módulo

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/app.module.ts`
- `.env.example`
- `package.json`
- `prd.md`
- `techspec.md`

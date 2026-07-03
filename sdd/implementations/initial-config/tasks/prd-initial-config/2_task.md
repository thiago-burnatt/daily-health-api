# Tarefa 2.0: Configurar DatabaseModule com TypeORM

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

<complexity>HIGH</complexity>
<depends_on>1</depends_on>

Configurar o módulo de banco de dados com TypeORM, incluindo instalação de dependências, criação de configuração baseada em ambiente (local/produção), retry logic para resiliência, e migrations automáticas. Esta é a tarefa mais complexa e deve seguir abordagem TDD (red-green-refactor).

<requirements>
- Instalar @nestjs/typeorm, typeorm, pg
- Criar database.config.ts com factory function baseada em ENVIRONMENT
- Criar DatabaseModule com TypeOrmModule.forRootAsync
- Configurar retry logic (3 tentativas, 3000ms delay)
- Configurar migrations automáticas no startup
- Integrar DatabaseModule no AppModule
- Suportar conexão local (PostgreSQL) e remota (Vercel Neon)
</requirements>

## Subtarefas

- [ ] 2.1 Instalar dependências (@nestjs/typeorm, typeorm, pg)
- [ ] 2.2 Criar src/config/database.config.ts com tipo DatabaseConfig e factory function
- [ ] 2.3 Criar src/modules/database/database.module.ts com TypeOrmModule.forRootAsync
- [ ] 2.4 Configurar retry logic e migrations automáticas no database.config.ts
- [ ] 2.5 Integrar DatabaseModule no AppModule
- [ ] 2.6 Criar testes de unidade para database.config.ts
- [ ] 2.7 Criar testes de integração para DatabaseModule

## Detalhes de Implementação

Referência: techspec.md seção "Design de Implementação" - Interfaces Principais e "Sequenciamento de Desenvolvimento" - item 2

**Escopo da implementação:**
- Modificar `package.json` para adicionar @nestjs/typeorm, typeorm, pg
- Criar `src/config/database.config.ts` com:
  - Tipo DatabaseConfig (host, port, username, password, database, ssl, synchronize, logging, retryAttempts, retryDelay, migrationsRun)
  - Factory function que detecta ENVIRONMENT e retorna configuração apropriada
  - Para local: usa DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
  - Para produção: usa DATABASE_URL completo (Vercel Neon)
- Criar `src/modules/database/database.module.ts` com:
  - TypeOrmModule.forRootAsync usando factory do database.config.ts
  - Configuração de retryAttempts: 3, retryDelay: 3000
  - Configuração de migrationsRun: true
- Modificar `src/app.module.ts` para importar DatabaseModule

**Abordagem TDD (red-green-refactor):**
1. Criar testes primeiro para database.config.ts (validar factory function para ambos os ambientes)
2. Criar testes para DatabaseModule (validar configuração do TypeORM)
3. Implementar database.config.ts para fazer testes passarem
4. Implementar DatabaseModule para fazer testes passarem
5. Refatorar para melhorar legibilidade e manutenibilidade

**Arquivos afetados:**
- `package.json`
- `src/config/database.config.ts` (novo arquivo)
- `src/modules/database/database.module.ts` (novo arquivo)
- `src/app.module.ts`

## Critérios de Sucesso

- Build do projeto completa sem erros após instalação das dependências
- DatabaseModule configura TypeORM corretamente para ambiente local
- DatabaseModule configura TypeORM corretamente para ambiente produção
- Retry logic está configurado (3 tentativas, 3000ms delay)
- Migrations automáticas estão habilitadas (migrationsRun: true)
- Testes de unidade passam para database.config.ts
- Testes de integração passam para DatabaseModule
- Aplicação inicia sem erros de conexão com banco de dados

## Testes da Tarefa

- [ ] Teste de unidade: validar factory function retorna configuração correta para ENVIRONMENT=local
- [ ] Teste de unidade: validar factory function retorna configuração correta para ENVIRONMENT=production
- [ ] Teste de unidade: validar que retryAttempts e retryDelay estão configurados corretamente
- [ ] Teste de integração: validar que DatabaseModule conecta ao banco local
- [ ] Teste de integração: validar que TypeORM está configurado com migrations automáticas

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>
<critical>SEGUIR ABORDAGEM TDD (RED-GREEN-REFACTOR) DEVIDO À ALTA COMPLEXIDADE</critical>

## Arquivos relevantes
- `package.json`
- `src/config/database.config.ts`
- `src/modules/database/database.module.ts`
- `src/app.module.ts`
- `prd.md`
- `techspec.md`

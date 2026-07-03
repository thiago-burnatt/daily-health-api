# Tarefa 4.0: Validar build e execução local

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

<complexity>LOW</complexity>
<depends_on>1,2,3</depends_on>

Validar que a aplicação builda e executa corretamente em ambiente local, garantindo que todas as configurações (ConfigModule, DatabaseModule, BlobStorageModule) estão funcionando corretamente e que o sistema alterna entre ambientes conforme esperado.

<requirements>
- Testar build local sem erros
- Testar execução da aplicação com banco de dados local
- Validar carregamento correto de todas as configurações
- Validar que sistema detecta ENVIRONMENT corretamente
- Documentar procedimento de setup local no README
</requirements>

## Subtarefas

- [ ] 4.1 Executar build local (npm run build ou pnpm build)
- [ ] 4.2 Configurar arquivo .env local com variáveis de ambiente
- [ ] 4.3 Iniciar aplicação localmente e validar conexão com banco
- [ ] 4.4 Validar que ConfigModule carrega variáveis corretamente
- [ ] 4.5 Validar que DatabaseModule conecta ao PostgreSQL local
- [ ] 4.6 Validar que BlobStorageModule é inicializado sem erros
- [ ] 4.7 Atualizar README com instruções de setup local
- [ ] 4.8 Criar script de verificação automatizada (opcional)

## Detalhes de Implementação

Referência: techspec.md seção "Sequenciamento de Desenvolvimento" - item 4

**Escopo da implementação:**
- Executar build da aplicação para validar que não há erros de compilação
- Criar arquivo `.env` local com variáveis de ambiente para desenvolvimento:
  - ENVIRONMENT=local
  - DB_HOST=localhost
  - DB_PORT=5432
  - DB_USER=postgres (ou usuário configurado)
  - DB_PASSWORD=sua_senha
  - DB_NAME=daily_health
  - BLOB_STORE_ID=seu_store_id
  - BLOB_READ_WRITE_TOKEN=seu_token
  - DB_LOGGING=true
  - DB_SYNCHRONIZE=false
- Iniciar aplicação (`npm run start:dev` ou `pnpm start:dev`)
- Validar logs para confirmar:
  - ConfigModule carregado
  - TypeORM conectado ao PostgreSQL local
  - BlobStorageModule inicializado
- Atualizar `README.md` com seção de "Setup Local" incluindo:
  - Pré-requisitos (PostgreSQL instalado, Node.js, pnpm)
  - Passo a passo para configurar ambiente local
  - Comandos para build e execução
  - Variáveis de ambiente necessárias

**Arquivos afetados:**
- `README.md` (atualização)
- `.env` (novo arquivo, não commitado)

## Critérios de Sucesso

- Build da aplicação completa sem erros
- Aplicação inicia sem erros em ambiente local
- Logs confirmam conexão com PostgreSQL local
- Logs confirmam inicialização do BlobStorageModule
- README contém instruções claras para setup local
- Desenvolvedor consegue replicar setup local seguindo README

## Testes da Tarefa

- [ ] Teste manual: build local sem erros
- [ ] Teste manual: execução local sem erros
- [ ] Teste manual: validação de logs para confirmação de configurações
- [ ] Teste manual: validação de README seguindo instruções documentadas

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `README.md`
- `.env`
- `src/app.module.ts`
- `src/config/database.config.ts`
- `src/config/blob-storage.config.ts`
- `prd.md`
- `techspec.md`

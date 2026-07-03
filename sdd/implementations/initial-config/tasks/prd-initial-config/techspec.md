# Especificação Técnica - Configuração Inicial da Infraestrutura

## Resumo Executivo

Esta tech spec define a configuração inicial da infraestrutura do Daily Health API, estabelecendo a base para desenvolvimento local e deploy em produção. A abordagem utiliza módulos separados para configuração de banco de dados (DatabaseModule) e Blob Storage (BlobStorageModule), integrados via ConfigModule do NestJS para gerenciamento de variáveis de ambiente. O sistema detecta automaticamente o ambiente através da variável `ENVIRONMENT` e configura as conexões apropriadas: PostgreSQL local para desenvolvimento e Vercel Neon para produção. TypeORM será configurado com suporte a migrations executadas automaticamente no startup, retry logic para resiliência de conexões, e integração com Vercel Blob Storage para armazenamento de arquivos .fit.

## Arquitetura do Sistema

### Visão Geral dos Componentes

- **DatabaseModule**: Módulo responsável pela configuração do TypeORM e conexão com PostgreSQL. Gerencia configurações distintas para ambientes local e produção baseado na variável `ENVIRONMENT`. Configura retry logic, migrations automáticas e logging.
- **BlobStorageModule**: Módulo responsável pela configuração do Vercel Blob Storage. Configura credenciais e SDK para upload/download de arquivos .fit. Será exposto como módulo global para uso futuro em módulos de domínio.
- **ConfigModule**: Módulo do NestJS para gerenciamento centralizado de variáveis de ambiente. Configurado como global para acesso em toda aplicação.
- **AppModule**: Módulo raiz que importa e configura DatabaseModule e BlobStorageModule. Modificado para incluir os novos módulos de infraestrutura.

**Fluxo de dados**: No startup, ConfigModule carrega variáveis de ambiente → DatabaseModule detecta `ENVIRONMENT` → Configura TypeORM com conexão apropriada → Executa migrations automaticamente → BlobStorageModule configura SDK do Vercel Blob → Aplicação pronta para receber requisições.

## Design de Implementação

### Interfaces Principais

```typescript
// src/config/database.config.ts
export type DatabaseConfig = {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl: boolean;
  synchronize: boolean;
  logging: boolean;
  retryAttempts: number;
  retryDelay: number;
  migrationsRun: boolean;
};

// src/config/blob-storage.config.ts
export type BlobStorageConfig = {
  storeId: string;
  readWriteToken: string;
};
```

### Modelos de Dados

Não aplicável - esta fase configura apenas infraestrutura. Entidades de domínio serão criadas em implementações futuras.

### Endpoints de API

Não aplicável - esta fase configura apenas infraestrutura. Endpoints serão criados em implementações futuras.

## Pontos de Integração

- **PostgreSQL Local**: Conexão via TCP em localhost:5432. Credenciais configuradas via variáveis de ambiente (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME). Sem autenticação adicional além de credenciais padrão do PostgreSQL.
- **Vercel Neon PostgreSQL**: Conexão via connection string com SSL obrigatório. Credenciais fornecidas via DATABASE_URL. Tratamento de erros: falhas de conexão retornam erro sem fallback.
- **Vercel Blob Storage**: Integração via SDK @vercel/blob. Autenticação via BLOB_READ_WRITE_TOKEN. Operações suportadas: put (upload), get (download), del (delete). Tratamento de erros: falhas de upload/download retornam erro sem retry.

## Abordagem de Testes

### Testes Unidade

Não aplicável - configuração de infraestrutura não requer testes unitários conforme especificado pelo usuário.

### Testes de Integração

Não aplicável - configuração de infraestrutura não requer testes de integração conforme especificado pelo usuário.

### Testes de E2E

Não aplicável - configuração de infraestrutura não requer testes E2E conforme especificado pelo usuário.

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. **ConfigModule e variáveis de ambiente**: Configurar @nestjs/config como módulo global. Criar arquivo .env.example com template de variáveis necessárias. Primeiro passo pois outros módulos dependem dele.
2. **DatabaseModule**: Instalar @nestjs/typeorm, typeorm, pg. Criar database.config.ts com factory function baseada em ENVIRONMENT. Configurar TypeOrmModule.forRootAsync com retry logic e migrations automáticas. Modificar AppModule para importar DatabaseModule.
3. **BlobStorageModule**: Instalar @vercel/blob. Criar blob-storage.config.ts com factory function. Configurar BlobStorageModule como módulo global. Modificar AppModule para importar BlobStorageModule.
4. **Validação de build e execução**: Testar build local, execução com banco local, e validar que configurações são carregadas corretamente.

### Dependências Técnicas

- PostgreSQL instalado localmente para desenvolvimento
- Conta Vercel Neon configurada e ativa
- Conta Vercel Blob Storage configurada e ativa
- Node.js e pnpm instalados

## Monitoramento e Observabilidade

Não aplicável nesta fase - monitoramento e logging avançado serão configurados em implementações futuras. Logging básico do TypeORM será habilitado via configuração (DB_LOGGING).

## Considerações Técnicas

### Decisões Principais

- **Módulos separados**: DatabaseModule e BlobStorageModule separados para manter responsabilidade única e facilitar testes futuros. Alternativa rejeitada: configuração monolítica no AppModule seria menos maintainable.
- **ENVIRONMENT vs NODE_ENV**: Uso de variável customizada ENVIRONMENT em vez de NODE_ENV para maior clareza e evitar conflitos com convenções do NestJS. Valores: 'local' ou 'production'.
- **Migrations automáticas**: Configuração migrationsRun: true para executar migrations no startup. Alternativa rejeitada: execução manual seria propensa a erros humanos em deploy.
- **Retry logic no TypeORM**: Configuração retryAttempts: 3 e retryDelay: 3000ms para resiliência de conexões. Baseado em melhores práticas do Context 7.
- **BlobStorageModule global**: Configurado como módulo global para facilitar uso futuro em módulos de domínio sem necessidade de imports repetidos.
- **Uso de DATABASE_URL completo**: Para Vercel Neon, uso da connection string completa em vez de parâmetros individuais para simplificar configuração e aproveitar pooling do Neon.

### Riscos Conhecidos

- **Conexão com PostgreSQL local**: Desenvolvedores podem não ter PostgreSQL instalado. Mitigação: documentar requisitos de instalação no README.
- **Credenciais expostas**: Variáveis de ambiente com credenciais sensíveis. Mitigação: .env já está no .gitignore, documentar uso de .env.example.
- **Migrations em produção**: Execução automática de migrations pode causar downtime se não forem testadas. Mitigação: documentar necessidade de testar migrations em ambiente local antes de deploy.
- **Vercel Blob Storage limits**: Limites de armazenamento e bandwidth podem ser excedidos. Mitigação: monitorar uso através do dashboard da Vercel (implementação futura).

### Conformidade com Padrões

Não há regras específicas em .windsurf/rules ou ~/.windsurf/rules para este projeto. Seguindo padrões do NestJS e melhores práticas do Context 7.

### Arquivos relevantes e dependentes

- **src/app.module.ts**: Será modificado para importar DatabaseModule e BlobStorageModule
- **src/main.ts**: Pode requerer modificações para habilitar validation pipe ou outras configurações globais
- **package.json**: Será modificado para adicionar dependências (@nestjs/typeorm, typeorm, pg, @vercel/blob, @nestjs/config)
- **.env.example**: Será criado com template de variáveis de ambiente
- **src/config/database.config.ts**: Será criado para configuração do TypeORM
- **src/config/blob-storage.config.ts**: Será criado para configuração do Blob Storage
- **src/modules/database/database.module.ts**: Será criado como módulo de banco de dados
- **src/modules/blob-storage/blob-storage.module.ts**: Será criado como módulo de Blob Storage

# Tarefa 3.0: Configurar BlobStorageModule

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

<complexity>MEDIUM</complexity>
<depends_on>1</depends_on>

Configurar o módulo de Blob Storage do Vercel para armazenamento de arquivos .fit, incluindo instalação do SDK, criação de configuração baseada em variáveis de ambiente, e configuração como módulo global para uso futuro em módulos de domínio.

<requirements>
- Instalar @vercel/blob
- Criar blob-storage.config.ts com factory function
- Criar BlobStorageModule como módulo global
- Configurar SDK do Vercel Blob com credenciais
- Integrar BlobStorageModule no AppModule
</requirements>

## Subtarefas

- [ ] 3.1 Instalar dependência @vercel/blob
- [ ] 3.2 Criar src/config/blob-storage.config.ts com tipo BlobStorageConfig e factory function
- [ ] 3.3 Criar src/modules/blob-storage/blob-storage.module.ts como módulo global
- [ ] 3.4 Configurar SDK do Vercel Blob no módulo
- [ ] 3.5 Integrar BlobStorageModule no AppModule
- [ ] 3.6 Criar testes de unidade para blob-storage.config.ts
- [ ] 3.7 Criar testes de integração para BlobStorageModule

## Detalhes de Implementação

Referência: techspec.md seção "Design de Implementação" - Interfaces Principais e "Sequenciamento de Desenvolvimento" - item 3

**Escopo da implementação:**
- Modificar `package.json` para adicionar @vercel/blob
- Criar `src/config/blob-storage.config.ts` com:
  - Tipo BlobStorageConfig (storeId, readWriteToken)
  - Factory function que carrega BLOB_STORE_ID e BLOB_READ_WRITE_TOKEN do ConfigService
- Criar `src/modules/blob-storage/blob-storage.module.ts` com:
  - Configuração como módulo global (@Global())
  - Provider para o SDK do Vercel Blob usando factory do blob-storage.config.ts
  - Export do provider para uso em outros módulos
- Modificar `src/app.module.ts` para importar BlobStorageModule

**Arquivos afetados:**
- `package.json`
- `src/config/blob-storage.config.ts` (novo arquivo)
- `src/modules/blob-storage/blob-storage.module.ts` (novo arquivo)
- `src/app.module.ts`

## Critérios de Sucesso

- Build do projeto completa sem erros após instalação da dependência
- BlobStorageModule é configurado como módulo global
- SDK do Vercel Blob é configurado com credenciais corretas
- Testes de unidade passam para blob-storage.config.ts
- Testes de integração passam para BlobStorageModule
- Aplicação inicia sem erros de configuração do Blob Storage

## Testes da Tarefa

- [ ] Teste de unidade: validar factory function retorna configuração correta com BLOB_STORE_ID e BLOB_READ_WRITE_TOKEN
- [ ] Teste de unidade: validar que credenciais são carregadas do ConfigService
- [ ] Teste de integração: validar que BlobStorageModule expõe SDK do Vercel Blob
- [ ] Teste de integração: validar que módulo é global e acessível em outros módulos

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `package.json`
- `src/config/blob-storage.config.ts`
- `src/modules/blob-storage/blob-storage.module.ts`
- `src/app.module.ts`
- `prd.md`
- `techspec.md`

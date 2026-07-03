---
name: sdd-spec-driven
description: Orquestra o fluxo SDD (PRD -> Tech Spec -> Tarefas -> Execução) usando apenas recursos locais (workflows e templates do codebase) com progressive disclosure.
---

# Skill SDD (Spec-Driven Design)

Use esta skill quando o usuário pedir para criar PRD, Tech Spec, tarefas, executar tarefas ou criar spec completa (ex.: "Vamos especificar a tarefa XPTO", "Planeje XPTO", "Crie um plano para XPTO", "Vamos gerar PRD para XPTO", "criar spec completa" ou "documentar codebase"). Ela encadeia os workflows padronizados, aplica os templates e utiliza apenas arquivos locais.

## Gatilhos
- Pedido de PRD.
- Pedido de Tech Spec.
- Pedido de criação de tarefas.
- Pedido de execução de tarefas específicas.
- Pedido de "spec completa" (executar todas as etapas em sequência).
- Pedido de "documentar codebase".

## Recursos locais (use sob demanda)
- Workflows (não carregar todos de uma vez), dentro de `./workflows/`:
  - PRD: `./workflows/criar-prd.md`
  - Tech Spec: `./workflows/criar-tech-spec.md`
  - Tasks: `./workflows/criar-tasks.md`
  - Execução de Task: `./workflows/executar-task.md`
  - Documentar Codebase: `./workflows/documentar_codebase.md`
- Templates (abrir somente na etapa correspondente), dentro de `./templates/`:
  - PRD: `./templates/prd-template.md`
  - Tech Spec: `./templates/techspec-template.md`
  - Tasks (lista): `./templates/tasks-template.md`
  - Task individual: `./templates/task-template.md`
  - Referência de codebase para Tech Spec: `./templates/techspec-codebase-template.md`
  
## Operação por etapa
### 0. Preparação
- Se possível, começar em conversa nova (contexto limpo).
- Identificar o slug/nome da funcionalidade em kebab-case (ex.: `prd-meu-feature`).

### 1. Criar PRD (`/criar-prd`)
- Rodar o workflow `criar-prd.md`.
- Fazer perguntas de clarificação antes de redigir.
- Usar template `./templates/prd-template.md` (abrir apenas ao redigir).
- Salvar em `./tasks/prd-[nome-funcionalidade]/prd.md`.

### 2. Criar Tech Spec (`/criar-tech-spec`)
- Garantir PRD em `./tasks/prd-[nome-funcionalidade]/prd.md`.
- Rodar workflow `criar-tech-spec.md`.
- Fazer análise do codebase/regras antes de perguntar.
- Usar template `./templates/techspec-template.md` (abrir ao redigir) e, se necessário, `./templates/techspec-codebase-template.md` para padrões do repositório.
- Salvar em `./tasks/prd-[nome-funcionalidade]/techspec.md`.

### 3. Criar Tarefas (`/criar-tasks`)
- Confirmar existência de PRD e Tech Spec.
- Rodar workflow `criar-tasks.md`.
- Apresentar lista high-level para aprovação antes de gerar arquivos.
- Gerar `tasks.md` usando `./templates/tasks-template.md` (abrir ao gerar a lista) e arquivos individuais `[num]_task.md` usando `./templates/task-template.md`.
- Salvar tudo em `./tasks/prd-[nome-funcionalidade]/`.

### 4. Executar Tarefas (`/executar-task`)
- Para cada tarefa, usar workflow `executar-task.md` com o arquivo da tarefa.
- Ler PRD, Tech Spec e tarefa; seguir plano e testes obrigatórios; marcar conclusão em `tasks.md`.

### 5. Documentar code base (`/documentar_codebase`)
- Rodar workflow `documentar_codebase.md`.
- Salvar em `documentos/techspec-codebase.md`.

### 6. Encadeamento "spec completa"
- Quando o usuário pedir a spec completa ou plano completo, executar na ordem: PRD -> Tech Spec -> Tasks. Depois, se solicitado, iniciar execução da primeira tarefa usando `/executar-task`.

## Progressive disclosure
- Não carregar todos os recursos ao mesmo tempo; abra cada workflow/template local somente na etapa correspondente.
- Evitar buscas externas: use apenas os arquivos dentro desta skill.
- Nas etapas de Tech Spec, consulte `./documentos/techspec-codebase.md` apenas se precisar de padrões do repositório.
- Mantenha perguntas de clarificação focadas e só depois abra o template para redigir.

## Diretrizes
- Sempre trabalhar em português do Brasil.
- Respeitar os fluxos de perguntas antes de produzir documentos.
- Não pular etapas obrigatórias dos workflows.
- Em tarefas, cada item deve ser entregável funcional, com dependências claras e complexidade definida.

## Exemplos
- "Vamos gerar PRD para checkout unificado" → Acionar etapa 1.
- "Crie a tech spec do checkout unificado" → Acionar etapa 2.
- "Planeje tarefas para checkout unificado" → Etapa 3 (apresentar lista antes).
- "Executar a tarefa 2.0 do checkout unificado" → Etapa 4.
- "Crie spec completa para checkout unificado" → Etapas 1, 2 e 3 encadeadas.

# Documento de Requisitos de Produto (PRD) - Health Entity

## Visão Geral

Sistema de registro de saúde pessoal que permite aos usuários manter registros detalhados de suas informações diárias de saúde, incluindo dados de sono, refeições, hidratação e exercícios. A funcionalidade é uma API backend-only que fornece uma estrutura consistente para armazenar e gerenciar dados de saúde pessoais através de um único endpoint, simplificando a entrada de dados pelo usuário.

## Objetivos

- Capacitar usuários a manter registros detalhados e estruturados de sua saúde diária
- Fornecer uma interface unificada para entrada de dados de saúde (único formulário/endpoint)
- Garantir integridade dos dados através de relacionamentos bem definidos entre entidades
- Suportar upload de arquivos de exercícios em formato .fit

## Histórias de Usuário

- Como usuário que deseja manter registros sobre minha saúde, eu quero registrar meus dados diários de sono, refeições, hidratação e exercícios através de um único formulário para que eu possa ter um registro organizado e completo da minha saúde
- Como usuário, eu quero que o sistema gerencie automaticamente os relacionamentos entre meus dados de saúde (sono, refeições, hidratação) para que eu não precise preocupar com a estrutura técnica dos dados
- Como usuário, eu quero fazer upload de arquivos de exercícios em formato .fit para que eu possa registrar minhas atividades físicas detalhadas

## Funcionalidades Principais

### CRUD Completo de Health Overview

Funcionalidade principal que permite criar, ler, atualizar e deletar registros de visão geral de saúde. Cada Health Overview pode conter informações opcionais de sono, hidratação, múltiplas refeições e arquivo de exercícios.

- **O que faz**: Gerencia o ciclo de vida completo dos registros de saúde diários
- **Por que é importante**: É o ponto central de entrada e gerenciamento de todos os dados de saúde do usuário
- **Como funciona**: Usuário envia dados através de um único endpoint, sistema cria/gerencia entidades relacionadas automaticamente

**Requisitos funcionais:**
1. Sistema deve permitir criação de Health Overview com todos os campos opcionais (exceto id, created_at, updated_at)
2. Sistema deve permitir leitura de Health Overview por ID
3. Sistema deve permitir atualização de Health Overview por ID
4. Sistema deve permitir deleção de Health Overview por ID
5. Sistema deve criar automaticamente entidades Sleep, Water Intake e Meal quando dados correspondentes são fornecidos
6. Sistema deve implementar cascade delete obrigatório: ao deletar Health Overview, deletar todos os registros relacionados (Sleep, Water Intake, Meal)
7. Sistema deve permitir relacionamento de um Health Overview com exatamente um Sleep
8. Sistema deve permitir relacionamento de um Health Overview com exatamente um Water Intake
9. Sistema deve permitir relacionamento de um Health Overview com múltiplos Meal
10. Sistema deve suportar upload de arquivo .fit no campo exercise_file

### Entidades Relacionadas

Entidades de apoio que armazenam dados específicos de saúde, criadas e gerenciadas exclusivamente através do Health Overview.

- **O que faz**: Armazenam dados estruturados de sono, refeições e hidratação
- **Por que é importante**: Permitem organização granular dos dados de saúde
- **Como funciona**: São criadas automaticamente quando dados correspondentes são fornecidos no Health Overview

**Requisitos funcionais:**
11. Entidade Sleep deve armazenar: id, light_sleep, deep_sleep, rem_sleep, total_sleep, sleep_start, sleep_end (todos obrigatórios)
12. Entidade Meal deve armazenar: id, meal_type, meal_time, quantity, unit (todos obrigatórios)
13. Entidade Water Intake deve armazenar: id, quantity, unit (todos obrigatórios)
14. Sistema não deve expor endpoints diretos para criação/manejo de Sleep, Water Intake ou Meal
15. Sistema deve fornecer DTOs para criação, atualização e resposta de todas as entidades

## Experiência do Usuário

### Personas e Necessidades

- **Usuário principal de saúde**: Pessoa que deseja manter registro detalhado de suas informações de saúde diárias de forma manual, sem necessidade de integrações automáticas ou visualizações complexas

### Fluxos Principais

1. **Criação de registro diário**: Usuário acessa endpoint único, fornece dados opcionais de sono, refeições, hidratação e upload de arquivo .fit, sistema cria Health Overview e entidades relacionadas
2. **Consulta de registro**: Usuário solicita Health Overview por ID, sistema retorna dados completos incluindo entidades relacionadas
3. **Atualização de registro**: Usuário atualiza Health Overview por ID, sistema atualiza entidades relacionadas conforme necessário
4. **Deleção de registro**: Usuário deleta Health Overview por ID, sistema remove registro e todas as entidades relacionadas (cascade delete)

### Requisitos de UI/UX

- API backend-only, sem interface de usuário fornecida neste escopo
- Entrada de dados via único endpoint/formulário simplificado

### Requisitos de Acessibilidade

- Não aplicável (API backend-only)

## Restrições Técnicas de Alto Nível

- Sistema deve suportar upload de arquivos em formato .fit para campo exercise_file
- Sistema deve implementar cascade delete obrigatório para entidades relacionadas
- Sistema deve limitar criação a um registro Health Overview por dia (validação a ser definida na implementação)
- Sistema deve utilizar sistema de armazenamento de arquivos existente (blob-storage configurado no projeto)
- Sistema deve utilizar banco de dados relacional para gerenciar relacionamentos entre entidades

## Fora de Escopo

- Analytics ou dashboards de visualização dos dados de saúde
- Integração com dispositivos wearables (Apple Watch, Fitbit, etc.)
- Notificações ou alertas baseados nos dados de saúde
- Interface de usuário (frontend)
- Validações de regras de negócio complexas (ex: valores mínimos/máximos para campos)
- Requisitos de compliance regulatórios (LGPD, HIPAA, etc.)
- Requisitos específicos de performance (latência, throughput)
- Endpoints diretos para criação/manejo individual de Sleep, Water Intake ou Meal

## Questões em Aberto

- A regra de "um registro por dia" deve ser validada por data de created_at ou por outro campo?
- Deve haver validação para evitar sobreposição de registros de sono (sleep_start/sleep_end)?
- O campo watch_model tem valores pré-definidos ou é livre?
- O campo meal_type tem valores pré-definidos ou é livre?
- Deve haver limite máximo para o número de refeições por Health Overview?

## Restrições - Não fazer em hipótese alguma

- Não criar endpoints diretos para Sleep, Water Intake ou Meal (acesso exclusivamente através de Health Overview)
- Não implementar cascade delete como opcional (deve ser obrigatório)
- Não aceitar formatos de arquivo diferentes de .fit para exercise_file
- Não incluir funcionalidades de analytics, dashboards ou visualizações de dados
- Não incluir integrações com dispositivos wearables
- Não incluir sistema de notificações ou alertas

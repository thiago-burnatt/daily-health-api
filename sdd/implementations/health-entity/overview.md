Resumo da implementação das entidades:

# Entidades:

## Sleep

Todos os campos são obrigatórios.

- id UUID
- light_sleep int
- deep_sleep int
- rem_sleep int
- total_sleep int
- sleep_start datetime
- sleep_end datetime

## Meal

Todos os campos são obrigatórios.

- id UUID
- meal_type string
- meal_time datetime
- quantity int
- unit string

## Water Intake

Todos os campos são obrigatórios.

- id UUID
- quantity int
- unit string

## Health Overview

Com exceção dos campos id, created_at e updated_at, todos os outros campos são opcionais.

- id UUID
- watch_model - string
- sleep_info - sleep_id
- water_intake - water_intake_id
- meals - meal_id[]
- exercise_file - string
- created_at - date
- updated_at - date

# As entidades devem possuir DTOs para criação, atualização e resposta.

# Deve ser implementado um CRUD completo para a entidade Health Overview.

# Deve existir apenas endpoints para Health Overview, não deve haver endpoints para as entidades Sleep, Water Intake e Meal (essas entidades serão criadas a partir do Health Overview).

# Informações adicionais sobre as entidades:

- Cada entidade Health Overview pode conter apenas um relacionamento com uma entidade Sleep e Water Intake.
- Cada entidade Health Overview pode conter múltiplos relacionamentos com a entidade Meal.
- Ao deletar um registro Health Overview, os registros relacionados (Sleep, Water Intake e Meal) devem ser deletados.

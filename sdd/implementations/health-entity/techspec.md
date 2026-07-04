# Especificação Técnica - Health Entity
 
## Resumo Executivo
 
Implementação de módulo NestJS para gerenciamento de registros de saúde pessoais com CRUD completo da entidade Health Overview e entidades relacionadas (Sleep, Water Intake, Meal). A solução utiliza TypeORM com relacionamentos e cascade delete automático, upload de arquivos .fit via Vercel Blob Storage, e transações para garantir atomicidade. O módulo segue padrão existente de módulos independentes com controller, service, entities e DTOs separados.
 
## Arquitetura do Sistema
 
### Visão Geral dos Componentes
 
- **BlobStorageService** (modificado): Serviço de upload de arquivos para Vercel Blob Storage dentro do módulo blob-storage existente
- **HealthEntityModule**: Módulo NestJS independente em `src/modules/health-entity/` contendo controller, service, entities e DTOs
- **HealthOverviewEntity**: Entidade TypeORM principal com relacionamentos @OneToOne (Sleep, WaterIntake) e @OneToMany (Meal) com cascade delete
- **SleepEntity**: Entidade TypeORM para dados de sono (light_sleep, deep_sleep, rem_sleep, total_sleep, sleep_start, sleep_end)
- **WaterIntakeEntity**: Entidade TypeORM para dados de hidratação (quantity, unit)
- **MealEntity**: Entidade TypeORM para dados de refeições (meal_type, meal_time, quantity, unit)
- **HealthOverviewService**: Serviço com lógica de CRUD, gerenciamento de entidades relacionadas e transações
- **HealthOverviewController**: Controller com endpoints CRUD aceitando multipart/form-data para upload de arquivo .fit
- **DTOs**: Classes separadas para criação, atualização e resposta de cada entidade (Sleep, WaterIntake, Meal, HealthOverview)
 
Relacionamentos: HealthOverview (1) -> (1) Sleep, HealthOverview (1) -> (1) WaterIntake, HealthOverview (1) -> (*) Meal. Cascade delete automático via decorators TypeORM. Fluxo de dados: multipart/form-data -> DTOs -> Service com transação -> TypeORM com cascade delete -> Blob Storage (opcional).
 
## Design de Implementação
 
### Interfaces Principais
 
```typescript
// BlobStorageService (a ser criado em blob-storage module)
interface BlobStorageService {
  uploadFile(file: Express.Multer.File): Promise<string>;
  deleteFile(url: string): Promise<void>;
}

// HealthOverviewService
interface HealthOverviewService {
  create(data: CreateHealthOverviewDto, file?: Express.Multer.File): Promise<HealthOverviewResponseDto>;
  findById(id: string): Promise<HealthOverviewResponseDto>;
  update(id: string, data: UpdateHealthOverviewDto, file?: Express.Multer.File): Promise<HealthOverviewResponseDto>;
  delete(id: string): Promise<void>;
}
```
 
### Modelos de Dados
 
**Entidades TypeORM:**
 
```typescript
@Entity('sleep')
export class SleepEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  light_sleep: number;

  @Column()
  deep_sleep: number;

  @Column()
  rem_sleep: number;

  @Column()
  total_sleep: number;

  @Column()
  sleep_start: Date;

  @Column()
  sleep_end: Date;
}

@Entity('meal')
export class MealEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  meal_type: string;

  @Column()
  meal_time: Date;

  @Column()
  quantity: number;

  @Column()
  unit: string;
}

@Entity('water_intake')
export class WaterIntakeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  unit: string;
}

@Entity('health_overview')
export class HealthOverviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  watch_model: string;

  @OneToOne(() => SleepEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  sleep_info: SleepEntity;

  @OneToOne(() => WaterIntakeEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  water_intake: WaterIntakeEntity;

  @OneToMany(() => MealEntity, meal => meal.health_overview, { cascade: true, onDelete: 'CASCADE' })
  meals: MealEntity[];

  @Column({ nullable: true })
  exercise_file: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

**DTOs com class-validator:**
 
```typescript
// CreateSleepDto
export class CreateSleepDto {
  @IsNumber()
  @IsPositive()
  light_sleep: number;

  @IsNumber()
  @IsPositive()
  deep_sleep: number;

  @IsNumber()
  @IsPositive()
  rem_sleep: number;

  @IsNumber()
  @IsPositive()
  total_sleep: number;

  @IsDateString()
  sleep_start: Date;

  @IsDateString()
  sleep_end: Date;
}

// CreateMealDto
export class CreateMealDto {
  @IsString()
  meal_type: string;

  @IsDateString()
  meal_time: Date;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  unit: string;
}

// CreateWaterIntakeDto
export class CreateWaterIntakeDto {
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  unit: string;
}

// CreateHealthOverviewDto
export class CreateHealthOverviewDto {
  @IsOptional()
  @IsString()
  watch_model?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSleepDto)
  sleep_info?: CreateSleepDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateWaterIntakeDto)
  water_intake?: CreateWaterIntakeDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMealDto)
  meals?: CreateMealDto[];
}
```
 
### Endpoints de API
 
- `POST /health-overview` - Criar Health Overview com entidades relacionadas e upload opcional de arquivo .fit (multipart/form-data)
- `GET /health-overview/:id` - Buscar Health Overview por ID com entidades relacionadas completas
- `PUT /health-overview/:id` - Atualizar Health Overview por ID, deletando entidades relacionadas não enviadas (multipart/form-data)
- `DELETE /health-overview/:id` - Deletar Health Overview por ID com cascade delete automático de entidades relacionadas
 
## Pontos de Integração
 
- **Vercel Blob Storage**: Upload de arquivos .fit via @vercel/blob package. Tratamento de erro: se upload falhar, persiste dados sem arquivo e continua operação
- **PostgreSQL via TypeORM**: Persistência de dados com relacionamentos e cascade delete automático
- **Nenhuma autenticação**: API backend-only sem autenticação neste escopo
 
## Abordagem de Testes
 
### Testes Unidade
 
- **BlobStorageService**: Mock do @vercel/blob para testar upload/delete com sucesso e erro
- **HealthOverviewService**: Mock de repositórios TypeORM e BlobStorageService. Testar CRUD, transações, cascade delete, rollback em erro
- **DTOs**: Testar validações class-validator (valores positivos, campos obrigatórios)
 
### Testes de Integração
 
- Não aplicável (apenas mocks conforme especificado)
 
### Testes de E2E
 
- Não aplicável (API backend-only sem frontend)
 
## Sequenciamento de Desenvolvimento
 
### Ordem de Construção
 
1. **Instalar dependências**: class-validator, class-transformer, uuid, @types/multer
2. **Implementar BlobStorageService**: Criar serviço de upload no módulo blob-storage existente
3. **Criar entidades TypeORM**: SleepEntity, MealEntity, WaterIntakeEntity, HealthOverviewEntity com relacionamentos e cascade delete
4. **Criar DTOs**: Classes de criação, atualização e resposta para cada entidade com validações
5. **Implementar HealthOverviewService**: Lógica de CRUD com transações e gerenciamento de entidades relacionadas
6. **Implementar HealthOverviewController**: Endpoints CRUD com FileInterceptor para upload de arquivo .fit
7. **Criar HealthEntityModule**: Módulo NestJS registrando entities, service e controller
8. **Registrar módulo no AppModule**: Importar HealthEntityModule
9. **Escrever testes unitários**: Mocks para service e DTOs
10. **Teste manual**: Verificar CRUD, cascade delete, upload de arquivo .fit
 
### Dependências Técnicas
 
- Dependências npm: class-validator, class-transformer, uuid, @types/multer
- Vercel Blob Storage configurado (BLOB_STORE_ID, BLOB_READ_WRITE_TOKEN)
- PostgreSQL configurado (DATABASE_URL ou DB_HOST/DB_PORT/DB_USER/DB_PASSWORD/DB_NAME)
 
## Monitoramento e Observabilidade
 
- Logs de erro em operações de banco de dados e upload de arquivo
- Logs de informação em criação/atualização/deleção de registros
- Sem métricas Prometheus customizadas neste escopo (pode ser adicionado posteriormente)
 
## Considerações Técnicas
 
### Decisões Principais
 
- **TypeORM cascade delete via decorators**: Escolha por simplicidade e alinhamento com PRD. Alternativa rejeitada: implementação manual no service (mais complexo e propenso a erros)
- **Hard delete**: Escolha por simplicidade e ausência de requisitos de auditoria. Alternativa rejeitada: soft delete (adiciona complexidade de queries customizadas)
- **Transações TypeORM**: Escolha para garantir atomicidade ao criar Health Overview com entidades relacionadas. Rollback total em caso de erro em qualquer entidade
- **multipart/form-data**: Escolha para upload de arquivo .fit. Alternativa rejeitada: base64 em JSON (menos eficiente para arquivos)
- **DTOs separados por entidade**: Escolha por clareza e reutilização. Alternativa rejeitada: DTO único aninhado (menos organizado)
- **BlobStorageService em blob-storage module**: Escolha para seguir padrão de módulos existentes. Alternativa rejeitada: serviço dentro de health-entity (quebra separação de responsabilidades)
- **Persistir dados sem arquivo se upload falhar**: Escolha por resiliência. Usuário pode reenviar arquivo posteriormente via update
- **Update deleta entidades não enviadas**: Escolha por simplicidade e alinhamento com PRD (cascade delete obrigatório)
 
### Riscos Conhecidos
 
- **Transações longas**: Criar múltiplas entidades em uma transação pode causar timeout. Mitigação: manter transações curtas, considerar batch se necessário
- **Upload de arquivos grandes**: Arquivos .fit podem ser grandes. Mitigação: implementar limite de tamanho no FileInterceptor
- **Cascade delete em produção**: Deletar Health Overview remove dados permanentemente. Mitigação: considerar soft delete futuro se necessário para compliance
- **UUID vs auto-increment**: UUID adiciona overhead mas é melhor para distribuído. Mitigação: monitorar performance se necessário
 
### Conformidade com Padrões
 
- Padrões do projeto não encontrados em .windsurf/rules ou ~/.windsurf/rules
- Segue estrutura de módulos existentes (database, blob-storage)
- Segue configuração de TypeORM existente (database.config.ts)
- Segue configuração de Blob Storage existente (blob-storage.config.ts)
 
### Arquivos relevantes e dependentes
 
- `src/app.module.ts` - Importar HealthEntityModule
- `src/config/database.config.ts` - Configuração TypeORM existente
- `src/config/blob-storage.config.ts` - Configuração Blob Storage existente
- `src/modules/database/database.module.ts` - Módulo database existente
- `src/modules/blob-storage/blob-storage.module.ts` - Módulo blob-storage a ser modificado
- `package.json` - Adicionar dependências: class-validator, class-transformer, uuid, @types/multer

Resumo da implementação:

O projeto NestJs já está instado com a configuração básica inicial, esta implementação terá como objetivo configurar:

1. Configuração do banco de dados (PostgreSQL);
   1.1. Configuração apontando para o banco de dados local;
   1.2. Configuração apontando para o banco de dados remoto;
2. Configuração do Blob store do Vercel;
3. Configuração do ORM (TypeORM);
4. Configuração para deploy no Vercel;

# Dados do banco postgres da Vercel

# Recommended for most uses

DATABASE_URL=postgresql://neondb_owner:npg_p7WslP1tNvIj@ep-shiny-star-at1glgb2-pooler.c-9.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require

# For uses requiring a connection without pgbouncer

DATABASE_URL_UNPOOLED=postgresql://neondb_owner:npg_p7WslP1tNvIj@ep-shiny-star-at1glgb2.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require

# Parameters for constructing your own connection string

PGHOST=ep-shiny-star-at1glgb2-pooler.c-9.us-east-1.aws.neon.tech
PGHOST_UNPOOLED=ep-shiny-star-at1glgb2.c-9.us-east-1.aws.neon.tech
PGUSER=neondb_owner
PGDATABASE=neondb
PGPASSWORD=npg_p7WslP1tNvIj

# Parameters for Vercel Postgres Templates

POSTGRES_URL=postgresql://neondb_owner:npg_p7WslP1tNvIj@ep-shiny-star-at1glgb2-pooler.c-9.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require
POSTGRES_URL_NON_POOLING=postgresql://neondb_owner:npg_p7WslP1tNvIj@ep-shiny-star-at1glgb2.c-9.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require
POSTGRES_USER=neondb_owner
POSTGRES_HOST=ep-shiny-star-at1glgb2-pooler.c-9.us-east-1.aws.neon.tech
POSTGRES_PASSWORD=npg_p7WslP1tNvIj
POSTGRES_DATABASE=neondb
POSTGRES_URL_NO_SSL=postgresql://neondb_owner:npg_p7WslP1tNvIj@ep-shiny-star-at1glgb2-pooler.c-9.us-east-1.aws.neon.tech/neondb
POSTGRES_PRISMA_URL=postgresql://neondb_owner:npg_p7WslP1tNvIj@ep-shiny-star-at1glgb2-pooler.c-9.us-east-1.aws.neon.tech/neondb?channel_binding=require&connect_timeout=15&sslmode=require

# Dados do Blob store da Vercel

BLOB_APP_STORE_ID="store_8PxCY9orb0WdIxby"
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_8PxCY9orb0WdIxby_YhfBKMrxSFEZQEgy3DqNPGuBrQyERV"

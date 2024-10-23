# CRUD TypeScript Project

Este proyecto es una aplicación CRUD (Crear, Leer, Actualizar, Eliminar) construida con Next.js 14, TypeScript, SQLite y Prisma como ORM.

## Tecnologías Utilizadas

- TypeScript
- Next.js 14
- React Typescript
- Prisma
- SQLite

## Instalación

- Clona el repositorio
- Instala las dependencias

## Configuración de la Base de Datos

1. Inicializa Prisma:

```bash
npx prisma init
```

2. Genera las migraciones y la base de datos:

```bash
npx prisma migrate dev --name init
```

3. Genera el cliente de Prisma:

```bash
npx prisma generate
```

4. Ejecuta los seeds para poblar la base de datos:

```bash
npx prisma db seed
```

## Ejecución del Proyecto

- Inicia el servidor:

```bash
npm run dev
```

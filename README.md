# CRUD TypeScript Project

Este proyecto es una aplicación CRUD (Crear, Leer, Actualizar, Eliminar) construida con Next.js 14 y TypeScript, SQLite y Prisma como ORM.

## Tecnologías Utilizadas

- TypeScript
- Next.js 14
- React Typescript
- Prisma
- SQLite

## Instalación y Configuración de la Base de Datos

1. Intala las dependencias

```bash
npm install
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
npm run db:seed
```

## Ejecución del Proyecto

- Inicia el servidor:

```bash
npm run dev
```

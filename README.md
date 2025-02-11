# Levantar el proyecto de desarrollo

- Instalar las dependencias

```bash
npm i

```

- Renombrar el archivo .vars a .env y rellenar las variables de entorno correspondientes

- instalar imagen de docker para la base de datos

```bash
docker compose up -d

```

- correr las migraciones de prisma

```bash
npx prisma migrate dev

```

- Ejecutar el seed

```bash
npm run seed

```

- Levantar el proyecto en desarrollo

```bash
npm run dev

```

# Pokemon Manager

## Preview

![Home screenshot](https://github.com/preludium/pokemon-manager/blob/master/assets/home.png)

See more [here](https://github.com/preludium/pokemon-manager/blob/master/assets)

## Getting Started

Install dependencies:
```bash
pnpm install
```

Initialize prisma:
```bash
pnpm prisma generate && pnpm prisma db push
```

Seed the database:
```bash
cd prisma && node extract-pokemons.js && pnpm prisma db seed && cd ..
```

Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

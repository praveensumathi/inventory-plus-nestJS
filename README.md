# Inventory Plus

# Pre requisite

node version >20

## Installation

Install the CLI globally using the npm install -g command

```bash
  npm install -g @nestjs/cli
```

clone the project and,

```bash
  cd project-folder-name

  npm i or npm i -f
```

To create new resource without spec file

```bash
  nest g res features/property --no-spec

  -> REST API (choose this option)

  Would you like to generate CRUD entry points? (Y/n)  -> choose 'n'
```

Generate entities from DB for dev

```bash
  npm run scaffoldingdb:dev-db
```

Start app using dev DB

```bash
  npm run start:dev
```

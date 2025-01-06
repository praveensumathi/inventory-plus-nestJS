# Inventory Plus

Commands to create a new resource

# Inventory Plus

Commands to create a new resource

## Installation

Install the CLI globally using the npm install -g command

```bash
  npm install -g @nestjs/cli

  cd project-folder-name

  npm i or npm i -f
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

Generate entities from DB

```bash
  npx typeorm-model-generator -h localhost -u sa -x root -p 1433 -d inventory-plus -e mssql -o ./src/migration --ssl true --noConfig true
```

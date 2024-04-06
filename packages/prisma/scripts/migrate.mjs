#!/usr/bin/env zx

await $`mkdir -p ./migrations`

const packages = await glob(['prisma/migrations/*/migration.sql'])
for (let i = 0; i < packages.length; i++) {
  const migrationName = packages[i]
    .replace('prisma/migrations/', '')
    .split('/')[0]
  if (!fs.existsSync(`migrations/${migrationName}.sql`)) {
    await $`cp ${packages[i]} migrations/${migrationName}.sql`
  }
}

await $`yarn run wrangler d1 migrations apply prisma-rpc-db --local`

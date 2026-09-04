#!/usr/bin/env node
import { cpSync, mkdirSync, rmSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'out')
const deployDir = join(root, 'beget-deploy')

if (!existsSync(outDir)) {
  console.error('Missing out/ directory. Run npm run build first.')
  process.exit(1)
}

rmSync(deployDir, { recursive: true, force: true })
mkdirSync(deployDir, { recursive: true })

cpSync(outDir, deployDir, { recursive: true })
cpSync(join(root, 'send-anketa.php'), join(deployDir, 'send-anketa.php'))
cpSync(join(root, 'telegram-webhook.php'), join(deployDir, 'telegram-webhook.php'))
cpSync(join(root, 'telegram-app-lib.php'), join(deployDir, 'telegram-app-lib.php'))
cpSync(join(root, 'beget/.htaccess'), join(deployDir, '.htaccess'))
cpSync(
  join(root, 'send-anketa.config.example.php'),
  join(deployDir, 'send-anketa.config.example.php'),
)

mkdirSync(join(deployDir, 'applications'), { recursive: true })
cpSync(
  join(root, 'beget/applications/.htaccess'),
  join(deployDir, 'applications/.htaccess'),
)

if (existsSync(join(deployDir, 'send-anketa.config.php'))) {
  rmSync(join(deployDir, 'send-anketa.config.php'))
}

const readme = `# Beget deploy package

Upload files from this folder into public_html on Beget.

Included:
- static site export
- send-anketa.php
- telegram-webhook.php
- telegram-app-lib.php
- applications/.htaccess
- send-anketa.config.example.php
- .htaccess

Do not overwrite production send-anketa.config.php.
Keep the existing file in public_html.

Important:
- send-anketa.config.php must stay on the server only
- Do not publish real Telegram credentials in GitHub
- Do not sync real applications/*.json into git
`

writeFileSync(join(deployDir, 'README-DEPLOY.txt'), readme, 'utf8')

if (!existsSync(join(deployDir, 'index.html'))) {
  console.error('beget-deploy/index.html was not created.')
  process.exit(1)
}

if (!existsSync(join(deployDir, 'send-anketa.php'))) {
  console.error('beget-deploy/send-anketa.php was not created.')
  process.exit(1)
}

if (!existsSync(join(deployDir, 'telegram-webhook.php'))) {
  console.error('beget-deploy/telegram-webhook.php was not created.')
  process.exit(1)
}

if (!existsSync(join(deployDir, 'telegram-app-lib.php'))) {
  console.error('beget-deploy/telegram-app-lib.php was not created.')
  process.exit(1)
}

console.log(`Beget deploy package ready: ${deployDir}`)

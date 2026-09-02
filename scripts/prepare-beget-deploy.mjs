#!/usr/bin/env node
import { cpSync, mkdirSync, rmSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
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
cpSync(join(root, 'beget/.htaccess'), join(deployDir, '.htaccess'))

const exampleConfig = join(root, 'send-anketa.config.example.php')
const deployExample = join(deployDir, 'send-anketa.config.example.php')
cpSync(exampleConfig, deployExample)

const readme = `# Beget deploy package

Upload ALL files from this folder into public_html on Beget.

Steps:
1. Upload everything from beget-deploy/ to public_html/
2. Copy send-anketa.config.example.php to send-anketa.config.php
3. Put your Telegram bot token and chat id into send-anketa.config.php
4. Open your domain in the browser

Important:
- send-anketa.config.php must stay on the server only
- Do not expose send-anketa.config.php in public repositories
`

writeFileSync(join(deployDir, 'README-DEPLOY.txt'), readme, 'utf8')

console.log(`Beget deploy package ready: ${deployDir}`)

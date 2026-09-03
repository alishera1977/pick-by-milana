#!/usr/bin/env node
import { cpSync, mkdirSync, rmSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'out')
const deployDir = join(root, 'beget-deploy')

function readEnvLocal() {
  const envPath = join(root, '.env.local')
  if (!existsSync(envPath)) return {}

  const values = {}
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim()
    values[key] = value
  }
  return values
}

function writeTelegramConfig(targetPath, token, chatId) {
  const content = `<?php
/**
 * Telegram credentials for send-anketa.php
 * Direct HTTP access is blocked via .htaccess
 */
return [
    'telegram_bot_token' => '${token.replace(/'/g, "\\'")}',
    'telegram_chat_id' => '${chatId.replace(/'/g, "\\'")}',
];
`
  writeFileSync(targetPath, content, 'utf8')
}

if (!existsSync(outDir)) {
  console.error('Missing out/ directory. Run npm run build first.')
  process.exit(1)
}

rmSync(deployDir, { recursive: true, force: true })
mkdirSync(deployDir, { recursive: true })

cpSync(outDir, deployDir, { recursive: true })
cpSync(join(root, 'send-anketa.php'), join(deployDir, 'send-anketa.php'))
cpSync(join(root, 'beget/.htaccess'), join(deployDir, '.htaccess'))
cpSync(
  join(root, 'send-anketa.config.example.php'),
  join(deployDir, 'send-anketa.config.example.php'),
)

const env = readEnvLocal()
const token = env.TELEGRAM_BOT_TOKEN || ''
const chatId = env.TELEGRAM_CHAT_ID || ''

if (!token || !chatId) {
  console.error(
    'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in .env.local — cannot create send-anketa.config.php',
  )
  process.exit(1)
}

writeTelegramConfig(join(deployDir, 'send-anketa.config.php'), token, chatId)

const readme = `# Beget deploy package

Upload ALL files from this folder into public_html on Beget.

Included:
- static site export
- send-anketa.php
- send-anketa.config.php (Telegram credentials)
- .htaccess (blocks direct access to send-anketa.config.php)

Steps:
1. Upload everything from beget-deploy/ to public_html/
2. Open your domain in the browser
3. Test the anketa form

Important:
- send-anketa.config.php is protected by .htaccess
- Do not publish this folder or ZIP in public repositories
`

writeFileSync(join(deployDir, 'README-DEPLOY.txt'), readme, 'utf8')

console.log(`Beget deploy package ready: ${deployDir}`)

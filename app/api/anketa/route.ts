import { NextResponse } from 'next/server'

type AnketaPayload = {
  variant?: 'milana' | 'teacher'
  telegram: string
  promo: boolean
  name?: string
  phone?: string
  email?: string
  teacher?: string
}

const teacherLabels: Record<string, string> = {
  'masha-start': 'Маша (START)',
  gleb: 'Глеб',
  fedya: 'Федя',
  'masha-expert': 'Mary',
  help: 'Ещё не знаю, нужна помощь',
}

function formatTelegramHandle(telegram: string) {
  const trimmed = telegram.trim()
  return trimmed.startsWith('@') ? trimmed : `@${trimmed.replace(/^@/, '')}`
}

function formatMessage(body: AnketaPayload) {
  const handle = formatTelegramHandle(body.telegram)
  const lines = ['🆕 Заявка с сайта pick by Milana', '']

  if (body.variant === 'teacher') {
    lines.push('Тип: подбор преподавателя')
    if (body.name?.trim()) lines.push(`Имя: ${body.name.trim()}`)
    if (body.phone?.trim()) lines.push(`Телефон: ${body.phone.trim()}`)
    if (body.email?.trim()) lines.push(`Email: ${body.email.trim()}`)
    if (body.teacher) {
      lines.push(`Преподаватель: ${teacherLabels[body.teacher] || body.teacher}`)
    }
  } else {
    lines.push('Тип: написать Милане')
  }

  lines.push(`Telegram: ${handle}`)
  lines.push(`Рассылка: ${body.promo ? 'да' : 'нет'}`)

  return lines.join('\n')
}

async function telegramError(response: Response) {
  try {
    const data = (await response.json()) as { description?: string }
    return data.description || `Telegram error ${response.status}`
  } catch {
    return `Telegram error ${response.status}`
  }
}

async function resolveChatId(token: string, configured: string) {
  if (/^-?\d+$/.test(configured)) return configured

  const updatesRes = await fetch(`https://api.telegram.org/bot${token}/getUpdates?limit=20`)
  if (!updatesRes.ok) return configured

  const updates = (await updatesRes.json()) as {
    result?: Array<{
      message?: { chat?: { id?: number } }
      my_chat_member?: { chat?: { id?: number } }
    }>
  }

  const lastId = [...(updates.result || [])]
    .reverse()
    .map((item) => item.message?.chat?.id ?? item.my_chat_member?.chat?.id)
    .find((id) => typeof id === 'number')

  return lastId ? String(lastId) : configured
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const configuredChatId = process.env.TELEGRAM_CHAT_ID

  if (!token) {
    return NextResponse.json(
      { error: 'Telegram bot is not configured. Restart the server after adding TELEGRAM_BOT_TOKEN.' },
      { status: 503 },
    )
  }

  let body: AnketaPayload

  try {
    body = (await request.json()) as AnketaPayload
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const telegram = body.telegram?.trim()
  const variant = body.variant === 'teacher' ? 'teacher' : 'milana'

  if (!telegram) {
    return NextResponse.json({ error: 'Telegram nickname is required.' }, { status: 400 })
  }

  if (variant === 'teacher') {
    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }
    if (!body.phone?.trim()) {
      return NextResponse.json({ error: 'Phone is required.' }, { status: 400 })
    }
    if (!body.email?.trim()) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }
    if (!body.teacher) {
      return NextResponse.json({ error: 'Teacher selection is required.' }, { status: 400 })
    }
  }

  const chatId = await resolveChatId(token, configuredChatId || '')

  if (!chatId) {
    return NextResponse.json(
      {
        error:
          'Напиши боту /start с аккаунта @pickbymilana, затем отправь заявку ещё раз.',
      },
      { status: 503 },
    )
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatMessage({ ...body, variant }),
    }),
  })

  if (!response.ok) {
    return NextResponse.json({ error: await telegramError(response) }, { status: 502 })
  }

  return NextResponse.json({ ok: true, chatId })
}

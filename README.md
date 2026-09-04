# pick-by-milana

Next.js static export for [pickenglish.ru](https://pickenglish.ru), deployed to Beget via GitHub Actions.

## Local development

```bash
npm install
npm run dev
```

## Beget production build

```bash
npm run build:beget
```

This creates `beget-deploy/` with static pages + PHP handlers.  
Real `send-anketa.config.php` is never included.

## Telegram follow-up after anketa

After a user submits the form:

1. `send-anketa.php` notifies Milana (existing behavior).
2. Server creates `application_id` and saves a short JSON file in `applications/`.
3. Frontend shows **Продолжить в Telegram**.
4. User opens the bot with `/start APPLICATION_ID`.
5. `telegram-webhook.php` sends the matching teacher message once.

### 1. Configure bot username on Beget

Edit production `~/pickenglish.ru/public_html/send-anketa.config.php`:

```php
return [
    'telegram_bot_token' => '...',
    'telegram_chat_id' => '...',
    'telegram_bot_username' => 'YOUR_BOT_USERNAME', // without @
];
```

Do not commit this file.

### 2. Register Telegram webhook

Replace `TOKEN` with the real bot token (only on the server / locally in a secure shell):

```bash
curl "https://api.telegram.org/botTOKEN/setWebhook?url=https://pickenglish.ru/telegram-webhook.php"
```

Check webhook:

```bash
curl "https://api.telegram.org/botTOKEN/getWebhookInfo"
```

Expected URL:

`https://pickenglish.ru/telegram-webhook.php`

### 3. Permissions for applications/

On Beget, PHP must be able to write to:

`~/pickenglish.ru/public_html/applications/`

The folder is created automatically on first request.  
Direct HTTP access is blocked by `.htaccess`.

Suggested permissions:

```bash
chmod 750 ~/pickenglish.ru/public_html/applications
```

### 4. Test deep link

1. Submit anketa on the site.
2. Click **Продолжить в Telegram**.
3. Press Start in the bot.
4. Confirm the correct teacher message is sent once.
5. Press Start again → should get:  
   `мы уже получили твою заявку 🥹 можешь просто написать мне здесь`

### 5. Teacher scenario keys

Form values are mapped to Telegram scenarios:

| Website value | Scenario key | Message |
|---|---|---|
| `masha-start` | `masha` | Маша |
| `gleb` | `gleb` | Глеб |
| `fedya` | `fedor` | Федя |
| `masha-expert` | `mary` | Mary |
| anketa without teacher (`variant=milana`) | `milana` | лист ожидания |
| `help` | `selection` | подбор |

Mapping and message texts live in `telegram-app-lib.php`  
(`pick_resolve_teacher_scenario`, `pick_teacher_message`).

Page URLs for teachers stay unchanged (`/teachers/masha-expert/`, `/teachers/fedya/`, etc.).

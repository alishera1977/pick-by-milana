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

## Anketa → Telegram

After a user submits the form:

1. `send-anketa.php` notifies Milana in the service chat (Bot API).
2. If the Telegram username is valid, the notification includes an inline button **Написать клиенту**.
3. The button opens `https://t.me/USERNAME?text=...` with a prefilled teacher message.
4. Milana sends the message manually from her personal account.

### Config on Beget

Edit production `~/pickenglish.ru/public_html/send-anketa.config.php`:

```php
return [
    'telegram_bot_token' => '...',
    'telegram_chat_id' => '...',
];
```

Do not commit this file.  
`telegram_bot_username` is no longer required.

### Teacher scenario keys

| Website value | Scenario key |
|---|---|
| `masha-start` | `masha` |
| `gleb` | `gleb` |
| `fedya` | `fedor` |
| `masha-expert` | `mary` |
| anketa without teacher (`variant=milana`) | `milana` |
| `help` | `selection` |

Mapping and message texts live in `telegram-app-lib.php`.

Page URLs for teachers stay unchanged (`/teachers/masha-expert/`, `/teachers/fedya/`, etc.).

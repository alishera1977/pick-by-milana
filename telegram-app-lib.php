<?php
declare(strict_types=1);

/**
 * Shared helpers for anketa applications and Telegram follow-up messages.
 */

function pick_load_config(): array
{
    $configPath = __DIR__ . '/send-anketa.config.php';
    if (!is_readable($configPath)) {
        return [];
    }
    $config = require $configPath;
    return is_array($config) ? $config : [];
}

function pick_applications_dir(): string
{
    $dir = __DIR__ . '/applications';
    if (!is_dir($dir)) {
        mkdir($dir, 0750, true);
    }

    $htaccess = $dir . '/.htaccess';
    if (!is_file($htaccess)) {
        file_put_contents(
            $htaccess,
            "Options -Indexes\n<IfModule mod_authz_core.c>\n  Require all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\n  Order allow,deny\n  Deny from all\n</IfModule>\n"
        );
    }

    return $dir;
}

function pick_is_valid_application_id(string $id): bool
{
    return (bool) preg_match('/^PICK-\d{8}-[A-Z0-9]{4}$/', $id);
}

function pick_generate_application_id(): string
{
    $alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    $suffix = '';
    for ($i = 0; $i < 4; $i++) {
        $suffix .= $alphabet[random_int(0, strlen($alphabet) - 1)];
    }
    return 'PICK-' . gmdate('Ymd') . '-' . $suffix;
}

/**
 * Map website anketa values to Telegram scenario keys.
 * Page slugs (masha-expert, fedya) stay unchanged in Next.js routes.
 */
function pick_resolve_teacher_scenario(string $variant, string $teacher): string
{
    if ($variant !== 'teacher') {
        return 'milana';
    }

    $map = [
        'masha-start' => 'masha',
        'masha' => 'masha',
        'gleb' => 'gleb',
        'fedya' => 'fedor',
        'fedor' => 'fedor',
        'masha-expert' => 'mary',
        'mary' => 'mary',
        'help' => 'selection',
        'selection' => 'selection',
        'milana' => 'milana',
    ];

    return $map[$teacher] ?? 'selection';
}

function pick_application_path(string $applicationId): ?string
{
    if (!pick_is_valid_application_id($applicationId)) {
        return null;
    }
    return pick_applications_dir() . '/' . $applicationId . '.json';
}

function pick_save_application(array $payload): bool
{
    $id = (string) ($payload['application_id'] ?? '');
    $path = pick_application_path($id);
    if ($path === null) {
        return false;
    }

    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    if ($json === false) {
        return false;
    }

    return file_put_contents($path, $json, LOCK_EX) !== false;
}

function pick_load_application(string $applicationId): ?array
{
    $path = pick_application_path($applicationId);
    if ($path === null || !is_readable($path)) {
        return null;
    }

    $raw = file_get_contents($path);
    $data = $raw ? json_decode($raw, true) : null;
    return is_array($data) ? $data : null;
}

function pick_teacher_message(string $teacher): string
{
    $messages = [
        'masha' => "привет! это милана из PICK 🤍 увидела твою заявку на занятия с машей)\n\nотличный выбор, особенно если тебе важны спокойные занятия без давления и хочется постепенно перестать бояться говорить на английском. стоимость — 1800 ₽/час.\n\nрасскажи мне немного о себе: какой у тебя примерно уровень, для чего сейчас нужен английский и занимался(ась) ли раньше с преподавателем?\n\nпосле этого сверим ваше расписание и сможем договориться о первом занятии)",
        'gleb' => "привет! это милана из PICK 🤍 увидела твою заявку на занятия с глебом)\n\nдумаю, с ним будет классно, если хочется много практиковаться, разговаривать и заниматься в достаточно лёгкой атмосфере. стоимость занятий — 1800 ₽/час.\n\nрасскажи мне немного о себе: какой у тебя примерно уровень, для чего сейчас нужен английский и занимался(ась) ли раньше с преподавателем?\n\nпосле этого сверим ваше расписание и договоримся о первом занятии)",
        'fedor' => "привет! это милана из PICK 🤍 увидела твою заявку на занятия с федей)\n\nклассный выбор! федя очень эрудированный и с ним правда легко найти тему для разговора — от кино и путешествий до истории и культуры. плюс у него подтверждённый c1, и он хорошо объясняет именно логику английского, а не просто даёт правила. стоимость занятий — 2500 ₽/час.\n\nрасскажи немного о себе: какой у тебя примерно уровень, для чего сейчас нужен английский и занимался(ась) ли раньше с преподавателем?\n\nдальше сверим ваше расписание и договоримся о первом занятии)",
        'mary' => "привет! это милана из PICK 🤍 увидела твою заявку на занятия с Mary)\n\nотличный выбор) Mary с детства жила в канаде, там окончила школу и университет, поэтому с ней особенно классно прокачивать живой естественный английский. также она работает с IELTS и Business English. стоимость занятий — 3500 ₽/час.\n\nрасскажи мне немного о себе: какой у тебя примерно уровень, для чего сейчас нужен английский и занимался(ась) ли раньше с преподавателем?\n\nпосле этого сверим ваше расписание и договоримся о первом занятии)",
        'milana' => "привет! это милана из PICK 🤍 увидела твою заявку на сайте)\n\nесли ты хотел(а) записаться лично ко мне — сейчас, к сожалению, все места заняты, но я могу добавить тебя в лист ожидания. стоимость моих занятий — 6000 ₽/час.\n\nнапиши, пожалуйста, хочешь ли, чтобы я добавила тебя в лист ожидания 🥹",
        'selection' => "привет! это милана из PICK 🤍 увидела твою заявку на сайте)\n\nзанятия с преподавателями PICK стоят от 1800 до 3500 ₽/час.\n\nрасскажи немного про свой английский: какой примерно уровень, для чего хочешь его подтянуть и что для тебя особенно важно в преподавателе. я посмотрю, кто из ребят тебе больше подойдёт)",
    ];

    return $messages[$teacher] ?? $messages['selection'];
}

function pick_telegram_send_message(string $token, string $chatId, string $text): array
{
    $payload = json_encode([
        'chat_id' => $chatId,
        'text' => $text,
    ], JSON_UNESCAPED_UNICODE);

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 15,
            'ignore_errors' => true,
        ],
    ]);

    $responseBody = @file_get_contents("https://api.telegram.org/bot{$token}/sendMessage", false, $context);
    $response = $responseBody ? json_decode($responseBody, true) : null;

    if (!is_array($response)) {
        return ['ok' => false, 'description' => 'Empty Telegram response.'];
    }

    return $response;
}

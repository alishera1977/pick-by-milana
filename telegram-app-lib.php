<?php
/**
 * Shared helpers for anketa Telegram notifications.
 * Compatible with PHP 5.6+ (Beget default CLI / module).
 */

function pick_load_config()
{
    $configPath = __DIR__ . '/send-anketa.config.php';
    if (!is_readable($configPath)) {
        return array();
    }
    $config = require $configPath;
    return is_array($config) ? $config : array();
}

/**
 * Map website anketa values to Telegram scenario keys.
 * Page slugs (masha-expert, fedya) stay unchanged in Next.js routes.
 */
function pick_resolve_teacher_scenario($variant, $teacher)
{
    if ($variant !== 'teacher') {
        return 'milana';
    }

    $map = array(
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
    );

    return isset($map[$teacher]) ? $map[$teacher] : 'selection';
}

function pick_teacher_message($teacher)
{
    $messages = array(
        'masha' => "привет! это милана из PICK 🤍 увидела твою заявку на занятия с машей)\n\nотличный выбор, особенно если тебе важны спокойные занятия без давления и хочется постепенно перестать бояться говорить на английском. стоимость — 1800 ₽/час.\n\nрасскажи мне немного о себе: какой у тебя примерно уровень, для чего сейчас нужен английский и занимался(ась) ли раньше с преподавателем?\n\nпосле этого сверим ваше расписание и сможем договориться о первом занятии)",
        'gleb' => "привет! это милана из PICK 🤍 увидела твою заявку на занятия с глебом)\n\nдумаю, с ним будет классно, если хочется много практиковаться, разговаривать и заниматься в достаточно лёгкой атмосфере. стоимость занятий — 1800 ₽/час.\n\nрасскажи мне немного о себе: какой у тебя примерно уровень, для чего сейчас нужен английский и занимался(ась) ли раньше с преподавателем?\n\nпосле этого сверим ваше расписание и договоримся о первом занятии)",
        'fedor' => "привет! это милана из PICK 🤍 увидела твою заявку на занятия с федей)\n\nклассный выбор! федя очень эрудированный и с ним правда легко найти тему для разговора — от кино и путешествий до истории и культуры. плюс у него подтверждённый c1, и он хорошо объясняет именно логику английского, а не просто даёт правила. стоимость занятий — 2500 ₽/час.\n\nрасскажи немного о себе: какой у тебя примерно уровень, для чего сейчас нужен английский и занимался(ась) ли раньше с преподавателем?\n\nдальше сверим ваше расписание и договоримся о первом занятии)",
        'mary' => "привет! это милана из PICK 🤍 увидела твою заявку на занятия с Mary)\n\nотличный выбор) Mary с детства жила в канаде, там окончила школу и университет, поэтому с ней особенно классно прокачивать живой естественный английский. также она работает с IELTS и Business English. стоимость занятий — 3500 ₽/час.\n\nрасскажи мне немного о себе: какой у тебя примерно уровень, для чего сейчас нужен английский и занимался(ась) ли раньше с преподавателем?\n\nпосле этого сверим ваше расписание и договоримся о первом занятии)",
        'milana' => "привет! это милана из PICK 🤍 увидела твою заявку на сайте)\n\nесли ты хотел(а) записаться лично ко мне — сейчас, к сожалению, все места заняты, но я могу добавить тебя в лист ожидания. стоимость моих занятий — 6000 ₽/час.\n\nнапиши, пожалуйста, хочешь ли, чтобы я добавила тебя в лист ожидания 🤍",
        'selection' => "привет! это милана из PICK 🤍 увидела твою заявку на сайте)\n\nподскажи, пожалуйста, ты хотел(а) записаться на занятия лично ко мне или хочешь, чтобы я помогла подобрать преподавателя из команды?\n\nесли ко мне — сейчас, к сожалению, все места заняты, но я могу добавить тебя в лист ожидания. стоимость моих занятий — 6000 ₽/час.\n\nесли нужен подбор — занятия с преподавателями PICK стоят от 1800 до 3500 ₽/час. расскажи немного про свой английский: какой примерно уровень, для чего хочешь его подтянуть и что для тебя особенно важно в преподавателе. я посмотрю, кто из ребят тебе больше подойдёт)",
    );

    return isset($messages[$teacher]) ? $messages[$teacher] : $messages['selection'];
}

/**
 * Normalize Telegram username: trim, strip @.
 * Returns username without @, or '' if missing/invalid.
 */
function pick_normalize_telegram_username($raw)
{
    $username = trim((string) $raw);
    $username = ltrim($username, '@');
    $username = trim($username);

    if ($username === '') {
        return '';
    }

    if (!preg_match('/^[A-Za-z0-9_]+$/', $username)) {
        return '';
    }

    return $username;
}

function pick_client_message_url($username, $teacher)
{
    $username = pick_normalize_telegram_username($username);
    if ($username === '') {
        return '';
    }

    $text = pick_teacher_message($teacher);
    return 'https://t.me/' . rawurlencode($username) . '?text=' . rawurlencode($text);
}

function pick_telegram_send_message($token, $chatId, $text, $replyMarkup = null)
{
    $payloadData = array(
        'chat_id' => $chatId,
        'text' => $text,
    );

    if (is_array($replyMarkup)) {
        $payloadData['reply_markup'] = $replyMarkup;
    }

    $payload = json_encode($payloadData, JSON_UNESCAPED_UNICODE);

    $context = stream_context_create(array(
        'http' => array(
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 15,
            'ignore_errors' => true,
        ),
    ));

    $responseBody = @file_get_contents("https://api.telegram.org/bot{$token}/sendMessage", false, $context);
    $response = $responseBody ? json_decode($responseBody, true) : null;

    if (!is_array($response)) {
        return array('ok' => false, 'description' => 'Empty Telegram response.');
    }

    return $response;
}

function pick_sanitize_field($value, $max = 500)
{
    $value = strip_tags((string) $value);
    $cleaned = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value);
    $value = is_string($cleaned) ? $cleaned : '';
    if (function_exists('mb_strlen') && function_exists('mb_substr')) {
        if (mb_strlen($value) > $max) {
            $value = mb_substr($value, 0, $max);
        }
    } elseif (strlen($value) > $max) {
        $value = substr($value, 0, $max);
    }
    return trim($value);
}

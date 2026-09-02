<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$configPath = __DIR__ . '/send-anketa.config.php';
if (!is_readable($configPath)) {
    http_response_code(503);
    echo json_encode(
        ['success' => false, 'error' => 'Сервер не настроен. Создайте файл send-anketa.config.php.'],
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

/** @var array{telegram_bot_token?: string, telegram_chat_id?: string} $config */
$config = require $configPath;
$token = trim((string) ($config['telegram_bot_token'] ?? ''));
$chatId = trim((string) ($config['telegram_chat_id'] ?? ''));

if ($token === '' || $chatId === '') {
    http_response_code(503);
    echo json_encode(
        ['success' => false, 'error' => 'Укажите TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в send-anketa.config.php.'],
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Некорректный формат данных.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$variant = (($data['variant'] ?? '') === 'teacher') ? 'teacher' : 'milana';
$telegram = trim((string) ($data['telegram'] ?? ''));
$promo = !empty($data['promo']);

if ($telegram === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Укажите ник в Telegram.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$name = trim((string) ($data['name'] ?? ''));
$phone = trim((string) ($data['phone'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$teacher = trim((string) ($data['teacher'] ?? ''));

$teacherLabels = [
    'masha-start' => 'Маша (START)',
    'gleb' => 'Глеб',
    'fedya' => 'Федя',
    'masha-expert' => 'Mary',
    'help' => 'Ещё не знаю, нужна помощь',
];

if ($variant === 'teacher') {
    if ($name === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Укажите имя.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    if ($phone === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Укажите телефон.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Укажите корректный email.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    if ($teacher === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Выберите преподавателя.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

function sanitize_field(string $value, int $max = 500): string
{
    $value = strip_tags($value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    if (mb_strlen($value) > $max) {
        $value = mb_substr($value, 0, $max);
    }
    return trim($value);
}

function format_telegram_handle(string $telegram): string
{
    $telegram = sanitize_field($telegram, 120);
    if ($telegram === '') {
        return '';
    }
    return str_starts_with($telegram, '@') ? $telegram : '@' . ltrim($telegram, '@');
}

$handle = format_telegram_handle($telegram);
$name = sanitize_field($name, 120);
$phone = sanitize_field($phone, 80);
$email = sanitize_field($email, 180);
$teacherLabel = $teacherLabels[$teacher] ?? sanitize_field($teacher, 120);

$lines = ["🆕 Заявка с сайта pick by Milana", ""];

if ($variant === 'teacher') {
    $lines[] = 'Тип: подбор преподавателя';
    $lines[] = 'Имя: ' . $name;
    $lines[] = 'Телефон: ' . $phone;
    $lines[] = 'Email: ' . $email;
    $lines[] = 'Преподаватель: ' . $teacherLabel;
} else {
    $lines[] = 'Тип: написать Милане';
}

$lines[] = 'Telegram: ' . $handle;
$lines[] = 'Рассылка: ' . ($promo ? 'да' : 'нет');

$message = implode("\n", $lines);

$payload = json_encode([
    'chat_id' => $chatId,
    'text' => $message,
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

if (!is_array($response) || empty($response['ok'])) {
    $error = is_array($response) && !empty($response['description'])
        ? (string) $response['description']
        : 'Не удалось отправить сообщение в Telegram.';
    http_response_code(502);
    echo json_encode(['success' => false, 'error' => $error], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);

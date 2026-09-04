<?php
declare(strict_types=1);

require_once __DIR__ . '/telegram-app-lib.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
    exit;
}

$config = pick_load_config();
$token = trim((string) ($config['telegram_bot_token'] ?? ''));

if ($token === '') {
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'Bot token is not configured.']);
    exit;
}

$raw = file_get_contents('php://input');
$update = json_decode($raw ?: '', true);

if (!is_array($update)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid update.']);
    exit;
}

$message = $update['message'] ?? null;
if (!is_array($message)) {
    echo json_encode(['ok' => true, 'ignored' => true]);
    exit;
}

$chat = $message['chat'] ?? null;
$text = trim((string) ($message['text'] ?? ''));
$chatId = isset($chat['id']) ? (string) $chat['id'] : '';

if ($chatId === '' || $text === '') {
    echo json_encode(['ok' => true, 'ignored' => true]);
    exit;
}

if (!preg_match('/^\/start(?:@\w+)?(?:\s+(.+))?$/u', $text, $matches)) {
    echo json_encode(['ok' => true, 'ignored' => true]);
    exit;
}

$applicationId = strtoupper(trim((string) ($matches[1] ?? '')));
$applicationId = preg_replace('/[^A-Z0-9\-]/', '', $applicationId) ?? '';

if ($applicationId === '' || !pick_is_valid_application_id($applicationId)) {
    pick_telegram_send_message(
        $token,
        $chatId,
        'не получилось найти заявку 🥹 если ты заполнял(а) анкету на сайте, открой кнопку «продолжить в telegram» ещё раз'
    );
    echo json_encode(['ok' => true, 'invalid_id' => true]);
    exit;
}

$application = pick_load_application($applicationId);
if ($application === null) {
    pick_telegram_send_message(
        $token,
        $chatId,
        'не получилось найти заявку 🥹 если ты заполнял(а) анкету на сайте, открой кнопку «продолжить в telegram» ещё раз'
    );
    echo json_encode(['ok' => true, 'not_found' => true]);
    exit;
}

if (!empty($application['activated'])) {
    pick_telegram_send_message(
        $token,
        $chatId,
        'мы уже получили твою заявку 🥹 можешь просто написать мне здесь'
    );
    echo json_encode(['ok' => true, 'already_activated' => true]);
    exit;
}

$teacher = (string) ($application['teacher'] ?? 'selection');
$reply = pick_teacher_message($teacher);
$send = pick_telegram_send_message($token, $chatId, $reply);

if (empty($send['ok'])) {
    http_response_code(502);
    echo json_encode([
        'ok' => false,
        'error' => (string) ($send['description'] ?? 'Failed to send message.'),
    ]);
    exit;
}

$application['activated'] = true;
$application['telegram_chat_id'] = $chatId;
$application['activated_at'] = gmdate('c');
pick_save_application($application);

echo json_encode(['ok' => true, 'activated' => true]);

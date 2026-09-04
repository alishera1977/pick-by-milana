<?php

require_once __DIR__ . '/telegram-app-lib.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array('ok' => false, 'error' => 'Method not allowed.'));
    exit;
}

$config = pick_load_config();
$token = trim(isset($config['telegram_bot_token']) ? (string) $config['telegram_bot_token'] : '');

if ($token === '') {
    http_response_code(503);
    echo json_encode(array('ok' => false, 'error' => 'Bot token is not configured.'));
    exit;
}

$raw = file_get_contents('php://input');
$update = json_decode($raw ? $raw : '', true);

if (!is_array($update)) {
    http_response_code(400);
    echo json_encode(array('ok' => false, 'error' => 'Invalid update.'));
    exit;
}

$message = isset($update['message']) ? $update['message'] : null;
if (!is_array($message)) {
    echo json_encode(array('ok' => true, 'ignored' => true));
    exit;
}

$chat = isset($message['chat']) ? $message['chat'] : null;
$text = trim(isset($message['text']) ? (string) $message['text'] : '');
$chatId = (is_array($chat) && isset($chat['id'])) ? (string) $chat['id'] : '';

if ($chatId === '' || $text === '') {
    echo json_encode(array('ok' => true, 'ignored' => true));
    exit;
}

$matches = array();
if (!preg_match('/^\/start(?:@\w+)?(?:\s+(.+))?$/u', $text, $matches)) {
    echo json_encode(array('ok' => true, 'ignored' => true));
    exit;
}

$applicationId = strtoupper(trim(isset($matches[1]) ? (string) $matches[1] : ''));
$cleaned = preg_replace('/[^A-Z0-9\-]/', '', $applicationId);
$applicationId = is_string($cleaned) ? $cleaned : '';

if ($applicationId === '' || !pick_is_valid_application_id($applicationId)) {
    pick_telegram_send_message(
        $token,
        $chatId,
        'не получилось найти заявку 🥹 если ты заполнял(а) анкету на сайте, открой кнопку «продолжить в telegram» ещё раз'
    );
    echo json_encode(array('ok' => true, 'invalid_id' => true));
    exit;
}

$application = pick_load_application($applicationId);
if ($application === null) {
    pick_telegram_send_message(
        $token,
        $chatId,
        'не получилось найти заявку 🥹 если ты заполнял(а) анкету на сайте, открой кнопку «продолжить в telegram» ещё раз'
    );
    echo json_encode(array('ok' => true, 'not_found' => true));
    exit;
}

if (!empty($application['activated'])) {
    pick_telegram_send_message(
        $token,
        $chatId,
        'мы уже получили твою заявку 🥹 можешь просто написать мне здесь'
    );
    echo json_encode(array('ok' => true, 'already_activated' => true));
    exit;
}

$teacher = isset($application['teacher']) ? (string) $application['teacher'] : 'selection';
$reply = pick_teacher_message($teacher);
$send = pick_telegram_send_message($token, $chatId, $reply);

if (empty($send['ok'])) {
    http_response_code(502);
    echo json_encode(array(
        'ok' => false,
        'error' => isset($send['description']) ? (string) $send['description'] : 'Failed to send message.',
    ));
    exit;
}

$application['activated'] = true;
$application['telegram_chat_id'] = $chatId;
$application['activated_at'] = gmdate('c');
pick_save_application($application);

echo json_encode(array('ok' => true, 'activated' => true));

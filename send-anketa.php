<?php

require_once __DIR__ . '/telegram-app-lib.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array('success' => false, 'error' => 'Method not allowed.'), JSON_UNESCAPED_UNICODE);
    exit;
}

$config = pick_load_config();
$token = trim(isset($config['telegram_bot_token']) ? (string) $config['telegram_bot_token'] : '');
$chatId = trim(isset($config['telegram_chat_id']) ? (string) $config['telegram_chat_id'] : '');

if ($token === '' || $chatId === '') {
    http_response_code(503);
    echo json_encode(
        array('success' => false, 'error' => 'Укажите telegram_bot_token и telegram_chat_id в send-anketa.config.php.'),
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ? $raw : '', true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(array('success' => false, 'error' => 'Некорректный формат данных.'), JSON_UNESCAPED_UNICODE);
    exit;
}

$variant = ((isset($data['variant']) ? $data['variant'] : '') === 'teacher') ? 'teacher' : 'milana';
$telegramRaw = trim(isset($data['telegram']) ? (string) $data['telegram'] : '');
$promo = !empty($data['promo']);
$ageRaw = trim(isset($data['age']) ? (string) $data['age'] : '');

$name = trim(isset($data['name']) ? (string) $data['name'] : '');
$phone = trim(isset($data['phone']) ? (string) $data['phone'] : '');
$email = trim(isset($data['email']) ? (string) $data['email'] : '');
$teacher = trim(isset($data['teacher']) ? (string) $data['teacher'] : '');

$teacherLabels = array(
    'masha-start' => 'Маша (START)',
    'gleb' => 'Глеб',
    'fedya' => 'Федя',
    'masha-expert' => 'Mary',
    'help' => 'Ещё не знаю, нужна помощь',
);

$ageLabels = array(
    '18+' => '18+',
    'under18' => 'нет 18 лет',
);

if ($variant === 'teacher') {
    if ($name === '') {
        http_response_code(400);
        echo json_encode(array('success' => false, 'error' => 'Укажите имя.'), JSON_UNESCAPED_UNICODE);
        exit;
    }
    if ($phone === '') {
        http_response_code(400);
        echo json_encode(array('success' => false, 'error' => 'Укажите телефон.'), JSON_UNESCAPED_UNICODE);
        exit;
    }
    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(array('success' => false, 'error' => 'Укажите корректный email.'), JSON_UNESCAPED_UNICODE);
        exit;
    }
    if ($teacher === '') {
        http_response_code(400);
        echo json_encode(array('success' => false, 'error' => 'Выберите преподавателя.'), JSON_UNESCAPED_UNICODE);
        exit;
    }
}

if (!isset($ageLabels[$ageRaw])) {
    http_response_code(400);
    echo json_encode(array('success' => false, 'error' => 'Укажите возраст.'), JSON_UNESCAPED_UNICODE);
    exit;
}

$ageLabel = $ageLabels[$ageRaw];

$name = pick_sanitize_field($name, 120);
$phone = pick_sanitize_field($phone, 80);
$email = pick_sanitize_field($email, 180);
$teacherLabel = isset($teacherLabels[$teacher])
    ? $teacherLabels[$teacher]
    : pick_sanitize_field($teacher, 120);
$scenarioTeacher = pick_resolve_teacher_scenario($variant, $teacher);

$username = pick_normalize_telegram_username($telegramRaw);
$hasValidUsername = ($username !== '');

$lines = array('🆕 Заявка с сайта PICK', '');

if ($variant === 'teacher') {
    $lines[] = 'Тип: подбор преподавателя';
    $lines[] = 'Имя: ' . $name;
    $lines[] = 'Телефон: ' . $phone;
    $lines[] = 'Email: ' . $email;
    $lines[] = 'Преподаватель: ' . $teacherLabel;
} else {
    $lines[] = 'Тип: написать Милане';
}

$lines[] = 'Возраст: ' . $ageLabel;

if ($hasValidUsername) {
    $lines[] = 'Telegram: @' . $username;
} else {
    $lines[] = 'Telegram: Telegram для быстрой связи не указан';
}

$lines[] = 'Рассылка: ' . ($promo ? 'да' : 'нет');

$message = implode("\n", $lines);

$replyMarkup = null;
if ($hasValidUsername) {
    $clientUrl = pick_client_message_url($username, $scenarioTeacher);
    if ($clientUrl !== '') {
        $replyMarkup = array(
            'inline_keyboard' => array(
                array(
                    array(
                        'text' => 'Написать клиенту',
                        'url' => $clientUrl,
                    ),
                ),
            ),
        );
    }
}

$notify = pick_telegram_send_message($token, $chatId, $message, $replyMarkup);
if (empty($notify['ok'])) {
    $error = !empty($notify['description'])
        ? (string) $notify['description']
        : 'Не удалось отправить сообщение в Telegram.';
    http_response_code(502);
    echo json_encode(array('success' => false, 'error' => $error), JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(array('success' => true), JSON_UNESCAPED_UNICODE);

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
$botUsername = ltrim(trim(isset($config['telegram_bot_username']) ? (string) $config['telegram_bot_username'] : ''), '@');

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
$telegram = trim(isset($data['telegram']) ? (string) $data['telegram'] : '');
$promo = !empty($data['promo']);

if ($telegram === '') {
    http_response_code(400);
    echo json_encode(array('success' => false, 'error' => 'Укажите ник в Telegram.'), JSON_UNESCAPED_UNICODE);
    exit;
}

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

$handle = pick_format_telegram_handle($telegram);
$name = pick_sanitize_field($name, 120);
$phone = pick_sanitize_field($phone, 80);
$email = pick_sanitize_field($email, 180);
$teacherLabel = isset($teacherLabels[$teacher])
    ? $teacherLabels[$teacher]
    : pick_sanitize_field($teacher, 120);
$scenarioTeacher = pick_resolve_teacher_scenario($variant, $teacher);

$lines = array("🆕 Заявка с сайта pick by Milana", "");

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

$notify = pick_telegram_send_message($token, $chatId, $message);
if (empty($notify['ok'])) {
    $error = !empty($notify['description'])
        ? (string) $notify['description']
        : 'Не удалось отправить сообщение в Telegram.';
    http_response_code(502);
    echo json_encode(array('success' => false, 'error' => $error), JSON_UNESCAPED_UNICODE);
    exit;
}

$applicationId = pick_generate_application_id();
// Extremely unlikely collision; retry a few times.
for ($i = 0; $i < 5; $i++) {
    if (pick_load_application($applicationId) === null) {
        break;
    }
    $applicationId = pick_generate_application_id();
}

$application = array(
    'application_id' => $applicationId,
    'teacher' => $scenarioTeacher,
    'created_at' => gmdate('c'),
    'activated' => false,
);

if ($name !== '') {
    $application['name'] = $name;
}

if (!pick_save_application($application)) {
    http_response_code(500);
    echo json_encode(
        array('success' => false, 'error' => 'Не удалось сохранить заявку на сервере.'),
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

$result = array(
    'success' => true,
    'application_id' => $applicationId,
);

if ($botUsername !== '') {
    $result['telegram_url'] = 'https://t.me/' . rawurlencode($botUsername) . '?start=' . rawurlencode($applicationId);
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);

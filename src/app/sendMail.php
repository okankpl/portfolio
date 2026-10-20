<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'error' => 'method_not_allowed']);
}

$contentType = strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]));
if ($contentType !== 'application/json') {
    respond(415, ['success' => false, 'error' => 'json_required']);
}

// Bound the request before decoding; the form allows at most 5,000 message characters.
$rawBody = file_get_contents('php://input', false, null, 0, 32769);
if ($rawBody === false || strlen($rawBody) > 32768) {
    respond(413, ['success' => false, 'error' => 'request_too_large']);
}

$data = json_decode($rawBody);
if (json_last_error() !== JSON_ERROR_NONE || !is_object($data)) {
    respond(400, ['success' => false, 'error' => 'invalid_json']);
}

if (!isset($data->name, $data->email, $data->message, $data->privacyPolicy)
    || !is_string($data->name) || !is_string($data->email) || !is_string($data->message)
    || $data->privacyPolicy !== true) {
    respond(422, ['success' => false, 'error' => 'invalid_contact_data']);
}

$name = trim($data->name);
$email = trim($data->email);
$message = trim($data->message);

// Byte limits also accommodate UTF-8 text without requiring the mbstring extension.
if (!preg_match('/\S/u', $name) || strlen($name) > 600
    || strlen($email) > 254 || preg_match('/[\r\n]/', $email)
    || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || !preg_match('/\S/u', $message) || strlen($message) > 20000) {
    respond(422, ['success' => false, 'error' => 'invalid_contact_data']);
}

$recipient = 'contact@okan-kaplan.de';
$subject = 'Portfolio contact request';
$body = "Name: {$name}\nEmail: {$email}\n\n{$message}\n";
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Okan Kaplan Portfolio <noreply@okan-kaplan.de>',
    'Reply-To: ' . $email
];

try {
    // Suppress transport warnings in the JSON response; never log the submitted data.
    $accepted = @mail($recipient, $subject, $body, implode("\r\n", $headers));
} catch (Throwable $error) {
    $accepted = false;
}

if (!$accepted) {
    respond(503, ['success' => false, 'error' => 'mail_unavailable']);
}

respond(200, ['success' => true]);
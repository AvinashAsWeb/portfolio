<?php
/**
 * Optional contact-form handler for PHP hosting (cPanel, Hostinger, etc.).
 * 1. Set $to below to the real inbox.
 * 2. Upload this file next to index.html on the subdomain.
 * 3. In .env set VITE_FORM_ENDPOINT=https://your-subdomain/contact.php and rebuild.
 */
$to = 'you@example.com'; // TODO: real address
$allowedOrigin = '';     // e.g. 'https://portfolio.aswebmarketings.com' (leave empty for same-origin only)

header('Content-Type: application/json');
if ($allowedOrigin) header("Access-Control-Allow-Origin: $allowedOrigin");
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }

$data = json_decode(file_get_contents('php://input'), true) ?: [];
$clean = fn($k, $max = 200) => trim(mb_substr(strip_tags($data[$k] ?? ''), 0, $max));
$name = $clean('name'); $email = $clean('email'); $company = $clean('company');
$type = $clean('projectType'); $details = $clean('details', 5000);

if (strlen($name) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$type || strlen($details) < 20) {
  http_response_code(422); echo '{"ok":false,"error":"invalid"}'; exit;
}
$email = str_replace(["\r", "\n"], '', $email); // block header injection

$body = "Name: $name\nEmail: $email\nCompany: $company\nProject type: $type\n\n$details\n";
$headers = "From: Portfolio <no-reply@{$_SERVER['HTTP_HOST']}>\r\nReply-To: $email\r\n";
$ok = mail($to, "New project enquiry: $type", $body, $headers);

http_response_code($ok ? 200 : 500);
echo json_encode(['ok' => $ok]);

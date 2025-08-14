<?php
header('Content-Type: application/json');

// Your hidden Google Script URL
$googleScriptUrl = 'https://script.google.com/macros/s/AKfycbz1a1OHFQcbiG7qQYMcjufU-b2ZnJ25xRq7qXyyDyCSKLL_zImK40wKae0HEAOIjdzb/exec';

// Forward POST data to Google Script
$ch = curl_init($googleScriptUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// If Google Script responds successfully
if ($httpCode === 302) {
    echo json_encode(['status' => 'success', 'message' => 'Form submitted successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to submit form']);
}
?>

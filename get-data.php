<?php

header('Content-Type: application/json');

// get-data.php

$sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMb0Gd6bpjV0TEtZLZf713CZ2b5UrFmI9DHPNPqVsooVqrbGuGpksbw0uBGvqweAck5QOPx6FuA9ca/pub?gid=0&single=true&output=csv";

// Your Google Sheet CSV export link
// $sheetUrl = "https://docs.google.com/spreadsheets/d/e/PTCalender/pub?gid=0&single=true&output=csv";

// $data = @file_get_contents($sheetUrl);

// if ($data === FALSE) {
//     echo json_encode(["error" => "Unable to fetch data from Google Sheets"]);
//     exit;
// }

// // Convert CSV string to array
// $rows = array_map('str_getcsv', explode("\n", $data));

// // Send JSON response
// echo json_encode($rows);

$handle = fopen($sheetUrl, "r");
if ($handle === false) {
    echo json_encode(["error" => "Unable to fetch data from Google Sheets"]);
    exit;
}

$rows = [];
while (($row = fgetcsv($handle)) !== false) {
    $rows[] = $row;
}
fclose($handle);

echo json_encode($rows);
?>

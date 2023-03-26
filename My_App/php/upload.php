<?php
require_once 'vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function sanitizeTableName($name) {
    return preg_replace('/[^A-Za-z0-9_]+/', '_', $name);
}

$servername = "localhost";
$username = "qrapacsf_XR_ogbonda_glory";
$password = "ivLmSSgaN5QVZ9A";
$dbname = "qrapacsf_immersive_data_vis";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $fileType = pathinfo($file['name'], PATHINFO_EXTENSION);
    $fileContent = file_get_contents($file['tmp_name']);
    $tableName = sanitizeTableName(pathinfo($file['name'], PATHINFO_FILENAME));

    // Check if the table name already exists
    $tableExistsSql = "SHOW TABLES LIKE '$tableName'";
    $tableExistsResult = $conn->query($tableExistsSql);
    if ($tableExistsResult->num_rows > 0) {
        echo json_encode(["message" => "A table with the same name already exists. Please change the file name and try again."]);
        exit;
    }

    if (strtolower($fileType) == 'json') {
        $jsonData = json_decode($fileContent, true);
        processJSON($jsonData, $tableName, $conn);
    } elseif (strtolower($fileType) == 'csv') {
        $csvData = array_map('str_getcsv', file($file['tmp_name']));
        processCSV($csvData, $tableName, $conn);
    } elseif (in_array(strtolower($fileType), ['xls', 'xlsx'])) {
        $spreadsheet = IOFactory::load($file['tmp_name']);
        $excelData = $spreadsheet->getActiveSheet()->toArray();
        processExcel($excelData, $tableName, $conn);
    } else {
        echo json_encode(["message" => "Invalid file type. Please upload a JSON, CSV, or Excel file."]);
        exit;
    }

} else {
    echo json_encode(["message" => "Unable to upload data"]);
}
function createTableAndInsertData($tableName, $columnSql, $header, $data, $conn) {
    $createTableSql = "CREATE TABLE IF NOT EXISTS `$tableName` ($columnSql)";
    if ($conn->query($createTableSql) === FALSE) {
        echo json_encode(["message" => "Error creating table: " . $conn->error]);
        exit;
    }

    $placeholders = rtrim(str_repeat("?,", count($header)), ",");
    $insertSql = "INSERT INTO `$tableName` (" . implode(", ", array_map(function($col) { return "`" . sanitizeTableName($col) . "`"; }, $header)) . ") VALUES ($placeholders)";
    $stmt = $conn->prepare($insertSql);

    if ($stmt === false) {
        echo json_encode(["message" => "Error preparing statement: " . $conn->error]);
        exit;
    } else {
        // Loop through the data and insert each item into the database
        foreach ($data as $item) {
            $stmt->bind_param(str_repeat("s", count($item)), ...array_values($item));
            $stmt->execute();
        }
    }

    $stmt->close();
    echo json_encode(["message" => "Data uploaded successfully"]);
}

// Process a JSON file
function processJSON($jsonData, $tableName, $conn) {
    if (is_null($jsonData) || empty($jsonData) || !is_array($jsonData)) {
        echo json_encode(["message" => "Invalid or empty JSON data"]);
        exit;
    }

    $firstItem = reset($jsonData);
    $columns = [];
    foreach ($firstItem as $key => $value) {
        $columns[] = "`" . sanitizeTableName($key) . "` TEXT";
    }
    $columnSql = implode(", ", $columns);

    createTableAndInsertData($tableName, $columnSql, array_keys($firstItem), $jsonData, $conn);
}


// Process a CSV file
function processCSV($csvData, $tableName, $conn) {
    $header = array_shift($csvData);

    $columns = [];
    foreach ($header as $key => $value) {
        $columns[] = "`" . sanitizeTableName($value) . "` TEXT";
    }
    $columnSql = implode(", ", $columns);

    createTableAndInsertData($tableName, $columnSql, $header, $csvData, $conn);
}

// Process an Excel file
function processExcel($excelData, $tableName, $conn) {
    $header = array_shift($excelData);

    $columns = [];
    foreach ($header as $key => $value) {
        $columns[] = "`" . sanitizeTableName($value) . "` TEXT";
    }
    $columnSql = implode(", ", $columns);

    createTableAndInsertData($tableName, $columnSql, $header, $excelData, $conn);
}


$conn->close();
?>

<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
// Helper function to sanitize table names
function sanitizeTableName($name) {
    return preg_replace('/[^A-Za-z0-9_]+/', '_', $name);
}


// Replace these values with your database credentials
$servername = "localhost";
$username = "qrapacsf_XR_ogbonda_glory";
$password = "ivLmSSgaN5QVZ9A";
$dbname = "qrapacsf_immersive_data_vis";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Get the uploaded file
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];

    // Get the file content and decode the JSON data
    $fileContent = file_get_contents($file['tmp_name']);
    $jsonData = json_decode($fileContent, true);

    // Create a table with the sanitized file name
    $tableName = sanitizeTableName(pathinfo($file['name'], PATHINFO_FILENAME));

    // Create the table columns dynamically based on JSON keys
    $firstItem = reset($jsonData);
    $columns = [];
    foreach ($firstItem as $key => $value) {
        $columns[] = "`" . sanitizeTableName($key) . "` TEXT";
    }
    $columnSql = implode(", ", $columns);

    // Create the table
    $createTableSql = "CREATE TABLE IF NOT EXISTS `$tableName` ($columnSql)";
    if ($conn->query($createTableSql) === FALSE) {
        echo json_encode(["message" => "Error creating table: " . $conn->error]);
        exit;
    }

    // Prepare the INSERT statement
    $placeholders = rtrim(str_repeat("?,", count($columns)), ",");
    $insertSql = "INSERT INTO `$tableName` (" . implode(", ", array_keys($firstItem)) . ") VALUES ($placeholders)";
    $stmt = $conn->prepare($insertSql);

    // Loop through the JSON data and insert each item into the database
    foreach ($jsonData as $item) {
        $stmt->bind_param(str_repeat("s", count($item)), ...array_values($item));
        $stmt->execute();
    }

    // Close the prepared statement and the connection
    $stmt->close();
    $conn->close();

    // Return success message
    echo json_encode(["message" => "Data uploaded successfully"]);
} else {
    // Return error message
    echo json_encode(["message" => "Unable to upload data"]);
}
?>
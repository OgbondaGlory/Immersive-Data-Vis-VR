<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Replace these placeholders with your actual database information
$dbServer = "localhost";
$dbUsername = "qrapacsf_XR_ogbonda_glory";
$dbPassword = "ivLmSSgaN5QVZ9A";
$dbName = "qrapacsf_immersive_data_vis";

// Create a connection to the database
$conn = new mysqli($dbServer, $dbUsername, $dbPassword, $dbName);

// Check the connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get the table name from the query parameter
$tableName = isset($_GET['table_name']) ? $_GET['table_name'] : '';

// Perform a SQL query to fetch data from the specified table
$sql = "SELECT * FROM `$tableName`";
$result = $conn->query($sql);

$rows = array();

// Fetch the rows as an associative array
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
  }
}

// Close the connection
$conn->close();

// Return the fetched data as a JSON object
echo json_encode($rows);
?>

<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "qrapacsf_XR_ogbonda_glory";
$password = "ivLmSSgaN5QVZ9A";
$dbname = "qrapacsf_immersive_data_vis";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT table_name, create_time FROM information_schema.tables WHERE table_schema = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $dbname);
$stmt->execute();
$result = $stmt->get_result();

$tables = [];

while ($row = $result->fetch_assoc()) {
    $tables[] = [
        "name" => $row["table_name"],
        "created_at" => $row["create_time"],
    ];
}

echo json_encode($tables);

$stmt->close();
$conn->close();
?>

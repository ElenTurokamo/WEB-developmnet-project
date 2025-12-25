<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "turokamo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $conn->real_escape_string($_POST['user_email']);

    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $sql = "INSERT INTO subscriptions (email) VALUES ('$email')";

        if ($conn->query($sql) === TRUE) {
            header("Location: ../index.php?status=success#footer"); 
        } else {
            if ($conn->errno == 1062) { 
                header("Location: ../index.php?status=exists#footer");
            } else {
                header("Location: ../index.php?status=error#footer");
            }
        }
    } else {
        header("Location: ../index.php?status=error#footer");
    }
}
$conn->close();
?>
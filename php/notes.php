<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Параметры подключения
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "turokamo"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $note_title = $conn->real_escape_string($_POST['note_title']);
    $note_description = $conn->real_escape_string($_POST['note_description']);

    if (!empty($note_title) && !empty($note_description)) {
        
        $sql = "INSERT INTO notes (title, description) VALUES ('$note_title', '$note_description')";

        if ($conn->query($sql) === TRUE) {

            header("Location: ../index.php"); 
            exit();
        } else {
            echo "Ошибка выполнения запроса: " . $conn->error;
        }
    } else {
        echo "Заполните все поля!";
    }
}

$conn->close();
?>
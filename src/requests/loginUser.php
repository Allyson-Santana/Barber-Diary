<?php 
    // Connecting to MySQL Database.
    include "./connections/connection.php";
    
    // Getting the received JSON into $json variable.
    $json = file_get_contents('php://input');

     // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json, true);

    // Populate information from JSON $obj array and store into variables
    $email = $obj['email'];
    $password = $obj['password'];


    // Creating SQL query and insert the record into MySQL database table.     
    $query = "SELECT * FROM tb_user WHERE nm_email = '$email' LIMIT 1;)";
    $data = $conn->query($query)->fetch();

    $password_hash = $data['nm_password'];

    // Check password, sending and converting the message into JSON format.
    if (password_verify($password, $password_hash)) {
        echo json_encode($data); 
    } else {
        echo json_encode("E-mail ou senha incorreta!");       
    }       

    //close connection with MYSQL
    $conn = null;
?>

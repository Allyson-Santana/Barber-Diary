<?php 
    // Connecting to MySQL Database.
    include "./connections/connection.php";
    
    // Getting the received JSON into $json variable.
    $json = file_get_contents('php://input');

     // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json, true);

    // Populate information from JSON $obj array and store into variables
    $token = $obj['token'];

    // Creating SQL query and insert the record into MySQL database table.     
    $query = "SELECT * FROM tb_user WHERE ds_token = '$token' LIMIT 1;)";
    $data = $conn->query($query)->fetch();
    
    // sending and converting the message into JSON format.
    echo json_encode($data);        

    //close connection with MYSQL
    $conn = null;
?>

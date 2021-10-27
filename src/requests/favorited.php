<?php 
    // Connecting to MySQL Database.
    include "./connections/connection.php";
    
    // Getting the received JSON into $json variable.
    $json = file_get_contents('php://input');

     // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json, true);

    // Populate information from JSON $obj array and store into variables
    $id = $obj['id'];
    $userId = $obj['userId'];

    $query = " SELECT * FROM tb_favorite WHERE user_id = '$userId' AND barber_id = '$id' ";
    $data = $conn->query($query)->fetch();

    if(empty($data)){ 
        $query = " INSERT INTO tb_favorite VALUES('$userId','$id'); ";
    }else {
        $query = " DELETE FROM tb_favorite WHERE user_id = '$userId' AND barber_id = '$id' ";
    }   
   
    $data = $conn->query($query)->fetch();

    //close connection with MYSQL
    $conn = null;
?>

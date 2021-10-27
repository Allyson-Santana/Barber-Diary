<?php 
    // Connecting to MySQL Database.
    include "./connections/connection.php";
    
    // Getting the received JSON into $json variable.
    $json = file_get_contents('php://input');

     // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json, true);

    // Populate information from JSON $obj array and store into variables
    $name = $obj['name'];
    $email = $obj['email'];
    $password = $obj['password'];

    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $avatar = 'localhost/github/Desenvolvimento-Mobile/AgendaBarbeiro/assets/person.png';
    $token = substr( ( str_shuffle( (rand(0,15) . 'mknzjergswtcuhdpxboliyfqav') ) ), 0, 10);

    // Creating SQL query and insert the record into MySQL database table.     
    $query = "INSERT INTO tb_user (nm_user, nm_email, nm_password, ds_token, ds_avatar ) VALUES ('$name', '$email', '$password_hash', '$token', '$avatar');";
    $data = $conn->query($query)->fetch( PDO::FETCH_ASSOC );
    if($data > 0) {
        $idUser = $conn->lastInsertId();
        $dataUser = $conn->query("SELECT * FROM tb_user WHERE cd_user = '$idUser'")->fetch();
    }else {
        $dataUser = "E-mail Já existe";
    }
    // sending and converting the message into JSON format.
    echo json_encode($dataUser);

    //close connection with MYSQL
    $conn = null;
?>

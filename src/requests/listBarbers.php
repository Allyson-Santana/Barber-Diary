<?php 
    // Connecting to MySQL Database.
    include "./connections/connection.php";

    // Getting the received JSON into $json variable.
    $json = file_get_contents('php://input');

     // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json, true);

    // Populate information from JSON $obj array and store into variables
    // $latitude = $obj['latitude'];
    // $longitude = $obj['longitude'];
    // $locationText = $obj['locationText'];

    
    // Creating SQL query and insert the record into MySQL database table.     
    $query = "SELECT * FROM vw_sendBarbers";

    $data = $conn->query($query)->fetchAll(PDO::FETCH_ASSOC);
    
    foreach($data as $item){
        $row = $item;
        $rows[] = $row;
    }

    echo json_encode($rows);

    //close connection with MYSQL
    $conn = null;
?>

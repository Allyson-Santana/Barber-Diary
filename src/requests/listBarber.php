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
    
    // Creating SQL query and insert the record into MySQL database table.     

    
    $query = "SELECT *, sfGetFavorited('$userId','$id') as favorited,
                (select sfGetStar('$id') ) as stars,
                (select count(*) from tb_testimonial where barber_id = '$id') as countstars
              FROM vw_sendbarbers WHERE cd_barber = '$id' LIMIT 1";              
    $data1 = $conn->query($query)->fetchAll(PDO::FETCH_ASSOC);

    foreach($data1 as $item){
        $row = $item;
        $rowsData1['barber'][] = $row;
    }


    $query = "SELECT cd_service, nm_service, vl_price FROM tb_service WHERE barber_id = '$id' ";              
    $data2 = $conn->query($query)->fetchAll(PDO::FETCH_ASSOC);
    
    foreach($data2 as $item){
        $row = $item;
        $rowsData2['service'][] = $row;
    }

    $response = array_merge($rowsData1, $rowsData2);

    
    $query = "SELECT ds_photo FROM tb_photo WHERE barber_id = '$id' LIMIT 3";              
    $data3 = $conn->query($query)->fetchAll(PDO::FETCH_ASSOC);

    if(!empty($data3)) {
        foreach($data3 as $item){
            $row = $item;
            $rowsData3['photo'][] = $row;
        }
        $response = array_merge($response, $rowsData3);
    }
        
    $query = "SELECT cd_testimonial, user_id, barber_id, nm_testimonial, vl_star as stars,
                (select count(*) from tb_testimonial where barber_id = '$id') as countstars,
                (SELECT nm_user FROM tb_user WHERE cd_user = user_id) as nameUser
              FROM tb_testimonial as t WHERE barber_id = '$id'";              
    $data4 = $conn->query($query)->fetchAll(PDO::FETCH_ASSOC);

    if(!empty($data4)) {
        foreach($data4 as $item){
            $row = $item;
            $rowsData4['testimonial'][] = $row;
        }
        $response = array_merge($response, $rowsData4);
    }

    $query = "SELECT cd_dateAvailable, cd_hourAvailable,  dt_dateAvailable, 
                TIME_FORMAT(h.tm_hourAvailable, '%h:%i ')  
                    as tm_hourAvailable 
                FROM tb_barber AS b
                INNER JOIN tb_dateAvailable AS d on  d.barber_id = b.cd_barber
                INNER JOIN tb_hourAvailable AS h on h.dateAvailable_id = d.cd_dateAvailable
                    WHERE b.cd_barber = '$id'
                        order by cd_dateAvailable, cd_hourAvailable";

    $data5 = $conn->query($query)->fetchAll(PDO::FETCH_ASSOC);

    if(!empty($data5)) {
        foreach($data5 as $item){
            $row = $item;
                 $data = [
                    'cd_dateAvailable' => $row['cd_dateAvailable'],
                    'dt_dateAvailable' => $row['dt_dateAvailable'],
                    'hour' => [
                      'cd_hourAvailable' => $row['cd_hourAvailable'],
                      'tm_hourAvailable' =>  $row['tm_hourAvailable']
                    ]                    
                ];
             $rowsData5['calendarAvailable'][] = $data;
        }
        
        $response = array_merge($response, $rowsData5);
    }
        
    // sending and converting the message into JSON format.
    echo json_encode($response);        

    //close connection with MYSQL
    $conn = null;
?>

<?php
    try{
        $conn = new PDO("$driver:host=$hostName;dbname=$DBName", $hostUser, $hostPass);
        $conn-> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

        $conn->exec("set names utf8mb4");
    }
    catch(PDOException $Exception){ 
        echo "Erro: " . $Exception->getMessage()  
            ." - Codigo: " . $Exception->getCode(); 
        die;
    }
?>
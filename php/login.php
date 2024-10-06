<?php

include("dbConn.php");

$case_ = $_POST["case"];

   switch ($case_)
{
   case "loginData":

    $username = $_POST["username"];
    $password = $_POST["password"];

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    $pass = $stmt->execute([$username, $password]);

    if ($pass==true) 
     {
         echo json_encode("success");
     } 
    else 
     {
         echo json_encode("failed");
     }

   //echo json_encode($pass);
break;
}
?>
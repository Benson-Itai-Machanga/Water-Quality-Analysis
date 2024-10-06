<?php

$myPDO = new PDO("pgsql:host=localhost; dbname=geoDatabase", "postgres","2359");

$case_ = $_POST["case"];

   switch ($case_)
{
   case "searchingData":

   $search_txt = $_POST['searchTxT'];

   $sql2 = "SELECT * FROM water_quality WHERE LOWER(month) LIKE LOWER('".$search_txt."%') ORDER BY month ASC LIMIT 20";
//LOWER(address) LIKE LOWER('".$search_txt."%')  OR LOWER(name) LIKE LOWER('".$search_txt."%')ORDER BY address ASC LIMIT 20
   $query = $myPDO->query($sql2);
   $results = $query->fetchAll(PDO::FETCH_ASSOC);

   echo json_encode($results);
break;
}
?>

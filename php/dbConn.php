<?php
$host = "localhost";
$port = "5432";
$dbname = "geoDatabase";
$user = "postgres";
$password = "2359";

$conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password");
?>

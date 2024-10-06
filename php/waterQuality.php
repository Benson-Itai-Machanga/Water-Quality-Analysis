<?php
	$myPDO = new PDO("pgsql:host=localhost; dbname=geoDatabase", "postgres","2359");

	$case = $_POST['case'];
    $months = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	function weekOfMonth($strDate)
	{
	  	$date_array = explode("-", $strDate);
	  	$date = new DateTime();
	  	$date -> setDate($date_array[0], $date_array[1], $date_array[2]);
	  	return floor((date_format($date, 'j')-1)/7)+1;
	};

    switch ($case) 
    {
	 	case 'insert_data':
	 	try 
	 	{	
	 		$water_data = $_POST['waterQualityData'];
	 		if(isset($water_data))
	 		{
				$water_data = $_POST['waterQualityData'];			
				foreach ($water_data as $row)
				{
					$uid = [$row["data-meta-instanceID"]];
					$sql_check = 'SELECT * FROM "water_quality" WHERE uid = ?';
					$stmt_check = $myPDO->prepare($sql_check);
					if($stmt_check->execute($uid))
					{
						$result = $stmt_check->rowCount();
				        if ($result==0) 
				        { 
				            $uid_ = $row["data-meta-instanceID"];
				            $date_str = $row["data-Date"];
							$date_infor = explode("T", $date_str);
							$date = $date_infor[0];
							$date_infor_str = explode("-", $date);
							$year = $date_infor_str[0];
							$month = $months[(int)$date_infor_str[1]-1];
							$week = "WEEK ".weekOfMonth($date);
							$day = "DAY ".$date_infor_str[2];
							$time_str = $date_infor[1];
							$time_infor = explode(".", $time_str);
							$time = $time_infor[0];
							$stand_num = $row["data-StandNumber"];
							$street = $row["data-StreetName"];
							$surbub = $row["data-Location"];
							$ph = $row["data-pH"];
							$cl = $row["data-Chlorine"];
							$xy = $row["data-Coordinates"];
				        	$coordinates = explode(",", $xy);
				        	$X = $coordinates[1];
							$Y = $coordinates[0];
							$Z = $row["data-Coordinates-altitude"];
							$geom = "POINT(".$X." ".$Y.")";

					        $sql = "INSERT INTO water_quality (uid, date_captured, time_captured, day, week, month, year, stand_num, surbub, ph, cl, x, y, geom) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
						    $stmt = $myPDO->prepare($sql);
						    $data = [$uid_, $date_str, $time, $day, $week, $month, $year, $stand_num, $surbub, $ph, $cl, $X, $Y, $geom];
								        
					        
				           if($stmt->execute($data))
							{
								$inserted = $stmt->rowCount();
								//echo json_encode("Uploaded: ".$inserted." records");
								echo json_encode("Uploaded Successifully");
							}
						   else
							{
								echo json_encode("Failed to upload: Please check sql querry");
								
							}
				        }
				        else
				        {
				        	echo json_encode("Data Downloaded Exists"); 	
				        }
					}
					else
					{
						echo json_encode("failed");
					}
				}
	 		}
	 	    
	    }	
		catch (Exception $e) 
	 	{
	 		echo $e->getMessage();
	 	}
		 break;
		 
		case 'getStructuredInfor':

		 //echo json_encode("php said received");
		
	 		try 
	 		{
		 		$sql = 'SELECT * FROM "water_quality"';
				$query = $myPDO->query($sql);
				$results = $query->fetchAll(PDO::FETCH_ASSOC);
				echo json_encode($results);
	 		}
	 		 catch (Exception $e) 
	 		{
	 			echo $e->getMessage();
	 		}

	 		break; 
		 		
    }
		

?>


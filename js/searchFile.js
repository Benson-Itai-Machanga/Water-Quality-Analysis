var username = "";
/*
$("#login").click(function()
{
    var password = $("#password").val();
    username = $("#username").val(); 
    const loginData    =   { 
                              "case":'loginData', 
                              "username":username,
                              "password":password
                            };  

    console.log(loginData);                  
 
    $.ajax({
    type: "POST",
    url: "php/login.php",
    dataType: "json",
    data:loginData,
    success: function(data, status, xhr)
    {
    	console.log(data);
        if (data=='success') 
            {
                $("#landingPage").hide();
                $('.fromFastInfo').hide();
                $('#logie').hide();
                $('#map').show();          
                $("#user").html(username);  
            } 
        else 
        {
            $('#output_').html("Login failed. Please check your credentials.");
            $('#output_').show();
            $('#output_').css("color","red");
             setTimeout(function()
              {
                $('#output_').css("display","none");
              },3000)
        }
      
    }
});

});
*/

$('.fastInfo').click(function(){
/*
if (username=="") 
    {
        alert("login please!");
    }
*/
//else 
//{
    $("#dashboard").click(function(){
    $('#map').show();
    })
    $('.fromFastInfo').hide();
    $("#landingPage").hide();
    $("#legend").show();
    $("#map").show();
    $('#logie').hide();
    $('#resultsDivInner').css("display","none");
    $('#'+$(this).attr('target')).show();
//}

});


$("#search").keyup(function()
{
	$(".fromFastInfo").css("display","none");
/*	if (username=="") 
    {
        alert("login please!");

    }

	else 
	{
	*/	var searchTxT = $('#search').val();
		if (searchTxT=="")
		{
			$("#resultsDivInner").html("");
			$("#legend").hide();
			points.setParams({ CQL_FILTER: "month = ' ' "});
		} 
		else 
		{
			const searchData	=   { 
									  "case":'searchingData', 
				                      "searchTxT":searchTxT
				                    };                    
		 
			$.ajax({
			type: "POST",
			url: "php/searchFile.php",
			dataType: "json",
			data:searchData,
			success: function(data, status, xhr)
			{
				//console.log(data);
			    QueryHouseData(data);
		  	}	
			});
		}
//	}
	
})

function QueryHouseData(FetchedSearch)
{
var waterInfo = FetchedSearch;
if (waterInfo=="") 
	{
		$("#resultsDivInner").html("no records");
		points.setParams({ CQL_FILTER: "month = ' ' "});
	} 
	else 
	{
		$("#resultsDivInner").show();
		//console.log(FetchedSearch)
		var month_m = waterInfo[0].month;
		points.setParams({ CQL_FILTER: "month = '" +month_m+ "' "});
		$("#legend").show();
		container.appendChild(layer_legend);
	    container.appendChild(textNode);
	    map.addLayer(points); 
	    legend.appendChild(container);
		//console.log(points.setParams({ CQL_FILTER: "month = '" +month_m+ "' "}));
		var _addressResults = "";
		for (var i = 0; i < waterInfo.length; i++) {
		var incidentAddress = document.createElement("div");
	    incidentAddress.classList.add("incidentAddress_");
	    incidentAddress.id = waterInfo[i].id;
	    var Y = waterInfo[i].y;
	    var X = waterInfo[i].x;   
	    var location = waterInfo[i].surbub;
	    var ph= waterInfo[i].ph;
	    var cl= waterInfo[i].cl;
		incidentAddress.setAttribute("location",location);
	    incidentAddress.setAttribute("ph",ph);
	    incidentAddress.setAttribute("cl",cl);
	    incidentAddress.setAttribute("coords",Y+","+X)
		incidentAddress.append(location);

	    resultsDivInner.append(incidentAddress);
	    _addressResults += incidentAddress.outerHTML;
		}
		resultsDivInner.innerHTML = _addressResults;
	    $(".incidentAddress_").click(function()
	  	{
	      	if ($(this))//if incident info clicked, true/false. 
	        {
	  	     		var coords = $(this).attr("coords").split(",");
	          		var Y = $(this).attr("Y");
	          		var X = $(this).attr("X");
	         	 	var location = $(this).attr("location");
	         		var ph = $(this).attr("ph");
	         		var cl = $(this).attr("cl");
	 				map.flyTo(coords,20);
	         	 	var popup=L.popup({closeOnClick: true, autoClose: true})
	              	.setLatLng(coords)
	              	.setContent("pH : "+ph+"<br>Cl : "+cl+"<br> location : "+location)
	              	.openOn(map);
					//L.marker(coords).addTo(map);	 
			}
	  		else
	      		{
	      			
	      		}	
		});
	}

}
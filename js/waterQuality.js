  fetch("enter your web app script here")
  .then(res=>res.json())
  .then(data=>{ 
  //console.log(data);
  var inforMation = {'case':'insert_data', 'waterQualityData': data};
  $.ajax({
                url: "php/waterQuality.php",
                method: "post",
                data: inforMation,
                success : function(respData)
                {
                  //var waterQualityData = respData;
                  //console.log(respData);
                  $("#fromFastInfoUpdates").html(respData);
                }
        });
    });
//  });
   
var msg = {'case':'getStructuredInfor'}; 
  $.ajax({
            url: "php/waterQuality.php",
            method: "post",
            data: msg,
            success : function(data)
            {
              
                var _data = JSON.parse(data);
                //console.log(_data);    
                var groups = ['day', 'week', 'month', 'year'];
                           
                function getNumericalData(json_data)
                {
                    const numericalSamples = _data.filter((data_)=>{
                    var check = isNaN(data_.ph);
                      if(check==false)
                      {
                        return data_;  
                      }
                    });
                    return numericalSamples
                }
                function GroupData(groupBy, dataObj)
                {
                  const groupByMonth = dataObj.reduce((prds, item)=>{
                  (prds[item[groupBy]]=prds[item[groupBy]] || []).push(item);
                  return prds;
                  },{});
                  return groupByMonth;
                };
                 function GroupDataYear(groupBy, dataObj)
                {
                  const groupByYear = dataObj.reduce((prds, item)=>{
                  (prds[item[groupBy]]=prds[item[groupBy]] || []).push(item);
                  return prds;
                  },{});
                  return groupByYear;
                };

                function getSum(array){
                  var sum =0;
                  var length = array.length;
                  for (var i=0; i<length; i++)
                  {
                    sum+=(Number(array[i]));
                  }
                  return sum;
                }
                function avarageArray(array)
                {
                  var sum =0;
                  var length = array.length;
                  for (var i=0; i<length; i++)
                  {
                    sum+=(Number(array[i]));
                  }
                  return (sum/length);
                }
                function convertToArray(dataObj)
                {
                  var array_ = Object.keys(dataObj);
                  var array_Obj = array_.map(function(key){
                      return {[key]: dataObj[key]};
                    });
                    return array_Obj;
                 }
                
                var waterData = getNumericalData(_data); //Bulk Data
                //console.log(waterData);
                var monthData = GroupData('month', waterData);
                var yearData = GroupDataYear('year', waterData);
                //console.log(monthData);
                var months  = Object.keys(monthData);
                var years  = Object.keys(yearData);
                //console.log(yearData);

               // console.log(months);
                 
//here
                var option_="";
                var year="";
                for(i=0; i<years.length; i++)
                { 
                  year = years[i];
                  option_ = '<option>'+year+'</option>';
                  console.log(option_);
                  $("#select_year").append(option_);
                }

            var option="";
            var month="";
            
            $('#select_year').click(function()
                {
                  $("#select").html("Select month");
                  var monthsOfYear =  GroupData('month', yearData[$("#select_year").val()]);
                  var monthsKeys = Object.keys(monthsOfYear);

                  //console.log(monthsKeys);

                  for(i=0; i<monthsKeys.length; i++)
                    {
                      month = monthsKeys[i];
                      option = '<option>'+month+'</option>';
                      //console.log(option);
                      $("#select").append(option);
                    }
                })
                             

                function getDataByMonth(month) {
                  
                  var daysOfMonth =  GroupData('day', monthData[$("#select").val()]);// variable here
                  var daysOfMonthArray = convertToArray(daysOfMonth);
                  var average_dailySamples = [];
                  //Group Data by Month => Group Month Data by Days => Group Daily Data according to Weeks
                  var maximum_ph_values = [];
                  var minimum_ph_values = [];
                  var maximum_cl_values = [];
                  var minimum_cl_values = [];
                  var days_dates = [];
                  //console.log(daysOfMonthArray);

                  for(i=0; i<daysOfMonthArray.length; i++)
                  {
                    var dailyData = daysOfMonthArray[i][Object.keys(daysOfMonthArray[i])];
                   
                    var day = Object.keys(daysOfMonthArray[i])[0];

                    days_dates.push(day);

                    var chlorine_samples = dailyData.map((index)=>{return index.cl});
                    var ph_samples = dailyData.map((index)=>{return index.ph});
                    var surbub = dailyData.map((index)=>{return index.surbub});
                    var x = dailyData.map((index)=>{return index.x});    //Added
                    var y = dailyData.map((index)=>{return index.y});    //Added

                     
                    var maximum_ph_value = Math.max.apply(Math,ph_samples);
                    var minimum_ph_value = Math.min.apply(Math,ph_samples);
                    var maximum_cl_value = Math.max.apply(Math,chlorine_samples);
                    var minimum_cl_value = Math.min.apply(Math,chlorine_samples);     
                    var week = dailyData.map((index)=>{return index.week})[0];

                    //console.log(minimum_cl_value);
                    //console.log(day);
                    //console.log(chlorine_samples);
                    //console.log(dailyData);

                    var averagedDailyData = {
                      day : day,
                      clObj:chlorine_samples,
                      cl : Number(avarageArray(chlorine_samples).toFixed(2)),
                      phObj:ph_samples, 
                      ph : Number(avarageArray(ph_samples).toFixed(2)),
                      week: week,
                      x : x,   //Added
                      y : y,    //Added
                      numberOfSamples: dailyData.length,
                      maximum_ph_values: maximum_ph_value,
                      minimum_ph_values: minimum_ph_value,
                      maximum_cl_values: maximum_cl_value,
                      surbubs: surbub,
                      minimum_cl_values: minimum_cl_value
                     };
                     average_dailySamples.push(averagedDailyData);    
                  }
                   
                   return average_dailySamples;
                   //console.log(days_dates);
                   //console.log(dailyData);
                   //console.log(averagedDailyData);

                }
                var day_option="";
                $("#analyse").click(function(){
                   var sample = $("#sample").val();
                   var monthVal = $("#select").val();
                   //console.log(monthVal);
                   //console.log(getDataByMonth($(this).val()));
                   //console.log(sample);
                  
                   var days = getDataByMonth(monthVal).map((index)=>{return index.day});
                   var cl_data = getDataByMonth(monthVal).map((index)=>{return index.cl});
                   var ph_data = getDataByMonth(monthVal).map((index)=>{return index.ph});
                   var mum_of_samples = getDataByMonth(monthVal).map((index)=>{return index.numberOfSamples});
                   var cl_maximumValues = getDataByMonth(monthVal).map((index)=>{return index.maximum_cl_values});
                  // console.log(getDataByMonth(monthVal));

                  
                   for(i=0; i<days.length; i++)
                   {
                    //console.log(days[i]);
                    day_option += '<option>'+days[i]+'</option>';
                    $("#DayQuery").html(day_option);
                   }



                   function getStats(sample)
                   {
                      switch(sample)
                      {
                        case "Cl":;
                           //$("#maxiValues").append(cl_maximumValues[i]);
                        break;

                        case "pH":;
                        break;
                      }
                   }

                    switch(sample)
                    {
                      case "Cl":
                        gisRating.config.data.labels = days;
                        gisRating.config.data.datasets[0].data = cl_data;
                        gisRating.update();
                        getStats("Cl");
                        //console.log(cl_maximumValues);
                        
                      break;

                      case "pH":
                        gisRating.config.data.labels = days;
                        gisRating.config.data.datasets[0].data = ph_data;
                        gisRating.update();
                        //console.log(cl_maximumValues);
                    
                      break;

                    }

                });

                  $("#getDailyStats").click(function(){
                        var monthVal = $("#select").val();
                        var dayVal = $("#DayQuery").val();
                        var dailyData = getDataByMonth(monthVal);
                        //console.log(dayVal);
                        console.log(points.setParams({ CQL_FILTER: "day = '" +dayVal+ "' AND month = '" +$("#select").val()+ "' "}));
                        var dailyDataOBJ = convertToArray(GroupData('day', dailyData));

                        function returnDaySamples(day)
                        {
                          for(i=0; i<dailyDataOBJ.length; i++)
                          {

                            if(Object.keys(dailyDataOBJ[i])==day)
                            {
                              return dailyDataOBJ[i][day][0];
                            }

                          }
                        }

                        //console.log(returnDaySamples(dayVal));

                        var phData = returnDaySamples(dayVal).phObj;
                        var clData = returnDaySamples(dayVal).clObj;
                        var surbubs = returnDaySamples(dayVal).surbubs;
                        var sample_x_data = returnDaySamples(dayVal).x;
                        var sample_y_data = returnDaySamples(dayVal).y;

                        var maxCl = returnDaySamples(dayVal).maximum_cl_values;
                        var minCl = returnDaySamples(dayVal).minimum_cl_values;
                        var maxPH = returnDaySamples(dayVal). maximum_ph_values;
                        var minPH = returnDaySamples(dayVal).minimum_ph_values;

                        $("#maxCl").html("&nbsp;["+maxCl+"]");
                        $("#maxpH").html("&nbsp;["+maxPH+"]");
                        $("#minCl").html("&nbsp;["+minCl+"]");
                        $("#minpH").html("&nbsp;["+minPH+"]");

                        var NoOfSamples = returnDaySamples(dayVal).numberOfSamples;
                        var averageCl = returnDaySamples(dayVal).cl;
                        var averagepH = returnDaySamples(dayVal).ph;

                        $("#noSample").html("&nbsp;: "+NoOfSamples);
                        $("#avgCl").html("&nbsp;: "+averageCl);
                        $("#avgpH").html("&nbsp;: "+averagepH);
                        //$("#maxCl").html("&nbsp;["+maxCl+"]");

                        var indexsMaxCl = [];
                        var indexsMinCl = [];
                        var indexsMaxPH = [];
                        var indexsMinPH = [];

                        var surbubsArrMaxCl = [];
                        var x_surbubsArrMaxCl = [];
                        var y_surbubsArrMaxCl = [];
                        var surbubsArrMinCl = [];
                        var x_surbubsArrMinCl = [];
                        var y_surbubsArrMinCl = [];
                        var surbubsArrMaxPH = [];
                        var x_surbubsArrMaxPH = [];
                        var y_surbubsArrMaxPH = [];
                        var surbubsArrMinPH = [];
                        var x_surbubsArrMinPH = [];
                        var y_surbubsArrMinPH = [];

                        //console.log(indexs);
                        //console.log(surbubsArr);

                        function getSpecialStats(value, sampleData, indexArr, resultSurbubArr, result_x_CoordsArr, result_y_CoordsArr)
                        {
                          sampleData.filter(function(elem, index, array){
                            if(elem == value){
                            indexArr.push(index);
                            resultSurbubArr.push(surbubs[index]);
                            result_x_CoordsArr.push(sample_x_data[index]);
                            result_y_CoordsArr.push(sample_y_data[index]);
                            }
                          });
                        }

                        getSpecialStats(maxCl, clData, indexsMaxCl, surbubsArrMaxCl, x_surbubsArrMaxCl, y_surbubsArrMaxCl);
                        getSpecialStats(minCl, clData, indexsMinCl, surbubsArrMinCl, x_surbubsArrMinCl, y_surbubsArrMinCl);
                        getSpecialStats(maxPH, phData, indexsMaxPH, surbubsArrMaxPH, x_surbubsArrMaxPH, y_surbubsArrMaxPH);
                        getSpecialStats(minPH, phData, indexsMinPH, surbubsArrMinPH, x_surbubsArrMinPH, y_surbubsArrMinPH);

                        function getSurbubsWithSpecialValues(surbub_array, y_coord_arr, x_coord_arr)
                        {
                            var specialSurbub = "";
                            var X, Y;
                            var land_reg_results = document.querySelector("#land_reg_results");
                            for (i=0; i<surbub_array.length; i++)
                            {

                              var incidentSampleAddress = document.createElement("div");
                              incidentSampleAddress.setAttribute('class', 'incidentSampleAddress');
                              //incidentSampleAddress.id = array[i];
                              var address = surbub_array[i];
                              X = x_coord_arr[i];
                              Y = y_coord_arr[i];

                              incidentSampleAddress.setAttribute("address",address);
                              incidentSampleAddress.setAttribute("coord_y",Y);
                              incidentSampleAddress.setAttribute("coord_x",X);
                              incidentSampleAddress.setAttribute("coords", X+", "+Y);

                              incidentSampleAddress.append("- "+address);
                              specialSurbub += incidentSampleAddress.outerHTML;

                            }
                          return specialSurbub;
                        }      

                        $("#maxClSuburbs").html(getSurbubsWithSpecialValues(surbubsArrMaxCl, x_surbubsArrMaxCl, y_surbubsArrMaxCl));
                        $("#maxPHSuburbs").html(getSurbubsWithSpecialValues(surbubsArrMaxPH, x_surbubsArrMaxPH, y_surbubsArrMaxPH));
                        $("#minClSuburbs").html(getSurbubsWithSpecialValues(surbubsArrMinCl, x_surbubsArrMinCl, y_surbubsArrMinCl));
                        $("#minPHSuburbs").html(getSurbubsWithSpecialValues(surbubsArrMinPH, x_surbubsArrMinPH, y_surbubsArrMinPH));

                        $('.incidentSampleAddress').click(function(){
                          var coords = $(this).attr("coords").split(",");
                          //console.log(coords);
                          map.flyTo(coords,20);
                          var popup=L.popup({closeOnClick: true, autoClose: true})
                          .setLatLng(coords)
                          .setContent($(this).attr("coords"))
                          .openOn(map);

                        });

                });

            }
      });

 let myChart = document.getElementById('myChart').getContext('2d');
 myChart.canvas.height = 200;

let gisRating = new Chart(myChart, {
      type: 'line', //line, bar, horizontalBar, pie, doughnut, radar, polarArea
      data: {
        labels: [],
        datasets: [{
          label: 'WATER QUALITY SAMPLES',
          data: [],
         // borderWidth: 0,
          fill: false,
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
          hoverBorderColor: '#000',
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        }]
      }
 
    
});


$("#logie").css("display","none");

$('#login-icon').click(function(){
    $(".fromFastInfo").hide();
    $("#logie").show();
    $('#landingPage').hide();
})

$("#homeButton").click(function(){
    //console.log("home button clicked");
    $("#landingPage").show();
    $('.fromFastInfo').hide();
    $('#logie').hide();
    $('#map').hide();
    $("#legend").hide();
    $("#resultsDivInner").css("display","none");
})

$("#updates").click(function()
{
    $("#legend").hide();
})

$("#alerts").click(function()
{
    $("#legend").hide();
})

$("#news").click(function()
{
    $("#legend").hide();
})

$("#about").click(function()
{
    $("#legend").hide();
})

document.addEventListener("DOMContentLoaded", function() {
    // Move the div to its original position
	  const div = document.getElementById('below');
	  div.style.left = '0';
	});

window.onload = function() {
    const div = document.getElementById('below');
    setTimeout(function() {
    div.style.left = '0';
  }, 100); // Delay the movement slightly to ensure the transition triggers
}

document.addEventListener("DOMContentLoaded", function() {
	  // Move the div to its original position
	  const div = document.getElementById('Overview');
	  div.style.right = '0';
});

window.onload = function() {
	  const div = document.getElementById('Overview');
	  setTimeout(function() {
      div.style.right = '0';
	  }, 100); // Delay the movement slightly to ensure the transition triggers
}

document.addEventListener("DOMContentLoaded", function() {
	  // Move the div to its original position
	  const div = document.getElementById('scndLandingImageDIV');
	  div.style.top = '0';
});

window.onload = function() {
	  const div = document.getElementById('scndLandingImageDIV');
	  setTimeout(function() {
      div.style.top = '0';
	  }, 100); // Delay the movement slightly to ensure the transition triggers
}

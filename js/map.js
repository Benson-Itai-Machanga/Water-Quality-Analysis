var map = L.map('map',
    {
        measureControl: true,
    });  
    /*map.setView([-20.07206,30.83331],3);*/
    map.setView([23.2,12.3],3);
    map.zoomControl.setPosition('bottomright');

var googleSatImage = L.tileLayer(
            'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
            {
              maxZoom: 50,
              subdomains:['mt0','mt1','mt2','mt3']
});

googleSatImage.addTo(map);


var map1 = L.map('map1',
    {
        measureControl: true,
    });  
    map1.setView([-20.07206,30.83331],12);
    //map1.setView([23.2,12.3],3);
    map1.zoomControl.setPosition('bottomright');

var openstreetMap = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 50,
  })
openstreetMap.addTo(map1);

var points = new L.tileLayer.betterWms("http://localhost:8090/geoserver/waterQuality/wms", {
    layers: "waterQuality:water_quality",
    maxZoom: 80,
    format:  "image/png",
    transparent: "true",
    attribution: "@GIS2024"
});

const legend = document.getElementById("legend");
const layer_legend = document.createElement('img');
layer_legend.setAttribute("src","http://localhost:8090/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=water_quality");
layer_legend.setAttribute("id", "points");
layer_legend.setAttribute("class","layer_legend_");

const textNode = document.createElement('span');
textNode.innerText = "Water Sample";
textNode.id="text";
textNode.className="layer_legend_";

const container = document.createElement('div');
container.id="container";

$("#getDailyStats").click(function()
{
    container.appendChild(layer_legend);
    container.appendChild(textNode);
    map.addLayer(points); 
    legend.appendChild(container);
})
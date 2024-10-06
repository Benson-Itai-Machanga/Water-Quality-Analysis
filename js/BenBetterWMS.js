L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
      onAdd: function (map) {
        // Triggered when the layer is added to a map.
        //   Register a click listener, then do all the upstream WMS things
        L.TileLayer.WMS.prototype.onAdd.call(this, map);
        map.on("click", this.getFeatureInfo, this);
      },

      onRemove: function (map) {
        // Triggered when the layer is removed from a map.
        //   Unregister a click listener, then do all the upstream WMS things
        L.TileLayer.WMS.prototype.onRemove.call(this, map);
        map.off("click", this.getFeatureInfo, this);
      },

      getFeatureInfo: function (evt) {
        // Make an AJAX request to the server and hope for the best
        var url = this.getFeatureInfoUrl(evt.latlng);
        //console.log(url);               
        $.ajax({
          url: url,
          success: function (data, status, xhr) {
            var err = typeof data === "string" ? null : data;
            //console.log(data);
       		var location =  data.features[0].properties.surbub
       		var ph = 		data.features[0].properties.ph
       		var cl = 		data.features[0].properties.cl
       		var Xn = 		data.features[0].geometry.coordinates["0"]
       		var Yn = 		data.features[0].geometry.coordinates["1"]
       		//console.log(ph+","+cl+","+location)
       		var popup = L.popup({closeOnClick:true, autoClose:true})
 					.setLatLng([Yn,Xn])
 					.setContent("pH : "+ph+"<br>Cl : "+cl+"<br> location : "+location)
					.openOn(map);	
          },
          error: function (xhr, status, error) {
            
          }
        });
             
      },

      getFeatureInfoUrl: function (latlng) {
          // Construct a GetFeatureInfo request URL given a point
      
          var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom());
          var size = this._map.getSize();
          var params = {
                        request: "GetFeatureInfo",
                        service: "WMS",
                        srs: "EPSG:4326",
                        styles: this.wmsParams.styles,
                        transparent: this.wmsParams.transparent,
                        version: this.wmsParams.version,
                        format: this.wmsParams.format,
                        bbox: this._map.getBounds().toBBoxString(),
                        height: size.y,
                        width: size.x,
                        layers: this.wmsParams.layers,
                        query_layers: this.wmsParams.layers,
                        info_format: "application/json",
                      };

          params[params.version === "1.3.0" ? "i" : "x"] = point.x;
          params[params.version === "1.3.0" ? "j" : "y"] = point.y;

          var url = this._url + L.Util.getParamString(params, this._url, true);
          return url;
        },
      });
    L.tileLayer.betterWms = function (url, options) {
        return new L.TileLayer.BetterWMS(url, options);
      };
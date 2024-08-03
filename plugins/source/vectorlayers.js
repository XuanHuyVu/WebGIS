// gsitiles.js
// (C) 2015 Minoru Akagi | MIT License
// https://github.com/minorua/WebGISLab
// Dependencies: jQuery, OpenLayers 3

(function () {
  var plugin = {
    name: 'VectorLayer',
    path: 'source/vectorlayers.js',
    type: 'source',
    description: 'Adds olapp.source.GSITiles'
  };
  // GSI Tiles
  // http://maps.gsi.go.jp/development/
  var layers = [
    {
      id: 'vn',
      title: 'Viet Nam',
      format: 'png',
      zmin: 2,
      zmax: 18,
    },
  ];

  var attr = "<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>";

  /* olapp.source.GSITiles */
    olapp.source.VectorLayer = new olapp.Source('Vector Layer', layers);
    olapp.source.VectorLayer.createLayer = function (id, layerOptions) {
        var vectorSource = new ol.source.Vector({});

        var iconFeature1 = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([103.976, 22.486], 'EPSG:4326', 'EPSG:3857'))
        });
        iconFeature1.setProperties({ 'name': 'Lao cai', 'description': 'Lao cai' })
        var iconFeature2 = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([104.902, 21.6988], 'EPSG:4326', 'EPSG:3857'))
        });
        iconFeature2.setProperties({ 'name': 'Yen bai', 'description': 'Yen bai' })
        var iconFeature3 = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([105.475, 21.1716], 'EPSG:4326', 'EPSG:3857'))
        });
        iconFeature3.setProperties({ 'name': 'Son tay', 'description': 'Son tay' })
        var iconFeature4 = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([105.901663, 20.993734], 'EPSG:4326', 'EPSG:3857'))
        });
        iconFeature4.setProperties({ 'name': 'Ha noi', 'description': 'Ha noi' })

        var Reservoir = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([103.286802, 23.047367], 'EPSG:4326', 'EPSG:3857'))
        });
        Reservoir.setProperties({ 'name': 'Madusan', 'description': 'Madusan Reservoir' })
        const iconStyleStation = new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.0, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                src: 'placeholder.png',
                scale: 0.05
            }),
        });
        const iconStyleReservoir = new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.0, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                src: 'lake.png',
                scale: 0.05
            }),
        });
        iconFeature1.setStyle(iconStyleStation);
        iconFeature2.setStyle(iconStyleStation);
        iconFeature3.setStyle(iconStyleStation);
        iconFeature4.setStyle(iconStyleStation);
        Reservoir.setStyle(iconStyleReservoir);

        vectorSource.addFeatures([iconFeature1, iconFeature2, iconFeature3, iconFeature4, Reservoir]);
        options = {
            source: vectorSource,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({ color: 'red' })
                })
            }),
            title: 'Station and Reservoir'
        }

        return new ol.layer.Vector($.extend(options, layerOptions));
        
    };
    select = new ol.interaction.Select({
        condition: ol.events.condition.click,
        //style: selectStyle,
    });
    olapp.map.addInteraction(select);
    
    select.on('select', function (e) {
        //alert();
        console.log(e.target.getFeatures());
        console.log(e.target.getFeatures().array_[0].get("name"));
        const coordinate = e.target.getFeatures().array_[0].getGeometry().getCoordinates();
        console.log(coordinate);
        const hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));
        const content = document.getElementById('popup-content');
        const container = document.getElementById('popup');
        const closer = document.getElementById('popup-closer');
        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };
        const overlay = new ol.Overlay({
            element: container,
            autoPan: {
                animation: {
                    duration: 250,
                },
            },
        });
        olapp.map.addOverlay(overlay);
        content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
        if (e.target.getFeatures().array_[0].get("name") == 'Son tay') {
            content.innerHTML = '<iframe src="sontay.html" height="500" width="800" title="Iframe Son tay"></iframe>';
        }
        
        overlay.setPosition(coordinate);

    });
  // register this source
    olapp.source.register('Vector Map', 'VectorLayer', olapp.source.VectorLayer);

  // register this plugin
  olapp.plugin.register(plugin.path, plugin);
})();

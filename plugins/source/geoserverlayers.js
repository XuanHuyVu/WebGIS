// gsitiles.js
// (C) 2015 Minoru Akagi | MIT License
// https://github.com/minorua/WebGISLab
// Dependencies: jQuery, OpenLayers 3

(function () {
  var plugin = {
    name: 'GeoserverLayer',
    path: 'source/geoserverlayers.js',
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
    }, {
        id: 'red_basin',
        title: 'Viet Nam',
        format: 'png',
        zmin: 2,
        zmax: 18,
    }, {
          id: 'mekong_basin',
          title: 'Viet ',
          format: 'png',
          zmin: 2,
          zmax: 18,
    },
    {
        id: 'mekong_red_rivers',
        title: 'River',
        format: 'png',
        zmin: 2,
        zmax: 18,
    }
  ];

  var attr = "<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>";

  /* olapp.source.GSITiles */
  olapp.source.GeoserverLayer = new olapp.Source('Geoserver Layer', layers);
    olapp.source.GeoserverLayer.createLayer = function (id, layerOptions) {
      source1 = {
          source: new ol.source.TileWMS({
              url: 'http://localhost:8080/geoserver/streamflow/wms',
              params: {
                  'FORMAT': 'image/png',
                  'VERSION': '1.1.1',
                  tiled: true,
                  "LAYERS": 'streamflow:vnm_admbnda_adm1_gov_20201027',
                  "exceptions": 'application/vnd.ogc.se_inimage',
                  tilesOrigin: 102.1440200805664 + "," + 7.180931091308594
              }
          }),
          title: 'Vietnam'
      };
        source2 = {
            source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/streamflow/wms',
                params: {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    tiled: true,
                    "LAYERS": 'streamflow:red_basin1-polygon',
                    "exceptions": 'application/vnd.ogc.se_inimage',
                    tilesOrigin: 11142516.073837625 + "," + 2271551.906264224
                }
            }),
            title: 'Vietnam'
        };
        source3 = {
            source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/streamflow/wms',
                params: {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    tiled: true,
                    "LAYERS": 'streamflow:mekong_basin1-polygon',
                    "exceptions": 'application/vnd.ogc.se_inimage',
                    tilesOrigin: 10448742.181009738 + "," + 1067410.3638976577
                }
            }),
            title: 'Vietnam'
        };
        source4 = {
            source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/streamflow/wms',
                params: {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    tiled: true,
                    "LAYERS": 'streamflow:mekong_red_rivers1-line',
                    "exceptions": 'application/vnd.ogc.se_inimage',
                    tilesOrigin: 10473382.08172762 + "," + 1119454.0979909303
                }
            }),
            title: 'Vietnam'
        };
        options = {
            layers: [new ol.layer.Tile(source1), new ol.layer.Tile(source2), new ol.layer.Tile(source3), new ol.layer.Tile(source4)],
            title: "Vietnam"
        };
        return new ol.layer.Group($.extend(options, layerOptions));
  };

  // register this source
    olapp.source.register('Tiled Map', 'GeoserverLayer', olapp.source.GeoserverLayer);

  // register this plugin
  olapp.plugin.register(plugin.path, plugin);
})();

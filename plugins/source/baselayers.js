// gsitiles.js
// (C) 2015 Minoru Akagi | MIT License
// https://github.com/minorua/WebGISLab
// Dependencies: jQuery, OpenLayers 3

(function () {
  var plugin = {
    name: 'BaseLayer',
    path: 'source/baselayers.js',
    type: 'source',
    description: 'Adds olapp.source.GSITiles'
  };
  // GSI Tiles
  // http://maps.gsi.go.jp/development/
  var layers = [
    {
      id: 'osm',
      title: 'Openstreetmap',
      format: 'png',
      zmin: 2,
      zmax: 18,
      zminJp: 9
    }
  ];

  var attr = "<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>";

  /* olapp.source.GSITiles */
  olapp.source.BaseLayer = new olapp.Source('Base Layer', layers);
  olapp.source.BaseLayer.createLayer = function (id, layerOptions) {
      options = {
          source: new ol.source.OSM(),
          title: 'Open Street Map'
      };
      return new ol.layer.Tile($.extend(options, layerOptions));
    /*var lyr = this.getLayerById(id);
    if (!lyr) return null;

    var url = 'http://cyberjapandata.gsi.go.jp/xyz/' + id + '/{z}/{x}/{y}.' + lyr.format,
        destProj = olapp.project.view.getProjection(),
        extentJp = ol.proj.transformExtent([122.7, 20.4, 154.8, 45.6], 'EPSG:4326', destProj);

    // source options
    var options = {
      attributions: [olapp.core.getAttribution(attr)],
      crossOrigin: 'anonymous',
      projection: 'EPSG:3857',
      tileGrid: ol.tilegrid.createXYZ({
        minZoom: lyr.zmin,
        maxZoom: lyr.zmax
      }),
      url: url
    };

    var source = new ol.source.XYZ(options);

    // layer options

    // "std" and "ort" maps have world wide tiles in small zoom levels.
    if (lyr.zminJp !== undefined) {
      // options for worldwide map
      var options1 = {
        source: source,
        minResolution: olapp.tools.projection.resolutionFromZoomLevel(lyr.zminJp - 0.1)
      };
      // options for Japanese map
      var options2 = {
        extent: extentJp,
        source: source,
        maxResolution: olapp.tools.projection.resolutionFromZoomLevel(lyr.zminJp - 0.1)
      };

      // Create two layers and a layer group that binds the layers
      options = {
        layers: [new ol.layer.Tile(options1), new ol.layer.Tile(options2)],
        title: lyr.title
      };
      return new ol.layer.Group($.extend(options, layerOptions));
    }
    else {
      // Create a layer
      options = {
        extent: extentJp,
        maxResolution: olapp.tools.projection.resolutionFromZoomLevel(lyr.zmin - 0.1),
        source: source,
        title: lyr.title
      };
      return new ol.layer.Tile($.extend(options, layerOptions));
    }*/
  };

  // register this source
    olapp.source.register('Tiled Map', 'BaseLayer', olapp.source.GSITiles);

  // register this plugin
  olapp.plugin.register(plugin.path, plugin);
})();

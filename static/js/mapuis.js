
function localizar(position){

    wells = layerWFS.getSource().getFeatures();

    if (lastFeatureSearch){
      lastFeatureSearch.setStyle( new ol.style.Style({
          image: new ol.style.Circle({
              radius: 12,
              fill: new ol.style.Fill({
                  color: '#1DB271'
                }), 
              stroke: new ol.style.Stroke({
                  color: '#3897c4'
              })
            })
          })
      );
    }

    lastFeatureSearch = wells[position];

    wells[position].setStyle( new ol.style.Style({
        image: new ol.style.Circle({
            radius: 12,
            fill: new ol.style.Fill({
              color: '#8be86f '
            }), 
            stroke: new ol.style.Stroke({
              color: 'black'
          })
        })
      })
    );

    map.getView().animate({
        center:wells[position].getGeometry().getCoordinates(),
        duration:500});

    if (lastFeature && lastFeature.get('uwi') != wells[position].get('uwi')){
        lastFeature.setStyle( new ol.style.Style({
          image: new ol.style.Circle({
              radius: 6,
              fill: new ol.style.Fill({
                color: '#fff '
              }), 
              stroke: new ol.style.Stroke({
                color: '#3897c4'
              })
            })
          })
        );
      }

  };


$(document).ready(function () {

  data = []

  $("#tabla_resultados").jsGrid({

      height: "350px",
      width: "350px",

      sorting: true,
      paging: true,
      autoload: true,        
      pageSize: 10,

      data: data,

      fields: [
      { name:"uwi", type:"text", title:"UWI", width: 80, align: "center"},
      { name:"well_name", type:"text", title:"Nombre", width: 100, align: "center"},
      { name: "value",title: "Ver",width: 50,align: "center",
                          itemTemplate: function(value, item) {
                      var $link = $("<a>").attr("value",item.value ).text("ver").attr("class","btn-sm btn-success").attr("onClick","localizar("+item.value+")");
                      return $("<div>").append($link);
                  }
                    },
      ],

          
   });
});


var layerWFS = new ol.layer.Vector({
    source: new ol.source.Vector({
        loader: function (extent) {
            $.ajax('http://www.sc3.uis.edu.co/wfs', {
                type: 'GET',
                data: {
                    service: 'WFS',
                    version: '1.1.0',
                    request: 'GetFeature',
                    typename: 'Colombia:pozosanh',
                    srsname: 'EPSG:3857',
                    outputFormat: 'text/javascript',
                    bbox: extent.join(',') + ',EPSG:3857'
                },
                dataType: 'jsonp',
                jsonpCallback:'callback:loadFeatures',
                jsonp: 'format_options'
            })
        },
        strategy: ol.loadingstrategy.bbox,
        projection: 'EPSG:3857'        
    })
});

window.loadFeatures = function (response) {
    layerWFS.getSource().addFeatures(new ol.format.GeoJSON().readFeatures(response));
};

var layerEscamas = new ol.layer.Group({
                        title: 'Scale',
                        name: 'Scale',
                        layers: [
                            new ol.layer.Tile({
                                title: 'Strontianite',
                                visible: false,
                                name: 'Strontianite',
                                source: new ol.source.TileWMS({
                                    url: 'http://www.sc3.uis.edu.co/wms',
                                    params: {'LAYERS': 'Colombia:pozosestron'},
                                    serverType: 'geoserver'
                                })
                            }),
                            new ol.layer.Tile({
                                title: 'Siderite',                            
                                visible: false,
                                 name: 'Siderite',
                                source: new ol.source.TileWMS({
                                    url: 'http://www.sc3.uis.edu.co/wms',
                                   params: {'LAYERS': 'Colombia:pozosiderita'},
                                    serverType: 'geoserver'
                                })
                            }),
                            new ol.layer.Tile({
                                title: 'Calcite',                              
                                visible: false,
                                 name: 'Calcite',
                                source: new ol.source.TileWMS({
                                    url: 'http://www.sc3.uis.edu.co/wms',
                                    params: {'LAYERS': 'Colombia:pozoscalc'},
                                    serverType: 'geoserver'
                                })
                            })
                            ,
                            new ol.layer.Tile({
                                title: 'Barite',                            
                                name: 'Barite',
                                visible: false,
                                source: new ol.source.TileWMS({
                                    url: 'http://www.sc3.uis.edu.co/wms',
                                    params: {'LAYERS': 'Colombia:pozosanh'},
                                    serverType: 'geoserver'
                                })
                            })                          
                            
                        ]
                    });


var layersOver = new ol.layer.Group({
                        title: 'Overlays',
                        name: 'Overlays',
                        layers: [
                            new ol.layer.Tile({
                                title: 'Cuencas',
                                opacity: 0.5,
                                visible: false,
                                 name: 'Cuencas',
                                source: new ol.source.TileWMS({
                                    url: 'http://www.sc3.uis.edu.co/wms',
                                    params: {'LAYERS': 'Colombia:cuencasms'},
                                    serverType: 'geoserver'
                                })
                            })
                            ,
                            new ol.layer.Tile({
                                title: 'Campos',
                                visible: false,
                                opacity: 0.5,
                                name: 'Campos',
                                source: new ol.source.TileWMS({
                                    url: 'http://www.sc3.uis.edu.co/wms',
                                    params: {'LAYERS': 'Colombia:camposms' },
                                    serverType: 'geoserver'
                                })
                            })
                        ]
                    });

basemap = new ol.layer.Tile({
                                title: 'base',
                                type: 'base',
                                visible: false,
                                source: new ol.source.TileWMS({
                                  url: 'http://www.sc3.uis.edu.co/wms',
                                  params: {'FORMAT': 'image/png', 
                                           'VERSION': '1.1.1',
                                           tiled: true,
                                          // CRS: 'EPSG:4326',
                                        STYLES: '',
                                        LAYERS: 'Colombia:capabase',
                                  }
                                })
                              });

var layergroup = new ol.layer.Group({
                        title: 'Base maps',
                         name: 'Basemaps',
                        layers: [
                            new ol.layer.Tile({
                              title: 'Satellite',                      
                              type: 'base',
                              name: 'Satellite',                              
                              visible: true,
                              source: new  ol.source.OSM()
                            }),
                            new ol.layer.Tile({
                                title: 'Vegetal',
                                name: 'Vegetal',
                                type: 'base',
                                visible: false,
                                source: new ol.source.TileWMS({
                                  url: 'http://www.sc3.uis.edu.co/wms',
                                  params: {'FORMAT': 'image/png', 
                                           'VERSION': '1.1.1',
                                           tiled: true,
                                        //    CRS: 'EPSG:4326',
                                        STYLES: '',
                                        LAYERS: 'Colombia:capavegeta',
                                  }
                                })
                              }),
                            new ol.layer.Tile({
                                title: 'Rios&Camino',
                                name: 'RaC',
                                type: 'base',
                                visible: false,
                                source: new ol.source.TileWMS({
                                  url: 'http://www.sc3.uis.edu.co/wms',
                                  params: {'FORMAT': 'image/png', 
                                           'VERSION': '1.1.1',
                                           tiled: true,
                                       //    CRS: 'EPSG:4326',
                                        STYLES: '',
                                        LAYERS: 'Colombia:caminosrios',
                                  }
                                })
                              }),
                            new ol.layer.Tile({
                                title: 'base',
                                type: 'base',
                                visible: false,
                                source: new ol.source.TileWMS({
                                  url: 'http://www.sc3.uis.edu.co/wms',
                                  params: {'FORMAT': 'image/png', 
                                           'VERSION': '1.1.1',
                                           tiled: true,
                                      //     CRS: 'EPSG:4326',
                                        STYLES: '',
                                        LAYERS: 'Colombia:capabase',
                                  }
                                })
                              })
                        ]
                    });


var map = new ol.Map({
  controls: ol.control.defaults().extend([
          new ol.control.ScaleLine({
            units: 'metric'
          }),  new ol.control.OverviewMap()

        ]),
    target: 'map',
    layers: [

        layergroup,
        layerWFS,
        layerEscamas,
        layersOver
        
    ],
    view: new ol.View({
        center: [-8292281.51444346,684409.30384363],
        zoom: 7
    })
});

var sidebar = $('#sidebar').sidebar();

 var layerSwitcher = new ol.control.LayerSwitcher({
                tipLabel: 'Leyenda'
            });
            map.addControl(layerSwitcher);
            layerSwitcher.showPanel();

var highlight;
var lastFeature;

var displayFeatureInfo = function(pixel) {
  
  var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
          return feature;
  });

  if (feature) {
    
    if (lastFeature){
      lastFeature.setStyle( new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
              color: '#fff '
            }), 
            stroke: new ol.style.Stroke({
              color: '#3897c4'
            })
          })
        })
      );
    };

    if (lastFeatureSearch){
    lastFeatureSearch.setStyle( new ol.style.Style({
          image: new ol.style.Circle({
              radius: 12,
              fill: new ol.style.Fill({
                  color: '#fff'
                }), 
              stroke: new ol.style.Stroke({
                  color: '#3897c4'
              })
            })
          })
      );
    };

  lastFeature = feature;
  feature.setStyle( new ol.style.Style({
      image: new ol.style.Circle({
          radius: 10,
          fill: new ol.style.Fill({
            color: '#8be86f'
          }), 
          stroke: new ol.style.Stroke({
            color: 'black'
          })
        })
      })
    );
  };

  map.getView().animate({
      center:feature.getGeometry().getCoordinates(),
      duration:500});

var scaleData1 = {
      labels: ["Barite", "Calcite", "Siderite", "Strontianite", "Witherite"],
      datasets: [
        {
          label: "Scale",
          fill: true,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          data: [25.48,54.16,7.61,8.06,4.45]
        }
      ]
};

 var info = document.getElementById('info');
        if (feature) {
          info.innerHTML = '<p>'+feature.getId() + ': ' + feature.get('well_name') +'</p>   '
           + '<p> Geologic '+feature.get('geologic_p')+'</p>   '
           + '<table class="table-sm table-bordered" style="background-color: #BAD405">'
           + '<thead>'
           + '<tr>'
           +' <th>Scale</th>'
           + '<th>PPT</th>'
           + '</tr>'
           + '<thead>'
           + '<tbody>'
           + ' <td>Barite </td>' 
           + ' <td>'+ feature.get('barita_s')+' </td>'
           + '</tr>' 
           + '<tr>'
           + ' <td>Calcite </td>'   
           + ' <td>'+ feature.get('calcita_s')+' </td>'
           + '</tr>' 
           + '<tr>'
           + ' <td>Siderite </td>'   
           + ' <td>'+ feature.get('siderita_s')+' </td>'
           + '</tr>' 
           + '<tr>'
           + ' <td>Strontianite </td>'  
           + ' <td>'+ feature.get('estroncianita_s')+' </td>'
           + '</tr>' 
           + ' </tbody>'
           + '</table>'
           ;
        } else {
          info.innerHTML = '&nbsp;';
        }

        if (feature !== highlight) {
          if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
          }
          if (feature) {
            featureOverlay.getSource().addFeature(feature);
          }
          highlight = feature;
        }

      };


      map.on('click', function(evt) {
        displayFeatureInfo(evt.pixel);
      });

      var results = [];

      $("#buscar").click(function() {

        if(results && results.length > 0){
          for (x = 0; x < results.length; x++){
            results[x].setStyle( new ol.style.Style({
              image: new ol.style.Circle({
                  radius: 6,
                  fill: new ol.style.Fill({
                    color: '#fff '
                  }), 
                  stroke: new ol.style.Stroke({
                    color: 'black'
                  })
                })
              })
            );
          }
        }

        wells = layerWFS.getSource().getFeatures();
        var busqueda = $("#search").val().toLowerCase();

        results = []

        data = []

        if (busqueda != ''){
          for (x = 0; x < wells.length ; x++ ){
            if( wells[x].get('uwi').toLowerCase().includes(busqueda) || wells[x].get('well_name').toLowerCase().includes(busqueda) ){
              results.push(wells[x]);

              wells[x].setStyle( new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 12,
                    fill: new ol.style.Fill({
                      color: '#48DCB0 '
                    }), 
                    stroke: new ol.style.Stroke({
                      color: '#3897c4'
                    })
                  })
                })
              );

              data.push({"uwi":wells[x].get('uwi'),"well_name":wells[x].get('well_name'),"value":x})

            } //END IF

          if(data.length > 0){
            $("#tabla_resultados").jsGrid("option", "data", data);
          }

          }
        }  

      });


      $("#limpiar").click(function() {
        data = []
        $("#tabla_resultados").jsGrid("option", "data", data);

        for (x = 0; x < results.length; x++){
            results[x].setStyle( new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#fff '
                  }), 
                stroke: new ol.style.Stroke({
                  color: '#3897c4'
                })
              })
            })
          );
        }

        results = [];
        lastFeature = lastFeatureSearch;

        if (lastFeature){
            lastFeature.setStyle( new ol.style.Style({
              image: new ol.style.Circle({
                  radius: 10,
                  fill: new ol.style.Fill({
                    color: '#8be86f '
                  }), 
                  stroke: new ol.style.Stroke({
                    color: 'black'
                  })
                })
              })
            );
        }

        lastFeatureSearch = null;


      });

      var lastFeatureSearch




/*
      var dims = {
        a0: [1189, 841],
        a1: [841, 594],
        a2: [594, 420],
        a3: [420, 297],
        a4: [297, 210],
        a5: [210, 148]
      };

      var loading = 0;
      var loaded = 0;

      var exportButton = document.getElementById('export-pdf');

      exportButton.addEventListener('click', function() {

        exportButton.disabled = true;
        document.body.style.cursor = 'progress';

        var format = document.getElementById('format').value;
        var resolution = document.getElementById('resolution').value;
        var dim = dims[format];
        var width = Math.round(dim[0] * resolution / 25.4);
        var height = Math.round(dim[1] * resolution / 25.4);*/
     //  var size = /** @type {ol.Size} */ (map.getSize());
   /*     var extent = map.getView().calculateExtent(size);

        var source = map.getLayers().getSource();

        var tileLoadStart = function() {
          ++loading;
        };

        var tileLoadEnd = function() {
          ++loaded;
          if (loading === loaded) {
            var canvas = this;
            window.setTimeout(function() {
              loading = 0;
              loaded = 0;
              var data = canvas.toDataURL('image/png');
              var pdf = new jsPDF('landscape', undefined, format);
              pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
              pdf.save('map.pdf');
              source.un('tileloadstart', tileLoadStart);
              source.un('tileloadend', tileLoadEnd, canvas);
              source.un('tileloaderror', tileLoadEnd, canvas);
              map.setSize(size);
              map.getView().fit(extent, size);
              map.renderSync();
              exportButton.disabled = false;
              document.body.style.cursor = 'auto';
            }, 100);
          }
        };

        map.once('postcompose', function(event) {
          source.on('tileloadstart', tileLoadStart);
          source.on('tileloadend', tileLoadEnd, event.context.canvas);
          source.on('tileloaderror', tileLoadEnd, event.context.canvas);
        });

        map.setSize([width, height]);*/
      //  map.getView().fit(extent, /** @type {ol.Size} */ (map.getSize()));
  /*      map.renderSync();

      }, false);

*/

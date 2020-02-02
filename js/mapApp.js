/**
 * App for navigating a food market
 * Author: Gea Löwerdahl Jörnulf
 *
 * @requires jQuery
 * @version 0.0.1
 */
var MapApp = ( function() {
    // Properties
     
    var map = L.map('map');
        map.setView([57.707110723723254, 11.96684718132019], 17);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.comic',
            accessToken: 'pk.eyJ1IjoiZ2VhbGVhIiwiYSI6ImNrM2locmhhcjA3dmgzcXFscnhobWxzY3oifQ.vjlCBEpn5M0uY5LxM2UQ3w'
        }).addTo(map);
    
    var userPosistion = map.locate({
        setView: false,
    });   
    
    var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
    };
    
    /*Polygon-positioner för matstånden i GeoJson-format*/
    var restaurants = {
         "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
          
           "name": "Bears BBQ & Craft Beer",
          "description" : "Mustig, mysig mat med medföljande mikrobryggeri.",
          "imgSource":"logotypes/bears.png"
          
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              11.966273188591003,
              57.70724255610773
            ],
            [
              11.966262459754944,
              57.707179505896775
            ],
            [
              11.9663804769516,
              57.707179505896775
            ],
            [
              11.966401934623718,
              57.707231092441184
            ],
            [
              11.966273188591003,
              57.70724255610773
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
          "name": "Muxi Sushi",
          "description" : "Ditt livs bästa sushi, sashimi och misosoppa.",
          "imgSource":"logotypes/muxi-sushi.png"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              11.96662724018097,
              57.70727121525826
            ],
            [
              11.966707706451416,
              57.707228226523966
            ],
            [
              11.966793537139893,
              57.70727121525826
            ],
            [
              11.966696977615356,
              57.70729987438606
            ],
            [
              11.96662724018097,
              57.70727121525826
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
          "name": "Café Inc",
          "description" : "Kaffevagn med koll på allt i kaffeväg.",
          "imgSource":"logotypes/cafeinc.png"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              11.967244148254395,
              57.707285544825
            ],
            [
              11.967195868492126,
              57.70722536060655
            ],
            [
              11.967292428016663,
              57.707213896934554
            ],
            [
              11.96736216545105,
              57.70726261751547
            ],
            [
              11.967244148254395,
              57.707285544825
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
          "name": "Surströmmingen",
          "description" : "Traditionell norrländsk cuisine med aromatisk twist.",
          "imgSource":"logotypes/surstrommingen.png"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              11.967388987541199,
              57.70712218742791
            ],
            [
              11.96734607219696,
              57.70706200293795
            ],
            [
              11.967474818229674,
              57.707047673282744
            ],
            [
              11.967517733573912,
              57.70710212594237
            ],
            [
              11.967388987541199,
              57.70712218742791
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
          "name": "El Cerdo – Taqueria & Tocineta",
          "description" : "Smakexplosioner i fantastiska kombinationer med knorr",
          "imgSource":"logotypes/el-cerdo.png"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              11.96687400341034,
              57.70697315898424
            ],
            [
              11.966820359230042,
              57.70692157207239
            ],
            [
              11.966916918754578,
              57.70690437641877
            ],
            [
              11.967002749443054,
              57.70694449959784
            ],
            [
              11.96687400341034,
              57.70697315898424
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
          "name": "Veghana",
          "description" : "Kryddigt veganskt krubb utan krusiduller.",
          "imgSource":"logotypes/veghana.png"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              11.9663804769516,
              57.7070390754869
            ],
            [
              11.9663268327713,
              57.70697889085879
            ],
            [
              11.966423392295837,
              57.70695596335512
            ],
            [
              11.966525316238403,
              57.70702474582263
            ],
            [
              11.9663804769516,
              57.7070390754869
            ]
          ]
        ]
      }
    }
  ]
        
    };
    
   
  


    // Methods
    function init() {
        
        var myLayer = L.geoJSON(restaurants, {style: myStyle, onEachFeature: onEachFeature}).addTo(map);
        
        map.on('locationfound', positionFound);
        map.on('locationerror', positionNotFound);   
               
   }   
  
    function positionNotFound(e) {
        alert(e.message);
    }
    
    function positionFound(e){        
      
        var myPositionIcon = L.icon({
        iconUrl: 'img/userPosition.png',
        iconSize: [32, 32]
        });
        
        var myPosition = L.marker(e.latlng, {
        icon: myPositionIcon}).addTo(map);       
       
    }   
  
    
    function onEachFeature(feature, layer) {  
        
        let userLatLng = L.latLng(userPosistion._lastCenter.lat, userPosistion._lastCenter.lng);

    if (feature.properties) {
        let restLatLng = L.latLng(feature.geometry.coordinates[0]["0"][1], feature.geometry.coordinates[0]["0"][0]);    
        let distance = map.distance(userLatLng, restLatLng);
        
        layer.bindPopup('<img src="'+feature.properties.imgSource+'" alt="Smiley face"/></br>'+'<h2>'+feature.properties.name+'</h2>'+feature.properties.description+'<p>Meter: '+Math.round(distance)+'</p>');
     }
    
    }

    return {
        init : init
    };
  
} )();


MapApp.init(); // Run application
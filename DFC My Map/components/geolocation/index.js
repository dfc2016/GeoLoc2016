'use strict';

app.geolocation = kendo.observable({
    onShow: function () {},
    afterShow: function () {}
});

// START_CUSTOM_CODE_geolocation
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
function onSuccess__OLD__(position) {
    console.log("DFC >>> Renderizar el Mapa...[LOCALIZACION]");
    console.log("DFC >>> Coordinadas iniciales: ");
    console.log("DFC >>> [LAT]: "+position.coords.latitude);
    console.log("DFC >>> [LNG]: "+position.coords.longitude);

    $("#miPosicion").kendoMap({
        center: [position.coords.latitude, position.coords.longitude],
        zoom: 14,
        layers: [{
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
        }],
        markers: [
            {
            location: [position.coords.latitude, position.coords.longitude],
            shape: "pinTarget",
            tooltip: { content: "Mi posicion" }
            },
            {
            location: [position.coords.latitude + 0.005, position.coords.longitude + 0.005],
            shape: "pin",
            tooltip: { content: "Posicion A" }
            },
        ]
    });
};

/*
* On Success function for mapping 2 layers
* a) Layer for positions of interesting sites
* b) Layer for position of location's device
*/

function onSuccess(position) {
    console.log("DFC >>> Renderizar el Mapa...[LOCALIZACION]");
    console.log("DFC >>> Coordinadas iniciales: ");
    console.log("DFC >>> [LAT]: "+position.coords.latitude);
    console.log("DFC >>> [LNG]: "+position.coords.longitude);

    $("#miPosicion").kendoMap({
        center: [position.coords.latitude, position.coords.longitude],
        zoom: 14,
        layers: [
        {
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
        },
        {
            //Layer for positions of interesting sites
            type: "marker",
            dataSource: ds,
            locationField: "latlng",
            titleField: "name",
            shape: "pin",
        },
        {
            //Layer for position of location's device
            type: "marker",
            dataSource: dsTarget,
            locationField: "latlng",
            titleField: "name",
            shape: "pinTarget",
        },

        ],
    });
    
    var ds = new kendo.data.DataSource({
        data:  [
            {
            latlng: [position.coords.latitude + 0.005, position.coords.longitude + 0.005],
            name: "Posicion A" 
            },
            {
            latlng: [position.coords.latitude + 0.005, position.coords.longitude - 0.005],
            name: "Posicion A" 
            },
        ]
    });
    
    var map = $("#miPosicion").data("kendoMap");
    var layer = map.layers[1];
    layer.setDataSource(ds);

    var dsTarget = new kendo.data.DataSource({
        data:  [
            {
            latlng: [position.coords.latitude, position.coords.longitude],
            name: "Mi posicion" 
            },
        ]
    });

    var layerTarget = map.layers[2];
    layerTarget.setDataSource(dsTarget);
    
    console.log("DFC >>> Mapping pin and pinTarget");
};



// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

function testLocalizacion() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function posAlmacenesDespachador() {
	console.log("DFC >>> Renderizar el Mapa con... [POS. ALMACENES] y [DESPACHADORES]");
    // 14/-12.0554/-77.0451 CALLAO
    $("#miPosicion").kendoMap({
        center: [-12.0554,-77.0451],
        zoom: 14,
        layers: [
            {
                type: "tile",
                urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"],
            },
            {
                //Layer for positions of interesting sites
                type: "marker",
                dataSource: {
                    transport: {
                            read: {
                                url: "http://54.213.238.161/geodata/sitios-de-interes-Callao.json",
                                dataType: "json"
                            }                
                    }
                },
                locationField: "latlng",
                titleField: "name",
                shape: "pin",
            },
            {
                //Layer for position of visited sites
                type: "marker",
                dataSource: {
                    transport: {
                            read: {
                                url: "http://54.213.238.161/geodata/sitios-visitados-Callao.json",
                                dataType: "json"
                            }                
                    }
                },
                locationField: "latlng",
                titleField: "name",
                shape: "pinTarget",
            },
        ],
    });            
}

function testLocDespachadorAlmacenes() {
    console.log("DFC >>> testLocDespachadorAlmacenes >>> Capturar posicion... [DESPACHADOR]");
    navigator.geolocation.getCurrentPosition(onSuccessDespAlm, onErrorDespAlm);
}

/*
* FX  onSuccessDespAlm(...) the 2nd load remote
* positions.
* On Success function for mapping 2 layers
* a) Layer for positions of interesting sites
* b) Layer for position of location's device
*/

function onSuccessDespAlm(position) {
    console.log("DFC >>> onSuccessDespAlm >>> Renderizar el Mapa...[DESPACHADOR] y [POS. ALMACENES REMOTA]");
    console.log("DFC >>> Coordinadas iniciales: ");
    console.log("DFC >>> [LAT]: "+position.coords.latitude);
    console.log("DFC >>> [LNG]: "+position.coords.longitude);

    $("#miPosicion").kendoMap({
        center: [position.coords.latitude, position.coords.longitude],
        zoom: 12,
        layers: [
        {
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
        },
        {
            //Layer for positions of interesting sites
            type: "marker",
            dataSource: {
                transport: {
                        read: {
                            // http://54.213.238.161/geodata/bancosbcp.json
                            // http://54.213.238.161/geodata/sitios-de-interes-Callao.json
                            url: "http://54.213.238.161/geodata/bancosbcp.json",
                            dataType: "json"
                        }
            	}
            },
            locationField: "latlng",
            titleField: "name",
            shape: "pin",
        },
        {
            //Layer for position of location's device
            type: "marker",
            dataSource: dsTarget,
            locationField: "latlng",
            titleField: "name",
            shape: "pinTarget",
        },

        ],
    });
  
    var map = $("#miPosicion").data("kendoMap");

    var dsTarget = new kendo.data.DataSource({
        data:  [
            {
            latlng: [position.coords.latitude, position.coords.longitude],
            name: "Mi posicion" 
            },
        ]
    });

    var layerTarget = map.layers[2];
    layerTarget.setDataSource(dsTarget);
    
    console.log("DFC >>> Mapping pin and pinTarget");
};

// onError Callback receives a PositionError object
//
function onErrorDespAlm(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// END_CUSTOM_CODE_geolocation
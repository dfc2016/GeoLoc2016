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


function onSuccess(position) {
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
        },
        {
            type: "marker",
            dataSource: ds,
            locationField: "latlng",
            titleField: "name",
            shape: "pin",
        },
        {
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
            // {
            // latlng: [position.coords.latitude, position.coords.longitude],
            // //shape: "pinTarget",
            // name: { content: "Mi posicion" }
            // },
            {
            latlng: [position.coords.latitude + 0.005, position.coords.longitude + 0.005],
            //shape: "pin",
            name: { content: "Posicion A" }
            },
            {
            latlng: [position.coords.latitude + 0.005, position.coords.longitude - 0.005],
            //shape: "pin",
            name: { content: "Posicion A" }
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
            //shape: "pinTarget",
            name: { content: "Mi posicion" }
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

// END_CUSTOM_CODE_geolocation
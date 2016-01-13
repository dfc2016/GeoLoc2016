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
function onSuccess(position) {
    console.log("DFC >>> Renderizar el Mapa...[LOCALIZACION]");

    $("#miPosicion").kendoMap({
        center: [position.coords.latitude, position.coords.longitude],
        zoom: 14,
        layers: [{
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
        }],
        markers: [{
            location: [position.coords.latitude, position.coords.longitude],
            shape: "pinTarget",
            tooltip: {
                content: "Mi posicion"
            }
        }]
    });
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
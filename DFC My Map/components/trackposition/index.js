'use strict';

app.trackposition = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_trackposition
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

var watchID = null;

function onSuccessSeguimientoPOS(position) {
    var strHtml = "<div>";
    strHtml += "Lat: " + position.coords.latitude;
    strHtml += " Lng: " + position.coords.longitude;
    strHtml += "</div>";
    $("#geoLocPosiciones").append(strHtml);
}

// onError Callback receives a PositionError object
//
function onErrorSeguimientoPOS(error) {
    if (error.code == "3" ){
        $("#errorLocPosiciones").html("Por favor activar la funcion GPS");        
    }    
}

function startSeguimientoPOS(){
    watchID = navigator.geolocation.watchPosition(
        onSuccessSeguimientoPOS, 
        onErrorSeguimientoPOS, 
        { timeout: 5000 }, 
        { enableHighAccuracy: true }
    );
    $("#startSegPos").prop( "disabled", true )
    $("#stopSegPos").prop( "disabled", false );
    $("#clearSegPos").prop( "disabled", true );
    $("#errorLocPosiciones").html("");
}
function stopSeguimientoPOS(){
    console.log("DFC >>> watchID: "+watchID.toString());
    navigator.geolocation.clearWatch(watchID);
    $("#startSegPos").prop( "disabled", false )
    $("#stopSegPos").prop( "disabled", true );
    $("#clearSegPos").prop( "disabled", false );
    $("#errorLocPosiciones").html("");
}

function clearSeguimientoPOS(){
    $("#geoLocPosiciones").html("");
    $("#errorLocPosiciones").html("");
    $("#startSegPos").prop( "disabled", false )
    $("#stopSegPos").prop( "disabled", true );
    $("#clearSegPos").prop( "disabled", true );
}
// END_CUSTOM_CODE_trackposition
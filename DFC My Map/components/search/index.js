'use strict';

app.search = kendo.observable({
    onShow: function() {
        $("#miLatLan").kendoMap({
            center: [-12.1000, -77.0282],
            zoom: 12,
            layers: [{
                type: "tile",
                urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"],
                    }],
            markers: [{
                location: [-12.0432, -77.0282],
                shape: "pinTarget",
                tooltip: {
                    content: "Lima"
                }
            }],
            click: onClick,
        });
    },
    afterShow: function() {}
});

// START_CUSTOM_CODE_search
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function onClick(e)
{
    console.log("DFC >> LAT: "+kendo.toString(e.location.lat,"n6"));
    console.log("DFC >> LNG: "+kendo.toString(e.location.lng,"n6"));
    $("#LatValue").html(kendo.toString(e.location.lat,"n6"));
    $("#LgnValue").html(kendo.toString(e.location.lng,"n6"));
}
// END_CUSTOM_CODE_search
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
function captarLatLgn()
{
    console.log("DFC >>> Captar Lat y Lng...");    
}

function onClick(e)
{
    console.log("DFC >>> "+kendo.format("Click at :: {0}", e.location.toString())); 
}
// END_CUSTOM_CODE_search
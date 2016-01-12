'use strict';

app.home = kendo.observable({
    onShow: function () {
        $("#map").kendoMap({
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
                    }]
        });
    },
    afterShow: function() {}
});

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

function goToMiraflores() {
    var map = $("#map").data("kendoMap");
    map.center([-12.1206214, -77.0294993]).zoom(16);
    $("#ubiMi").data("kendoMobileButton").enable(true);
    $("#ubiBa").data("kendoMobileButton").enable(false);
}

function goToBarranco() {
    var map = $("#map").data("kendoMap");
    map.center([-12.1419529, -77.0215224]).zoom(16);
    $("#ubiMi").data("kendoMobileButton").enable(false);
    $("#ubiBa").data("kendoMobileButton").enable(true);
}

function goToChorrillos() {
    var map = $("#map").data("kendoMap");
    map.center([-12.1760526, -77.014191]).zoom(16);
    $("#ubiMi").data("kendoMobileButton").enable(false);
    $("#ubiBa").data("kendoMobileButton").enable(false);
}

function showUbiMiraflores() {
    $("#map").kendoMap({
        center: [-12.12065, -77.02952],
        zoom: 15,
        layers: [{
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
        }, {
            type: "marker",
            dataSource: {
                transport: {
                    read: {
                        url: "http://54.213.238.161/geodata/miraflores-locations.json",
                        dataType: "json"
                    }
                }
            },
            locationField: "latlng",
            titleField: "name"
        }]
    });
}

function showUbiBarranco() {
    console.log(">> showUbiBarranco");
    $("#map").kendoMap({
        center: [-12.1597, -77.0136], //-12.1597,-77.0136
        zoom: 13,
        layers: [{
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
        }, {
            type: "marker",
            dataSource: ds,
            locationField: "latlng",
            titleField: "name"
        }]
    });

    var ds = new kendo.data.DataSource({
        data: [{
            latlng: [-12.1419529, -77.0215224],
            name: "Posición A"
        }, {
            latlng: [-12.14351, -77.01586],
            name: "Posición B"
        }, ]
    });

    var map = $("#map").data("kendoMap");
    var layer = map.layers[1];
    layer.setDataSource(ds);
}

// END_CUSTOM_CODE_home
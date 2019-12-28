$(document).ready(function() {
    initialize();
});

var currenttab = null;

var departure = Date.parse('December 28 2019 16:00:00 GMT-0400');
var timer = null;

function update() {
    var now = Date.parse(new Date());
    var t = departure - now;
    if(t > 0) {
        $("#label").text("Crooz countdown:");
    }
    else {
        $("#label").text("Crooz time:");
        t = - t;
    }
    $("#days").text(Math.floor( t/(1000*60*60*24)));
    $("#hours").text(Math.floor( (t/(1000*60*60)) % 24));
    $("#minutes").text(Math.floor( (t/1000/60) % 60));
    $("#seconds").text(Math.floor( (t/1000) % 60));
}

var map1 = null;
var map2 = null;

function showtab(tabname) {
    if(currenttab == tabname) return;
    if(currenttab != null) {
        $('#' + currenttab).toggle(false);
    }
    $('#' + tabname).toggle(true);
    currenttab = tabname;
    if((currenttab == "Map") && (map1 == null)) {
        map1 = $('<iframe name="map1" id="map1" width="100%" height="800" frameborder="0" src="https://www.vesselfinder.com/aismap?zoom=6&amp;lat=21.8&amp;lon=-84.5&amp;width=100%&amp;height=800&amp;names=false&amp;track=false&amp;fleet=false&amp;fleet_name=false&amp;fleet_hide_old_positions=false&amp;clicktoact=false&amp;store_pos=true&amp;ra=testingonly">Browser does not support embedded objects.<br/>Visit directly <a href="https://www.vesselfinder.com" target="_blank">www.vesselfinder.com</a></iframe>');
        $("#Map").append(map1);
    }
    if((currenttab == "Location") && (map2 == null)) {
        map2 = $('<iframe name="map2" id="map2" width="100%" height="800" frameborder="0" src="https://www.vesselfinder.com/aismap?zoom=8&amp;lat=undefined&amp;lon=undefined&amp;width=100%&amp;height=800&amp;names=false&amp;imo=9116864&amp;track=true&amp;fleet=false&amp;fleet_name=false&amp;fleet_hide_old_positions=false&amp;clicktoact=false&amp;store_pos=true&amp;ra=testingonly">Browser does not support embedded objects.<br/>Visit directly <a href="https://www.vesselfinder.com" target="_blank">www.vesselfinder.com</a></iframe>');
        $("#Location").append(map2);
    }
}

function initialize() {
    var first = null;
    $(".content-tab").each(function(i) {
        var name = $(this).attr("id");
        console.log(i, name);
        if(i == 0) first = name;
        var node1 = $('<a class="mdl-navigation__link tablink"></a>');
        node1.append(name);
        node1.click(function() {
            showtab(name);
        });
        node2 = node1.clone(true);
        $("#nav1").append(node1);
        $("#nav2").append(node2);
    });
    showtab(first);
    timer = setInterval(update, 1000);
}

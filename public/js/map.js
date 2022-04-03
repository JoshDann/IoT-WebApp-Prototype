mapboxgl.accessToken = 'pk.eyJ1IjoiamRhbm4xIiwiYSI6ImNsMGw5cmRzeDBmOWEzanBla3o1Y2VnY3kifQ.jDe3VBEwQVEZBXlfWWjl_g';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jdann1/cl0v7nlgv000h15t46mhhpw2n',
    center: [0, 0],
    zoom: 1
});

// need this for the searchbox (removed marker stuff that isnt needed)
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    flyTo: true,
    autoComplete: true,
    fuzzyMatch: true,
    marker: false
});

map.addControl(geocoder);



/**
 * Fired on page load; gets all points
 */
map.on('load', () => {
    // adds the circles and styles them
    getReadings()
});

/**
 * Get and add all points for readings that match form criteria (for now, just all data)
 */
$('#form_button_submit').click(function (ev) {
    // let formData = $('#form_map').serializeArray()
    // let queryString = "index.js/data?";
    getReadings()
})


/**
 * Add params later on
 */
function getReadings() {
    let urlQuery = "?data-selected=" + document.getElementById("data_select").options[document.getElementById("data_select").selectedIndex].value

    let source = map.getSource('nodes_source');
    if (source != undefined) {
        map.removeLayer('nodes_layer');
        map.removeSource('nodes_source');
    }

    $.ajax({
        url: "/data" + urlQuery,
        dataType: "json",
        type: "GET",
        success: function (nodes) {
            nodes = JSON.parse(nodes);
            //console.table(nodes)
            console.log(nodes);


            map.addSource('nodes_source', {
                type: 'geojson',
                data: nodes
            })
            // adds the circles and styles them
            map.addLayer({
                id: 'nodes_layer',
                type: 'circle',
                source: 'nodes_source',
                paint: {
                    'circle-opacity': 0.5,
                    'circle-radius': [
                        //increases circle size as zoom in
                        //first number is zoom level, 0=zoomed out 22=max zoom in
                        //second number is pixel size of the circles
                        'interpolate', ['linear'],
                        ['zoom'],
                        5, 5,
                        10, 8,
                        15, 15,
                        20, 40
                    ],
                    'circle-color': {
                        'property': 'reading',
                        'stops': [
                            [0, 'green'],
                            [50, 'orange'],
                            [100, 'red']
                        ]
                    }
                }
            })
        }
    })
}

/*
*   Adds pop up to each circle stating the actual value of the node reading
*/
map.on('click', 'nodes_layer', (nodes) => {

    const coords = nodes.features[0].geometry.coordinates.slice();
    const reading_title = $('#data_select').find(":selected").text();
    const reading_value = nodes.features[0].properties.reading;
    let reading_type = "";

    if (reading_value != undefined) {
         reading_type = "<p>" + reading_value + "</p>";
    }
    else{
        reading_type = "No data available";
    }

    console.log(coords);
    console.log(reading_type);

    new mapboxgl.Popup()
        .setLngLat(coords)
        .setHTML(reading_type)
        .addTo(map);

});

map.on('mouseenter', 'nodes_layer', () => {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'nodes_layer', () => {
    map.getCanvas().style.cursor = '';
});




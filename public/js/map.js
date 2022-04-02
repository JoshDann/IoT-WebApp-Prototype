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

    $.ajax({
        url: "/data" + urlQuery,
        dataType: "json",
        type: "GET",
        success: function (nodes) {
            console.table(nodes)

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
                        5, 200,
                        10, 800,
                        15, 1500,
                        20, 4000
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

// map.addSource('node-locations-source', {
//     type: 'geojson',
//     data: data
// })

// adds the circles and styles them
//     map.addLayer({
//         id: 'node-locations-layer',
//         type: 'circle',
//         source: 'node-locations-source',
//         paint: {
//             'circle-opacity' : 0.5,
//             'circle-radius':
//                 [
//                     //increases circle size as zoom in
//                     //first number is zoom level, 0=zoomed out 22=max zoom in
//                     //second number is pixel size of the circles
//                     'interpolate', ['linear'], ['zoom'],
//                     5, 2,
//                     10, 8,
//                     15, 15,
//                     20, 40
//                 ],
//             'circle-color': {
//                 'property': 'reading',
//                 'stops': [
//                     [0, 'green'],
//                     [50, 'orange'],
//                     [100, 'red']                    
//                 ]
//             }
//         }
//     })
// })
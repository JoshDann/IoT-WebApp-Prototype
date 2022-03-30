mapboxgl.accessToken = 'pk.eyJ1IjoiamRhbm4xIiwiYSI6ImNsMGw5cmRzeDBmOWEzanBla3o1Y2VnY3kifQ.jDe3VBEwQVEZBXlfWWjl_g';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jdann1/cl0v7nlgv000h15t46mhhpw2n',
    center: [0, 0],
    zoom: 1
});

$('#form_map').submit(function (e) {
    e.preventDefault();
    let formdata = $('#form_map').serializeArray();
    let queryString = "index.js/data?";


    //removes layer and source if search has already been made and displaying data on map
    //error occurs if not doing this
    let source = map.getSource('node-locations-source');
    if (source != undefined) {
        map.removeLayer('node-locations-layer');
        map.removeSource('node-locations-source');
    }


    $.get("/data", function (data) {

        map.addSource('node-locations-source', {
            type: 'geojson',
            data: data
        });

        //adds the circles and styles them
        map.addLayer({
            id: 'node-locations-layer',
            type: 'circle',
            source: 'node-locations-source',
            paint: {
                'circle-opacity' : 0.5,
                'circle-radius':
                    [
                        //increases circle size as zoom in
                        //first number is zoom level, 0=zoomed out 22=max zoom in
                        //second number is pixel size of the circles
                        'interpolate', ['linear'], ['zoom'],
                        5, 2,
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
    });
});

//adds search box to the map so users can find address
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    flyTo: true,
    autoComplete: true,
    fuzzyMatch: true,
});
map.addControl(geocoder);



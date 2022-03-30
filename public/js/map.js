mapboxgl.accessToken = 'pk.eyJ1IjoiamRhbm4xIiwiYSI6ImNsMGw5cmRzeDBmOWEzanBla3o1Y2VnY3kifQ.jDe3VBEwQVEZBXlfWWjl_g';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jdann1/cl0v7nlgv000h15t46mhhpw2n',
    center: [0, 0],
    zoom: 1
});

map.on('load', () => {
});

$('.form_button_submit').click(function () {
    let formdata = $('#form_map').serializeArray();
    //console.log(formdata);
});



$('#form_map').submit(function (e) {
    e.preventDefault();

    //removes layer and source if search has already been made and displaying data on map
    //error occurs if not doing this
    let source = map.getSource('node-locations-source');
    if (source != undefined) {
        map.removeLayer('node-locations-layer');
        map.removeSource('node-locations-source');
    }

    let formdata = $('#form_map').serializeArray();

    let queryString = "index.js/data?";

    $.get("/data", function (data) {

        map.addSource('node-locations-source', {
            type: 'geojson',
            data: data
        });

        map.addLayer({
            id: 'node-locations-layer',
            type: 'circle',
            source: 'node-locations-source',
            paint: {
                'circle-radius': {
                    'base': 1.75,
                    'stops': [
                        [0, 10],
                        [12, 5],
                        [20, 10]
                    ]
                }
            }
        })
    });
});

//Geocoder stuff, don't know if we need for the regular map page

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    flyTo: true,
    autoComplete: true,
    fuzzyMatch: true,
});

map.addControl(geocoder);



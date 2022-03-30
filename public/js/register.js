mapboxgl.accessToken = 'pk.eyJ1IjoiamRhbm4xIiwiYSI6ImNsMGw5cmRzeDBmOWEzanBla3o1Y2VnY3kifQ.jDe3VBEwQVEZBXlfWWjl_g';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jdann1/cl0v7nlgv000h15t46mhhpw2n',
    center: [0,0],
    zoom: 1
});

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    flyTo: true,
    autoComplete: true,
    fuzzyMatch: true,
    marker: false
});


//logic for adding marker when search is activated
//this way allows the coords to be stored rather than using default geocoder marker
// let lngLat = {lng: 0, lat: 0};
var marker = null
geocoder.on('result', search => {
    // only allow one marker at a time
    if ( marker ) { marker.remove() }

    marker = new mapboxgl.Marker({
        draggable: true,
    })
    marker.setLngLat( search.result.center );


    updateFormLocation(
        lat = marker.getLngLat().lat,
        lng = marker.getLngLat().lng
    )

    marker.on('dragend', function(ev) {
        updateFormLocation(
            lat = ev.target.getLngLat().lat,
            lng = ev.target.getLngLat().lng
        )
    })

    marker.addTo(map);
})

map.addControl(geocoder); 


function updateFormLocation( lat, lng ) {
    document.getElementById("location_lat").value = lat
    document.getElementById("location_lng").value = lng
}
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
let lngLat = {lng: 0, lat: 0};
geocoder.on('result', search => {
    const marker = new mapboxgl.Marker({
        draggable: true
    })

    let coords = search.result.center;
    marker.setLngLat(coords);
    lngLat.lng = coords[0];
    lngLat.lat = coords[1];
    console.log(lngLat);

    marker.addTo(map);
    marker.on('dragend', function(marker){
        lngLat = marker.target.getLngLat();
        console.log(lngLat);
    })
})

map.addControl(geocoder); 



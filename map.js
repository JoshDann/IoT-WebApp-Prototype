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

let lngLat = {lng: 0, lat: 0};

geocoder.on('result', search => {
    const marker = new mapboxgl.Marker({
        draggable: true
    })

    marker.setLngLat(search.result.center);
    lngLat.lng = search.result.center[0];
    lngLat.lat = search.result.center[1];
    console.log(lngLat);

    marker.addTo(map);
    marker.on('dragend', function(search){
        lngLat = search.target.getLngLat();
        console.log(lngLat);
    })
})

map.addControl(geocoder);



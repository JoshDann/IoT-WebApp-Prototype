mapboxgl.accessToken = 'pk.eyJ1IjoiamRhbm4xIiwiYSI6ImNsMGw5cmRzeDBmOWEzanBla3o1Y2VnY3kifQ.jDe3VBEwQVEZBXlfWWjl_g';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jdann1/cl0v7nlgv000h15t46mhhpw2n',
    center: [0,0],
    zoom: 1
});

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        flyTo: true,
        autoComplete: true,
        fuzzyMatch: true
    })
)

map.on('load', function(){

});


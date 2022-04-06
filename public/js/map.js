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
    //let formData = $('#form_map').serializeArray()
    //console.log(formData);
    // let queryString = "index.js/data?";
    getReadings()
    //getApiData();
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
    const readingValue = nodes.features[0].properties.reading;
    console.log(readingValue);

    const reading = $('#data_select').find(":selected").val();
    console.log(reading);

    let popupContent = "";

    if (readingValue != undefined) {
        popupContent += "<p>" + reading + ": " + readingValue + "</p>";

    }
    else {
        popupContent += "<p> No data available </p>";
    }

    if (reading === "temp" || "pressure" || "humidity") {
        popupContent += getApiData(reading, coords);
    }

    console.log(coords);


    new mapboxgl.Popup()
        .setLngLat(coords)
        .setHTML(popupContent)
        .addTo(map);

});

map.on('mouseenter', 'nodes_layer', () => {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'nodes_layer', () => {
    map.getCanvas().style.cursor = '';
});

function getApiData(reading, coords) {
    // uses unix time to calculate middle date between two dates
    const startDateTime = new Date($('#start_date').val()).getTime();
    const endDateTime = new Date($('#end_date').val()).getTime();
    const midDateYearBefore = ((startDateTime + endDateTime) / 2) - 29030400; // length of a yearin seconds
    console.log(midDateYearBefore);

    //converts the date to numerical values for use in api call
    // (don't think needed anymore but not deleting yet)
    // const month = midDate.getMonth() + 1; //add 1 as the api months start at 1
    // const day = midDate.getDate();
    // console.log("Month: " + month);
    // console.log("Day: " + day);

    let readingToReturn = "";

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://history.openweathermap.org/data/3.0/history/timemachine?",
        dt: midDateYearBefore,
        lat: coords[0],
        lon: coords[1],
        appid: "207cb067cd18d82dd940ee96f6e448f2",
        success: function (result) {
            readingToReturn += "<p>Average for this time of year: " + result.main.reading + "</p>";
            //return readingToReturn;
        }

    })

    return readingToReturn;

}



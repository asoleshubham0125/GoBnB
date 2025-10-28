mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

// Add marker to the map
new mapboxgl.Marker({color: '#fe424d'})
    .setLngLat(coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<p>Exact location will be provided after booking</p>`
        )
    )
    .addTo(map);

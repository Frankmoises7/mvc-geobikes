//const { Map, Marker, MarkerClusterGroup, Icon, icon } = require('leaflet');


//Iniciacion del mapa (recuerda que debe existir el div con id map)
const map = L.map("map").setView([-33.45694, -70.64827], 9);

//Formato del Mapa (Como se vera el mapa.. hay varios layer)
const tileURL = "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png";

//Agregando el tema al mapa
L.tileLayer(tileURL).addTo(map);



/* const boton = document.getElementById('login');
boton.addEventListener('click', () => {
    // Redirecciona al usuario a la URL deseada
    //todo : aqui hay una problema de redireccionamiento
    window.location.href = 'http://localhost:3001/auth/google';
}); */


    const api_url= 'https://geobikesapi.onrender.com/api/talleres'

async function fetchData() {
    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }
        const talleres = await response.json();
        console.log(talleres)

        const defaultIcon = L.icon({
            iconUrl: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-bike-vacation-planning-cycling-tour-flaticons-lineal-color-flat-icons-2.png',
            iconSize: [45, 45],
            iconAnchor: [12, 12],
        });

        if (Array.isArray(talleres)) {
            talleres.forEach((taller) => {
                const { lat, lon, name, direction, email } = taller;

                const tallerMarker = L.marker([lat, lon], {
                    icon: defaultIcon,
                })
                    .addTo(map)
                    .bindPopup(
                        `<h5><b>${name}</b></h5>
                            <p>${direction}</p>`,
                        {
                            offset: [11, 5],
                        }
                    );
            });
        }

    } catch (error) {
        console.error(error);
    }
}

fetchData()
addCurrentLocationToMap();



const searchControl = L.esri.Geocoding.geosearch({
    providers: [
        L.esri.Geocoding.arcgisOnlineProvider({
            // API Key to be passed to the ArcGIS Online Geocoding Service
            apikey:
                "AAPKd3545a25fb184a6b88b37bbc39f3bafckzMf-UqXugJwfEowc0JboisMqlPIokptKpcIihMX6i8oey67aOllVl4yfGFo_Xpz",
        }),
    ],
}).addTo(map);


searchControl.on("results", function (data) {
    if (data.results.length > 0) {
        // Obtener la ubicación geocodificada
        const location = data.results[0].latlng;
        console.log(data.results)

        // Agregar el icono en la ubicación
        const customIcon = L.icon({
            iconUrl: 'https://img.icons8.com/plasticine/100/map-pin.png',  // Reemplaza 'ruta_del_icono.png' con la URL de tu icono
            iconSize: [45, 45],  // Ajusta el tamaño del icono según tus necesidades
            iconAnchor: [15, 15]  // Ajusta el punto de anclaje del icono según tus necesidades
        });

        L.marker(location, { icon: customIcon })
            .addTo(map)
            .bindPopup(`
    <h5><b>${data.results[0].text}</b></h5>
    <p>${location}</p>`)

        // Mostrar la latitud y longitud en la consola
        console.log("Latitud: " + location.lat);
        console.log("Longitud: " + location.lng);
    }
});

// Agregar ubicación actual al mapa
function addCurrentLocationToMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                const currentIcon = L.icon({
                    iconUrl: 'https://img.icons8.com/3d-fluency/94/user-location.png',
                    iconSize: [45, 45],
                    iconAnchor: [15, 15]
                });

                L.marker(currentLocation, { icon: currentIcon })
                    .addTo(map)
                    .bindPopup(`<h5><b>Ubicacion Actual</b></h5>
                    <p>Lat: ${currentLocation.lat} - Lon: ${currentLocation.lng}</p>`);

                map.setView(currentLocation, 14);
            },
            function (error) {
                console.error('Error al obtener la ubicación:', error);
                map.setView([-33.45694, -70.64827], 9); // Centrar en una ubicación predeterminada si hay un error en la geolocalización
            }
        );
    } else {
        console.error('La geolocalización no es compatible con este navegador.');
        map.setView([-33.45694, -70.64827], 9); // Centrar en una ubicación predeterminada si la geolocalización no es compatible
    }
}
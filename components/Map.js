import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';

function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({})

    // Transform the search results into the correct ob poop
    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat
    }))

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    })

    console.log(selectedLocation)

    return (
        <ReactMapGL 
        mapStyle="mapbox://styles/tosidda/cksudbn270h9k19mpupxsa7wq"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
        {searchResults.map((result, r) => (
            <div key={r}>
                <Marker
                longitude={result.long}
                latitude={result.lat}
                offsetLeft={-20}
                offsetTop={-10}
                >
                    <p 
                        role="img"
                        onClick={() => {
                        setSelectedLocation(result)
                        console.log(...selectedLocation.long +":" +result.long)
                        }} className="cursor-pointer text-2xl animate-bounce" aria-label="push-pin">
                    📌
                    </p>
                </Marker>
                {/* popup that should show */}
                {selectedLocation.long === result.long ? (
                    <Popup
                
                    onClose={() => setSelectedLocation({})}
                    closeOnClick={true}
                    latitude={result.lat}
                    longitude={result.long}
                    >
                        {result.title}
                    </Popup>
                ):(false)}
            </div>
        ))}
        </ReactMapGL>
    )
}

export default Map

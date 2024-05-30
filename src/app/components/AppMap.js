"use client"
import { useState, useCallback, memo } from "react"
import { GoogleMap, useJsApiLoader, Marker  } from '@react-google-maps/api'

const AppMap = ({locations}) => {

	const mapStyles = [
	      {
	        featureType: 'poi', // Points of Interest
	        stylers: [{ visibility: 'off' }] // Hide points of interest
	      },
	      {
	        featureType: 'transit', // Transit lines
	        stylers: [{ visibility: 'off' }] // Hide transit lines
	      },
	      {
	        featureType: 'road', // Roads
	        elementType: 'labels', // Road labels
	        stylers: [{ visibility: 'off' }] // Hide road labels
	      },
	      {
	        featureType: 'administrative', // Administrative boundaries
	        elementType: 'labels', // Administrative labels
	        stylers: [{ visibility: 'off' }] // Hide administrative labels
	      }
	    ];

	const containerStyle = {
		width: "100%",
		height: "90%",
	}

	const center = {
		lat: locations[0]?.latitude,
		lng: locations[0]?.longitude
	}

	const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

	const {isLoaded} = useJsApiLoader({
		id:'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API
	})

	const [map,setMap] = useState(null)

	const onLoad = useCallback(map => {
		map.setZoom(7)
		setMap(map)
	}, [])

	const onUnmount = useCallback(map => {
		setMap(null)
	}, [])

	return (
		isLoaded ? (
			<GoogleMap
				styles={mapStyles}
				mapContainerStyle={containerStyle}
				center={center}
				onLoad={onLoad}
				onUnmount={onUnmount}
			>
				{locations.map((location, _index) => (
					<Marker
						key={_index}
						position={{
							lat:location.latitude,
							lng:location.longitude
						}}
						icon={{
							url:image,
							anchor: new window.google.maps.Point(5,58)
						}}
					/>

				))}
			</GoogleMap>
		) : <></>
	)
}

export default memo(AppMap)
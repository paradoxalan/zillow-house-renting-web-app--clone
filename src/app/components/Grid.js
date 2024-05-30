"use client"

import { useState } from "react"
import Card from './Card'
import AppMap from './AppMap'

const Grid = ({properties}) => {

	const [input,setInput] = useState('')
	const [houses,setHouses] = useState(properties)
	const [locations,setLocations] = useState(houses.map(house => house.location))

	const setInputAndMapLocations = (value) => {
		setInput(value)
		setHouses(properties.filter(property => property.name.toLowerCase().includes(value.toLowerCase())))
		setLocations(houses.map(house => house.location))
	}

	return (
		<>
			<div className="search-bar">
			    <input type="text"
			        placeholder="Procurar localização"
			        onChange={(e) => setInputAndMapLocations(e.target.value)}
			        value={input}
			    />
			</div>

			<main>
			  <article>
			    <AppMap locations={locations}/>
			  </article>

			  <article className="listings">
			    <h2>Listagens de aluguel</h2>
			    <div className="card-container">
			      {houses.map(prop => <Card 
			        key={prop.id}
			        propName={prop.name}
			        slug={prop.slug}
			        rentalPrice={prop.rentalPrice}
			        beds={prop.beds}
			        image={prop.images[0]}
			        />
			      )}
			    </div>



			  </article>

			</main>
		</>
	)
}

export default Grid
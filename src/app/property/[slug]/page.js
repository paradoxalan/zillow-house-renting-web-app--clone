import ImageCard from "@/app/components/ImageCard"
import Link from "next/link"

const getProperty = async (slugArg) => {
	const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT
	if (!HYGRAPH_ENDPOINT) {
	  throw new Error('HYGRAPH_ENDPOINT not set')
	}

	const response = await fetch(HYGRAPH_ENDPOINT,{
	  method:'POST',
	  headers:{
		'Content-type':'application/json',
		"gcms-stage":"DRAFT"
	  },
	  body: JSON.stringify({
		query: `
			query Property($slugArg: String) {
			  property(where: {slug: $slugArg}) {
			    id,
			    name,
			    description,
			    rentalPrice,
			    petFriendly,
			    pool,
			    slug,
			    inUnitDryer,
			    elevator,
			    beds,
			    parking,
			    images {
			    	id,
			    	url,
			    	fileName
			    },
			    location {
			      latitude,
			      longitude
			    },
			    managingBroker {
			      name,
			      phoneNumber
			    }
		    }
	    }`,
		variables: {
			slugArg: slugArg
		}
	  })
	})
	
	let json = await response.json()
	return json.data?.property
}

const Property = async ({params}) => {

	let prop = await getProperty(params.slug)

	return(
		<div className="property">
			<div className="property-images-container">
				{prop.images.map(image => (
					<ImageCard
						key={image.id}
						url={image.url}
						fileName={image.fileName}
						width={2000}
						height={550}

					/>
				))}

				
			</div>

			<div className="property-info-container">
				<h1>{prop.name}</h1>	
				<h2><span>{prop.beds} Quartos</span> <span>{prop.rentalPrice}</span> </h2>	
				<br />
				<h2>Visão geral</h2>
				<p>{prop.description}</p>
				<br />
				<h2>Facilidades:</h2>
				<ul>
					{prop.parking && <li>Estacionamento</li>}
					{prop.pool && <li>Piscina</li>}
					{prop.petFriendly && <li>Pet amigável</li>}
					{prop.inUnitDryer && <li>Secadora</li>}
					{prop.elevator && <li>Elevador</li>}
				</ul>
				<br />
				<h2>Corretora licenciada:</h2>
				<p>Corretor: {prop.managingBroker?.name}</p>
				<p>Número de telefone: {prop.managingBroker?.phoneNumber}</p>
				<br />
				<h2>Localização:</h2>
				<ul>
					<li>{prop.location.latitude}</li>
					<li>{prop.location.longitude}</li>
					
				</ul>
				<Link href={"/"}><button>Voltar</button></Link>
			</div>
		</div>
	)
}

export default Property
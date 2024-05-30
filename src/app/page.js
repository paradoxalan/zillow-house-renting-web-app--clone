import Image from "next/image";
import NavBar from "./components/NavBar";
import Grid from "./components/Grid";

const getProperties = async () => {
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
        query Assets {
          properties {
            name
            beds
            description
            rentalPrice
            slug
            id
            images {
              fileName
              url
            }
            location {
              latitude
              longitude
            }
          }
        }

      `
    })
  })
  
  let json = await response.json()
  return json.data.properties
}

const Home = async () => {
  const props = await getProperties()

  return (
    <>
      <NavBar></NavBar>
      <Grid properties={props} />
    </>
  );
}

export default Home
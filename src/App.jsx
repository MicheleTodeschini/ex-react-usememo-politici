import { useEffect, useState } from 'react'
import './App.css'

function App() {

  async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj;
  }

  const URL = 'http://localhost:3333/politicians'
  const [politicians, setPoliticians] = useState([])

  useEffect(() => {
    async function getPoliticians() {
      try {
        const politici = await fetchJson(URL)
        setPoliticians(politici)


      } catch (error) {
        console.error('Non sono riuscito a recuperare i politici')
      }
    }
    getPoliticians()
  }, [])
  console.log(politicians);


  return (
    <>
      <h1>I nostri politici</h1>
      <section className='container'>
        <div className='row'>

          {
            politicians.map(politico => (
              <div className='card col-4'>

                <h2>{politico.name}</h2>
                <img src={politico.image || "https://picsum.photos/200/300"}
                  alt={politico.name}
                  onError={(e) => {
                    e.target.src = "https://picsum.photos/200/300"
                  }} />
                <p>{politico.position}</p>
                <p>{politico.biography}</p>

              </div>
            ))
          }
        </div>
      </section>


    </>
  )
}

export default App

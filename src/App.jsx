import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {

  async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj;
  }

  const URL = 'http://localhost:3333/politicians'
  const [politicians, setPoliticians] = useState([])
  const [search, setSearch] = useState('')

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
  console.log(search);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politico => {
      return politico.name.toLowerCase().includes(search.toLocaleLowerCase()) || politico.biography.toLocaleLowerCase().includes(search.toLowerCase())
    })
  }, [politicians, search])



  return (
    <>
      <h1>I nostri politici</h1>
      <input type='text' placeholder='Digita qui'
        value={search}
        onChange={(e) => setSearch(e.target.value)} />
      <section className='container'>
        <div className='row'>

          {
            filteredPoliticians.map(politico => (
              <div className='card col-4' key={politico.id}>

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

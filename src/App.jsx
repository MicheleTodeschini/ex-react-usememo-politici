import React, { useEffect, useMemo, useState } from 'react'
import './App.css'
import Card from '../components/Card'

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
              <Card {...politico} key={politico.id} />
            ))
          }
        </div>
      </section>


    </>
  )
}

export default App

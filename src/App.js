import { useLayoutEffect, useState } from 'react';


import './App.css';
import Dvote from './ethereum/Dvote'
import web3 from './ethereum/web3';

const App = () => {
  const [loading, setLoading ] = useState(false)
  const [ message, setMessage ] = useState('')
  const [ input, setInput ] = useState('')
  const [list, setList] = useState([])
  const [selectedC, setSelectedC ] = useState('10000')
  const [winner, setWinner ] = useState('')

  useLayoutEffect(() => {
    getCounts()
  },[])

  const getCounts = async () => {
    const candidatesCount = await Dvote.methods.getCandidatesCount().call()

    const candidateList = 
      await Promise
      .all(Array(parseInt(candidatesCount))
      .fill()
      .map((element, index) => {
      return Dvote.methods.Candidates(index).call()
    }))
    setList(candidateList)

  }
  const addCandidate = async () => {
    try {
      setMessage('')
      setLoading(true)
      const accounts = await web3.eth.getAccounts()
      await Dvote.methods.addCandidate(input).send({from: accounts[0]})
      getCounts()
      
    } catch (error) {
      setMessage(error.message)
    }
    setLoading(false)
    setInput('')


  }

  const rankList = list

  rankList.sort((a, b) => b.voteCount - a.voteCount)

  const vote = async () => {
    try {
      setMessage('')
      setLoading(true)
      const accounts = await web3.eth.getAccounts()
      await Dvote.methods.vote(selectedC).send({from: accounts[0]})
      getCounts()
      setSelectedC('10000')
      
    } catch (error) {
      setMessage(error.message)
    }
    setLoading(false)
  }

  const finalizeElection = async () => {
    setLoading(true)
    const accounts = await web3.eth.getAccounts()

    const Winner = await Dvote.methods.finalize().call({from: accounts[0]})
    setLoading(false)
    setWinner(Winner)
    
  }
  return (
    <>
    <h1>DElection 2020</h1>
    <div className='app' >
      <div className='body-box'>
        <div>
          <h3>RANKING</h3>
          <table className='rankTable'>
            <thead>
              <tr>
                <td>Rank</td>
                <td>Name</td>
                <td>Votes</td>
              </tr>
              
            </thead>
            <tbody>
              {rankList.map((candidate, index) => {
                return <tr>
                  <td>{index+1}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.voteCount}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
        <div className='listBox'>
          <h3>CANDIDATES</h3>
          <ul>
            {list.map((can, index) => <li key={index}>{can.name}</li>)}
          </ul>
        </div>
      </div>
      <div className='bottomBox'>
        <div className='votingSection'>
          <h2>VOTE HERE!!!</h2>
          <select value={selectedC} onChange={e => setSelectedC(e.currentTarget.value)} >
            <option value='10000' >Pick yours</option>
            {list.map((candidate, index) => <option key={index} value={index} >{candidate.name}</option>)}
          </select>
          {selectedC != 10000 && <button onClick={vote}>{loading ? 'processing...' : 'Vote'}</button>}
        </div>

        <div >
          <h2>MANAGER SECTION</h2>
          <div className='onlyManager'>
            <div className='add-form'>
                <h4>Add candidate!</h4>
                <input 
                  id='input' 
                  value={input} 
                  onChange={
                    event => setInput(event.target.value)
                  }/>
                <button 
                  className='submit-btn'
                  onClick={addCandidate}
                  >
                    {loading ? 'proccessing...' : 'Submit'}
                  </button>
            </div>
            <div className='finalize'>
              <h3>{ winner && winner}</h3>
                <h4 >
                  Finalize Election!
                </h4>
                <button onClick={finalizeElection} className='submit-btn'>GET WINNER!</button>
              </div>
            </div>

          </div>

          </div>
        {message && <h3 className='errorMessage'>{message}</h3>}

    </div>
</>
  );
}





export default App;

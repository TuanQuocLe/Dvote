import './App.css';

function App() {
  return (
    <div className='app' >
      <h1>Election 2020</h1>
      <div className='body-box'>
        <div>
          <h3>RANKING</h3>
          <ul>
          </ul>
        </div>
        <div>
          <h3>CANDIDATES</h3>
          <ul>

          </ul>
        </div>

        <div className='add-form'>
            <h3>Add candidate!</h3>
            <input id='input'/>
            <button className='submit-btn'>Submit</button>
        </div>
        <div className='finalize'>
          <h3>Winner</h3>
            <label className='winner-label'>
              Finalize Election!
            </label>
            <button className='submit-btn'>Submit</button>
          </div>
        </div>
      
    </div>
  );
}

export default App;

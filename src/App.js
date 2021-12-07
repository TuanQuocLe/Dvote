import './App.css';

function App() {
  return (
    <div className='app' >
      <h1>Vote 2020</h1>
      <div className='body-box'>
        <div>
          <h3>RANKING</h3>
          <ul>
            CANDIDATE RANK GOES HERE!
          </ul>
        </div>
        <div>
          <h3>CANDIDATE</h3>
          <ul>LIST OF CANDIDATE GOES RIGHT HERE!!!</ul>
        </div>
      </div>
      <form className='add-form'>
        <label>Add candidate</label>
        <input/>
        <input type='submit'/>
      </form>
    </div>
  );
}

export default App;

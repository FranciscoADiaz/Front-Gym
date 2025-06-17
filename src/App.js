import logo from '../src/rolling.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="" alt="logo" />
        <p>Proyecto Final Rolling Code School</p>
        <a
          className="App-link"
          href="https://web.rollingcodeschool.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rolling Code School
        </a>
      </header>
    </div>
  );
}

export default App;

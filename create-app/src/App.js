import './App.css';
import CardList from './components/CardList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {

  return (
    <div className="App">
      <h1 className='titleName'>Product List:</h1>
      <div className='CardList'><CardList /></div>
    </div>
  );
}

export default App;

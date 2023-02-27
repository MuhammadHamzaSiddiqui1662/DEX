import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Wallet } from './pages/Wallet/Wallet';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Wallet />
    </div>
  );
}

export default App;

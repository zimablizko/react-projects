import './App.css';
import Game from './components/Game';
import Header from './components/Header';
import GameContextProvider from './store/game-context';

function App() {
  return (
    <GameContextProvider>
      <div className="app">
        <Header />
        <Game></Game>
      </div>
    </GameContextProvider>
  );
}

export default App;

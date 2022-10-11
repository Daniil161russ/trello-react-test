import AppBar from './AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import '../assets/style/index.scss';

function App() {
  return (
    <div className="trello-container">
      <AppBar />
      <BoardBar />
      <BoardContent />
    </div>
  );
}

export default App;

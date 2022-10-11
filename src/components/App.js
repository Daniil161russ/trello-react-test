import AppBar from './AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import '../assets/style/index.scss';
import 'font-awesome/css/font-awesome.min.css';

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


import UserCard from './UserCard.js'
import './App.css';
import SendMultiple from './SendMultiple.js'
import SendPicAdmin from './SendPicAdmin.js'

function App() {
  return (
    <div className="App">
    <h2>Upload Picture here</h2> 
    <UserCard/>
    <SendMultiple/>
    <h3>Redemption</h3>
    <SendPicAdmin/>
    </div>
  );
}

export default App;

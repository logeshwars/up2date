import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Main from './components/Main'
import NavBar from './components/NavBar';
import Admin from './components/Admin';
function App() {
  return (
    <div className="app">
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/'  element={<Main/>}/>
          <Route path='admin'  element={<Admin/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

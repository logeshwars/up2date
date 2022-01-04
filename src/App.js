import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Main from './components/Main'
import NavBar from './components/NavBar';
import Admin from './components/Admin';
import AdminNav from './components/AdminNav';
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/'  element={<><NavBar/><Main/></>}/>
          <Route path='admin'  element={<><AdminNav/><Admin/></>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

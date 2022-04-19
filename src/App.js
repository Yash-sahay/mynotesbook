import './App.css';
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import {  AnimatePresence } from "framer-motion";


function App() {

const location = useLocation();
console.log(location);
  return (
      <NoteState>    
          <Navbar />
          <Alert/>
          <div className="container">
            <AnimatePresence exitBeforeEnter>
            <Routes key={location.pathname} location={location}>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
            </Routes>
            </AnimatePresence>
          </div>
      </NoteState>
  );
}

export default App;

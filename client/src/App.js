import './App.css';
import Allstud from './component/Allstud';
import Navbar from './component/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Addstud from './component/Addstud';
import Edit from './component/Edit';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes >
        <Route path='/' element={<Allstud />} />
        <Route path='/addstud' element={<Addstud />} />
        <Route path="/edit/:id" element={<Edit />} />


      </Routes>

    </BrowserRouter>
  );
}

export default App;

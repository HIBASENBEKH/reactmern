import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SendotpForm from './components/SendotpForm';
import ValidateOTPForm from './components/ValidateOTPForm';


function App() {
  return (
    <div >
    <Routes>
    <Route path='/' element={<Login/>}>  </Route>
    <Route path='/send' element={<SendotpForm/>}>  </Route>
    <Route path='/validate' element={<ValidateOTPForm/>}>  </Route>
    </Routes>
     
    </div>
  );
}

export default App;

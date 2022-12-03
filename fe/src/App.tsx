import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { RequireAuth } from './context/Auth/RequireAuth';

export default function App() {
return (
    <div className="App">
        <Routes>
          	<Route path="/" element={<Home/>} > </Route>
			<Route path="/register" element={<Register />} > </Route>
			<Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>} > </Route>
        </Routes>
    </div>
  );
};


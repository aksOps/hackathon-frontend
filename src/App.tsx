import {VideoList} from "./components/VideosList.tsx";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Signup from "./components/Signup.tsx";
import Login from "./components/Login.tsx";

function App() {


    const isAuthenticated = () => {
        return localStorage.getItem('username') !== "";
    };
    return (<>
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/videos" element={isAuthenticated() ? <VideoList/> : <Navigate to="/login"/>}/>
                <Route path="/" element={isAuthenticated() ? <VideoList/> : <Navigate to="/login"/>}/>
            </Routes>
        </Router>
    </>)
}

export default App

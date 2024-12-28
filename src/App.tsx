import {VideoList} from "./components/VideosList.tsx";
import Login from "./components/Login.tsx";
import {useEffect} from "react";

function App() {


    useEffect(() => {
        console.log(localStorage.getItem('username'))
    }, [localStorage.getItem('username')])

    const isAuthenticated = () => {
        console.log(localStorage.getItem('username'))
        if (localStorage.getItem('username') !== undefined && localStorage.getItem('username') !== null) {
            // @ts-ignore
            return localStorage.getItem('username').length > 0
        }
    };
    return (<>
        {isAuthenticated() ? <VideoList/> : <Login/>}
    </>)
}

export default App

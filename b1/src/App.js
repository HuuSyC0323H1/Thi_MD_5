import './App.css';
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Admin from "./pages/Admin";
import ShowProducts from "./pages/product/ShowProducts";


function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Home/>}>
                    <Route path={'/'} element={<ShowProducts/>}></Route>
                    <Route path={'/abc'} element={<ShowProducts/>}></Route>
                </Route>
                <Route path={'/admin'} element={<Admin/>}></Route>
            </Routes>
        </>
    );
}

export default App;

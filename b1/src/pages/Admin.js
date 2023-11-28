import Navbar from "../component/Navbar";
import {Link, Outlet} from "react-router-dom";

export default function Admin(){
    return(
        <>
            <Navbar></Navbar>
            <hr/>
            <Link to={''}>List Students</Link>
            <Link to={'abc'}>List Students</Link>
            <Outlet></Outlet>
        </>
    )
}
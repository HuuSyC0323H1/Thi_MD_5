import Navbar from "../component/Navbar";
import {Link, Outlet} from "react-router-dom";
import React from "react";

export default function Home(){
    return(
        <>
            <Navbar></Navbar>
            <hr/>
            <Outlet></Outlet>
        </>
    )
}
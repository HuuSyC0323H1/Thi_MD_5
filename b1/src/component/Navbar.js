import {Link} from "react-router-dom";

export default function Navbar(){
    return(
        <h1>
            <Link to={"/"}>Kênh Sản Phẩm</Link> -
            <Link to={"/admin"}>  Quản Lý</Link>
        </h1>
    )
}
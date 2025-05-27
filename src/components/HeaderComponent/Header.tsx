import { Link } from "react-router-dom";
import './header.css';

function Header() {
  return (
      <header className="header">
        <div className="center-header">
        <Link className="header-link" to={"/"}>se alla recept</Link>
        <Link className="header-link" to={"/food/create"}>skapa ditt egna recept</Link>
    </div>
    </header>
  )
}

export default Header

import {
  Routes,
  Route,
  Link,
  Outlet,
  NavLink
} from "react-router-dom";
import { withRouter } from "react-router-dom";
function Navbar() {
  return (
    <section>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand fs-2" href="#">SHare&CAre</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fs-5">
              <li className="nav-item" >
                <NavLink to="/home" className="nav-link px-2 mx-2" aria-current="page">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/map" className="nav-link px-2 mx-2">Map</NavLink>

              </li>
              <li className="nav-item">
                <NavLink to="/forum" className="nav-link px-2 mx-2">Forum</NavLink>

              </li>
              <li className="nav-item">
                <NavLink to="/message" className="nav-link px-2 mx-2">Message</NavLink>

              </li>

            </ul>
            <form class="d-flex">
              <div class="dropdown text-end">

                <a class="d-block link-dark text-decoration-none dropdown-toggle" href="#" role="" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://i.ibb.co/wwygB6P/lotus-as.png" alt="mdo" width="62"  class="rounded-circle" />
                </a>

                <ul class="dropdown-menu text-small" aria-labelledby="dropdownMenuLink">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </section>
  )
}

export default Navbar;
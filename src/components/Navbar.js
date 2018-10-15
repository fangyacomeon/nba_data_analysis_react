import React from 'react'
const Navbar = () => { 
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#">NBA EXPLORER</a>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    </ul>
                    <span class="navbar-text">
                        login
                    </span>
                </div>
        </nav>    
    )
}

export default Navbar;
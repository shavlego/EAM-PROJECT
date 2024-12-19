// About Page Component 

import {   
    Link,
    Outlet,
} from "react-router-dom";


const BecomeNanny = () => (
    <div>
        <h2>About Page</h2>
        <nav>
            <ul>
                <li>
                    <Link to="team">Our Team</Link>
                </li>
                <li>
                    <Link to="company">Our Company</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
    </div>
  );

  export default BecomeNanny;
// Home Page Component

import { useNavigate } from "react-router-dom";

export default function FindNanny  ()  {
    const navigate = useNavigate();
  
    return (
        <div>
            <h2>Home Page</h2>
            <button onClick={() =>
                 navigate("/contact")}>Go to Contact</button>
        </div>
    );
  };
  
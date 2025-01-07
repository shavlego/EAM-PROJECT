// nanny info page
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

function nannyInfo  ()  {

    const navigate = useNavigate();
  
    return (
        <div>
            <Header />
            <h2>Οδηγίες για Νταντάδες</h2>
            <Footer />     
        </div>
    );
  }
  export default nannyInfo;
  
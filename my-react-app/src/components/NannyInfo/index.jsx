// nanny info page
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

export default function NannyInfo  ()  {

    const navigate = useNavigate();
  
    return (
        <div>
            <Header />
            <h2>Οδηγίες για Νταντάδες</h2>
            <Breadcrumb/>
            <Footer />     
        </div>
    );
  };
  
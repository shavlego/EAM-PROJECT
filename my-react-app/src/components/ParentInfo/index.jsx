// parent info page
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import Eligibility from "./Eligibility";
import HowitWorks from "./HowItWorks";

export default function ParentInfo() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <h1>Οδηγίες για Γονείς</h1>
      <Breadcrumb />
      <Eligibility />
      <HowitWorks />
      <Footer />
    </div>
  );
}

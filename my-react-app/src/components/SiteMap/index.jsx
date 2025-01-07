import React, { useState } from "react"; // Added `useState` import
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

export default function SiteMap() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1"); // `useState` hook is now properly imported

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Header />
      <h1 className="text-center">Χάρτης Ιστοχώρου</h1>
      <Breadcrumb />
      <div className="container my-5">
        {/* Tab Navigation */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
              onClick={() => handleTabClick("tab1")}
            >
              Γενικό
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
              onClick={() => handleTabClick("tab2")}
            >
              Νταντάδες
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
              onClick={() => handleTabClick("tab3")}
            >
              Γονείς
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content mt-3">
          {activeTab === "tab1" && (
            <div className="tab-pane fade show active">
              <h3>Content for Tab 1</h3>
              <div className="d-flex justify-content-center align-items-center" >
                <img src  = "/Images/sitemap_general.png" 
                            alt="Γενικό SiteMap Δεν Φορτώθηκε η εικόνα" 
                            className="img-fluid"
                />
                </div>
            </div>
          )}
          {activeTab === "tab2" && (
            <div className="tab-pane fade show active">
              <h3>Content for Tab 2</h3>
              <div className="d-flex justify-content-center align-items-center" >
                <img src  = "/Images/sitemap_nanny.png" 
                            alt="Νταντά SiteMap Δεν Φορτώθηκε η εικόνα" 
                            className="img-fluid"
                />
                </div>
            </div>
          )}
          {activeTab === "tab3" && (
            <div className="tab-pane fade show active">
              <h3>Content for Tab 3</h3>
              <div className="d-flex justify-content-center align-items-center" >
                <img src  = "/Images/sitemap_parent.png" 
                            alt="Γονείς SiteMap Δεν Φορτώθηκε η εικόνα" 
                            className="img-fluid"
                />
                </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
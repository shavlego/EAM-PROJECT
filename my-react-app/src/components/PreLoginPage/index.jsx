import Header from '../Header';
import './index.css';
import Footer from '../Footer';
import { useNavigate } from "react-router-dom";


function PreLoginPage() {
    const nav = useNavigate();
    const handleNannyClick = function(){
      nav('/LoginNanny')
    }
  
    const handleParentClick = function(){
      nav('/LoginParent')
    }

    return (
        <div>
          <Header />

          <h1>Σελίδα Σύνδεσης</h1>
            <p>
                Δεν έχετε φτιάξει ακόμα προφίλ. Θα πρέπει να συνδεθείτε είτε ως
                “Νταντά” είτε ως Γονέας/Κηδεμόνας.
            </p>
            
            <div className="login-options">
                
                <div className="login-option parent">
                    <img
                        src="parent-icon.png" // Replace with the actual path to your image
                        alt="Parent Icon"
                        className="login-icon"
                    />
                    <button className="login-button" onClick={handleParentClick}>Σύνδεση Γονέας</button>
                </div>
                <div className="login-option nanny">
                    <img
                        src="nanny-icon.png" // Replace with the actual path to your image
                        alt="Nanny Icon"
                        className="login-icon"
                    />
                    <button className="login-button" onClick={handleNannyClick}>Σύνδεση Νταντά</button>
                </div>
            </div>
          
          <Footer />
        </div>
      );
  }
  
  export default PreLoginPage;
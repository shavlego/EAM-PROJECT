
import { useNavigate } from "react-router-dom";


function Hero() {

  const nav = useNavigate();
  const handleFindNannyClick = function(){
    nav('/FindNanny')
  }

  const handleBecomeNannyClick = function(){
    nav('/BecomeNanny')
  }



    return (
        <main className="container my-5">
          <div className="hero text-center mb-4 p-4 bg-light rounded">
            <h1 className="display-4">Δράση “Νταντάδες της Γειτονιάς”</h1>
            <p className="lead">
              Υπηρεσία κατ’ οίκον φροντίδας βρεφών και νηπίων από 2.5 μηνών έως 2 ετών
            </p>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img
                src="nannies.jpg"
                alt="Image of Nannies"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6 ">
              <p>
                Πρόσβαση έχουν οι γονείς και τα φυσικά πρόσωπα που έχουν την επιμέλεια
                βρεφών και νηπίων, καθώς και τα φυσικά πρόσωπα που επιθυμούν να εγγραφούν
                στο μητρώο σαν επαγγελματίες.
              </p>
              <div className="buttons d-flex gap-2">
                <button className="btn-custom1" onClick={handleBecomeNannyClick}>Γίνε νταντά</button>
                <button className="btn-custom2 " onClick={handleFindNannyClick}>Βρες νταντά</button>
              </div>
              <p className="text-muted mt-3">Απαιτείται σύνδεση με κωδικούς taxisnet.</p>
            </div>
          </div>
        </main>
      );
}

export default Hero;

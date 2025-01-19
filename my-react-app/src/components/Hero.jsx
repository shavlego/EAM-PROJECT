import { useNavigate } from "react-router-dom";

function Hero() {
  const nav = useNavigate();
  const handleFindNannyClick = function () {
    nav("/FindNanny");
  };

  const handleBecomeNannyClick = function () {
    nav("/loginNanny");
  };

  return (
    <main className="container my-5">
      <div className="hero text-center mb-4 p-4 bg-light rounded">
        <h1 className="display-4">Δράση “Νταντάδες της Γειτονιάς”</h1>
        <p className="lead">
          Υπηρεσία κατ’ οίκον φροντίδας βρεφών και νηπίων έως δυόμιση έτη
        </p>
      </div>
      <div className="row">
        <div className="col-md-6">
          <img
            src=".\public\Images\main_page_main_img.png"
            alt="Image of Nannies"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6 ">
          <p className="fs-5">
            Μέσω της δράσης "Νταντάδες της Γειτονιάς" παρέχεται 100% επιδότηση
            σε γονείς/κηδεμόνες που αναζητούν "νταντά" για την φύλαξη
            νηπίων/βρεφών. Οι ενδιαφερόμενοι για απασχόληση ως "νταντά" έχουν
            την δυνατότητα να δηλώσουν συμμετοχή στη δράση.
          </p>
          <div className="buttons d-flex  justify-content-center gap-2">
            {/* px-lg for larger screens px-md for medium screens and px-sm for small screens */}
            <button
              className="btn-custom1 px-lg-5 px-md-4 px-sm-3 py-3 fs-4 rounded-pill"
              onClick={handleBecomeNannyClick}
            >
              Γίνε νταντά
            </button>
            <button
              className="btn-custom2 px-lg-5 px-md-4 px-sm-3 py-3 fs-4 rounded-pill"
              onClick={handleFindNannyClick}
            >
              Βρες νταντά
            </button>
          </div>
          <p className="text-muted mt-3">
            Για την Εγγραφή σας στο πρόγραμμα επιλέξτε το πλήκρτρο σύνδεση στο
            πάνω δεξιά μέρος της οθόνης.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Hero;

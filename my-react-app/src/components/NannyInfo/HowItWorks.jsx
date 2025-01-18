import React from "react";

function HowItWorks() {
  const steps = [
    {
      image: "/Images/taxis_login.png",
      title:
        "Κάνετε Εγγραφή στην σελίδα ntantades απο το πλήκτρο Συνδεση στο πάνω δεξια μέρος της οθόνης.Χρειάζεστε πιστοποιητικό υγείας απο παθολόγο, δερματολόγο και ψυχίατρο καθώς και μια υπέυθυνη δήλωση εγκυρότητας των δεδομένων που παρέχετε.",
    },
    {
      image: "/Images/profile_creation.png",
      title:
        "Δημιουργείτε το προφίλ Νταντάς συμπληρώνοντας στοιχία του βιογραφικού σας. Όποτε το επιθυμείτε μπορείτε να κάνετε ανάρτηση Αγγελίας.",
    },
    {
      image: "/Images/deal.png",
      title:
        "Οι γονείς αναζητούν Νταντάδεςεφόσον σας επιλέξουν μπορούν να επικοινωνήσουν μαζί σας και να κλείσετε ραντεβου. Έπειτα καταθέτουν αίτηση συνεργασίας και εφόσον την αποδεχτείτε υπογράφετε συμφωνητικό συνεργασίας. ",
    },
    {
      image: "/Images/voucher.png",
      title:
        "Στο τέλος κάθε μήνα οι γονείς παραλαμβάνουν το Voucher το οποίο μέσω της σελίδα σας αποστέλλουν. Εφόσον το λάβετε μπορείτε να το εξαργυρώσετε. Σε αυτό το σημείο ορίζεται και αν θα γίνει ανανέωση συνεργασίας ή λήξη",
    },
  ];

  return (
    <section className="my-5 container">
      <h3 className="text-center ">
        Πως λειτουργεί το Πρόγραμμα “Νταντάδες της Γειτονιάς”
      </h3>
      <div className="row  text-center d-flex align-items-stretch">
        {steps.map((step, index) => (
          <div className="col-md-3 my-3 d-flex" key={index}>
            <div
              className="card border-0 flex-fill"
              style={{ backgroundColor: "#A5953D" }}
            >
              <div className="card-body">
                {/* Rounded Image */}
                <img
                  src={step.image}
                  alt={step.title}
                  className="img-fluid rounded-circle mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }} // Adjust size as needed
                />
                <p>{step.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;

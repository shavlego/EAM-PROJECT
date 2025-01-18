import React from "react";

function HowItWorks() {
  const steps = [
    {
      image: "/Images/taxis_login.png",
      title:
        "Κάνετε εγγραφή στη σελίδα ntantades και στην συνέχεια συνδέεστε με τον λογαριασμό σας",
    },
    {
      image: "/Images/profile_creation.png",
      title:
        "Βρίσκεται την κατάλληλη Νταντά. Επικοινωνείτε μαζί και εφόσον επιθυμείτε να προχωρήσετε κάνετε αίτηση συνεργασίας.",
    },
    {
      image: "/Images/deal.png",
      title:
        "Εφόσον η επιλεγμένη Νταντά δεχθεί προχωράτε με την κατάθεση συμφωνητικού το οποίο πάλι πρέπει να αποδεχθεί",
    },
    {
      image: "/Images/voucher.png",
      title:
        "Στο τέλος του κάθε μήνα λαμβάνετε ενα voucher το οποίο καταθέτετε μέσω της σελίδας στην Νταντά για να πληρωθεί. Μπορείτε να ανανεώσετε την συνεργασία ή αν τερματίσετε",
    },
  ];

  return (
    <section className="my-5 container">
      <h3 className="text-center">
        Πως λειτουργεί το Πρόγραμμα “Νταντάδες της Γειτονιάς”
      </h3>
      <div className="row text-center d-flex align-items-stretch">
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

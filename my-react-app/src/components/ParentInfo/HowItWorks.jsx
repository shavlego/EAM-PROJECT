import React from "react";

function HowItWorks() {
  const steps = [
    {
      image: "/Images/taxis_login.png", 
      title: "Σύνδεση με TaxisNet και δημιουργία προφίλ",
    },
    {
      image: "/Images/profile_creation.png", 
      title: "Αναζήτηση Νταντάδων στο βρές Νταντά επικοινωνία και αίτηση συνεργασίας.",
    },
    {
      image: "/Images/deal.png", 
      title: "Αποδοχή αίτησης απο Νταντά και υπογραφή συμφωνητικού συνεργασίας",
    },
    {
      image: "/Images/voucher.png", 
      title: "Κατάθεση voucher και πληρωμή επαγγελματία",
    },
  ];

  return (
    <section className="my-5 container">
      <h2 className="text-center">Πως λειτουργεί το Πρόγραμμα “Νταντάδες της Γειτονιάς”</h2>
      <div className="row text-center d-flex align-items-stretch">
        {steps.map((step, index) => (
          <div className="col-md-3 my-3 d-flex" key={index}>
            <div className="card border-0 flex-fill"style={{ backgroundColor: "#A5953D" }}>
              <div className="card-body">
                {/* Rounded Image */}
                <img
                  src={step.image}
                  alt={step.title}
                  className="img-fluid rounded-circle mb-3"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }} // Adjust size as needed
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
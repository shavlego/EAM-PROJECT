import React from "react";

function HowItWorks() {
  const steps = [
    {
      icon: "fa-file-alt", // Font Awesome icon class
      title: "Σύνδεση με TaxisNet και συμπλήρωση Αίτησης",
    },
    {
      icon: "fa-user-circle",
      title: "Δημιουργία προφίλ στο Νταντάδες και ανάρτηση του.",
    },
    {
      icon: "fa-handshake",
      title: "Συμφωνία με γονείς και έναρξη συνεργασίας",
    },
    {
      icon: "fa-ticket-alt",
      title: "Παραλαβή voucher στο τέλος του μήνα",
    },
  ];

  return (
    <section className="my-5">
      <h2 className="text-center">Πως λειτουργεί το Πρόγραμμα “Νταντάδες της Γειτονιάς”</h2>
      <div className="row text-center">
        {steps.map((step, index) => (
          <div className="col-md-3 my-3" key={index}>
            <div className="card bg-light border-0">
              <div className="card-body">
                <i className={`fas ${step.icon} fa-3x mb-3`}></i>
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
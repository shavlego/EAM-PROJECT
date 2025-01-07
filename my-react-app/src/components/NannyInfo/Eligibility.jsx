import React from "react";

function Eligibility() {
  const prerequisites = [
    "Έχουν συμπληρώσει το 18ο έτος της ηλικίας τους",
    "Είναι Έλληνες ή αλλοδαποί που διαμένουν νόμιμα στην Ελλάδα",
    "Δεν έχουν εκκρεμή της γονικής μέριμνας",
    "Διαθέτουν πτυχίο ΙΕΚ, ΤΕΙ, ή ΑΕΙ σε αντικείμενο που αναγράφεται στο 'Απαραίτητες Σπουδές'.",
    "Δεν τελούν υπό καθεστώς δικαστικής συμπαράστασης.",
    "Δεν εκκρεμεί εις βάρος τους δικαστική απόφαση.",
    "Έχουν γνώση πρώτων βοηθειών σε παιδιά.",
    "Έχουν ολοκληρώσει το πρόγραμμα επιμόρφωσης 'επιμελητών'.",
  ];

  return (
    <section className="my-5">
      <div className="container text-center">
        <h2>Ποιοι Μπορούν να ενταχθούν στο πρόγραμμα:</h2>
        <div className="row d-flex align-items-stretch mt-4">
          {/* First Column (Items 1-4) */}
          <div className="col-md-6 d-flex flex-column">
            <div className="bg-light flex-grow-1 p-3">
              <ul className="list-group list-group-flush">
                {prerequisites.slice(0, 4).map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item bg-light border-0 text-start"
                  >
                    {index + 1}. {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Second Column (Items 5-8) */}
          <div className="col-md-6 d-flex flex-column">
            <div className="bg-light flex-grow-1 p-3">
              <ul className="list-group list-group-flush">
                {prerequisites.slice(4).map((item, index) => (
                  <li
                    key={index + 4}
                    className="list-group-item bg-light border-0 text-start"
                  >
                    {index + 5}. {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-6 mt-4">
          <button className="btn btn-primary rounded-pill">Απαραίτητες Σπουδές</button>
          <button className="btn btn-primary rounded-pill">Πρόγραμμα Επιμόρφωσης</button>
        </div>
      </div>
    </section>
  );
}

export default Eligibility;
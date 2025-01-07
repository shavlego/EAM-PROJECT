import React from "react";

function Eligibility() {
  const prerequisites = [
    "Να είστε εργαζόμενος/η ή άνεργη εγγεγραμένη στα μητρώα της ΔΥΠΑ(Η ανεργία αφορά μόνο σε μητέρες).",
    "Να έχετε ανήλικο τέκνο 2 μηνών εώς 2 ετών και 6 μηνών.",
    "Το αιτήσιο ατομικό εισόδημα σας να μην υπερβαίνει το ποσό των 24.000 ευρω για το φορολογικό έτος 2022.",
    "Να μην τελείται υπό καθεστώς άδειας μητρότητας ή πατρότητας ή άδειας ανατροφής τέκνου ή γονικής άδειας ή ειδικής παροχής προστασίας μητρότητας ή να μην έχετε διακόψει την επαγγελματική σας δραστηριότητα.'.",
  ];

  return (
    <section className="my-5">
      <div className="container text-center">
        <h3>Ποιοι Μπορούν να ενταχθούν στο πρόγραμμα:</h3>
        <div className="row d-flex align-items-stretch mt-4">
          <div className="d-flex flex-column">
            <div className="bg-light flex-grow-1 p-3">
              <ul className="list-group list-group-flush">
                {prerequisites.map((item, index) => (
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

        </div>
      </div>
    </section>
  );
}

export default Eligibility;
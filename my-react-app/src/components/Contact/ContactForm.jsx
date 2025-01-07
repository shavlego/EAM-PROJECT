import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

{"Διαχείριση αλλαγών τιμών ότι αλλαγές γίνουν στα input fields γινονται set στο state άρα το state πάντα είναι ίδιο με τα controls"}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
    // Apostoli dedomenwn
  };

  const handleCancel = () => {
    //go to previous page
    navigate(-1);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Φόρμα Επικοινωνίας</h1>
      {submitted && <div className="alert alert-success">Ευχαριστούμε που επικοινωνήσατε μαζί μας. Θα σας απαντήσουμε άμεσα στο EMail.!</div>}
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Όνομα <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Message Field */}
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Μήνυμα <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

         {/* Buttons */}
         <div className="d-flex">
            {/* cancel Button */}
            <button  type="button"className="btn btn-secondary me-2" onClick={handleCancel}>
                Aκύρωση
            </button>
            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
                Υποβολή
            </button>
        </div>
       
      </form>
    </div>
  );
}

export default ContactForm;
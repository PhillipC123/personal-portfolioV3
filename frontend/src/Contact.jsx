import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const draft = localStorage.getItem("contactDraft");

    if (draft) {
      setFormData(JSON.parse(draft));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contactDraft", JSON.stringify(formData));
  }, [formData]);

  const validateForm = () => {
    let errors = {};

    if (!/^[a-zA-Z' -]+$/.test(formData.name)) {
      errors.name = "Name must only contain letters, spaces, hyphens, and apostrophes.";
    }

    if (!/^[\w.-]+@[a-z\d.-]+\.[a-z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email address.";
    }

    if (!/^[a-zA-Z ]+$/.test(formData.subject)) {
      errors.subject = "Subject must only contain letters.";
    }

    if (/[<>&"'\/]/.test(formData.message)) {
      errors.message = "Message can't contain special characters like <, >, &, \, ', or /.";
    }
    
    if (!formData.consent) {
      errors.consent = "If you'de like to be contacted, please check the box.";
    }
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("/.netlify/functions/submit-message", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        localStorage.removeItem("contactDraft");
        setFormData({name: "", email: "", subject: "", message: "", consent: false});
      } else {
        throw new Error("Failed to submit contact information");
      }
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  return (
    <div className="contact-page">
      <h2>Contact Page</h2>
      {(submitted) && <p>Message sent successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
          {(errors.name) && <p>{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
          {(errors.email) && <p>{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" name="subject" className="form-control" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}/>
          {(errors.subject) && <p>{errors.subject}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea type="text" id="message" name="message" className="form-control" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
          {(errors.message) && <p>{errors.message}</p>}
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" checked={formData.consent} onChange={(e) => setFormData({...formData, consent: e.target.checked})}/>&nbsp; I agree to be contacted.
          </label>
          {(errors.consent) && <p>{errors.consent}</p>}
        </div>
        <br/>
        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </form>
      <br/>
      <Link to="/messages">
        <button className="btn btn-secondary">
          View Messages
        </button>
      </Link>
    </div>
  );
};

export default Contact;
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("sponsorForm");
  if (!form) {
    console.error("Form not found");
    return;
  }

  const submitBtn = document.getElementById("submitBtn");
  const formAlert = document.getElementById("formAlert");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (submitBtn) {
      submitBtn.querySelector(".btn-text")?.style &&
        (submitBtn.querySelector(".btn-text").style.display = "none");

      submitBtn.querySelector(".btn-loader")?.style &&
        (submitBtn.querySelector(".btn-loader").style.display = "inline-block");
    }

    const data = {
      name: document.getElementById("sponsor-name")?.value || "",
      email: document.getElementById("sponsor-email")?.value || "",
      phone: document.getElementById("sponsor-phone")?.value || "",
      message: document.getElementById("sponsor-message")?.value || "",
    };

    console.log("Submitting:", data);
    
    const API_URL = window.location.hostname === 'localhost'
      ? 'http://localhost:5000/api/contact'
      : 'https://gio26.onrender.com/api/contact';

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (formAlert) {
        formAlert.style.display = "block";
        
        if (result.success) {
          // ⭐ UPDATED: Show personalized success message with user's email
          formAlert.style.background = "#D1FAE5";
          formAlert.style.color = "#065F46";
          formAlert.textContent = "Thank you " + data.name + "! Your message has been sent. We will contact you soon at " + data.email;
        } else {
          // Error from server
          formAlert.style.background = "#FEE2E2";
          formAlert.style.color = "#991B1B";
          formAlert.textContent = result.message || "Submission failed.";
        }
      }

      if (result.success) {
        form.reset();
      }

    } catch (error) {
      console.error(error);

      if (formAlert) {
        formAlert.style.display = "block";
        formAlert.style.background = "#FEE2E2";
        formAlert.style.color = "#991B1B";
        formAlert.textContent = "Submission failed. Please try again later.";
      }

    } finally {
      if (submitBtn) {
        submitBtn.querySelector(".btn-text")?.style &&
          (submitBtn.querySelector(".btn-text").style.display = "inline");

        submitBtn.querySelector(".btn-loader")?.style &&
          (submitBtn.querySelector(".btn-loader").style.display = "none");
      }
    }
  });

});
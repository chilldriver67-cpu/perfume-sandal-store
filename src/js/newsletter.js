// ==========================
// NEWSLETTER FORM LOGIC
// Handles validation and submission feedback
// ==========================

export function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("newsletter-email");
  const message = document.getElementById("newsletter-message");

  if (!form || !emailInput || !message) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const isValidEmail = email.includes("@") && email.length > 3;

    if (!isValidEmail) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    // Real submission to Supabase/email service will replace this in v2.0
    showMessage("Thank you for subscribing!", "success");
    form.reset();
  });

  function showMessage(text, type) {
    message.textContent = text;
    message.hidden = false;
    message.className = `newsletter__message newsletter__message--${type}`;
  }
}

// Capture du numéro et appel backend pour envoi WhatsApp
const formAcces = document.getElementById("form-acces");
if (formAcces) {
  formAcces.addEventListener("submit", (e) => {
    e.preventDefault();
    const numero = document.getElementById("numero").value.trim();
    if (!numero.startsWith("+")) {
      alert("Numéro invalide (inclure l’indicatif +)");
      return;
    }
    localStorage.setItem("whatsapp", numero);
    fetch("/api/send-whatsapp-link.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numero })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("✅ Lien envoyé sur WhatsApp !");
      } else {
        alert("❌ Échec de l'envoi. Vérifie le backend.");
      }
    });
  });
}

// Vérification sur app.html
const params = new URLSearchParams(window.location.search);
const numeroURL = params.get("whatsapp");
const numeroStocké = localStorage.getItem("whatsapp");

if (numeroURL && numeroStocké && numeroURL === numeroStocké) {
  const msg = document.getElementById("confirmation-message");
  if (msg) msg.textContent = "✅ Accès vérifié avec succès.";
} else if (numeroURL) {
  alert("Accès refusé : numéro non reconnu.");
  window.location.href = "index.html";
}


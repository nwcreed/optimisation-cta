(async () => {
  const scriptElement = document.currentScript;
  const queryParams = new URLSearchParams(scriptElement.src.split("?")[1]);

  const websiteId = queryParams.get("websiteId") || "defaultWebsiteId";
  const userId = queryParams.get("userId") || "defaultUserId";

  console.log("Website ID:", websiteId);
  console.log("User ID:", userId);

  const buttons = [...document.querySelectorAll("button, a, [role='button'], .btn")].map(button => {
    const buttonStyle = window.getComputedStyle(button);
    const rect = button.getBoundingClientRect();
    
    // Ajout du tracking des clics
    button.addEventListener("click", async () => {
      const clickData = {
        websiteId,
        userId,
        buttonId: button.id || null,
        text: button.textContent.trim(),
        timestamp: new Date().toISOString(),
      };

      console.log("🖱️ Click détecté :", clickData);

      try {
        const response = await fetch("http://localhost:3000/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clickData),
        });

        const result = await response.json();
        console.log("✅ Réponse API :", result);
      } catch (error) {
        console.error("❌ Erreur d’envoi du clic :", error);
      }
    });

    return {
      text: button.textContent.trim(),
      className: button.className || null,
      buttonId: button.id || null,
      bgColor: buttonStyle.backgroundColor,
      textColor: buttonStyle.color,
      width: button.offsetWidth,
      height: button.offsetHeight,
      positionX: rect.left,
      positionY: rect.top,
    };
  });

  console.log("📤 Envoi du scan...", { websiteId, userId, buttons });

  try {
    const response = await fetch("http://localhost:3000/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ websiteId, userId, buttons }),
    });

    const result = await response.json();
    console.log("✅ Réponse API scan :", result);
  } catch (error) {
    console.error("❌ Erreur d’envoi du scan :", error);
  }
})();
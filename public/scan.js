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
      element: button, // Référence HTML pour modification
      data: {
        text: button.textContent.trim(),
        className: button.className || null,
        buttonId: button.id || null,
        bgColor: buttonStyle.backgroundColor,
        textColor: buttonStyle.color,
        width: button.offsetWidth,
        height: button.offsetHeight,
        positionX: rect.left,
        positionY: rect.top,
      },
    };
  });

  console.log("📤 Envoi du scan...", { websiteId, userId, buttons: buttons.map(b => b.data) });

  try {
    const scanResponse = await fetch("http://localhost:3000/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ websiteId, userId, buttons: buttons.map(b => b.data) }),
    });

    const scanResult = await scanResponse.json();
    console.log("✅ Réponse API scan :", scanResult);

    // Appel immédiat de l'API pour récupérer les variantes
    try {
      const variantResponse = await fetch("http://localhost:3000/api/variant/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ websiteId, buttons: buttons.map(b => b.data) }),
      });

      const variantResult = await variantResponse.json();
      console.log("✅ Réponse API check-variants :", variantResult);

      // Appliquer immédiatement les variantes
      if (variantResult.success && variantResult.foundVariants.length > 0) {
        variantResult.foundVariants.forEach(variantData => {
          const buttonObj = buttons.find(b => b.data.text === variantData.buttonText);
          if (buttonObj && buttonObj.element) {
            const variant = variantData.variants[0]; // Première variante trouvée

            console.log(`✨ Remplacement du bouton "${buttonObj.data.text}" par une variante !`);

            // Appliquer les styles et le texte de la variante
            buttonObj.element.textContent = variant.text || buttonObj.data.text;
            buttonObj.element.style.backgroundColor = variant.bgColor || buttonObj.data.bgColor;
            buttonObj.element.style.color = variant.textColor || buttonObj.data.textColor;
            buttonObj.element.style.width = variant.width ? `${variant.width}px` : `${buttonObj.data.width}px`;
            buttonObj.element.style.height = variant.height ? `${variant.height}px` : `${buttonObj.data.height}px`;
          }
        });
      }

    } catch (variantError) {
      console.error("❌ Erreur lors de la vérification des variantes :", variantError);
    }

  } catch (error) {
    console.error("❌ Erreur d’envoi du scan :", error);
  }
})();

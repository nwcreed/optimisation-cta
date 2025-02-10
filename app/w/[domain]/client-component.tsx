"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type ButtonScan = {
  id: string;
  text: string;
  isActive: boolean;
  clicksCount: number; // Nombre de clics
};

type WebsiteClientProps = {
  website: { buttonScans: ButtonScan[] };
};

export default function WebsiteClient({ website }: WebsiteClientProps) {
  const [buttons, setButtons] = useState(website.buttonScans);
  const [loading, setLoading] = useState<string | null>(null);

  // Fonction pour récupérer les clics en temps réel
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updatedButtons = await Promise.all(
          buttons.map(async (button) => {
            const res = await fetch(`/api/button/${button.id}/clicks`);
            if (!res.ok) return button;
            const data = await res.json();
            return { ...button, clicksCount: data.clicksCount };
          })
        );
        setButtons(updatedButtons);
      } catch (error) {
        console.error("Error fetching clicks:", error);
      }
    }, 5000); // Mise à jour toutes les 5 secondes

    return () => clearInterval(interval);
  }, [buttons]);

  // Fonction pour gérer l'activation du bouton
  const toggleButtonState = async (buttonId: string, currentState: boolean) => {
    setLoading(buttonId); // Mettre en mode "loading" pour le bouton en cours de modification

    try {
      const res = await fetch(`/api/button/${buttonId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentState }),
      });

      if (!res.ok) throw new Error("Failed to update button state");

      const updatedButton = await res.json();
      setButtons((prev) =>
        prev.map((btn) => (btn.id === buttonId ? { ...btn, isActive: updatedButton.isActive } : btn))
      );
    } catch (error) {
      console.error("Error updating button:", error);
    } finally {
      setLoading(null); // Désactiver le mode "loading"
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
      <div className="w-full max-w-lg p-6">
        <div className="flex flex-col items-center space-y-4">
          {buttons.length === 0 ? (
            <>
              <h1 className="text-2xl font-semibold text-center">Scanning the page...</h1>
              <Loader2 className="animate-spin text-indigo-500" size={48} />
              <p className="mt-4 text-sm text-gray-600">Please wait while we scan the buttons.</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-center">Detected Buttons</h1>
              <ul className="w-full space-y-3">
                {buttons.map((button) => (
                  <li key={button.id} className="p-4 border rounded-lg flex justify-between items-center shadow-sm">
                    <div>
                      <p className="text-gray-700 font-medium">Button ID: {button.id}</p>
                      <p className="text-gray-500 text-sm">Text: {button.text}</p>
                      <p className="text-indigo-500 font-semibold">Clicks: {button.clicksCount}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm">{button.isActive ? "Active" : "Inactive"}</span>
                      <Switch
                        checked={button.isActive}
                        onCheckedChange={() => toggleButtonState(button.id, button.isActive)}
                        disabled={loading === button.id}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

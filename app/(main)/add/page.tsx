"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react"; // Ajout de l'import pour récupérer l'utilisateur

function OnBoardingPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession(); // Utilisation de la session pour obtenir l'utilisateur

  const logDomain = async () => {
    if (domain.trim() === "" || loading) return; // Si le domaine est vide ou en cours de chargement, ne rien faire
    setLoading(true);
    try {
      // Récupérer l'ID de l'utilisateur depuis la session
      const userId = session?.user?.id || "Unknown ID"; 

      // Envoi de la requête à l'API pour enregistrer le domaine
      const response = await fetch("/api/websites", {  // Mise à jour de l'URL de l'API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain: domain.trim(), userId }), // Passage du domaine et userId
      });

      // Vérification de la réponse
      if (response.ok) {
        const data = await response.json(); // Essayez de parser la réponse JSON
        console.log("Response data:", data); // Pour vérifier la structure de la réponse
        setLoading(false);
        setStep(2); // Passer à l'étape suivante
      } else {
        const errorData = await response.json(); // Essayez de récupérer l'erreur, si elle existe
        setError(errorData.error || "An error occurred. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error during processing:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      domain.trim().includes("http") ||
      domain.trim().includes("http://") ||
      domain.trim().includes("https://") ||
      domain.trim().includes("://") ||
      domain.trim().includes(":") ||
      domain.trim().includes("/")
    ) {
      setError("Please enter only the domain. Example: google.com");
    } else {
      setError("");
    }
  }, [domain]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
      <div className="w-full max-w-lg p-6">
        {step === 1 ? (
          <div className="flex flex-col space-y-6">
            <h1 className="text-2xl font-semibold text-center">Add a Domain</h1>
            <div>
              <label
                htmlFor="domain"
                className="block text-sm font-medium text-gray-700"
              >
                Domain
              </label>
              <Input
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value.trim().toLowerCase())}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="example.com"
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
            <Button
              disabled={!!error || loading}
              onClick={logDomain}
              className={`w-full px-4 py-2 focus:outline-none`}
            >
              {loading ? "Adding..." : "Add Domain"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col space-y-6">
            <h1 className="text-2xl font-semibold text-center">
              Tracking Script
            </h1>
            <div className="flex items-center space-x-4">
              <textarea
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-gray-100 cursor-pointer resize-none"
                disabled
                value={`<script defer data-domain="${domain}" src="https://monitoryour.website/tracking-script.js"></script>`}
              />
              <Button
                onClick={() => {
                  const text = `<script defer data-domain="${domain}" src="https://monitoryour.website/tracking-script.js"></script>`;
                  navigator.clipboard
                    .writeText(text)
                    .then(() => alert("Tracking script copied to clipboard!"))
                    .catch((err) => console.error("Error copying text:", err));
                }}
                className="px-4 py-2 text-white bg-indigo-500 rounded-md focus:outline-none"
              >
                Copy
              </Button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Paste this script into the{" "}
              <b className="text-gray-700">{"<head>"}</b> of your website.
            </p>
            <Button
              onClick={() => router.push(`/w/${domain.trim()}`)}
              className="w-full px-4 py-2 rounded-md focus:outline-none"
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnBoardingPage;

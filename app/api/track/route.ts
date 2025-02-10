import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    console.log("📩 Nouvelle requête reçue !");

    // Récupérer les données de la requête
    const { websiteId, userId, text } = await req.json();
    console.log("📝 Données reçues :", { websiteId, userId, text });

    // Vérification des données requises
    if (!websiteId || !userId || !text) {
      console.error("❌ Données invalides !");
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    // Recherche du bouton principal
    let button = await prisma.buttonScan.findFirst({
      where: {
        websiteId: Number(websiteId),
        text: { equals: text.trim(), mode: "insensitive" },
      },
    });

    if (button) {
      console.log("✅ Bouton principal trouvé :", button);
    } else {
      console.warn(`⚠️ Aucun bouton principal trouvé pour "${text}"`);
    }

    // Recherche de la variante avec l'inclusion de buttonScan
    let variant = null;
    if (!button) {
      variant = await prisma.variant.findFirst({
        where: {
          text: { equals: text.trim(), mode: "insensitive" },
          buttonScan: { websiteId: Number(websiteId) },
        },
        include: {
          buttonScan: true, // Assure-toi d'inclure la relation buttonScan
        },
      });

      if (variant) {
        console.log(`✅ Variante trouvée : "${variant.text}" (ID: ${variant.id})`);
      } else {
        console.error(`❌ Aucun bouton ni variante trouvée pour "${text}"`);
        return NextResponse.json({ error: "Bouton ou variante non trouvée" }, { status: 404 });
      }
    }

    // ✅ Construction du `clickData` avec `buttonId` et `variantId`
    const clickData: any = {};

    if (button) {
      clickData.buttonId = button.id;
    }

    // Si une variante est trouvée, ajouter aussi le `buttonId` du `buttonScan` associé
    if (variant) {
      clickData.variantId = variant.id;
      if (variant.buttonScan) {
        clickData.buttonId = variant.buttonScan.id; // Récupérer le `buttonId` du `buttonScan` lié à la variante
      }
    }

    // Log des données avant l'insertion
    console.log("📊 Données du clic à enregistrer :", clickData);

    // Vérifier qu'au moins un des deux IDs est présent
    if (!clickData.buttonId) {
      console.error("❌ Impossible d'enregistrer le clic : aucun ID trouvé !");
      return NextResponse.json({ error: "Impossible d'enregistrer le clic" }, { status: 400 });
    }

    // Log détaillé avant création dans la DB
    console.log("🔍 Données avant la création dans la DB :", clickData);

    // Création du clic dans la base de données
    const click = await prisma.click.create({
      data: clickData,
    });

    // Log de la réponse de la base de données
    console.log("✅ Clic enregistré avec succès :", click);
    return NextResponse.json({ message: "Click enregistré", click }, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur API click:", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}

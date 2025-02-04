import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Récupération des données du clic
    const { websiteId, userId, text } = await req.json();

    // Vérifications des entrées
    if (!websiteId || !userId || !text) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    // Recherche du bouton actif dans la base de données
    const button = await prisma.buttonScan.findFirst({
      where: { text: text, websiteId: Number(websiteId) },
    });

    if (!button) {
      return NextResponse.json({ error: "Bouton non trouvé" }, { status: 404 });
    }

    // Log de l'état de isActive
    console.log(`🔍 Bouton "${button.text}" (ID: ${button.id}) - isActive: ${button.isActive}`);

    // Si le bouton est inactif, ne pas enregistrer le clic
    if (!button.isActive) {
      return NextResponse.json({ message: "Tracking désactivé pour ce bouton" }, { status: 200 });
    }

    // Enregistrement du clic
    const click = await prisma.click.create({
      data: {
        buttonId: button.id,
      },
    });

    console.log(`🖱️ Click enregistré sur "${button.text}" (ID: ${button.id})`);

    return NextResponse.json({ message: "Click enregistré", click }, { status: 200 });
  } catch (error) {
    console.error("Erreur API click:", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}

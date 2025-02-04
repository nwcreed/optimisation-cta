import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") throw new Error("Invalid JSON payload");

    const { websiteId, userId, buttons } = body;

    // Vérification des paramètres reçus
    if (!websiteId || !userId || !Array.isArray(buttons)) {
      return NextResponse.json(
        { success: false, message: "websiteId, userId et buttons sont obligatoires" },
        { status: 400 }
      );
    }

    if (isNaN(Number(websiteId))) {
      return NextResponse.json({ success: false, message: "WebsiteId invalide" }, { status: 400 });
    }

    console.log("🔍 Scan reçu :", { websiteId, userId, buttons });

    // Vérifier si le site existe et récupérer son propriétaire
    const website = await prisma.website.findUnique({
      where: { id: Number(websiteId) },
    });

    if (!website) {
      return NextResponse.json({ success: false, message: "Website non trouvé" }, { status: 404 });
    }

    // Vérifier que l'userId correspond bien au propriétaire du site
    if (website.userId !== userId) {
      return NextResponse.json(
        { success: false, message: "Accès refusé : cet utilisateur ne possède pas ce site" },
        { status: 403 }
      );
    }

    if (buttons.length === 0) {
      return NextResponse.json({ success: false, message: "Aucun bouton trouvé" }, { status: 400 });
    }

    // Traitement des boutons
    for (const btn of buttons) {
      if (!btn.text) continue; // Ignore les boutons sans texte

      const existingButton = await prisma.buttonScan.findFirst({
        where: { websiteId: Number(websiteId), text: btn.text, positionX: btn.positionX, positionY: btn.positionY },
      });

      if (existingButton) {
        await prisma.buttonScan.update({
          where: { id: existingButton.id },
          data: {
            className: btn.className || existingButton.className,
            buttonId: btn.buttonId || existingButton.buttonId,
            bgColor: btn.bgColor || existingButton.bgColor,
            textColor: btn.textColor || existingButton.textColor,
            width: btn.width || existingButton.width,
            height: btn.height || existingButton.height,
            positionX: btn.positionX,
            positionY: btn.positionY,
            createdAt: new Date(),
          },
        });
      } else {
        await prisma.buttonScan.create({
          data: {
            websiteId: Number(websiteId),
            text: btn.text,
            className: btn.className || null,
            buttonId: btn.buttonId || null,
            bgColor: btn.bgColor || null,
            textColor: btn.textColor || null,
            width: btn.width || null,
            height: btn.height || null,
            positionX: btn.positionX,
            positionY: btn.positionY,
          },
        });
      }
    }

    return NextResponse.json({ success: true, message: "Scan enregistré" });

  } catch (error: any) {
    console.error("❌ Erreur API /scan :", error);
    return NextResponse.json({ success: false, message: error.message || "Erreur serveur" }, { status: 500 });
  }
}
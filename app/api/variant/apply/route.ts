import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { websiteId, buttons } = body;

    if (!websiteId || !Array.isArray(buttons)) {
      return NextResponse.json({ success: false, message: "Données invalides" }, { status: 400 });
    }

    console.log("🔍 Vérification des variantes en cours...");

    let foundVariants = [];

    for (const btn of buttons) {
      const existingButton = await prisma.buttonScan.findFirst({
        where: {
          websiteId: Number(websiteId),
          text: btn.text,
          positionX: btn.positionX,
          positionY: btn.positionY,
        },
      });

      if (!existingButton) {
        console.log(`🚨 Aucun ButtonScan trouvé pour "${btn.text}"`);
        continue;
      }

      // Vérifier s'il y a un variant pour ce buttonScanId
      const variants = await prisma.variant.findMany({
        where: { buttonScanId: existingButton.id },
      });

      if (variants.length > 0) {
        foundVariants.push({ buttonText: btn.text, buttonScanId: existingButton.id, variants });
        console.log(`✅ Variant trouvé pour "${btn.text}" (ID: ${existingButton.id})`);
      } else {
        console.log(`❌ Aucun variant pour "${btn.text}" (ID: ${existingButton.id})`);
      }
    }

    return NextResponse.json({ success: true, message: "Vérification des variantes terminée", foundVariants });

  } catch (error: any) {
    console.error("❌ Erreur API /variant/apply :", error);
    return NextResponse.json({ success: false, message: "Erreur serveur" }, { status: 500 });
  }
}

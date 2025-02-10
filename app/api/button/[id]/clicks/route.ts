// app/api/button/[id]/clicks/route.ts
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;  // Attendre `params` avant de l'utiliser
    if (!id) return NextResponse.json({ error: "Missing button ID" }, { status: 400 });

    // Compter le nombre de clics pour ce bouton
    const clickCount = await prisma.click.count({
      where: {
        buttonId: id,
      },
    });

    return NextResponse.json({ clicksCount: clickCount });
  } catch (error) {
    console.error("Error fetching clicks:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

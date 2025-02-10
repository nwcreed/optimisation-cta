import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = await context.params; // ✅ Extraction correcte

    if (!id) {
      return NextResponse.json({ error: "Missing button ID" }, { status: 400 });
    }

    const { isActive } = await req.json();

    if (typeof isActive !== "boolean") {
      return NextResponse.json({ error: "Invalid isActive value" }, { status: 400 });
    }

    const updatedButton = await prisma.buttonScan.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json(updatedButton);
  } catch (error) {
    console.error("Error updating button:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

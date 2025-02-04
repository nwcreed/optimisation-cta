// app/api/websites/[id]/route.ts

import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma'; // Assurez-vous que vous avez configuré Prisma dans lib/prisma.ts

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Vérifiez si l'élément existe
    const website = await prisma.website.findUnique({
      where: { id: parseInt(id) },
    });

    if (!website) {
      return NextResponse.json({ message: 'Website not found' }, { status: 404 });
    }

    // Supprimer l'élément
    await prisma.website.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Website deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    // Type assertion pour indiquer que l'erreur est un objet Error
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Error deleting website', error: error.message }, { status: 500 });
    }

    // Dans le cas où l'erreur ne serait pas une instance d'Error
    return NextResponse.json({ message: 'Unknown error occurred', error: String(error) }, { status: 500 });
  }
}

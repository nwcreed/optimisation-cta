import { NextResponse } from 'next/server';
import {prisma} from '../../../lib/prisma'; // Assurez-vous que vous avez configuré Prisma
import { z } from 'zod';

const WebsiteSchema = z.object({
  domain: z.string(),
  userId: z.string(),
});

export async function POST(request: Request) {
  try {
    console.log('Received POST request to create website');

    // Parse request body
    const body = await request.json();
    console.log('Request body:', body);

    const result = WebsiteSchema.safeParse(body);

    if (!result.success) {
      console.error('Invalid data:', result.error);
      return NextResponse.json({ error: 'Invalid data provided' }, { status: 400 });
    }

    const { domain, userId } = result.data;
    console.log('Parsed data:', { domain, userId });

    // Vérifier si le domaine existe déjà
    const existingWebsite = await prisma.website.findUnique({
      where: { domain },
    });

    if (existingWebsite) {
      console.error(`Domain "${domain}" already exists.`);
      return NextResponse.json({ error: 'Domain already exists' }, { status: 400 });
    }

    // Création du site web dans la base de données
    const newWebsite = await prisma.website.create({
      data: {
        domain,
        userId,
      },
    });

    console.log('Website created:', newWebsite);
    return NextResponse.json(newWebsite, { status: 201 });

  } catch (error) {
    console.error('Error during website creation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";
import WebsiteClient from "./client-component";


type Props = {
  params: { domain: string };
};


export default async function WebsitePage({ params }: Props) {
  // Attend que params soit résolu
  const { domain } = await params;


  // Récupérer le website à partir de la base de données
  const website = await prisma.website.findUnique({
    where: { domain },
    include: { buttonScans: true }, // Inclure les boutons associés
  });


  // Si le site n'existe pas, on renvoie une page 404
  if (!website) {
    return notFound();
  }


  // On vérifie si des boutons existent
  const hasButtons = website.buttonScans.length > 0;


  return (
    <WebsiteClient website={website} />
  );
}

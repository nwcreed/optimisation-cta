// pages/dashboard.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth"; // Importer les options NextAuth du fichier de configuration
import Header from "@/components/ui/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma"; // Assurez-vous que vous avez une instance de Prisma configurée
import WebsiteList from "@/components/website-list"; // Importer le nouveau composant

const Dashboard = async () => {
  // Récupérer la session côté serveur
  const session = await getServerSession(authOptions);

  // Vérifier si l'utilisateur est connecté
  if (!session || !session.user?.id) {
    return <div>Vous devez être connecté pour accéder à ce tableau de bord.</div>;
  }

  // Récupérer les sites web associés à l'utilisateur
  const websites = await prisma.website.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="w-full items-center justify-end flex mb-6">
          <Link href={"/add"}>
            <Button> + Add Website</Button>
          </Link>
        </div>

        <WebsiteList websites={websites} />
      </main>
    </div>
  );
};

export default Dashboard;

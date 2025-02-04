'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Website } from "@prisma/client"; // Assurez-vous que le type est correctement importé de Prisma
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface WebsiteListProps {
  websites: Website[];
}

const WebsiteList: React.FC<WebsiteListProps> = ({ websites }) => {
  const [websitesState, setWebsitesState] = useState(websites);
  const [websiteToDelete, setWebsiteToDelete] = useState<Website | null>(null);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/websites/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the website");
      }

      // Mettre à jour l'état local pour retirer le site supprimé
      setWebsitesState((prevWebsites) =>
        prevWebsites.filter((website) => website.id !== id)
      );
    } catch (error) {
      console.error("Error deleting website:", error);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      {websitesState.length > 0 ? (
        <ul className="divide-y divide-gray-300">
          {websitesState.map((website) => (
            <li
              key={website.id}
              className="flex justify-between items-center py-4"
            >
              <div>
                <h3 className="text-lg font-medium">{website.domain}</h3>
                <p className="text-sm text-gray-500">
                  Created on: {new Date(website.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/w/${website.domain}`}>
                  <Button>
                    View
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete the website <strong>{website.domain}</strong>?
                    </AlertDialogDescription>
                    <div className="flex gap-2 mt-4">
                      <AlertDialogAction
                        onClick={() => {
                          handleDelete(website.id);
                        }}
                      >
                        Confirm
                      </AlertDialogAction>
                      <AlertDialogCancel>
                        Cancel
                      </AlertDialogCancel>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          No websites found. Please add one!
        </p>
      )}
    </div>
  );
};

export default WebsiteList;

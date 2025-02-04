"use client";

import React, { useState } from 'react';
import { useSession, signOut } from "next-auth/react"; // Utilisez useSession ici
import { Button } from './button'; // Utilisez le bouton de shadcn ici
import Image from 'next/image';
import Link from 'next/link';
import SessionProviderWrapper from '@/components/session-provider-wrapper'; // Importez votre SessionProvider

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <SessionProviderWrapper>
      <HeaderContent />
    </SessionProviderWrapper>
  );
};

// Composant contenu du Header
const HeaderContent: React.FC = () => {
  const { data: session } = useSession(); // Récupérer la session avec useSession
  const [dropdownOpen, setDropdownOpen] = useState(false); // État pour le dropdown

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Gérer l'ouverture/fermeture du dropdown
  };

  return (
    <header className="border-b">
      <nav className="bg-white border-gray-200 px-4 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

          <div className="flex items-center gap-4 ml-auto">
            {session?.user ? ( // Vérifier si l'utilisateur est connecté
              <>
                {/* Bouton shadcn qui redirige vers /view-forms */}
                <Link href="">
                  <Button className="bg-white text-black border border-black hover:bg-gray-200">
                    Dashboard
                  </Button>
                </Link>

                {/* Image comme bouton pour afficher le dropdown */}
                {session.user.image && (
                  <div onClick={toggleDropdown} className="relative cursor-pointer ml-4">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={32}
                      height={32}
                      className='rounded-full'
                    />
                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                        <ul className="py-1">    
                          <li>
                            <button
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                              onClick={() => signOut({ callbackUrl: '/' })} // Redirection après déconnexion
                            >
                              Sign Out
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <Link href="/api/auth/signin">
                <Button className="bg-white hover:bg-white text-black border border-black">
                  Sign in with Google
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

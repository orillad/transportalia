import { useEffect, useRef, useState } from "react";
import { Outlet, useMatches } from "react-router";
import { ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./Sidebar";
import { UserMenu } from "./UserMenu";
import { useCurrentUserAvatar } from "../hooks/useCurrentUserAvatar";
import { getUserFullName, mockCurrentUser } from "../mock/data";

type RouteHandle = {
  title?: string;
};

export function InternalLayout() {
  const matches = useMatches();
  const avatarSrc = useCurrentUserAvatar();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("Català");
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const languages = ["Català", "Castellà", "Anglès"];
  const pageTitle =
    [...matches]
      .reverse()
      .map((match) => (match.handle as RouteHandle | undefined)?.title)
      .find(Boolean) ?? "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showLanguageMenu &&
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLanguageMenu]);

  return (
    <SidebarProvider defaultOpen>
      <Sidebar />

      <SidebarInset className="h-screen overflow-hidden bg-white">
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 py-2">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="h-8 w-8 rounded-lg hover:bg-gray-100" />
            <h1 className="text-base font-semibold">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-2">
            <div ref={languageMenuRef} className="relative">
              <button
                onClick={() => setShowLanguageMenu((open) => !open)}
                className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span>{currentLanguage}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 top-full z-50 mt-2 w-32 rounded-lg border border-gray-200 bg-white shadow-lg">
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => {
                        setCurrentLanguage(language);
                        setShowLanguageMenu(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      {language}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <UserMenu
              userName={getUserFullName(mockCurrentUser)}
              userDNI={mockCurrentUser.dni}
              avatarSrc={avatarSrc}
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

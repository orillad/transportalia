import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import imgLogoGran from '../../assets/logos/image.png';

export function Header() {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('Català');
  const languageMenuRef = useRef<HTMLDivElement | null>(null);

  const languages = ['Català', 'Castellà', 'Anglès'];

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

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageMenu]);

  return (
    <div className="relative h-[72px] w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex h-10 w-[240px] items-center md:w-[280px]">
          <img alt="TRANSPORTALIA" src={imgLogoGran} className="h-full w-full object-contain object-left" />
        </Link>

        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div ref={languageMenuRef} className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              {currentLanguage}
              <svg
                className="w-4 h-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showLanguageMenu && (
              <div className="absolute top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLanguage(lang);
                      setShowLanguageMenu(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Login button */}
          <Link
            to="/login"
            className="whitespace-nowrap rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Accedir
          </Link>
        </div>
      </div>
    </div>
  );
}

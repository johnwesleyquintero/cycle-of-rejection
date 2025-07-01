import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Music, Menu, X } from "lucide-react";

export function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Discography", href: "/discography" },
    { name: "Tour", href: "/tour" },
    { name: "The Codex", href: "/codex" },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-brand-black/90 backdrop-blur-md border-b border-brand-gray-lighter/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-br from-brand-red to-brand-red-light rounded-lg group-hover:shadow-lg group-hover:shadow-brand-red/25 transition-all duration-300">
              <Music className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">
                Cycle of Rejection
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Official Band Page</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                  isActive(item.href)
                    ? "text-brand-red"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
                <span
                  className={`absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-brand-red to-brand-red-light transition-transform duration-200 ${
                    isActive(item.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-brand-gray-lighter/20">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                    isActive(item.href)
                      ? "text-brand-red bg-brand-red/10"
                      : "text-gray-300 hover:text-white hover:bg-brand-gray-lighter/20"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

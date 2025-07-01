import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";
import logo from "../../../public/logo.svg";

export function Footer() {
  return (
    <footer className="bg-brand-black border-t border-brand-gray-lighter/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-brand-red to-brand-red-light rounded-lg border border-black">
                <img
                  src={logo}
                  alt="CYCLE OF REJECTION Logo"
                  className="h-6 w-6 text-white"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  CYCLE OF REJECTION
                </h3>
                <p className="text-sm text-gray-400">Official Band Page</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Immerse yourself in our dark atmospheric soundscapes. Experience
              the journey through rejection, acceptance, and rebirth through our
              musical narrative.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigate</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Discography", href: "/discography" },
                { name: "Tour Dates", href: "/tour" },
                { name: "The Codex", href: "/codex" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-brand-red transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Youtube, href: "https://www.youtube.com/@CYCLEOFREJECTION", label: "YouTube" },
                { icon: Mail, href: "#", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 bg-brand-gray-lighter/20 hover:bg-brand-red/20 text-gray-400 hover:text-brand-red rounded-lg transition-all duration-200 hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-brand-gray-lighter/20">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 CYCLE OF REJECTION. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link
                to="#"
                className="text-gray-400 hover:text-brand-red text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-brand-red text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

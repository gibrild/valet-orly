

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Car, Phone, Calendar, CreditCard, HelpCircle, Home, Star, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: "Accueil", url: createPageUrl("Home"), icon: Home },
    { name: "Réservation", url: createPageUrl("Booking"), icon: Calendar },
    { name: "Comment ça marche", url: createPageUrl("HowItWorks"), icon: Car },
    { name: "Tarifs", url: createPageUrl("Pricing"), icon: CreditCard },
    { name: "Avis clients", url: createPageUrl("Reviews"), icon: Star },
    { name: "Contact", url: createPageUrl("Contact"), icon: Mail },
  ];

  const isActive = (url) => location.pathname === url;

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" richColors />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        :root {
          --primary: #0F172A;
          --secondary: #F97316;
          --accent: #1E40AF;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #F97316 0%, #FB923C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .smooth-shadow {
          box-shadow: 0 4px 24px -4px rgba(0, 0, 0, 0.08);
        }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px -8px rgba(0, 0, 0, 0.12);
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 smooth-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Car className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">OrlyValet</h1>
                <p className="text-xs text-slate-500">Votre voiturier premium</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.url)
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a href="tel:0647050633" className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">06 47 05 06 33</span>
              </a>
              <Link to={createPageUrl("Booking")}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  Réserver maintenant
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 bg-slate-900 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-slate-900 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-slate-900 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.url)
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-3 px-4">
                <a href="tel:0647050633" className="flex items-center justify-center gap-2 py-3 text-slate-600 border border-slate-200 rounded-lg">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">06 47 05 06 33</span>
                </a>
                <Link to={createPageUrl("Booking")} onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium">
                    Réserver maintenant
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="gradient-bg text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-bold">OrlyValet</span>
              </div>
              <p className="text-slate-300 text-sm">
                Votre service de voiturier premium à l'aéroport d'Orly. Parking sécurisé, service 7j/7.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {navigation.slice(0, 4).map((item) => (
                  <li key={item.name}>
                    <Link to={item.url} className="hover:text-orange-400 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <a href="tel:0647050633" className="hover:text-orange-400 transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    06 47 05 06 33
                  </a>
                </li>
                <li>
                  <a href="mailto:valetorly@gmail.com" className="hover:text-orange-400 transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    valetorly@gmail.com
                  </a>
                </li>
                <li className="text-slate-400">
                  Zone Orly / Athis-Mons / Juvisy
                </li>
              </ul>
            </div>

            {/* Horaires */}
            <div>
              <h3 className="font-semibold mb-4">Horaires</h3>
              <p className="text-slate-300 text-sm mb-2">Service disponible</p>
              <p className="text-orange-400 font-semibold">7 jours / 7</p>
              <p className="text-sm text-slate-400 mt-2">24h/24</p>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2025 OrlyValet - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


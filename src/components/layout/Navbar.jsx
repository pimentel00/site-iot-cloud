import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Thermometer, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy-900/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-lime-400/20 flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-lime-400" />
            </div>
            <span className="text-lg font-bold">
              Rio<span className="text-lime-400">Clima</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {isDashboard ? (
              <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                ← Voltar ao Início
              </Link>
            ) : (
              <>
                <a href="#inicio" className="text-sm text-gray-400 hover:text-white transition-colors">Início</a>
                <a href="#sobre" className="text-sm text-gray-400 hover:text-white transition-colors">Sobre</a>
                <a href="#funcionalidades" className="text-sm text-gray-400 hover:text-white transition-colors">Funcionalidades</a>
              </>
            )}
            <Link
              to="/dashboard"
              className="bg-lime-400 text-navy-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-lime-500 transition-colors"
            >
              Acessar Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-3">
            {isDashboard ? (
              <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-400 hover:text-white py-2">
                ← Voltar ao Início
              </Link>
            ) : (
              <>
                <a href="#inicio" onClick={() => setMenuOpen(false)} className="block text-gray-400 hover:text-white py-2">Início</a>
                <a href="#sobre" onClick={() => setMenuOpen(false)} className="block text-gray-400 hover:text-white py-2">Sobre</a>
                <a href="#funcionalidades" onClick={() => setMenuOpen(false)} className="block text-gray-400 hover:text-white py-2">Funcionalidades</a>
              </>
            )}
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block bg-lime-400 text-navy-900 px-5 py-2 rounded-full text-sm font-semibold text-center hover:bg-lime-500"
            >
              Acessar Dashboard
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

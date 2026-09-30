import { Thermometer } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-lime-400/20 flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-lime-400" />
              </div>
              <span className="text-lg font-bold">
                Rio<span className="text-lime-400">Clima</span> Monitor
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Monitoramento Ambiental Inteligente para o Rio de Janeiro.
              Dados em tempo real de sensores IoT.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-500 hover:text-lime-400 transition-colors">Início</Link></li>
              <li><Link to="/dashboard" className="text-sm text-gray-500 hover:text-lime-400 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Project Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Projeto Acadêmico</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Projeto desenvolvido para auxiliar projetos urbanísticos na cidade do Rio de Janeiro,
              focando em diminuir a temperatura média e melhorar a qualidade do ar.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Firebase', 'ESP-32', 'Tailwind CSS'].map((tech) => (
                <span key={tech} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-gray-600">© 2026 RioClima Monitor. Projeto Acadêmico.</p>
        </div>
      </div>
    </footer>
  );
}

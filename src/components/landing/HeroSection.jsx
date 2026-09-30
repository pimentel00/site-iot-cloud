import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(163,230,53,0.05),transparent_50%)]" />

      <div className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Label */}
        <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-6">
          ── RIOCLIMA MONITOR ──
        </p>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Monitoramento{' '}
          <span className="text-lime-400">Ambiental</span>{' '}
          Inteligente
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Dados em tempo real de temperatura, umidade e qualidade do ar para auxiliar
          projetos urbanísticos na cidade do Rio de Janeiro.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/dashboard"
            className="bg-lime-400 text-navy-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-lime-500 transition-colors"
          >
            Acessar Dashboard →
          </Link>
          <a
            href="#sobre"
            className="border border-white/20 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-white/5 transition-colors"
          >
            Sobre o Projeto
          </a>
        </div>

        {/* Pill Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {['🌡️ Temperatura', '💧 Umidade', '🌿 Qualidade do Ar'].map((label) => (
            <span
              key={label}
              className="text-sm px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/10 backdrop-blur-sm"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

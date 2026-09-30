export default function AboutSection() {
  const stats = [
    { value: '3', label: 'Dados Monitorados', desc: 'Temperatura, umidade e qualidade do ar' },
    { value: 'IoT', label: 'Conexão em Nuvem', desc: 'ESP-32 + Firebase Realtime Database' },
    { value: '5s', label: 'Tempo Real', desc: 'Dados atualizados a cada 5 segundos' },
  ];

  return (
    <section id="sobre" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <p className="text-xs tracking-[0.3em] text-lime-400 uppercase mb-4">O Projeto</p>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl">
          Monitoramento urbano para um Rio de Janeiro mais{' '}
          <span className="text-lime-400">sustentável</span>
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-lg max-w-2xl mb-16 leading-relaxed">
          Projeto acadêmico que visa monitorar áreas específicas da cidade do Rio de Janeiro
          para auxiliar nos projetos urbanísticos, focando em diminuir a temperatura média
          e melhorar a qualidade do ar da cidade.
        </p>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors group"
            >
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-lime-400/50 to-transparent" />
              <p className="text-4xl font-extrabold text-lime-400 mb-2">{stat.value}</p>
              <p className="text-lg font-semibold text-white mb-1">{stat.label}</p>
              <p className="text-sm text-gray-500">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

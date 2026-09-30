import { Thermometer, Droplets, Wind } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Thermometer,
      title: 'Temperatura',
      description: 'Sensor DHT22 medindo a temperatura do ar em °C. Dados plotados em gráficos de série temporal com gauges visuais.',
      color: '#f97316',
      bgColor: 'bg-orange-500/20',
    },
    {
      icon: Droplets,
      title: 'Umidade do Ar',
      description: 'Sensor DHT22 medindo a umidade relativa do ar em %. Essencial para conforto térmico urbano.',
      color: '#06b6d4',
      bgColor: 'bg-cyan-500/20',
    },
    {
      icon: Wind,
      title: 'Qualidade do Ar',
      description: 'Sensor MQ-135 medindo a poluição do ar em %. Indicador crucial para saúde pública e planejamento urbano.',
      color: '#22c55e',
      bgColor: 'bg-green-500/20',
    },
  ];

  return (
    <section id="funcionalidades" className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-800/30">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <p className="text-xs tracking-[0.3em] text-lime-400 uppercase mb-4">Funcionalidades</p>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Três métricas. <span className="text-lime-400">Dados em tempo real.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-16 max-w-2xl">
          Sensores conectados ao ESP-32 monitorando as condições ambientais da cidade.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:scale-[1.02] transition-transform cursor-default"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6`}
              >
                <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

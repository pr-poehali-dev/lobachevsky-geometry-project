import Icon from "@/components/ui/icon";
import { theoryTopics } from "./types";

export default function TheorySection() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-golos mb-4 uppercase tracking-widest">
            <div className="w-6 h-px bg-cyan-400" />
            Учебные материалы
          </div>
          <h1 className="font-cormorant text-5xl font-bold text-white mb-4">Теория</h1>
          <p className="font-golos text-white/50 text-base max-w-xl">
            Структурированный курс по геометрии Лобачевского от базовых концепций до продвинутых тем.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-10">
          {["Все темы", "Начальный", "Средний", "Продвинутый"].map((f, i) => (
            <button key={f} className={`px-4 py-1.5 rounded-full text-sm font-golos transition-all ${i === 0 ? "bg-cyan-400/15 text-cyan-400 border border-cyan-400/30" : "border border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {theoryTopics.map((t, i) => (
            <div key={t.id} className="glass-card rounded-2xl p-6 hover:border-cyan-400/25 transition-all duration-300 hover:scale-[1.01] cursor-pointer group animate-fadeInUp"
              style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.levelColor === "cyan" ? "bg-cyan-400/10 text-cyan-400" : t.levelColor === "violet" ? "bg-violet-400/10 text-violet-400" : "bg-blue-400/10 text-blue-400"}`}>
                  <Icon name={t.icon} size={18} />
                </div>
                <span className={`text-xs font-golos px-2.5 py-1 rounded-full ${t.levelColor === "cyan" ? "bg-cyan-400/10 text-cyan-400" : t.levelColor === "violet" ? "bg-violet-400/10 text-violet-400" : "bg-blue-400/10 text-blue-400"}`}>
                  {t.level}
                </span>
              </div>
              <h3 className="font-cormorant text-xl font-semibold text-white mb-2 group-hover:text-cyan-100 transition-colors">{t.title}</h3>
              <p className="font-golos text-white/50 text-sm leading-relaxed mb-4">{t.desc}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-white/30 text-xs font-golos">
                  <Icon name="Clock" size={12} />
                  {t.duration}
                </div>
                <div className="flex items-center gap-1 text-cyan-400/60 text-xs font-golos group-hover:text-cyan-400 transition-colors">
                  Читать <Icon name="ChevronRight" size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 p-6 rounded-2xl border border-violet-500/20 bg-violet-500/5">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-violet-400/10 flex items-center justify-center flex-shrink-0 text-violet-400">
              <Icon name="Lightbulb" size={18} />
            </div>
            <div>
              <h4 className="font-cormorant text-lg font-semibold text-white mb-1">Совет по изучению</h4>
              <p className="font-golos text-white/50 text-sm leading-relaxed">
                Рекомендуем начинать с первой темы и двигаться последовательно.
                Каждая тема строится на предыдущей. Параллельно решайте задачи для закрепления.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

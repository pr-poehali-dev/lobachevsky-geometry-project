import Icon from "@/components/ui/icon";
import { materials } from "./types";

export default function MaterialsSection() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-golos mb-4 uppercase tracking-widest">
            <div className="w-6 h-px bg-blue-400" />
            Библиотека
          </div>
          <h1 className="font-cormorant text-5xl font-bold text-white mb-4">Материалы</h1>
          <p className="font-golos text-white/50 text-base max-w-xl">
            Подборка ключевых книг, статей и видео для глубокого изучения геометрии Лобачевского.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-10">
          {["Все", "Книга", "Учебник", "Статья", "Видео", "Задачник"].map((f, i) => (
            <button key={f} className={`px-4 py-1.5 rounded-full text-sm font-golos transition-all ${i === 0 ? "bg-blue-400/15 text-blue-400 border border-blue-400/30" : "border border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {materials.map((m, i) => (
            <div key={m.id} className="glass-card rounded-2xl p-6 hover:border-blue-400/20 transition-all duration-300 hover:scale-[1.01] cursor-pointer group animate-fadeInUp"
              style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.tagColor === "cyan" ? "bg-cyan-400/10 text-cyan-400" : m.tagColor === "violet" ? "bg-violet-400/10 text-violet-400" : "bg-blue-400/10 text-blue-400"}`}>
                  <Icon name={m.icon} size={18} />
                </div>
                <span className={`text-xs font-golos px-2.5 py-1 rounded-full ${m.tagColor === "cyan" ? "bg-cyan-400/10 text-cyan-400" : m.tagColor === "violet" ? "bg-violet-400/10 text-violet-400" : "bg-blue-400/10 text-blue-400"}`}>
                  {m.tag}
                </span>
              </div>
              <h3 className="font-cormorant text-xl font-semibold text-white mb-1 group-hover:text-blue-100 transition-colors leading-tight">{m.title}</h3>
              <div className="flex items-center gap-2 text-white/30 text-xs font-golos mb-3">
                <span>{m.author}</span><span>·</span><span>{m.year}</span>
              </div>
              <p className="font-golos text-white/50 text-sm leading-relaxed">{m.desc}</p>
              <div className="mt-5 flex items-center gap-1.5 text-blue-400/50 text-xs font-golos group-hover:text-blue-400 transition-colors">
                <Icon name="ExternalLink" size={13} />
                Открыть
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 p-6 rounded-2xl border border-cyan-500/15 bg-gradient-to-r from-cyan-500/5 to-violet-500/5">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div>
              <h4 className="font-cormorant text-xl font-semibold text-white mb-1">Знаете полезный ресурс?</h4>
              <p className="font-golos text-white/40 text-sm">Предложите материал — и мы добавим его в библиотеку.</p>
            </div>
            <button className="flex-shrink-0 px-5 py-2.5 rounded-xl border border-cyan-400/30 text-cyan-400 font-golos text-sm hover:bg-cyan-400/10 transition-colors">
              Предложить материал
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

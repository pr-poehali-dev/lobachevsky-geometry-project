import { useState } from "react";
import Icon from "@/components/ui/icon";
import { tasks } from "./types";

export default function TasksSection() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-violet-400 text-xs font-golos mb-4 uppercase tracking-widest">
            <div className="w-6 h-px bg-violet-400" />
            Практика
          </div>
          <h1 className="font-cormorant text-5xl font-bold text-white mb-4">Задачи</h1>
          <p className="font-golos text-white/50 text-base max-w-xl">
            Проверьте и закрепите понимание через практические задачи разного уровня сложности.
          </p>
        </div>
        <div className="space-y-4">
          {tasks.map((t, i) => (
            <div key={t.id}
              className={`rounded-2xl transition-all duration-300 cursor-pointer animate-fadeInUp ${selected === t.id ? "glass-card-violet border-violet-400/30 scale-[1.01]" : "glass-card hover:border-white/20"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => setSelected(selected === t.id ? null : t.id)}>
              <div className="p-6 flex items-start gap-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-cormorant text-lg font-bold ${t.diffColor === "cyan" ? "bg-cyan-400/10 text-cyan-400" : t.diffColor === "violet" ? "bg-violet-400/10 text-violet-400" : "bg-blue-400/10 text-blue-400"}`}>
                  {t.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-cormorant text-xl font-semibold text-white">{t.title}</h3>
                    <span className={`text-xs font-golos px-2 py-0.5 rounded-full ${t.diffColor === "cyan" ? "bg-cyan-400/10 text-cyan-400" : t.diffColor === "violet" ? "bg-violet-400/10 text-violet-400" : "bg-blue-400/10 text-blue-400"}`}>
                      {t.difficulty}
                    </span>
                    <span className="text-xs font-golos text-white/30 border border-white/10 px-2 py-0.5 rounded-full">{t.topic}</span>
                  </div>
                  {selected === t.id && (
                    <p className="font-golos text-white/60 text-sm leading-relaxed mt-3 animate-fadeIn">{t.desc}</p>
                  )}
                </div>
                <div className={`text-white/30 transition-transform duration-200 ${selected === t.id ? "rotate-180" : ""}`}>
                  <Icon name="ChevronDown" size={18} />
                </div>
              </div>
              {selected === t.id && (
                <div className="px-6 pb-6 animate-fadeIn">
                  <div className="border-t border-white/5 pt-5 flex flex-wrap gap-3">
                    <button className="px-5 py-2.5 rounded-xl bg-violet-400/15 text-violet-400 border border-violet-400/25 font-golos text-sm hover:bg-violet-400/25 transition-colors">
                      Решить задачу
                    </button>
                    <button className="px-5 py-2.5 rounded-xl border border-white/10 text-white/50 font-golos text-sm hover:border-white/25 hover:text-white/80 transition-colors">
                      Посмотреть подсказку
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-cormorant text-xl font-semibold text-white">Прогресс</h3>
            <span className="font-golos text-white/30 text-sm">0 / {tasks.length} решено</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-500" />
          </div>
          <p className="font-golos text-white/30 text-xs mt-3">Начните решать задачи, чтобы отслеживать свой прогресс</p>
        </div>
      </div>
    </div>
  );
}

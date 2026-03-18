import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { Section, HERO_IMAGE } from "./types";

function HyperbolicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) / 2 - 10;
    ctx.clearRect(0, 0, W, H);
    const grad = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R);
    grad.addColorStop(0, "rgba(0,245,255,0.0)");
    grad.addColorStop(1, "rgba(0,245,255,0.15)");
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,245,255,0.5)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    const geodesics = [0, 30, 60, 90, 120, 150];
    geodesics.forEach((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const p1x = cx + R * Math.cos(rad);
      const p1y = cy + R * Math.sin(rad);
      const p2x = cx - R * Math.cos(rad);
      const p2y = cy - R * Math.sin(rad);
      const offset = 0.4 * R;
      const perpX = -Math.sin(rad) * offset;
      const perpY = Math.cos(rad) * offset;
      const alpha = 0.08 + (i % 2) * 0.06;
      ctx.beginPath();
      ctx.moveTo(p1x, p1y);
      ctx.quadraticCurveTo(cx + perpX, cy + perpY, p2x, p2y);
      ctx.strokeStyle = `rgba(0,245,255,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(p1x, p1y);
      ctx.quadraticCurveTo(cx - perpX, cy - perpY, p2x, p2y);
      ctx.strokeStyle = `rgba(180,75,255,${alpha})`;
      ctx.stroke();
    });
    [0.25, 0.5, 0.75].forEach((r, i) => {
      ctx.beginPath();
      ctx.arc(cx, cy, R * r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,245,255,${0.04 + i * 0.03})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,245,255,0.8)";
    ctx.fill();
  }, []);
  return <canvas ref={canvasRef} width={320} height={320} className="opacity-70" />;
}

export default function HomeSection({ setActive }: { setActive: (s: Section) => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative flex-1 flex items-center pt-24 pb-16 overflow-hidden grid-bg">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-golos animate-fadeIn">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Образовательный курс
              </div>
              <h1 className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fadeInUp">
                <span className="text-white">Геометрия</span>
                <br />
                <span className="gradient-text">Лобачевского</span>
              </h1>
              <p className="font-golos text-white/60 text-lg leading-relaxed animate-fadeInUp delay-200">
                Откройте мир, где параллельные прямые пересекаются, сумма углов треугольника
                меньше 180°, и пространство изогнуто за пределами воображения.
              </p>
              <div className="flex flex-wrap gap-3 animate-fadeInUp delay-300">
                <button onClick={() => setActive("theory")}
                  className="px-6 py-3 rounded-xl bg-cyan-400 text-[#070d1a] font-golos font-semibold text-sm hover:bg-cyan-300 transition-all duration-200 hover:scale-105 active:scale-95">
                  Начать изучение
                </button>
                <button onClick={() => setActive("tasks")}
                  className="px-6 py-3 rounded-xl border border-white/20 text-white font-golos text-sm hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-200">
                  Решать задачи
                </button>
              </div>
              <div className="flex gap-8 pt-4 animate-fadeInUp delay-400">
                {[{ value: "6", label: "тем в курсе" }, { value: "4", label: "типа задач" }, { value: "XIX", label: "век открытия" }].map((s) => (
                  <div key={s.label}>
                    <div className="font-cormorant text-3xl font-bold neon-text-cyan">{s.value}</div>
                    <div className="font-golos text-white/40 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center animate-fadeIn delay-200">
              <div className="animate-rotateSlow">
                <HyperbolicCanvas />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={HERO_IMAGE} alt="Гиперболическая геометрия" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d1a] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070d1a] via-transparent to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="text-center mb-12">
          <h2 className="font-cormorant text-4xl font-bold text-white mb-3">Что вас ждёт</h2>
          <p className="font-golos text-white/50 text-base">Полноценный курс от основ до продвинутых тем</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "BookOpen", title: "Теория", desc: "6 тем: от постулатов до применения в физике. Чёткое объяснение с визуализациями.", color: "cyan", onClick: () => setActive("theory") },
            { icon: "PenTool", title: "Задачи", desc: "Практические задачи трёх уровней сложности для закрепления материала.", color: "violet", onClick: () => setActive("tasks") },
            { icon: "Library", title: "Материалы", desc: "Книги, статьи и видео — всё необходимое для глубокого погружения в тему.", color: "blue", onClick: () => setActive("materials") },
          ].map((f, i) => (
            <button key={f.title} onClick={f.onClick}
              className="group text-left p-6 rounded-2xl glass-card transition-all duration-300 hover:scale-[1.02] animate-fadeInUp"
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color === "cyan" ? "bg-cyan-400/10 text-cyan-400" : f.color === "violet" ? "bg-violet-400/10 text-violet-400" : "bg-blue-400/10 text-blue-400"}`}>
                <Icon name={f.icon} size={22} />
              </div>
              <h3 className="font-cormorant text-2xl font-semibold text-white mb-2">{f.title}</h3>
              <p className="font-golos text-white/50 text-sm leading-relaxed">{f.desc}</p>
              <div className={`mt-4 flex items-center gap-1.5 text-xs font-golos group-hover:gap-2.5 transition-all ${f.color === "cyan" ? "text-cyan-400" : f.color === "violet" ? "text-violet-400" : "text-blue-400"}`}>
                Перейти <Icon name="ArrowRight" size={14} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="font-cormorant text-2xl md:text-3xl text-white/70 italic leading-relaxed">
            «Я открыл новый, особенный мир в пространстве, для которого нет ничего невозможного»
          </div>
          <div className="mt-4 font-golos text-sm text-white/30">— Николай Иванович Лобачевский, 1826</div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "theory" | "tasks" | "materials";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/eab959bf-4b6c-4538-bebd-bb34f817048c/files/ec01ff37-7273-416c-aa85-e164beb02ebf.jpg";

const theoryTopics = [
  {
    id: 1,
    icon: "Circle",
    title: "Основы гиперболической геометрии",
    level: "Начальный",
    levelColor: "cyan",
    desc: "Постулаты Лобачевского, отличия от евклидовой геометрии. Параллельные прямые в новом свете.",
    duration: "45 мин",
  },
  {
    id: 2,
    icon: "Infinity",
    title: "Модель Пуанкаре",
    level: "Средний",
    levelColor: "violet",
    desc: "Диск Пуанкаре как визуальное представление гиперболической плоскости. Геодезические линии.",
    duration: "60 мин",
  },
  {
    id: 3,
    icon: "Triangle",
    title: "Гиперболические треугольники",
    level: "Средний",
    levelColor: "violet",
    desc: "Сумма углов треугольника, дефект треугольника, связь с кривизной пространства.",
    duration: "50 мин",
  },
  {
    id: 4,
    icon: "Waves",
    title: "Тригонометрия Лобачевского",
    level: "Продвинутый",
    levelColor: "blue",
    desc: "Гиперболические функции, теоремы синусов и косинусов для гиперболической плоскости.",
    duration: "75 мин",
  },
  {
    id: 5,
    icon: "Globe",
    title: "Модель Клейна",
    level: "Продвинутый",
    levelColor: "blue",
    desc: "Проективная модель гиперболической геометрии, прямые и расстояния в модели Клейна.",
    duration: "65 мин",
  },
  {
    id: 6,
    icon: "Layers",
    title: "Применение в физике",
    level: "Продвинутый",
    levelColor: "blue",
    desc: "Специальная теория относительности и пространство Минковского. Связь с теорией групп.",
    duration: "80 мин",
  },
];

const tasks = [
  {
    id: 1,
    title: "Параллельные прямые",
    difficulty: "Лёгкая",
    diffColor: "cyan",
    topic: "Основы",
    desc: "Через точку вне прямой проведите все параллельные данной прямой в модели Пуанкаре.",
  },
  {
    id: 2,
    title: "Сумма углов треугольника",
    difficulty: "Средняя",
    diffColor: "violet",
    topic: "Треугольники",
    desc: "Докажите, что сумма углов гиперболического треугольника всегда меньше 180°.",
  },
  {
    id: 3,
    title: "Расстояние в диске Пуанкаре",
    difficulty: "Средняя",
    diffColor: "violet",
    topic: "Модель Пуанкаре",
    desc: "Вычислите гиперболическое расстояние между точками (0, 0) и (0.5, 0.3).",
  },
  {
    id: 4,
    title: "Угол параллельности",
    difficulty: "Сложная",
    diffColor: "blue",
    topic: "Тригонометрия",
    desc: "Найдите угол параллельности для точки, удалённой на расстояние d от прямой.",
  },
];

const materials = [
  {
    id: 1,
    type: "Книга",
    icon: "BookOpen",
    title: "Геометрические исследования",
    author: "Н. И. Лобачевский",
    year: "1840",
    desc: "Оригинальная работа, заложившая основы неевклидовой геометрии.",
    tag: "Классика",
    tagColor: "cyan",
  },
  {
    id: 2,
    type: "Учебник",
    icon: "GraduationCap",
    title: "Основания геометрии",
    author: "Д. Гильберт",
    year: "1899",
    desc: "Аксиоматическое построение геометрии, включая неевклидовы случаи.",
    tag: "Учебник",
    tagColor: "violet",
  },
  {
    id: 3,
    type: "Статья",
    icon: "FileText",
    title: "Визуализация в модели Пуанкаре",
    author: "М. К. Эшер",
    year: "1958",
    desc: "Художественное и математическое исследование симметрий гиперболической плоскости.",
    tag: "Визуал",
    tagColor: "cyan",
  },
  {
    id: 4,
    type: "Видео",
    icon: "Play",
    title: "Введение в гиперболическую геометрию",
    author: "3Blue1Brown",
    year: "2023",
    desc: "Анимированное объяснение основных концепций гиперболической геометрии.",
    tag: "Видео",
    tagColor: "violet",
  },
  {
    id: 5,
    type: "Статья",
    icon: "Link",
    title: "Геометрия и теория относительности",
    author: "А. Эйнштейн",
    year: "1916",
    desc: "Как неевклидова геометрия описывает кривизну пространства-времени.",
    tag: "Физика",
    tagColor: "blue",
  },
  {
    id: 6,
    type: "Задачник",
    icon: "PenTool",
    title: "Сборник задач по гиперболической геометрии",
    author: "В. Г. Болтянский",
    year: "1975",
    desc: "Практические задачи с решениями для углублённого изучения.",
    tag: "Практика",
    tagColor: "blue",
  },
];

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

function Navbar({ active, setActive }: { active: Section; setActive: (s: Section) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links: { key: Section; label: string }[] = [
    { key: "home", label: "Главная" },
    { key: "theory", label: "Теория" },
    { key: "tasks", label: "Задачи" },
    { key: "materials", label: "Материалы" },
  ];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3 bg-[rgba(7,13,26,0.95)] backdrop-blur-xl border-b border-cyan-500/10" : "py-5"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => setActive("home")} className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full border border-cyan-400/60 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
          </div>
          <span className="font-cormorant text-lg font-semibold text-white">Лобачевский</span>
        </button>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button key={l.key} onClick={() => setActive(l.key)}
              className={`px-4 py-2 rounded-lg font-golos text-sm transition-all duration-200 ${active === l.key ? "text-cyan-400 bg-cyan-400/10" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
              {l.label}
            </button>
          ))}
        </div>
        <button className="md:hidden text-white/60 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-2 mx-4 rounded-xl glass-card py-2">
          {links.map((l) => (
            <button key={l.key} onClick={() => { setActive(l.key); setMenuOpen(false); }}
              className={`w-full text-left px-5 py-3 font-golos text-sm transition-colors ${active === l.key ? "text-cyan-400" : "text-white/60 hover:text-white"}`}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HomeSection({ setActive }: { setActive: (s: Section) => void }) {
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

function TheorySection() {
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

function TasksSection() {
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

function MaterialsSection() {
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

function Footer({ setActive }: { setActive: (s: Section) => void }) {
  const labels: Record<Section, string> = { home: "Главная", theory: "Теория", tasks: "Задачи", materials: "Материалы" };
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-cyan-400/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>
            <span className="font-cormorant text-white font-semibold">Геометрия Лобачевского</span>
          </div>
          <div className="flex gap-6">
            {(["home", "theory", "tasks", "materials"] as Section[]).map((s) => (
              <button key={s} onClick={() => setActive(s)} className="font-golos text-sm text-white/40 hover:text-white/80 transition-colors">
                {labels[s]}
              </button>
            ))}
          </div>
          <div className="font-golos text-xs text-white/20">© 2024 Образовательный проект</div>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const handleSetActive = (s: Section) => {
    setActive(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)", color: "white" }}>
      <Navbar active={active} setActive={handleSetActive} />
      <main>
        {active === "home" && <HomeSection setActive={handleSetActive} />}
        {active === "theory" && <TheorySection />}
        {active === "tasks" && <TasksSection />}
        {active === "materials" && <MaterialsSection />}
      </main>
      <Footer setActive={handleSetActive} />
    </div>
  );
}

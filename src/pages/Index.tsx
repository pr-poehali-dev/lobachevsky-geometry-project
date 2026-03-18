import { useState } from "react";
import { Section } from "@/components/lobachevsky/types";
import Navbar from "@/components/lobachevsky/Navbar";
import HomeSection from "@/components/lobachevsky/HomeSection";
import TheorySection from "@/components/lobachevsky/TheorySection";
import TasksSection from "@/components/lobachevsky/TasksSection";
import MaterialsSection from "@/components/lobachevsky/MaterialsSection";

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

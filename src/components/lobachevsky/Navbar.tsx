import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Section } from "./types";

export default function Navbar({ active, setActive }: { active: Section; setActive: (s: Section) => void }) {
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

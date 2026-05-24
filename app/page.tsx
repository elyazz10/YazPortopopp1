"use client"

import React, { useState, useEffect, createContext, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Download, Mail, ChevronRight, Send, MapPin, X, Menu } from "lucide-react"

type LangType = "EN" | "ID"
export const LangContext = createContext<{ lang: LangType, setLang: (l: LangType) => void }>({ lang: "EN", setLang: () => {} })
export const useLang = () => useContext(LangContext)
import { useTheme } from "next-themes"
import { LoadingScreen } from "@/components/loading-screen"
import { BackToTop } from "@/components/back-to-top"
import { MarqueeText } from "@/components/marquee"
import { TiltCard } from "@/components/tilt-card"
import { MagneticBtn } from "@/components/magnetic-btn"
import { PhotoGallery } from "@/components/photo-gallery"

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [lang, setLang] = useState<LangType>("EN")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const sections = ["home", "about", "works", "journey", "contact"]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.4 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="relative min-h-screen bg-background text-foreground font-mono selection:bg-foreground selection:text-background">
      
      <LoadingScreen />
      <BackToTop />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center nav-bar">
        <div className="font-heading text-2xl font-black tracking-widest flex items-center gap-2">
          <div className="w-9 h-9 bg-foreground text-background flex items-center justify-center text-sm font-bold rounded-md">AI</div>
          <span className="hidden md:block tracking-widest">AHMAD ILYAS</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm font-bold tracking-widest uppercase">
          {(lang === "EN" ? ["Home", "About", "Projects", "Journey", "Contact"] : ["Beranda", "Tentang", "Proyek", "Perjalanan", "Kontak"]).map((item, i) => {
            const id = ["home", "about", "works", "journey", "contact"][i]
            return (
              <a
                key={item}
                href={`#${id}`}
                className={`transition-all ${
                  activeSection === id
                    ? "opacity-100 underline underline-offset-4 decoration-2"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                {item}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setLang(lang === "EN" ? "ID" : "EN")} className="theme-toggle-btn font-bold text-xs" aria-label="Toggle language">
            {lang}
          </button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="theme-toggle-btn" aria-label="Toggle theme">
            <Sun className="h-4 w-4 hidden dark:block" />
            <Moon className="h-4 w-4 block dark:hidden" />
          </button>
          {/* Hamburger — mobile only */}
          <button onClick={() => setMobileOpen(true)} className="md:hidden theme-toggle-btn" aria-label="Open menu">
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[999] w-[75vw] max-w-xs bg-foreground text-background flex flex-col p-8 gap-8"
          >
            <button onClick={() => setMobileOpen(false)} className="self-end w-10 h-10 rounded-full border-2 border-background flex items-center justify-center">
              <X size={18} />
            </button>
            <div className="flex flex-col gap-6 mt-4">
              {(lang === "EN" ? ["Home", "About", "Projects", "Journey", "Contact"] : ["Beranda", "Tentang", "Proyek", "Perjalanan", "Kontak"]).map((item, i) => {
                const id = ["home", "about", "works", "journey", "contact"][i]
                return (
                  <a
                    key={item}
                    href={`#${id}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-3xl font-heading uppercase tracking-widest hover:opacity-60 transition-opacity"
                  >
                    {item}
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {mobileOpen && <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-[998] bg-foreground/30 backdrop-blur-sm" />}

      <main className="relative z-10 w-full overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <MarqueeText text={lang === "EN" ? "AVAILABLE FOR FREELANCE • FULLSTACK ENGINEER • CREATIVE UI/UX • " : "TERSEDIA UNTUK LEPAS WAKTU • ENGINEER FULLSTACK • UI/UX KREATIF • "} />
        <ProjectsSection />
        <JourneySection />
        <ContactSection />
        <FooterSection />
      </main>
    </div>
    </LangContext.Provider>
  )
}

function CuteGhost({ className, delay = 0 }: { className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      className={`relative w-12 h-14 bg-foreground rounded-t-full rounded-b-md ${className}`}
    >
      <div className="absolute top-4 left-2 w-2 h-3 bg-background rounded-full animate-pulse"></div>
      <div className="absolute top-4 right-2 w-2 h-3 bg-background rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 flex justify-around">
        <div className="w-2 h-2 bg-background rounded-t-full"></div>
        <div className="w-2 h-2 bg-background rounded-t-full"></div>
        <div className="w-2 h-2 bg-background rounded-t-full"></div>
      </div>
    </motion.div>
  )
}

function HeroSection() {
  const { lang } = useLang()
  const [time, setTime] = useState("")
  const [typedText, setTypedText] = useState("")
  const [doneTyping, setDoneTyping] = useState(false)

  const fullTextEn = `const INITIALIZE_SYSTEM = async () => { const Developer = { ID: "AHMAD_ILYAS", Origin: "Indonesia", Role: "Creative_Engineer", Mindset: "Systematic_Thinking_With_Visual_Sensitivity" }; await System.load("Next.js", "React", "TypeScript", "Tailwind_CSS", "Framer_Motion"); if (Project.isComplex) return Developer.solveWith(Physics + Logic + Experience); const Mission = "Crafting digital experiences that feel alive, intentional, and intuitive." }`
  const fullTextId = `const INITIALIZE_SYSTEM = async () => { const Developer = { ID: "AHMAD_ILYAS", Origin: "Indonesia", Role: "Creative_Engineer", Mindset: "Pemikiran_Sistematis_Serta_Kepekaan_Visual" }; await System.load("Next.js", "React", "TypeScript", "Tailwind_CSS", "Framer_Motion"); if (Project.isComplex) return Developer.solveWith(Physics + Logic + Experience); const Mission = "Menciptakan pengalaman digital yang terasa hidup, disengaja, dan intuitif." }`

  useEffect(() => {
    // Realtime clock
    const updateTime = () => {
      const now = new Date()
      const date = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()
      const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      setTime(`TODAY: ${date} - ${timeStr}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)

    // Typewriter — runs once, stops when done
    const fullText = lang === "EN" ? fullTextEn : fullTextId
    let i = 0
    setTypedText("")
    setDoneTyping(false)
    const delay = setTimeout(() => {
      const typing = setInterval(() => {
        i++
        setTypedText(fullText.slice(0, i))
        if (i >= fullText.length) {
          clearInterval(typing)
          setDoneTyping(true)
        }
      }, 25)
      return () => clearInterval(typing)
    }, 800)

    return () => {
      clearInterval(interval)
      clearTimeout(delay)
    }
  }, [lang])

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center items-center pt-20 overflow-x-hidden bg-dot-pattern">
      {/* Floating Brutalist Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-x-hidden z-0">
        <motion.div animate={{ rotate: 360, y: [0, 20, 0] }} transition={{ rotate: { repeat: Infinity, duration: 20, ease: "linear" }, y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }} className="absolute top-[12%] left-[4%] md:left-[8%] opacity-[0.07]">
          <div className="w-12 h-12 md:w-16 md:h-16 border-[3px] border-foreground"></div>
        </motion.div>
        <motion.div animate={{ rotate: -360, x: [0, -20, 0] }} transition={{ rotate: { repeat: Infinity, duration: 25, ease: "linear" }, x: { repeat: Infinity, duration: 6, ease: "easeInOut" } }} className="absolute bottom-[18%] right-[4%] md:right-[8%] opacity-[0.07] text-5xl md:text-7xl font-black">
          +
        </motion.div>
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: 180 }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-[15%] right-[5%] md:right-[10%] opacity-[0.07] text-5xl md:text-7xl font-black">
          *
        </motion.div>
        <motion.div animate={{ x: [0, 30, 0], y: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute bottom-[20%] left-[6%] md:left-[10%] opacity-[0.07]">
          <div className="w-10 h-10 md:w-12 md:h-12 border-[3px] border-foreground rounded-full"></div>
        </motion.div>
      </div>

      <div className="absolute bottom-16 w-full flex justify-around opacity-50 pointer-events-none z-0">
        <CuteGhost delay={0} />
        <CuteGhost delay={1} className="mt-10" />
        <CuteGhost delay={2} className="hidden md:block" />
        <CuteGhost delay={0.5} className="mt-5 hidden md:block" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="relative flex justify-center mb-8">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="relative">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4 md:absolute md:-top-6 md:left-0 md:right-0 z-20 md:justify-around">
              <motion.span whileHover={{ scale: 1.1, rotate: -3 }} className="neo-pill hover:bg-foreground hover:text-background transition-colors cursor-crosshair">*</motion.span>
              <motion.span whileHover={{ scale: 1.1, rotate: 3 }} className="neo-pill hover:bg-foreground hover:text-background transition-colors cursor-crosshair">UI/UX</motion.span>
              <motion.span whileHover={{ scale: 1.1, rotate: -2 }} className="neo-pill hover:bg-foreground hover:text-background transition-colors cursor-crosshair">SOFTWARE ENGINEER</motion.span>
              <motion.span whileHover={{ scale: 1.1, rotate: 4 }} className="neo-pill bg-foreground text-background hover:bg-background hover:text-foreground transition-colors cursor-crosshair">{'</>'}</motion.span>
              <motion.span whileHover={{ scale: 1.1, rotate: -3 }} className="neo-pill hover:bg-foreground hover:text-background transition-colors cursor-crosshair">CREATIVE +</motion.span>
              <motion.span whileHover={{ scale: 1.1, rotate: 2 }} className="neo-pill hover:bg-foreground hover:text-background transition-colors cursor-crosshair">FULLSTACK</motion.span>
            </div>
            
            <h1 className="text-[14vw] font-heading leading-[0.8] tracking-tighter uppercase text-center relative z-10 text-foreground cursor-default flex justify-center whitespace-nowrap">
              {"AHMAD ILYAS".split("").map((char, i) => (
                <motion.span 
                  key={i} 
                  className="inline-block"
                  whileHover={{ 
                    y: -15, 
                    rotate: char === " " ? 0 : (i % 2 === 0 ? 5 : -5),
                    opacity: 0.4,
                    scale: 1.15
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
          className="w-full px-6 max-w-4xl mx-auto mt-4"
        >
          <div className="border border-foreground/10 rounded-lg p-4 font-mono text-xs opacity-70 leading-relaxed min-h-[56px] text-left">
            <span>{typedText}</span>
            {!doneTyping && <span className="inline-block w-[2px] h-4 bg-foreground align-middle ml-[1px] animate-pulse" />}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full border-t-[3px] border-[var(--border-color)] bg-background flex flex-col md:flex-row h-auto md:h-12 text-[10px] md:text-xs font-bold uppercase tracking-widest z-20">
        <div className="flex items-center gap-2 border-b-[3px] md:border-b-0 md:border-r-[3px] border-[var(--border-color)] px-6 py-3 md:py-0 h-full flex-1">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span> 
          {lang === "EN" ? "OPEN TO WORK" : "SIAP BEKERJA"}
        </div>
        <div className="flex items-center md:justify-center border-b-[3px] md:border-b-0 md:border-r-[3px] border-[var(--border-color)] px-6 py-3 md:py-0 h-full flex-1">
          {lang === "EN" ? "BASED IN JAMBI, ID" : "BERBASIS DI JAMBI, ID"}
        </div>
        <div className="flex items-center md:justify-center border-b-[3px] md:border-b-0 md:border-r-[3px] border-[var(--border-color)] px-6 py-3 md:py-0 h-full flex-1">
          <span suppressHydrationWarning>{time ? time.replace("TODAY", lang === "EN" ? "TODAY" : "HARI INI") : "LOADING..."}</span>
        </div>
        <div className="flex items-center justify-center px-6 py-3 md:py-0 h-full flex-1 cursor-pointer hover:bg-foreground hover:text-background transition-colors" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <motion.div 
            animate={{ y: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex items-center gap-2"
          >
            {lang === "EN" ? "SCROLL DOWN" : "GULIR KE BAWAH"} <ChevronRight size={16} className="rotate-90" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const { lang } = useLang()
  
  return (
    <section id="about" className="py-24 md:py-32 bg-background border-t-[3px] border-[var(--border-color)] relative z-10 bg-dot-pattern">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl font-heading uppercase mb-12"
        >
          {lang === "EN" ? "ABOUT ME" : "TENTANG SAYA"}
        </motion.h2>

        <div className="grid md:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="md:col-span-8 neo-brutal p-8 md:p-12 flex flex-col justify-center"
          >
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-2xl mb-6 border-2 border-foreground">👋</div>
            <h3 className="text-3xl md:text-5xl font-heading uppercase mb-6 leading-none">
              {lang === "EN" ? "HI, I'M AHMAD ILYAS." : "HAI, SAYA AHMAD ILYAS."}
            </h3>
            <p className="text-sm md:text-lg font-medium opacity-80 leading-relaxed mb-6">
              {lang === "EN" 
                ? "A Software Engineering student specializing in analyzing requirements and designing system flows to build iterative web solutions using Next.js, React, and Tailwind." 
                : "Seorang mahasiswa Rekayasa Perangkat Lunak yang berspesialisasi dalam menganalisis kebutuhan dan merancang alur sistem untuk membangun solusi web yang interaktif menggunakan Next.js, React, dan Tailwind."}
            </p>
            <p className="text-sm md:text-lg font-medium opacity-80 leading-relaxed mb-10 text-blue-600 dark:text-blue-400">
              {lang === "EN" 
                ? "Experienced in building high-performance frontend interfaces prioritizing data accuracy, animations, and clean code quality." 
                : "Berpengalaman dalam membangun antarmuka frontend berkinerja tinggi yang mengutamakan akurasi data, animasi, dan kualitas kode yang bersih."}
            </p>
            <div>
              <a href="/cv.pdf" download="CV_Ahmad_Ilyas.pdf" className="neo-brutal-btn px-8 py-4 uppercase text-sm flex items-center gap-2 w-fit">
                <Download size={18} /> {lang === "EN" ? "Download Resume" : "Unduh CV"}
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4 neo-brutal p-4 relative flex flex-col"
          >
            <div className="w-full flex-grow bg-foreground rounded-xl relative overflow-x-hidden flex items-center justify-center group border-[3px] border-foreground">
              <img 
                src="/profile.jpg" 
                alt="Ahmad Ilyas" 
                className="w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              {/* Pattern di belakang foto layaknya referensi */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBoMTB2MTBIMHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAgMzBoMTB2MTBIMzB6IiBmaWxsPSIjZmZmIi8+PC9zdmc+')] bg-repeat opacity-20 z-0"></div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-md border-2 border-foreground rounded-xl p-4 flex justify-between items-center z-20">
                <div>
                  <p className="font-bold text-sm">@ahmadilyas</p>
                  <p className="text-xs flex items-center gap-1 opacity-70"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {lang === "EN" ? "ONLINE" : "AKTIF"}</p>
                </div>
                <MagneticBtn className="neo-brutal-btn bg-background text-foreground px-4 py-2 text-xs">{lang === "EN" ? "HIRE ME" : "REKRUT"}</MagneticBtn>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="md:col-span-4 neo-brutal p-6 flex flex-col justify-center items-center relative overflow-x-hidden"
          >
             <div className="absolute bottom-0 right-4 translate-y-1/2">
                <CuteGhost />
             </div>
             <div className="w-16 h-16 rounded-full border-2 border-foreground flex items-center justify-center mb-4">
                🎓
             </div>
             <div className="text-center font-bold">
                <p>{lang === "EN" ? "SOFTWARE ENGINEERING" : "REKAYASA PERANGKAT LUNAK"}</p>
                <p className="text-xs opacity-60">{lang === "EN" ? "GRADUATED 202X" : "LULUS 202X"}</p>
             </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-8 neo-brutal p-8"
          >
            <h4 className="text-2xl font-heading uppercase mb-6 flex items-center gap-2">
              <span className="bg-foreground text-background px-2 py-1">{'>_'}</span> {lang === "EN" ? "TECH STACK" : "TEKNOLOGI"}
            </h4>
            <div className="flex flex-wrap gap-3">
              {["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "Node.js", "Firebase"].map(t => (
                <span key={t} className="neo-pill px-4 py-2 text-sm">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.6 }}
        className="mt-24 border-t-[3px] border-b-[3px] border-[var(--border-color)] bg-foreground text-background py-4 overflow-x-hidden relative"
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex whitespace-nowrap gap-12 font-heading text-4xl uppercase items-center"
        >
          {[0, 1].map((n) => (
            <span key={n} className="shrink-0 flex gap-12 items-center">
              <span>REACT.JS</span> <span>•</span>
              <span>NEXT.JS</span> <span>•</span>
              <span>TYPESCRIPT</span> <span>•</span>
              <span>TAILWIND CSS</span> <span>•</span>
              <span>CODEIGNITER</span> <span>•</span>
              <span>MYSQL</span> <span>•</span>
              <span>FRAMER MOTION</span> <span>•</span>
              <span>UI/UX DESIGN</span> <span>•</span>
              <span>FIGMA</span> <span>•</span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

function ProjectsSection() {
  const { lang } = useLang()
  const projects = [
    {
      title: "VOTE NOW GI",
      desc: lang === "EN" 
        ? "A high-achieving student selection management system that automates the manual assessment process. Reduces recap time efficiently with a Live Ranking feature."
        : "Sistem manajemen seleksi siswa berprestasi yang mengotomatisasi proses penilaian manual. Mengurangi waktu rekap secara efisien dengan fitur Peringkat Langsung.",
      tags: ["CodeIgniter 3", "Bootstrap", "MySQL"],
      year: "2024",
      link: "https://votekuy.netlify.app"
    },
    {
      title: "BICLOTHES",
      desc: lang === "EN"
        ? "A modern e-commerce platform for a clothing brand featuring a comprehensive product catalog, user checkout workflow, and an admin dashboard for inventory management."
        : "Platform e-commerce modern untuk merek pakaian yang menampilkan katalog produk lengkap, alur pembayaran, dan dasbor admin untuk manajemen inventaris.",
      tags: ["HTML/CSS", "JavaScript", "E-Commerce"],
      year: "2025",
      link: "https://clothesbii.netlify.app"
    }
  ]

  return (
    <section id="works" className="py-24 md:py-32 bg-foreground text-background border-t-[3px] border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-6xl md:text-8xl font-heading uppercase leading-none">
              {lang === "EN" ? "SELECTED" : "PROYEK"}<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: "2px var(--background)" }}>{lang === "EN" ? "WORKS" : "PILIHAN"}</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="max-w-xs font-mono text-sm opacity-70 text-right hidden md:block"
          >
            {lang === "EN" ? "A showcase of functional web solutions focused on data accuracy, automation, and user experience." : "Kumpulan solusi web fungsional yang berfokus pada akurasi data, otomatisasi, dan pengalaman pengguna."}
          </motion.p>
        </div>

        <div className="flex flex-col gap-24">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="flex flex-col order-2 md:order-1">
                <span className="neo-pill border-background text-background bg-transparent self-start mb-6 text-xs">{p.year}</span>
                <h3 className="text-4xl md:text-6xl font-heading uppercase mb-6 leading-[0.9]">{p.title}</h3>
                <p className="text-sm font-mono opacity-80 leading-relaxed mb-10 max-w-md">{p.desc}</p>
                
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => <span key={t} className="text-[10px] uppercase font-bold border border-background/20 px-3 py-1 rounded-full">{t}</span>)}
                </div>
              </div>
              
              <div className="order-1 md:order-2 w-full flex flex-col items-center justify-center gap-4 p-4">
                <TiltCard className="neo-brutal border-background bg-transparent p-4 w-full aspect-[4/3] flex items-center justify-center relative overflow-x-hidden group">
                  <div className="w-[90%] h-[80%] border-2 border-background rounded-lg bg-background text-foreground flex flex-col overflow-x-hidden transition-transform duration-500 group-hover:scale-105">
                    <div className="h-8 border-b-2 border-background bg-background flex items-center px-4 gap-2">
                      <div className="w-2 h-2 rounded-full bg-foreground/20"></div>
                      <div className="w-2 h-2 rounded-full bg-foreground/20"></div>
                      <div className="w-2 h-2 rounded-full bg-foreground/20"></div>
                    </div>
                    <div className="flex-grow bg-foreground flex items-center justify-center text-background font-heading text-4xl p-6 text-center opacity-50 group-hover:opacity-100 transition-opacity">
                      {p.title}
                    </div>
                  </div>
                  {/* Hover overlay — desktop only */}
                  <div className="hidden md:flex absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors items-center justify-center opacity-0 group-hover:opacity-100">
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="neo-brutal-btn bg-background text-foreground px-6 py-3 block hover:scale-105 transition-transform">{lang === "EN" ? "VIEW PROJECT" : "LIHAT PROYEK"}</a>
                  </div>
                </TiltCard>
                {/* Mobile-only direct link button — always visible on touch devices */}
                <a 
                  href={p.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="md:hidden w-full text-center neo-brutal-btn border-background text-background bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors"
                >
                  {lang === "EN" ? "↗ VIEW PROJECT" : "↗ LIHAT PROYEK"}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function JourneySection() {
  const { lang } = useLang()
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryTitle, setGalleryTitle] = useState("")

  const journeyPhotos = [
    "/journey-1.jpg",
    "/journey-2.jpg",
    "/journey-3.jpg",
  ]

  const openGallery = (title: string) => {
    setGalleryTitle(title)
    setGalleryOpen(true)
  }

  const journey = [
    { 
      title: lang === "EN" ? "JUNIOR WEB DEVELOPER" : "DEVELOPER WEB JUNIOR", 
      role: lang === "EN" ? "INDEPENDENT SOFTWARE DEVELOPMENT" : "PENGEMBANGAN PERANGKAT LUNAK INDEPENDEN", 
      desc: lang === "EN" ? "Designing and deploying end-to-end applications. Fully involved in the development of modern web solutions." : "Merancang dan mendeploy aplikasi end-to-end. Terlibat penuh dalam pengembangan solusi web modern." 
    },
    { 
      title: lang === "EN" ? "WEB SYSTEM ARCHITECT" : "ARSITEK SISTEM WEB", 
      role: lang === "EN" ? "UNIVERSITY PROJECT" : "PROYEK UNIVERSITAS", 
      desc: lang === "EN" ? "Led the design of a multi-role web system to automate the selection and calculation matrices, reducing human error." : "Memimpin desain sistem web multi-role untuk mengotomatisasi seleksi dan perhitungan matriks, mengurangi kesalahan manual." 
    },
    { 
      title: lang === "EN" ? "UI/UX ENTHUSIAST" : "PENGGIAT UI/UX", 
      role: lang === "EN" ? "FREELANCE" : "LEPAS WAKTU", 
      desc: lang === "EN" ? "Analyzed and executed UI/UX overhauls for the efficiency of operational systems." : "Menganalisis dan mengeksekusi perombakan UI/UX untuk efisiensi sistem operasional." 
    }
  ]

  return (
    <section id="journey" className="py-24 md:py-32 bg-background border-t-[3px] border-[var(--border-color)] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-heading uppercase mb-4"
          >
            {lang === "EN" ? "MY JOURNEY" : "PERJALANAN SAYA"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="font-mono text-sm opacity-60"
          >
            {lang === "EN" ? "Milestones of growth: From university labs to professional production environments." : "Pencapaian pertumbuhan: Dari lab universitas ke lingkungan produksi profesional."}
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Garis timeline tegak */}
          <div className="absolute left-[50%] md:left-[40%] top-0 bottom-0 w-[2px] bg-foreground/20"></div>

          {journey.map((j, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-24 relative z-10 group"
            >
              <div className="w-full md:w-[40%] flex md:justify-end items-center gap-4">
                 <h3 className="text-6xl md:text-8xl font-heading text-stroke group-hover:text-foreground transition-colors relative z-10 bg-background pr-4">202{6 - i}</h3>
                 <motion.button
                   onClick={() => openGallery(j.title)}
                   whileHover={{ scale: 1.15, rotate: -5 }}
                   whileTap={{ scale: 0.9 }}
                   title={lang === "EN" ? "Open photos" : "Buka foto"}
                   className="w-12 h-12 bg-foreground rounded-sm items-center justify-center text-background font-mono text-xs hidden md:flex cursor-pointer hover:shadow-[4px_4px_0px_var(--foreground)] transition-shadow relative group/folder"
                 >
                   📁
                   <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[9px] font-bold px-2 py-1 whitespace-nowrap opacity-0 group-hover/folder:opacity-100 transition-opacity pointer-events-none">
                     {lang === "EN" ? "VIEW PHOTOS" : "LIHAT FOTO"}
                   </span>
                 </motion.button>
              </div>
              
              {/* Titik bulat di timeline */}
              <div className="absolute left-[50%] md:left-[40%] w-4 h-4 rounded-full border-2 border-foreground bg-background -translate-x-1/2 mt-8 md:mt-0 transition-transform group-hover:scale-150 group-hover:bg-foreground"></div>

              <div className="w-full md:w-[60%] text-left mt-4 md:mt-0">
                <div className="neo-brutal p-8 bg-background relative">
                  <span className="bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded-full mb-4 inline-block">PROFESSIONAL</span>
                  <h4 className="text-2xl font-heading uppercase mb-2">{j.title}</h4>
                  <p className="text-xs font-bold opacity-60 mb-4 flex items-center gap-1"><MapPin size={12}/> {j.role}</p>
                  <p className="text-sm font-medium opacity-80 leading-relaxed mb-6">{j.desc}</p>
                  {/* Folder button mobile */}
                  <motion.button
                    onClick={() => openGallery(j.title)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="md:hidden flex items-center gap-2 border-2 border-foreground px-4 py-2 text-xs font-bold hover:bg-foreground hover:text-background transition-colors"
                  >
                    📁 {lang === "EN" ? "VIEW PHOTOS" : "LIHAT FOTO"}
                  </motion.button>
                  <CuteGhost className="absolute -bottom-14 right-4 scale-75 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <PhotoGallery
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        title={galleryTitle}
        photos={journeyPhotos}
      />
    </section>
  )
}

function ContactSection() {
  const { lang } = useLang()
  const [status, setStatus] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus(lang === "EN" ? "SENDING..." : "MENGIRIM...")
    
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setStatus(lang === "EN" ? "MESSAGE SENT!" : "PESAN TERKIRIM!")
        form.reset()
        setTimeout(() => setStatus(""), 4000)
      } else {
        setStatus(lang === "EN" ? "ERROR: TRY AGAIN" : "GAGAL: COBA LAGI")
        setTimeout(() => setStatus(""), 3000)
      }
    } catch (error) {
      setStatus(lang === "EN" ? "ERROR: NETWORK ISSUE" : "GAGAL: MASALAH JARINGAN")
      setTimeout(() => setStatus(""), 3000)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-foreground text-background border-t-[3px] border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-6xl md:text-[7vw] font-heading uppercase leading-[0.85] mb-8 whitespace-pre-line">
              {lang === "EN" ? "LET'S START\nA PROJECT" : "MARI MULAI\nPROYEK"}
            </h2>
            <p className="font-mono text-sm opacity-70 max-w-md leading-relaxed mb-12">
              {lang === "EN" ? "Interested in working together? Fill out the form or drop me a direct email. I'm available for freelance & full-time roles." : "Tertarik untuk bekerja sama? Isi formulir atau kirim pesan via email. Saya tersedia untuk pekerjaan lepas maupun penuh waktu."}
            </p>

            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs font-bold uppercase opacity-60 mb-3">{lang === "EN" ? "DIRECT EMAIL" : "EMAIL LANGSUNG"}</p>
                <a href="mailto:kcelyaz@gmail.com" className="neo-brutal bg-background text-foreground p-4 flex items-center gap-4 w-fit group hover:opacity-80 transition-opacity">
                  <Mail size={20} />
                  <span className="font-bold text-sm">kcelyaz@gmail.com</span>
                </a>
              </div>
              
              <div>
                <p className="text-xs font-bold uppercase opacity-60 mb-3">{lang === "EN" ? "SOCIAL PRESENCE" : "MEDIA SOSIAL"}</p>
                <div className="flex gap-4">
                  <a href="https://instagram.com/elyasz.0" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-2 border-background rounded-xl flex items-center justify-center hover:bg-background hover:text-foreground transition-colors group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:scale-110 transition-transform"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/ahmadilyas" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="w-12 h-12 border-2 border-background rounded-xl flex items-center justify-center hover:bg-background hover:text-foreground transition-colors group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a href="https://github.com/elyazz10" target="_blank" rel="noopener noreferrer" title="GitHub" className="w-12 h-12 border-2 border-background rounded-xl flex items-center justify-center hover:bg-background hover:text-foreground transition-colors group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                      <path d="M9 18c-4.51 2-5-2-7-2"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="neo-brutal bg-background text-foreground p-6 md:p-10 flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase opacity-60">{lang === "EN" ? "YOUR NAME" : "NAMA ANDA"}</label>
                  <input id="name" name="name" type="text" className="bg-transparent border-2 border-foreground/30 rounded-lg p-4 outline-none focus:border-foreground transition-colors text-sm font-bold" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase opacity-60">{lang === "EN" ? "YOUR EMAIL" : "EMAIL ANDA"}</label>
                  <input id="email" name="email" type="email" className="bg-transparent border-2 border-foreground/30 rounded-lg p-4 outline-none focus:border-foreground transition-colors text-sm font-bold" required />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-[10px] font-bold uppercase opacity-60">{lang === "EN" ? "SUBJECT" : "SUBJEK"}</label>
                <input id="subject" name="subject" type="text" className="bg-transparent border-2 border-foreground/30 rounded-lg p-4 outline-none focus:border-foreground transition-colors text-sm font-bold" required />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[10px] font-bold uppercase opacity-60">{lang === "EN" ? "MESSAGE" : "PESAN"}</label>
                <textarea id="message" name="message" className="bg-transparent border-2 border-foreground/30 rounded-lg p-4 outline-none focus:border-foreground transition-colors text-sm font-bold resize-none h-32" required></textarea>
              </div>

              <div className="w-full flex justify-center">
                <MagneticBtn type="submit" disabled={status.includes("MENGIRIM") || status.includes("SENDING")} className="neo-brutal-btn bg-background text-foreground py-4 w-full flex items-center justify-center gap-2 disabled:opacity-50">
                  {status || (lang === "EN" ? "SEND MESSAGE" : "KIRIM PESAN")} <Send size={16} />
                </MagneticBtn>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FooterSection() {
  const { lang } = useLang()
  return (
    <footer className="w-full bg-background border-t-[3px] border-[var(--border-color)] py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-heading text-2xl font-black tracking-widest flex items-center gap-2">
          <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center text-sm font-bold rounded-md">AI</div>
          <span className="tracking-widest">AHMAD ILYAS</span>
        </div>
        
        <p className="font-mono text-xs opacity-60 text-center md:text-right">
          © {new Date().getFullYear()} Ahmad Ilyas.<br className="md:hidden" /> {lang === "EN" ? "Designed with passion, built with Next.js." : "Dirancang dengan passion, dibangun dengan Next.js."}
        </p>
      </div>
    </footer>
  )
}

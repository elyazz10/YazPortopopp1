import re

with open("app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add context
if "type LangType" not in content:
    content = content.replace('import { useState, useEffect } from "react"', 'import React, { useState, useEffect, createContext, useContext } from "react"\n\ntype LangType = "EN" | "ID"\nexport const LangContext = createContext<{ lang: LangType, setLang: (l: LangType) => void }>({ lang: "EN", setLang: () => {} })\nexport const useLang = () => useContext(LangContext)')

# Add lang state to Portfolio
if "const [lang, setLang]" not in content:
    content = content.replace('const { theme, setTheme } = useTheme()', 'const { theme, setTheme } = useTheme()\n  const [lang, setLang] = useState<LangType>("EN")')

# Wrap return of Portfolio in Provider
if "<LangContext.Provider" not in content:
    content = content.replace('<div className="relative min-h-screen', '<LangContext.Provider value={{ lang, setLang }}>\n    <div className="relative min-h-screen')
    # close provider at the end of Portfolio
    content = re.sub(r'(      </main>\n    </div>\n  )\n(})', r'\1    </LangContext.Provider>\n\2', content)

# Add lang button to Navbar
if "Toggle language" not in content:
    btn_html = '          <button onClick={() => setLang(lang === "EN" ? "ID" : "EN")} className="theme-toggle-btn font-bold text-xs" aria-label="Toggle language">\n            {lang}\n          </button>\n          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}'
    content = content.replace('<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}', btn_html)

# Update Navbar items
if "const navItems = lang" not in content:
    content = content.replace('{["Home", "About", "Projects", "Journey", "Contact"].map((item) => {', 'const navItems = lang === "EN" ? ["Home", "About", "Projects", "Journey", "Contact"] : ["Beranda", "Tentang", "Proyek", "Perjalanan", "Kontak"]\n          {navItems.map((item, i) => {\n            const ids = ["home", "about", "works", "journey", "contact"]\n            const id = ids[i]')
    content = content.replace('const id = item === "Projects" ? "works" : item.toLowerCase()', '')
    
# Update Mobile Menu items
if "const mobileNavItems = lang" not in content:
    content = content.replace('{["Home", "About", "Projects", "Journey", "Contact"].map((item) => {', 'const mobileNavItems = lang === "EN" ? ["Home", "About", "Projects", "Journey", "Contact"] : ["Beranda", "Tentang", "Proyek", "Perjalanan", "Kontak"]\n              {mobileNavItems.map((item, i) => {\n                const ids = ["home", "about", "works", "journey", "contact"]\n                const id = ids[i]')
    
with open("app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

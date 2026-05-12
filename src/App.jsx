import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Cloud, 
  Mail, 
  Code, 
  Globe, 
  Send,
  Palette
} from 'lucide-react';

/* --- BEST UI TRENDS 2025 IMPLEMENTATION ---
  1. Bento Grid Layout: Modular, organized information chunks.
  2. Glassmorphism 2.0: Deep blurs, subtle borders, noise textures.
  3. Aurora Gradients: Animated, flowing background colors.
  4. Large Typography: Bold, readable headers.
  5. Micro-interactions: Hover states on buttons and cards.
*/

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const scrollerRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const skills = [
    'Touchdesigner',
    'Scripting',
    'Game Development',
    'Content Creation',
    'AI Art',
    'Web Design',
    'Web Development',
    'Javascript',
    'Unreal Engine',
    'Python',
    'Blender',
    '3D',
    'Music Production',
    'Sound Design',
    'Mixing & Mastering',
    'VR/AR/MR/XR'
  ];

  // Scroll detection for navbar blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Programmatic continuous auto-scroll (loops seamlessly)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // If the content isn't duplicated, don't run
    if (el.children.length < 2) return;

    let rafId = null;
    let last = performance.now();
    const speed = 40; // pixels per second
    let exactScroll = el.scrollLeft;

    const step = (now) => {
      const delta = (now - last) / 1000;
      last = now;
      
      if (!isDown.current) {
        // advance scrollLeft using a float to prevent truncation
        exactScroll += speed * delta;
        
        // Infinite wrap around logic (works for auto-scroll)
        const half = el.scrollWidth / 2;
        if (exactScroll >= half) {
          exactScroll -= half;
        } else if (exactScroll <= 0) {
          exactScroll += half;
        }
        el.scrollLeft = exactScroll;
      } else {
        // Keeps exactScroll synced while user is dragging natively
        exactScroll = el.scrollLeft;
      }
      
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [scrollerRef]);

  // Obfuscated email reconstruction to prevent bot scraping
  const getEmail = () => {
    return ['RmaN', '.', 'CreaTechs', '@', 'gmail', '.', 'com'].join('');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      
      {/* --- ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
        {/* Noise overlay for texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${scrolled ? 'bg-black/20 backdrop-blur-lg border-white/10' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            RmaN
          </div>
          {/* Links removed as requested */}
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20" id="home">
        
        {/* --- HERO BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:h-[800px] mb-20">
          
          {/* 1. Main Profile Card (Now Wider: 3x2 on desktop) */}
          <div className="md:col-span-3 md:row-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-center group hover:border-cyan-500/30 transition-all duration-500 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-cyan-500/20 blur-[100px] rounded-full group-hover:bg-cyan-400/30 transition-all duration-500"></div>
            
            <div className="z-10 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-cyan-300 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Available for work
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
                Creative <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Technologist</span>
              </h1>

              {/* Location Info */}
              <div className="flex items-center gap-2 text-gray-400 mb-6">
                <Globe size={14} className="text-cyan-400" />
                <span className="text-xs tracking-wider uppercase opacity-70">Digital Nomad</span>
              </div>

              <p className="text-lg text-gray-400 max-w-xl leading-relaxed mb-8">
                Exploring the intersection where technology meets creativity. Building immersive digital experiences for the future.
              </p>

              {/* Social Buttons Row */}
              <div className="flex flex-wrap gap-3">
                <SocialBtn icon={<Mail size={20}/>} href={`mailto:${getEmail()}`} label="Email" />
                <SocialBtn icon={<Send size={20}/>} href="https://t.me/RmaNTelegram" label="Telegram" />
                <SocialBtn icon={<Github size={20}/>} href="https://github.com/RmaNMetaverse/" label="GitHub" />
                <SocialBtn icon={<Youtube size={20}/>} href="https://YouTube.com/RmaNYoutube/" label="YouTube" />
                <SocialBtn icon={<Instagram size={20}/>} href="https://instagram.com/rman.insta/" label="Instagram" />
                <SocialBtn icon={<Linkedin size={20}/>} href="https://linkedin.com/in/armanjangmiri/" label="LinkedIn" />
                <SocialBtn icon={<Cloud size={20}/>} href="https://soundcloud.com/rman-sound" label="SoundCloud" />
                <SocialBtn icon={<Palette size={20}/>} href="https://www.artstation.com/rman" label="ArtStation" />
                
                {/* Special Highlight Button */}
                <a 
                  href="#" 
                  className="group/web flex-grow sm:flex-grow-0 relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30 hover:border-cyan-400 hover:text-white transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                >
                  <span className="absolute inset-0 w-full h-full opacity-0 group-hover/web:opacity-100 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 transition-opacity duration-500"></span>
                  <span className="relative flex items-center gap-2 whitespace-nowrap tracking-wide">
                    Web Dev/Design 
                    <span className="group-hover/web:translate-x-2 transition-transform duration-300 ease-out font-mono font-black text-cyan-300 group-hover/web:text-white">=&gt;</span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* 2. Portrait / Avatar Card (Takes remaining 1 column) */}
          <div className="md:col-span-1 md:row-span-2 bg-black/40 border border-white/10 rounded-3xl overflow-hidden relative group">
             {/* PLACEHOLDER IMAGE AREA */}
             <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-gray-900 to-black"></div>
                <img
                  src={`${import.meta.env.BASE_URL}RmaNFaceCleanCyberpunk.png`}
                  alt="RmaN Portrait"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="text-xl font-bold">RmaN</h3>
                  <p className="text-sm text-gray-400">Arman Jangmiri</p>
                </div>
             </div>
          </div>

          {/* 5. Skills Scroller (Full Width) */}
          <div id="skills" className="md:col-span-4 md:row-span-1 bg-black/40 border border-white/10 rounded-3xl p-6 flex flex-col justify-center overflow-hidden relative backdrop-blur-md">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">Skills</h3>
            <div
              ref={scrollerRef}
              role="list"
              onPointerDown={(e) => {
                const el = scrollerRef.current;
                if (!el) return;
                isDown.current = true;
                setIsGrabbing(true);
                startX.current = e.clientX;
                startScroll.current = el.scrollLeft;
                try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
              }}
              onPointerMove={(e) => {
                const el = scrollerRef.current;
                if (!el || !isDown.current) return;
                const x = e.clientX;
                const walk = x - startX.current;
                let newScroll = startScroll.current - walk;
                
                const half = el.scrollWidth / 2;
                if (newScroll >= half) {
                  newScroll -= half;
                  startX.current = e.clientX;
                  startScroll.current = newScroll;
                } else if (newScroll <= 0) {
                  newScroll += half;
                  startX.current = e.clientX;
                  startScroll.current = newScroll;
                }
                
                el.scrollLeft = newScroll;
                e.preventDefault();
              }}
              onPointerUp={(e) => {
                const el = scrollerRef.current;
                isDown.current = false;
                setIsGrabbing(false);
                if (el) {
                  try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (err) {}
                }
              }}
              onPointerLeave={(e) => {
                if (!isDown.current) return;
                isDown.current = false;
                setIsGrabbing(false);
              }}
              onPointerCancel={(e) => {
                isDown.current = false;
                setIsGrabbing(false);
              }}
              className={`flex items-center no-scrollbar overflow-x-auto whitespace-nowrap ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ touchAction: 'pan-y', userSelect: isGrabbing ? 'none' : 'auto' }}
            >
               {/* Render the skills list twice to create a seamless looping scroller */}
               <div className="flex gap-12 pr-12 shrink-0">
                 {skills.map((s) => (
                   <div key={s} className="inline-block">
                     <TechIcon name={s} />
                   </div>
                 ))}
               </div>
               <div className="flex gap-12 pr-12 shrink-0">
                 {skills.map((s, i) => (
                   <div key={s + '-dup-' + i} className="inline-block">
                     <TechIcon name={s} />
                   </div>
                 ))}
               </div>
            </div>
            
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-10"></div>
          </div>

        </div>

        {/* --- FOOTER --- */}
        <footer id="contact" className="mt-12 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">RmaN</h4>
            <p className="text-gray-500 text-sm mt-2">© {new Date().getFullYear()} RmaN Creative Techs. All rights reserved.</p>
          </div>
        </footer>

      </main>

      {/* --- CSS FOR CUSTOM ANIMATIONS --- */}
      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 100px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        /* Programmatic auto-scroll is used instead of CSS transform animation.
           This avoids jumpy behavior when the user manually drags the scroller.
        */
        .text-xs {text-align:center}
      `}</style>
    </div>
  );
};

/* --- SUB COMPONENTS --- */

const SocialBtn = ({ icon, href, label }) => (
  <a href={href} aria-label={label} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:scale-105 transition-all text-gray-300 hover:text-white group relative">
    {icon}
  </a>
);

const Icons = {
  'Touchdesigner': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="6" width="20" height="12" rx="2" fill="currentColor" opacity="0.18" />
      <circle cx="8" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M14 9v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  'Scripting': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M7 9l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Game Development': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="3" y="7" width="18" height="10" rx="3" fill="currentColor" opacity="0.08" />
      <circle cx="17" cy="11" r="1.1" fill="currentColor" />
      <circle cx="19.2" cy="13" r="1.1" fill="currentColor" />
      <rect x="5" y="10" width="3" height="1.6" rx="0.4" fill="currentColor" />
      <path d="M8 9.2v3.6M6.4 11.0h3.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.5" cy="12.5" r="0.8" fill="currentColor" />
    </svg>
  ),
  'Content Creation': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="12" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M5 18c1.5-3 6-3 7-3s5.5 0 7 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  'AI Art': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M5 19c2-3 6-4 7-4s5 1 7 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  'Web Design': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M7 9h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="9" cy="15" r="1" fill="currentColor" />
    </svg>
  ),
  'Web Development': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 8v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M18 8v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  'Javascript': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="3" width="20" height="18" rx="2" fill="currentColor" opacity="0.08" />
      <text x="12" y="16" fill="currentColor" fontSize="9" fontWeight="700" textAnchor="middle">JS</text>
    </svg>
  ),
  'Unreal Engine': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="3" width="20" height="18" rx="2" fill="currentColor" opacity="0.08" />
      <text x="12" y="16" fill="currentColor" fontSize="9" fontWeight="700" textAnchor="middle">UE</text>
    </svg>
  ),
  'Python': (
    // Python official logo adapted to monochrome
    <svg width="40" height="40" viewBox="0 0 110 110" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M54.55 10.96c-27.13 0-25.04 11.8-25.04 11.8l.06 12.19h25.42v3.66H26.31s-12.72-.8-12.72 17.51c0 18.3 11 17.9 11 17.9h5.66V60.91s-.18-8.15 8.13-8.15h24.87s7.63.15 7.63-7.53V22.25s1-11.29-16.33-11.29zM38.83 23c2.05 0 3.73 1.68 3.73 3.73 0 2.05-1.68 3.73-3.73 3.73-2.05 0-3.73-1.68-3.73-3.73 0-2.05 1.68-3.73 3.73-3.73z"/>
      <path d="M55.45 101.44c27.13 0 25.04-11.8 25.04-11.8l-.06-12.18H55.01v-3.66h28.68s12.72.8 12.72-17.51c0-18.3-11-17.9-11-17.9h-5.66v13.11s.18 8.16-8.13 8.16H46.75s-7.63-.16-7.63 7.53v22.97s-1 11.28 16.33 11.28zM71.17 89.38c-2.05 0-3.73-1.68-3.73-3.73s1.68-3.73 3.73-3.73c2.05 0 3.73 1.68 3.73 3.73s-1.68 3.73-3.73 3.73z"/>
    </svg>
  ),
  'Blender': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.2" opacity="0.12" />
      <path d="M16 8c-2 0-4 2-4 4s2 4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="15.5" cy="8.5" r="0.9" fill="currentColor" />
    </svg>
  ),
  '3D': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />
    </svg>
  ),
  'Music Production': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="7" cy="12" r="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M9 10v4c2 0 3 1 5 2v-6c-2-1-3-2-5-2z" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  ),
  'Sound Design': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M4 12h3l4-6v12l-4-6H4z" fill="currentColor" opacity="0.12" />
      <path d="M16 8c1 1.5 1 3 0 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M18.5 6c2 2.5 2 5.5 0 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  'Mixing & Mastering': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
      <path d="M7 9v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11 10v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M15 8v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  'VR/AR/MR/XR': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M7 11h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
};

const TechIcon = ({ name }) => {
  const Icon = Icons[name] || <Code size={20} />;
  return (
    <div className="flex flex-col items-center gap-2 min-w-[80px] text-gray-400 hover:text-cyan-400 transition-colors cursor-default">
      <div className="p-2 rounded-full bg-white/5 border border-white/10">
        {Icon}
      </div>
      <span className="text-xs font-mono">{name}</span>
    </div>
  );
};

export default App;












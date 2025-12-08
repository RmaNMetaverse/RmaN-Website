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
    'Tool Development',
    'AI Art',
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

    const step = (now) => {
      const delta = (now - last) / 1000;
      last = now;
      if (!isDown.current) {
        // advance scrollLeft
        el.scrollLeft += speed * delta;
        // when we've scrolled past half (since we duplicated content), wrap around
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
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
                el.scrollLeft = startScroll.current - walk;
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
              className={`flex gap-12 items-center no-scrollbar overflow-x-auto whitespace-nowrap ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ touchAction: 'pan-y', userSelect: isGrabbing ? 'none' : 'auto' }}
            >
               {/* Render the skills list twice to create a seamless looping scroller */}
               {skills.map((s) => (
                 <div key={s} className="inline-block">
                   <TechIcon name={s} />
                 </div>
               ))}
               {skills.map((s, i) => (
                 <div key={s + '-dup-' + i} className="inline-block">
                   <TechIcon name={s} />
                 </div>
               ))}
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

const TechIcon = ({ name }) => (
  <div className="flex flex-col items-center gap-2 min-w-[80px] text-gray-400 hover:text-cyan-400 transition-colors cursor-default">
    <div className="p-3 rounded-full bg-white/5 border border-white/10">
      <Code size={20} />
    </div>
    <span className="text-xs font-mono">{name}</span>
  </div>
);

export default App;












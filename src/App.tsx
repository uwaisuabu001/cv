/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Instagram, Twitter, Mail, Menu, X, ArrowRight } from 'lucide-react';
import { PROJECTS, Project } from './constants';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-trigger')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div
      className={`custom-cursor hidden md:block ${isHovering ? 'hovering' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="header-nav">
        <div className="name-block">
          <div className="name text-2xl font-black tracking-tighter">ELIAS VANCE</div>
          <div className="tagline text-lg font-light italic text-gray-500 normal-case mt-1">Creative Director & Visual Strategist</div>
        </div>
        <nav className="nav-links flex gap-10 text-[11px] font-bold tracking-widest">
          <a href="#work" className="hover:opacity-50 transition-opacity">WORK</a>
          <a href="#manifesto" className="hover:opacity-50 transition-opacity">METHOD</a>
          <button onClick={() => setIsOpen(true)} className="hover:opacity-50 transition-opacity uppercase">ARCHIVE</button>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black text-white z-[60] flex flex-col p-10"
          >
            <div className="flex justify-between items-center">
              <div className="font-mono text-sm tracking-widest">RAW / ARCHIVE</div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                <X size={32} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-8 md:gap-12">
              {['WORK', 'MANIFESTO', 'ABOUT', 'CONTACT'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-6xl md:text-9xl font-black tracking-tighter hover:italic transition-all"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex justify-between items-end font-mono text-xs md:text-sm uppercase tracking-widest">
              <div>Based in London / Global</div>
              <div className="flex gap-6">
                <a href="#" className="hover:underline">Instagram</a>
                <a href="#" className="hover:underline">Twitter</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[80vh] w-full flex flex-col justify-center items-center overflow-hidden bg-white border-b-2 border-black">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/cinematic/1920/1080?grayscale"
          alt="Hero"
          className="w-full h-full object-cover opacity-20 grayscale mix-blend-multiply"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="relative z-10 w-full px-10 text-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter uppercase">
            RAW<br />AESTHETIC
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <p className="max-w-md font-mono text-xs uppercase tracking-widest leading-relaxed opacity-60">
            VOL. 24 / ISSUE 01 / ARCHIVE
          </p>
          <a
            href="#work"
            className="group flex items-center gap-4 font-bold text-xs uppercase tracking-[0.2em] border-b-2 border-black pb-1 hover:opacity-50 transition-all"
          >
            VIEW WORK <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const WorkGrid = () => {
  return (
    <section id="work" className="work-grid grid grid-cols-1 md:grid-cols-2 border-b-2 border-black">
      {PROJECTS.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="project-card border-r-2 border-black last:border-r-0 h-[380px] relative overflow-hidden flex items-center justify-center bg-gray-100 group"
        >
          <img
            src={project.image}
            alt={project.title}
            className="project-image w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
          <div className="project-label absolute bottom-5 left-5 text-[10px] font-extrabold bg-black text-white px-2 py-1">
            0{i + 1} / {project.category}
          </div>
        </motion.div>
      ))}
    </section>
  );
};

const Manifesto = () => {
  return (
    <div className="manifesto-container">
      <div className="manifesto text-[58px] leading-[0.85] font-black tracking-[-3px] text-white">
        NO<br />MOOD<br />BOARDS.<br />NO<br />STOCK<br />ANSWERS.
      </div>
      <div className="sub-manifesto mt-10 text-sm leading-relaxed font-normal tracking-wider text-gray-400 normal-case max-w-[300px]">
        I do not create content. I document the aesthetic of the present. Raw, cinematic, and intentionally gritty. I own the entire visual chain from concept to color grade.
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <footer className="footer-action p-10 flex justify-between items-center bg-white">
      <a
        href="mailto:hello@raw.aesthetic"
        className="cta-button text-5xl font-black tracking-[-2px] no-underline text-black border-b-[6px] border-black pb-1 hover:bg-black hover:text-white transition-all"
      >
        DM TO DISCUSS
      </a>
      <div className="contact-meta text-right text-[11px] leading-relaxed">
        GLOBAL OPERATIONS<br />
        LONDON / NYC / TOKYO<br />
        +44 7700 900 123
      </div>
    </footer>
  );
};

const Footer = () => {
  return (
    <footer className="py-10 px-10 border-t-2 border-black bg-white flex flex-col md:flex-row justify-between items-center gap-6 font-bold text-[10px] uppercase tracking-widest">
      <div>© 2026 ELIAS VANCE / ALL RIGHTS RESERVED</div>
      <div className="flex gap-10">
        <span>LONDON</span>
        <span>NYC</span>
        <span>TOKYO</span>
      </div>
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex items-center gap-2 hover:opacity-50 transition-opacity"
      >
        TOP <ArrowUpRight size={12} />
      </button>
    </footer>
  );
};

export default function App() {
  return (
    <div className="frame">
      <div className="noise-overlay" />
      <CustomCursor />
      
      <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] h-full">
        <aside className="sidebar">
          <Manifesto />
          <div className="nav-links text-white text-[11px] font-bold tracking-widest">
            VOL. 24 / 01
          </div>
        </aside>

        <main className="main-content">
          <Navbar />
          <div className="overflow-y-auto no-scrollbar">
            <Hero />
            <WorkGrid />
            <Contact />
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

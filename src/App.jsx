import { useState, useEffect, useRef } from "react";

export default function KoachRefresh() {
  const [v, setV] = useState(null);
  const [vis, setVis] = useState({});
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const vRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setVis((p) => ({ ...p, [e.target.id]: true }));
      }),
      { threshold: 0.05 }
    );
    document.querySelectorAll("[data-a]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const s = (id) => vis[id] ? { opacity: 1, transform: "translateY(0)" } : { opacity: 0, transform: "translateY(20px)" };

  const goV = (n) => { setV(n); setMenuOpen(false); setTimeout(() => vRef.current?.scrollIntoView({ behavior: "smooth" }), 60); };
  const goId = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  const CTA = "Agenda tu evaluación";

  const dk = { bg:"#08080A",sf:"#0F0F12",cd:"#131317",bd:"#1A1A1F",bl:"#252530",tx:"#C8C6C0",dm:"#706E68",ft:"#3E3D3A",wh:"#EDEBE6",gd:"#BFA67A",rd:"#B5302A",or:"#C4844A",gn:"#4E8B6E",bu:"#6B8AE0" };
  const lt = { bg:"#F7F5F0",sf:"#EDEAE4",cd:"#FFF",bd:"#DDD9D1",bl:"#CBC7BF",tx:"#4A4843",dm:"#8A8780",ft:"#C4C1BA",wh:"#1A1917",gd:"#96794A",rd:"#B5302A",or:"#B07438",gn:"#3D7A5B",bu:"#5570B8" };
  const c = light ? lt : dk;

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background:c.bg, color:c.tx, minHeight:"100vh", transition:"background .4s,color .4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;1,400;1,500&family=Space+Grotesk:wght@500;700&family=DM+Sans:wght@300;400;500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        .si{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500}
        .mx{max-width:780px;margin:0 auto;padding:0 20px}
        .mw{max-width:1080px;margin:0 auto;padding:0 20px}
        .fd{transition:opacity .7s ease,transform .7s ease}
        .lb{font-weight:500;font-size:.58rem;letter-spacing:.3em;text-transform:uppercase}
        .hd{font-weight:700;line-height:1.08;letter-spacing:-.03em}
        .bd{font-weight:300;font-size:.95rem;line-height:1.7}
        .ls{padding:48px 0}
        .ll{font-size:.55rem;font-weight:600;letter-spacing:.25em;text-transform:uppercase;margin-bottom:6px}

        /* Nav */
        .nav{position:fixed;top:0;left:0;right:0;z-index:50;backdrop-filter:blur(16px);transition:background .4s}
        .nav-in{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;max-width:1080px;margin:0 auto}

        /* Hamburger */
        .ham{background:none;border:none;cursor:pointer;display:flex;flex-direction:column;gap:5px;padding:4px}
        .ham span{display:block;width:20px;height:1.5px;transition:all .3s}

        /* Mobile menu */
        .mob-menu{position:fixed;top:0;left:0;right:0;bottom:0;z-index:49;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:24px;transition:opacity .3s,visibility .3s}
        .mob-menu.hide{opacity:0;visibility:hidden;pointer-events:none}
        .mob-menu.show{opacity:1;visibility:visible}
        .mob-link{font-family:inherit;font-weight:500;font-size:.85rem;letter-spacing:.12em;text-transform:uppercase;background:none;border:none;cursor:pointer;padding:12px 24px;transition:color .3s}

        /* Version tabs */
        .vt{font-family:inherit;font-weight:500;font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;background:transparent;padding:10px 14px;cursor:pointer;transition:all .3s;flex:1;text-align:center;white-space:nowrap}

        /* White theme pieces */
        .ws{padding:48px 0;border-bottom:1px solid #E8E6E1}
        .wpb{background:#FAFAF8;border:1px solid #E8E6E1;padding:32px 20px;text-align:center;position:relative}
        .wpb.wf{border-color:#111}
        .wpb.wf::before{content:'RECOMENDADO';position:absolute;top:-9px;left:50%;transform:translateX(-50%);font-size:.52rem;font-weight:600;letter-spacing:.2em;background:#111;color:#F5F3EE;padding:3px 10px}

        /* Dark price box */
        .dpb{padding:32px 20px;text-align:center;position:relative}
        .dpb.df::before{content:'RECOMENDADO';position:absolute;top:-9px;left:50%;transform:translateX(-50%);font-size:.52rem;font-weight:600;letter-spacing:.2em;background:#BFA67A;color:#08080A;padding:3px 10px}

        @media(max-width:640px){
          .g2{grid-template-columns:1fr!important}
          .g3{grid-template-columns:1fr!important}
          .fg{grid-template-columns:1fr!important}
          .m3{grid-template-columns:1fr!important}
          .vtr{overflow-x:auto;-webkit-overflow-scrolling:touch}
          .typ-grid{grid-template-columns:1fr!important}
          .pal-row{flex-wrap:wrap!important}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav" style={{ background: light ? "rgba(247,245,240,.92)" : "rgba(8,8,10,.92)", borderBottom:`1px solid ${c.bd}` }}>
        <div className="nav-in">
          <span style={{ fontWeight:700, fontSize:".9rem", letterSpacing:".2em", color:c.wh }}>KOACH</span>
          <div style={{ display:"flex", gap:"12px", alignItems:"center" }}>
            {/* Toggle */}
            <button onClick={()=>setLight(!light)} style={{ background:"none", border:`1px solid ${c.bd}`, padding:"5px 10px", cursor:"pointer", display:"flex", alignItems:"center", gap:"6px", fontSize:".58rem", fontWeight:500, letterSpacing:".1em", textTransform:"uppercase", color:c.dm, fontFamily:"inherit" }}>
              <span style={{ display:"inline-block", width:24, height:12, borderRadius:6, background:light?c.gd:c.ft, position:"relative", transition:"background .3s" }}>
                <span style={{ position:"absolute", top:2, left:light?12:2, width:8, height:8, borderRadius:4, background:light?"#FFF":c.dm, transition:"left .3s" }}/>
              </span>
              {light?"Light":"Dark"}
            </button>
            {/* Hamburger */}
            <button className="ham" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menu">
              <span style={{ background:c.wh, transform:menuOpen?"rotate(45deg) translateY(6.5px)":"none" }}/>
              <span style={{ background:c.wh, opacity:menuOpen?0:1 }}/>
              <span style={{ background:c.wh, transform:menuOpen?"rotate(-45deg) translateY(-6.5px)":"none" }}/>
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mob-menu ${menuOpen?"show":"hide"}`} style={{ background:light?"rgba(247,245,240,.98)":"rgba(8,8,10,.98)" }}>
        <button className="mob-link" onClick={()=>goId("estrategia")} style={{ color:c.dm }}>Estrategia</button>
        <button className="mob-link" onClick={()=>goId("fuerzas")} style={{ color:c.dm }}>Fuerzas</button>
        <div style={{ width:40, height:1, background:c.bd }}/>
        <button className="mob-link" onClick={()=>goV(1)} style={{ color:c.gd, fontWeight:700 }}>V1 · Bold</button>
        <button className="mob-link" onClick={()=>goV(2)} style={{ color:c.gd, fontWeight:700 }}>V2 · Premium</button>
        <button className="mob-link" onClick={()=>goV(3)} style={{ color:c.gd, fontWeight:700 }}>V3 · Copy-first</button>
        <button className="mob-link" onClick={()=>goV(4)} style={{ color:c.gd, fontWeight:700 }}>V4 · White Luxury</button>
      </div>

      {/* ╔══════════════════════════════════════════╗
          ║  PART 1 — STRATEGY                       ║
          ╚══════════════════════════════════════════╝ */}

      {/* INTRO */}
      <section id="estrategia" style={{ paddingTop:90, paddingBottom:60 }}>
        <div className="mx">
          <p className="lb" style={{ color:c.gd, marginBottom:24 }}>KOACH · Brand Refresh 2026</p>
          <h1 className="hd" style={{ color:c.wh, fontSize:"clamp(1.8rem,5vw,3rem)", marginBottom:20 }}>
            Mati, acá está<br/>el diagnóstico.
          </h1>
          <p className="bd" style={{ color:c.dm, maxWidth:500, marginBottom:28 }}>
            Le estuve dando vueltas a KOACH. El espacio es brutal, el servicio
            es sólido, el equipo funciona. Pero la marca no comunica lo que
            realmente vendes. Acá va la propuesta — con estrategia, dirección visual
            y cuatro versiones de web para que elijas.
          </p>
          <div style={{ width:40, height:2, background:c.gd }}/>
        </div>
      </section>

      {/* ── ICP ── */}
      <section id="icp" data-a className="fd" style={{ padding:"60px 0", borderTop:`1px solid ${c.bd}`, ...s("icp") }}>
        <div className="mx">
          <p className="lb" style={{ color:c.gd, marginBottom:6 }}>Paso 1</p>
          <h2 className="hd" style={{ color:c.wh, fontSize:"clamp(1.4rem,3.5vw,2rem)", marginBottom:10 }}>Definir a quién le hablas.</h2>
          <p className="bd" style={{ color:c.dm, marginBottom:32, maxWidth:460 }}>
            Hoy el mensaje intenta hablarle a todos — y por eso no le habla
            a nadie con fuerza. Este es tu cliente ideal:
          </p>
          <div style={{ background:c.sf, border:`1px solid ${c.bd}`, padding:"28px 24px", transition:"all .4s" }}>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
              {["34 años","Ingeniero / Jefe de Área","Concepción","$1.5M+ bruto"].map((tg,i)=>(
                <span key={i} style={{ fontSize:".58rem", fontWeight:600, letterSpacing:".18em", textTransform:"uppercase", padding:"4px 10px", border:`1px solid ${c.bd}`, color:c.dm }}>{tg}</span>
              ))}
            </div>
            <p style={{ fontWeight:600, fontSize:"1.05rem", color:c.wh, marginBottom:12 }}>"Sebastián"</p>
            <p className="bd" style={{ color:c.dm, fontSize:".9rem" }}>
              Jornada de 9+ horas sentado. Gana bien — paga $80k en el barbero,
              come en buenos restaurantes, tiene buen auto. Pero su cuerpo no
              refleja el estándar que tiene en todo lo demás. Ha ido a gimnasios.
              Siempre abandona entre el mes 2 y el 4, no por falta de voluntad,
              sino porque nadie lo guía y no ve progreso real.
            </p>
          </div>
        </div>
      </section>

      {/* ── JTBD ── */}
      <section id="jtbd" data-a className="fd" style={{ padding:"60px 0", borderTop:`1px solid ${c.bd}`, ...s("jtbd") }}>
        <div className="mx">
          <p className="lb" style={{ color:c.gd, marginBottom:6 }}>Paso 2</p>
          <h2 className="hd" style={{ color:c.wh, fontSize:"clamp(1.4rem,3.5vw,2rem)", marginBottom:10 }}>El trabajo que te contrata para hacer.</h2>
          <p className="bd" style={{ color:c.dm, marginBottom:28, maxWidth:460 }}>Sebastián no compra "sesiones de fuerza". Compra resolver esto:</p>
          <div style={{ borderLeft:`3px solid ${c.gd}`, padding:"24px 28px", background:c.sf, transition:"all .4s" }}>
            <p className="si" style={{ fontSize:"clamp(1rem,2.5vw,1.25rem)", lineHeight:1.55, color:c.tx }}>
              "Cuando noto que mi cuerpo ya no responde como antes — me canso
              subiendo escaleras, la ropa me aprieta, llego reventado a la casa —
              quiero encontrar un sistema de entrenamiento que funcione de verdad
              y que no dependa de que yo sepa qué hacer, para sentirme fuerte,
              con energía y seguro de mi presencia."
            </p>
          </div>
        </div>
      </section>

      {/* ── FORCES ── */}
      <section id="fuerzas" data-a className="fd" style={{ padding:"60px 0", borderTop:`1px solid ${c.bd}`, ...s("fuerzas") }}>
        <div className="mx">
          <p className="lb" style={{ color:c.gd, marginBottom:6 }}>Paso 3</p>
          <h2 className="hd" style={{ color:c.wh, fontSize:"clamp(1.4rem,3.5vw,2rem)", marginBottom:10 }}>Las 4 fuerzas que guían el copy.</h2>
          <p className="bd" style={{ color:c.dm, marginBottom:12, maxWidth:480 }}>
            Dos empujan hacia adelante, dos frenan. El copy de la web trabaja las cuatro:
          </p>
          <div style={{ textAlign:"center", padding:"20px 0 28px" }}>
            <span style={{ fontSize:".65rem", fontWeight:600, letterSpacing:".12em", color:c.gn }}>EMPUJAN →</span>
            <span style={{ fontSize:".65rem", color:c.ft, padding:"0 10px" }}>DECISIÓN</span>
            <span style={{ fontSize:".65rem", fontWeight:600, letterSpacing:".12em", color:c.rd }}>← FRENAN</span>
          </div>
          <div className="fg" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[
              { nm:"PUSH",cl:c.rd,sb:"Empuja del status quo",ln:["Me siento pesado, sin energía","La ropa no me queda bien","Me agoto con lo básico","Mi cuerpo no refleja mi nivel"],jb:"Amplificar el dolor." },
              { nm:"PULL",cl:c.gn,sb:"Atrae hacia KOACH",ln:["Sentirme fuerte y con energía","Que mi físico refleje mi estándar","Energía al final del día","Seguridad en mi presencia"],jb:"Pintar el después." },
              { nm:"ANSIEDAD",cl:c.or,sb:"Frena el cambio",ln:["¿Y si es otro gym disfrazado?","¿Voy a parecer ridículo?","¿$70k/mes vale la pena?","¿Va a funcionar esta vez?"],jb:"Comparación, ratio, sistema." },
              { nm:"HÁBITO",cl:c.bu,sb:"Mantiene donde está",ln:["Ya pago el gym y a veces voy","El lunes empiezo","No tengo tiempo","Ya lo intenté"],jb:"Ir al gym ≠ entrenar." },
            ].map((f,i)=>(
              <div key={i} style={{ padding:"20px 18px", borderLeft:`2px solid ${f.cl}`, background:c.sf, transition:"all .4s" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                  <span style={{ fontWeight:700, fontSize:".78rem", color:f.cl, letterSpacing:".08em" }}>{f.nm}</span>
                  <span style={{ fontSize:".52rem", color:c.dm }}>{f.sb}</span>
                </div>
                {f.ln.map((l,j)=><p key={j} style={{ fontSize:".82rem", fontWeight:300, color:c.tx, marginBottom:4 }}>"{l}"</p>)}
                <div style={{ borderTop:`1px solid ${c.bd}`, marginTop:12, paddingTop:8 }}>
                  <p style={{ fontSize:".68rem", fontWeight:500, color:c.dm }}><span style={{ color:f.cl }}>→</span> {f.jb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUAL DIRECTION ── */}
      <section id="visual" data-a className="fd" style={{ padding:"60px 0", borderTop:`1px solid ${c.bd}`, ...s("visual") }}>
        <div className="mx">
          <p className="lb" style={{ color:c.gd, marginBottom:6 }}>Paso 4</p>
          <h2 className="hd" style={{ color:c.wh, fontSize:"clamp(1.4rem,3.5vw,2rem)", marginBottom:10 }}>Dirección visual explorada.</h2>
          <p className="bd" style={{ color:c.dm, marginBottom:32, maxWidth:480 }}>
            Probamos combinaciones de tipografía y paleta hasta encontrar cuatro
            direcciones que funcionan. Acá está el sistema que guía las versiones:
          </p>

          {/* Typography */}
          <div style={{ marginBottom:36 }}>
            <p className="lb" style={{ color:c.gd, marginBottom:16 }}>Tipografías exploradas</p>
            <div className="typ-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {[
                { name:"Outfit", role:"Display principal", sample:"Deja de pagar", css:"'Outfit',sans-serif", w:700, note:"Geométrica, moderna. Peso visual alto. Usada en V1, V2, V3." },
                { name:"Cormorant Garamond", role:"Acento editorial", sample:"entrena.", css:"'Cormorant Garamond',serif", w:500, it:true, note:"Serif italic. Contraste premium. Acentúa palabras clave en V2." },
                { name:"Space Grotesk", role:"Alternativa display", sample:"KOACH CLUB", css:"'Space Grotesk',sans-serif", w:700, note:"Condensada, técnica. Explorada inicialmente, descartada por genérica en landing fitness." },
                { name:"DM Sans", role:"Body alternativa", sample:"Cada sesión planificada y supervisada.", css:"'DM Sans',sans-serif", w:400, note:"Legibilidad alta. Más suave que Outfit para bloques largos." },
              ].map((f,i)=>(
                <div key={i} style={{ padding:"18px 16px", background:c.sf, border:`1px solid ${c.bd}`, transition:"all .4s" }}>
                  <p style={{ fontSize:".55rem", fontWeight:600, letterSpacing:".2em", textTransform:"uppercase", color:c.gd, marginBottom:4 }}>{f.role}</p>
                  <p style={{ fontFamily:f.css, fontWeight:f.w, fontStyle:f.it?"italic":"normal", fontSize:"1.3rem", color:c.wh, marginBottom:6, lineHeight:1.2 }}>{f.sample}</p>
                  <p style={{ fontSize:".72rem", fontWeight:600, color:c.tx, marginBottom:2 }}>{f.name}</p>
                  <p style={{ fontSize:".72rem", fontWeight:300, color:c.dm }}>{f.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Palettes */}
          <div>
            <p className="lb" style={{ color:c.gd, marginBottom:16 }}>Paletas de color</p>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[
                { name:"V1 Bold — Contraste crudo", colors:[
                  { hex:"#08080A",label:"BG" },{ hex:"#EDEBE6",label:"Text" },{ hex:"#B5302A",label:"Acento" },{ hex:"#0F0F12",label:"Surface" },{ hex:"#BFA67A",label:"CTA" }
                ]},
                { name:"V2 Premium — Industrial dorado", colors:[
                  { hex:"#08080A",label:"BG" },{ hex:"#BFA67A",label:"Gold" },{ hex:"#EDEBE6",label:"Text" },{ hex:"#1A1A1F",label:"Border" },{ hex:"#706E68",label:"Muted" }
                ]},
                { name:"V3 Copy — Editorial mínimo", colors:[
                  { hex:"#09090B",label:"BG" },{ hex:"#D4D2CC",label:"Text" },{ hex:"#BFA67A",label:"Accent" },{ hex:"#3E3D3A",label:"Faint" },{ hex:"#111113",label:"Surface" }
                ]},
                { name:"V4 White — Lujo silencioso", colors:[
                  { hex:"#F5F3EE",label:"BG" },{ hex:"#111111",label:"Text" },{ hex:"#EFEDE8",label:"Surface" },{ hex:"#E0DED9",label:"Border" },{ hex:"#999999",label:"Muted" }
                ]},
              ].map((pal,i)=>(
                <div key={i} style={{ padding:"16px", background:c.sf, border:`1px solid ${c.bd}`, transition:"all .4s" }}>
                  <p style={{ fontSize:".68rem", fontWeight:600, color:c.tx, marginBottom:12 }}>{pal.name}</p>
                  <div className="pal-row" style={{ display:"flex", gap:8, flexWrap:"nowrap" }}>
                    {pal.colors.map((cl,j)=>(
                      <div key={j} style={{ flex:1, minWidth:48 }}>
                        <div style={{ width:"100%", paddingBottom:"60%", background:cl.hex, border:`1px solid ${c.bd}`, marginBottom:4 }}/>
                        <p style={{ fontSize:".55rem", fontWeight:500, color:c.dm, textAlign:"center" }}>{cl.label}</p>
                        <p style={{ fontSize:".5rem", color:c.ft, textAlign:"center" }}>{cl.hex}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRANSITION ── */}
      <section id="trans" data-a className="fd" style={{ padding:"60px 0", borderTop:`1px solid ${c.bd}`, ...s("trans") }}>
        <div className="mx" style={{ textAlign:"center" }}>
          <div style={{ width:40, height:2, background:c.gd, margin:"0 auto 24px" }}/>
          <h2 className="hd" style={{ color:c.wh, fontSize:"clamp(1.4rem,3.5vw,2rem)", marginBottom:12 }}>
            4 versiones. Elige tu dirección.
          </h2>
          <p className="bd" style={{ color:c.dm, maxWidth:440, margin:"0 auto 32px" }}>
            Cada una toma la misma estrategia con un tono distinto.
            Mira las cuatro y combinamos lo mejor de cada una.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, maxWidth:460, margin:"0 auto" }}>
            {[
              { n:1, lb:"V1 · Bold", ds:"Confrontacional" },
              { n:2, lb:"V2 · Premium", ds:"Refinada" },
              { n:3, lb:"V3 · Copy", ds:"Texto = diseño" },
              { n:4, lb:"V4 · White", ds:"Lujo silencioso" },
            ].map(it=>(
              <button key={it.n} onClick={()=>goV(it.n)} style={{ fontFamily:"inherit", fontSize:".82rem", background:c.sf, border:`1px solid ${c.bd}`, color:c.tx, padding:"16px 18px", cursor:"pointer", textAlign:"left", transition:"all .3s" }}>
                <span style={{ display:"block", fontWeight:700, color:c.gd, marginBottom:2, letterSpacing:".04em" }}>{it.lb}</span>
                <span style={{ fontSize:".72rem", color:c.dm }}>{it.ds}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════╗
          ║  PART 2 — LANDINGS                       ║
          ╚══════════════════════════════════════════╝ */}

      <div ref={vRef} style={{ borderTop:`1px solid #1A1A1F` }}>
        {/* Sticky tabs */}
        <div style={{ position:"sticky", top:0, zIndex:40, background:"rgba(8,8,10,.95)", backdropFilter:"blur(16px)", borderBottom:"1px solid #1A1A1F", padding:"10px 0" }}>
          <div className="mw">
            <div className="vtr" style={{ display:"flex", gap:4 }}>
              {[{n:1,l:"V1 Bold"},{n:2,l:"V2 Premium"},{n:3,l:"V3 Copy"},{n:4,l:"V4 White"}].map(tb=>(
                <button key={tb.n} className="vt" onClick={()=>setV(tb.n)} style={{
                  border:`1px solid ${v===tb.n?"#BFA67A":"#1A1A1F"}`,
                  color:v===tb.n?"#BFA67A":"#706E68",
                  background:v===tb.n?"#BFA67A0A":"transparent",
                }}>{tb.l}</button>
              ))}
            </div>
          </div>
        </div>

        {v===null&&<div style={{ padding:"80px 20px", textAlign:"center", background:"#08080A" }}><p style={{ fontSize:"1rem", color:"#706E68" }}>↑ Elige una versión para verla.</p></div>}

        {/* ═══ V1 BOLD ═══ */}
        {v===1&&(
          <div style={{ background:"#08080A", color:"#C8C6C0" }}>
            <div className="mw" style={{ padding:"12px 20px 0" }}>
              <p style={{ fontSize:".68rem", color:"#706E68", padding:"6px 0" }}><span style={{ color:"#BFA67A", fontWeight:600 }}>V1 BOLD</span> — Oscura, tipografía grande, confrontacional.</p>
            </div>
            <div className="ls" style={{ borderBottom:"1px solid #1A1A1F" }}>
              <div className="mw">
                <p className="ll" style={{ color:"#3E3D3A" }}>HERO · Push</p>
                <h2 style={{ fontWeight:800, fontSize:"clamp(2rem,6vw,3.5rem)", lineHeight:1.05, letterSpacing:"-.04em", color:"#EDEBE6", marginBottom:20 }}>
                  DEJA DE PAGAR<br/>UN GIMNASIO QUE<br/>NO TE <span style={{ color:"#B5302A" }}>ENTRENA.</span>
                </h2>
                <p className="bd" style={{ color:"#706E68", maxWidth:440 }}>KOACH es un servicio de entrenamiento de fuerza personalizado. No vendemos acceso. Cada sesión planificada, supervisada y progresada. Máximo 4 personas por coach.</p>
              </div>
            </div>
            <div className="ls" style={{ background:"#0F0F12", borderBottom:"1px solid #1A1A1F" }}>
              <div className="mw">
                <p className="ll" style={{ color:"#3E3D3A" }}>DOLOR · Push</p>
                <h3 className="hd" style={{ color:"#EDEBE6", fontSize:"clamp(1.3rem,3vw,1.8rem)", marginBottom:16 }}>El gimnasio tradicional te falló.</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {["Pagas y no te entrena nadie.","No hay plan real.","Nadie corrige tu técnica.","El personal trainer es un lujo."].map((x,i)=>(
                    <div key={i} style={{ padding:"12px 16px", borderLeft:"2px solid #B5302A44", background:"#B5302A08" }}>
                      <p style={{ fontSize:".85rem", fontWeight:500, color:"#C8C6C0" }}>{x}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ls" style={{ borderBottom:"1px solid #1A1A1F" }}>
              <div className="mw">
                <p className="ll" style={{ color:"#3E3D3A" }}>MÉTRICAS</p>
                <div className="m3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderTop:"1px solid #1A1A1F", borderBottom:"1px solid #1A1A1F" }}>
                  {[{n:"1:4",l:"Coach/persona"},{n:"60min",l:"Planificadas"},{n:"100%",l:"Individuales"}].map((m,i)=>(
                    <div key={i} style={{ padding:"24px 12px", textAlign:"center", borderRight:i<2?"1px solid #1A1A1F":"none" }}>
                      <p className="hd" style={{ color:"#EDEBE6", fontSize:"1.8rem" }}>{m.n}</p>
                      <p className="lb" style={{ color:"#706E68", marginTop:4, fontSize:".5rem" }}>{m.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ls" style={{ background:"#0F0F12", borderBottom:"1px solid #1A1A1F" }}>
              <div className="mw">
                <p className="ll" style={{ color:"#3E3D3A" }}>PRECIOS</p>
                <div className="g3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                  {[{f:"2x SEMANA",p:"$50.000",s:"8 sesiones",ft:false},{f:"3x SEMANA",p:"$70.000",s:"12 sesiones",ft:true},{f:"FULL WEEK",p:"$90.000",s:"25 sesiones",ft:false}].map((pl,i)=>(
                    <div key={i} className={`dpb ${pl.ft?"df":""}`} style={{ background:"#131317", border:`1px solid ${pl.ft?"#BFA67A":"#1A1A1F"}` }}>
                      <p className="lb" style={{ color:pl.ft?"#EDEBE6":"#706E68", marginBottom:10, fontSize:".5rem" }}>{pl.f}</p>
                      <p className="hd" style={{ color:"#EDEBE6", fontSize:"1.7rem", marginBottom:2 }}>{pl.p}</p>
                      <p style={{ fontSize:".72rem", color:"#706E68" }}>{pl.s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ls" style={{ textAlign:"center", borderBottom:"1px solid #1A1A1F" }}>
              <div className="mx">
                <h2 className="hd" style={{ color:"#EDEBE6", fontSize:"clamp(1.5rem,4vw,2.2rem)", marginBottom:16 }}>HABLA CON UN <span style={{ color:"#B5302A" }}>KOACH.</span></h2>
                <button style={{ fontFamily:"inherit", fontWeight:600, fontSize:".68rem", letterSpacing:".2em", textTransform:"uppercase", background:"#BFA67A", color:"#08080A", border:"none", padding:"14px 32px", cursor:"pointer" }}>{CTA}</button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ V2 PREMIUM ═══ */}
        {v===2&&(
          <div style={{ background:"#08080A", color:"#C8C6C0" }}>
            <div className="mw" style={{ padding:"12px 20px 0" }}>
              <p style={{ fontSize:".68rem", color:"#706E68", padding:"6px 0" }}><span style={{ color:"#BFA67A", fontWeight:600 }}>V2 PREMIUM</span> — Industrial refinada. Serif italic. Más aire.</p>
            </div>
            <div className="ls" style={{ borderBottom:"1px solid #1A1A1F" }}>
              <div className="mw">
                <p className="ll" style={{ color:"#3E3D3A" }}>HERO · Push</p>
                <p className="lb" style={{ color:"#BFA67A", letterSpacing:".35em", marginBottom:20 }}>Estudio boutique · Concepción</p>
                <h2 className="hd" style={{ color:"#EDEBE6", fontSize:"clamp(1.8rem,5vw,3rem)", marginBottom:20 }}>
                  Deja de pagar<br/>por un gimnasio<br/>que no te <span className="si" style={{ fontSize:"1.1em", color:"#BFA67A" }}>entrena.</span>
                </h2>
                <p className="bd" style={{ color:"#706E68", maxWidth:440 }}>KOACH es un servicio de entrenamiento de fuerza personalizado. Cada sesión planificada, supervisada y progresada. Máximo 4 personas por coach.</p>
              </div>
            </div>
            <div className="ls" style={{ background:"#0F0F12", borderBottom:"1px solid #1A1A1F" }}>
              <div className="mw">
                <p className="ll" style={{ color:"#3E3D3A" }}>COMPARACIÓN · Ansiedad</p>
                <h3 className="hd" style={{ color:"#EDEBE6", fontSize:"1.4rem", marginBottom:6, textAlign:"center" }}>Acceso <span className="si" style={{ color:"#BFA67A", fontSize:"1.15em" }}>no es</span> servicio.</h3>
                <p className="bd" style={{ color:"#706E68", textAlign:"center", marginBottom:24 }}>La diferencia no es $20.000. Es que uno te entrena y el otro no.</p>
                <div style={{ border:"1px solid #1A1A1F" }}>
                  {[["Modelo","Acceso a máquinas","Servicio de entrenamiento"],["Rutina","Tú improvisas","Planificada por tu coach"],["Supervisión","Nula","Constante cada sesión"],["Grupo","50+ personas","Máximo 4 por coach"],["Resultado","Tu problema","Nuestra responsabilidad"]].map(([lb,gy,ko],i)=>(
                    <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderBottom:i<4?"1px solid #1A1A1F":"none" }}>
                      <div style={{ padding:"12px 16px", fontSize:".82rem", fontWeight:300, color:"#3E3D3A", borderRight:"1px solid #1A1A1F" }}><span style={{ fontWeight:500, color:"#706E68", marginRight:10, fontSize:".7rem" }}>{lb}</span>{gy}</div>
                      <div style={{ padding:"12px 16px", fontSize:".82rem", fontWeight:300, color:"#C8C6C0" }}>{ko}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ls" style={{ borderBottom:"1px solid #1A1A1F" }}>
              <div className="mx">
                <p className="ll" style={{ color:"#3E3D3A" }}>SISTEMA</p>
                <h3 className="hd" style={{ color:"#EDEBE6", fontSize:"1.4rem", marginBottom:6 }}>No entras a un gimnasio.</h3>
                <h3 style={{ fontWeight:700, fontSize:"1.4rem", lineHeight:1.08, letterSpacing:"-.03em", marginBottom:28 }}>Entras a un <span className="si" style={{ color:"#BFA67A", fontSize:"1.15em" }}>sistema.</span></h3>
                {[{n:"01",t:"Evaluación",d:"Tu punto de partida. Historial. Objetivo."},{n:"02",t:"Rutina individual",d:"Tu coach diseña tu plan. Solo tuyo."},{n:"03",t:"Supervisión real",d:"Corrección en cada serie. 4 personas máximo."},{n:"04",t:"Progresión medible",d:"Todo se registra. Todo se ajusta."}].map((st,i)=>(
                  <div key={i} style={{ display:"flex", gap:16, marginBottom:20 }}>
                    <span style={{ fontWeight:700, fontSize:"1.1rem", color:"#3E3D3A", minWidth:28 }}>{st.n}</span>
                    <div><p style={{ fontWeight:600, fontSize:".9rem", color:"#EDEBE6", marginBottom:2 }}>{st.t}</p><p style={{ fontSize:".82rem", fontWeight:300, color:"#706E68" }}>{st.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ls" style={{ textAlign:"center", borderBottom:"1px solid #1A1A1F" }}>
              <div className="mx">
                <h2 className="hd" style={{ color:"#EDEBE6", fontSize:"1.7rem", marginBottom:6 }}>Tu primer paso</h2>
                <h2 style={{ fontWeight:700, fontSize:"1.7rem", lineHeight:1.08, letterSpacing:"-.03em", marginBottom:20 }}>es hablar con un <span className="si" style={{ color:"#BFA67A", fontSize:"1.15em" }}>Koach.</span></h2>
                <button style={{ fontFamily:"inherit", fontWeight:600, fontSize:".68rem", letterSpacing:".2em", textTransform:"uppercase", background:"#BFA67A", color:"#08080A", border:"none", padding:"14px 32px", cursor:"pointer" }}>{CTA}</button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ V3 COPY ═══ */}
        {v===3&&(
          <div style={{ background:"#08080A", color:"#C8C6C0" }}>
            <div className="mw" style={{ padding:"12px 20px 0" }}>
              <p style={{ fontSize:".68rem", color:"#706E68", padding:"6px 0" }}><span style={{ color:"#BFA67A", fontWeight:600 }}>V3 COPY-FIRST</span> — Ancho editorial. El texto es el diseño.</p>
            </div>
            <div className="ls" style={{ borderBottom:"1px solid #1A1A1F" }}>
              <div className="mx">
                <p className="ll" style={{ color:"#3E3D3A" }}>HERO · Push</p>
                <h2 className="hd" style={{ color:"#EDEBE6", fontSize:"clamp(1.6rem,4.5vw,2.6rem)", marginBottom:20 }}>Llevas meses pagando<br/>un gimnasio donde<br/>nadie te entrena.</h2>
                <p className="bd" style={{ color:"#706E68", maxWidth:420 }}>Llegas. Improvisas. Te vas sin saber si avanzaste. El problema nunca fue tu disciplina. <span style={{ color:"#EDEBE6", fontWeight:500 }}>Fue que nadie se hizo cargo de tu entrenamiento.</span></p>
              </div>
            </div>
            <div className="ls" style={{ background:"#0F0F12", borderBottom:"1px solid #1A1A1F" }}>
              <div className="mx">
                <p className="ll" style={{ color:"#3E3D3A" }}>AMPLIFICACIÓN · Push</p>
                {["Te cansas subiendo escaleras.","La ropa que te gustaba ya no te queda.","Llegas a la casa sin energía para nada.","Tu cuerpo no refleja el estándar que tienes en todo lo demás."].map((ln,i)=>(
                  <div key={i} style={{ padding:"14px 0", borderBottom:"1px solid #1A1A1F" }}>
                    <p style={{ fontWeight:i===3?600:400, fontSize:"1rem", color:i===3?"#EDEBE6":"#C8C6C0" }}>{ln}</p>
                  </div>
                ))}
                <p className="bd" style={{ color:"#706E68", marginTop:20 }}>No necesitas más motivación. Necesitas un sistema y alguien responsable de que funcione.</p>
              </div>
            </div>
            <div className="ls" style={{ textAlign:"center", borderBottom:"1px solid #1A1A1F" }}>
              <div className="mx">
                <p className="ll" style={{ color:"#3E3D3A" }}>QUIEBRE · Hábito</p>
                <h3 className="hd" style={{ color:"#EDEBE6", fontSize:"clamp(1.4rem,3.5vw,2rem)", marginBottom:14 }}>Ir al gimnasio no es entrenar.</h3>
                <p className="bd" style={{ color:"#706E68", maxWidth:400, margin:"0 auto" }}>Si nadie planifica tu rutina, nadie supervisa tu ejecución y nadie mide tu avance — <span style={{ color:"#EDEBE6", fontWeight:500 }}>lo que haces es ocupar máquinas.</span></p>
              </div>
            </div>
            <div className="ls" style={{ background:"#0F0F12", borderBottom:"1px solid #1A1A1F" }}>
              <div className="mw">
                <p className="ll" style={{ color:"#3E3D3A" }}>DESPUÉS · Pull</p>
                <h3 className="hd" style={{ color:"#EDEBE6", fontSize:"1.4rem", marginBottom:24, textAlign:"center" }}>Esto cambia en 12 semanas.</h3>
                <div className="g3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", border:"1px solid #1A1A1F" }}>
                  {[{t:"Tu energía",b:"Reventado. Sofá a las 9pm.",a:"Te queda energía para ti al final del día."},{t:"Tu cuerpo",b:"Pesado. La ropa te aprieta.",a:"Más firme. La ropa te queda."},{t:"Tu cabeza",b:"Sabes que deberías. No lo haces.",a:"Entrenas 3x/semana. Es parte de tu rutina."}].map((it,i)=>(
                    <div key={i} style={{ padding:"22px 18px", borderRight:i<2?"1px solid #1A1A1F":"none" }}>
                      <p className="lb" style={{ color:"#BFA67A", marginBottom:12, fontSize:".5rem" }}>{it.t}</p>
                      <p style={{ fontSize:".82rem", color:"#3E3D3A", textDecoration:"line-through", marginBottom:10, lineHeight:1.5 }}>{it.b}</p>
                      <p style={{ fontSize:".85rem", fontWeight:500, color:"#EDEBE6", lineHeight:1.4 }}>{it.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ls" style={{ textAlign:"center", borderBottom:"1px solid #1A1A1F" }}>
              <div className="mx">
                <h2 className="hd" style={{ color:"#EDEBE6", fontSize:"1.7rem", marginBottom:14 }}>Deja de improvisar.</h2>
                <p className="bd" style={{ color:"#706E68", maxWidth:340, margin:"0 auto 24px" }}>Una evaluación. Sin compromiso. Vemos dónde estás y si KOACH tiene sentido para ti.</p>
                <button style={{ fontFamily:"inherit", fontWeight:600, fontSize:".68rem", letterSpacing:".2em", textTransform:"uppercase", background:"#BFA67A", color:"#08080A", border:"none", padding:"14px 32px", cursor:"pointer" }}>{CTA}</button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ V4 WHITE LUXURY ═══ */}
        {v===4&&(
          <div style={{ background:"#F5F3EE", color:"#444" }}>
            <div className="mw" style={{ padding:"12px 20px 0" }}>
              <p style={{ fontSize:".68rem", color:"#999", padding:"6px 0" }}><span style={{ color:"#111", fontWeight:600 }}>V4 WHITE LUXURY</span> — Fondo claro, lujo silencioso.</p>
            </div>
            <div className="ws" style={{ paddingTop:64, paddingBottom:64 }}>
              <div className="mx">
                <p style={{ fontWeight:500, fontSize:".58rem", letterSpacing:".4em", textTransform:"uppercase", color:"#AAA", marginBottom:28 }}>Estudio de entrenamiento · Concepción</p>
                <h2 style={{ fontWeight:700, fontSize:"clamp(2rem,5.5vw,3.2rem)", lineHeight:1.06, letterSpacing:"-.035em", color:"#111", marginBottom:24 }}>Tu gimnasio te cobra.<br/>KOACH te <span className="si" style={{ fontSize:"1.08em" }}>entrena.</span></h2>
                <p style={{ fontWeight:300, fontSize:"1rem", lineHeight:1.7, color:"#888", maxWidth:400 }}>Entrenamiento de fuerza personalizado. Cada sesión planificada, supervisada y progresada. Máximo 4 personas.</p>
              </div>
            </div>
            <div style={{ borderTop:"1px solid #E0DED9", borderBottom:"1px solid #E0DED9" }}>
              <div className="mw">
                <div className="m3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)" }}>
                  {[{n:"1:4",l:"Coach/persona"},{n:"60 min",l:"Planificadas"},{n:"100%",l:"Individuales"}].map((m,i)=>(
                    <div key={i} style={{ padding:"28px 16px", textAlign:"center", borderRight:i<2?"1px solid #E0DED9":"none" }}>
                      <p style={{ fontWeight:700, fontSize:"1.6rem", letterSpacing:"-.03em", color:"#111" }}>{m.n}</p>
                      <p style={{ fontWeight:500, fontSize:".52rem", letterSpacing:".25em", textTransform:"uppercase", color:"#BBB", marginTop:4 }}>{m.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ws" style={{ background:"#EFEDE8" }}>
              <div className="mx" style={{ textAlign:"center" }}>
                <h3 style={{ fontWeight:700, fontSize:"clamp(1.4rem,3.5vw,2rem)", letterSpacing:"-.03em", color:"#111", marginBottom:16 }}>Ir al gimnasio no es entrenar.</h3>
                <p style={{ fontWeight:300, fontSize:".95rem", lineHeight:1.7, color:"#888", maxWidth:400, margin:"0 auto" }}>Si nadie diseña tu rutina, nadie corrige tu técnica y nadie mide tu avance — lo que haces es ocupar máquinas.</p>
              </div>
            </div>
            <div className="ws">
              <div className="mw">
                <div className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", border:"1px solid #E0DED9" }}>
                  <div style={{ padding:"32px 24px", borderRight:"1px solid #E0DED9" }}>
                    <p style={{ fontWeight:600, fontSize:".55rem", letterSpacing:".25em", textTransform:"uppercase", color:"#CCC", marginBottom:20 }}>Gimnasio · ~$30.000/mes</p>
                    {["Acceso libre sin guía","Sin plan — improvisas","Sin supervisión","50+ personas","Tu problema"].map((x,i)=><p key={i} style={{ fontSize:".85rem", fontWeight:300, color:"#CCC", marginBottom:8, lineHeight:1.5 }}>{x}</p>)}
                  </div>
                  <div style={{ padding:"32px 24px", background:"#FAFAF8" }}>
                    <p style={{ fontWeight:600, fontSize:".55rem", letterSpacing:".25em", textTransform:"uppercase", color:"#111", marginBottom:20 }}>KOACH · desde $50.000/mes</p>
                    {["Servicio completo","Rutina planificada","Corrección cada sesión","Máximo 4 por coach","Nuestra responsabilidad"].map((x,i)=><p key={i} style={{ fontSize:".85rem", fontWeight:i===4?500:400, color:i===4?"#111":"#444", marginBottom:8, lineHeight:1.5 }}>{x}</p>)}
                  </div>
                </div>
                <p style={{ textAlign:"center", marginTop:14, fontSize:".8rem", color:"#AAA" }}>La diferencia no es $20.000. <span style={{ color:"#111", fontWeight:500 }}>Es que uno te entrena y el otro no.</span></p>
              </div>
            </div>
            <div className="ws" style={{ background:"#EFEDE8" }}>
              <div className="mw">
                <h3 style={{ fontWeight:700, fontSize:"1.4rem", letterSpacing:"-.03em", color:"#111", marginBottom:32, textAlign:"center" }}>12 semanas después.</h3>
                <div className="g3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", border:"1px solid #E0DED9", background:"#F5F3EE" }}>
                  {[{t:"Energía",b:"Reventado a la casa.",a:"Te queda energía al final del día."},{t:"Cuerpo",b:"Pesado. La ropa aprieta.",a:"Más firme. La ropa te queda."},{t:"Disciplina",b:"Sabes que deberías. No lo haces.",a:"Entrenas 3x/semana sin pensarlo."}].map((it,i)=>(
                    <div key={i} style={{ padding:"28px 20px", borderRight:i<2?"1px solid #E0DED9":"none" }}>
                      <p style={{ fontWeight:600, fontSize:".55rem", letterSpacing:".3em", textTransform:"uppercase", color:"#BBB", marginBottom:14 }}>{it.t}</p>
                      <p style={{ fontSize:".82rem", color:"#CCC", textDecoration:"line-through", marginBottom:10, lineHeight:1.5, fontWeight:300 }}>{it.b}</p>
                      <p style={{ fontSize:".88rem", fontWeight:500, color:"#111", lineHeight:1.4 }}>{it.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ws">
              <div className="mx">
                <h3 style={{ fontWeight:700, fontSize:"1.4rem", letterSpacing:"-.03em", color:"#111", marginBottom:32 }}>Cómo funciona.</h3>
                {[{n:"01",t:"Evaluación",d:"Punto de partida, historial, objetivo."},{n:"02",t:"Tu rutina",d:"Plan individual. Aunque compartas horario, tu rutina es solo tuya."},{n:"03",t:"Supervisión",d:"Corrección técnica cada serie. Máximo 4 por coach."},{n:"04",t:"Progresión",d:"Cada sesión se registra. Todo se ajusta."}].map((st,i)=>(
                  <div key={i} style={{ display:"flex", gap:18, marginBottom:24 }}>
                    <span style={{ fontWeight:700, fontSize:"1rem", color:"#DDD", minWidth:28 }}>{st.n}</span>
                    <div style={{ borderBottom:"1px solid #E8E6E1", paddingBottom:22, flex:1 }}>
                      <p style={{ fontWeight:600, fontSize:".9rem", color:"#111", marginBottom:2 }}>{st.t}</p>
                      <p style={{ fontSize:".85rem", fontWeight:300, color:"#888", lineHeight:1.6 }}>{st.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ws" style={{ background:"#EFEDE8" }}>
              <div className="mw">
                <h3 style={{ fontWeight:700, fontSize:"1.4rem", letterSpacing:"-.03em", color:"#111", marginBottom:6, textAlign:"center" }}>Elige tu frecuencia.</h3>
                <p style={{ fontWeight:300, fontSize:".88rem", color:"#999", textAlign:"center", marginBottom:32 }}>Rutina personal + supervisión + progresión incluida.</p>
                <div className="g3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                  {[{f:"2x SEMANA",p:"$50.000",s:"8 sesiones",ft:false},{f:"3x SEMANA",p:"$70.000",s:"12 sesiones",ft:true},{f:"FULL WEEK",p:"$90.000",s:"25 sesiones",ft:false}].map((pl,i)=>(
                    <div key={i} className={`wpb ${pl.ft?"wf":""}`}>
                      <p style={{ fontWeight:500, fontSize:".55rem", letterSpacing:".25em", textTransform:"uppercase", color:pl.ft?"#111":"#AAA", marginBottom:12 }}>{pl.f}</p>
                      <p style={{ fontWeight:700, fontSize:"1.7rem", letterSpacing:"-.03em", color:"#111", marginBottom:2 }}>{pl.p}</p>
                      <p style={{ fontSize:".72rem", fontWeight:300, color:"#999" }}>{pl.s}</p>
                    </div>
                  ))}
                </div>
                <p style={{ textAlign:"center", marginTop:16, fontSize:".78rem", color:"#AAA", fontWeight:300 }}>
                  <span style={{ fontWeight:600, color:"#111", letterSpacing:".08em" }}>KOACH ONE</span> · 1:1 · $20.000/sesión · Packs 8, 12, 16
                </p>
              </div>
            </div>
            <div style={{ padding:"80px 0 64px", textAlign:"center", background:"#F5F3EE" }}>
              <div className="mx">
                <h2 style={{ fontWeight:700, fontSize:"clamp(1.6rem,4vw,2.4rem)", letterSpacing:"-.03em", color:"#111", marginBottom:14 }}>El primer paso es simple.</h2>
                <p style={{ fontWeight:300, fontSize:".95rem", color:"#888", maxWidth:360, margin:"0 auto 28px", lineHeight:1.7 }}>Una evaluación. Sin compromiso. Vemos dónde estás y si KOACH tiene sentido para ti.</p>
                <button style={{ fontFamily:"inherit", fontWeight:600, fontSize:".68rem", letterSpacing:".2em", textTransform:"uppercase", background:"#111", color:"#F5F3EE", border:"none", padding:"14px 32px", cursor:"pointer" }}>{CTA}</button>
                <p style={{ fontSize:".68rem", color:"#BBB", marginTop:12 }}>Respuesta en menos de 24 horas</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ padding:"32px 0", borderTop:"1px solid #1A1A1F", background:"#08080A" }}>
        <div className="mx" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
          <p style={{ fontSize:".62rem", color:"#3E3D3A" }}>KOACH Brand Refresh · Diego · Marzo 2026</p>
          <p style={{ fontSize:".62rem", color:"#3E3D3A" }}>Estrategia + Diseño + Desarrollo</p>
        </div>
      </footer>
    </div>
  );
}

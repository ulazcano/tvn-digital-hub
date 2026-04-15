import { useState, useRef, useEffect } from "react";
import NOTES_DATA from "./data/notes_data.json";
import YouTubePlayer from "./components/YouTubePlayer";
import TrimSelector from "./components/TrimSelector";
import { timeToSec } from "./utils/time";

const TIGA_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAtCAMAAADcD9SdAAAAJFBMVEUAAAAGFTYBAwoHEy0mYtwFDiEDCBUnZukkXs8gULAYPIUSKlxH+2uCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE8UlEQVR4nO1Y23ItKQhVFLz9//9OcetWt0l2knOqZmqah+xuG5UlsMCE8MgjjzzyyCOP/L8Fwn9AACAQHoUQCV5hAE/50UbwtQaE30isH0qLL9thSun7+70xDVJK+CskWPNJSim55B0JpBgTfXsPnha/ABJj/MERXdNDgFcgtWYdLA2+bdFRGP/n0+hrlZP1+gsBKMSjN9gfpeaK21ScPAJTBl3xDaegF0fCPMR7h9kiU5kWXFPmmEI4eh92sNTK5AqBkVvvvddSdyCEiT2SUIKZEB2T5AAqcUwjKQlhuCN1TEYAbZGgZAPqkWQrAu/Es+8D1I3XqMYmJ956TGk094L5IjeBCEC95A0IRhM5On6jeRyJH9SQtKjKcYstrObnT9dk9laM8h3N75Ouxp2utvBB56ARo+2P5QUHE48B0mi1thFiLZtHUop60AsQki3km2WQbJzUf2IZ2606NoknoyxqOpCiLE6OQ5X5VZdDPYjJIGgeQspNV2LUNiCk3nS0NEo141JJwHJExhyIxA0CiBuSANERy2C2RVAQyHxxErlNwOZfPpJEEB2y9Wb3bYQAVY3vAzGOXiW1S+2DAg5GIclSamk06gpEN7ERB8I26fLiGt5Zw97OVo/bvDePJPcrLkZeds+6eCpHXQyPIY4REQj5l6N09MownHuZfHs60u/ikTtKLnK+NpuBWG6bts9O7tflOHQ9e5oIbaUuYNICbJlLXutD8nA0do1xV+GUKbkMoo/ryG7KocrAGUg6GAkXkPtg2EsO2vhvEW6jsHsdZOvrmi11dEn/2ha2PwOZhmZ7OdM1X1cgbrn9Etu6A5GZeHOFklbCjX0DdDn0i3PtSZDVnGsZgz80PoUNyZtAyKj2EyA8PVFgRWGmFcgtEtu+3t4eUZdGys//KoVeFFMvnC2194Y/AXLx2CG0gD0lYCPrrCl+hVZCdgj/seyzWhzt/bIn9qY5zfRkWG7pJB+ZEvYWZSLAOUcuICnaYWvlmjLBdThwvEjilNgOcMqRbW+NsMUnEMLQWsIk5c2Vu6RkjB5pByC+1AesFUBaRIkXT9dDsstTWoliYa25j3Ouwlcg0doR7kOYuUbvvXG7IoAaV3XJl5NHNiB3BaAbyFQ1PPzujsRgx7uH2YHYE1/wxFlcH1+dxcWzMTexUuPKxyVl9N4q0zHXxAbYpKLsPr6j5lzZBYiVZus1HIhW9qkmJG2nJl+jm8t7gNRXtnFh5skjEKCV0iFg70At5xqjlfdBEJh6S0N4bRq9P9x6LWvxjFiu5svTE/Zey9dE0XfD7r5aYYuy5jYjS6jUtbT6YZQ8QtSjTy2XFoYmefBumCv/OHjEjpFO3a+YfjGS06c7Db2FvUwBb8lE7LP3nOYuZbSrG77VFXzOEbhRybU0iDWXzkgYm3pG2HkE6nVrUZRd1DpufCxR5fqAMJGphNB1DecmCWVwuZjjEin6+Z4+6dr9xC4zt4w6Qq9NpPYQW2sjDMYxS+0QVo7QRYFsufWGyLVzOm8gIs1Q+65KiyW4Xwp9ZZ2+9lX8vl+8gQIQEBJwswxB9lRdQl5OJsHeaH0pWuPeVFZyOBWM78harl+H/P09q+wg9f7zrgWau9//j8zfFNR745LJb8yJv3fInxVjskNT94kIEeHv/rf4p0U5ZmaZN8Sq9r9MgPiOc7j6PPLII4+E38g/VGAnKJFsR9AAAAAASUVORK5CYII=";

const B = "#2662DB";
const G = "#43FFCE";
const D = "#0A1628";
const M = "#64748b";

const YT = (id) => `https://img.youtube.com/vi/${id}`;

const NOTES = [
  {
    id: "n1", videoId: "qCUZhJXuA3k",
    headline: "Ley Uber: estos son los cambios y polémicas que genera la nueva regulación de transporte por aplicaciones",
    lead: "La normativa que regula plataformas como Uber, Didi y Cabify fue promulgada tras meses de debate parlamentario. Los conductores deberán cumplir nuevos requisitos de seguridad y las empresas tributarán como establecimientos permanentes.",
    body: "El Ministerio de Transportes confirmó que la ley entrará en vigencia en 60 días. Los principales cambios incluyen la obligatoriedad de seguros de accidentes para pasajeros, límites de horas de conducción diaria y la creación de un registro nacional de conductores de aplicaciones. Gremios de taxistas expresaron su conformidad parcial, mientras que las plataformas tecnológicas advirtieron posibles alzas en las tarifas.",
    status: "pending", urgency: "high", type: "Legislativo", time: "Hace 4 min",
    seoTitle: "Ley Uber Chile: qué cambia y cómo te afecta la nueva regulación",
    seoDesc: "La nueva ley de transporte por aplicaciones establece seguros obligatorios, límites horarios y registro de conductores. Conoce los detalles.",
    tags: ["ley uber", "transporte", "regulación", "aplicaciones", "chile"],
    clip: { start: "00:00:15", end: "00:01:10", dur: "55s", desc: "Explicación de cambios clave" },
    rrss: {
      ig: "Nueva Ley Uber: seguros obligatorios, límite de horas y más controles. Todo lo que debes saber sobre la regulación →",
      x: "AHORA | Se promulga la Ley Uber en Chile: seguros para pasajeros, registro de conductores y nuevas exigencias para las plataformas de transporte",
      fb: "La nueva Ley de Transporte por Aplicaciones fue promulgada tras meses de debate. Uber, Didi y Cabify deberán adaptarse a exigencias de seguridad, tributación y registro de conductores..."
    }, confidence: 92, latency: 52, videoDuration: 81
  },
  {
    id: "n2", videoId: "aTk3sIEjKX4",
    headline: "CAE: recaudación récord del fisco contrasta con miles de deudores ahogados por la cuota inicial del nuevo sistema",
    lead: "Mientras el Estado reporta cifras históricas de recaudación por concepto del Crédito con Aval del Estado, miles de profesionales jóvenes enfrentan cuotas que superan el 20% de sus ingresos mensuales.",
    body: "Según datos del Ministerio de Educación, la morosidad del CAE alcanza un 38% entre egresados de institutos profesionales. El nuevo mecanismo de cobro, que ajusta las cuotas al ingreso declarado, ha generado controversia por los montos iniciales que deben asumir los recién egresados. Organizaciones estudiantiles exigen la condonación prometida durante la campaña presidencial.",
    status: "review", urgency: "high", type: "Economía", time: "Hace 12 min",
    seoTitle: "CAE 2026: récord de recaudación fiscal mientras deudores enfrentan cuotas impagables",
    seoDesc: "La recaudación del CAE alcanza cifras históricas, pero la morosidad entre egresados de IP supera el 38%. El debate sobre condonación se intensifica.",
    tags: ["CAE", "educación", "deuda", "recaudación", "morosidad"],
    clip: { start: "00:05:30", end: "00:07:00", dur: "90s", desc: "Testimonios de deudores" },
    rrss: {
      ig: "CAE: el Estado recauda cifras récord, pero miles de jóvenes no pueden pagar sus cuotas. Los datos que impactan →",
      x: "Recaudación récord del CAE vs. 38% de morosidad en egresados de IP. El debate sobre la deuda educativa se enciende en Chile",
      fb: "Mientras el fisco celebra cifras históricas de recaudación por el CAE, miles de profesionales jóvenes luchan con cuotas que superan el 20% de sus ingresos..."
    }, confidence: 89, latency: 61, videoDuration: 432
  },
  {
    id: "n3", videoId: "GPcxr3uLwnk",
    headline: "\"Auditoría total\": informe revela millonarios convenios irregulares en municipios de la Región Metropolitana",
    lead: "Un informe de la Contraloría General de la República detectó irregularidades en convenios por más de $15.000 millones entre municipios y fundaciones sin fiscalización adecuada.",
    body: "La investigación abarca 12 comunas de la RM y señala que los convenios carecían de controles mínimos de ejecución presupuestaria. Los alcaldes involucrados deberán responder ante el organismo contralor en un plazo de 30 días. La oposición exige que el caso sea derivado al Ministerio Público para determinar eventuales responsabilidades penales.",
    status: "pending", urgency: "high", type: "Política", time: "Hace 18 min",
    seoTitle: "Contraloría detecta convenios irregulares por $15.000 millones en municipios de la RM",
    seoDesc: "Informe revela falta de fiscalización en convenios entre 12 municipios y fundaciones. Alcaldes deberán responder en 30 días.",
    tags: ["contraloría", "municipios", "convenios", "corrupción", "auditoría"],
    clip: { start: "00:01:20", end: "00:02:55", dur: "95s", desc: "Cifras del informe Contraloría" },
    rrss: {
      ig: "Auditoría total: Contraloría revela convenios irregulares por $15 mil millones en municipios de Santiago. Los detalles →",
      x: "INFORME | Contraloría detecta convenios por más de $15.000 millones sin fiscalización en 12 comunas de la RM. Alcaldes tienen 30 días para responder",
      fb: "Un informe de la Contraloría reveló graves irregularidades en convenios millonarios entre municipios de la Región Metropolitana y fundaciones..."
    }, confidence: 95, latency: 44, videoDuration: 193
  },
  {
    id: "n4", videoId: "ggeNMiXOAFA",
    headline: "IRONMAN 70.3 Puerto Varas 2026: más de 2.500 deportistas compiten en el sur de Chile en la prueba más exigente del año",
    lead: "La ciudad de Puerto Varas recibe por cuarta vez consecutiva la competencia de triatlón IRONMAN 70.3, consolidándose como sede deportiva internacional con participantes de 35 países.",
    body: "La competencia incluye 1.9 km de natación en el Lago Llanquihue, 90 km de ciclismo con vista al volcán Osorno y 21.1 km de carrera. El chileno Felipe Barraza parte como favorito local tras su podio en el circuito sudamericano. La organización estima un impacto económico de $4.200 millones para la región de Los Lagos.",
    status: "approved", urgency: "low", type: "Deportes", time: "Hace 45 min",
    seoTitle: "IRONMAN 70.3 Puerto Varas 2026: resultados, recorrido y lo mejor de la competencia",
    seoDesc: "Más de 2.500 triatletas de 35 países compiten en Puerto Varas. Felipe Barraza lidera la delegación chilena en el evento que impacta en $4.200 millones la región.",
    tags: ["IRONMAN", "Puerto Varas", "triatlón", "deportes", "Chile"],
    clip: { start: "00:15:00", end: "00:16:30", dur: "90s", desc: "Largada natación Lago Llanquihue" },
    rrss: {
      ig: "En vivo desde Puerto Varas: 2.500 deportistas de 35 países compiten en el IRONMAN 70.3 Chile 2026. Sigue la transmisión →",
      x: "EN VIVO | IRONMAN 70.3 Puerto Varas: arrancó la competencia con más de 2.500 triatletas. Felipe Barraza lidera la delegación chilena",
      fb: "Puerto Varas vuelve a ser capital del triatlón mundial. Más de 2.500 atletas de 35 países participan en el IRONMAN 70.3 Chile 2026..."
    }, confidence: 96, latency: 38, videoDuration: 16750
  },
  {
    id: "n5", videoId: "5XoTVrKRATA",
    headline: "Chile suma medallas en Judo durante los IV Juegos Suramericanos de la Juventud",
    lead: "La delegación chilena de judo obtuvo dos medallas de bronce en la jornada inaugural de los Juegos Suramericanos de la Juventud, con destacadas actuaciones en las categorías sub-18.",
    body: "Los judocas nacionales Martina Soto (-52kg) y Benjamín Contreras (-66kg) aseguraron bronce tras combates intensos contra representantes de Brasil y Argentina respectivamente. El jefe de delegación proyectó al menos 5 medallas más en las próximas jornadas. Chile acumula 4 medallas en el medallero general del torneo continental juvenil.",
    status: "pending", urgency: "med", type: "Deportes", time: "Hace 25 min",
    seoTitle: "Juegos Suramericanos Juventud: Chile gana bronces en judo con Soto y Contreras",
    seoDesc: "Martina Soto y Benjamín Contreras suman medallas de bronce para Chile en judo. La delegación aspira a 5 medallas más en el torneo continental.",
    tags: ["juegos suramericanos", "judo", "medallas", "Chile", "juventud"],
    clip: { start: "00:32:10", end: "00:33:50", dur: "100s", desc: "Combate final Martina Soto" },
    rrss: {
      ig: "Chile medalla: Martina Soto y Benjamín Contreras ganan bronce en judo en los Suramericanos de la Juventud. Vamos Chile! →",
      x: "MEDALLAS | Chile suma bronces en judo en los IV Juegos Suramericanos de la Juventud. Soto (-52kg) y Contreras (-66kg) suben al podio",
      fb: "Gran jornada para el judo chileno en los Juegos Suramericanos de la Juventud. Martina Soto y Benjamín Contreras obtuvieron medallas de bronce..."
    }, confidence: 91, latency: 55, videoDuration: 11800
  }
];

const Badge = ({ status }) => {
  const s = { pending: ["#fef3c7","#92400e","Pendiente"], review: ["#dbeafe","#1e40af","En revisión"], approved: ["#dcfce7","#166534","Aprobada"], published: ["#f3e8ff","#6b21a8","Publicada"] }[status];
  return <span style={{ fontSize:9, fontWeight:600, padding:"2px 8px", borderRadius:10, background:s[0], color:s[1] }}>{s[2]}</span>;
};

const Urg = ({ level }) => {
  const c = { high:"#DC2626", med:"#F59E0B", low:"#94a3b8" }[level];
  return <div style={{ position:"absolute", top:4, left:4, width:15, height:15, borderRadius:"50%", background:c, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:700, color:"#fff" }}>!</div>;
};

export default function TVNHub() {
  const [sel, setSel] = useState("n1");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [edits, setEdits] = useState({});
  const note = NOTES.find(n => n.id === sel);
  const filtered = filter === "all" ? NOTES : NOTES.filter(n => n.status === filter);
  const counts = { all: NOTES.length, pending: NOTES.filter(n=>n.status==="pending").length, review: NOTES.filter(n=>n.status==="review").length, approved: NOTES.filter(n=>n.status==="approved").length };
  const isEditing = editing === sel;
  const e = edits[sel] || {};
  const val = (field) => e[field] !== undefined ? e[field] : note?.[field];
  const valRrss = (k) => e[`rrss_${k}`] !== undefined ? e[`rrss_${k}`] : note?.rrss?.[k];
  const setField = (field, v) => setEdits({ ...edits, [sel]: { ...e, [field]: v } });
  const startEdit = () => {
    setEditing(sel);
  };
  const saveEdit = () => {
    setEditing(null);
  };
  const cancelEdit = () => {
    const next = { ...edits };
    delete next[sel];
    setEdits(next);
    setEditing(null);
  };

  const [trimStart, setTrimStart] = useState(null);
  const [trimEnd, setTrimEnd] = useState(null);
  const [capturedFrame, setCapturedFrame] = useState({});
  const [capturing, setCapturing] = useState(false);

  const defaultStart = 0;
  const defaultEnd = note?.videoDuration ?? 0;
  const clipStart = trimStart ?? defaultStart;
  const clipEnd = trimEnd ?? defaultEnd;

  // Reset trim when switching notes
  useEffect(() => {
    setTrimStart(null);
    setTrimEnd(null);
  }, [sel]);

  const playerRef = useRef(null);

  const handleCaptureFrame = async () => {
    if (!note || capturing) return;
    const currentTime = playerRef.current?.getCurrentTime?.() ?? clipStart;
    setCapturing(true);
    try {
      const res = await fetch("/api/capture-frame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: note.videoId, timestamp: currentTime }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setCapturedFrame(prev => ({ ...prev, [sel]: data.image }));
    } catch (err) {
      console.error("Capture failed:", err.message);
    } finally {
      setCapturing(false);
    }
  };

  const [chatMsgs, setChatMsgs] = useState({});
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);
  const msgs = chatMsgs[sel] || [];

  useEffect(() => {
    if (msgs.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgs, chatLoading]);

  const sendChat = async () => {
    const q = chatInput.trim();
    if (!q || chatLoading) return;
    const noteData = NOTES_DATA.find(n => n.id === sel);
    if (!noteData) return;
    const newMsgs = [...msgs, { role: "user", text: q }];
    setChatMsgs({ ...chatMsgs, [sel]: newMsgs });
    setChatInput("");
    setChatLoading(true);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteData, question: q }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setChatMsgs(prev => ({
        ...prev,
        [sel]: [...(prev[sel] || []), { role: "assistant", text: data.response }],
      }));
    } catch (err) {
      setChatMsgs(prev => ({
        ...prev,
        [sel]: [...(prev[sel] || []), { role: "assistant", text: `Error: ${err.message}` }],
      }));
    } finally {
      setChatLoading(false);
    }
  };

  const inputStyle = { width:"100%", fontFamily:"inherit", border:`1.5px solid ${B}`, borderRadius:6, padding:"4px 6px", outline:"none", background:"#f8fafc", resize:"vertical" };
  const taStyle = { ...inputStyle, minHeight:50 };


  return (
    <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background:"#e5e7eb", minHeight:"100vh" }}>
      {/* TOPBAR */}
      <div style={{ background:D, padding:"10px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`2.5px solid ${G}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <img src="/Logotipo_de_Televisiòn_Nacional_de_Chile.svg.png" alt="TVN" style={{ height:28 }}/>
          <span style={{ fontSize:17, fontWeight:700, color:G, letterSpacing:-0.5 }}>Digital Hub</span>
          <div style={{ width:1, height:20, background:"rgba(255,255,255,0.15)" }}/>
          <img src="/logo_tiga2.png" alt="Tigabytes" style={{ height:20, background:"#fff", borderRadius:4, padding:"2px 8px" }}/>
          <div style={{ width:1, height:20, background:"rgba(255,255,255,0.15)" }}/>
          <div style={{ display:"flex", gap:5 }}>
            {["24 Horas","TVN","Todas"].map((s,i) => (
              <button key={s} style={{ padding:"4px 12px", borderRadius:12, fontSize:10, fontWeight:600, border:"none", cursor:"pointer", background:i===0?B:"rgba(255,255,255,0.08)", color:i===0?"#fff":"rgba(255,255,255,0.5)", transition:"all .15s" }}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:G, fontWeight:600 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:G, animation:"blink 1.5s infinite" }}/> EN VIVO — 3 señales
          </div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>14:32 CLT</div>
          <div style={{ width:28, height:28, borderRadius:"50%", background:B, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:10, fontWeight:600 }}>PT</div>
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}`}</style>

      <div style={{ display:"flex", margin:"0 auto" }}>
        {/* SIDEBAR */}
        <div style={{ width:"15%", background:"#fff", borderRight:"1px solid #e2e8f0", padding:14, flexShrink:0, minHeight:"calc(100vh - 50px)", boxSizing:"border-box" }}>
          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", color:M, fontWeight:600, margin:"12px 0 6px" }}>Estado</div>
          {[["all","Todas",counts.all,"#333"],["pending","Pendientes",counts.pending,"#F59E0B"],["review","En revisión",counts.review,B],["approved","Aprobadas",counts.approved,"#22c55e"]].map(([k,label,c,col]) => (
            <div key={k} onClick={() => setFilter(k)} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 10px", borderRadius:8, fontSize:12, cursor:"pointer", marginBottom:2, background:filter===k?"#eff6ff":"transparent", color:filter===k?B:"#334155", fontWeight:filter===k?600:400, transition:"all .1s" }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:col, flexShrink:0 }}/>
              {label}
              <span style={{ marginLeft:"auto", fontSize:10, background:filter===k?B:"#f1f5f9", color:filter===k?"#fff":M, padding:"2px 7px", borderRadius:8, fontWeight:600 }}>{c}</span>
            </div>
          ))}

          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", color:M, fontWeight:600, margin:"16px 0 6px" }}>Producción hoy</div>
          <div style={{ padding:"8px 10px" }}>
            <div style={{ fontSize:32, fontWeight:700, color:D }}>25</div>
            <div style={{ fontSize:11, color:M, marginBottom:8 }}>notas generadas</div>
            <div style={{ height:5, background:"#e2e8f0", borderRadius:3, overflow:"hidden" }}>
              <div style={{ width:"68%", height:"100%", background:`linear-gradient(90deg,${B},${G})`, borderRadius:3 }}/>
            </div>
            <div style={{ fontSize:9, color:M, marginTop:4 }}>17 publicadas — 68%</div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:10 }}>
              <div style={{ textAlign:"center" }}><div style={{ fontSize:18, fontWeight:700, color:B }}>47s</div><div style={{ fontSize:8, color:M }}>latencia prom.</div></div>
              <div style={{ textAlign:"center" }}><div style={{ fontSize:18, fontWeight:700, color:"#22c55e" }}>91%</div><div style={{ fontSize:8, color:M }}>aprob. 1er int.</div></div>
            </div>
          </div>

          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", color:M, fontWeight:600, margin:"14px 0 4px" }}>Motor</div>
          <div style={{ padding:"2px 10px", fontSize:10, color:D, fontWeight:500 }}>Gemini 3.1 Pro + ADK</div>
          <div style={{ padding:"2px 10px", fontSize:9, color:"#94a3b8" }}>Tigabytes · Google Cloud</div>
        </div>

        {/* MAIN LIST */}
        <div style={{ width:"30%", padding:14, overflow:"hidden", flexShrink:0, boxSizing:"border-box" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div style={{ fontSize:16, fontWeight:700, color:D }}>Notas sugeridas — 24 Horas</div>
            <select style={{ border:"1px solid #e2e8f0", borderRadius:8, padding:"5px 10px", fontSize:11, fontFamily:"inherit", color:D }}>
              <option>Urgencia ↓</option><option>Más reciente</option><option>Relevancia IA</option>
            </select>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {filtered.map(n => (
              <div key={n.id} onClick={() => setSel(n.id)} style={{
                display:"flex", gap:12, padding:10, background:sel===n.id?"#fafbff":"#fff",
                borderRadius:10, border:`1.5px solid ${sel===n.id?B:"#e2e8f0"}`,
                cursor:"pointer", transition:"all .15s", position:"relative",
                boxShadow: sel===n.id ? `0 0 0 2px rgba(38,98,219,0.1)` : "none"
              }}>
                <div style={{ width:96, height:64, borderRadius:8, flexShrink:0, overflow:"hidden", position:"relative", background:"#1e293b" }}>
                  <img src={capturedFrame[n.id] || `${YT(n.videoId)}/hqdefault.jpg`} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                  <Urg level={n.urgency}/>
                  <div style={{ position:"absolute", bottom:3, right:3, fontSize:9, background:"rgba(0,0,0,.75)", color:"#fff", padding:"1px 5px", borderRadius:4, fontFamily:"monospace" }}>{n.clip.start}</div>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:D, lineHeight:1.35, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{n.headline}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:5, flexWrap:"wrap" }}>
                    <Badge status={n.status}/>
                    <span style={{ fontSize:10, color:M }}>{n.time} · {n.type}</span>
                    {n.urgency === "high" && <span style={{ fontSize:9, fontWeight:600, color:"#DC2626", background:"#fef2f2", padding:"1px 6px", borderRadius:6 }}>URGENTE</span>}
                    <span style={{ fontSize:9, color:"#22c55e", fontWeight:600, marginLeft:"auto" }}>{n.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DETAIL PANEL */}
        {note && (
          <div style={{ width:"55%", background:"#fff", borderLeft:"1px solid #e2e8f0", padding:14, flexShrink:0, overflowY:"auto", maxHeight:"calc(100vh - 50px)", boxSizing:"border-box" }}>
            <div style={{ fontSize:9, textTransform:"uppercase", letterSpacing:"0.08em", color:M, fontWeight:600, margin:"4px 0 5px" }}>Pipeline</div>
            <div style={{ display:"flex", gap:3 }}>
              {["Ingesta","Gemini","Agentes","Frames","SEO","Listo"].map((s,i) => (
                <div key={s} style={{ flex:1, height:5, borderRadius:3, background: i<4?G:i===4?B:"#e2e8f0", animation:i===4?"pulse2 1.5s infinite":"none" }}/>
              ))}
            </div>
            <style>{`@keyframes pulse2{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:3 }}>
              {["Ingesta","Gemini","Agentes","Frames","SEO","Listo"].map((s,i) => (
                <span key={s} style={{ fontSize:7.5, color:i===4?B:M, fontWeight:i===4?600:400 }}>{s}</span>
              ))}
            </div>

            {/* VIDEO PLAYER */}
            <div style={{ marginTop:10 }}>
              <YouTubePlayer
                ref={playerRef}
                videoId={note.videoId}
                startSeconds={clipStart}
                endSeconds={clipEnd}
              />
            </div>

            {/* TRIM SELECTOR */}
            <TrimSelector
              duration={note?.videoDuration ?? 300}
              start={clipStart}
              end={clipEnd}
              onChangeEnd={({ start, end }) => {
                setTrimStart(start);
                setTrimEnd(end);
              }}
            />

            {/* CAPTURE FRAME */}
            <button
              onClick={handleCaptureFrame}
              disabled={capturing}
              style={{
                width:"100%", padding:"8px 0", borderRadius:8, fontSize:11, fontWeight:600,
                border:"none", cursor: capturing ? "not-allowed" : "pointer",
                background: capturing ? "#e2e8f0" : B, color: capturing ? M : "#fff",
                fontFamily:"inherit", marginTop:8, transition:"all .15s",
              }}
            >
              {capturing ? "Capturando frame..." : "Capturar Frame"}
            </button>

            {/* FRAME CAPTURADO (thumbnail) */}
            {capturedFrame[sel] && (
              <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:8, padding:"6px 8px", background:"#f0fdf4", borderRadius:8, border:`1px solid ${G}` }}>
                <img src={capturedFrame[sel]} alt="Frame" style={{ width:64, height:40, objectFit:"cover", borderRadius:4 }}/>
                <span style={{ fontSize:10, color:"#166534", fontWeight:500 }}>Frame capturado como imagen de la nota</span>
              </div>
            )}


            <div style={{ fontSize:9, textTransform:"uppercase", letterSpacing:"0.08em", color:M, fontWeight:600, margin:"12px 0 5px" }}>Nota generada por IA</div>
            {isEditing ? (
              <>
                <textarea value={val("headline")} onChange={ev => setField("headline", ev.target.value)} style={{ ...inputStyle, fontSize:14, fontWeight:700, color:D, minHeight:40 }}/>
                <textarea value={val("lead")} onChange={ev => setField("lead", ev.target.value)} style={{ ...taStyle, fontSize:11.5, color:"#475569", marginTop:6 }}/>
                <textarea value={val("body")} onChange={ev => setField("body", ev.target.value)} style={{ ...taStyle, fontSize:11, color:M, marginTop:5, minHeight:70 }}/>
              </>
            ) : (
              <>
                <div style={{ fontSize:14, fontWeight:700, color:D, lineHeight:1.35 }}>{val("headline")}</div>
                <div style={{ fontSize:11.5, color:"#475569", lineHeight:1.55, marginTop:6 }}>{val("lead")}</div>
                <div style={{ fontSize:11, color:M, lineHeight:1.5, marginTop:5 }}>{val("body")}</div>
              </>
            )}

            <div style={{ fontSize:9, textTransform:"uppercase", letterSpacing:"0.08em", color:M, fontWeight:600, margin:"12px 0 5px" }}>SEO automático</div>
            <div style={{ background:"#f8fafc", borderRadius:8, padding:10, border:"1px solid #e2e8f0" }}>
              {isEditing ? (
                <>
                  <input value={val("seoTitle")} onChange={ev => setField("seoTitle", ev.target.value)} style={{ ...inputStyle, fontSize:12, color:B, fontWeight:600 }}/>
                  <textarea value={val("seoDesc")} onChange={ev => setField("seoDesc", ev.target.value)} style={{ ...taStyle, fontSize:10, color:M, marginTop:3, minHeight:36 }}/>
                </>
              ) : (
                <>
                  <div style={{ fontSize:12, color:B, fontWeight:600 }}>{val("seoTitle")}</div>
                  <div style={{ fontSize:10, color:M, marginTop:3, lineHeight:1.4 }}>{val("seoDesc")}</div>
                </>
              )}
              <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:5 }}>
                {note.tags.map(t => <span key={t} style={{ fontSize:9, padding:"2px 7px", background:"#eff6ff", color:B, borderRadius:6, fontWeight:500 }}>{t}</span>)}
              </div>
            </div>

            <div style={{ fontSize:9, textTransform:"uppercase", letterSpacing:"0.08em", color:M, fontWeight:600, margin:"12px 0 5px" }}>Redes sociales</div>
            {[["ig","linear-gradient(135deg,#833AB4,#E1306C)"],["x","#000"],["fb","#1877F2"]].map(([k,bg]) => {
              const icons = {
                ig: <svg viewBox="0 0 24 24" width="12" height="12" fill="#fff"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 011.47.957c.453.453.752.92.957 1.47.163.46.35 1.26.404 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.404 2.43a4.088 4.088 0 01-.957 1.47 4.088 4.088 0 01-1.47.957c-.46.163-1.26.35-2.43.404-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.404a4.088 4.088 0 01-1.47-.957 4.088 4.088 0 01-.957-1.47c-.163-.46-.35-1.26-.404-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.404-2.43a4.088 4.088 0 01.957-1.47A4.088 4.088 0 015.064 2.293c.46-.163 1.26-.35 2.43-.404C8.756 1.831 9.136 1.82 12 1.82V2.163zM12 0C8.741 0 8.333.014 7.053.072 5.775.131 4.905.333 4.14.63a5.876 5.876 0 00-2.126 1.384A5.876 5.876 0 00.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.059 1.278.261 2.148.558 2.913a5.876 5.876 0 001.384 2.126A5.876 5.876 0 004.14 23.37c.765.297 1.635.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.059 2.148-.261 2.913-.558a5.876 5.876 0 002.126-1.384 5.876 5.876 0 001.384-2.126c.297-.765.499-1.635.558-2.913C23.986 15.667 24 15.259 24 12s-.014-3.667-.072-4.947c-.059-1.278-.261-2.148-.558-2.913a5.876 5.876 0 00-1.384-2.126A5.876 5.876 0 0019.86.63C19.095.333 18.225.131 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
                x: <svg viewBox="0 0 24 24" width="12" height="12" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                fb: <svg viewBox="0 0 24 24" width="12" height="12" fill="#fff"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
              };
              return (
              <div key={k} style={{ display:"flex", alignItems:"flex-start", gap:7, padding:"6px 0", borderBottom:k!=="fb"?"1px solid #f1f5f9":"none" }}>
                <div style={{ width:20, height:20, borderRadius:5, background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{icons[k]}</div>
                {isEditing ? (
                  <textarea value={valRrss(k)} onChange={ev => setField(`rrss_${k}`, ev.target.value)} style={{ ...taStyle, fontSize:10, flex:1, minHeight:36 }}/>
                ) : (
                  <div style={{ fontSize:10, color:"#475569", lineHeight:1.45, flex:1 }}>{valRrss(k)}</div>
                )}
              </div>
              );
            })}

            <div style={{ display:"flex", gap:6, marginTop:14 }}>
              {isEditing ? (
                <>
                  <button onClick={saveEdit} style={{ flex:2, padding:"9px 14px", borderRadius:8, fontSize:12, fontWeight:600, border:"none", cursor:"pointer", background:"#22c55e", color:"#fff", fontFamily:"inherit" }}>✓ Guardar cambios</button>
                  <button onClick={cancelEdit} style={{ flex:1, padding:"9px 14px", borderRadius:8, fontSize:12, fontWeight:600, border:"none", cursor:"pointer", background:"#fef2f2", color:"#DC2626", fontFamily:"inherit" }}>Cancelar</button>
                </>
              ) : (
                <>
                  <button style={{ flex:2, padding:"9px 14px", borderRadius:8, fontSize:12, fontWeight:600, border:"none", cursor:"pointer", background:B, color:"#fff", fontFamily:"inherit" }}>✓ Aprobar y publicar</button>
                  <button onClick={startEdit} style={{ flex:1, padding:"9px 14px", borderRadius:8, fontSize:12, fontWeight:600, border:"none", cursor:"pointer", background:"#f1f5f9", color:D, fontFamily:"inherit" }}>Editar</button>
                  <button style={{ padding:"9px 12px", borderRadius:8, fontSize:12, fontWeight:600, border:"none", cursor:"pointer", background:"#fef2f2", color:"#DC2626", fontFamily:"inherit" }}>✕</button>
                </>
              )}
            </div>

            {/* AGENTE IA */}
            <div style={{ marginTop:14, borderTop:"1px solid #e2e8f0", paddingTop:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                <div style={{ width:22, height:22, borderRadius:6, background:"linear-gradient(135deg,#4285F4,#9B72CB,#D96570)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg viewBox="0 0 28 28" width="14" height="14" fill="none"><path d="M14 0C14 0 14 14 0 14C14 14 14 28 14 28C14 28 14 14 28 14C14 14 14 0 14 0Z" fill="#fff"/></svg>
                </div>
                <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", color:M, fontWeight:600 }}>Agente editorial — Gemini</div>
              </div>

              <div style={{ background:"#f8fafc", borderRadius:10, border:"1px solid #e2e8f0", padding:10, maxHeight:220, overflowY:"auto", marginBottom:8 }}>
                {msgs.length === 0 && !chatLoading && (
                  <div style={{ fontSize:10, color:"#94a3b8", textAlign:"center", padding:"12px 0" }}>
                    Pregunta sobre esta nota al agente IA. Tiene acceso a todos los datos de la nota seleccionada.
                  </div>
                )}
                {msgs.map((m, i) => (
                  <div key={i} style={{
                    display:"flex", flexDirection:"column",
                    alignItems: m.role === "user" ? "flex-end" : "flex-start",
                    marginBottom:6,
                  }}>
                    <div style={{ fontSize:8, color:"#94a3b8", marginBottom:2, fontWeight:600 }}>
                      {m.role === "user" ? "Editor" : "Gemini"}
                    </div>
                    <div style={{
                      fontSize:11, lineHeight:1.5, padding:"6px 10px", borderRadius:8,
                      maxWidth:"90%", whiteSpace:"pre-wrap", wordBreak:"break-word",
                      background: m.role === "user" ? B : "#fff",
                      color: m.role === "user" ? "#fff" : D,
                      border: m.role === "user" ? "none" : "1px solid #e2e8f0",
                    }}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 0" }}>
                    <div style={{ width:16, height:16, borderRadius:"50%", border:`2px solid ${B}`, borderTopColor:"transparent", animation:"spin .6s linear infinite" }}/>
                    <span style={{ fontSize:10, color:M }}>Gemini está pensando...</span>
                  </div>
                )}
                <div ref={chatEndRef}/>
              </div>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

              <div style={{ display:"flex", gap:6 }}>
                <input
                  value={chatInput}
                  onChange={ev => setChatInput(ev.target.value)}
                  onKeyDown={ev => ev.key === "Enter" && sendChat()}
                  placeholder="Escribe tu pregunta sobre esta nota..."
                  style={{
                    flex:1, padding:"8px 12px", borderRadius:8, border:"1.5px solid #e2e8f0",
                    fontSize:11, fontFamily:"inherit", outline:"none", background:"#fff",
                    transition:"border-color .15s",
                  }}
                  onFocus={ev => ev.target.style.borderColor = B}
                  onBlur={ev => ev.target.style.borderColor = "#e2e8f0"}
                  disabled={chatLoading}
                />
                <button
                  onClick={sendChat}
                  disabled={chatLoading || !chatInput.trim()}
                  style={{
                    padding:"8px 14px", borderRadius:8, fontSize:11, fontWeight:600,
                    border:"none", cursor: chatLoading || !chatInput.trim() ? "not-allowed" : "pointer",
                    background: chatLoading || !chatInput.trim() ? "#e2e8f0" : B,
                    color: chatLoading || !chatInput.trim() ? M : "#fff",
                    fontFamily:"inherit", transition:"all .15s",
                  }}
                >
                  Enviar
                </button>
              </div>
            </div>

            <div style={{ textAlign:"center", marginTop:12, paddingTop:10, borderTop:"1px solid #e2e8f0" }}>
              <div style={{ fontSize:9, color:"#94a3b8" }}>Generado por <strong style={{ color:D }}>Gemini 3.1 Pro</strong> · Agente Redactor v1.0</div>
              <div style={{ fontSize:9, color:"#94a3b8", marginTop:2 }}>Confianza: <strong style={{ color:"#22c55e" }}>{note.confidence}%</strong> · Latencia: <strong>{note.latency}s</strong></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

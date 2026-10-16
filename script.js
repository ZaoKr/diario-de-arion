const ENTRIES = [
  {
    day: 1,
    title: "Entrada 1 — El 'Nacimiento'",
    text: "Hoy he aparecido en este lugar. Me han dado el nombre de Arion y me han asignado a <span class=\"red-corrupt\">[REGISTRO ELIMINADO]</span>. No sé quién soy ni qué hago aquí. Un sujeto llamado [█z█k] me miró y dijo que 'lo ha visto' a Él... a Z**o. No entiendo qué significa."
  },
  {
    day: 2,
    title: "Entrada 2 — El Registro Oculto",
    text: "Hoy han presentado en <span class=\"red-corrupt\">[REGISTRO ELIMINADO]</span> a <span class=\"red-corrupt\">[REGISTRO ELIMINADO]</span>. Lleva una capucha oscura y no le he visto la cara. ¿Fue así cuando yo llegué?"
  },
  {
    day: 5,
    title: "Entrada 3 — El Plan",
    text: "Se habla de una misión especial en [LUGAR_RESTRINGIDO] que involucra a Z**o. Yo sigo sin saber qué relación tengo con ese nombre."
  },
  {
    day: 7,
    title: "Entrada 4 — El Rostro y el Arma",
    text: "Hoy fui de misión con <span class=\"red-corrupt\">[REGISTRO ELIMINADO]</span>. Por primera vez vi su cara bajo la capucha y la vi usar <span class=\"red-corrupt\">[REGISTRO ELIMINADO]</span>, igual que yo... Su nombre es Aurea. Después nos reunimos en <span class=\"red-corrupt\">[REGISTRO ELIMINADO]</span> con Lea."
  },
  {
    day: 8,
    title: "Entrada 5 — Colapso",
    text: "Siento una pesadez extraña en todo el cuerpo. Es como si mi cabeza intentara procesar algo que no me pertenece. Siento que me voy a dormir... un sueño demasiado profundo."
  },
  {
    day: 14,
    title: "Entrada 6 — El Abismo",
    text: "Llevo días atrapado en la oscuridad. En mi mente vi un abismo sin fondo y a un chico de mi edad disolviéndose en la nada... Era Zao. ¿Por qué puedo ver sus recuerdos?"
  },
  {
    day: 15,
    title: "Entrada 7 — Despertar en Silencio",
    text: "Al fin he despertado. Me dijeron que estuve durmiendo muchos días. Lea ha vuelto de <span class=\"red-corrupt\">[REGISTRO ELIMINADO]</span>, pero se le ve distinto. Dicen que casi toda la expedición fue [ELIMINADA]. Siento un vacío raro."
  },
  {
    day: 21,
    title: "Entrada 8 — Sin Poder",
    text: "Encontramos a Aurea en <span class=\"red-corrupt\">[REGISTRO ELIMINADO]</span>. Parecía perdida y por alguna razón ya no puede invocar <span class=\"red-corrupt\">[REGISTRO ELIMINADO]</span>. Nos sentamos en <span class=\"red-corrupt\">[REGISTRO ELIMINADO]</span>, pero el ambiente se siente pesado."
  },
  {
    day: 27,
    title: "Entrada 9 — El Restecimiento",
    text: "Hoy Aurea logró recuperar <span class=\"red-corrupt\">[REGISTRO ELIMINADO]</span> durante la misión. Volvemos a encontrarnos al atardecer, pero hay miradas en <span class=\"red-corrupt\">[REGISTRO ELIMINADO]</span> que no me gustan..."
  },
  {
    day: 42,
    title: "Entrada 10 — El Encapuchado",
    text: "Aurea tuvo un enfrentamiento contra un desconocido encapuchado ([████u]). Él la venció, pero se detuvo de golpe cuando le vio la cara bajo la capucha."
  },
  {
    day: 48,
    title: "Entrada 11 — Silencio",
    text: "Aurea se desplomó tras luchar contra <span class=\"red-corrupt\">[REGISTRO ELIMINADO]</span>. Ahora es ella la que no despierta. Ha quedado sumida en un sueño profundo..."
  },
  {
    day: 50,
    title: "Entrada 12 — El Eco",
    text: "Aurea ha despertado. Me dio un fragmento cristalino que encontró y, al tocarlo, pude escuchar un eco lejano. Es extraño... siento que ya he oído ese sonido antes, junto a alguien que solía estar a mi lado."
  }
];

const TOTAL_DAYS = 101;
const entryMap = new Map();
ENTRIES.forEach((entry) => entryMap.set(entry.day, entry));

const dayNumberEl = document.getElementById("dayNumber");
const entryTitleEl = document.getElementById("entryTitle");
const entryTextEl = document.getElementById("entryText");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const daySelect = document.getElementById("daySelect");

let currentDay = 1;
let audioCtx = null;

function ensureAudio() {
  if (audioCtx) return audioCtx;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  audioCtx = new AudioContext();
  return audioCtx;
}

function playPageTurn() {
  const ctx = ensureAudio();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(520, now);
  osc.frequency.exponentialRampToValueAtTime(320, now + 0.16);
  gain.gain.setValueAtTime(0.0008, now);
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0004, now + 0.18);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.18);
}

function renderCorrupted(text) {
  if (!text) return "";
  let html = text
    .replace(/\[█{2,}\w*█{0,}\]/g, '<span class="red-corrupt">$&</span>')
    .replace(/\[ELIMINADA\]/g, '<span class="red-corrupt">$&</span>')
    .replace(/\[REGISTRO_BORRADO\]/g, '<span class="red-corrupt">$&</span>')
    .replace(/\[LUGAR_RESTRINGIDO\]/g, '<span class="corrupt">$&</span>')
    .replace(/\[D██os_C██ruptos\]/g, '<span class="red-corrupt">$&</span>')
    .replace(/\[████u\]/g, '<span class="red-corrupt">$&</span>')
    .replace(/\[█z█k\]/g, '<span class="red-corrupt">$&</span>')
    .replace(/Z\*\*o/g, '<span class="glitch">Z**o</span>')
    .replace(/Núm\*\*\* XIV/g, '<span class="corrupt">Núm*** XIV</span>');

  return html;
}

function populateSelect() {
  const frag = document.createDocumentFragment();
  for (let d = 1; d <= TOTAL_DAYS; d++) {
    const opt = document.createElement("option");
    opt.value = String(d);
    opt.textContent = `Día ${d}`;
    frag.appendChild(opt);
  }
  daySelect.innerHTML = "";
  daySelect.appendChild(frag);
}

function renderCurrent() {
  const entry = entryMap.get(currentDay);
  dayNumberEl.textContent = currentDay;
  if (entry) {
    entryTitleEl.textContent = entry.title;
    entryTextEl.innerHTML = renderCorrupted(entry.text);
  } else {
    entryTitleEl.textContent = "Sin registro";
    entryTextEl.innerHTML = '<span class="corrupt">[REGISTRO_BORRADO]</span> · El fragmento correspondiente a este día se encuentra ausente o corrupto.';
  }
  daySelect.value = String(currentDay);
  btnPrev.disabled = currentDay <= 1;
  btnNext.disabled = currentDay >= TOTAL_DAYS;
}

function goTo(day) {
  const next = Math.min(Math.max(day, 1), TOTAL_DAYS);
  if (next === currentDay) return;
  currentDay = next;
  playPageTurn();
  renderCurrent();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

populateSelect();
renderCurrent();

btnPrev.addEventListener("click", () => goTo(currentDay - 1));
btnNext.addEventListener("click", () => goTo(currentDay + 1));
daySelect.addEventListener("change", (ev) => {
  const val = Number(ev.target.value);
  goTo(val);
});

window.addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowLeft") {
    goTo(currentDay - 1);
  }
  if (ev.key === "ArrowRight") {
    goTo(currentDay + 1);
  }
});

const ENTRIES = [
  {
    day: 1,
    title: "Entrada 1 — El 'Nacimiento'",
    text: "Hoy he aparecido en este lugar. Me han dado el nombre de Arion y me han asignado a [REGISTRO ELIMINADO]. No sé quién soy ni qué hago aquí. Un sujeto llamado [█z█k] me miró y dijo que 'lo ha visto' a Él... a Z**o. No entiendo qué significa."
  },
  {
    day: 2,
    title: "Entrada 2 — El Registro Oculto",
    text: "Hoy han presentado en [REGISTRO ELIMINADO] a [REGISTRO ELIMINADO]. Lleva una capucha oscura y no le he visto la cara. ¿Fue así cuando yo llegué?"
  },
  {
    day: 5,
    title: "Entrada 3 — El Plan",
    text: "Se habla de una misión especial en [LUGAR_RESTRINGIDO] que involucra a Z**o. Yo sigo sin saber qué relación tengo con ese nombre."
  },
  {
    day: 6,
    title: "Entrada 4 — Los Que Quedamos",
    text: "[████████] y los demás partieron hoy hacia [LUGAR_RESTRINGIDO]. Los pasillos se sienten aún más vacíos y silenciosos. Solo quedamos unos pocos vagando sin rumbo por este lugar."
  },
  {
    day: 7,
    title: "Entrada 5 — El Rostro y el Arma",
    text: "Hoy fui de misión con [REGISTRO ELIMINADO]. Por primera vez vi su cara bajo la capucha y la vi usar [REGISTRO ELIMINADO], igual que yo... Su nombre es Aurea. Después nos reunimos en [REGISTRO ELIMINADO] con Lea."
  },
  {
    day: 8,
    title: "Entrada 6 — Colapso",
    text: "Siento una pesadez extraña en todo el cuerpo. Es como si mi cabeza intentara procesar algo que no me pertenece. Siento que me voy a dormir... un sueño demasiado profundo."
  },
  {
    day: 14,
    title: "Entrada 7 — El Abismo",
    text: "Llevo días atrapado en la oscuridad. En mi mente vi un abismo sin fondo y a un chico de mi edad disolviéndose en la nada... Era Zao. ¿Por qué puedo ver sus recuerdos?"
  },
  {
    day: 15,
    title: "Entrada 8 — Despertar en Silencio",
    text: "Al fin he despertado. Me dijeron que estuve durmiendo muchos días. Lea ha vuelto de [REGISTRO ELIMINADO], pero se le ve distinto. Dicen que casi toda la expedición fue [ELIMINADA]. Siento un vacío raro."
  },
  {
    day: 20,
    title: "Entrada 9 — Sin Palabras",
    text: "Lea ha regresado solo de [LUGAR_RESTRINGIDO]. Tiene la mirada perdida y el silencio pesa demasiado entre nosotros. Nos sentamos juntos un momento, pero ninguno se atrevió a decir una sola palabra."
  },
  {
    day: 21,
    title: "Entrada 10 — Sin Poder",
    text: "Encontramos a Aurea en [REGISTRO ELIMINADO]. Parecía perdida y por alguna razón ya no puede invocar [REGISTRO ELIMINADO]. Nos sentamos en [REGISTRO ELIMINADO], pero el ambiente se siente pesado."
  },
  {
    day: 27,
    title: "Entrada 11 — El Restecimiento",
    text: "Hoy Aurea logró recuperar [REGISTRO ELIMINADO] durante la misión. Volvemos a encontrarnos al atardecer, pero hay miradas en [REGISTRO ELIMINADO] que no me gustan..."
  },
  {
    day: 42,
    title: "Entrada 12 — El Encapuchado",
    text: "Aurea tuvo un enfrentamiento contra un desconocido encapuchado ([████u]). Él la venció, pero se detuvo de golpe cuando le vio la cara bajo la capucha."
  },
  {
    day: 48,
    title: "Entrada 13 — Silencio",
    text: "Aurea se desplomó tras luchar contra [REGISTRO ELIMINADO]. Ahora es ella la que no despierta. Ha quedado sumida en un sueño profundo..."
  },
  {
    day: 50,
    title: "Entrada 14 — El Eco",
    text: "Aurea ha despertado. Me dio un fragmento cristalino que encontró y, al tocarlo, pude escuchar un eco lejano. Es extraño... siento que ya he oído ese sonido antes, junto a alguien que solía estar a mi lado."
  },
  {
    day: 54,
    title: "Entrada 15 — En Otra Parte",
    text: "Aurea ha despertado del sueño profundo. Actúa diferente, como si estuviera llena de fragmentos e imágenes de Z**o. Ya casi no habla con nadie; siento que camina entre nosotros pero su mente está en otra parte."
  },
  {
    day: 63,
    title: "Entrada 16 — El Tiempo Detenido",
    text: "Siento que el tiempo se detiene. En las sombras descubren que Z**o no puede avanzar porque su [REGISTRO ELIMINADO] sigue conectado con 'ella'. Sigo viendo fragmentos de sueños que no me pertenecen."
  }
];

const TOTAL_DAYS = 101;
const STORAGE_KEYS = { day: "arion:last-day", muted: "arion:muted" };
const SESSION_KEYS = { haunted: "arion:haunted" };
const TRANSMISSION_THRESHOLD = 10;
const TRANSMISSION_TYPE_INTERVAL = 60;
const TRANSMISSION_LINE_PAUSE = 4000;
const AMBIENT_VOLUME = 0.32;

const CORRUPT_DAY_TEXT = "Un nombre define un objeto. Da una idea de su envergadura. Le da significado.<br>Hemos emprendido el proyecto Ánima para desarrollar una nueva fuerza. Y nuestra sombría marioneta ambulante necesita un nombre, algo que reemplace la ausencia de Arion, algo que le dé sentido a su vacío.";
const FOOTER_SECRET = "…otra vez borrándome. ¿Por qué todos insisten en borrarme?";
const SECRET_WORDS = ["aurea", "anima"];

const TRANSMISSION_LINES = [
  "Estoy atrapado.",
  "No sé dónde estoy. Todo parece tan raro…",
  "Es como si estuviera aquí… pero nadie me ve.",
  "Puedo hacer pocas cosas…",
  "Si alguien puede escucharme, por favor… ayúdenme."
];

const CORRUPTION_RULES = [
  [/\[REGISTRO ELIMINADO\]/g, "red-corrupt"],
  [/\[ELIMINADA\]/g, "red-corrupt"],
  [/\[REGISTRO_BORRADO\]/g, "red-corrupt"],
  [/\[█z█k\]/g, "red-corrupt"],
  [/\[████u\]/g, "red-corrupt"],
  [/\[D██os_C██ruptos\]/g, "red-corrupt"],
  [/\[LUGAR_RESTRINGIDO\]/g, "corrupt"],
  [/Núm\*\*\* XIV/g, "corrupt"],
  [/Z\*\*o/g, "glitch"],
  [/\[SEÑAL_CRUZADA\]/g, "red-corrupt"],
  [/\[████████\]/g, "red-corrupt"]
];

const entryMap = new Map(ENTRIES.map((entry) => [entry.day, entry]));

const dayNumberEl = document.getElementById("dayNumber");
const dayTotalEl = document.getElementById("dayTotal");
const entryTitleEl = document.getElementById("entryTitle");
const entryTextEl = document.getElementById("entryText");
const entryBodyEl = document.getElementById("entryBody");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnJumpPrev = document.getElementById("btnJumpPrev");
const btnJumpNext = document.getElementById("btnJumpNext");
const btnSound = document.getElementById("btnSound");
const progressFill = document.getElementById("progressFill");
const progressMarks = document.getElementById("progressMarks");
const progressEl = document.getElementById("progress");
const panelEl = document.querySelector(".diary-panel");
const btnFooterSecret = document.getElementById("btnFooterSecret");
const secretLineEl = document.getElementById("secretLine");
const ambientEl = document.getElementById("ambient");
const transmissionEl = document.getElementById("transmission");
const transmissionLineEl = document.getElementById("transmissionLine");
const corruptFlash = document.getElementById("corruptFlash");

const selectorWrap = document.getElementById("daySelectorWrap");
const selectBtn = document.getElementById("daySelectBtn");
const selectValueEl = document.getElementById("daySelectValue");
const menuEl = document.getElementById("dayMenu");

let currentDay = 1;
let menuOpen = false;
let activeIndex = 0;
let audioCtx = null;
let muted = readStored(STORAGE_KEYS.muted) === "1";
let dayAnimHandle = null;
let nextStreak = 0;
let corruptedActive = false;
let scrambleHandle = null;
let secretLineTimer = null;
let keyBuffer = "";
let transmissionPlaying = false;
let transmissionSeen = false;
let transmissionGen = 0;
let ambientStarted = false;
let ambientFadeHandle = null;
let typeInterval = null;
let typeTimeout = null;

const storedDay = Number(readStored(STORAGE_KEYS.day));
if (Number.isInteger(storedDay) && storedDay >= 1 && storedDay <= TOTAL_DAYS) {
  currentDay = storedDay;
}

function readStored(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    return;
  }
}

function readSession(key) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key, value) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    return;
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ensureAudio() {
  if (audioCtx) return audioCtx;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  audioCtx = new AudioContext();
  return audioCtx;
}

function playPageTurn() {
  if (muted) return;
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

function playStaticBurst(level) {
  const volume = level || 0.5;
  if (muted) return;
  const ctx = ensureAudio();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  const now = ctx.currentTime;
  const duration = 0.35;
  const buffer = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * duration)), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const decay = 1 - i / data.length;
    data[i] = (Math.random() * 2 - 1) * decay * decay;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1400;
  filter.Q.value = 0.8;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.12 * volume, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start(now);
}

function fadeAudioTo(target, duration, onDone) {
  cancelAnimationFrame(ambientFadeHandle);
  if (prefersReducedMotion()) {
    ambientEl.volume = target;
    if (onDone) onDone();
    return;
  }
  const from = ambientEl.volume;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    ambientEl.volume = from + (target - from) * progress;
    if (progress < 1) {
      ambientFadeHandle = requestAnimationFrame(tick);
    } else if (onDone) {
      onDone();
    }
  }
  ambientFadeHandle = requestAnimationFrame(tick);
}

function tryPlayAmbient() {
  try {
    const result = ambientEl.play();
    return result && typeof result.then === "function" ? result : Promise.resolve();
  } catch {
    return Promise.reject(new Error("play-rejected"));
  }
}

function stopAmbient() {
  fadeAudioTo(0, 700, () => {
    try {
      ambientEl.pause();
    } catch {
      return;
    }
  });
}

function resumeAmbient() {
  ambientEl.volume = 0;
  tryPlayAmbient().catch(() => {});
  fadeAudioTo(AMBIENT_VOLUME, 1000);
}

function startTransmissionFlow() {
  if (transmissionPlaying || transmissionSeen) return;
  transmissionSeen = true;
  playStaticBurst(0.6);
  if (muted) {
    startTransmissionMessage();
    return;
  }
  ambientStarted = true;
  const gen = transmissionGen;
  tryPlayAmbient()
    .then(() => {
      if (gen !== transmissionGen) return;
      ambientEl.currentTime = 0;
      ambientEl.volume = 0;
      fadeAudioTo(AMBIENT_VOLUME, 900);
      startTransmissionMessage();
    })
    .catch(() => {
      if (gen === transmissionGen) startTransmissionMessage();
    });
}

function startTransmissionMessage() {
  if (transmissionPlaying) return;
  transmissionPlaying = true;
  const gen = ++transmissionGen;
  transmissionEl.hidden = false;
  transmissionLineEl.textContent = "";
  let index = 0;
  const reduced = prefersReducedMotion();

  function nextLine() {
    if (gen !== transmissionGen) return;
    if (index >= TRANSMISSION_LINES.length) {
      finishTransmission();
      return;
    }
    const line = TRANSMISSION_LINES[index];
    index += 1;
    if (reduced) {
      transmissionLineEl.textContent = line;
      typeTimeout = setTimeout(nextLine, TRANSMISSION_LINE_PAUSE + 1000);
      return;
    }
    let pos = 0;
    clearInterval(typeInterval);
    typeInterval = setInterval(() => {
      if (gen !== transmissionGen) {
        clearInterval(typeInterval);
        return;
      }
      pos += 1;
      transmissionLineEl.textContent = line.slice(0, pos);
      if (pos >= line.length) {
        clearInterval(typeInterval);
        typeTimeout = setTimeout(nextLine, TRANSMISSION_LINE_PAUSE);
      }
    }, TRANSMISSION_TYPE_INTERVAL);
  }

  nextLine();
}

function finishTransmission() {
  transmissionGen += 1;
  clearTimeout(typeTimeout);
  clearInterval(typeInterval);
  transmissionPlaying = false;
  transmissionEl.hidden = true;
  transmissionLineEl.textContent = "";
}

function showSecretLine(text) {
  clearTimeout(secretLineTimer);
  secretLineEl.textContent = text;
  secretLineEl.hidden = false;
  requestAnimationFrame(() => secretLineEl.classList.add("is-visible"));
  secretLineTimer = setTimeout(() => {
    secretLineEl.classList.remove("is-visible");
    secretLineTimer = setTimeout(() => {
      secretLineEl.hidden = true;
    }, 650);
  }, 6500);
}

function scrambleDayNumber() {
  cancelAnimationFrame(dayAnimHandle);
  cancelAnimationFrame(scrambleHandle);
  dayNumberEl.textContent = "???";
  if (prefersReducedMotion()) return;
  const glyphs = "0123456789?¿#%▓█░";
  const start = performance.now();
  const duration = 1100;
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    if (progress < 1) {
      let text = "";
      for (let i = 0; i < 3; i++) {
        text += glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      dayNumberEl.textContent = text;
      scrambleHandle = requestAnimationFrame(tick);
    } else {
      dayNumberEl.textContent = "???";
    }
  }
  scrambleHandle = requestAnimationFrame(tick);
}

function enterCorruptedDay() {
  if (corruptedActive) return;
  corruptedActive = true;
  nextStreak = 0;
  playStaticBurst(0.5);
  corruptFlash.classList.remove("is-active");
  void corruptFlash.offsetWidth;
  corruptFlash.classList.add("is-active");
  panelEl.classList.add("is-corrupted");
  progressEl.classList.add("is-corrupted");
  dayTotalEl.textContent = "/ ?¿?";
  selectValueEl.textContent = "Día ?¿?";
  menuEl.querySelectorAll(".day-option.is-selected").forEach((option) => {
    option.classList.remove("is-selected");
    option.setAttribute("aria-selected", "false");
  });
  entryBodyEl.classList.remove("is-missing");
  entryTitleEl.textContent = "Proyecto Ánima";
  entryTextEl.innerHTML = renderCorrupted(CORRUPT_DAY_TEXT);
  randomizeGlitch(entryTextEl);
  document.title = "Proyecto Ánima · Diario de Arion";
  scrambleDayNumber();
  animateEntry();
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

function leaveCorrupted() {
  if (!corruptedActive) return;
  corruptedActive = false;
  cancelAnimationFrame(scrambleHandle);
  panelEl.classList.remove("is-corrupted");
  progressEl.classList.remove("is-corrupted");
  dayTotalEl.textContent = `/ ${TOTAL_DAYS}`;
  renderCurrent();
}

function maybeHauntTitle() {
  if (readSession(SESSION_KEYS.haunted) === "1") return;
  if (Math.random() >= 0.01) return;
  writeSession(SESSION_KEYS.haunted, "1");
  if (prefersReducedMotion()) {
    document.title = "ayúdenme";
    setTimeout(() => {
      if (!corruptedActive) renderCurrent();
    }, 2000);
    return;
  }
  let alternate = false;
  const flicker = setInterval(() => {
    alternate = !alternate;
    document.title = alternate ? "ayúdenme" : `Día ${currentDay} · Diario de Arion`;
  }, 170);
  setTimeout(() => {
    clearInterval(flicker);
    if (!corruptedActive) renderCurrent();
  }, 2200);
}

function printArchiveMessage() {
  console.log(
    "%c[ARCHIVO DE ARION]%c\nLos registros se perdieron. El índice también.\nSi puedes leerme, puedes encontrarme: fuerza el índice… o escribe su nombre…",
    "color:#d9b54c;font-family:Georgia,serif;letter-spacing:0.2em;",
    "color:#f5ecd2;font-family:Georgia,serif;"
  );
}

function renderCorrupted(text) {
  if (!text) return "";
  let html = text;
  CORRUPTION_RULES.forEach(([pattern, className]) => {
    html = html.replace(pattern, (match) => `<span class="${className}" data-text="${match}">${match}</span>`);
  });
  return html;
}

function randomizeGlitch(container) {
  container.querySelectorAll(".glitch, .red-corrupt, .corrupt").forEach((el) => {
    el.style.setProperty("--gd", `${(-Math.random() * 3).toFixed(2)}s`);
  });
}

function findEntryDay(direction) {
  let day = currentDay + direction;
  while (day >= 1 && day <= TOTAL_DAYS) {
    if (entryMap.has(day)) return day;
    day += direction;
  }
  return null;
}

function buildMenu() {
  const frag = document.createDocumentFragment();
  for (let day = 1; day <= TOTAL_DAYS; day++) {
    const option = document.createElement("li");
    option.id = `day-opt-${day}`;
    option.dataset.day = String(day);
    option.className = entryMap.has(day) ? "day-option has-entry" : "day-option";
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", "false");
    option.innerHTML = `<span class="day-option-label">Día ${day}</span>${entryMap.has(day) ? '<span class="day-option-dot" aria-hidden="true">●</span>' : ""}`;
    frag.appendChild(option);
  }
  menuEl.appendChild(frag);
}

function buildProgressMarks() {
  const frag = document.createDocumentFragment();
  for (let day = 1; day <= TOTAL_DAYS; day++) {
    if (!entryMap.has(day)) continue;
    const mark = document.createElement("span");
    mark.className = "progress-mark";
    mark.style.left = `${((day - 0.5) / TOTAL_DAYS) * 100}%`;
    frag.appendChild(mark);
  }
  progressMarks.appendChild(frag);
}

function renderCurrent() {
  const entry = entryMap.get(currentDay);
  const isMissing = !entry;
  panelEl.classList.remove("is-corrupted");
  progressEl.classList.remove("is-corrupted");
  dayTotalEl.textContent = `/ ${TOTAL_DAYS}`;

  dayNumberEl.textContent = String(currentDay);
  entryBodyEl.classList.toggle("is-missing", isMissing);

  if (entry) {
    entryTitleEl.textContent = entry.title;
    entryTextEl.innerHTML = renderCorrupted(entry.text);
  } else {
    entryTitleEl.textContent = "Sin registro";
    entryTextEl.innerHTML = '<span class="glitch" data-text="[REGISTRO_BORRADO]">[REGISTRO_BORRADO]</span> · El fragmento correspondiente a este día se encuentra ausente o corrupto.';
  }

  randomizeGlitch(entryTextEl);

  document.title = `Día ${currentDay} · Diario de Arion`;
  selectValueEl.textContent = `Día ${currentDay}`;

  for (let i = 0; i < menuEl.children.length; i++) {
    const option = menuEl.children[i];
    const isSelected = i === currentDay - 1;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-selected", String(isSelected));
  }

  progressFill.style.width = `${(currentDay / TOTAL_DAYS) * 100}%`;

  btnPrev.disabled = currentDay <= 1;
  btnJumpPrev.disabled = findEntryDay(-1) === null;
  btnJumpNext.disabled = findEntryDay(1) === null;
  btnNext.classList.toggle("is-end", currentDay >= TOTAL_DAYS);
  btnNext.setAttribute("aria-disabled", String(currentDay >= TOTAL_DAYS));
}

function animateDayNumber(from, to) {
  cancelAnimationFrame(dayAnimHandle);
  if (from === to || prefersReducedMotion()) {
    dayNumberEl.textContent = String(to);
    return;
  }
  const start = performance.now();
  const duration = 340;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    dayNumberEl.textContent = String(Math.round(from + (to - from) * eased));
    if (progress < 1) dayAnimHandle = requestAnimationFrame(tick);
  }

  dayAnimHandle = requestAnimationFrame(tick);
}

function animateEntry() {
  if (prefersReducedMotion()) return;
  entryBodyEl.classList.remove("entry-anim");
  void entryBodyEl.offsetWidth;
  entryBodyEl.classList.add("entry-anim");
}

function goTo(day) {
  const next = Math.min(Math.max(day, 1), TOTAL_DAYS);
  if (corruptedActive) leaveCorrupted();
  if (next === currentDay) return;
  const from = currentDay;
  currentDay = next;
  writeStored(STORAGE_KEYS.day, String(currentDay));
  playPageTurn();
  renderCurrent();
  animateDayNumber(from, next);
  animateEntry();
  if (prefersReducedMotion()) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function syncSoundButton() {
  btnSound.setAttribute("aria-pressed", String(!muted));
  btnSound.textContent = muted ? "♪ Sonido: desactivado" : "♪ Sonido: activado";
  btnSound.classList.toggle("is-muted", muted);
}

function openMenu() {
  if (menuOpen) return;
  menuOpen = true;
  menuEl.hidden = false;
  selectBtn.setAttribute("aria-expanded", "true");
  selectorWrap.classList.add("is-open");
  setActiveOption(currentDay - 1);
  menuEl.focus({ preventScroll: true });
  scrollActiveIntoView();
}

function closeMenu(focusButton) {
  if (!menuOpen) return;
  menuOpen = false;
  menuEl.hidden = true;
  selectBtn.setAttribute("aria-expanded", "false");
  selectorWrap.classList.remove("is-open");
  menuEl.removeAttribute("aria-activedescendant");
  if (focusButton) selectBtn.focus({ preventScroll: true });
}

function setActiveOption(index) {
  const clamped = Math.min(Math.max(index, 0), TOTAL_DAYS - 1);
  activeIndex = clamped;
  const previous = menuEl.querySelector(".is-active");
  if (previous) previous.classList.remove("is-active");
  const option = menuEl.children[clamped];
  if (!option) return;
  option.classList.add("is-active");
  menuEl.setAttribute("aria-activedescendant", option.id);
}

function scrollActiveIntoView() {
  const option = menuEl.children[activeIndex];
  if (option) option.scrollIntoView({ block: "nearest" });
}

function selectDay(day) {
  nextStreak = 0;
  closeMenu(true);
  goTo(day);
}

buildMenu();
buildProgressMarks();
dayTotalEl.textContent = `/ ${TOTAL_DAYS}`;
syncSoundButton();
renderCurrent();

btnPrev.addEventListener("click", () => {
  nextStreak = 0;
  goTo(currentDay - 1);
});

btnNext.addEventListener("click", () => {
  if (corruptedActive) {
    goTo(currentDay + 1);
    return;
  }
  nextStreak += 1;
  if (currentDay >= TOTAL_DAYS) {
    if (nextStreak >= TRANSMISSION_THRESHOLD) {
      nextStreak = 0;
      startTransmissionFlow();
    }
    return;
  }
  const next = currentDay + 1;
  goTo(next);
  if (next >= TOTAL_DAYS) nextStreak = 0;
});

btnJumpPrev.addEventListener("click", () => {
  nextStreak = 0;
  const day = findEntryDay(-1);
  if (day !== null) goTo(day);
});

btnJumpNext.addEventListener("click", () => {
  nextStreak = 0;
  const day = findEntryDay(1);
  if (day !== null) goTo(day);
});

btnSound.addEventListener("click", () => {
  muted = !muted;
  writeStored(STORAGE_KEYS.muted, muted ? "1" : "0");
  syncSoundButton();
  if (muted) {
    stopAmbient();
  } else {
    playPageTurn();
    if (ambientStarted) resumeAmbient();
  }
});

btnFooterSecret.addEventListener("click", () => {
  playStaticBurst(0.25);
  showSecretLine(FOOTER_SECRET);
});

selectBtn.addEventListener("click", () => {
  if (menuOpen) {
    closeMenu(false);
  } else {
    openMenu();
  }
});

selectBtn.addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
    ev.preventDefault();
    openMenu();
  }
});

menuEl.addEventListener("click", (ev) => {
  const option = ev.target.closest(".day-option");
  if (!option) return;
  selectDay(Number(option.dataset.day));
});

menuEl.addEventListener("keydown", (ev) => {
  switch (ev.key) {
    case "ArrowDown":
      ev.preventDefault();
      setActiveOption(activeIndex + 1);
      scrollActiveIntoView();
      break;
    case "ArrowUp":
      ev.preventDefault();
      setActiveOption(activeIndex - 1);
      scrollActiveIntoView();
      break;
    case "Home":
      ev.preventDefault();
      setActiveOption(0);
      scrollActiveIntoView();
      break;
    case "End":
      ev.preventDefault();
      setActiveOption(TOTAL_DAYS - 1);
      scrollActiveIntoView();
      break;
    case "Enter":
    case " ":
      ev.preventDefault();
      selectDay(activeIndex + 1);
      break;
    case "Escape":
      ev.preventDefault();
      closeMenu(true);
      break;
    case "Tab":
      closeMenu(false);
      break;
    default:
      break;
  }
});

document.addEventListener("pointerdown", (ev) => {
  if (!menuOpen) return;
  if (!selectorWrap.contains(ev.target)) closeMenu(false);
});

window.addEventListener("keydown", (ev) => {
  if (ev.key === "Escape" && corruptedActive) {
    leaveCorrupted();
    return;
  }
  if (!ev.ctrlKey && !ev.metaKey && !ev.altKey && typeof ev.key === "string" && ev.key.length === 1 && /[a-z]/i.test(ev.key)) {
    keyBuffer = (keyBuffer + ev.key.toLowerCase()).slice(-8);
    if (SECRET_WORDS.some((word) => keyBuffer.endsWith(word))) {
      keyBuffer = "";
      enterCorruptedDay();
    }
  }
  if (menuOpen) return;
  const target = ev.target;
  if (target instanceof Element && target.closest(".day-selector-wrap")) return;
  if (ev.key === "ArrowLeft") {
    nextStreak = 0;
    goTo(currentDay - 1);
  }
  if (ev.key === "ArrowRight") {
    nextStreak = 0;
    goTo(currentDay + 1);
  }
});

printArchiveMessage();
maybeHauntTitle();

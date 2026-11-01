// Where RSVPs are sent. Leave empty to only save them in this browser (for testing).
// Any endpoint that accepts a JSON POST works (e.g. a Google Apps Script web app or Formspree).
const FORM_ENDPOINT = "";

/* ---------- Scroll zoom into the house ---------- */
const intro = document.getElementById("intro");
const invite = document.getElementById("invite");
const glow = document.getElementById("glow");
const hint = document.getElementById("hint");

const MAX_SCALE = 14;

function clamp01(x) {
  return Math.min(1, Math.max(0, x));
}

function render() {
  const scrollable = intro.offsetHeight - window.innerHeight;
  const p = clamp01(window.scrollY / scrollable);

  // Ease-in so the approach starts gently and accelerates through the door
  const scale = Math.pow(MAX_SCALE, p * p);
  invite.style.transform = `scale(${scale})`;

  // Warm interior light takes over in the last 30% of the scroll
  glow.style.opacity = clamp01((p - 0.7) / 0.3);
  hint.style.opacity = 1 - clamp01(p / 0.1);
}

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    render();
    ticking = false;
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
render();

/* ---------- RSVP form ---------- */
const form = document.getElementById("rsvp-form");
const attendingFields = document.getElementById("attending-fields");
const errorEl = document.getElementById("error");
const thanks = document.getElementById("thanks");
const thanksText = document.getElementById("thanks-text");

form.addEventListener("change", () => {
  attendingFields.hidden = form.asistencia.value === "no";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.textContent = "";

  const data = Object.fromEntries(new FormData(form));
  data.nombre = (data.nombre || "").trim();

  if (!data.nombre) return (errorEl.textContent = "Por favor escribe tu nombre.");
  if (!data.asistencia) return (errorEl.textContent = "Por favor indica si asistirás.");
  if (data.asistencia === "no") {
    delete data.personas;
    delete data.restricciones;
  }
  data.fecha = new Date().toISOString();

  const button = form.querySelector("button");
  button.disabled = true;

  try {
    if (FORM_ENDPOINT) {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.status);
    } else {
      const saved = JSON.parse(localStorage.getItem("rsvps") || "[]");
      saved.push(data);
      localStorage.setItem("rsvps", JSON.stringify(saved));
      console.log("RSVP guardado localmente:", data);
    }
  } catch (err) {
    button.disabled = false;
    errorEl.textContent = "No pudimos enviar tu respuesta. Inténtalo de nuevo.";
    return;
  }

  thanksText.textContent =
    data.asistencia === "si"
      ? `${data.nombre}, ¡nos vemos el 30 de enero en Cuenca!`
      : `${data.nombre}, te extrañaremos. Gracias por avisarnos.`;
  form.hidden = true;
  thanks.hidden = false;
});

/**
 * MOVILTEC DIGITAL — Generador de Landing Pages
 * ================================================
 * Uso: node generar.js clientes/mi-cliente.json
 *
 * Genera demos/<slug>/index.html listo para deploy.
 */

const fs   = require('fs');
const path = require('path');

// ── Leer configuración ──────────────────────────────────────────────────────
const configFile = process.argv[2];
if (!configFile) {
  console.error('❌  Falta el archivo de cliente.\n    Uso: node generar.js clientes/mi-cliente.json');
  process.exit(1);
}
if (!fs.existsSync(configFile)) {
  console.error(`❌  No se encontró el archivo: ${configFile}`);
  process.exit(1);
}

const cfg = JSON.parse(fs.readFileSync(configFile, 'utf8'));

// ── Validaciones básicas ────────────────────────────────────────────────────
const rubrosValidos = ['inmobiliaria', 'peluqueria', 'servicios-hogar', 'gastronomia'];
if (!rubrosValidos.includes(cfg.rubro)) {
  console.error(`❌  Rubro inválido: "${cfg.rubro}"\n    Opciones: ${rubrosValidos.join(', ')}`);
  process.exit(1);
}

// ── Slug (nombre de carpeta) ────────────────────────────────────────────────
const slug = cfg.slug || cfg.nombre
  .toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/\s+/g, '-')
  .replace(/[^a-z0-9-]/g, '');

const outDir = path.join('demos', slug);

// ── Leer plantilla ──────────────────────────────────────────────────────────
const templatePath = path.join('templates', `${cfg.rubro}.html`);
if (!fs.existsSync(templatePath)) {
  console.error(`❌  No existe la plantilla: ${templatePath}`);
  process.exit(1);
}
let html = fs.readFileSync(templatePath, 'utf8');

// ── Helpers ─────────────────────────────────────────────────────────────────
const logoIniciales = cfg.logoIniciales || cfg.nombre.replace(/[^A-ZÑa-zñ]/gi,'').substring(0,2).toUpperCase();
const colorFondo    = cfg.colorFondo    || '#0F0B08';
const colorSurface  = cfg.colorSurface  || '#1A1410';
const colorCard     = cfg.colorCard     || '#231C15';
const colorBorde    = cfg.colorBorde    || '#3A2E22';
const colorTexto    = cfg.colorTexto    || '#F5ECD7';
const apiUrl        = cfg.apiUrl        ? `'${cfg.apiUrl}'` : 'null';
const telWA         = cfg.telefono.replace(/\D/g,'').startsWith('549') ? cfg.telefono.replace(/\D/g,'') : '549' + cfg.telefono.replace(/\D/g,'');
const telURL        = encodeURIComponent(`Hola! Vi ${cfg.nombre} y quiero consultar`);

// ── Generar HTML de servicios ────────────────────────────────────────────────
function serviciosCards(servicios) {
  return (servicios || []).map(s => `
      <div class="serv-card">
        <div class="serv-ico">${s.icono || '🔧'}</div>
        <div class="serv-name">${s.nombre}</div>
        <div class="serv-desc">${s.descripcion || ''}</div>
      </div>`).join('');
}

// ── Generar HTML de items (propiedades, servicios con precio, etc.) ──────────
function itemsCards(items, tipo) {
  if (!items || !items.length) return '';

  if (tipo === 'inmobiliaria') {
    return items.map(i => `
      <div class="prop-card" data-op="${i.operacion || 'venta'}" data-tipo="${i.tipoInmueble || 'casa'}">
        <div class="prop-img">
          <img src="${i.foto || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=75'}" alt="${i.titulo}"/>
          <div class="prop-badge">${i.operacion || 'Venta'}</div>
        </div>
        <div class="prop-body">
          <div class="prop-tipo">${i.tipoInmueble || 'Propiedad'} &bull; ${i.zona || cfg.ciudad}</div>
          <div class="prop-title">${i.titulo}</div>
          <div class="prop-details">
            ${i.ambientes ? `<div class="prop-det">🏠 ${i.ambientes} amb.</div>` : ''}
            ${i.metros    ? `<div class="prop-det">🔧 ${i.metros} m²</div>` : ''}
            <div class="prop-det">📍 ${i.zona || cfg.ciudad}</div>
          </div>
          <div class="prop-price">${i.precio}</div>
          <div class="prop-foot">
            <button class="btn-consultar" onclick="consultar('${i.titulo} — ${i.precio}')">💬 Consultar</button>
            <button class="btn-fav">♡</button>
          </div>
        </div>
      </div>`).join('');
  }

  if (tipo === 'peluqueria') {
    return items.map(i => `
      <div class="serv-card">
        <div class="serv-ico">${i.icono || '✂️'}</div>
        <div class="serv-name">${i.nombre}</div>
        <div class="serv-desc">${i.descripcion || ''}</div>
        <div class="serv-foot">
          <div class="serv-price">${i.precio}</div>
          <div class="serv-time">${i.duracion || ''}</div>
        </div>
      </div>`).join('');
  }

  if (tipo === 'servicios-hogar') {
    return items.map(i => `
      <div class="serv-card">
        <div class="serv-ico">${i.icono || '🔧'}</div>
        <div class="serv-name">${i.nombre}</div>
        <div class="serv-desc">${i.descripcion || ''}</div>
        <div class="serv-foot">
          ${i.precio ? `<div class="serv-price">${i.precio}</div>` : ''}
          ${i.tiempo ? `<div class="serv-time">${i.tiempo}</div>` : ''}
        </div>
      </div>`).join('');
  }

  return '';
}

// ── Booking: lista de servicios para el widget ────────────────────────────────
function bookingServicios(cfg) {
  const lista = cfg.bookingServicios || cfg.servicios?.map(s => s.nombre) || [];
  return JSON.stringify(lista);
}

// ── Stats hero ────────────────────────────────────────────────────────────────
function statsHtml(stats) {
  return (stats || []).map(s => `
    <div><div class="snum">${s.numero}</div><div class="slbl">${s.label}</div></div>`).join('');
}

// ── Testimonios ───────────────────────────────────────────────────────────────
function testimoniosHtml(tests) {
  return (tests || []).map(t => `
      <div class="tc-card">
        <div class="tc-stars">★★★★★</div>
        <p class="tc-text">"${t.texto}"</p>
        <div class="tc-au">
          <div class="tc-av">${t.nombre.charAt(0)}</div>
          <div><div class="tc-name">${t.nombre}</div><div class="tc-loc">📍 ${t.lugar}</div></div>
        </div>
      </div>`).join('');
}

// ── Reemplazos simples ────────────────────────────────────────────────────────
// Hero style (imagen de fondo si hay heroImg)
const heroStyle = cfg.heroImg
  ? `,url('${cfg.heroImg}') center/cover no-repeat`
  : '';

// Separar slogan en 2 líneas si no viene explícito
const sloganL1 = cfg.slogan_linea1 || cfg.slogan || '';
const sloganL2 = cfg.slogan_linea2 || '';

const reemplazos = {
  '{{NOMBRE}}'           : cfg.nombre,
  '{{SLOGAN}}'           : cfg.slogan || '',
  '{{TELEFONO}}'         : telWA,
  '{{TELEFONO_URL}}'     : telURL,
  '{{CIUDAD}}'           : cfg.ciudad || '',
  '{{PAIS}}'             : cfg.pais || 'Argentina',
  '{{COLOR1}}'           : cfg.color1,
  '{{COLOR2}}'           : cfg.color2,
  '{{COLOR_BG}}'         : colorFondo,
  '{{COLOR_SURFACE}}'    : colorSurface,
  '{{COLOR_CARD}}'       : colorCard,
  '{{COLOR_BORDE}}'      : colorBorde,
  '{{COLOR_TEXTO}}'      : colorTexto,
  '{{LOGO_INICIALES}}'   : logoIniciales,
  '{{API_URL}}'          : apiUrl,
  '{{HORARIO}}'          : cfg.horario || 'Lunes a Viernes 9–18hs',
  '{{DESCRIPCION}}'      : cfg.descripcion || cfg.slogan || '',
  '{{HERO_IMG}}'         : cfg.heroImg || '',
  '{{HERO_STYLE}}'       : heroStyle,
  '{{SLOGAN_LINEA1}}'    : sloganL1,
  '{{SLOGAN_LINEA2}}'    : sloganL2,
  '{{SERVICIOS_CARDS}}'  : serviciosCards(cfg.servicios),
  '{{ITEMS_CARDS}}'      : itemsCards(cfg.items, cfg.rubro),
  '{{STATS_HTML}}'       : statsHtml(cfg.stats),
  '{{TESTIMONIOS_HTML}}' : testimoniosHtml(cfg.testimonios),
  '{{BOOKING_SERVICIOS}}': bookingServicios(cfg),
  '{{AÑO}}'              : new Date().getFullYear(),
};

for (const [key, val] of Object.entries(reemplazos)) {
  html = html.split(key).join(String(val ?? ''));
}

// ── Escribir archivo ──────────────────────────────────────────────────────────
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'index.html');
fs.writeFileSync(outFile, html, 'utf8');

// ── Copiar imágenes si están en la misma carpeta que el JSON ──────────────────
const jsonDir = path.dirname(configFile);
const imgExts = ['.jpg','.jpeg','.png','.webp','.gif'];
if (fs.existsSync(jsonDir)) {
  fs.readdirSync(jsonDir).forEach(f => {
    if (imgExts.includes(path.extname(f).toLowerCase())) {
      fs.copyFileSync(path.join(jsonDir, f), path.join(outDir, f));
    }
  });
}

console.log(`\n✅  Página generada exitosamente`);
console.log(`   Cliente : ${cfg.nombre}`);
console.log(`   Rubro   : ${cfg.rubro}`);
console.log(`   Archivo : ${outFile}`);
console.log(`\n👉  Próximo paso:`);
console.log(`   netlify deploy --prod --dir .\n`);

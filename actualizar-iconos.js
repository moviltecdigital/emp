/**
 * Script para actualizar todos los demos con iconos profesionales de Font Awesome
 * Reemplaza emojis por iconos premium
 */

const fs = require('fs');
const path = require('path');

const demosDir = path.join(__dirname, 'demos');

// Mapeo de emojis a iconos Font Awesome
const iconosMap = {
  // Servicios - Peluquería
  '&#9986;': '<i class="fas fa-cut"></i>',
  '&#9986;&#65039;': '<i class="fas fa-cut"></i>',
  '&#127774;': '<i class="fas fa-sun"></i>',
  '&#127775;': '<i class="fas fa-star"></i>',
  '&#128139;': '<i class="fas fa-wind"></i>',
  '&#128248;': '<i class="fas fa-camera"></i>',
  '&#128082;': '<i class="fas fa-user"></i>',
  '&#10024;': '<i class="fas fa-magic"></i>',
  
  // Estética/Belleza
  '&#128133;': '<i class="fas fa-hand-sparkles"></i>',
  '&#128135;': '<i class="fas fa-spa"></i>',
  '&#128150;': '<i class="fas fa-heart"></i>',
  '&#127912;': '<i class="fas fa-palette"></i>',
  '&#128171;': '<i class="fas fa-wind"></i>',
  
  // Odontología/Salud
  '&#128513;': '<i class="fas fa-smile"></i>',
  '&#128170;': '<i class="fas fa-tooth"></i>',
  '&#128138;': '<i class="fas fa-pills"></i>',
  '&#129463;': '<i class="fas fa-teeth"></i>',
  
  // Ropa/Retail
  '&#128085;': '<i class="fas fa-tshirt"></i>',
  '&#128090;': '<i class="fas fa-shopping-bag"></i>',
  '&#128096;': '<i class="fas fa-shoe-prints"></i>',
  '&#128086;': '<i class="fas fa-tshirt"></i>',
  
  // Gastronomía
  '&#127860;': '<i class="fas fa-utensils"></i>',
  '&#127829;': '<i class="fas fa-pizza-slice"></i>',
  '&#127791;': '<i class="fas fa-burger"></i>',
  '&#9749;': '<i class="fas fa-coffee"></i>',
  
  // Inmobiliaria
  '&#127969;': '<i class="fas fa-home"></i>',
  '&#128205;': '<i class="fas fa-map-marker-alt"></i>',
  '&#128273;': '<i class="fas fa-key"></i>',
  
  // Gimnasio/Fitness
  '&#127947;': '<i class="fas fa-dumbbell"></i>',
  '&#128170;': '<i class="fas fa-dumbbell"></i>',
  '&#127939;': '<i class="fas fa-running"></i>',
  '&#128692;': '<i class="fas fa-bicycle"></i>',
  
  // Veterinaria
  '&#128054;': '<i class="fas fa-dog"></i>',
  '&#128049;': '<i class="fas fa-cat"></i>',
  '&#128062;': '<i class="fas fa-paw"></i>',
  '&#129437;': '<i class="fas fa-dove"></i>',
  
  // Taller/Servicios
  '&#128295;': '<i class="fas fa-wrench"></i>',
  '&#128298;': '<i class="fas fa-tools"></i>',
  '&#128663;': '<i class="fas fa-car"></i>',
  '&#128736;': '<i class="fas fa-cogs"></i>',
  
  // Generales
  '&#9733;': '<i class="fas fa-star"></i>',
  '&#9734;': '<i class="far fa-star"></i>',
  '&#9989;': '<i class="fas fa-check-circle"></i>',
  '&#10004;': '<i class="fas fa-check"></i>',
  '&#10003;': '<i class="fas fa-check"></i>',
  '&#10133;': '<i class="fas fa-plus"></i>',
  '&#10134;': '<i class="fas fa-minus"></i>',
  '&#10006;': '<i class="fas fa-times"></i>',
  '&#10060;': '<i class="fas fa-times-circle"></i>',
  '&#9200;': '<i class="fas fa-clock"></i>',
  '&#128337;': '<i class="fas fa-clock"></i>',
  '&#128197;': '<i class="fas fa-calendar-alt"></i>',
  '&#128222;': '<i class="fas fa-phone"></i>',
  '&#128231;': '<i class="fas fa-envelope"></i>',
  '&#128241;': '<i class="fas fa-mobile-alt"></i>',
  '&#128242;': '<i class="fas fa-mobile-alt"></i>',
  '&#128172;': '<i class="fas fa-comments"></i>',
  '&#128173;': '<i class="fas fa-heart"></i>',
  '&#128276;': '<i class="fas fa-bell"></i>',
  '&#128640;': '<i class="fas fa-rocket"></i>',
  '&#128161;': '<i class="fas fa-lightbulb"></i>',
  '&#128218;': '<i class="fas fa-book"></i>',
  '&#128220;': '<i class="fas fa-scroll"></i>',
};

// Función para agregar Font Awesome si no está
function agregarFontAwesome(html) {
  if (html.includes('font-awesome') || html.includes('fontawesome')) {
    return html;
  }
  
  const fontAwesomeLink = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>';
  
  // Insertar después del último link
  html = html.replace(/(<link[^>]*>)(?!.*<link)/s, `$1\n${fontAwesomeLink}`);
  
  return html;
}

// Función para reemplazar emojis
function reemplazarEmojis(html) {
  for (const [emoji, icono] of Object.entries(iconosMap)) {
    // Reemplazar todas las ocurrencias
    html = html.split(emoji).join(icono);
  }
  return html;
}

// Procesar demos principales
const demosPrincipales = [
  'peluqueria',
  'estetica', 
  'odontologia',
  'ropa',
  'gastronomia',
  'inmobiliaria',
  'gimnasio',
  'veterinaria',
  'taller',
  'servicios-hogar'
];

console.log('🎨 Actualizando demos con iconos profesionales...\n');

for (const demo of demosPrincipales) {
  const filePath = path.join(demosDir, demo, 'index.html');
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Demo no encontrado: ${demo}`);
    continue;
  }
  
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Agregar Font Awesome
  html = agregarFontAwesome(html);
  
  // Reemplazar emojis
  html = reemplazarEmojis(html);
  
  // Guardar
  fs.writeFileSync(filePath, html);
  
  console.log(`✅ ${demo} actualizado`);
}

console.log('\n🚀 Todos los demos actualizados con iconos profesionales!');
console.log('📁 Revisa los demos en tu navegador para ver los cambios');

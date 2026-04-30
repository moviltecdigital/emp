/**
 * GENERADOR SIMPLIFICADO DE PLANTILLAS
 * Uso: node generar.js peluqueria mi-cliente presencia
 */

const fs = require('fs');
const path = require('path');

// Leer argumentos simples: demo cliente plan
const demo = process.argv[2];
const cliente = process.argv[3];
const plan = process.argv[4] || 'presencia';

if (!demo || !cliente) {
  console.log(`
❌ Faltan argumentos

Uso:
  node generar.js DEMO CLIENTE [PLAN]

Ejemplos:
  node generar.js peluqueria maria presencia
  node generar.js estetica laura ventas
  node generar.js odontologia carlos pro

Demos disponibles:
  peluqueria, estetica, odontologia, gastronomia,
  ropa, inmobiliaria, gimnasio, veterinaria, taller

Planes:
  presencia  - $15.000 (básico)
  ventas     - $35.000 (con catálogo)
  pro        - $55.000 (con reservas)
`);
  process.exit(1);
}

console.log(`\n🚀 Generando sitio...`);
console.log(`   Demo: ${demo}`);
console.log(`   Cliente: ${cliente}`);
console.log(`   Plan: ${plan}\n`);

// 1. Cargar demo base
const demoPath = path.join(__dirname, 'demos', demo, 'index.html');
if (!fs.existsSync(demoPath)) {
  console.error(`❌ Demo no encontrado: ${demoPath}`);
  process.exit(1);
}

let html = fs.readFileSync(demoPath, 'utf8');

// 2. Cargar datos del cliente
const configPath = path.join(__dirname, 'clientes-config', `${cliente}.json`);
let datos = {};
if (fs.existsSync(configPath)) {
  datos = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  console.log('✅ Datos del cliente cargados');
} else {
  console.log('⚠️  No se encontró archivo de config, usando datos de ejemplo');
  datos = {
    negocio: { nombre: cliente, slogan: 'Tu mejor opción' },
    contacto: { whatsapp: '2645304372', ciudad: 'San Juan' }
  };
}

// 3. Reemplazar variables básicas
const whatsappCliente = datos.contacto?.whatsapp || '2645304372';
const nombreCliente = datos.negocio?.nombre || cliente;
const sloganCliente = datos.negocio?.slogan || 'Tu mejor opción';
const ciudadCliente = datos.contacto?.ciudad || 'San Juan';

console.log('📱 WhatsApp del cliente:', whatsappCliente);
console.log('🏢 Nombre del negocio:', nombreCliente);

// Reemplazos de texto completo (más seguro)
const reemplazos = {
  // Títulos
  '<title>Studio Noir': `<title>${nombreCliente}`,
  '<title>NOIR Studio': `<title>${nombreCliente}`,
  '<title>Belleza Natural': `<title>${nombreCliente}`,
  '<title>Sonrisa Perfecta': `<title>${nombreCliente}`,
  
  // Logo/Nav - reemplazos específicos
  'Studio <span>Noir</span>': `${nombreCliente}`,
  'Studio Noir': nombreCliente,
  'Belleza Natural': nombreCliente,
  'Sonrisa Perfecta': nombreCliente,
  
  // Slogans específicos de cada demo
  'Donde el estilo<br><em>cobra vida.</em>': sloganCliente,
  'Donde el estilo\n<em>cobra vida.</em>': sloganCliente,
  'Tu belleza, <span>nuestra pasión</span>': sloganCliente,
  'Tu sonrisa en las mejores manos': sloganCliente,
  
  // Ciudad
  'San Juan': ciudadCliente,
};

// Aplicar reemplazos de texto
for (const [buscar, reemplazar] of Object.entries(reemplazos)) {
  html = html.split(buscar).join(reemplazar);
}

// Reemplazo especial para WhatsApp (usando regex para ser más flexible)
// Reemplazar cualquier número de WhatsApp en links wa.me
html = html.replace(/wa\.me\/549\d+/g, `wa.me/549${whatsappCliente}`);
html = html.replace(/wa\.me\/\d+/g, `wa.me/${whatsappCliente}`);

// Reemplazar números sueltos que parecen teléfonos (formato 264XXXXXXX)
html = html.replace(/264\d{7}/g, whatsappCliente);

// Reemplazar en textos visibles
html = html.replace(/264-\d{3}-\d{4}/g, whatsappCliente.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));

// 4. Adaptar según plan
if (plan === 'presencia') {
  // Quitar precios de servicios (dejar solo "Consultar")
  html = html.replace(/\$[\d\.]+/g, 'Consultar');
  console.log('✅ Plan Presencia: precios ocultos');
} else if (plan === 'ventas') {
  // Mantener precios, agregar funcionalidad de carrito
  console.log('✅ Plan Ventas: con catálogo y precios');
} else if (plan === 'pro') {
  // Agregar sistema de reservas
  console.log('✅ Plan Pro: con reservas online');
}

// 5. Agregar marca al final
html = html.replace('</body>', `
<!-- Generado por Moviltec Digital -->
<!-- Plan: ${plan.toUpperCase()} -->
<!-- Cliente: ${datos.negocio?.nombre || cliente} -->
</body>`);

// 6. Guardar resultado
const outputDir = path.join(__dirname, 'clientes', `${cliente}-${demo}`);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputFile = path.join(outputDir, 'index.html');
fs.writeFileSync(outputFile, html);

console.log(`\n✅ ¡Listo!`);
console.log(`📄 Archivo: ${outputFile}`);
console.log(`\n👉 Abrí este archivo en tu navegador para ver el resultado`);
console.log(`👉 Subilo a Netlify para publicarlo online\n`);

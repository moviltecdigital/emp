/**
 * GENERADOR DE TEMPLATES MOVILTEC DIGITAL
 * Compila archivos de configuración JSON en sitios web completos
 * 
 * Uso: node generador.js --cliente=cliente-presencia-ejemplo --output=../clientes/peluqueria-estilo-urbano
 * Uso web: node generador.js --json='{"plan":"presencia",...}' --output=./mi-sitio
 */

const fs = require('fs');
const path = require('path');

// Leer argumentos de línea de comandos
const args = process.argv.slice(2);
const clienteArg = args.find(a => a.startsWith('--cliente='))?.split('=')[1];
const outputArg = args.find(a => a.startsWith('--output='))?.split('=')[1];
const jsonArg = args.find(a => a.startsWith('--json='))?.substring(7); // Capturar JSON inline

if ((!clienteArg && !jsonArg) || !outputArg) {
  console.log(`
❌ Error: Faltan argumentos

Uso correcto:
  node generador.js --cliente=nombre-del-json --output=ruta/salida
  node generador.js --json='{"plan":"presencia",...}' --output=ruta/salida

Ejemplo:
  node generador.js --cliente=cliente-presencia-ejemplo --output=../clientes/peluqueria-maria
  node generador.js --json='{"plan":"presencia","negocio":{"nombre":"Mi Negocio"}}' --output=./mi-sitio
  `);
  process.exit(1);
}

// Cargar configuración del cliente
let config;

if (jsonArg) {
  // Formato web del formulario
  try {
    config = JSON.parse(jsonArg);
    config = normalizarConfigWeb(config);
  } catch (e) {
    console.error('❌ Error al parsear JSON:', e.message);
    process.exit(1);
  }
} else {
  // Formato archivo tradicional
  const clientePath = path.join(__dirname, 'ejemplos', `${clienteArg}.json`);
  
  if (!fs.existsSync(clientePath)) {
    console.error(`❌ No se encontró el archivo de configuración: ${clientePath}`);
    process.exit(1);
  }
  
  config = JSON.parse(fs.readFileSync(clientePath, 'utf8'));
}

// Normalizar configuración del formulario web al formato completo
function normalizarConfigWeb(webConfig) {
  const rubro = webConfig.negocio?.rubro || 'otro';
  const colorPrimario = webConfig.diseno?.color_primario || '#3B82F6';
  
  // Generar colores secundarios basados en el primario
  const colorSecundario = adjustColor(colorPrimario, -20);
  const colorAcento = '#F59E0B';
  
  return {
    plan: mapPlan(webConfig.plan),
    negocio: {
      nombre: webConfig.negocio?.nombre || 'Mi Negocio',
      slogan: webConfig.negocio?.slogan || '',
      descripcion: webConfig.negocio?.descripcion || '',
      año_fundacion: webConfig.negocio?.año_fundacion || new Date().getFullYear(),
      rubro: rubro
    },
    contacto: {
      whatsapp: '549' + (webConfig.contacto?.whatsapp || '2645304372'),
      telefono: webConfig.contacto?.telefono || '',
      email: webConfig.contacto?.email || '',
      direccion: webConfig.contacto?.direccion || '',
      ciudad: webConfig.contacto?.ciudad || 'San Juan',
      horarios: webConfig.contacto?.horarios || 'Lun a Vie: 9:00 - 18:00'
    },
    redes: {
      instagram: '',
      facebook: '',
      tiktok: ''
    },
    diseno: {
      color_primario: colorPrimario,
      color_secundario: colorSecundario,
      color_acento: colorAcento,
      tipografia: 'Inter',
      logo_url: 'https://via.placeholder.com/150x60?text=LOGO',
      favicon_url: ''
    },
    contenido: generarContenidoPorRubro(rubro, webConfig),
    seo: {
      titulo_pagina: `${webConfig.negocio?.nombre || 'Mi Negocio'} | ${capitalize(rubro)} en San Juan`,
      descripcion_meta: webConfig.negocio?.descripcion || '',
      keywords: `${rubro} san juan, ${rubro} argentina`,
      imagen_og: ''
    },
    // Datos específicos del formulario web
    catalogo: webConfig.catalogo || null,
    bot: webConfig.bot || null
  };
}

// Mapear planes del formulario a planes del sistema
function mapPlan(plan) {
  const mapping = {
    'presencia': 'presencia_digital',
    'ventas': 'ventas_automaticas',
    'pro': 'negocio_digital_pro'
  };
  return mapping[plan] || 'presencia_digital';
}

// Ajustar brillo de color hexadecimal
function adjustColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

// Generar contenido por rubro
function generarContenidoPorRubro(rubro, webConfig) {
  const servicios = webConfig.servicios || [];
  
  const contenidosPorRubro = {
    peluqueria: {
      hero_titulo: 'Transformá tu imagen con los mejores',
      hero_subtitulo: 'Especialistas en coloración, cortes modernos y tratamientos capilares.',
      servicios: servicios.length > 0 ? servicios.map((s, i) => ({
        titulo: s,
        descripcion: `Servicio profesional de ${s.toLowerCase()}`,
        icono: ['tijeras', 'paleta', 'corazon', 'estrella'][i % 4]
      })) : [
        { titulo: 'Corte y Estilizado', descripcion: 'Cortes personalizados según tu tipo de rostro', icono: 'tijeras' },
        { titulo: 'Coloración Profesional', descripcion: 'Tintes, mechas, balayage con productos premium', icono: 'paleta' },
        { titulo: 'Tratamientos Capilares', descripcion: 'Reparación, hidratación y nutrición', icono: 'corazon' }
      ],
      galeria_imagenes: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400'],
      sobre_nosotros_texto: webConfig.negocio?.descripcion || 'Profesionales dedicados a realzar tu belleza.',
      sobre_nosotros_imagen: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600',
      como_funciona_pasos: [
        { numero: 1, titulo: 'Elegí tu servicio', descripcion: 'Seleccioná el tratamiento que necesitás' },
        { numero: 2, titulo: 'Reservá turno', descripcion: 'Contactanos por WhatsApp' },
        { numero: 3, titulo: 'Disfrutá', descripcion: 'Vení y viví la experiencia' }
      ]
    },
    estetica: {
      hero_titulo: 'Realzá tu belleza natural',
      hero_subtitulo: 'Tratamientos faciales, corporales y manicura profesional.',
      servicios: servicios.length > 0 ? servicios.map((s, i) => ({
        titulo: s,
        descripcion: `Tratamiento especializado de ${s.toLowerCase()}`,
        icono: ['corazon', 'estrella', 'paleta', 'tijeras'][i % 4]
      })) : [
        { titulo: 'Tratamientos Faciales', descripcion: 'Limpieza, hidratación y rejuvenecimiento', icono: 'corazon' },
        { titulo: 'Manicura y Pedicura', descripcion: 'Uñas esculpidas, semipermanente, nail art', icono: 'estrella' },
        { titulo: 'Depilación', descripcion: 'Cera, laser y métodos definitivos', icono: 'paleta' },
        { titulo: 'Masajes', descripcion: 'Relajantes, descontracturantes, reductores', icono: 'tijeras' }
      ],
      galeria_imagenes: ['https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'],
      sobre_nosotros_texto: webConfig.negocio?.descripcion || 'Centro de estética dedicado a tu bienestar y belleza.',
      sobre_nosotros_imagen: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600',
      como_funciona_pasos: [
        { numero: 1, titulo: 'Consultá', descripcion: 'Contanos qué tratamiento necesitás' },
        { numero: 2, titulo: 'Reservá', descripcion: 'Agendá tu turno por WhatsApp' },
        { numero: 3, titulo: 'Relajate', descripcion: 'Disfrutá de nuestros servicios' }
      ]
    },
    odontologia: {
      hero_titulo: 'Tu sonrisa en las mejores manos',
      hero_subtitulo: 'Odontología general, estética e implantes. Atención personalizada.',
      servicios: servicios.length > 0 ? servicios.map((s, i) => ({
        titulo: s,
        descripcion: `Especialidad en ${s.toLowerCase()}`,
        icono: ['corazon', 'estrella', 'paleta', 'tijeras'][i % 4]
      })) : [
        { titulo: 'Odontología General', descripcion: 'Limpieza, empastes, extracciones', icono: 'corazon' },
        { titulo: 'Estética Dental', descripcion: 'Blanqueamiento, carillas, diseño de sonrisa', icono: 'estrella' },
        { titulo: 'Implantes', descripcion: 'Reemplazo de piezas dentales', icono: 'paleta' },
        { titulo: 'Ortodoncia', descripcion: 'Brackets, alineadores invisibles', icono: 'tijeras' }
      ],
      galeria_imagenes: ['https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400'],
      sobre_nosotros_texto: webConfig.negocio?.descripcion || 'Consultorio odontológico con tecnología de avanzada.',
      sobre_nosotros_imagen: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600',
      como_funciona_pasos: [
        { numero: 1, titulo: 'Consultá', descripcion: 'Agendá tu primera visita' },
        { numero: 2, titulo: 'Diagnóstico', descripcion: 'Evaluación sin cargo' },
        { numero: 3, titulo: 'Tratamiento', descripcion: 'Sonreí con confianza' }
      ]
    },
    ropa: {
      hero_titulo: 'Tu estilo, tu identidad',
      hero_subtitulo: 'Indumentaria de calidad con envíos a todo el país.',
      servicios: servicios.length > 0 ? servicios.map((s, i) => ({
        titulo: s,
        descripcion: `Categoría: ${s}`,
        icono: ['estrella', 'corazon', 'paleta'][i % 3]
      })) : [
        { titulo: 'Ropa de Mujer', descripcion: 'Vestidos, tops, pantalones', icono: 'estrella' },
        { titulo: 'Ropa de Hombre', descripcion: 'Remeras, camisas, jeans', icono: 'corazon' },
        { titulo: 'Accesorios', descripcion: 'Bolsos, joyas, cinturones', icono: 'paleta' }
      ],
      galeria_imagenes: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400'],
      sobre_nosotros_texto: webConfig.negocio?.descripcion || 'Tienda de moda con las últimas tendencias.',
      sobre_nosotros_imagen: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600',
      como_funciona_pasos: [
        { numero: 1, titulo: 'Elegí', descripcion: 'Seleccioná tus productos favoritos' },
        { numero: 2, titulo: 'Consultá', descripcion: 'Verificá stock por WhatsApp' },
        { numero: 3, titulo: 'Recibí', descripcion: 'Te lo llevamos a tu casa' }
      ]
    },
    gastronomia: {
      hero_titulo: 'Sabor que conquista',
      hero_subtitulo: 'Comida casera, viandas saludables y catering.',
      servicios: servicios.length > 0 ? servicios.map((s, i) => ({
        titulo: s,
        descripcion: `Preparación de ${s.toLowerCase()}`,
        icono: ['corazon', 'estrella', 'paleta'][i % 3]
      })) : [
        { titulo: 'Viandas Semanales', descripcion: 'Menú saludable y variado', icono: 'corazon' },
        { titulo: 'Catering', descripcion: 'Eventos, reuniones, fiestas', icono: 'estrella' },
        { titulo: 'Comida Casera', descripcion: 'Platos tradicionales con amor', icono: 'paleta' }
      ],
      galeria_imagenes: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400'],
      sobre_nosotros_texto: webConfig.negocio?.descripcion || 'Cocina con pasión y los mejores ingredientes.',
      sobre_nosotros_imagen: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
      como_funciona_pasos: [
        { numero: 1, titulo: 'Elegí', descripcion: 'Seleccioná tu menú' },
        { numero: 2, titulo: 'Pedí', descripcion: 'Hacé tu pedido por WhatsApp' },
        { numero: 3, titulo: 'Disfrutá', descripcion: 'Te lo llevamos a tu puerta' }
      ]
    },
    inmobiliaria: {
      hero_titulo: 'Encontrá tu lugar en el mundo',
      hero_subtitulo: 'Propiedades en venta y alquiler en San Juan.',
      servicios: servicios.length > 0 ? servicios.map((s, i) => ({
        titulo: s,
        descripcion: `Servicio de ${s.toLowerCase()}`,
        icono: ['estrella', 'corazon', 'paleta'][i % 3]
      })) : [
        { titulo: 'Ventas', descripcion: 'Casas, departamentos, terrenos', icono: 'estrella' },
        { titulo: 'Alquileres', descripcion: 'Temporarios y a largo plazo', icono: 'corazon' },
        { titulo: 'Tasaciones', descripcion: 'Valoración profesional', icono: 'paleta' }
      ],
      galeria_imagenes: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'],
      sobre_nosotros_texto: webConfig.negocio?.descripcion || 'Expertos en bienes raíces desde hace años.',
      sobre_nosotros_imagen: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
      como_funciona_pasos: [
        { numero: 1, titulo: 'Buscá', descripcion: 'Encontrá tu propiedad ideal' },
        { numero: 2, titulo: 'Consultá', descripcion: 'Contactanos por WhatsApp' },
        { numero: 3, titulo: 'Visitá', descripcion: 'Coordinamos el día y hora' }
      ]
    },
    gimnasio: {
      hero_titulo: 'Transformá tu cuerpo, transformá tu vida',
      hero_subtitulo: 'Gimnasio equipado con las mejores máquinas y profesores.',
      servicios: servicios.length > 0 ? servicios.map((s, i) => ({
        titulo: s,
        descripcion: `Actividad: ${s}`,
        icono: ['corazon', 'estrella', 'paleta'][i % 3]
      })) : [
        { titulo: 'Musculación', descripcion: 'Sala de pesas completa', icono: 'corazon' },
        { titulo: 'Clases Grupales', descripcion: 'Zumba, spinning, funcional', icono: 'estrella' },
        { titulo: 'Entrenamiento Personal', descripcion: 'Rutinas personalizadas', icono: 'paleta' }
      ],
      galeria_imagenes: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400'],
      sobre_nosotros_texto: webConfig.negocio?.descripcion || 'Tu lugar para ponerte en forma y sentirte mejor.',
      sobre_nosotros_imagen: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600',
      como_funciona_pasos: [
        { numero: 1, titulo: 'Consultá', descripcion: 'Escribinos por WhatsApp' },
        { numero: 2, titulo: 'Visitá', descripcion: 'Conocé nuestras instalaciones' },
        { numero: 3, titulo: 'Entrená', descripcion: 'Empezá tu transformación' }
      ]
    },
    veterinaria: {
      hero_titulo: 'Cuidamos a quienes amás',
      hero_subtitulo: 'Atención veterinaria integral para tu mascota.',
      servicios: servicios.length > 0 ? servicios.map((s, i) => ({
        titulo: s,
        descripcion: `Servicio de ${s.toLowerCase()}`,
        icono: ['corazon', 'estrella', 'paleta'][i % 3]
      })) : [
        { titulo: 'Consultas', descripcion: 'Atención médica general', icono: 'corazon' },
        { titulo: 'Vacunación', descripcion: 'Calendario completo', icono: 'estrella' },
        { titulo: 'Cirugías', descripcion: 'Procedimientos quirúrgicos', icono: 'paleta' }
      ],
      galeria_imagenes: ['https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400', 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400'],
      sobre_nosotros_texto: webConfig.negocio?.descripcion || 'Amor y profesionalismo para tu mascota.',
      sobre_nosotros_imagen: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600',
      como_funciona_pasos: [
        { numero: 1, titulo: 'Consultá', descripcion: 'Contanos qué necesita tu mascota' },
        { numero: 2, titulo: 'Turno', descripcion: 'Agendá la visita' },
        { numero: 3, titulo: 'Cuidado', descripcion: 'Atención profesional garantizada' }
      ]
    },
    taller: {
      hero_titulo: 'Tu vehículo en buenas manos',
      hero_subtitulo: 'Mecánica integral, service y reparaciones.',
      servicios: servicios.length > 0 ? servicios.map((s, i) => ({
        titulo: s,
        descripcion: `Servicio de ${s.toLowerCase()}`,
        icono: ['corazon', 'estrella', 'paleta'][i % 3]
      })) : [
        { titulo: 'Mecánica General', descripcion: 'Diagnóstico y reparación', icono: 'corazon' },
        { titulo: 'Service', descripcion: 'Mantenimiento preventivo', icono: 'estrella' },
        { titulo: 'Diagnóstico', descripcion: 'Escaneo computarizado', icono: 'paleta' }
      ],
      galeria_imagenes: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400', 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400'],
      sobre_nosotros_texto: webConfig.negocio?.descripcion || 'Mecánicos profesionales para tu tranquilidad.',
      sobre_nosotros_imagen: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600',
      como_funciona_pasos: [
        { numero: 1, titulo: 'Consultá', descripcion: 'Contanos el problema' },
        { numero: 2, titulo: 'Turno', descripcion: 'Traé tu vehículo' },
        { numero: 3, titulo: 'Solución', descripcion: 'Reparación garantizada' }
      ]
    },
    servicios: {
      hero_titulo: 'Soluciones para tu hogar',
      hero_subtitulo: 'Gas, electricidad, plomería y más. Rápido y confiable.',
      servicios: servicios.length > 0 ? servicios.map((s, i) => ({
        titulo: s,
        descripcion: `Servicio de ${s.toLowerCase()}`,
        icono: ['corazon', 'estrella', 'paleta'][i % 3]
      })) : [
        { titulo: 'Gas', descripcion: 'Instalación y reparación', icono: 'corazon' },
        { titulo: 'Electricidad', descripcion: 'Instalaciones y arreglos', icono: 'estrella' },
        { titulo: 'Plomería', descripcion: 'Cañerías y sanitarios', icono: 'paleta' }
      ],
      galeria_imagenes: ['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400'],
      sobre_nosotros_texto: webConfig.negocio?.descripcion || 'Técnicos certificados para tu seguridad.',
      sobre_nosotros_imagen: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600',
      como_funciona_pasos: [
        { numero: 1, titulo: 'Consultá', descripcion: 'Contanos qué necesitás' },
        { numero: 2, titulo: 'Presupuesto', descripcion: 'Te damos el mejor precio' },
        { numero: 3, titulo: 'Solución', descripcion: 'Trabajo garantizado' }
      ]
    }
  };
  
  return contenidosPorRubro[rubro] || contenidosPorRubro.peluqueria;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const plan = config.plan;

// Configuración de planes (inline para no depender de archivo externo)
const planesConfig = {
  presencia_digital: {
    nombre: 'Presencia Digital',
    secciones_obligatorias: ['hero', 'servicios', 'contacto']
  },
  ventas_automaticas: {
    nombre: 'Ventas Automáticas',
    secciones_obligatorias: ['hero', 'catalogo', 'bot', 'como_funciona']
  },
  negocio_digital_pro: {
    nombre: 'Negocio Digital Pro',
    secciones_obligatorias: ['hero', 'catalogo', 'bot', 'como_funciona', 'stock', 'reportes']
  }
};

const planConfig = planesConfig[plan] || planesConfig.presencia_digital;

console.log(`\n🚀 Generando template para: ${config.negocio.nombre}`);
console.log(`📦 Plan: ${planConfig.nombre}`);
console.log(`📁 Output: ${outputArg}\n`);

// Funciones de utilidad
const interpolate = (template, data) => {
  return template.replace(/\{\{(\w+(?:\.\w+)*)\}\}/g, (match, key) => {
    const keys = key.split('.');
    let value = data;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    return value !== undefined ? value : match;
  });
};

const toCSSVar = (hex) => hex;

// Generar HTML según el plan
const generarHTML = () => {
  switch (plan) {
    case 'presencia_digital':
      return generarPresenciaDigital();
    case 'ventas_automaticas':
      return generarVentasAutomaticas();
    case 'negocio_digital_pro':
      return generarNegocioPro();
    default:
      throw new Error(`Plan no soportado: ${plan}`);
  }
};

// TEMPLATE: PRESENCIA DIGITAL
const generarPresenciaDigital = () => {
  const c = config;
  
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${c.seo.titulo_pagina}</title>
  <meta name="description" content="${c.seo.descripcion_meta}">
  <meta name="keywords" content="${c.seo.keywords}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${c.seo.titulo_pagina}">
  <meta property="og:description" content="${c.seo.descripcion_meta}">
  <meta property="og:image" content="${c.seo.imagen_og}">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --color-primary: ${c.diseno.color_primario};
      --color-secondary: ${c.diseno.color_secundario};
      --color-accent: ${c.diseno.color_acento};
      --font-family: '${c.diseno.tipografia}', sans-serif;
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: var(--font-family);
      color: #333;
      line-height: 1.6;
    }
    
    /* Header */
    header {
      background: #fff;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }
    
    .logo img {
      height: 45px;
    }
    
    .logo-text {
      font-weight: 800;
      font-size: 1.3rem;
      color: var(--color-primary);
    }
    
    .nav-contact {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .nav-phone {
      color: #666;
      text-decoration: none;
      font-size: 0.9rem;
    }
    
    .btn-primary {
      background: var(--color-primary);
      color: white;
      padding: 12px 24px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
    }
    
    .btn-primary:hover {
      background: var(--color-secondary);
      transform: translateY(-2px);
    }
    
    /* Hero */
    .hero {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      color: white;
      padding: 100px 20px;
      text-align: center;
    }
    
    .hero h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 800;
      margin-bottom: 20px;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .hero p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto 30px;
    }
    
    /* Servicios */
    .servicios {
      padding: 80px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .section-title {
      text-align: center;
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 50px;
      color: #1a1a1a;
    }
    
    .servicios-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    
    .servicio-card {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 16px;
      text-align: center;
      transition: transform 0.3s;
    }
    
    .servicio-card:hover {
      transform: translateY(-5px);
    }
    
    .servicio-icon {
      width: 60px;
      height: 60px;
      background: var(--color-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      color: white;
      font-size: 1.5rem;
    }
    
    .servicio-card h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: #1a1a1a;
    }
    
    .servicio-card p {
      color: #666;
      font-size: 0.95rem;
    }
    
    /* Galería */
    .galeria {
      background: #f8f9fa;
      padding: 80px 20px;
    }
    
    .galeria-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .galeria-item {
      aspect-ratio: 4/3;
      border-radius: 12px;
      overflow: hidden;
    }
    
    .galeria-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
    
    .galeria-item:hover img {
      transform: scale(1.05);
    }
    
    /* Sobre Nosotros */
    .sobre-nosotros {
      padding: 80px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .sobre-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }
    
    .sobre-content h2 {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 20px;
      color: #1a1a1a;
    }
    
    .sobre-content p {
      color: #555;
      line-height: 1.8;
      font-size: 1.05rem;
    }
    
    .sobre-imagen {
      border-radius: 16px;
      overflow: hidden;
    }
    
    .sobre-imagen img {
      width: 100%;
      height: auto;
    }
    
    /* Contacto */
    .contacto {
      background: #1a1a1a;
      color: white;
      padding: 80px 20px;
    }
    
    .contacto-inner {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    
    .contacto h2 {
      font-size: 2rem;
      margin-bottom: 30px;
    }
    
    .contacto-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 30px;
      margin-bottom: 40px;
    }
    
    .contacto-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .contacto-item a {
      color: white;
      text-decoration: none;
    }
    
    /* Footer */
    footer {
      background: #111;
      color: #888;
      padding: 30px 20px;
      text-align: center;
    }
    
    /* WhatsApp Float */
    .whatsapp-float {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      background: #25D366;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-decoration: none;
      font-size: 1.8rem;
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
      transition: transform 0.3s;
      z-index: 1000;
    }
    
    .whatsapp-float:hover {
      transform: scale(1.1);
    }
    
    @media (max-width: 768px) {
      .sobre-grid {
        grid-template-columns: 1fr;
      }
      
      .nav-contact {
        display: none;
      }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header>
    <div class="header-inner">
      <a href="#" class="logo">
        <img src="${c.diseno.logo_url}" alt="${c.negocio.nombre}">
        <span class="logo-text">${c.negocio.nombre}</span>
      </a>
      <div class="nav-contact">
        <a href="tel:${c.contacto.telefono}" class="nav-phone">${c.contacto.telefono}</a>
        <a href="https://wa.me/${c.contacto.whatsapp}" class="btn-primary" target="_blank">Reservar turno</a>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="hero">
    <h1>${c.contenido.hero_titulo}</h1>
    <p>${c.contenido.hero_subtitulo}</p>
    <a href="https://wa.me/${c.contacto.whatsapp}" class="btn-primary" target="_blank" style="background: white; color: var(--color-primary);">Escribinos por WhatsApp</a>
  </section>

  <!-- Servicios -->
  <section class="servicios">
    <h2 class="section-title">Nuestros Servicios</h2>
    <div class="servicios-grid">
      ${c.contenido.servicios.map(s => `
      <div class="servicio-card">
        <div class="servicio-icon">${s.icono.charAt(0).toUpperCase()}</div>
        <h3>${s.titulo}</h3>
        <p>${s.descripcion}</p>
      </div>
      `).join('')}
    </div>
  </section>

  <!-- Galería -->
  <section class="galeria">
    <h2 class="section-title">Nuestro Trabajo</h2>
    <div class="galeria-grid">
      ${c.contenido.galeria_imagenes.map(img => `
      <div class="galeria-item">
        <img src="${img}" alt="Trabajo de ${c.negocio.nombre}">
      </div>
      `).join('')}
    </div>
  </section>

  <!-- Sobre Nosotros -->
  <section class="sobre-nosotros">
    <div class="sobre-grid">
      <div class="sobre-content">
        <h2>Sobre Nosotros</h2>
        <p>${c.contenido.sobre_nosotros_texto}</p>
      </div>
      <div class="sobre-imagen">
        <img src="${c.contenido.sobre_nosotros_imagen}" alt="Equipo de ${c.negocio.nombre}">
      </div>
    </div>
  </section>

  <!-- Contacto -->
  <section class="contacto">
    <div class="contacto-inner">
      <h2>Contactanos</h2>
      <div class="contacto-info">
        <div class="contacto-item">
          <span>📍</span>
          <span>${c.contacto.direccion}, ${c.contacto.ciudad}</span>
        </div>
        <div class="contacto-item">
          <span>📞</span>
          <a href="tel:${c.contacto.telefono}">${c.contacto.telefono}</a>
        </div>
        <div class="contacto-item">
          <span>✉️</span>
          <a href="mailto:${c.contacto.email}">${c.contacto.email}</a>
        </div>
        <div class="contacto-item">
          <span>🕐</span>
          <span>${c.contacto.horarios}</span>
        </div>
      </div>
      <a href="https://wa.me/${c.contacto.whatsapp}" class="btn-primary" target="_blank" style="font-size: 1.1rem; padding: 15px 40px;">Reservar turno por WhatsApp</a>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <p>&copy; ${new Date().getFullYear()} ${c.negocio.nombre}. Todos los derechos reservados.</p>
    <p style="margin-top: 10px; font-size: 0.85rem;">Hecho con ❤️ por Moviltec Digital</p>
  </footer>

  <!-- WhatsApp Float -->
  <a href="https://wa.me/${c.contacto.whatsapp}" class="whatsapp-float" target="_blank" title="Chatea con nosotros">
    💬
  </a>
</body>
</html>`;
};

// TEMPLATE: VENTAS AUTOMÁTICAS
const generarVentasAutomaticas = () => {
  const c = config;
  
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${c.seo.titulo_pagina}</title>
  <meta name="description" content="${c.seo.descripcion_meta}">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --color-primary: ${c.diseno.color_primario};
      --color-secondary: ${c.diseno.color_secundario};
      --color-accent: ${c.diseno.color_acento};
      --color-green: #25D366;
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Inter', sans-serif;
      background: var(--color-primary);
      color: #fff;
    }
    
    /* Header */
    header {
      background: rgba(0,0,0,0.3);
      backdrop-filter: blur(10px);
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .header-inner {
      max-width: 1400px;
      margin: 0 auto;
      padding: 15px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: 900;
      color: var(--color-secondary);
      text-decoration: none;
      letter-spacing: 2px;
    }
    
    .cart-btn {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      padding: 10px 20px;
      border-radius: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    /* Hero */
    .hero {
      text-align: center;
      padding: 100px 24px;
      background: linear-gradient(180deg, rgba(212,175,55,0.1) 0%, transparent 100%);
    }
    
    .hero h1 {
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 900;
      margin-bottom: 20px;
    }
    
    .hero h1 span {
      color: var(--color-secondary);
    }
    
    .hero p {
      font-size: 1.2rem;
      color: rgba(255,255,255,0.7);
      max-width: 600px;
      margin: 0 auto 40px;
    }
    
    .btn-whatsapp {
      background: var(--color-green);
      color: white;
      padding: 16px 32px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.3s;
    }
    
    .btn-whatsapp:hover {
      transform: translateY(-3px);
    }
    
    /* Catálogo */
    .catalogo {
      padding: 80px 24px;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .catalogo-header {
      text-align: center;
      margin-bottom: 50px;
    }
    
    .catalogo-header h2 {
      font-size: 2rem;
      margin-bottom: 10px;
    }
    
    .catalogo-header p {
      color: rgba(255,255,255,0.6);
    }
    
    .filtros {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }
    
    .filtro-btn {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      padding: 10px 24px;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .filtro-btn:hover, .filtro-btn.active {
      background: var(--color-secondary);
      border-color: var(--color-secondary);
    }
    
    .productos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }
    
    .producto-card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      overflow: hidden;
      transition: transform 0.3s;
    }
    
    .producto-card:hover {
      transform: translateY(-5px);
      border-color: var(--color-secondary);
    }
    
    .producto-img {
      aspect-ratio: 1;
      overflow: hidden;
    }
    
    .producto-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .producto-info {
      padding: 20px;
    }
    
    .producto-cat {
      font-size: 0.75rem;
      color: var(--color-secondary);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 5px;
    }
    
    .producto-nombre {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 10px;
    }
    
    .producto-precio {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    }
    
    .precio-actual {
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--color-secondary);
    }
    
    .precio-anterior {
      font-size: 0.9rem;
      text-decoration: line-through;
      color: rgba(255,255,255,0.5);
    }
    
    .btn-agregar {
      width: 100%;
      background: var(--color-green);
      color: white;
      border: none;
      padding: 12px;
      border-radius: 10px;
      font-weight: 700;
      cursor: pointer;
      transition: opacity 0.3s;
    }
    
    .btn-agregar:hover {
      opacity: 0.9;
    }
    
    /* Bot Promo */
    .bot-promo {
      background: linear-gradient(135deg, rgba(37,211,102,0.1), rgba(37,211,102,0.05));
      border: 2px solid rgba(37,211,102,0.3);
      border-radius: 20px;
      padding: 40px;
      margin: 60px 24px;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: center;
      gap: 40px;
    }
    
    .bot-icon {
      width: 100px;
      height: 100px;
      background: var(--color-green);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      flex-shrink: 0;
    }
    
    .bot-content h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
    
    .bot-content p {
      color: rgba(255,255,255,0.7);
      margin-bottom: 20px;
    }
    
    /* Cómo funciona */
    .como-funciona {
      padding: 80px 24px;
      background: rgba(0,0,0,0.3);
    }
    
    .como-funciona h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 50px;
    }
    
    .pasos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .paso {
      text-align: center;
    }
    
    .paso-num {
      width: 50px;
      height: 50px;
      background: var(--color-secondary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.3rem;
      margin: 0 auto 15px;
    }
    
    .paso h4 {
      margin-bottom: 8px;
    }
    
    .paso p {
      font-size: 0.9rem;
      color: rgba(255,255,255,0.6);
    }
    
    /* Footer */
    footer {
      background: #000;
      padding: 40px 24px;
      text-align: center;
      color: rgba(255,255,255,0.5);
    }
    
    @media (max-width: 768px) {
      .bot-promo {
        flex-direction: column;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header>
    <div class="header-inner">
      <a href="#" class="logo">${c.negocio.nombre}</a>
      <button class="cart-btn" onclick="alert('Carrito: Próximamente')">
        🛒 Carrito <span id="cart-count">(0)</span>
      </button>
    </div>
  </header>

  <!-- Hero -->
  <section class="hero">
    <h1>${c.contenido.hero_titulo}</h1>
    <p>${c.contenido.hero_subtitulo}</p>
    <a href="#catalogo" class="btn-whatsapp">Ver catálogo</a>
  </section>

  <!-- Catálogo -->
  <section class="catalogo" id="catalogo">
    <div class="catalogo-header">
      <h2>${c.catalogo.titulo}</h2>
      <p>${c.catalogo.subtitulo}</p>
    </div>
    
    <div class="filtros">
      <button class="filtro-btn active">Todo</button>
      ${c.catalogo.categorias.map(cat => `<button class="filtro-btn">${cat}</button>`).join('')}
    </div>
    
    <div class="productos-grid">
      ${c.catalogo.productos.map(p => `
      <div class="producto-card">
        <div class="producto-img">
          <img src="${p.imagen}" alt="${p.nombre}">
        </div>
        <div class="producto-info">
          <div class="producto-cat">${p.categoria}</div>
          <div class="producto-nombre">${p.nombre}</div>
          <div class="producto-precio">
            <span class="precio-actual">$${p.precio.toLocaleString()}</span>
            ${p.precio_anterior ? `<span class="precio-anterior">$${p.precio_anterior.toLocaleString()}</span>` : ''}
          </div>
          <button class="btn-agregar" onclick="window.open('https://wa.me/${c.contacto.whatsapp}?text=Hola! Quiero comprar: ${encodeURIComponent(p.nombre)}', '_blank')">
            Comprar por WhatsApp
          </button>
        </div>
      </div>
      `).join('')}
    </div>
  </section>

  <!-- Bot Promo -->
  <section class="bot-promo">
    <div class="bot-icon">🤖</div>
    <div class="bot-content">
      <h3>${c.bot.nombre_bot}</h3>
      <p>${c.bot.mensaje_bienvenida}</p>
      <a href="https://wa.me/${c.contacto.whatsapp_bot}" class="btn-whatsapp" target="_blank">Chatear con el bot</a>
    </div>
  </section>

  <!-- Cómo funciona -->
  <section class="como-funciona">
    <h2>¿Cómo comprar?</h2>
    <div class="pasos-grid">
      ${c.contenido.como_funciona_pasos.map(paso => `
      <div class="paso">
        <div class="paso-num">${paso.numero}</div>
        <h4>${paso.titulo}</h4>
        <p>${paso.descripcion}</p>
      </div>
      `).join('')}
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <p><strong>${c.negocio.nombre}</strong></p>
    <p>${c.contacto.direccion}, ${c.contacto.ciudad}</p>
    <p>${c.contacto.horarios}</p>
    <p style="margin-top: 20px;">Hecho con ❤️ por Moviltec Digital</p>
  </footer>
</body>
</html>`;
};

// TEMPLATE: NEGOCIO DIGITAL PRO
const generarNegocioPro = () => {
  // Similar a Ventas Automáticas pero con más funcionalidades
  return generarVentasAutomaticas(); // Por ahora usamos el mismo base
};

// Ejecutar generación
try {
  const html = generarHTML();
  
  // Crear carpeta de salida si no existe
  const outputPath = path.resolve(__dirname, outputArg);
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  
  // Guardar archivo HTML
  const outputFile = path.join(outputPath, 'index.html');
  fs.writeFileSync(outputFile, html);
  
  // Copiar assets si existen
  const assetsSource = path.join(__dirname, 'ejemplos', 'assets');
  const assetsDest = path.join(outputPath, 'assets');
  
  if (fs.existsSync(assetsSource)) {
    fs.cpSync(assetsSource, assetsDest, { recursive: true });
    console.log('📁 Assets copiados');
  }
  
  console.log(`\n✅ Template generado exitosamente!`);
  console.log(`📄 Archivo: ${outputFile}`);
  console.log(`\n📋 Resumen:`);
  console.log(`   • Plan: ${planConfig.nombre}`);
  console.log(`   • Cliente: ${config.negocio.nombre}`);
  console.log(`   • Rubro: ${config.negocio.rubro}`);
  console.log(`   • Secciones: ${planConfig.secciones_obligatorias.length} obligatorias`);
  
} catch (error) {
  console.error(`\n❌ Error al generar template:`, error.message);
  process.exit(1);
}

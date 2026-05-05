# Moviltec Digital - Sistema de Ventas Automáticas

## 📋 Descripción del Proyecto

Sistema completo de landing pages y demos para vender **automatización de ventas por WhatsApp** a pequeños negocios y emprendedores en Argentina.

El proyecto está diseñado para funcionar **sin costos de hosting** (Netlify gratuito) y con **tecnologías gratuitas** (HTML/CSS/JS, Google Apps Script, Google Sheets).

---

## 🏗️ Estructura del Proyecto

```
emprendimiento/
│
├── agencia/                          ← Landing técnica original
│   ├── index.html                    ← Página principal (diseño azul/violeta)
│   └── demos/                        ← Demos originales
│       ├── bot-ropa/                 ← Bot interactivo de ventas
│       │   ├── index.html
│       │   └── catalogo.html
│       ├── peluqueria/               ← Demo peluquería con formulario inteligente
│       │   ├── index.html
│       │   ├── formulario-inteligente.html
│       │   └── whatsapp-bot.js
│       ├── ropa/                     ← Demo tienda de ropa
│       ├── gastronomia/              ← Demo gastronomía/viandas
│       ├── servicios-hogar/          ← Demo gas/electricidad/plomería
│       ├── inmobiliaria/             ← Demo inmobiliaria
│       ├── gimnasio/                 ← Demo gimnasio
│       ├── veterinaria/              ← Demo veterinaria
│       ├── taller/                   ← Demo taller mecánico
│       ├── estetica/                 ← Demo estética/nails
│       ├── odontologia/              ← Demo odontología
│       └── tecnohogar/               ← Demo tecno-hogar
│
├── agencia-ventas/                   ← Landing MARKETING (NUEVA - usar esta)
│   ├── index.html                    ← Landing persuasiva para vender
│   └── demos/                        ← Copias autocontenidas para deploy
│       ├── bot-ropa/
│       ├── viandas-ventas/           ← Demo viandas Plan Ventas Automáticas
│       ├── peluqueria/
│       ├── ropa/
│       ├── gastronomia/
│       ├── servicios-hogar/
│       ├── inmobiliaria/
│       ├── gimnasio/
│       ├── veterinaria/
│       ├── taller/
│       ├── estetica/
│       └── odontologia/
│
└── demos/                            ← Demos originales (duplicados en agencia/)
    └── (mismos rubros que arriba)
```

---

## 🎯 Qué es cada parte

### 1. `agencia-ventas/` ← USAR ESTA PARA VENDER

**Propósito:** Landing page persuasiva para captar clientes.

**Características:**
- Copy orientado a resultados (más ventas, menos trabajo)
- 9 secciones: Hero, Problema, Solución, Demo, Beneficios, Planes, Rubros, Cierre
- Diseño azul/violeta gradient (`#3B82F6` → `#7C3AED`)
- 100% autocontenida (tiene sus propios demos dentro)
- Links corregidos a `./demos/`

**Deploy:** Subir carpeta completa a Netlify.

---

### 2. `agencia/` ← PROYECTO ORIGINAL

**Propósito:** Versión técnica, más informativa.

**Características:**
- Explica CÓMO funciona la tecnología
- Muestra herramientas (Netlify, Google Apps Script, etc.)
- Mismo diseño que agencia-ventas
- Demos con formularios inteligentes

**Nota:** Los demos en `agencia/demos/` tienen el **formulario inteligente** que guía al usuario paso a paso.

---

### 3. `agencia-ventas/demos/viandas-ventas/` ← DEMO ESTRELLA

**Propósito:** Mostrar el Plan "Ventas Automáticas" en acción.

**Características:**
- Catálogo interactivo de viandas (12 productos)
- Carrito de compras funcional (JS)
- Botón +/- para agregar/quitar items
- Total calculado en tiempo real
- Formulario de datos (nombre, dirección, WhatsApp)
- Registro automático en Google Sheets (vía webhook)
- Link de pago MercadoPago

**Flujo del cliente:**
1. Ve catálogo → 2. Agrega viandas → 3. Revisa carrito → 4. Completa datos → 5. Confirma → 6. Se registra en Sheets → 7. Paga por MP

---

### 4. `agencia-ventas/demos/bot-ropa/` ← BOT INTERACTIVO

**Propósito:** Simular una conversación de WhatsApp automatizada.

**Características:**
- Interfaz de chat tipo WhatsApp
- Bot guía al cliente: saludo → catálogo → talles → pago
- Catálogo de ropa con imágenes
- Selección de talle y color
- Cálculo de total
- Link de pago MercadoPago

**Flujo:**
1. "Hola! Soy el asistente virtual" → 2. Muestra catálogo → 3. Cliente elige → 4. Pregunta talle → 5. Confirma pedido → 6. Link de pago

---

## 🎨 Sistema de Diseño

### Colores
```css
--bg: #0A0A0F          (fondo principal)
--surface: #111118     (fondo secciones)
--card: #18181F        (tarjetas)
--border: #26262E      (bordes)
--blue: #3B82F6        (acento primario)
--blue2: #60A5FA       (acento claro)
--violet: #7C3AED      (acento secundario)
--grad: linear-gradient(135deg, #3B82F6, #7C3AED)
--green: #25D366       (WhatsApp, éxito)
--white: #FFFFFF
--gray: #94A3B8        (texto secundario)
```

### Tipografía
- **Font:** 'Inter', sans-serif (Google Fonts)
- **Pesos:** 400, 500, 600, 700, 800, 900

### Componentes reutilizables
- **Nav:** Sticky, blur, logo + links + CTA
- **Hero:** Gradiente radial, eyebrow pill, h1 grande, botones
- **Cards:** Fondo `--card`, borde `--border`, radius 16px
- **Botones:** Gradient azul/violeta o outline blanco
- **WA Float:** Verde #25D366, fijo abajo-derecha

---

## 🔧 Tecnologías Utilizadas

| Tecnología | Uso | Costo |
|------------|-----|-------|
| HTML/CSS/JS | Frontend | Gratis |
| Netlify | Hosting | Gratis |
| Google Apps Script | Backend/webhooks | Gratis |
| Google Sheets | Base de datos | Gratis |
| Google Calendar | Agenda turnos | Gratis |
| MercadoPago | Cobros | Sólo comisión MP |
| WhatsApp API | Notificaciones | Gratis (wa.me links) |

---

## 📱 Demos Disponibles (10 rubros)

| Rubro | Demo | Características |
|-------|------|-----------------|
| Viandas | `viandas-ventas/` | Catálogo, carrito, pedidos |
| Ropa | `ropa/` + `bot-ropa/` | Catálogo, talles, bot |
| Peluquería | `peluqueria/` | Turnos, servicios, galería |
| Servicios Hogar | `servicios-hogar/` | Presupuestos, urgencias 24h |
| Inmobiliaria | `inmobiliaria/` | Propiedades, tasación |
| Gimnasio | `gimnasio/` | Planes, horarios, clases |
| Veterinaria | `veterinaria/` | Turnos, urgencias, peluquería |
| Taller | `taller/` | Presupuestos, servicios |
| Estética | `estetica/` | Uñas, cejas, pestañas |
| Odontología | `odontologia/` | Especialidades, obras sociales |

---

## 🚀 Cómo Deployar

### Opción A: Netlify Drop (más fácil)
1. Comprimí la carpeta `agencia-ventas/` en ZIP
2. Andá a https://app.netlify.com/drop
3. Arrastrá el ZIP
4. Listo, te dan URL

### Opción B: GitHub + Netlify (recomendado)
1. Subí todo a GitHub (ya está hecho)
2. En Netlify: "New site from Git"
3. Elegí GitHub → repo `moviltecdigital/emp`
4. Base directory: `agencia-ventas`
5. Deploy

---

## 📞 Configuración Importante

### Número de WhatsApp (cambiar en todos lados)
Actual: `5492645304372`

Archivos donde aparece:
- `agencia-ventas/index.html` (líneas con `wa.me/5492645304372`)
- Todos los `index.html` de demos

### Google Apps Script (para Sheets/Calendar)
Placeholder actual: `https://script.google.com/macros/s/DEMO_ID/exec`

Para activar:
1. Crear Google Apps Script
2. Publicar como Web App
3. Reemplazar `DEMO_ID` con tu ID real

### MercadoPago
Placeholder: `https://www.mercadopago.com.ar`

Para activar:
1. Crear cuenta MercadoPago
2. Generar link de pago
3. Reemplazar en botones

---

## 🎓 Cómo funciona el sistema

### Plan 1: Presencia Digital ($15.000/mes)
- Landing page informativa
- Botón WhatsApp directo
- Formulario de contacto
- Link de pago estático

### Plan 2: Ventas Automáticas ($35.000/mes)
- Todo lo anterior +
- Bot de ventas interactivo
- Catálogo con carrito
- Respuestas automáticas 24/7
- Registro en Google Sheets

### Plan 3: Negocio Digital Pro ($55.000/mes)
- Todo lo anterior +
- Stock en tiempo real
- Google Calendar integrado
- Notificaciones automáticas
- Reportes de ventas

---

## 📝 Para editar con otra IA

Si usás ChatGPT, Claude u otra IA:

1. **Subí el archivo** `index.html` completo
2. **Decile:** "Editá este archivo de landing page. Mantené el diseño exacto (colores, fuentes, estructura) y cambiá solo el texto que te indico."
3. **Para demos:** Subí el `index.html` de la demo específica

### Prompts útiles:
```
"Cambiá el nombre del negocio de 'Sabores de Casa' a '[NUEVO NOMBRE]' en toda la página, manteniendo el diseño exacto."

"Agregá 3 productos más al catálogo, con el mismo estilo de las cards existentes."

"Cambiá el número de WhatsApp de 5492645304372 a [NUEVO NUMERO] en todos los links."
```

---

## ⚠️ Notas importantes

1. **Todo es estático:** No usa React, Vue ni frameworks. Puro HTML/CSS/JS.
2. **Imágenes:** Usan emojis (🍲👕💇) y gradients, no hay imágenes externas.
3. **Fuentes:** Se cargan de Google Fonts (requiere internet).
4. **Responsive:** Todo está hecho mobile-first.
5. **Git:** El repo está en https://github.com/moviltecdigital/emp

---

## 📂 Archivos clave

| Archivo | Propósito |
|---------|-----------|
| `agencia-ventas/index.html` | Landing principal para vender |
| `agencia-ventas/demos/viandas-ventas/index.html` | Demo con carrito funcional |
| `agencia-ventas/demos/bot-ropa/index.html` | Demo bot interactivo |
| `agencia/index.html` | Landing técnica original |
| `agencia/demos/peluqueria/index.html` | Demo con formulario inteligente |

---

## 💰 Costos del proyecto

| Concepto | Costo |
|----------|-------|
| Desarrollo | $0 (hecho con IA) |
| Hosting (Netlify) | $0 |
| Dominio (opcional) | ~$10/año |
| Google Workspace | $0 (cuenta personal) |
| MercadoPago | Sólo comisión por venta (~6%) |
| **TOTAL MENSUAL** | **$0** |

---

## 🎯 Próximos pasos sugeridos

1. ✅ Probar demos en Netlify
2. ✅ Crear Google Apps Script real
3. ✅ Configurar cuenta MercadoPago
4. ✅ Comprar dominio propio
5. ✅ Hacer 3 demos por plan (Presencia/Ventas/Pro) para cada rubro
6. ✅ Crear videos de demostración

---

**Creado por:** Moviltec Digital  
**Ubicación:** San Juan, Argentina  
**Contacto:** +54 9 264 530-4372  
**Repositorio:** https://github.com/moviltecdigital/emp

# 📱 Sistema de Comunicación - Flujo de Clientes

## Tu número: 2645304372

---

## FLUJO 1: Cliente potencial quiere info de Moviltec

### Cómo te encuentra el cliente:
1. Ve tu landing `moviltecdigital.com.ar`
2. Ve los demos (peluquería, estética, etc.)
3. Quiere contratar tus servicios

### Cómo te contacta:
**Opción A: WhatsApp directo (recomendada)**
- Click en botón de WhatsApp de tu web
- Te llega mensaje pre-escrito: "Hola! Vi Moviltec Digital y quiero consultar..."

**Opción B: Formulario de contacto**
- Llena formulario en tu web
- Te llega email a `moviltecdigital@gmail.com`

### Tu respuesta (plantilla):
```
¡Hola! Gracias por contactarte con Moviltec Digital 🚀

Te cuento cómo trabajamos:

📦 PACKS DISPONIBLES:
• Presencia Digital - $15.000/mes
  (Landing page + WhatsApp + Formulario)
  
• Ventas Automáticas - $35.000/mes  
  (Todo lo anterior + Catálogo + Carrito)
  
• Negocio Digital Pro - $55.000/mes
  (Todo lo anterior + Reservas + Reportes)

✅ INCLUYE:
• 30 días de prueba GRATIS
• Dominio .com.ar incluido el primer año
• Hosting en Netlify (sin costo extra)
• Soporte técnico

🎨 ELEGÍ TU DISEÑO:
Visitá: moviltecdigital.com.ar/demos/
Ahí ves todos los diseños disponibles.

¿Qué pack te interesa? ¿Tenés un diseño preferido?
```

---

## FLUJO 2: Cliente aceptó y te debe enviar sus datos

### Opción recomendada: Formulario de Google Forms

Creá un Google Form con estos campos:

**Link del form:** `forms.google.com/...` (lo creás vos)

**Campos del formulario:**
1. Nombre del negocio *
2. Slogan o frase principal
3. Descripción del negocio (qué hacés, desde cuándo)
4. Rubro (Peluquería/Estética/Odontología/etc.) *
5. WhatsApp de contacto (para sus clientes) *
6. Email
7. Dirección física
8. Ciudad
9. Horarios de atención
10. Servicios que ofrecés (nombre y precio de cada uno)
11. Elegí el diseño que te gusta (dropdown con opciones)
12. Pack que querés contratar (Presencia/Ventas/Pro) *
13. Tenés dominio propio? (Sí/No)
14. Fotos para la galería (subir archivos o links)

### Ventajas de Google Forms:
- ✅ Gratis
- ✅ Te llega email automático cuando completan
- ✅ Datos organizados en spreadsheet
- ✅ Cliente puede editar su respuesta
- ✅ Puede subir fotos

---

## FLUJO 3: Bot de WhatsApp (alternativa avanzada)

Si querés algo más automatizado, podemos crear un bot simple:

### Cómo funciona:
1. Cliente escribe "Hola" a tu WhatsApp (2645304372)
2. Bot responde automáticamente:
```
¡Bienvenido a Moviltec Digital! 🚀

¿Querés crear tu web profesional?

Respondé con el número de opción:

1️⃣ Ver packs y precios
2️⃣ Ver diseños disponibles  
3️⃣ Comenzar mi web (me pedirá datos)
4️⃣ Hablar con un humano
```

3. Si elige opción 3, el bot le pide los datos uno por uno
4. Vos recibís los datos completos por email

### Costo del bot:
- Twilio: ~$1 USD/mes
- Hosting: Gratis (Netlify)
- Total: ~$1.500 ARS/mes

---

## 📋 RESUMEN: Qué sistema usar

| Situación | Método recomendado |
|-----------|-------------------|
| Cliente quiere info general | WhatsApp directo de tu web |
| Cliente quiere empezar | Google Forms |
| Muchos clientes (escala) | Bot de WhatsApp |

---

## 🛠️ CONFIGURACIÓN RÁPIDA

### Paso 1: Crear Google Form (5 minutos)
1. Andá a forms.google.com
2. Creá formulario "Nuevo Cliente Moviltec"
3. Agregá los campos de arriba
4. Configurá respuesta por email
5. Copiá el link

### Paso 2: Agregar link a tu web
En tu landing `agencia/index.html`, agregá:
```html
<a href="https://forms.google.com/tu-link" class="btn-primary">
  Comenzar mi web →
</a>
```

### Paso 3: Probar
1. Completá el form vos mismo
2. Verificá que te llegue el email
3. Listo

---

## 💡 EJEMPLO DE CONVERSACIÓN

**Cliente:** "Hola, vi tu web y quiero una para mi peluquería"

**Vos:** "¡Hola! 🎉 Perfecto, te paso el formulario para que me cuentes sobre tu negocio y elijas el diseño que más te guste. En 24-48hs tenés tu web online."

[Link al Google Form]

**Cliente:** (Completa el form)

**Vos:** (Recibís email con todos los datos)

```
Nuevo cliente: Peluquería María
Pack: Ventas ($35.000/mes)
Demo elegido: peluqueria
Datos: [todos los campos del form]
```

**Vos:** (Ejecutás generador)
```bash
node generar.js peluqueria peluqueria-maria ventas
```

**Vos:** (Subís a Netlify y pasás link)
"¡Listo! Tu web está online: https://peluqueria-maria-123.netlify.app"

---

**¿Querés que configuremos el Google Form o preferís el bot de WhatsApp?**
# ✅ SISTEMA COMPLETO Y FUNCIONANDO

## 📱 Números de WhatsApp configurados

### Tu número (Moviltec): 2645304372
- Está en tu web: `agencia/index.html`
- Clientes te contactan a vos para contratar
- Ejemplo: `wa.me/5492645304372`

### Número del cliente: Variable
- Se carga desde el archivo JSON
- Se reemplaza automáticamente en el sitio generado
- Ejemplo: `wa.me/5492644123456` (Peluquería María)

---

## 🔄 FLUJO COMPLETO DE TRABAJO

### PASO 1: Cliente potencial te contacta
**Cómo:** A través de tu web `moviltecdigital.com.ar`

**Botones que ven:**
- "Consultar por WhatsApp" → Te llega mensaje a tu 2645304372
- "Ver demos" → Ven los diseños disponibles

**Tu mensaje de bienvenida:**
```
¡Hola! 🚀 Gracias por contactarte con Moviltec Digital.

Te cuento los packs:
• Presencia Digital - $15.000/mes
• Ventas Automáticas - $35.000/mes
• Negocio Digital Pro - $55.000/mes

¿Querés ver los diseños? 👉 moviltecdigital.com.ar/demos/

¿Cuál te interesa?
```

---

### PASO 2: Cliente elige y te pasa datos
**Opción A: WhatsApp (simple)**
Le pedís los datos por mensaje:
```
Perfecto! Para crear tu web necesito:

1️⃣ Nombre del negocio
2️⃣ Slogan o frase
3️⃣ Descripción (qué hacés)
4️⃣ Tu WhatsApp (para que te contacten tus clientes)
5️⃣ Dirección y ciudad
6️⃣ Horarios de atención
7️⃣ Lista de servicios con precios
8️⃣ Qué diseño te gustó (peluquería, estética, etc.)
9️⃣ Qué pack querés (Presencia/Ventas/Pro)
```

**Opción B: Google Forms (más profesional)**
Creás un formulario con esos campos y le pasás el link.

---

### PASO 3: Vos creás el archivo JSON

Creás archivo: `clientes-config/nombre-del-cliente.json`

```json
{
  "plan": "ventas",
  "negocio": {
    "nombre": "Peluquería María",
    "slogan": "Tu look, nuestra pasión",
    "descripcion": "Peluquería familiar con 10 años de experiencia",
    "rubro": "peluqueria"
  },
  "contacto": {
    "whatsapp": "2644123456",
    "email": "maria@gmail.com",
    "direccion": "Av. Libertador 567",
    "ciudad": "San Juan",
    "horarios": "Lun a Sáb: 9:00 - 20:00"
  },
  "servicios": [
    {
      "nombre": "Corte Femenino",
      "descripcion": "Corte con lavado y styling",
      "precio": 3500,
      "duracion": "45 min"
    }
  ]
}
```

---

### PASO 4: Generás el sitio

```bash
node generar.js peluqueria peluqueria-maria ventas
```

**Esto hace:**
1. Toma el demo de peluquería
2. Reemplaza "Studio Noir" → "Peluquería María"
3. Reemplaza WhatsApp del demo → 2644123456 (del cliente)
4. Adapta según el plan (Ventas = con precios)
5. Guarda en `clientes/peluqueria-maria-peluqueria/`

---

### PASO 5: Subís a Netlify

```bash
cd clientes/peluqueria-maria-peluqueria
netlify deploy --prod
```

O lo subís manualmente arrastrando la carpeta a netlify.com

---

### PASO 6: Entregás al cliente

Le pasás el link:
```
¡Listo! 🎉 Tu web está online:

https://peluqueria-maria-abc123.netlify.app

¿Te gusta? Si querés cambiar algo me avisás.

💰 Primer pago: $35.000 (pack Ventas)
📅 Mensualidad: $35.000/mes (hosting + soporte)
```

---

## 🎯 RESUMEN DE COMUNICACIÓN

| Quién | WhatsApp | Para qué |
|-------|----------|----------|
| **Vos** | 2645304372 | Clientes te contactan para contratar Moviltec |
| **Cliente** | Variable (su número) | Sus clientes contactan a él desde su web |

---

## 💰 COBROS

**Al inicio:**
- Primer mes: $15.000 / $35.000 / $55.000 (según pack)
- Se cobra al entregar la web

**Mensual:**
- Mismo monto cada mes
- Incluye hosting + soporte + mantenimiento
- Se cobra el 1ro de cada mes

---

## ✅ VERIFICACIÓN FINAL

Ya probamos y funciona:
- ✅ Generador crea sitios
- ✅ Reemplaza nombre del negocio
- ✅ Reemplaza WhatsApp del cliente
- ✅ Adapta según plan (Presencia/Ventas/Pro)

**Archivos clave:**
- `generar.js` - Script generador
- `clientes-config/` - Datos de clientes
- `clientes/` - Sitios generados
- `demos/` - Diseños base

---

**¿Te quedó claro el flujo? ¿Querés que hagamos otra prueba o ajustemos algo?**
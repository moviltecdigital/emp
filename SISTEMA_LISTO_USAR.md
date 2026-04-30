# ✅ SISTEMA FUNCIONANDO - Guía de Uso

## 🎉 ¡El generador está listo y funcionando!

### ¿Qué se creó?

1. **`generar.js`** - Script simple para generar sitios
2. **`clientes-config/`** - Carpeta para datos de clientes
3. **`clientes/`** - Carpeta donde se guardan los sitios generados

---

## 🧪 CÓMO PROBARLO AHORA (3 pasos)

### Paso 1: Abrir el demo original
Abrir en navegador: `demos/peluqueria/index.html`
- Este es el diseño base
- Se llama "Studio Noir"

### Paso 2: Generar el sitio del cliente
Abrir PowerShell en `emprendimiento` y ejecutar:

```bash
node generar.js peluqueria ejemplo-peluqueria presencia
```

### Paso 3: Ver el resultado
Abrir en navegador: `clientes/ejemplo-peluqueria-peluqueria/index.html`

**Deberías ver:**
- ✅ El mismo diseño del demo
- ✅ Pero con nombre "Studio Elegance" (del archivo JSON)
- ✅ Con el slogan "Tu belleza, nuestra pasión"
- ✅ Precios cambiados a "Consultar" (porque es plan Presencia)

---

## 📋 FLUJO REAL CON UN CLIENTE

### 1. Cliente te contacta
Te dice: "Quiero una web como la de peluquería que mostrás"

### 2. Le pedís los datos
- Nombre del negocio
- Slogan
- WhatsApp
- Dirección
- Lista de servicios con precios
- Fotos para la galería

### 3. Creás el archivo JSON
Crear archivo: `clientes-config/nombre-del-cliente.json`

Con esta estructura:
```json
{
  "plan": "ventas",
  "negocio": {
    "nombre": "Nombre del Local",
    "slogan": "Frase llamativa",
    "descripcion": "Descripción del negocio"
  },
  "contacto": {
    "whatsapp": "2645304372",
    "email": "contacto@email.com",
    "direccion": "Av. Siempre Viva 123",
    "ciudad": "San Juan"
  },
  "servicios": [
    {
      "nombre": "Corte Femenino",
      "descripcion": "Incluye lavado y styling",
      "precio": 4500,
      "duracion": "45 min"
    }
  ]
}
```

### 4. Generás el sitio
```bash
node generar.js peluqueria nombre-del-cliente ventas
```

### 5. Subís a Netlify
```bash
cd clientes/nombre-del-cliente-peluqueria
netlify deploy --prod
```

### 6. Le pasás el link al cliente
Listo, el cliente ve su sitio online.

---

## 💰 PRECIOS Y PLANES

| Plan | Comando | Qué incluye | Precio |
|------|---------|-------------|--------|
| **Presencia** | `presencia` | Info básica, sin precios | $15.000/mes |
| **Ventas** | `ventas` | Con precios y catálogo | $35.000/mes |
| **Pro** | `pro` | Con reservas online | $55.000/mes |

---

## 🎨 DEMOS DISPONIBLES

Demo | Rubro | Comando
-----|-------|--------
`peluqueria` | Belleza | `node generar.js peluqueria cliente presencia`
`estetica` | Belleza | `node generar.js estetica cliente presencia`
`odontologia` | Salud | `node generar.js odontologia cliente presencia`
`gastronomia` | Alimentos | `node generar.js gastronomia cliente presencia`
`ropa` | Retail | `node generar.js ropa cliente presencia`
`inmobiliaria` | Bienes raíces | `node generar.js inmobiliaria cliente presencia`
`gimnasio` | Fitness | `node generar.js gimnasio cliente presencia`
`veterinaria` | Mascotas | `node generar.js veterinaria cliente presencia`
`taller` | Automotriz | `node generar.js taller cliente presencia`
`servicios-hogar` | Servicios | `node generar.js servicios-hogar cliente presencia`

---

## ⚠️ IMPORTANTE: Limitaciones actuales

El generador actual hace:
- ✅ Cambia nombre, slogan, WhatsApp
- ✅ Oculta/muestra precios según plan
- ✅ Mantiene el diseño del demo

El generador NO hace (todavía):
- ❌ No cambia automáticamente todos los servicios del demo
- ❌ No cambia las imágenes de la galería
- ❌ No cambia los testimonios

**Para esos cambios hay que editar manualmente el HTML generado.**

---

## 🔧 EDICIÓN MANUAL (si el generador no alcanza)

Si necesitás cambiar algo que el generador no hace:

1. Abrí el archivo generado: `clientes/[nombre]/index.html`
2. Buscá el texto que querés cambiar (Ctrl+F)
3. Reemplazalo
4. Guardá

Ejemplo: Cambiar un servicio
- Buscar: `Corte femenino`
- Reemplazar: `Corte y peinado`

---

## 📞 RESUMEN PARA EL CLIENTE

**Lo que el cliente ve:**
1. Tu web con los demos
2. Elige el diseño que le gusta
3. Te pasa sus datos
4. Recibe su sitio online en 24-48hs

**Lo que vos hacés:**
1. Recibís los datos
2. Creás el JSON (5 min)
3. Ejecutás el generador (10 seg)
4. Subís a Netlify (5 min)
5. Cobrás 💰

---

## ❓ PREGUNTAS FRECUENTES

**¿Puedo usar cualquier demo?**
Sí, los 10 demos están disponibles.

**¿El cliente puede pedir cambios de diseño?**
Sí, pero eso es "retoque" y tiene costo extra ($5.000-$15.000).

**¿Puedo cambiar los colores del demo?**
Sí, editando el CSS manualmente.

**¿Cuánto tarda en generarse un sitio?**
10 segundos. Lo lento es subirlo a Netlify (5 min).

---

**¿Te quedó claro el procedimiento? ¿Querés que hagamos otra prueba con otro demo?**
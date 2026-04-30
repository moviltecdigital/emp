# Guía Paso a Paso - Sistema de Plantillas

## ESTRUCTURA REAL DEL SISTEMA

```
emprendimiento/
├── demos/                          ← ESTOS SON LOS DISEÑOS BASE
│   ├── peluqueria/index.html      ← Demo de peluquería (ya existe)
│   ├── estetica/index.html        ← Demo de estética (ya existe)
│   ├── odontologia/index.html     ← Demo de odontología (ya existe)
│   └── ... (10 demos en total)
│
├── templates/                      ← PLANTILLAS GENERADAS
│   └── (acá van las 3 versiones de cada demo)
│
├── clientes-config/               ← DATOS DE CADA CLIENTE
│   └── nombre-cliente.json        ← Configuración del cliente
│
└── clientes/                      ← SITIOS FINALES LISTOS
    └── nombre-negocio/
        └── index.html             ← Sitio generado
```

## PASO 1: CÓMO FUNCIONA (Teoría)

1. **Demo base**: Es el diseño visual profesional (ej: `demos/peluqueria/`)
2. **Variables**: Dentro del demo hay textos que se pueden cambiar:
   - "Studio Noir" → nombre del cliente
   - "2645304372" → WhatsApp del cliente
   - "Av. Libertador 1234" → dirección del cliente
3. **3 Planes**: Cada demo tiene 3 versiones:
   - **Presencia**: Solo información básica (sin precios, sin catálogo)
   - **Ventas**: Con precios y catálogo de productos
   - **Pro**: Con sistema de reservas online

## PASO 2: PROBAR EL SISTEMA AHORA

### A) Ver el demo base (lo que el cliente vería)

1. Abrí el archivo: `demos/peluqueria/index.html` en tu navegador
2. Eso es el "demo" - el diseño base
3. Imaginate que eso es lo que se le vende al cliente

### B) Crear datos de un cliente de prueba

Ya creé uno: `clientes-config/ejemplo-peluqueria.json`

Abrilo y vas a ver:
```json
{
  "negocio": {
    "nombre": "Studio Elegance",
    "slogan": "Tu belleza, nuestra pasión",
    ...
  },
  "contacto": {
    "whatsapp": "2645304372",
    "email": "info@studioelegance.com",
    ...
  }
}
```

### C) Generar el sitio del cliente

Abrí PowerShell en la carpeta `emprendimiento` y ejecutá:

```bash
node templates/generador-plantillas.js --demo=peluqueria --cliente=ejemplo-peluqueria --output=clientes/prueba-studio --plan=presencia
```

Esto va a:
1. Tomar el demo de peluquería
2. Usar los datos del archivo ejemplo-peluqueria.json
3. Generar la versión "presencia" (la más básica)
4. Guardar en `clientes/prueba-studio/index.html`

### D) Ver el resultado

Abrí `clientes/prueba-studio/index.html` en el navegador.

¿Qué deberías ver?
- El mismo diseño del demo de peluquería
- Pero con los datos del cliente (Studio Elegance, etc.)

## PASO 3: FLUJO REAL CON UN CLIENTE

### Para el cliente:
1. Entra a tu web `moviltecdigital.com.ar`
2. Ve los demos (ej: peluqueria, estetica, etc.)
3. Elige el que le gusta
4. Te contacta por WhatsApp
5. Te pasa sus datos: nombre, dirección, WhatsApp, servicios, etc.

### Para vos:
1. Recibís los datos del cliente
2. Creás un archivo JSON con esos datos
3. Ejecutás el generador con el plan que contrató
4. Subís el resultado a Netlify
5. Le pasás el link al cliente

## PASO 4: ARCHIVO DE CONFIGURACIÓN DEL CLIENTE

El archivo `clientes-config/[nombre].json` tiene esta estructura:

```json
{
  "plan": "ventas",                    // presencia | ventas | pro
  
  "negocio": {
    "nombre": "Nombre del Local",      // Nombre que aparece en el sitio
    "slogan": "Frase llamativa",       // Slogan del hero
    "descripcion": "Texto descripción", // Descripción del negocio
    "rubro": "peluqueria",             // Para SEO
    "año_fundacion": 2019              // Para mostrar experiencia
  },
  
  "contacto": {
    "whatsapp": "2645304372",          // Número para WhatsApp
    "email": "contacto@email.com",     // Email de contacto
    "direccion": "Av. Siempre Viva 123", // Dirección física
    "ciudad": "San Juan",              // Ciudad
    "horarios": "Lun a Vie 9-18hs"     // Horarios de atención
  },
  
  "servicios": [                       // Lista de servicios
    {
      "nombre": "Corte Femenino",
      "descripcion": "Incluye lavado y styling",
      "precio": 4500,                   // Solo para plan ventas/pro
      "duracion": "45 min"              // Solo para plan ventas/pro
    }
  ],
  
  "diseno": {
    "color_primario": "#C9A84C"        // Color principal del sitio
  }
}
```

## PASO 5: COMANDOS DEL GENERADOR

### Generar versión Presencia ($15.000):
```bash
node templates/generador-plantillas.js --demo=peluqueria --cliente=mi-cliente --output=clientes/mi-cliente --plan=presencia
```

### Generar versión Ventas ($35.000):
```bash
node templates/generador-plantillas.js --demo=peluqueria --cliente=mi-cliente --output=clientes/mi-cliente --plan=ventas
```

### Generar versión Pro ($55.000):
```bash
node templates/generador-plantillas.js --demo=peluqueria --cliente=mi-cliente --output=clientes/mi-cliente --plan=pro
```

## ¿QUÉ PASA SI NO FUNCIONA?

Si el generador no funciona, hay una alternativa manual:

1. Abrí el demo base (`demos/peluqueria/index.html`)
2. Buscá y reemplazá manualmente:
   - "Studio Noir" → nombre del cliente
   - "2645304372" → WhatsApp del cliente
   - etc.
3. Guardá como nuevo archivo

Esto es más lento pero funciona igual.

## RESUMEN

| Paso | Acción | Resultado |
|------|--------|-----------|
| 1 | Cliente elige un demo | Sabe qué diseño va a tener |
| 2 | Cliente te pasa datos | Tenés la info para el JSON |
| 3 | Creás el archivo JSON | Datos estructurados |
| 4 | Ejecutás generador | Sitio listo en segundos |
| 5 | Subís a Netlify | Cliente ve su sitio online |

¿Querés que hagamos una prueba en vivo ahora?
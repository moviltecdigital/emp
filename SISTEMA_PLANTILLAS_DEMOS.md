# 🎯 Sistema de Plantillas Basado en Demos

## Concepto

**Cada demo = 3 plantillas (Presencia/Ventas/Pro)**

Los demos ya están diseñados profesionalmente. Lo que se vende al cliente es:
- El **diseño visual** del demo (que ya está probado y es atractivo)
- Las **funcionalidades** según el plan contratado
- Los **datos del cliente** reemplazados (nombre, logo, dirección, WhatsApp, etc.)

## Estructura del Sistema

```
emprendimiento/
├── demos/                          # Demos originales (diseño profesional)
│   ├── peluqueria/
│   │   └── index.html             # Demo base
│   ├── estetica/
│   ├── odontologia/
│   └── ... (10 demos)
│
├── templates/
│   └── generador-plantillas.js    # Script que genera 3 versiones por demo
│
├── clientes-config/               # Configuraciones de cada cliente
│   ├── ejemplo-peluqueria.json
│   └── cliente-real.json
│
└── clientes/                      # Sitios generados listos para subir
    ├── peluqueria-maria/
    │   └── index.html
    └── estetica-laura/
```

## Planes y Qué Incluye Cada Uno

### PLAN PRESENCIA - $15.000/mes
**Incluye:**
- ✅ Hero section con imagen de fondo
- ✅ Galería de trabajos (4-8 imágenes)
- ✅ Servicios básicos (nombre + descripción)
- ✅ Botón WhatsApp flotante
- ✅ Formulario de contacto simple
- ✅ Footer con datos básicos

**NO incluye:**
- ❌ Precios en servicios
- ❌ Catálogo de productos
- ❌ Carrito de compras
- ❌ Sistema de reservas con fecha/hora
- ❌ Panel de administración

---

### PLAN VENTAS - $35.000/mes
**Incluye todo lo de Presencia PLUS:**
- ✅ Servicios con precios y duración
- ✅ Catálogo de productos (si aplica)
- ✅ Carrito de compras funcional
- ✅ Checkout por WhatsApp
- ✅ Botón "Reservar" en cada servicio
- ✅ Filtros de categorías

**NO incluye:**
- ❌ Sistema de reservas con calendario
- ❌ Stock en tiempo real
- ❌ Panel de pedidos
- ❌ Reportes automáticos

---

### PLAN PRO - $55.000/mes
**Incluye todo lo de Ventas PLUS:**
- ✅ Sistema de reservas online con calendario
- ✅ Selector de fecha y hora
- ✅ Formulario de reservas completo
- ✅ Estadísticas en tiempo real
- ✅ Recordatorios automáticos
- ✅ Múltiples secciones avanzadas
- ✅ Soporte prioritario 24/7

## Formato del Archivo de Cliente (JSON)

```json
{
  "plan": "ventas",              // presencia | ventas | pro
  "negocio": {
    "nombre": "Studio Elegance",
    "slogan": "Tu belleza, nuestra pasión",
    "descripcion": "Peluquería premium...",
    "rubro": "peluqueria",
    "año_fundacion": 2019,
    "años_experiencia": 5
  },
  "contacto": {
    "whatsapp": "2645304372",
    "email": "info@ejemplo.com",
    "direccion": "Av. Libertador 1234",
    "ciudad": "San Juan",
    "horarios": "Lun a Vie: 9:00 - 20:00"
  },
  "diseno": {
    "color_primario": "#C9A84C",
    "color_secundario": "#E8C96A"
  },
  "servicios": [
    {
      "nombre": "Corte Femenino",
      "descripcion": "Corte con lavado y styling",
      "precio": 4500,
      "duracion": "45 min"
    }
  ],
  "galeria": [
    {
      "imagen": "https://...",
      "titulo": "Trabajo realizado"
    }
  ],
  "testimonios": [
    {
      "nombre": "María G.",
      "texto": "Excelente servicio!",
      "estrellas": 5
    }
  ]
}
```

## Cómo Generar un Sitio

### Paso 1: Crear archivo de configuración del cliente
Crear `clientes-config/nombre-cliente.json` con los datos.

### Paso 2: Ejecutar el generador

```bash
# Versión Presencia (básica)
node templates/generador-plantillas.js \
  --demo=peluqueria \
  --cliente=nombre-cliente \
  --output=clientes/nombre-negocio \
  --plan=presencia

# Versión Ventas (con catálogo)
node templates/generador-plantillas.js \
  --demo=estetica \
  --cliente=nombre-cliente \
  --output=clientes/nombre-negocio \
  --plan=ventas

# Versión Pro (con reservas)
node templates/generador-plantillas.js \
  --demo=odontologia \
  --cliente=nombre-cliente \
  --output=clientes/nombre-negocio \
  --plan=pro
```

### Paso 3: Subir a Netlify
```bash
cd clientes/nombre-negocio
netlify deploy --prod
```

## Demos Disponibles y Sus Rubros

| Demo | Rubro | Ideal para |
|------|-------|------------|
| `peluqueria` | Belleza | Peluquerías, barberías |
| `estetica` | Belleza | Centros de estética, nails, spa |
| `odontologia` | Salud | Dentistas, consultorios médicos |
| `gastronomia` | Alimentos | Restaurantes, viandas, catering |
| `ropa` | Retail | Tiendas de ropa, indumentaria |
| `inmobiliaria` | Bienes raíces | Inmobiliarias, corredores |
| `gimnasio` | Fitness | Gimnasios, entrenadores |
| `veterinaria` | Mascotas | Veterinarias, pet shops |
| `taller` | Automotriz | Talleres mecánicos |
| `servicios-hogar` | Servicios | Gas, electricidad, plomería |

## Política de "Retoques"

**Incluido en el plan:**
- Cambio de colores (usando el color primario del cliente)
- Reemplazo de textos (nombre, dirección, WhatsApp, etc.)
- Agregar/eliminar servicios de la lista
- Cambiar imágenes de la galería
- Ajustar precios

**COSTO EXTRA (fuera del plan):**
- Cambiar diseño de secciones existentes
- Agregar nuevas secciones no incluidas en el demo
- Modificar estructura del HTML/CSS
- Funcionalidades custom no previstas
- Integraciones con sistemas externos

**Tarifa sugerida para retoques:** $5.000 - $15.000 por modificación según complejidad.

## Ventajas de Este Sistema

1. **Diseño probado**: Los demos ya están visualmente atractivos
2. **Rápido**: Generar un sitio toma minutos, no horas
3. **Consistente**: Todos los clientes del mismo rubro tienen calidad similar
4. **Escalable**: Podés agregar más demos sin modificar el generador
5. **Profitable**: Retoques = ingresos extras

## Flujo de Trabajo Recomendado

1. **Captación**: Cliente ve tu landing principal
2. **Demo**: Mostrás el demo correspondiente a su rubro
3. **Cierre**: Cliente elige plan y paga
4. **Configuración**: Completás el JSON con sus datos
5. **Generación**: Ejecutás el script con el plan elegido
6. **Entrega**: Subís a Netlify y configurás dominio (si tiene)
7. **Mantenimiento**: Cobrás mensualidad + retoques si los pide

¿Te parece bien este enfoque? ¿Querés que ajuste algo?
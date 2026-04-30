# 🚀 Sistema de Generación Automática de Landing Pages

## ¿Cómo funciona?

### Opción 1: Formulario Web (Recomendado para clientes)

1. **Accedé al generador**: Abrí `generador/index.html` en tu navegador
2. **Completá los 4 pasos**:
   - Paso 1: Elegí el plan (Presencia $15K, Ventas $35K, Pro $55K)
   - Paso 2: Datos del negocio (nombre, descripción, rubro)
   - Paso 3: Contacto y color de marca
   - Paso 4: Servicios que ofrece
3. **Descargá el sitio**: El sistema genera automáticamente un archivo `index.html` listo para subir a Netlify

### Opción 2: Node.js (Para desarrolladores)

```bash
# Desde la carpeta templates/
node generador.js --cliente=cliente-presencia-ejemplo --output=../clientes/mi-sitio

# O con JSON directo:
node generador.js --json='{"plan":"presencia","negocio":{"nombre":"Mi Negocio"}}' --output=./mi-sitio
```

## Estructura del Proyecto

```
emprendimiento/
├── agencia/
│   └── index.html              # Tu landing page de ventas
├── generador/
│   └── index.html              # Formulario web para clientes
├── templates/
│   ├── generador.js            # Compilador Node.js
│   ├── estructura-configuracion.json
│   └── ejemplos/
│       ├── cliente-presencia-ejemplo.json
│       └── cliente-ventas-ejemplo.json
└── demos/                      # Demos para mostrar a clientes
    ├── ropa/
    ├── peluqueria/
    ├── gastronomia/
    ├── inmobiliaria/
    ├── servicios-hogar/
    ├── gimnasio/
    ├── veterinaria/
    ├── taller/
    ├── estetica/               # ✅ NUEVO
    └── odontologia/            # ✅ NUEVO
```

## Demos Disponibles

| Rubro | Demo | Características |
|-------|------|-----------------|
| Ropa | `demos/ropa/` | Catálogo, carrito, bot de ventas |
| Peluquería | `demos/peluqueria/` | Servicios, galería, turnos |
| Gastronomía | `demos/gastronomia/` | Menú, viandas, pedidos |
| Inmobiliaria | `demos/inmobiliaria/` | Propiedades, filtros, contacto |
| Servicios del Hogar | `demos/servicios-hogar/` | Gas, electricidad, plomería |
| Gimnasio | `demos/gimnasio/` | Clases, horarios, planes |
| Veterinaria | `demos/veterinaria/` | Servicios, turnos, emergencias |
| Taller Mecánico | `demos/taller/` | Servicios, presupuestos |
| **Estética** | `demos/estetica/` | ✅ Tratamientos, galería, promos |
| **Odontología** | `demos/odontologia/` | ✅ Especialidades, obras sociales, equipo |

## Planes y Precios

### Presencia Digital - $15.000/mes
- Landing page profesional
- Botón de WhatsApp
- Formulario de contacto
- Diseño mobile
- Sección de servicios

### Ventas Automáticas - $35.000/mes ⭐
- Todo lo anterior
- Bot de ventas
- Catálogo de productos
- Carrito de compras
- Panel de pedidos

### Negocio Digital Pro - $55.000/mes
- Todo lo anterior
- Stock en tiempo real
- Reportes automáticos
- Soporte prioritario

## Flujo de Trabajo con un Cliente

1. **Captación**: El cliente ve tu landing en `moviltecdigital.com.ar`
2. **Demostración**: Mostrás la demo correspondiente a su rubro
3. **Configuración**: Usás el generador para crear su sitio en minutos
4. **Entrega**: Subís el archivo a Netlify (gratis) o le pasás el archivo al cliente
5. **Mantenimiento**: Cobrás mensualidad por hosting y actualizaciones

## Costos para el Cliente

| Concepto | Costo |
|----------|-------|
| Dominio .com.ar | ~$8.500/año (Arsys) |
| Hosting Netlify | Gratis |
| WhatsApp Business | Gratis |
| Tu servicio mensual | $15.000 - $55.000 |

## Personalización

El generador automáticamente:
- Adapta colores según la marca del cliente
- Genera contenido específico por rubro
- Incluye íconos relevantes
- Configura botones de WhatsApp
- Optimiza para SEO local

## Soporte

Para dudas o mejoras, contactame por WhatsApp: 264-530-4372
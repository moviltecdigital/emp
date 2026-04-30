# 🚀 Sistema de Generación de Sitios Profesional - Instrucciones

## ¿Qué se creó?

### 1. **3 Plantillas Profesionales** (en `templates/`)

#### `plantilla-presencia.html` - $15.000/mes
- Diseño moderno con gradientes y sombras suaves
- Hero section con imagen y estadísticas flotantes
- Sección de servicios con tarjetas animadas
- Formulario de contacto funcional (envía a tu email)
- WhatsApp flotante animado
- Totalmente responsive

#### `plantilla-ventas.html` - $35.000/mes  
- Todo lo anterior PLUS:
- Catálogo de productos con filtros
- Carrito de compras funcional
- Sistema de checkout por WhatsApp
- Bot de ventas integrado
- Pasos de compra visual
- Diseño dark/light premium

#### `plantilla-pro.html` - $55.000/mes
- Todo lo anterior PLUS:
- Sistema de reservas online
- Estadísticas en tiempo real
- Formulario de reservas con fecha/hora
- Múltiples secciones profesionales
- Testimonios destacados
- Footer completo con múltiples columnas

### 2. **Generador Web Profesional** (`generador/index.html`)

#### Características:
- **Vista previa en tiempo real**: El cliente ve cambios mientras escribe
- **4 pasos claros**: Plan → Datos → Contacto → Servicios
- **Selector de dispositivos**: Vista desktop y mobile
- **Envío por email**: Botón "Enviar solicitud" abre el cliente de email con:
  - Todos los datos del cliente
  - Plan seleccionado
  - Lista de servicios
  - Notas adicionales

#### Flujo del cliente:
1. Elige plan (Presencia/Ventas/Pro)
2. Carga datos del negocio (nombre, slogan, descripción, rubro)
3. Carga contacto y elige color de marca
4. Agrega servicios
5. **Revisa la vista previa en tiempo real**
6. Click en "Enviar solicitud"
7. Se abre su email con toda la info lista para enviar a **moviltecdigital@gmail.com**

### 3. **Demos Actualizadas**
- `demos/estetica/` - Centro de estética profesional
- `demos/odontologia/` - Consultorio odontológico premium

## Cómo usar el sistema

### Para el cliente:
1. Entra a `moviltecdigital.com.ar/generador/`
2. Completa el formulario de 4 pasos
3. Ve su sitio en la vista previa
4. Click en "Enviar solicitud"
5. Envía el email con sus datos

### Para vos (cuando recibís el email):
1. Tenés todos los datos del cliente
2. Usás el `generador.js` de Node.js para compilar el sitio final
3. O manualmente reemplazás las variables en la plantilla correspondiente
4. Subís a Netlify
5. Configurás el dominio si tiene

## Compilar con Node.js

```bash
cd templates/

# Crear archivo de configuración del cliente
echo '{
  "plan": "presencia",
  "negocio": {
    "nombre": "Nombre del Negocio",
    "slogan": "El slogan",
    "descripcion": "La descripción",
    "rubro": "peluqueria"
  },
  "contacto": {
    "whatsapp": "2645304372",
    "email": "contacto@ejemplo.com",
    "direccion": "Av. Ejemplo 123",
    "ciudad": "San Juan",
    "horarios": "Lun a Vie 9-18hs"
  },
  "diseno": {
    "color_primario": "#3B82F6"
  },
  "servicios": ["Servicio 1", "Servicio 2", "Servicio 3"]
}' > cliente-nuevo.json

# Generar sitio
node generador.js --cliente=cliente-nuevo --output=../clientes/nombre-negocio
```

## Precios y planes

| Plan | Precio | Qué incluye | Plantilla |
|------|--------|-------------|-----------|
| Presencia Digital | $15.000/mes | Landing + WhatsApp + Formulario | `plantilla-presencia.html` |
| Ventas Automáticas | $35.000/mes | + Catálogo + Carrito + Bot | `plantilla-ventas.html` |
| Negocio Digital Pro | $55.000/mes | + Reservas + Stock + Reportes | `plantilla-pro.html` |

## Próximos pasos recomendados

1. **Probar el generador**: Abrí `generador/index.html` en tu navegador
2. **Testear envío**: Completá el formulario y verificá que llegue el email
3. **Personalizar**: Modificá colores, textos o imágenes en las plantillas según necesites
4. **Publicar**: Subí todo a tu hosting

## Estructura final del proyecto

```
emprendimiento/
├── agencia/
│   └── index.html              # Tu landing de ventas
├── generador/
│   └── index.html              # Generador con vista previa (NUEVO)
├── templates/
│   ├── generador.js            # Compilador Node.js
│   ├── plantilla-presencia.html    # Plantilla $15K (NUEVO)
│   ├── plantilla-ventas.html       # Plantilla $35K (NUEVO)
│   ├── plantilla-pro.html          # Plantilla $55K (NUEVO)
│   └── ejemplos/
├── demos/                      # Demos para mostrar
│   ├── estetica/              # (NUEVO)
│   ├── odontologia/           # (NUEVO)
│   └── ...
└── README.md
```

¿Necesitás que ajuste algo de las plantillas o del generador?
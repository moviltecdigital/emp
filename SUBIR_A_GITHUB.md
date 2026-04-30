# 📤 Guía para Subir a GitHub con Git Bash

## Paso 1: Abrir Git Bash

1. Andá a la carpeta `emprendimiento` en tu computadora
2. Click derecho → "Git Bash Here"

## Paso 2: Verificar estado

```bash
git status
```

Te va a mostrar los archivos modificados y nuevos.

## Paso 3: Agregar todos los cambios

```bash
# Agregar TODO (archivos modificados + nuevos)
git add .

# O si querés ser selectivo, agregar uno por uno:
# git add formulario-cliente.html
# git add actualizar-iconos.js
# git add clientes-config/
# etc.
```

## Paso 4: Hacer commit

```bash
git commit -m "feat: sistema completo de plantillas con formulario y generador

- Formulario de clientes con envío por email
- Generador de sitios node.js
- Iconos profesionales Font Awesome en todos los demos
- Imágenes corregidas en peluquería y ropa
- Documentación completa del sistema"
```

## Paso 5: Subir a GitHub

```bash
git push origin main
```

## Paso 6: Verificar

Andá a tu repo en GitHub (github.com/tu-usuario/emprendimiento) y verificá que se subió todo.

---

## 🚀 Comandos resumidos (copiar y pegar)

```bash
cd /c/Users/Notebook/emprendimiento
git add .
git commit -m "feat: sistema completo de plantillas con formulario y generador"
git push origin main
```

---

## ⚠️ Si tenés errores

### Error: "Please tell me who you are"
```bash
git config --global user.email "tu-email@ejemplo.com"
git config --global user.name "Tu Nombre"
```

### Error: "Permission denied"
```bash
# Verificá que estés logueado
git config --list

# Si no, configurá tus credenciales
git config --global user.name "tu-usuario"
git config --global user.email "tu-email@github.com"
```

### Error: "Updates were rejected"
```bash
# Primero hacé pull
git pull origin main

# Luego push
git push origin main
```

---

## 📁 Qué se va a subir

### Archivos nuevos importantes:
- `formulario-cliente.html` - Formulario para clientes
- `actualizar-iconos.js` - Script de iconos
- `clientes-config/` - Configuraciones de clientes
- `templates/` - Plantillas y generadores
- Documentación: `SISTEMA_FINAL.md`, `GUIA_PASO_A_PASO.md`, etc.

### Demos actualizados:
- `demos/peluqueria/` - Iconos e imágenes corregidos
- `demos/ropa/` - Iconos e imágenes corregidos
- `demos/estetica/` - Iconos actualizados
- `demos/odontologia/` - Iconos actualizados
- Y 6 demos más...

---

## 🌐 Después de subir

Una vez en GitHub, podés:
1. Ver todo online en github.com
2. Compartir el repo con otros
3. Hacer deploy automático a Netlify desde GitHub

**¿Querés que te explique cómo hacer deploy automático a Netlify desde GitHub?**
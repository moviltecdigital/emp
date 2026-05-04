# 🔧 Solución: Netlify no detecta el branch

## Problema
Netlify no muestra los branches porque:
1. El repo es privado
2. No está autorizado el acceso
3. No se ha subido el código aún

## Solución paso a paso:

### Paso 1: Verificar que el código esté en GitHub

En Git Bash, ejecutá:

```bash
cd /c/Users/Notebook/emprendimiento
git status
git log --oneline -5
```

Si no está subido, ejecutá:
```bash
git add .
git commit -m "feat: sistema completo con formulario y generador"
git push origin main
```

### Paso 2: Autorizar acceso en Netlify

1. En Netlify, andá a: **User settings** (arriba a la derecha, click en tu avatar)
2. Andá a la pestaña: **Applications** → **Authorized OAuth apps**
3. Buscá **Netlify** y asegurate que tenga acceso a tus repos
4. Si no está, andá a: https://github.com/settings/applications
5. Buscá **Netlify** y dale acceso a todos los repos

### Paso 3: Reconectar el repo

1. En Netlify, volvé atrás
2. Andá a: **Sites** → **Add new site** → **Import an existing project**
3. Elegí **GitHub** de nuevo
4. Autorizá si te pide permisos
5. Buscá: `moviltecdigitalAR/emprendimiento`
6. Ahora debería aparecer el branch `main`

### Paso 4: Si sigue sin funcionar

**Opción alternativa: Deploy manual**

1. En Netlify: **Add new site** → **Deploy manually**
2. Arrastrá la carpeta `agencia` directamente
3. El sitio se publica inmediatamente
4. Luego podés configurar el dominio

---

## 🚀 Configuración rápida una vez que funcione

| Campo | Valor |
|-------|-------|
| **Branch to deploy** | `main` |
| **Base directory** | (dejar vacío) |
| **Build command** | (dejar vacío) |
| **Publish directory** | `agencia` |

---

## ⚡ Alternativa inmediata: Deploy manual

Si querés probar ahora mismo sin complicaciones:

1. Andá a https://app.netlify.com/drop
2. Arrastrá la carpeta `C:\Users\Notebook\emprendimiento\agencia`
3. Listo, tu sitio está online en segundos
4. Te da un URL tipo: `abc123.netlify.app`

Luego podés configurar el dominio personalizado.

---

**¿Probaste la opción de deploy manual? Es la más rápida para empezar.**
# 🚀 Deploy Automático: GitHub → Netlify

## Paso 1: Preparar el repositorio para Netlify

Primero, asegurate de que el repo esté listo. Necesitamos un archivo de configuración.

### Crear `netlify.toml` en la raíz del proyecto:

```toml
[build]
  publish = "agencia"
  command = "echo 'Build complete'"

[[redirects]]
  from = "/demos/*"
  to = "/demos/:splat"
  status = 200

[[redirects]]
  from = "/generador/*"
  to = "/generador/:splat"
  status = 200
```

---

## Paso 2: Configurar en Netlify

### A) Entrá a Netlify
1. Andá a https://app.netlify.com
2. Login con tu cuenta de GitHub (recomendado)
3. Si no tenés cuenta, creala con "Sign up with GitHub"

### B) Conectar el repo
1. Click en "Add new site" → "Import an existing project"
2. Seleccioná "GitHub" como provider
3. Autorizá a Netlify para acceder a tus repos
4. Buscá y seleccioná: `moviltecdigitalAR/emprendimiento`
5. Configuración:
   - **Branch to deploy**: `main`
   - **Build command**: (dejar vacío o poner `echo "done"`)
   - **Publish directory**: `agencia`

6. Click "Deploy site"

---

## Paso 3: Configurar dominio personalizado (opcional)

Si querés usar `moviltecdigital.com.ar`:

1. En Netlify, andá a "Domain settings"
2. Click "Add custom domain"
3. Ingresá: `moviltecdigital.com.ar`
4. Netlify te va a dar instrucciones para configurar los DNS
5. En tu proveedor de dominio (Arsys, DonWeb, etc.), configurá:
   - Tipo A → apuntando a la IP de Netlify
   - O CNAME → apuntando al dominio de Netlify

---

## Paso 4: Deploy de los demos individuales

Cada demo puede ser un sitio separado. Para eso:

### Opción A: Subcarpetas (más fácil)
```
moviltecdigital.com.ar/demos/peluqueria
moviltecdigital.com.ar/demos/estetica
```

### Opción B: Sitios separados (mejor para clientes)
Para cada cliente, creás un nuevo sitio en Netlify:

1. En Netlify: "Add new site" → "Manual deploy"
2. Arrastrás la carpeta del cliente (ej: `clientes/peluqueria-maria/`)
3. Le asignás un nombre: `peluqueria-maria-moviltec`
4. El URL queda: `peluqueria-maria-moviltec.netlify.app`

---

## 📋 Resumen de URLs

| Sitio | URL en Netlify | Dominio propio (opcional) |
|-------|----------------|---------------------------|
| Agencia principal | `moviltec-abc123.netlify.app` | `moviltecdigital.com.ar` |
| Demo peluquería | `demo-peluqueria-xyz.netlify.app` | - |
| Cliente María | `peluqueria-maria-abc.netlify.app` | `peluqueriamaria.com.ar` |

---

## 🔄 Flujo de trabajo con deploy automático

1. **Vos hacés cambios** en tu código local
2. **Subís a GitHub**: `git push origin main`
3. **Netlify detecta** el push automáticamente
4. **Se redeploya** el sitio en segundos
5. **Los cambios están online** sin hacer nada más

---

## ⚡ Comando rápido para deploy manual (si necesitás)

Si querés deployar sin esperar el auto-deploy:

```bash
# Instalar Netlify CLI (una sola vez)
npm install -g netlify-cli

# Login (una sola vez)
netlify login

# Deploy manual
netlify deploy --prod --dir=agencia
```

---

## 🎯 Próximos pasos

1. Subir todo a GitHub (como te expliqué antes)
2. Crear cuenta en Netlify (con GitHub)
3. Conectar el repo
4. Configurar dominio (si querés)
5. Probar el deploy automático

**¿Querés que te guíe paso a paso para hacer la conexión ahora?**
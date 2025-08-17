# 🚀 Guía de Despliegue - Generador QR

Esta guía te muestra cómo desplegar tu aplicación en diferentes plataformas para que esté disponible públicamente.

## 📋 Preparación Previa

✅ **Ya completado en tu proyecto:**
- Procfile creado para Heroku
- Variables de entorno configuradas
- Headers de seguridad añadidos
- Límites de tamaño de archivos establecidos

## 🌟 Opciones de Despliegue Recomendadas

### 1. 🆓 **RENDER** (Recomendado - Gratis)

**Ventajas:** Gratis, fácil, SSL automático, dominio personalizado
**Tiempo:** 5-10 minutos

#### Pasos:
1. Ve a [render.com](https://render.com) y crea una cuenta
2. Sube tu proyecto a GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tuusuario/generador-qr.git
   git push -u origin main
   ```
3. En Render:
   - Conecta tu repositorio de GitHub
   - Selecciona "Web Service"
   - Configuración automática detectada
4. ¡Listo! Tu app estará en: `https://tu-app.onrender.com`

### 2. 🔥 **RAILWAY** (Muy fácil)

**Ventajas:** Deploy automático, gratis hasta cierto uso
**Tiempo:** 3-5 minutos

#### Pasos:
1. Ve a [railway.app](https://railway.app)
2. Conecta con GitHub
3. Selecciona tu repositorio
4. Deploy automático
5. Tu app estará disponible inmediatamente

### 3. 🟣 **HEROKU** (Clásico)

**Ventajas:** Muy conocido, muchos addons
**Desventajas:** Ya no es gratis

#### Pasos:
1. Instala Heroku CLI
2. ```bash
   heroku login
   heroku create tu-generador-qr
   git push heroku main
   ```

### 4. ⚡ **VERCEL** (Para proyectos Node.js)

**Ventajas:** Muy rápido, CDN global
**Tiempo:** 2-3 minutos

#### Pasos:
1. Instala Vercel CLI: `npm i -g vercel`
2. En tu proyecto: `vercel --prod`
3. Sigue las instrucciones

### 5. 🐳 **DigitalOcean App Platform**

**Ventajas:** Escalable, buen rendimiento
**Costo:** Desde $5/mes

## 🎯 **Recomendación Específica para Ti**

Para tu proyecto de cursos de reducción de puntos, te recomiendo **RENDER** porque:

- ✅ Es completamente gratis
- ✅ SSL automático (HTTPS)
- ✅ Dominio personalizado gratis
- ✅ Auto-deploy desde GitHub
- ✅ Perfecto para aplicaciones Node.js
- ✅ No requiere tarjeta de crédito

## 🚀 Deploy Rápido con Render

### Paso 1: Subir a GitHub
```bash
# En tu terminal (PowerShell)
git init
git add .
git commit -m "Generador QR para cursos de reducción de puntos"
git branch -M main
# Crea un repo en GitHub primero, luego:
git remote add origin https://github.com/tuusuario/generador-qr-cursos.git
git push -u origin main
```

### Paso 2: Deploy en Render
1. 🌐 Ve a [render.com](https://render.com)
2. 📝 Regístrate con GitHub
3. ➕ "New" → "Web Service"
4. 🔗 Conecta tu repositorio `generador-qr-cursos`
5. ⚙️ Configuración (auto-detectada):
   - **Name:** `generador-qr-cursos`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. 🚀 "Create Web Service"

### Paso 3: ¡Ya está online!
Tu aplicación estará disponible en:
`https://generador-qr-cursos.onrender.com`

## 🔧 Variables de Entorno (si las necesitas)

En Render, ve a "Environment" y añade:
- `NODE_ENV=production`
- `PORT=10000` (Render lo asigna automáticamente)

## 🌍 Dominio Personalizado (Opcional)

Una vez desplegado, puedes configurar tu propio dominio:
1. En Render: Settings → Custom Domains
2. Añade tu dominio: `qr-cursos.tudominio.com`
3. Configura los DNS según las instrucciones

## 📊 Monitoreo y Logs

- **Logs en tiempo real:** Dashboard de Render
- **Métricas:** CPU, memoria, requests
- **SSL:** Automático y renovación automática

## 🔄 Auto-Deploy

Cada vez que hagas `git push` a tu rama main, Render automáticamente:
1. Detecta los cambios
2. Ejecuta el build
3. Despliega la nueva versión
4. ¡Cero downtime!

## 🆘 Troubleshooting

### Error común: Puerto
Render asigna un puerto automáticamente. Tu código ya está preparado:
```javascript
const PORT = process.env.PORT || 3000;
```

### Error: Archivos grandes
Los archivos subidos se almacenan temporalmente. Para producción considera:
- AWS S3 para archivos
- Límites de archivo (ya configurado: 10MB)

## 📱 Próximos Pasos

Una vez desplegado, podrás:
- 📤 Compartir el enlace público
- 📱 Usar desde cualquier dispositivo
- 🔗 Integrar en otras webs
- 📊 Ver estadísticas de uso

¿Quieres que te ayude con el deploy en Render paso a paso?

# 🔧 Configuración de URL Pública para QR Codes

## ❌ **Problema identificado:**
Los códigos QR generados contienen URLs con `localhost:3000`, que solo funcionan en tu computadora local. Cuando alguien escanea el QR desde su teléfono, no puede acceder al archivo.

## ✅ **Solución:**

### **Paso 1: Hacer público el puerto en VS Code**

1. **Abrir Panel de Puertos:**
   - `Ctrl + Shift + P` → escribir "Ports"
   - Seleccionar "Ports: Focus on Ports View"

2. **Forward del Puerto 3000:**
   - Click en "Forward a Port"
   - Escribir: `3000`
   - Presionar Enter

3. **Hacer el Puerto Público:**
   - Right-click en el puerto 3000
   - "Port Visibility" → "**Public**"

4. **Copiar la URL Pública:**
   - Verás algo como: `https://3000-osk4114-generadorqrcu-xyz123.preview.app.github.dev`
   - Copia esta URL completa

### **Paso 2: Configurar la URL base**

1. **Crear archivo .env:**
   ```bash
   # En el terminal de VS Code:
   copy .env.example .env
   ```

2. **Editar el archivo .env:**
   ```env
   BASE_URL=https://3000-osk4114-generadorqrcu-xyz123.preview.app.github.dev
   NODE_ENV=development
   ```

3. **Reiniciar el servidor:**
   - Presiona `Ctrl + C` en el terminal
   - Ejecuta: `npm run dev`

### **Paso 3: Verificar la configuración**

1. **Accede a:** `tu-url-publica/api/config`
2. **Deberías ver algo como:**
   ```json
   {
     "baseUrl": "https://3000-osk4114-generadorqrcu-xyz123.preview.app.github.dev",
     "host": "localhost:3000",
     "forwardedHost": "3000-osk4114-generadorqrcu-xyz123.preview.app.github.dev",
     "environment": "development"
   }
   ```

## 🎯 **Resultado:**

Ahora cuando generes un QR code:
- ❌ **Antes:** `http://localhost:3000/uploads/archivo.pdf`
- ✅ **Después:** `https://3000-osk4114-generadorqrcu-xyz123.preview.app.github.dev/uploads/archivo.pdf`

## 📱 **Prueba:**

1. Genera un nuevo QR code subiendo un archivo
2. Escanea el QR con tu teléfono
3. ¡Ahora debería funcionar perfectamente!

## 🔄 **Detección automática:**

La aplicación ahora detecta automáticamente:
- URLs públicas de VS Code
- Headers de forwarding
- Variables de entorno

## 💡 **Consejos:**

- La URL pública estará activa mientras VS Code esté abierto
- Si reinicias VS Code, puede cambiar la URL
- Para uso permanente, considera el despliegue en la nube

---

**¿Listo para probarlo?** Sigue los pasos y verás cómo los QR codes ahora funcionan desde cualquier dispositivo.

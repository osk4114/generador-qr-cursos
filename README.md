# Generador QR para Cursos de Reducción de Puntos

Una aplicación web moderna para generar códigos QR de cursos de reducción de puntos del carnet de conducir. Permite crear códigos QR tanto desde URLs como desde archivos subidos.

## 🚀 Características

- **Generación desde URL**: Crea códigos QR directamente desde enlaces web
- **Generación desde Archivo**: Sube archivos (PDF, DOC, imágenes) y genera QR del enlace de descarga
- **Interfaz Moderna**: Diseño responsivo con Tailwind CSS
- **Descarga de QR**: Descarga los códigos QR generados en formato PNG
- **Gestión de Cursos**: Asigna nombres a los cursos para mejor organización

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express
- **Frontend**: HTML5, CSS3 (Tailwind), JavaScript Vanilla
- **Generación QR**: Librería `qrcode`
- **Subida de Archivos**: Multer
- **Iconos**: Font Awesome

## 📦 Instalación

1. **Clona o descarga el proyecto**
   ```bash
   cd generador-qr-cursos
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Accede a la aplicación**
   Abre tu navegador en: `http://localhost:3000`

## 🌐 Despliegue en Producción

Para desplegar tu aplicación y hacerla accesible públicamente, consulta la **[Guía de Despliegue](DEPLOY.md)** completa.

**Opción recomendada: Render (Gratis)**
1. Sube el proyecto a GitHub
2. Conecta con [Render](https://render.com)
3. Deploy automático
4. ¡Tu app estará online!

Ver [DEPLOY.md](DEPLOY.md) para instrucciones detalladas.

## 🎯 Uso

### Generar QR desde URL

1. Ve a la pestaña "Generar desde URL"
2. Introduce el nombre del curso (opcional)
3. Pega la URL del curso
4. Haz clic en "Generar Código QR"
5. Descarga el código QR generado

### Generar QR desde Archivo

1. Ve a la pestaña "Generar desde Archivo"
2. Introduce el nombre del curso (opcional)
3. Sube tu archivo (PDF, DOC, DOCX, JPG, PNG)
4. Haz clic en "Generar Código QR"
5. Descarga el código QR generado

## 📁 Estructura del Proyecto

```
generador-qr-cursos/
├── public/                 # Archivos estáticos
│   ├── index.html         # Página principal
│   ├── script.js          # JavaScript del frontend
│   └── qr-codes/          # Códigos QR generados
├── uploads/               # Archivos subidos por usuarios
├── server.js              # Servidor Express
├── package.json           # Dependencias y scripts
└── README.md             # Este archivo
```

## 🔧 Scripts Disponibles

- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia el servidor con auto-reload (nodemon)
- `npm run build` - Instala dependencias

## 🌐 API Endpoints

### POST /generate-qr-url
Genera un código QR desde una URL.

**Body:**
```json
{
  "url": "https://ejemplo.com/curso",
  "courseName": "Nombre del curso"
}
```

### POST /generate-qr-file
Genera un código QR desde un archivo subido.

**Form Data:**
- `file`: Archivo a subir
- `courseName`: Nombre del curso (opcional)

## 🎨 Personalización

### Colores del QR
Puedes modificar los colores del código QR en `server.js`:

```javascript
await QRCode.toFile(qrPath, url, {
  width: 300,
  margin: 2,
  color: {
    dark: '#000000',    // Color del código
    light: '#FFFFFF'    // Color del fondo
  }
});
```

### Estilos
Los estilos están implementados con Tailwind CSS. Puedes modificar `public/index.html` para cambiar la apariencia.

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Dispositivos móviles
- 💻 Tablets
- 🖥️ Escritorio

## 🚨 Consideraciones de Seguridad

- Los archivos subidos se almacenan en el directorio `uploads/`
- Se validan las URLs antes de generar códigos QR
- Los archivos tienen límites de tamaño (configurables en multer)

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Creado para facilitar la distribución de cursos de reducción de puntos del carnet de conducir.

---

⭐ ¡Si te ha sido útil este proyecto, no olvides darle una estrella!

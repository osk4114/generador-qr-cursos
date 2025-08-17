const express = require('express');
const multer = require('multer');
const QRCode = require('qrcode');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Cargar variables de entorno
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Función para obtener la URL base correcta
function getBaseUrl(req) {
  // Si hay una variable de entorno para la URL base, usarla
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }
  
  // Detectar URL pública de VS Code (GitHub Codespaces/Port Forwarding)
  const forwardedHost = req.get('x-forwarded-host');
  const forwardedProto = req.get('x-forwarded-proto');
  
  if (forwardedHost) {
    return `${forwardedProto || 'https'}://${forwardedHost}`;
  }
  
  // Fallback a la URL local
  return `${req.protocol}://${req.get('host')}`;
}

// Configuración de middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));

// Headers de seguridad para producción
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Crear directorio uploads si no existe
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Crear directorio qr-codes si no existe
if (!fs.existsSync('public/qr-codes')) {
  fs.mkdirSync('public/qr-codes', { recursive: true });
}

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para configurar/obtener la URL base (útil para debugging)
app.get('/api/config', (req, res) => {
  const baseUrl = getBaseUrl(req);
  res.json({
    baseUrl: baseUrl,
    host: req.get('host'),
    forwardedHost: req.get('x-forwarded-host'),
    forwardedProto: req.get('x-forwarded-proto'),
    protocol: req.protocol,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Generar QR desde URL
app.post('/generate-qr-url', async (req, res) => {
  try {
    const { url, courseName } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL es requerida' });
    }

    // Validar URL
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(url)) {
      return res.status(400).json({ error: 'URL no válida' });
    }

    const filename = `qr-${Date.now()}.png`;
    const qrPath = path.join(__dirname, 'public', 'qr-codes', filename);

    await QRCode.toFile(qrPath, url, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    res.json({
      success: true,
      qrCode: `/qr-codes/${filename}`,
      url: url,
      courseName: courseName || 'Sin nombre'
    });

  } catch (error) {
    console.error('Error generando QR:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Generar QR desde archivo
app.post('/generate-qr-file', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Archivo es requerido' });
    }

    const { courseName } = req.body;
    
    const baseUrl = getBaseUrl(req);
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
    
    const filename = `qr-${Date.now()}.png`;
    const qrPath = path.join(__dirname, 'public', 'qr-codes', filename);

    await QRCode.toFile(qrPath, fileUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    res.json({
      success: true,
      qrCode: `/qr-codes/${filename}`,
      fileUrl: fileUrl,
      fileName: req.file.originalname,
      courseName: courseName || 'Sin nombre'
    });

  } catch (error) {
    console.error('Error generando QR:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Servir archivos subidos
app.use('/uploads', express.static('uploads'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📱 Generador QR para cursos de reducción de puntos listo!`);
});

module.exports = app;

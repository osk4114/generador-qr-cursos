// Variables globales
let currentTab = 'url';

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeForms();
    initializeFileUpload();
});

// Gestión de tabs
function initializeTabs() {
    const tabUrl = document.getElementById('tab-url');
    const tabFile = document.getElementById('tab-file');
    const contentUrl = document.getElementById('content-url');
    const contentFile = document.getElementById('content-file');

    tabUrl.addEventListener('click', () => switchTab('url'));
    tabFile.addEventListener('click', () => switchTab('file'));
}

function switchTab(tab) {
    currentTab = tab;
    
    const tabUrl = document.getElementById('tab-url');
    const tabFile = document.getElementById('tab-file');
    const contentUrl = document.getElementById('content-url');
    const contentFile = document.getElementById('content-file');

    // Reset tabs
    tabUrl.className = 'flex-1 py-4 px-6 text-center font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50';
    tabFile.className = 'flex-1 py-4 px-6 text-center font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50';

    if (tab === 'url') {
        tabUrl.className = 'flex-1 py-4 px-6 text-center font-medium text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50';
        contentUrl.classList.remove('hidden');
        contentFile.classList.add('hidden');
    } else {
        tabFile.className = 'flex-1 py-4 px-6 text-center font-medium text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50';
        contentFile.classList.remove('hidden');
        contentUrl.classList.add('hidden');
    }

    // Hide previous results
    hideResult();
}

// Inicializar formularios
function initializeForms() {
    const formUrl = document.getElementById('form-url');
    const formFile = document.getElementById('form-file');

    formUrl.addEventListener('submit', handleUrlSubmit);
    formFile.addEventListener('submit', handleFileSubmit);
}

// Manejar envío de formulario URL
async function handleUrlSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        url: formData.get('url'),
        courseName: formData.get('courseName')
    };

    if (!data.url) {
        showError('Por favor, introduce una URL válida');
        return;
    }

    showLoading();

    try {
        const response = await fetch('/generate-qr-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            showResult(result, 'url');
        } else {
            showError(result.error || 'Error al generar el código QR');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
        hideLoading();
    }
}

// Manejar envío de formulario archivo
async function handleFileSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    if (!formData.get('file')) {
        showError('Por favor, selecciona un archivo');
        return;
    }

    showLoading();

    try {
        const response = await fetch('/generate-qr-file', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            showResult(result, 'file');
        } else {
            showError(result.error || 'Error al generar el código QR');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
        hideLoading();
    }
}

// Inicializar upload de archivos
function initializeFileUpload() {
    const fileInput = document.getElementById('file-input');
    const filePreview = document.getElementById('file-preview');
    const fileName = document.getElementById('file-name');

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            fileName.textContent = file.name;
            filePreview.classList.remove('hidden');
        } else {
            filePreview.classList.add('hidden');
        }
    });

    // Drag and drop
    const dropZone = fileInput.closest('.border-dashed');
    
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropZone.classList.add('border-indigo-500', 'bg-indigo-50');
    });

    dropZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        dropZone.classList.remove('border-indigo-500', 'bg-indigo-50');
    });

    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        dropZone.classList.remove('border-indigo-500', 'bg-indigo-50');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            fileName.textContent = files[0].name;
            filePreview.classList.remove('hidden');
        }
    });
}

// Mostrar loading
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    hideResult();
}

// Ocultar loading
function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Mostrar resultado
function showResult(data, type) {
    const result = document.getElementById('result');
    const qrImage = document.getElementById('qr-image');
    const resultCourse = document.getElementById('result-course');
    const resultUrl = document.getElementById('result-url');
    const resultFileInfo = document.getElementById('result-file-info');
    const resultFilename = document.getElementById('result-filename');
    const downloadBtn = document.getElementById('download-qr');

    // Configurar imagen QR
    qrImage.src = data.qrCode;
    qrImage.alt = `Código QR para ${data.courseName || 'curso'}`;

    // Configurar información
    resultCourse.textContent = data.courseName || 'Sin nombre especificado';
    
    if (type === 'url') {
        resultUrl.textContent = data.url;
        resultFileInfo.classList.add('hidden');
    } else if (type === 'file') {
        resultUrl.textContent = data.fileUrl;
        resultFilename.textContent = data.fileName;
        resultFileInfo.classList.remove('hidden');
    }

    // Configurar botón de descarga
    downloadBtn.onclick = () => downloadQR(data.qrCode, data.courseName);

    result.classList.remove('hidden');
    
    // Scroll al resultado
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Ocultar resultado
function hideResult() {
    document.getElementById('result').classList.add('hidden');
}

// Descargar QR
function downloadQR(qrPath, courseName) {
    const link = document.createElement('a');
    link.href = qrPath;
    link.download = `qr-${(courseName || 'curso').replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Mostrar error
function showError(message) {
    // Crear o actualizar notificación de error
    let errorDiv = document.getElementById('error-notification');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'error-notification';
        errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm';
        document.body.appendChild(errorDiv);
    }

    errorDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-triangle mr-2"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Auto-hide después de 5 segundos
    setTimeout(() => {
        if (errorDiv && errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

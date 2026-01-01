# Script de inicio rápido para XP Dashboard
# Ejecutar con: .\start.ps1

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  XP Dashboard - Inicio Rápido   " -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Docker está instalado
if (Get-Command docker -ErrorAction SilentlyContinue) {
    Write-Host "✓ Docker detectado" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Selecciona el método de inicio:" -ForegroundColor Yellow
    Write-Host "1. Docker (Recomendado - Un comando)" -ForegroundColor White
    Write-Host "2. Desarrollo local (npm)" -ForegroundColor White
    Write-Host ""
    
    $opcion = Read-Host "Ingresa tu opción (1 o 2)"
    
    if ($opcion -eq "1") {
        Write-Host ""
        Write-Host "Iniciando con Docker..." -ForegroundColor Cyan
        Write-Host "Construyendo y levantando contenedor..." -ForegroundColor Yellow
        
        docker-compose up -d --build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "  ✓ Dashboard iniciado correctamente   " -ForegroundColor Green
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "Accede al dashboard en: http://localhost:3000" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "Comandos útiles:" -ForegroundColor Yellow
            Write-Host "  Ver logs:     docker-compose logs -f" -ForegroundColor White
            Write-Host "  Detener:      docker-compose down" -ForegroundColor White
            Write-Host "  Reconstruir:  docker-compose up -d --build" -ForegroundColor White
            Write-Host ""
        } else {
            Write-Host "Error al iniciar Docker. Verifica la configuración." -ForegroundColor Red
        }
        
    } elseif ($opcion -eq "2") {
        Write-Host ""
        Write-Host "Iniciando en modo desarrollo..." -ForegroundColor Cyan
        
        # Verificar si node_modules existe
        if (-not (Test-Path "node_modules")) {
            Write-Host "Instalando dependencias..." -ForegroundColor Yellow
            npm install
        }
        
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  Iniciando servidor de desarrollo...  " -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "El dashboard estará disponible en: http://localhost:3000" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
        Write-Host ""
        
        npm run dev
        
    } else {
        Write-Host "Opción no válida" -ForegroundColor Red
    }
    
} else {
    Write-Host "✗ Docker no detectado. Iniciando en modo desarrollo..." -ForegroundColor Yellow
    Write-Host ""
    
    # Verificar si node_modules existe
    if (-not (Test-Path "node_modules")) {
        Write-Host "Instalando dependencias..." -ForegroundColor Yellow
        npm install
    }
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Iniciando servidor de desarrollo...  " -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "El dashboard estará disponible en: http://localhost:3000" -ForegroundColor Cyan
    Write-Host ""
    
    npm run dev
}

#!/usr/bin/env pwsh

<#
.SYNOPSIS
Inicia ambos servidores: API (3001) y Frontend (3000)

.DESCRIPTION
Este script inicia el servidor Node.js de persistencia y el servidor Vite
en paralelo. Abre ambas aplicaciones en navegadores.

.EXAMPLE
.\start-all.ps1
#>

$ErrorActionPreference = "Stop"

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          XP Dashboard - Sistema Completo                   ║" -ForegroundColor Cyan
Write-Host "║          Iniciando API + Frontend                          ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Obtener ruta del script
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootPath = $scriptPath

Write-Host "📁 Ruta raíz: $rootPath`n" -ForegroundColor Yellow

# Iniciar servidor API en una nueva ventana
Write-Host "🚀 Iniciando servidor API (puerto 3001)..." -ForegroundColor Green
$apiProcess = Start-Process -FilePath "powershell.exe" `
    -ArgumentList "-NoExit", "-Command", "cd '$rootPath\server'; npm start" `
    -PassThru `
    -WindowStyle Normal
Write-Host "✓ PID del proceso API: $($apiProcess.Id)" -ForegroundColor Green

# Esperar un poco para que el servidor API se inicie
Start-Sleep -Seconds 3

# Iniciar frontend en una nueva ventana
Write-Host "🚀 Iniciando frontend (puerto 3000)..." -ForegroundColor Green
$frontendProcess = Start-Process -FilePath "powershell.exe" `
    -ArgumentList "-NoExit", "-Command", "cd '$rootPath'; npm run dev" `
    -PassThru `
    -WindowStyle Normal
Write-Host "✓ PID del proceso Frontend: $($frontendProcess.Id)" -ForegroundColor Green

# Esperar que los servidores inicien completamente
Start-Sleep -Seconds 5

# Abrir navegadores
Write-Host "`n🌐 Abriendo navegadores..." -ForegroundColor Cyan
Start-Process "http://localhost:3000"

Write-Host @"

╔════════════════════════════════════════════════════════════╗
║                    ¡LISTO!                                ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  Frontend:      http://localhost:3000                     ║
║  API:           http://localhost:3001/api/health         ║
║  Datos:         ./XP/                                     ║
║                                                            ║
║  Procesos:                                                ║
║  • API: $($apiProcess.Id) (powershell)                      ║
║  • Frontend: $($frontendProcess.Id) (powershell)             ║
║                                                            ║
║  Para terminar: cierra ambas ventanas o Ctrl+C            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

"@ -ForegroundColor Cyan

Write-Host "Presiona ENTER para continuar..." -ForegroundColor Yellow
Read-Host

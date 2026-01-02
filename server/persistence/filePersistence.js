const fs = require('fs');
const path = require('path');

/**
 * Módulo base de persistencia en archivos
 * Maneja lectura/escritura segura de archivos JSON
 */

const ENCODING = 'utf-8';

/**
 * Asegura que el directorio existe
 */
const ensureDirectoryExists = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

/**
 * Lee un archivo JSON de forma segura
 */
const readJSON = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const data = fs.readFileSync(filePath, ENCODING);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
};

/**
 * Escribe un archivo JSON de forma segura con backup
 */
const writeJSON = (filePath, data) => {
  try {
    ensureDirectoryExists(filePath);
    
    // Crear backup si el archivo ya existe
    if (fs.existsSync(filePath)) {
      const backupPath = `${filePath}.backup`;
      fs.copyFileSync(filePath, backupPath);
    }
    
    // Escribir datos atomicamente (escribir a temporal primero)
    const tempPath = `${filePath}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), ENCODING);
    
    // Reemplazar archivo original con temporal
    fs.renameSync(tempPath, filePath);
    
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error.message);
    return false;
  }
};

/**
 * Mergeando datos existentes con nuevos datos
 */
const mergeJSON = (filePath, newData) => {
  const existing = readJSON(filePath) || {};
  const merged = { ...existing, ...newData };
  return writeJSON(filePath, merged);
};

module.exports = {
  readJSON,
  writeJSON,
  mergeJSON,
  ensureDirectoryExists
};

// Copia os arquivos do app web para www/, que o Capacitor empacota no APK.
import { cpSync, mkdirSync, rmSync } from 'node:fs';

const FILES = ['index.html', 'styles.css', 'app.js', 'manifest.webmanifest', 'icon.svg', 'sw.js', 'data'];
rmSync('www', { recursive: true, force: true });
mkdirSync('www');
for (const f of FILES) cpSync(f, `www/${f}`, { recursive: true });
console.log('www/ pronto');

#!/bin/bash
# Script automatico per caricare su GitHub
# Esegui questo script dalla cartella sm3000-complete

echo "🚀 Caricamento su GitHub in corso..."

# Configura git (se non già fatto)
git config user.name "Andrea Vitileia" 2>/dev/null || true
git config user.email "vitileiaandrea@gmail.com" 2>/dev/null || true

# Cambia branch a main
git branch -M main

# Aggiungi remote (ignora errore se già esiste)
git remote add origin https://github.com/Vitileiaandrea/sm3000-config-tool.git 2>/dev/null || true

# Push
echo "📤 Sto caricando i file su GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ FATTO! Codice caricato su GitHub!"
    echo "🔗 https://github.com/Vitileiaandrea/sm3000-config-tool"
    echo ""
    echo "Ora vai su GitHub Actions per il build Windows:"
    echo "👉 https://github.com/Vitileiaandrea/sm3000-config-tool/actions"
else
    echo "❌ Errore durante il push. Potrebbe servire autenticazione."
    echo "Prova a eseguire manualmente:"
    echo "  git push -u origin main"
fi

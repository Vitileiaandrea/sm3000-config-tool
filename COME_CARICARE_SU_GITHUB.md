# 📤 COME CARICARE SU GITHUB - GUIDA PASSO PASSO

## ⚠️ IMPORTANTE: Devi caricare TUTTO inclusa la cartella workflows!

---

## 🎯 METODO SEMPLICE (Consigliato)

### Passo 1: Prepara i file
1. Nella cartella `sm3000-complete`, vedrai una cartella chiamata **`github-workflows`**
2. Questa contiene il file `build.yml` che serve per il build automatico Windows

### Passo 2: Crea la struttura su GitHub
1. Vai su: https://github.com/Vitileiaandrea/sm3000-config-tool
2. Clicca **"Add file"** → **"Create new file"**
3. Nel campo "Name your file", scrivi: `.github/workflows/build.yml`
4. Copia il contenuto dal file `github-workflows/build.yml` e incollalo nell'editor
5. Clicca **"Commit changes"**

### Passo 3: Carica tutti gli altri file
1. Clicca **"Add file"** → **"Upload files"**
2. Trascina TUTTI questi file:
   - index.html
   - app.js
   - main.js
   - preload.js
   - package.json
   - package-lock.json
   - icon.png
   - variables_complete.json
   - variables_structure.json
   - README.md
   - BUILD_INSTRUCTIONS.md
   - GUIDA_UTENTE.md
   - INSTALL.txt
   - .gitignore

3. Commit message: "Add application files"
4. Clicca **"Commit changes"**

### Passo 4: Verifica
1. Vai su **"Actions"**
2. Dovresti vedere il workflow "Build Windows Installer" che parte!
3. Aspetta 10-15 minuti
4. Scarica l'EXE dagli Artifacts

---

## 🔄 ALTERNATIVA: Caricare tutto via Terminale (se preferisci)

```bash
cd ~/Scrivania/sm3000-complete  # o ~/Desktop/sm3000-complete

# Verifica che sia tutto ok
git status

# Se vedi tutti i file, procedi:
git push -u origin main
```

Se chiede username e password:
- Username: il tuo username GitHub
- Password: usa un Personal Access Token (non la password normale)

---

## ✅ COSA DEVE SUCCEDERE

Dopo il caricamento, su GitHub Actions dovresti vedere:

1. **Workflow**: "Build Windows Installer"
2. **Status**: Running (in esecuzione) o Completed (completato)
3. **Artifacts**: sm3000-windows-installer.zip (quando completa)

---

## 🆘 SE HAI PROBLEMI

**Problema**: GitHub Actions non si attiva
**Soluzione**: Vai su Settings → Actions → General → Enable workflows

**Problema**: File .github non visibile
**Soluzione**: Usa la cartella `github-workflows` e crea manualmente il percorso `.github/workflows/build.yml` su GitHub

**Problema**: Push fallisce
**Soluzione**: Usa il caricamento manuale via web (metodo semplice sopra)

---

## 📝 CONTENUTO DEL WORKFLOW (build.yml)

Il file `github-workflows/build.yml` contiene:
- Setup Node.js
- Installazione dipendenze
- Build per Windows con electron-builder
- Upload dell'installer come artifact

**È FONDAMENTALE che questo file sia in `.github/workflows/build.yml`**

---

**Una volta caricato tutto, GitHub builderà l'EXE Windows automaticamente!** 🚀

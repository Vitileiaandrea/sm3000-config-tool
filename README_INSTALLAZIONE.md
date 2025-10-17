# 📦 SM3000 Configuration Tool - Installazione Finale

## ✅ COSA È INCLUSO

### Funzionalità Complete:
- ✅ **Lettura/Scrittura Parametri** da PLC M340 (BMXP342•0102)
- ✅ **Live I/O Monitor** - Monitoraggio real-time sensori/uscite
- ✅ **Controllo Manuale** - Comando diretto pistoni e valvole
- ✅ **Indirizzi Reali** da Unity Pro (variabili.TXT)

---

## 🚀 METODO 1: CARICA SU GITHUB E COMPILA

### Passo 1: Carica i File
1. Vai su: https://github.com/Vitileiaandrea/sm3000-config-tool
2. Clicca **"Add file"** → **"Upload files"**
3. Trascina **TUTTI i file** da questa cartella:
   - app.js
   - dashboard-addon.js
   - manual-control.js
   - index.html
   - main.js
   - preload.js
   - package.json
   - package-lock.json
   - variables_complete.json
   - icon.png
   - Cartella `.github` (importante!)

4. Messaggio commit: `Update with Unity Pro addresses`
5. Clicca **"Commit changes"**

### Passo 2: Aspetta la Build
1. Vai su **"Actions"** tab
2. Aspetta che la build diventi verde ✅ (10-15 minuti)
3. Clicca sulla build completata
4. Scorri in basso fino a **"Artifacts"**
5. Scarica **"SM3000-Windows-EXE"**

---

## 💻 METODO 2: BUILD LOCALE (PIÙ VELOCE)

### Requisiti:
- Node.js installato (https://nodejs.org)
- Windows 10/11

### Comandi:
```bash
# 1. Apri PowerShell nella cartella sm3000-deploy
cd C:\percorso\alla\cartella\sm3000-deploy

# 2. Installa dipendenze
npm install

# 3. Compila EXE
npm run build:win

# 4. Trova l'EXE in:
#    dist\SM3000 Configuration Tool Setup 1.0.0.exe
```

---

## 📋 INDIRIZZI CONFIGURATI

### Parametri Principali (%MW):
- **LUNGHEZZA_HMI** = %MW190
- **LUNGHEZZA_PRODOTTO_1** = %MW191
- **LUNGHEZZA_PRODOTTO_2** = %MW192
- **FORMATO_X_VERSO_HMI** = %MW530
- **FORMATO_Y_VERSO_HMI** = %MW532
- **ORE_LAVORO_REALI** = %MW260
- **ORE_MACCHINA_ACCESA** = %MW310
- **CUBI_LAVORATI_FORMATO_14** = %MW220
- **CUBI_LAVORATI_FORMATO_15** = %MW222
- **TEMPO_SAL_DIS_CARICATORE** = %MW262

### Controlli Manuali (%Q → Modbus Coils):
- **Spintore Avanti** = Coil 16 (%Q0.2.16)
- **Lame Su** = Coil 7 (%Q0.2.7)
- **Lame Giù** = Coil 8 (%Q0.2.8)
- **Caricatore Su** = Coil 10 (%Q0.2.10)
- **Caricatore Giù** = Coil 9 (%Q0.2.9)
- **Aghi Avanti** = Coil 15 (%Q0.2.15)
- **Cubo Taglio Su** = Coil 14 (%Q0.2.14)
- **Cubo Taglio Giù** = Coil 13 (%Q0.2.13)
- **Apre Cubo Ceppi** = Coil 11 (%Q0.2.11)
- **Chiude Cubo Ceppi** = Coil 12 (%Q0.2.12)
- **Elettrovalvola Aria** = Coil 5 (%Q0.2.5)

---

## 🔌 CONNESSIONE AL PLC

### Parametri Standard:
```
IP Address: [indirizzo del tuo PLC, es: 192.168.1.100]
Port: 502
Unit ID: 1
```

### Modalità Lettura/Scrittura:
- **Coils (0-999):** Per outputs %Q (controllo manuale)
- **Holding Registers (1000+):** Per %MW (parametri e sensori)

---

## ✨ FUNZIONALITÀ

### 🔴 Live I/O Monitor
- Parte **automaticamente** al caricamento
- Aggiornamento **ogni secondo**
- Mostra stato di **78+ variabili digitali**
- Indicatori colorati: 🟢 ON / ⚪ OFF

### 🎮 Controllo Manuale
- Comando **diretto** pistoni e valvole
- Pulsanti ON/OFF per ogni uscita
- Feedback **visivo** dello stato
- Pulsante "Aggiorna Stato" per sincronizzazione

### 📊 Gestione Parametri
- Lettura valori **reali** dal PLC
- Scrittura parametri su PLC
- Organizzato per **categorie**:
  - Allarmi
  - Sensori
  - Parametri Macchina
  - Homing
  - Statistiche
  - Comandi

---

## 🔧 RISOLUZIONE PROBLEMI

### I parametri rimangono a 0:
✓ Verifica connessione PLC
✓ Controlla IP e porta
✓ Unit ID corretto (prova 0 o 1)

### Controllo manuale non funziona:
✓ PLC in modalità manuale?
✓ Macchina in sicurezza?
✓ Verificare abilitazioni nel PLC

### Live I/O non si aggiorna:
✓ Dovrebbe partire automaticamente
✓ Se fermo, clicca "Start Monitoring"

---

## 📞 SUPPORTO

Per problemi o modifiche:
- Controlla log nella Console (Ctrl+Shift+I)
- Verifica indirizzi in Unity Pro
- Confronta con variabili.TXT originale

---

**Versione:** 1.0.0  
**Data:** 16 Ottobre 2025  
**PLC:** Schneider M340 BMXP342•0102  
**Protocollo:** Modbus TCP/IP

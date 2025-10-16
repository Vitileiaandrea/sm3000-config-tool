# 🚀 SM3000 Configuration Tool - Guida Windows

## 📦 INSTALLAZIONE RAPIDA (5 minuti)

### Requisiti:
- ✅ Windows 10 o superiore
- ✅ Node.js 18+ (se non ce l'hai, scarica da: https://nodejs.org)

---

## 🎯 AVVIO VELOCE

### Metodo 1: Script Automatico (CONSIGLIATO)
1. **Estrai** questa cartella dove vuoi
2. **Doppio click** su `START.bat`
3. **Aspetta** che si installino le dipendenze (solo la prima volta)
4. **L'app si apre** automaticamente!

### Metodo 2: Manuale (Da Terminale)
```bash
# Apri PowerShell o CMD nella cartella
npm install
npm start
```

---

## 🔧 COME USARE L'APP

### 1. Connessione al PLC
- Inserisci l'**IP del PLC** (es: 192.168.1.100)
- Inserisci la **porta** (default: 502)
- Clicca **"Connetti"**

### 2. Gestione Parametri
- **Seleziona** una categoria dalle tab
- **Leggi** i valori dal PLC
- **Modifica** i parametri
- **Scrivi** i nuovi valori al PLC

### 3. Categorie Disponibili
- 📊 **Dashboard** - Stato macchina in tempo reale
- ⚠️ **Errori e Allarmi** - Monitoraggio errori
- 🔌 **Sensori** - Tutti i sensori macchina
- ⚙️ **Configurazione** - Parametri macchina
- 📍 **Posizioni Assi** - Posizionamento
- ⏱️ **Tempi Ciclo** - Temporizzazioni
- 🏠 **Stato Homing** - Riferimenti
- 📈 **Dati Produzione** - Contatori
- 🎮 **Comandi** - Controllo manuale
- 💡 **Pulsanti e Spie** - I/O digitali
- ⚙️ **Impostazioni** - Configurazione sistema
- 🔧 **Manutenzione** - Dati manutenzione

---

## 📋 CONTENUTO PACCHETTO

```
sm3000-complete/
├── START.bat              ← Avvio rapido Windows
├── index.html             ← Interfaccia principale
├── main.js                ← Processo principale Electron
├── preload.js             ← Script preload
├── app.js                 ← Logica applicazione
├── variables_complete.json ← 212 variabili mappate
├── package.json           ← Configurazione
├── icon.png               ← Icona applicazione
├── README.md              ← Documentazione
├── GUIDA_UTENTE.md        ← Guida completa
└── BUILD_INSTRUCTIONS.md  ← Istruzioni build
```

---

## 🐛 RISOLUZIONE PROBLEMI

### Errore: "Node.js non trovato"
**Soluzione:**
1. Scarica Node.js da: https://nodejs.org
2. Installa (versione LTS consigliata)
3. Riavvia il computer
4. Riprova con START.bat

### Errore: "npm install fallito"
**Soluzione:**
```bash
# Pulisci e reinstalla
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Errore: "Connessione PLC fallita"
**Soluzione:**
- Verifica che il PLC sia acceso
- Verifica l'IP del PLC (ping 192.168.1.100)
- Verifica che PC e PLC siano sulla stessa rete
- Controlla che la porta 502 sia aperta
- Disabilita temporaneamente il firewall per test

### L'app non si apre
**Soluzione:**
```bash
# Da PowerShell/CMD
npm run dev
# Controlla gli errori nel terminale
```

---

## 🔌 CONFIGURAZIONE RETE PLC

### Impostazioni Tipiche:
- **IP PLC:** 192.168.1.100 (verifica il tuo)
- **Porta Modbus:** 502
- **Protocollo:** TCP/IP
- **Timeout:** 5000ms

### Test Connessione:
```bash
# Da PowerShell
ping 192.168.1.100

# Se risponde, il PLC è raggiungibile
```

---

## 📊 VARIABILI SUPPORTATE

✅ **212+ variabili complete:**
- 40+ Codici errore
- 34 Sensori mappati
- 15 Formati configurabili
- 8 Posizioni ceppi
- 10 Tempi ciclo
- E molto altro...

Vedi `variables_complete.json` per la lista completa.

---

## 🚀 CREAZIONE EXE (Opzionale)

Se vuoi creare un installer EXE:

```bash
npm run build:win
```

L'installer sarà in `dist/SM3000 Configuration Tool Setup 1.0.0.exe`

**Nota:** Richiede environment Windows o Wine su Linux/Mac

---

## 📝 NOTE IMPORTANTI

- ✅ Connessione diretta Modbus TCP/IP nativa
- ✅ Supporta lettura e scrittura parametri
- ✅ Interfaccia grafica intuitiva
- ✅ Tutte le 212 variabili SM3000
- ✅ Aggiornamenti in tempo reale
- ✅ Gestione errori completa

---

## 💡 SUGGERIMENTI

1. **Prima connessione:** Testa con solo lettura
2. **Backup:** Esporta i parametri prima di modificare
3. **Sicurezza:** Non scrivere parametri se non sei sicuro
4. **Performance:** Usa WiFi/Ethernet per connessione stabile
5. **Manutenzione:** Controlla periodicamente lo stato sensori

---

## 🆘 SUPPORTO

**Repository GitHub:** https://github.com/Vitileiaandrea/sm3000-config-tool

**Problemi?** Apri una issue su GitHub

---

**✅ TUTTO PRONTO! Buon lavoro con SM3000! 🔧**

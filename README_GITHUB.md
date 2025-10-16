# 🔧 SM3000 Configuration Tool

**Gestionale Completo per PLC Schneider SM3000**

Sistema di configurazione professionale con interfaccia grafica intuitiva per gestire tutti i parametri del PLC SM3000 via Modbus TCP/IP.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## ✨ Caratteristiche Principali

### 📊 Dashboard Completa
- **Stato Macchina in Tempo Reale** - Visualizzazione immediata dello stato operativo
- **Allarmi Attivi** - Monitoraggio allarmi con notifiche visive
- **Contatori Produzione** - Tracciamento pezzi lavorati e ore di funzionamento
- **Sensori** - Controllo stato sensori con indicatori colorati (verde=OK, rosso=errore)

### 🎯 Funzionalità Complete

#### 1. **Errors & Alarms** (Errori e Allarmi)
- 40+ codici errore monitorati
- Storico allarmi
- Reset allarmi
- Allarmi sonori
- Verifica errori in tempo reale

#### 2. **Sensors & Inputs** (Sensori e Ingressi)
- Sensori caricatore (salita/discesa)
- Sensori lame (salita/discesa)
- Sensori aghi (avanzamento)
- Sensori spintore (5 posizioni)
- Sensori porte sicurezza
- Pressostato aria
- Centralina sicurezza

#### 3. **Machine Configuration** (Configurazione Macchina)
- Parametri lunghezza (7 variabili)
- Impostazioni formato (3 variabili)
- Parametri velocità (7 variabili)
- Diametro stecco
- Configurazioni custom

#### 4. **Axis Positions** (Posizioni Assi)
- Asse ceppi (quota, richiesta, offset)
- Asse caricatore (quota, richiesta)
- Posizioni immissione
- Controllo manuale assi

#### 5. **Timing Parameters** (Parametri Temporali)
- Tempo massimo/minimo ciclo
- Tempi salita/discesa caricatore
- Temporizzazioni personalizzate

#### 6. **Homing Status** (Stato Azzeramento)
- 8 stati homing OK
- 7 errori homing
- Controllo start home
- Verifica completamento

#### 7. **Production Data** (Dati Produzione)
- Contatori generali (pezzi, ore lavoro, ore macchina)
- Contatori per dimensione (14mm, 15mm, 16mm, 19mm, 21mm, 24mm, 27mm, 30mm)
- Formati speciali (15x30, 21x42, 21x42s1)
- Reset contatori individuali
- Modalità lavoro (stecco singolo/doppio)

#### 8. **Commands & Outputs** (Comandi e Uscite)
- Comandi spintore
- Comandi lame (salita/discesa)
- Comandi caricatore
- Comandi aghi
- Comandi morsa
- Elettrovalvole

#### 9. **Buttons & Indicators** (Pulsanti e Indicatori)
- Pulsanti start (ceppi, taglio)
- Pausa lavoro
- Spie luminose
- Stato pulsanti

#### 10. **System Settings** (Impostazioni Sistema)
- Data e ora (giorno, mese, anno, ora, minuti)
- Lingua (Italiano, Inglese, Francese, Spagnolo)
- Info macchina (cliente, matricola, versione SW)
- Impostazioni display

#### 11. **Maintenance** (Manutenzione)
- Info garanzia (giorni, ore)
- Giorni/ore manutenzione
- Blocco macchina in data
- Reset storico

---

## 🚀 Installazione

### Windows

#### Metodo 1: Download Installer Automatico (Consigliato)
1. Vai su [Releases](https://github.com/Vitileiaandrea/sm3000-config-tool/releases)
2. Scarica `SM3000-Configuration-Tool-Setup-1.0.0.exe`
3. Esegui l'installer
4. L'applicazione sarà disponibile nel menu Start

#### Metodo 2: Build da Sorgente
```bash
# Clona il repository
git clone https://github.com/Vitileiaandrea/sm3000-config-tool.git
cd sm3000-config-tool

# Installa dipendenze
npm install

# Build Windows installer
npm run build:win

# L'installer sarà in: dist/SM3000 Configuration Tool Setup 1.0.0.exe
```

### macOS
```bash
# Installa dipendenze
npm install

# Build macOS app
npm run build:mac

# L'app sarà in: dist/SM3000 Configuration Tool-1.0.0.dmg
```

### Linux
```bash
# Installa dipendenze
npm install

# Build Linux AppImage
npm run build:linux

# Esegui: dist/SM3000 Configuration Tool-1.0.0.AppImage
```

---

## 📡 Connessione PLC

### Requisiti
- PLC Schneider SM3000
- Modbus TCP/IP abilitato
- Connessione di rete (WiFi o Ethernet)

### Configurazione
1. **IP Address**: Indirizzo IP del PLC (es: 192.168.1.100)
2. **Port**: Porta Modbus (default: 502)
3. **Unit ID**: ID unità Modbus (default: 1)

### Prima Connessione
1. Apri l'applicazione
2. Inserisci l'IP del PLC
3. Clicca "Connect"
4. Seleziona una categoria dalla sidebar
5. Usa i pulsanti "Read" e "Write" per leggere/scrivere parametri

---

## 🎨 Interfaccia Utente

### Layout
```
┌─────────────────────────────────────────────┐
│  🔧 SM3000 Configuration Tool               │
│  [IP: 192.168.1.100] [Port: 502] [Connect] │
├──────────────┬──────────────────────────────┤
│              │                              │
│  📁 Dashboard│  📊 Dashboard Overview        │
│  ⚠️ Errors   │  ✅ Machine Status: OK        │
│  📡 Sensors  │  📦 Production: 1234 pieces  │
│  ⚙️ Config   │  ⏱️ Hours: 45.2              │
│  📍 Positions│                              │
│  ⏱️ Timing   │  [Read All] [Write All]      │
│  🏠 Homing   │                              │
│  📊 Production│                             │
│  🎛️ Commands │                              │
│  💡 Indicators│                             │
│  🔧 Settings │                              │
│  🔨 Maintenance│                            │
│              │                              │
└──────────────┴──────────────────────────────┘
```

### Colori e Indicatori
- 🟢 **Verde**: Stato OK, valore normale
- 🔴 **Rosso**: Errore attivo, allarme
- 🟡 **Giallo**: Avviso, attenzione
- ⚪ **Grigio**: Disabilitato, non connesso
- 🔵 **Blu**: Pulsante Read
- 🟢 **Verde**: Pulsante Write

---

## 🔒 Indirizzi Modbus

Gli indirizzi Modbus sono configurati nel file `variables_complete.json`:

```json
{
  "Dashboard": {
    "Machine Status": [
      {"name": "ALLARME_ATTIVO", "address": 40001, "type": "BOOL"},
      {"name": "Pressostato_aria_generale", "address": 40010, "type": "BOOL"}
      ...
    ]
  },
  "Errors & Alarms": {
    "Error Codes 1-20": [
      {"name": "NUMERO_ERRORE[1]", "address": 40200, "type": "INT"},
      ...
    ]
  }
  ...
}
```

**⚠️ IMPORTANTE**: Gli indirizzi sono **PLACEHOLDER** e devono essere verificati/aggiornati con gli indirizzi reali del tuo PLC SM3000.

### Come Aggiornare gli Indirizzi
1. Apri `variables_complete.json`
2. Trova la variabile che vuoi modificare
3. Cambia il valore di `"address"` con l'indirizzo reale
4. Salva il file
5. Riavvia l'applicazione

---

## 🛠️ Tecnologie Utilizzate

- **Electron** - Framework desktop cross-platform
- **Node.js** - Runtime JavaScript
- **modbus-serial** - Libreria Modbus TCP/IP
- **HTML/CSS/JavaScript** - Interfaccia utente
- **electron-builder** - Build system

---

## 📝 Script Disponibili

```bash
npm start            # Avvia l'applicazione in modalità sviluppo
npm run build        # Build per tutte le piattaforme
npm run build:win    # Build solo Windows
npm run build:mac    # Build solo macOS
npm run build:linux  # Build solo Linux
```

---

## 🐛 Risoluzione Problemi

### Errore: "Cannot connect to PLC"
- Verifica che il PLC sia acceso e connesso alla rete
- Controlla l'indirizzo IP del PLC
- Verifica che la porta 502 sia aperta
- Assicurati che Modbus TCP/IP sia abilitato sul PLC

### Errore: "Read/Write failed"
- Verifica gli indirizzi Modbus in `variables_complete.json`
- Controlla che l'Unit ID sia corretto
- Alcuni indirizzi potrebbero essere di sola lettura

### L'applicazione non si avvia
- Reinstalla l'applicazione
- Verifica di avere Node.js 18+ installato (per build da sorgente)
- Controlla i log in: `%APPDATA%/SM3000 Configuration Tool/logs/`

---

## 🤝 Contribuire

Questo è un progetto privato per la gestione del PLC SM3000. Per modifiche o miglioramenti:

1. Fork del repository
2. Crea un branch per le tue modifiche
3. Commit delle modifiche
4. Push al branch
5. Crea una Pull Request

---

## 📄 Licenza

MIT License - Vedi file LICENSE per dettagli

---

## 👨‍💻 Autore

**Sviluppato da**: Devin AI  
**Per**: Andrea Vitileia  
**Email**: vitileiaandrea@gmail.com  
**GitHub**: [@Vitileiaandrea](https://github.com/Vitileiaandrea)

---

## 📞 Supporto

Per supporto tecnico o domande:
- Apri un issue su GitHub
- Email: vitileiaandrea@gmail.com

---

## 🎯 Roadmap

### Versione 1.0 (Completata) ✅
- [x] Interfaccia grafica desktop
- [x] Connessione Modbus TCP/IP
- [x] 400+ variabili mappate
- [x] Categorie organizzate
- [x] Read/Write parametri
- [x] Build Windows/Mac/Linux

### Versione 2.0 (In sviluppo) 🚧
- [ ] App Android (APK)
- [ ] Dashboard migliorata con grafici
- [ ] Storico valori
- [ ] Export dati CSV/Excel
- [ ] Profili di configurazione
- [ ] Backup/Restore settings

### Versione 3.0 (Pianificata) 📋
- [ ] Multi-PLC support
- [ ] Remote monitoring
- [ ] Email notifications
- [ ] API REST
- [ ] Web interface

---

**Versione**: 1.0.0  
**Data Rilascio**: Ottobre 2025  
**Ultimo Aggiornamento**: 16 Ottobre 2025  

---

Made with ❤️ for Industrial Automation

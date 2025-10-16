# SM3000 Configuration Tool

Applicazione desktop per la configurazione e gestione parametri del PLC Schneider SM3000.

## Caratteristiche

- ✅ Connessione al PLC tramite Modbus TCP/IP
- ✅ Interfaccia grafica intuitiva e moderna
- ✅ Lettura e scrittura parametri in tempo reale
- ✅ Organizzazione parametri per categorie
- ✅ Compatibile con Windows, Mac e Linux
- ✅ Nessuna installazione di driver necessaria

## Categorie Parametri

1. **Machine Configuration**
   - Length Parameters (parametri di lunghezza)
   - Format Settings (impostazioni formato)
   - Speed Parameters (parametri velocità)

2. **Axis Positions**
   - Current Positions (posizioni correnti)
   - Target Positions (posizioni target)
   - Offsets

3. **Timing Parameters**
   - Cycle Times (tempi ciclo)

4. **Machine Status**
   - Sensors (sensori)
   - Homing Status (stato azzeramento)

5. **Production Data**
   - Counters (contatori)
   - Working Mode (modalità lavoro)

6. **System Settings**
   - Date & Time
   - Language
   - Display

## Requisiti

- Sistema operativo: Windows 10+, macOS 10.13+, o Linux
- Connessione di rete al PLC (Ethernet o WiFi)
- Indirizzo IP del PLC configurato

## Configurazione PLC

Assicurati che il PLC Schneider sia configurato per:
- Protocollo: Modbus TCP/IP
- Porta: 502 (default) o personalizzata
- Unit ID: 1 (default) o personalizzato

## Come Usare

### 1. Avvio Applicazione

Avvia l'applicazione `SM3000 Configuration Tool`.

### 2. Connessione al PLC

1. Inserisci l'**indirizzo IP** del PLC (es: 192.168.1.100)
2. Inserisci la **porta** Modbus (default: 502)
3. Inserisci l'**Unit ID** (default: 1)
4. Clicca su **Connect**

Una volta connesso, lo stato cambierà in "Connected" (verde).

### 3. Lettura Parametri

1. Seleziona una categoria dalla barra laterale sinistra
2. Seleziona un gruppo di parametri
3. Clicca sul pulsante **Read** accanto al parametro che vuoi leggere
4. Il valore corrente sarà mostrato nel campo centrale

### 4. Scrittura Parametri

1. Modifica il valore nel campo di input
2. Clicca sul pulsante **Write** per scrivere il nuovo valore nel PLC
3. Un messaggio di conferma apparirà in alto

### 5. Disconnessione

Clicca sul pulsante **Disconnect** per chiudere la connessione con il PLC.

## Risoluzione Problemi

### Impossibile Connettersi al PLC

- Verifica che l'indirizzo IP sia corretto
- Verifica che il PLC sia acceso e connesso alla rete
- Verifica che la porta Modbus TCP sia abilitata sul PLC
- Controlla il firewall del PC (deve permettere connessioni sulla porta 502)

### Errori di Lettura/Scrittura

- Verifica che gli indirizzi Modbus siano configurati correttamente nel PLC
- Controlla che il PLC non sia in modalità di sicurezza o protetto da password
- Assicurati di avere i permessi di scrittura sui parametri

### L'applicazione non si avvia

- Verifica di avere i diritti di amministratore
- Su macOS, vai in Preferenze di Sistema > Sicurezza e autorizza l'applicazione
- Reinstalla l'applicazione se necessario

## Sviluppo

### Eseguire in modalità sviluppo

```bash
npm install
npm start
```

### Creare pacchetti di installazione

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

I file di installazione saranno creati nella cartella `dist/`.

## Note Tecniche

- **Protocollo**: Modbus TCP/IP
- **Libreria**: modbus-serial (Node.js)
- **Framework**: Electron
- **UI**: HTML/CSS/JavaScript nativo

## Sicurezza

⚠️ **IMPORTANTE**: 
- Non modificare parametri se non si è sicuri della loro funzione
- Fare sempre un backup della configurazione PLC prima di modifiche importanti
- Testare le modifiche in ambiente sicuro prima di applicarle in produzione

## Supporto

Per assistenza tecnica o segnalazione problemi, contattare il supporto tecnico SM3000.

## Versione

**v1.0.0** - Prima release
- Funzionalità complete di lettura/scrittura parametri
- Supporto Modbus TCP/IP
- Interfaccia grafica multi-categoria

---

© 2025 SM3000 - Tutti i diritti riservati

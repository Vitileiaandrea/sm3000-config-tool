# Guida Utente - SM3000 Configuration Tool

## Introduzione

Benvenuto nel **SM3000 Configuration Tool**, l'applicazione desktop per configurare e gestire i parametri del tuo PLC Schneider SM3000 in modo semplice e intuitivo.

## Installazione

### Windows
1. Scarica il file `SM3000-Configuration-Tool-Setup.exe`
2. Esegui il file di installazione
3. Segui le istruzioni guidate
4. Al termine, troverai l'icona sul desktop e nel menu Start

### macOS
1. Scarica il file `SM3000-Configuration-Tool.dmg`
2. Apri il file .dmg
3. Trascina l'icona dell'applicazione nella cartella Applicazioni
4. Al primo avvio, fai clic destro sull'applicazione e seleziona "Apri"

### Linux
1. Scarica il file `SM3000-Configuration-Tool.AppImage`
2. Rendi il file eseguibile: `chmod +x SM3000-Configuration-Tool.AppImage`
3. Esegui il file: `./SM3000-Configuration-Tool.AppImage`

## Prima Configurazione

### Configurazione Rete PLC

Prima di utilizzare l'applicazione, assicurati che:

1. Il PLC sia connesso alla stessa rete del tuo computer (via Ethernet o WiFi)
2. Il PLC abbia un indirizzo IP statico configurato (es: 192.168.1.100)
3. Il protocollo Modbus TCP/IP sia abilitato sul PLC
4. La porta Modbus sia impostata (default: 502)

### Primo Avvio

1. Avvia l'applicazione
2. Inserisci i dati di connessione:
   - **IP Address**: Indirizzo IP del PLC (es: 192.168.1.100)
   - **Port**: Porta Modbus TCP (default: 502)
   - **Unit ID**: ID unità Modbus (default: 1)
3. Clicca su **Connect**

## Utilizzo dell'Applicazione

### Interfaccia Principale

L'applicazione è divisa in tre aree principali:

#### 1. Barra Superiore (Header)
- **Titolo**: SM3000 Configuration Tool
- **Campi Connessione**: IP Address, Port, Unit ID
- **Pulsante Connect/Disconnect**: Per gestire la connessione
- **Indicatore Stato**: Verde = Connesso, Rosso = Disconnesso

#### 2. Barra Laterale (Sidebar)
Contiene le categorie di parametri:
- Machine Configuration
- Axis Positions
- Timing Parameters
- Machine Status
- Production Data
- System Settings

#### 3. Area Centrale (Content Area)
Mostra i parametri della categoria selezionata con:
- Nome parametro
- Campo valore (input)
- Pulsante **Read** (blu)
- Pulsante **Write** (verde)

### Operazioni Base

#### Leggere un Parametro

1. Seleziona una categoria dalla sidebar (es: "Machine Configuration")
2. Trova il parametro che vuoi leggere
3. Clicca sul pulsante **Read** blu accanto al parametro
4. Il valore corrente apparirà nel campo di input

**Esempio**: Per leggere la lunghezza HMI:
- Seleziona "Machine Configuration"
- Trova "LUNGHEZZA_HMI"
- Clicca **Read**
- Il valore viene mostrato

#### Scrivere un Parametro

1. Leggi prima il valore corrente (consigliato)
2. Modifica il valore nel campo di input
3. Clicca sul pulsante **Write** verde
4. Attendi il messaggio di conferma

**Esempio**: Per modificare la velocità dello spintore:
- Seleziona "Machine Configuration" → "Speed Parameters"
- Trova "VELOCITA_SPINTORE"
- Inserisci il nuovo valore (es: 1500)
- Clicca **Write**
- Attendi conferma "Value written successfully"

#### Parametri Booleani (ON/OFF)

Alcuni parametri sono di tipo booleano (checkbox):
- **Checked (✓)** = TRUE / Attivo
- **Unchecked ( )** = FALSE / Disattivo

**Esempio**: Sensori e stati di homing sono parametri booleani.

### Categorie Parametri Dettagliate

#### Machine Configuration (Configurazione Macchina)

**Length Parameters**
- Parametri di lunghezza prodotto e stecchi
- Valori tipici: da 100 a 3000 mm

**Format Settings**
- Impostazioni formato lavorazione
- Coordinate X e Y

**Speed Parameters**
- Velocità massima e minima
- Spintore e caricatore
- Valori tipici: da 100 a 5000 mm/min

#### Axis Positions (Posizioni Assi)

**Current Positions**
- Posizione attuale degli assi in tempo reale
- Solo lettura (non modificare direttamente)

**Target Positions**
- Posizione target richiesta
- Scrivibile per spostare gli assi

**Offsets**
- Offset e compensazioni
- Modificare con attenzione

#### Timing Parameters (Parametri Temporizzazione)

**Cycle Times**
- Tempi ciclo massimi e minimi
- Tempo salita/discesa caricatore
- Valori in millisecondi

#### Machine Status (Stato Macchina)

**Sensors**
- Stato sensori in tempo reale
- Solo lettura
- Utile per diagnostica

**Homing Status**
- Stato azzeramento assi
- Verde (✓) = Azzerato correttamente
- Vuoto ( ) = Non azzerato

#### Production Data (Dati Produzione)

**Counters**
- Contatore pezzi prodotti
- Ore di lavoro reali
- Ore macchina accesa

**Working Mode**
- Modalità stecco singolo o doppio
- Solo uno può essere attivo

#### System Settings (Impostazioni Sistema)

**Date & Time**
- Data e ora del PLC
- Sincronizzazione

**Language**
- Selezione lingua HMI
- Italiano, Inglese, Francese, ecc.

## Operazioni Avanzate

### Backup Configurazione

⚠️ Prima di modificare parametri importanti:

1. Annota i valori originali su carta
2. Oppure fai screenshot dell'applicazione
3. Oppure usa la funzione di esportazione del PLC (se disponibile)

### Ripristino Valori

Se un parametro non funziona correttamente:

1. Leggi il valore attuale con **Read**
2. Ripristina il valore originale annotato
3. Scrivi il valore con **Write**
4. Verifica il funzionamento della macchina

### Diagnosi Problemi

**La macchina non parte dopo modifica parametri**
- Verifica gli stati di homing (Machine Status → Homing Status)
- Controlla i sensori (Machine Status → Sensors)
- Ripristina i valori originali

**Movimenti troppo lenti/veloci**
- Controlla Speed Parameters
- Verifica MIN e MAX siano corretti
- Assicurati che MIN < MAX

## Messaggi di Errore

| Messaggio | Causa | Soluzione |
|-----------|-------|-----------|
| "Connection failed" | PLC non raggiungibile | Verifica IP e cavo di rete |
| "Read failed" | Indirizzo non valido | Contatta supporto tecnico |
| "Write failed" | Parametro protetto | Verifica permessi PLC |
| "Not connected to PLC" | Connessione assente | Clicca Connect |

## Consigli di Sicurezza

### ⚠️ ATTENZIONE

- ❌ NON modificare parametri se non si è sicuri
- ❌ NON testare in produzione senza prima testare in sicurezza
- ✅ Annotare SEMPRE i valori originali prima di modificare
- ✅ Verificare che la macchina sia in sicurezza prima di scrivere
- ✅ Testare un parametro alla volta
- ✅ Fare backup regolari della configurazione

### Procedura Sicura di Modifica

1. **STOP macchina** → Metti la macchina in sicurezza
2. **LEGGI** → Leggi e annota il valore attuale
3. **MODIFICA** → Cambia il valore nell'applicazione
4. **SCRIVI** → Scrivi il nuovo valore
5. **VERIFICA** → Controlla che il valore sia stato scritto
6. **TEST** → Testa la macchina in modalità manuale
7. **PRODUZIONE** → Solo dopo test OK, torna in produzione

## Domande Frequenti (FAQ)

**Q: Posso usare l'applicazione mentre la macchina è in funzione?**
A: Sì per leggere parametri, NO per scrivere durante lavorazione.

**Q: Quante connessioni simultanee sono possibili?**
A: Una sola applicazione può essere connessa al PLC alla volta.

**Q: I parametri vengono salvati automaticamente?**
A: Sì, le modifiche sono permanenti e salvate nel PLC.

**Q: Cosa succede se perdo la connessione durante la scrittura?**
A: La scrittura potrebbe non essere completata. Riconnettiti e verifica.

**Q: Posso usare WiFi invece di cavo Ethernet?**
A: Sì, se il PLC è connesso alla rete WiFi o tramite un access point.

**Q: Funziona su tablet o smartphone?**
A: No, è solo per PC/Mac desktop. (Versione mobile in sviluppo)

## Supporto Tecnico

Per assistenza:
- 📧 Email: [email protected]
- 📞 Telefono: +39 XXX XXX XXXX
- 🌐 Web: www.sm3000.com/support

## Aggiornamenti

Verifica periodicamente la disponibilità di nuove versioni su www.sm3000.com/downloads

---

**Versione Guida**: 1.0
**Data**: Ottobre 2025
**Applicazione**: SM3000 Configuration Tool v1.0.0

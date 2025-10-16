const variablesStructure = {
    "Machine Configuration": {
        "Length Parameters": [
            { name: "LUNGHEZZA_HMI", address: 100, type: "INT" },
            { name: "LUNGHEZZA_PRODOTTO_1", address: 101, type: "INT" },
            { name: "LUNGHEZZA_PRODOTTO_2", address: 102, type: "INT" },
            { name: "LUNGHEZZA_STECCO", address: 103, type: "INT" },
            { name: "LUNGHEZZA_STECCO_1", address: 104, type: "INT" },
            { name: "LUNGHEZZA_STECCO_2", address: 105, type: "INT" },
            { name: "ESTENS_QUOTA_LUNG_HMI", address: 106, type: "INT" }
        ],
        "Format Settings": [
            { name: "FORMATO_X_VERSO_HMI", address: 200, type: "INT" },
            { name: "FORMATO_Y_VERSO_HMI", address: 201, type: "INT" },
            { name: "VAR_FORMATI_XBT", address: 202, type: "INT" },
            { name: "VAR_LUNGHEZZE_XBT", address: 203, type: "INT" },
            { name: "VAR_STECCO_XBT", address: 204, type: "INT" }
        ],
        "Speed Parameters": [
            { name: "VELOCITA_SPINTORE", address: 300, type: "INT" },
            { name: "VELOC_MAX_SPINTORE", address: 301, type: "INT" },
            { name: "VELOC_MIN_SPINTORE", address: 302, type: "INT" },
            { name: "VELOC_MAX_SALITA_CARICATORE", address: 303, type: "INT" },
            { name: "VELOC_MIN_SALITA_CARICATORE", address: 304, type: "INT" },
            { name: "VELOC_MAX_DISCESA_CARICATORE", address: 305, type: "INT" },
            { name: "VELOC_MIN_DISCESA_CARICATORE", address: 306, type: "INT" }
        ]
    },
    "Axis Positions": {
        "Current Positions": [
            { name: "QUOTA_ASSE_CEPPI", address: 400, type: "INT" },
            { name: "QUOTA_ASSE_CARICATORE", address: 401, type: "INT" }
        ],
        "Target Positions": [
            { name: "QUOTA_ASSE_CEPPI_RICHIESTA", address: 410, type: "INT" },
            { name: "QUOTA_CARICATORE_RICHIESTA", address: 411, type: "INT" }
        ],
        "Offsets": [
            { name: "OFFSET_ASSE_CEPPI", address: 420, type: "INT" },
            { name: "POSIZIONE_IMMISSIONE", address: 421, type: "INT" },
            { name: "POSIZIONE_IMMISSIONE_SETTAGGI", address: 422, type: "INT" }
        ]
    },
    "Timing Parameters": {
        "Cycle Times": [
            { name: "TEMPO_MASSIMO", address: 500, type: "INT" },
            { name: "TEMPO_MINIMO", address: 501, type: "INT" },
            { name: "TEMPO_SAL_DIS_CARICATORE", address: 502, type: "INT" }
        ]
    },
    "Machine Status": {
        "Sensors": [
            { name: "Pressostato_aria_generale", address: 1000, type: "BOOL" },
            { name: "SENSORE_SALITA_CARICATORE", address: 1001, type: "BOOL" },
            { name: "SENSORE_DISCESA_CARICATORE", address: 1002, type: "BOOL" },
            { name: "SENS_SALITA_LAME", address: 1003, type: "BOOL" },
            { name: "SENS_DISCESA_LAME", address: 1004, type: "BOOL" },
            { name: "SENS_AVANTI_AGHI_LUNG_1", address: 1005, type: "BOOL" },
            { name: "SENS_AVANTI_AGHI_LUNG_2", address: 1006, type: "BOOL" },
            { name: "Sensore_porta_DX", address: 1007, type: "BOOL" },
            { name: "Sensore_porta_SX", address: 1008, type: "BOOL" }
        ],
        "Homing Status": [
            { name: "OK_HOME_ASSE_CARRO", address: 1100, type: "BOOL" },
            { name: "OK_HOME_CARICATORE_CEPPI", address: 1101, type: "BOOL" },
            { name: "OK_HOME_CENTRALINA_SICUREZZA", address: 1102, type: "BOOL" },
            { name: "OK_HOME_INDIETRO_AGHI", address: 1103, type: "BOOL" },
            { name: "OK_HOME_INDIETRO_SPINTORE", address: 1104, type: "BOOL" },
            { name: "OK_HOME_PRESSIONE_ARIA", address: 1105, type: "BOOL" },
            { name: "OK_HOME_SALITA_LAME", address: 1106, type: "BOOL" }
        ]
    },
    "Production Data": {
        "Counters": [
            { name: "CONTATORE_PEZZI", address: 600, type: "INT" },
            { name: "ORE_LAVORO_REALI", address: 601, type: "INT" },
            { name: "ORE_MACCHINA_ACCESA", address: 602, type: "INT" }
        ],
        "Working Mode": [
            { name: "STECCO_SINGOLO", address: 1200, type: "BOOL" },
            { name: "STECCO_DOPPIO", address: 1201, type: "BOOL" }
        ]
    },
    "System Settings": {
        "Date & Time": [
            { name: "GIORNO_HMI", address: 700, type: "INT" },
            { name: "MESE_HMI", address: 701, type: "INT" },
            { name: "ORA_HMI", address: 702, type: "INT" },
            { name: "MINUTI_HMI", address: 703, type: "INT" }
        ],
        "Language": [
            { name: "SCELTA_LINGUA", address: 800, type: "INT" },
            { name: "ITALIANO", address: 1300, type: "BOOL" },
            { name: "INGLESE", address: 1301, type: "BOOL" },
            { name: "FRANCESE", address: 1302, type: "BOOL" },
            { name: "SPAGNOLO", address: 1303, type: "BOOL" },
            { name: "RUMENO", address: 1304, type: "BOOL" }
        ]
    }
};

class SM3000App {
    constructor() {
        this.connected = false;
        this.currentCategory = null;
        this.parameterValues = {};
        this.init();
    }

    init() {
        this.renderHeader();
        this.renderSidebar();
        this.renderContent();
        this.updateConnectionStatus();
    }

    renderHeader() {
        const header = document.createElement('div');
        header.className = 'header';
        header.innerHTML = `
            <h1>🔧 SM3000 Configuration Tool</h1>
            <div class="connection-panel">
                <input type="text" id="ipAddress" placeholder="IP Address" value="192.168.1.100">
                <input type="number" id="port" placeholder="Port" value="502" style="width: 80px;">
                <input type="number" id="unitId" placeholder="Unit ID" value="1" style="width: 80px;">
                <button id="connectBtn" onclick="app.toggleConnection()">Connect</button>
                <div class="connection-status disconnected" id="connectionStatus">Disconnected</div>
            </div>
        `;
        
        const root = document.getElementById('root');
        root.appendChild(header);
    }

    renderSidebar() {
        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';

        const sidebar = document.createElement('div');
        sidebar.className = 'sidebar';
        sidebar.innerHTML = '<h3>Parameter Categories</h3>';

        const specialItems = [
            { id: '__LIVE_DASHBOARD__', label: '🔴 Live I/O Monitor', icon: '🔴' },
            { id: '__MANUAL_CONTROL__', label: '🎮 Controllo Manuale', icon: '🎮' }
        ];

        specialItems.forEach(special => {
            const item = document.createElement('div');
            item.className = 'category-item';
            item.textContent = special.label;
            item.style.fontWeight = '600';
            item.style.background = '#fff9e6';
            item.onclick = () => this.selectCategory(special.id);
            sidebar.appendChild(item);
        });

        const separator = document.createElement('div');
        separator.style.height = '2px';
        separator.style.background = '#dee2e6';
        separator.style.margin = '15px 0';
        sidebar.appendChild(separator);

        Object.keys(variablesStructure).forEach(category => {
            const item = document.createElement('div');
            item.className = 'category-item';
            item.textContent = category;
            item.onclick = () => this.selectCategory(category);
            sidebar.appendChild(item);
        });

        mainContainer.appendChild(sidebar);
        
        const contentArea = document.createElement('div');
        contentArea.className = 'content-area';
        contentArea.id = 'contentArea';
        mainContainer.appendChild(contentArea);

        document.getElementById('root').appendChild(mainContainer);
    }

    selectCategory(category) {
        this.currentCategory = category;
        
        const labelMap = {
            '__LIVE_DASHBOARD__': '🔴 Live I/O Monitor',
            '__MANUAL_CONTROL__': '🎮 Controllo Manuale'
        };
        
        const displayLabel = labelMap[category] || category;
        
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
            if (item.textContent === displayLabel) {
                item.classList.add('active');
            }
        });

        this.renderContent();
    }

    renderContent() {
        const contentArea = document.getElementById('contentArea');
        
        if (!this.currentCategory) {
            contentArea.innerHTML = `
                <div class="loading">
                    <h2>👈 Select a category from the sidebar to view and edit parameters</h2>
                </div>
            `;
            return;
        }

        const categoryData = variablesStructure[this.currentCategory];
        let html = '';

        Object.keys(categoryData).forEach(subcategory => {
            html += `
                <div class="parameter-group">
                    <h2>${subcategory}</h2>
                    ${this.renderParameterRows(categoryData[subcategory])}
                </div>
            `;
        });

        contentArea.innerHTML = html;
    }

    renderParameterRows(parameters) {
        return parameters.map(param => `
            <div class="parameter-row">
                <div class="parameter-name">${param.name}</div>
                <input 
                    type="${param.type === 'BOOL' ? 'checkbox' : 'number'}" 
                    class="parameter-value" 
                    id="param_${param.address}"
                    ${param.type === 'BOOL' ? '' : 'value="0"'}
                    ${!this.connected ? 'disabled' : ''}
                />
                <div style="display: flex; gap: 5px;">
                    <button class="btn-read" onclick="app.readParameter(${param.address}, '${param.type}')" ${!this.connected ? 'disabled' : ''}>Read</button>
                    <button class="btn-write" onclick="app.writeParameter(${param.address}, '${param.type}')" ${!this.connected ? 'disabled' : ''}>Write</button>
                </div>
            </div>
        `).join('');
    }

    async toggleConnection() {
        const btn = document.getElementById('connectBtn');
        const ipAddress = document.getElementById('ipAddress').value;
        const port = parseInt(document.getElementById('port').value);
        const unitId = parseInt(document.getElementById('unitId').value);

        if (this.connected) {
            const result = await window.plcAPI.disconnect();
            if (result.success) {
                this.connected = false;
                btn.textContent = 'Connect';
                this.showMessage(result.message, 'success');
            }
        } else {
            btn.disabled = true;
            btn.textContent = 'Connecting...';
            
            const result = await window.plcAPI.connect(ipAddress, port, unitId);
            
            if (result.success) {
                this.connected = true;
                btn.textContent = 'Disconnect';
                this.showMessage(result.message, 'success');
                this.renderContent();
            } else {
                btn.textContent = 'Connect';
                this.showMessage(result.message, 'error');
            }
            
            btn.disabled = false;
        }

        this.updateConnectionStatus();
    }

    updateConnectionStatus() {
        const status = document.getElementById('connectionStatus');
        if (this.connected) {
            status.textContent = 'Connected';
            status.className = 'connection-status connected';
        } else {
            status.textContent = 'Disconnected';
            status.className = 'connection-status disconnected';
        }
    }

    async readParameter(address, type) {
        if (!this.connected) {
            this.showMessage('Not connected to PLC', 'error');
            return;
        }

        const inputElement = document.getElementById(`param_${address}`);
        
        console.log(`Reading ${type} from address ${address}`);
        
        try {
            if (type === 'BOOL') {
                console.log('Calling readCoils...');
                const result = await window.plcAPI.readCoils(address, 1);
                console.log('Read coils result:', result);
                if (result.success) {
                    inputElement.checked = result.data[0];
                    this.showMessage(`✓ Read value: ${result.data[0]}`, 'success');
                } else {
                    this.showMessage(`✗ ${result.message}`, 'error');
                }
            } else {
                console.log('Calling readHoldingRegisters...');
                const result = await window.plcAPI.readHoldingRegisters(address, 1);
                console.log('Read holding registers result:', result);
                if (result.success) {
                    inputElement.value = result.data[0];
                    this.showMessage(`✓ Read value: ${result.data[0]}`, 'success');
                } else {
                    this.showMessage(`✗ ${result.message}`, 'error');
                }
            }
        } catch (error) {
            console.error('Read error:', error);
            this.showMessage(`✗ Read error: ${error.message}`, 'error');
        }
    }

    async writeParameter(address, type) {
        if (!this.connected) {
            this.showMessage('Not connected to PLC', 'error');
            return;
        }

        const inputElement = document.getElementById(`param_${address}`);
        
        try {
            if (type === 'BOOL') {
                const value = inputElement.checked;
                const result = await window.plcAPI.writeCoil(address, value);
                if (result.success) {
                    this.showMessage(result.message, 'success');
                } else {
                    this.showMessage(result.message, 'error');
                }
            } else {
                const value = parseInt(inputElement.value);
                const result = await window.plcAPI.writeHoldingRegister(address, value);
                if (result.success) {
                    this.showMessage(result.message, 'success');
                } else {
                    this.showMessage(result.message, 'error');
                }
            }
        } catch (error) {
            this.showMessage(`Write error: ${error.message}`, 'error');
        }
    }

    showMessage(message, type) {
        const contentArea = document.getElementById('contentArea');
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
        messageDiv.textContent = message;
        
        contentArea.insertBefore(messageDiv, contentArea.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new SM3000App();
});

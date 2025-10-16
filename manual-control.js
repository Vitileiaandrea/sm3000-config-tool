// Manual Control Extension for SM3000
// Adds manual control panel for pistons, motors, and outputs

if (!window.manualControlAdded) {
    window.manualControlAdded = true;
    
    // Define manual control outputs
    window.manualControls = {
        "Pistoni": [
            { name: "Spintore Avanti", address: 400, icon: "➡️" },
            { name: "Spintore Indietro", address: 401, icon: "⬅️" },
            { name: "Lame Su", address: 410, icon: "⬆️" },
            { name: "Lame Giù", address: 411, icon: "⬇️" },
            { name: "Caricatore Su", address: 420, icon: "⬆️" },
            { name: "Caricatore Giù", address: 421, icon: "⬇️" },
            { name: "Aghi Avanti", address: 430, icon: "➡️" },
            { name: "Aghi Indietro", address: 431, icon: "⬅️" },
            { name: "Morsa Aperta", address: 440, icon: "🔓" },
            { name: "Morsa Chiusa", address: 441, icon: "🔒" }
        ],
        "Valvole": [
            { name: "Abilitazione Valvole", address: 450, icon: "🔧" },
            { name: "Elettrovalvola Aria", address: 451, icon: "💨" }
        ],
        "Luci Spia": [
            { name: "Spia Start Ceppi", address: 500, icon: "💡" },
            { name: "Spia Start Taglio", address: 501, icon: "💡" },
            { name: "Spia Pausa", address: 502, icon: "💡" },
            { name: "Spia Marcia", address: 503, icon: "💡" },
            { name: "Spia Reset", address: 504, icon: "💡" }
        ]
    };
    
    // Override renderContent to add manual control
    const originalRenderContent2 = SM3000App.prototype.renderContent;
    SM3000App.prototype.renderContent = function() {
        if (this.currentCategory === '__MANUAL_CONTROL__') {
            this.renderManualControl();
        } else if (this.currentCategory === '__LIVE_DASHBOARD__') {
            this.renderLiveDashboard();
        } else {
            originalRenderContent2.call(this);
        }
    };
    
    // Render manual control panel
    SM3000App.prototype.renderManualControl = function() {
        const contentArea = document.getElementById('contentArea');
        
        if (!this.connected) {
            contentArea.innerHTML = `
                <div class="parameter-group">
                    <h2>⚠️ Controllo Manuale</h2>
                    <div style="text-align: center; padding: 40px; color: #999;">
                        Connettiti al PLC per utilizzare il controllo manuale
                    </div>
                </div>
            `;
            return;
        }
        
        let html = `
            <div class="parameter-group">
                <h2>🎮 Controllo Manuale</h2>
                <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ffc107;">
                    <strong>⚠️ ATTENZIONE:</strong> Utilizzare solo con la macchina in modalità manuale e in sicurezza!
                </div>
            </div>
        `;
        
        for (const group in window.manualControls) {
            html += `
                <div class="parameter-group">
                    <h2>${group}</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
            `;
            
            window.manualControls[group].forEach(control => {
                const id = `manual_${control.address}`;
                html += `
                    <div style="
                        padding: 15px;
                        background: #f8f9fa;
                        border-radius: 8px;
                        border: 2px solid #dee2e6;
                        text-align: center;
                    ">
                        <div style="font-size: 32px; margin-bottom: 10px;">${control.icon}</div>
                        <div style="font-weight: 600; margin-bottom: 10px; font-size: 14px;">${control.name}</div>
                        <label style="display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer;">
                            <input 
                                type="checkbox" 
                                id="${id}"
                                onchange="app.toggleManualOutput(${control.address}, this.checked)"
                                style="width: 20px; height: 20px; cursor: pointer;"
                            />
                            <span id="${id}_label" style="font-weight: 500;">OFF</span>
                        </label>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        }
        
        html += `
            <div class="parameter-group">
                <h2>🔄 Aggiornamento Stato</h2>
                <button onclick="app.refreshManualControlStatus()" style="width: 100%; padding: 15px; font-size: 16px;">
                    ↻ Aggiorna Stato Uscite
                </button>
            </div>
        `;
        
        contentArea.innerHTML = html;
        
        // Auto-refresh status on load
        setTimeout(() => this.refreshManualControlStatus(), 500);
    };
    
    // Toggle manual output
    SM3000App.prototype.toggleManualOutput = async function(address, value) {
        if (!this.connected) {
            this.showMessage('Non connesso al PLC', 'error');
            return;
        }
        
        try {
            console.log(`Setting output ${address} to ${value}`);
            const result = await window.plcAPI.writeCoil(address, value);
            
            if (result.success) {
                const label = document.getElementById(`manual_${address}_label`);
                if (label) {
                    label.textContent = value ? 'ON' : 'OFF';
                    label.style.color = value ? '#4CAF50' : '#666';
                }
                this.showMessage(`✓ Uscita ${address}: ${value ? 'ON' : 'OFF'}`, 'success');
            } else {
                this.showMessage(`✗ ${result.message}`, 'error');
                // Reset checkbox on error
                const checkbox = document.getElementById(`manual_${address}`);
                if (checkbox) checkbox.checked = !value;
            }
        } catch (error) {
            console.error('Error toggling output:', error);
            this.showMessage(`✗ Errore: ${error.message}`, 'error');
            const checkbox = document.getElementById(`manual_${address}`);
            if (checkbox) checkbox.checked = !value;
        }
    };
    
    // Refresh manual control status
    SM3000App.prototype.refreshManualControlStatus = async function() {
        if (!this.connected) return;
        
        this.showMessage('⏳ Aggiornamento stato...', 'success');
        
        for (const group in window.manualControls) {
            for (const control of window.manualControls[group]) {
                try {
                    const result = await window.plcAPI.readCoils(control.address, 1);
                    if (result.success) {
                        const value = result.data[0];
                        const checkbox = document.getElementById(`manual_${control.address}`);
                        const label = document.getElementById(`manual_${control.address}_label`);
                        
                        if (checkbox) checkbox.checked = value;
                        if (label) {
                            label.textContent = value ? 'ON' : 'OFF';
                            label.style.color = value ? '#4CAF50' : '#666';
                        }
                    }
                } catch (error) {
                    console.error(`Error reading ${control.name}:`, error);
                }
            }
        }
        
        this.showMessage('✓ Stato aggiornato!', 'success');
    };
}

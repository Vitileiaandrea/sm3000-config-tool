// Manual Control Extension for SM3000
// Adds manual control panel for pistons, motors, and outputs

if (!window.manualControlAdded) {
    window.manualControlAdded = true;
    
    // Define manual control outputs (using %Q addresses from Unity Pro)
    window.manualControls = {
        "Pistoni": [
            { name: "Spintore Avanti", address: 16, icon: "➡️", desc: "%Q0.2.16 - q_CmdAvantiSpint" },
            { name: "Lame Su", address: 7, icon: "⬆️", desc: "%Q0.2.7 - q_SalLame" },
            { name: "Lame Giù", address: 8, icon: "⬇️", desc: "%Q0.2.8 - q_DiscLame" },
            { name: "Caricatore Su", address: 10, icon: "⬆️", desc: "%Q0.2.10 - q_CmdSalCarCeppi" },
            { name: "Caricatore Giù", address: 9, icon: "⬇️", desc: "%Q0.2.9 - q_CmdDisCarCeppi" },
            { name: "Aghi Avanti", address: 15, icon: "➡️", desc: "%Q0.2.15 - q_CmdAvantiAghi" },
            { name: "Cubo Taglio Su", address: 14, icon: "⬆️", desc: "%Q0.2.14 - q_SalitaCuboTaglio" },
            { name: "Cubo Taglio Giù", address: 13, icon: "⬇️", desc: "%Q0.2.13 - q_DiscesaCuboTaglio" }
        ],
        "Cubo Ceppi": [
            { name: "Apre Cubo", address: 11, icon: "🔓", desc: "%Q0.2.11 - q_ApreCuboCeppi" },
            { name: "Chiude Cubo", address: 12, icon: "🔒", desc: "%Q0.2.12 - q_ChiudeCuboCeppi" }
        ],
        "Valvole": [
            { name: "Elettrovalvola Aria", address: 5, icon: "💨", desc: "%Q0.2.5 - q_EVAria" }
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
                    <div class="control-card" id="${id}_card">
                        <span class="control-icon">${control.icon}</span>
                        <div class="control-name">${control.name}</div>
                        <div style="font-size: 12px; color: #666; margin-bottom: 15px;">${control.desc}</div>
                        <label class="toggle-switch">
                            <input 
                                type="checkbox" 
                                id="${id}"
                                onchange="app.toggleManualOutput(${control.address}, this.checked)"
                            />
                            <span class="toggle-slider"></span>
                        </label>
                        <div style="margin-top: 10px;">
                            <span id="${id}_label" style="font-weight: 600; font-size: 14px; color: #666;">OFF</span>
                        </div>
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
                <button onclick="app.refreshManualControlStatus()" class="btn-manual" style="width: 100%;">
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
                const card = document.getElementById(`manual_${address}_card`);
                if (label) {
                    label.textContent = value ? 'ON' : 'OFF';
                    label.style.color = value ? '#4CAF50' : '#666';
                }
                if (card) {
                    if (value) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
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
                        const card = document.getElementById(`manual_${control.address}_card`);
                        
                        if (checkbox) checkbox.checked = value;
                        if (label) {
                            label.textContent = value ? 'ON' : 'OFF';
                            label.style.color = value ? '#4CAF50' : '#666';
                        }
                        if (card) {
                            if (value) {
                                card.classList.add('active');
                            } else {
                                card.classList.remove('active');
                            }
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

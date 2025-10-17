// Dashboard Real-Time Monitoring Extension
// Add this to app.js to enable live I/O monitoring

// Add "Live I/O Monitor" category to variables structure
if (!window.dashboardAdded) {
    window.dashboardAdded = true;
    
    // Store original renderContent
    const originalRenderContent = SM3000App.prototype.renderContent;
    
    // Override renderContent to add dashboard
    SM3000App.prototype.renderContent = function() {
        if (this.currentCategory === '__LIVE_DASHBOARD__') {
            this.renderLiveDashboard();
        } else {
            originalRenderContent.call(this);
        }
    };
    
    // Add Live Dashboard rendering
    SM3000App.prototype.renderLiveDashboard = function() {
        const contentArea = document.getElementById('contentArea');
        
        contentArea.innerHTML = `
            <div class="parameter-group">
                <h2>🔴 Live I/O Monitor - Real Time</h2>
                <div style="margin: 20px 0; padding: 15px; background: #f0f8ff; border-radius: 8px;">
                    <span id="dashboardStatus">⏸️ Paused</span>
                    <button onclick="app.toggleDashboardRefresh()" id="refreshToggle" style="margin-left: 15px;">▶️ Start Monitoring</button>
                    <span style="margin-left: 15px;">Refresh: <span id="refreshInterval">1s</span></span>
                </div>
                <div id="liveIOContent">Loading...</div>
            </div>
        `;
        
        this.initializeLiveDashboard();
    };
    
    // Initialize live dashboard
    SM3000App.prototype.initializeLiveDashboard = async function() {
        if (!this.connected) {
            document.getElementById('liveIOContent').innerHTML = 
                '<div style="text-align: center; padding: 40px; color: #999;">⚠️ Connect to PLC to view live I/O</div>';
            return;
        }
        
        // Load all BOOL variables for I/O monitoring
        await this.loadDashboardVariables();
        this.renderDashboardGrid();
        
        setTimeout(() => {
            if (!this.dashboardInterval) {
                this.toggleDashboardRefresh();
            }
        }, 500);
    };
    
    // Load variables for dashboard
    SM3000App.prototype.loadDashboardVariables = async function() {
        // Extract all BOOL variables
        this.dashboardVars = [];
        
        try {
            const response = await fetch('variables_complete.json');
            const data = await response.json();
            
            for (const category in data) {
                for (const group in data[category]) {
                    for (const variable of data[category][group]) {
                        if (variable.type === 'BOOL') {
                            this.dashboardVars.push({
                                name: variable.name,
                                address: variable.address,
                                category: category,
                                group: group
                            });
                        }
                    }
                }
            }
            
            console.log(`Dashboard: Loaded ${this.dashboardVars.length} I/O variables`);
        } catch (error) {
            console.error('Dashboard: Error loading variables', error);
        }
    };
    
    // Render dashboard grid
    SM3000App.prototype.renderDashboardGrid = function() {
        const content = document.getElementById('liveIOContent');
        
        let html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 10px;">';
        
        this.dashboardVars.forEach(v => {
            html += `
                <div class="io-indicator" id="io_${v.address}" style="
                    padding: 12px;
                    background: #f5f5f5;
                    border-radius: 6px;
                    border-left: 4px solid #ccc;
                    transition: all 0.3s;
                    font-size: 13px;
                ">
                    <div style="font-weight: 600; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${v.name}</div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 11px; color: #666;">${v.category}</span>
                        <span id="value_${v.address}" style="font-size: 18px;">⚪</span>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        content.innerHTML = html;
    };
    
    // Toggle dashboard auto-refresh
    SM3000App.prototype.toggleDashboardRefresh = function() {
        if (this.dashboardInterval) {
            clearInterval(this.dashboardInterval);
            this.dashboardInterval = null;
            document.getElementById('dashboardStatus').textContent = '⏸️ Paused';
            document.getElementById('refreshToggle').textContent = '▶️ Start Monitoring';
        } else {
            this.dashboardInterval = setInterval(() => this.refreshDashboard(), 1000);
            document.getElementById('dashboardStatus').textContent = '🔴 LIVE';
            document.getElementById('refreshToggle').textContent = '⏸️ Pause';
            this.refreshDashboard(); // Immediate refresh
        }
    };
    
    // Refresh dashboard data
    SM3000App.prototype.refreshDashboard = async function() {
        if (!this.connected || !this.dashboardVars) return;
        
        for (const variable of this.dashboardVars) {
            try {
                const result = await window.plcAPI.readCoils(variable.address, 1);
                if (result.success) {
                    const value = result.data[0];
                    const indicator = document.getElementById(`io_${variable.address}`);
                    const valueSpan = document.getElementById(`value_${variable.address}`);
                    
                    if (indicator && valueSpan) {
                        if (value) {
                            indicator.style.borderLeftColor = '#4CAF50';
                            indicator.style.background = '#e8f5e9';
                            valueSpan.textContent = '🟢';
                        } else {
                            indicator.style.borderLeftColor = '#ccc';
                            indicator.style.background = '#f5f5f5';
                            valueSpan.textContent = '⚪';
                        }
                    }
                }
            } catch (error) {
                console.error(`Error reading ${variable.name}:`, error);
            }
        }
    };
}

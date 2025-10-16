const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ModbusRTU = require('modbus-serial');

let mainWindow;
let modbusClient = null;
let isConnected = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    title: 'SM3000 Configuration Tool',
    icon: path.join(__dirname, 'icon.png')
  });

  mainWindow.loadFile('index.html');
  
  mainWindow.on('closed', () => {
    if (modbusClient && isConnected) {
      modbusClient.close(() => {});
    }
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('connect-plc', async (event, { ipAddress, port, unitId }) => {
  try {
    if (modbusClient) {
      try {
        await modbusClient.close();
      } catch (e) {}
    }

    modbusClient = new ModbusRTU();
    modbusClient.setTimeout(5000);
    
    await modbusClient.connectTCP(ipAddress, { port: port || 502 });
    modbusClient.setID(unitId || 1);
    
    isConnected = true;
    return { success: true, message: 'Connected successfully to PLC' };
  } catch (error) {
    isConnected = false;
    return { success: false, message: `Connection failed: ${error.message}` };
  }
});

ipcMain.handle('disconnect-plc', async () => {
  try {
    if (modbusClient && isConnected) {
      await modbusClient.close();
      isConnected = false;
    }
    return { success: true, message: 'Disconnected from PLC' };
  } catch (error) {
    return { success: false, message: `Disconnect failed: ${error.message}` };
  }
});

ipcMain.handle('read-holding-registers', async (event, { address, length }) => {
  try {
    console.log(`[Main] Reading holding registers: address=${address}, length=${length}`);
    if (!isConnected || !modbusClient) {
      throw new Error('Not connected to PLC');
    }
    
    const data = await modbusClient.readHoldingRegisters(address, length);
    console.log(`[Main] Read successful, data:`, data.data);
    return { success: true, data: data.data };
  } catch (error) {
    console.error(`[Main] Read failed:`, error.message);
    return { success: false, message: `Read failed: ${error.message}` };
  }
});

ipcMain.handle('write-holding-register', async (event, { address, value }) => {
  try {
    if (!isConnected || !modbusClient) {
      throw new Error('Not connected to PLC');
    }
    
    await modbusClient.writeRegister(address, value);
    return { success: true, message: 'Value written successfully' };
  } catch (error) {
    return { success: false, message: `Write failed: ${error.message}` };
  }
});

ipcMain.handle('write-holding-registers', async (event, { address, values }) => {
  try {
    if (!isConnected || !modbusClient) {
      throw new Error('Not connected to PLC');
    }
    
    await modbusClient.writeRegisters(address, values);
    return { success: true, message: 'Values written successfully' };
  } catch (error) {
    return { success: false, message: `Write failed: ${error.message}` };
  }
});

ipcMain.handle('read-coils', async (event, { address, length }) => {
  try {
    if (!isConnected || !modbusClient) {
      throw new Error('Not connected to PLC');
    }
    
    const data = await modbusClient.readCoils(address, length);
    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, message: `Read failed: ${error.message}` };
  }
});

ipcMain.handle('write-coil', async (event, { address, value }) => {
  try {
    if (!isConnected || !modbusClient) {
      throw new Error('Not connected to PLC');
    }
    
    await modbusClient.writeCoil(address, value);
    return { success: true, message: 'Coil written successfully' };
  } catch (error) {
    return { success: false, message: `Write failed: ${error.message}` };
  }
});

ipcMain.handle('get-connection-status', async () => {
  return { connected: isConnected };
});

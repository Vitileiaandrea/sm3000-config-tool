const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('plcAPI', {
  connect: (ipAddress, port, unitId) => 
    ipcRenderer.invoke('connect-plc', { ipAddress, port, unitId }),
  
  disconnect: () => 
    ipcRenderer.invoke('disconnect-plc'),
  
  readHoldingRegisters: (address, length) => 
    ipcRenderer.invoke('read-holding-registers', { address, length }),
  
  writeHoldingRegister: (address, value) => 
    ipcRenderer.invoke('write-holding-register', { address, value }),
  
  writeHoldingRegisters: (address, values) => 
    ipcRenderer.invoke('write-holding-registers', { address, values }),
  
  readCoils: (address, length) => 
    ipcRenderer.invoke('read-coils', { address, length }),
  
  writeCoil: (address, value) => 
    ipcRenderer.invoke('write-coil', { address, value }),
  
  getConnectionStatus: () => 
    ipcRenderer.invoke('get-connection-status'),
  
  readBoolBit: (address, bit) => 
    ipcRenderer.invoke('read-bool-bit', { address, bit }),
  
  writeBoolBit: (address, bit, value) => 
    ipcRenderer.invoke('write-bool-bit', { address, bit, value })
});

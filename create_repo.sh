#!/bin/bash
# Create GitHub repository via gh CLI with owner specification
gh repo create sm3000-config-tool \
  --public \
  --description "Gestionale Completo PLC Schneider SM3000 - Sistema di configurazione professionale via Modbus TCP/IP" \
  --source=. \
  --remote=origin \
  --push || {
    echo "Attempting alternative method..."
    git branch -M main
    git push -u origin main
  }

@echo off
echo ========================================
echo   SM3000 Configuration Tool
echo   Avvio in corso...
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERRORE: Node.js non trovato!
    echo.
    echo Scarica e installa Node.js da:
    echo https://nodejs.org
    echo.
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installazione dipendenze in corso...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERRORE durante l'installazione!
        pause
        exit /b 1
    )
)

echo.
echo Avvio SM3000 Configuration Tool...
echo.
echo L'applicazione si aprira' in una nuova finestra.
echo Chiudi questa finestra per terminare l'app.
echo.

npm start

pause

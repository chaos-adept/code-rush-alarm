const serialPort = process.env.comPort || 'COM3';
const SerialPort = require('serialport');

let arduinoPort;
let isOpen = false;

let state = undefined;

function configureArduinoChannel() {
    arduinoPort = new SerialPort(serialPort, {
        parser: SerialPort.parsers.readline('\n'),
        baudRate: 9600 // this is synced to what was set for the Arduino Code
    });

    arduinoPort.on('open', function() {
        console.log('port is open');
        isOpen = true;
        flushStateToArduino();
    });

    arduinoPort.on('error', function(err) {
        console.log('Error: ', err.message);
    });

    arduinoPort.on('data', function (data) {
        console.log('Data: ' + data);
    });
}

configureArduinoChannel();


function flushStateToArduino() {
    if (!isOpen) {
        console.warn('attempt to flush state to unprepared arduino connection');
        return
    }

    if (state !== undefined) {
        console.warn('data is not defined to be flushed to the arduino');
        return
    }

    console.log('flush state ' + JSON.stringify(topMostData));
    const message = String(state ? "1" : "0");
    arduinoPort.write(message, function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written', message);
    });
}

function updateState(newState) {
    state = newState;
    flushStateToArduino();
}

module.exports = updateState;
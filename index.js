const sensor = require('./sensor/sensor');
const notifier = require('./alarm/alarm');
const deviceAlarm = require('./arduino/arduino');

sensor.on("alarm", () => {
    notifier(true);
    deviceAlarm(true);
});

sensor.on("fixed", () => {
    notifier(false);
    deviceAlarm(false);
});
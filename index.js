const sensor = require('./sensor/sensor');
const notifier = require('./alarm/alarm');


sensor.on("alarm", () => {
    notifier(true);
});

sensor.on("fixed", () => {
   notifier(false);
});

sensor.emit("alarm");
sensor.emit("fixed");
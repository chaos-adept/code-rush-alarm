const notifier = require('node-notifier');

function notify(state) {
    if (state) {
        notifier.notify({
            title: 'Alarm',
            message: 'We have failed tests on master.',
            sound: true,
            wait: false,
            type: 'error'
        });
    } else {
        notifier.notify({
            title: 'Keep calm',
            message: 'Tests on master were fixed.',
            sound: true,
            wait: false,
            type: 'info'
        });
    }
}

module.exports = notify;

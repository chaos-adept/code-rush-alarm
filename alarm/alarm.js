const notifier = require('node-notifier');

function notify(state) {
    console.log(state);

    notifier.notify({
        title: 'Alarm',
        message: 'We have failed tests on master.',
        sound: true,
        wait: false,
        type: 'error'
    });
}

module.exports = notify;

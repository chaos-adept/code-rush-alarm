const http = require('http');
const EventEmitter = require('events');

function getBuildStatus(callback) {
    const request = http.request(
        {
            'hostname': '192.168.108.166',
            'port': 8080,
            'auth': 'rakibov:Sg8MNKSa',
            'path': '/job/wpp-as/job/as-portal/job/health-checks/job/as-portal-master-mock-health-check/lastBuild/api/json'
        },
        function (resp) {
            resp.setEncoding('utf8');

            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                callback(JSON.parse(data));
            });
        }
    );
    request.end();
};


const alarmer = new EventEmitter();

let prevState = 'SUCCESS';
setInterval(() => {
    getBuildStatus((res) => {
        if (res.result != prevState) {
            prevState = res.result;

            if (prevState == 'SUCCESS') {
                alarmer.emit('fixed');
            } else {
                alarmer.emit('alarm');
            }
        }

        console.log(`Current: ${res.result}`);
    })
}, 60000);

module.exports = alarmer;
var client = require('scp2')


client.scp('./build/*.*', {
    host: '50.116.8.145',
    username: 'root',
    password: 'gc7232275',
    path: '/home/wwwroot/aiex.one'
}, function(err) {

    console.log(err)
})
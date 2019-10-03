const app = require('./app/app');


app.listen(app.get('port'));
console.log('server on port ',app.get('port'));
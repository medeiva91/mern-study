const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const { response } = require('express');

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routers'));
app.use('/api/link', require('./routes/link.routers'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV=== 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, rs) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(5000, () => console.log(`App has been started ...${PORT}`));

    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();


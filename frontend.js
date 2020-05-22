const path = require('path');
const express = require('express');
const app = express();
const compression = require('compression');

function start() {
    const shouldCompress = (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    };
    
    app.use(compression({
        filter: shouldCompress,
        threshold: 0
    }));
    
    app.use(express.static(path.join(__dirname, "frontend/build")));
    
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
    });
    
    const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 80;
    
    app.listen(port, function () {
        console.log('Frontend listening on port ' + port);
    });
}

module.exports = {
    start,
}

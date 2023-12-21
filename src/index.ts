import './LoadEnv'; // Must be the first import
import http from 'http';
import app from '@server';
import mongoose from 'mongoose';
import logger from '@shared/Logger';

// Start the server
const port = normalizePort(process.env.PORT || 4000);
app.set('port', port);


var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * MongoDB Connection
 */
mongoose
    .connect(String(process.env.DB_URL))
    .then(() => {
        logger.info('MongoDB Database Connected Successfully.');
    })
    .catch((err: any) => {
        logger.error(err);
        closeServer();
        process.exit(1);
    });

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'PORT: ' + addr?.port;
    logger.info('Server Listening on ' + bind)
}

//This is a signal handler. It is listening for the unhandledRejection signal. When it receives the signal, it will throw the error.
process.on('unhandledRejection', error => {
    logger.error(error)
    throw error
})

//This is a signal handler. It is listening for the uncaughtException signal. When it receives the signal, it will log an error and then exit the process.
process.on('uncaughtException', error => {
    logger.error(error);
    throw error
})

//This is a signal handler. It is listening for the SIGTERM signal. When it receives the signal, it will log a warning and then close the server.
process.on('SIGTERM', () => {
    logger.warn("SIGTERM Signal Recieved.");
    logger.info("Closing Http & MySQL Database Server.");
    closeServer();
})

//Listening for the SIGINT signal. When it receives the signal, it will log a warning and then close the server.
process.on('SIGINT', () => {
    logger.warn("SIGINT Signal Recieved.");
    logger.info("Closing Http & MySQL Database Server.");
    closeServer();
})

//Listening for the SIGQUIT signal. When it receives the signal, it will log a warning and then close the server.
process.on('SIGQUIT', () => {
    logger.warn("SIGQUIT Signal Recieved.");
    logger.info("Closing Http & MySQL Database Server.");
    closeServer();
})

//This is a signal handler. It is listening for the SIGTERM signal. When it receives the signal, it will log a warning and then close the server.
function closeServer() {
    server.close(async () => {
        logger.warn('Http Server Closed.');
        try {
            await mongoose.connection.close();
            await mongoose.disconnect();
            logger.warn('MongoDB Database Server Closed.');
            process.exit(0);
        } catch (err) {
            logger.err('Something went wrong while closing Database Server.', err);
        }
    });
}

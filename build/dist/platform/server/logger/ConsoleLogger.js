"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    constructor(isDebugEnabled, console) {
        this.isDebugEnabled = isDebugEnabled;
        this.console = console;
    }
    debug(message) {
        if (this.isDebugEnabled) {
            this.console.log(message);
        }
    }
    info(message) {
        this.console.info(message);
    }
    log(message) {
        this.console.log(message);
    }
    warn(message) {
        this.console.warn(message);
    }
    error(message) {
        this.console.error(message);
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map
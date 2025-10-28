class ExpressError extends Error {
    constructor(status, message) {
        // pass message to Error so `err.message` and stack behave normally
        super(message);
        this.status = status;
    }
}

module.exports = ExpressError;
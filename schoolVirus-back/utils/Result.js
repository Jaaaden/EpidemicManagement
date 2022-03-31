// Introduce status codes such as success, failure, token invalidation, database duplication, warning, etc.
const {
    CODE_ERROR,
    CODE_SUCCESS,
    CODE_TOKEN_EXPIRED,
    CODE_REPEAT,
    CODE_WARNING,
} = require("../setting/constant");

// The format of the uniform encapsulation return value
class Result {
    // Constructor
    constructor(data, msg = "Successful operation", options) {
        this.data = null;
        console.log(arguments);
        console.log(arguments.length);
        console.log(options);
        if (arguments.length === 0) {
            this.msg = "Successful operation";
        } else if (arguments.length === 1) {
            this.msg = data;
        } else {
            this.data = data;
            this.msg = msg;
            if (options) {
                this.options = options;
            }
        }
    }

    createResult() {
        if (!this.code) {
            this.code = CODE_SUCCESS;
        }
        let base = {
            code: this.code,
            msg: this.msg,
        };

        if (this.data) {
            base.data = this.data;
        }

        if (this.options) {
            base = { ...base, ...this.options };
        }
        return base;
    }

    json(res) {
        res.json(this.createResult());
    }

    success(res) {
        this.code = CODE_SUCCESS;
        this.json(res);
    }

    fail(res) {
        this.code = CODE_ERROR;
        this.json(res);
    }

    warning(res) {
        this.code = CODE_WARNING;
        this.json(res);
    }

    repeat(res) {
        this.code = CODE_REPEAT;
        this.json(res);
    }

    jwtError(res) {
        this.code = CODE_TOKEN_EXPIRED;
        this.json(res);
    }
}

module.exports = Result;

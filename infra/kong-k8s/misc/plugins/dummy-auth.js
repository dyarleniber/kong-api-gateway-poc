'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class KongPlugin {
    constructor(config) {
        this.config = config;
    }
    access(kong) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = yield kong.request.getHeader("error");
            if (error) {
                return yield kong.log.err("Custom error");
            }
            const userId = yield kong.request.getHeader("userId");
            if (!userId) {
                return kong.response.exit(403);
            }
            const message = this.config.message || "hello";
            yield Promise.all([
                kong.response.setHeader("x-welcome", `${message} ${userId}`),
                kong.response.setHeader("x-javascript-pid", process.pid),
            ]);
        });
    }
}
module.exports = {
    Plugin: KongPlugin,
    Name: 'dummy-auth',
    Schema: [
        { message: { type: "string" } },
    ],
    Version: '0.1.0',
    Priority: 0,
};

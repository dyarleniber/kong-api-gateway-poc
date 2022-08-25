'use strict';

// @ts-ignore
import kong from "kong-pdk";

class KongPlugin {
    config: any;

    constructor(config: any) {
        this.config = config
    }

    async access(kong: kong) {
        const error = await kong.request.getHeader("error");
        if (error) {
            return await kong.log.err("Custom error");
        }

        const userId = await kong.request.getHeader("userId");
        if (!userId) {
            return kong.response.exit(403);
        }

        const message = this.config.message || "hello";
        await Promise.all([
            kong.response.setHeader("x-welcome", `${message} ${userId}`),
            kong.response.setHeader("x-javascript-pid", process.pid),
        ]);
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

'use strict';

import Kong from "kong-pdk/kong";

type Config = { message?: string };

class KongPlugin {
    constructor(
        private readonly config: Config
    ) {}

    async access(kong: Kong) {
        try {
            const userId = await kong.request.getHeader("userId");
            if (!userId) {
                return kong.response.exit(400);
            }
            if (userId !== "123") {
                return kong.response.exit(403);
            }
            const message = this.config.message || "Hi";
            await Promise.all([
                kong.response.setHeader("x-welcome", `${message} ${userId}`),
                kong.response.setHeader("x-javascript-pid", process.pid),
            ]);
        } catch (err) {
            await kong.response.exit(500);
        }
    }
}

module.exports = {
    Plugin: KongPlugin,
    Schema: [
        { message: { type: "string" } },
    ],
    Version: '0.1.0',
    Priority: 0,
}

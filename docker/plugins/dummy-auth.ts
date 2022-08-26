import Kong from "kong-pdk/kong";

type Config = { message: string };

class KongPlugin {
    constructor(
        private readonly config: Config
    ) {}

    async access(kong: Kong) {
        const userId = await kong.request.getHeader("userId");
        if (!userId) {
            return kong.response.exit(403);
        }

        const message = this.config.message;
        await Promise.all([
            kong.response.setHeader("x-welcome", `${message} - ${userId}`),
        ]);
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

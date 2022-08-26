const plugin = require("../dummy-auth");
const { PluginTest, Request: PluginRequest } = require("./plugin_test");

test("Should succeed with status 200 when userId header is present", async () => {
    const r = new PluginRequest();
    r.useURL("http://example.com")
        .useMethod("GET")
        .useHeaders({
            "userId": "test-user-id",
        });
    const t = new PluginTest(r);
    await t.Run(plugin, {
        "message": "test",
    });

    expect(t.response.status).toBe(200);
    expect(t.response.headers.get("x-welcome")).toBe("test test-user-id");
});

test("Should exit with status 403 when userId header is missing", async () => {
    const r = new PluginRequest();
    r.useURL("http://example.com")
        .useMethod("GET");
    const t = new PluginTest(r);
    await t.Run(plugin, {
        "message": "test",
    });

    expect(t.response.status).toBe(403);
});

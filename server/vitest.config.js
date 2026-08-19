/** @type {import("vitest/config").UserConfigExport} */
module.exports = {
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  test: {
    isolate: true,
    setupFiles: ["./tests/setup.ts"],
    environment: "node",
    include: ["**/*.test.ts"],
    execArgv: ["--import", "tsx"],
  },
};

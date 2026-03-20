const { spawn } = require("child_process");
const os = require("os");

function getNetworkIP() {
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "0.0.0.0";
}

const ip = getNetworkIP();
console.log("\n📱 Network access: http://" + ip + ":3000\n");

spawn("npx", ["next", "dev", "-H", "0.0.0.0"], {
  stdio: "inherit",
  shell: true,
});

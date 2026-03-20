# Allow Network Access (192.168.0.104:3000)

**"Connection Refused"** when accessing from another device usually means Windows Firewall is blocking it.

## Fix: Add Firewall Rule

1. **Open PowerShell as Administrator** (right-click PowerShell → "Run as administrator")

2. Run this command:
   ```
   netsh advfirewall firewall add rule name="Node.js Dev Port 3000" dir=in action=allow protocol=TCP localport=3000
   ```

3. **Restart the dev server** (kill any running one first, then `npm run dev`)

4. Try **http://192.168.0.104:3000** again from your phone or other device.

---

To remove the rule later:
```
netsh advfirewall firewall delete rule name="Node.js Dev Port 3000"
```

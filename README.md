# vrc-chatbox-osc-web

A webapp to send message to VRChat Chatbox via OSC, which you may not need.

## Features

- Send message to VRChat Chatbox via web browser, so that you can send from other devices like mobile phone.
- Send message to system clipboard, so that you can paste it directly.
- Customize whether to show input indicator or play SFX.
- Keep showing the last message in Chatbox.
- Show what you're typing to Chatbox in realtime.
- UI is mobile friendly.

## Instructions

### Use pre-packed binary

Download executable binary from [GitHub Releases](https://github.com/ccloli/vrc-chatbox-osc-web/releases), and run it directly.

The pre-packed binary has already bundled Node.js, so you don't need to download Node.js manually.

### Use your system's Node.js

Node.js >= 16 is required.

1. Clone the repo, or download source code tar ball

2. Download prebuild assets from [GitHub Releases](https://github.com/ccloli/vrc-chatbox-osc-web/releases), and extract them into `/build` folder

3. `npm install --production`

4. `npm start`

### Startup Options

- `--port [PORT]`: Web server port, default `38888`
- `--osc-host [HOST]`: VRChat OSC host, default `127.0.0.1`
- `--osc-port [PORT]`: VRChat OSC port, default `9000`
- `--auth-user [USERNAME]`: Login username
- `--auth-pass [PASSWORD]`: Login password
- `--show-ipv6`: Print bind IPv6 addresses for web server

You can also use environment variable to set options, just need to spell them in upper case and replace `-` to underline `_`. For example, if you want to enable authorization for security reason, you can use `AUTH_USER=foo AUTH_PASS=b@rb@2QU><`.

## Development

1. Clone the repo, or download source code tar ball

2. `npm install`

3. `npm start` to run backend server

4. `npm run dev` to run frontend development server

5. `npm run build` to build frontend production assets

6. `npm run pack` to bundle executable binary

## Q & A

### I cannot open the server in browser.

- Check your firewall settings and make sure you've allow incoming traffic to the server (default port is `38888`).
- The server prints a few addresses on startup, try them one by one.
- Make sure your device is in the same network with the device running the server.

### Message is not shown.

- Make sure you've already enabled OSC feature in VRChat. To enable it, open Action Menu -> Options -> OSC -> Enabled.
- If the server is not on the same device running VRChat, you need to manually set `--osc-host` to the target device. However, copy to clipboard will not work, since it's not an OSC api, the feature is implemented on server side.

### Can I run it on Android phone?

Yes, you need to install [Termux](https://termux.dev/) and run it in shell. For most Android devices, use the ARM64 binary.

```sh
chmod +x ./vrc-chatbox-osc-web-linuxstatic-arm64
./vrc-chatbox-osc-web-linuxstatic-arm64
```

If you need the clipboard feature, you need to install [Termux:API](https://wiki.termux.com/wiki/Termux:API) add-on, and run `pkg install termux-api` in shell.

If you want to integrate with VRChat mobile, you can open the web ui in browser, then open your browser as pop-up window (may vary based on your system), so that it can over the VRChat app. If open an app as a window is not an option for your system, I'd recommend [this app](https://github.com/ScrapW/Chatbox).

However, you can type in Chatbox with native keyboard directly, though it may not a great experience. But running the server on Android would probably not a great experience, too.

### Can I run it on Meta Quest device?

Yes, but you need a developer account, and follow the previous Android phone steps. However, typing command with the built-in keyboard in Termux is awful, and you need to switch back to Quest Browser to input. I don't see it worth, unless you need to use the system keyboard like typing Korean or Japanese.

### Can I run it on Pico device?

Probably not, running it in Termux returns "Bad system call". Besides, Pico OS doesn't allow opening browser when playing VR game.

### Can I run it on Mac?

Yes but why? Is it the day VRChat removes EAC, so that you can run the game on macOS? That's the reason why the prebuild binaries don't include macOS and Windows on arm64.

### Is it dumb to type on the phone while using VR?

Of course! I realized it just after finish its main feature! Typing on your phone while holding controllers? That's why I say you may not need it! Say something good, at least you can open it in desktop browser, and type CJK or even emoji! Or just put your headset aside, listen to the PC, and typing on your phone! Or just use it as a HTTP API so that you can use it in other program! Whatever, I'm out!

### So is this a 💩?

Yeah! Shitty 💩!

## License

GPLv3
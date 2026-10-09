# Mac Power Monitor for Übersicht

A lightweight macOS desktop widget for live power and battery telemetry, built for [Übersicht](https://tracesof.net/uebersicht/).

## Screenshots

| Charging paused | On battery |
|:--:|:--:|
| ![Charging paused](screenshots/charging-paused.png) | ![On battery](screenshots/on-battery.png) |

## Features

- Live power consumption and battery percentage
- Incoming power, adapter wattage, and battery power flow
- Rolling 30-second average consumption
- Charging state, voltage, battery health, and cycle count
- macOS battery-runtime estimate and a separate calculated estimate
- Light/dark styling, optional glass blur, and 2-second refresh

## Requirements

- macOS exposing AppleSmartBattery telemetry through `ioreg`
- [Übersicht](https://tracesof.net/uebersicht/)
- Primarily developed for MacBook Pro; available telemetry may vary across models and macOS versions

## Installation

1. Install and open Übersicht.
2. Download or clone this repository:
   ```bash
   git clone https://github.com/juliobianco/uebersicht-bianco.git
   ```
3. Copy `mac-power-monitor.widget` to `~/Library/Application Support/Übersicht/widgets/`.
4. Enable the widget in Übersicht if needed.

## Configuration

Edit `mac-power-monitor.widget/index.jsx`:

| Setting | Default | Purpose |
|---|---|---|
| `refreshFrequency` | `2000` | Refresh interval (ms) |
| `DESIGN_WH` | `100` | Battery design energy (Wh), used only for the calculated runtime estimate; change for your Mac |
| `HISTORY_SIZE` | `15` | Average window: 15 samples × 2 seconds |
| `GLASS` | `false` | Optional backdrop blur; may flicker on some setups |

## How it works

The widget runs `/usr/sbin/ioreg -r -c AppleSmartBattery -w0` locally and displays battery telemetry. It requires no API keys or external services. Power readings are macOS-reported estimates, not calibrated wall-socket measurements.

Battery-runtime calculations can differ from macOS estimates, particularly during changing workloads.

## License

MIT. See [LICENSE](LICENSE).

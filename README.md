# CryptoPunks Owner Highlighter

A Chrome extension that recolors the background of for-sale CryptoPunks owned by a
watched wallet (cerulean) on https://www.cryptopunks.app/cryptopunks/forsale, so
the wallet's listings stand out in the grid.

## Installation

1. Open `chrome://extensions` in Chrome.
2. Toggle **Developer mode** on (top right).
3. Click **Load unpacked** and select this folder (`cryptopunks-owner-highlighter`).
4. Open https://www.cryptopunks.app/cryptopunks/forsale — owned punks now render on a
   cerulean background.

After editing any file, return to `chrome://extensions` and click the **reload** icon
on the extension card, then refresh the for-sale page.

## Updating the watched holdings

The watched wallet and its punks are hardcoded in `content.js`:

- `WATCHED_WALLET` — the wallet address being tracked (reference only).
- `OWNED_PUNK_IDS` — the punk numbers that wallet currently holds. Source these from
  the "Currently Holding" section of https://www.punkstrategy.fun/app and update the
  list whenever the holdings change.

## Files

- `manifest.json` — Manifest V3 config; scopes the content script to the for-sale page.
- `content.js` — finds each punk card by its `/cryptopunks/details/<id>` link, reads the
  ID, and tags owned ones; a `MutationObserver` re-applies on grid re-renders.
- `styles.css` — cerulean background for owned punks.

// CryptoPunks Owner Highlighter — POC
//
// Highlights for-sale punks owned by a watched wallet with a green underline.
//
// The for-sale page is a single-page app that renders punk cards dynamically,
// so we scan on load and again whenever the grid changes (MutationObserver).

// Watched wallet — kept here for reference. The POC matches against the
// hardcoded punk-id list below, so this isn't queried; it documents whose
// punks OWNED_PUNK_IDS represents.
const WATCHED_WALLET = "0x1244eae9fa2c064453b5f605d708c0a0bfba4838";

// Punk IDs the watched wallet currently holds.
// Source: "Currently Holding" on https://www.punkstrategy.fun/app.
// Update this list whenever the wallet's holdings change.
const OWNED_PUNK_IDS = new Set([
  103, 267, 275, 1311, 1339, 1350, 1417, 1613, 1628, 1738, 1927, 3190,
  3276, 3433, 3483, 3774, 3949, 3995, 4046, 4193, 4478, 4535, 4798, 5060,
  5338, 5432, 5467, 5731, 5965, 6096, 6140, 6482, 6588, 6688, 6821, 7646,
  7771, 9516, 9891,
]);

const HIGHLIGHT_CLASS = "cpoh-owned";

function punkIdFromHref(href) {
  const match = /\/cryptopunks\/details\/(\d+)/.exec(href || "");
  return match ? Number(match[1]) : null;
}

function highlightOwnedPunks() {
  const links = document.querySelectorAll('a[href*="/cryptopunks/details/"]');
  for (const link of links) {
    const id = punkIdFromHref(link.getAttribute("href"));
    if (id === null) continue;
    const owned = OWNED_PUNK_IDS.has(id);
    link.classList.toggle(HIGHLIGHT_CLASS, owned);
  }
}

highlightOwnedPunks();

// Re-run when the grid re-renders (filtering, pagination, lazy loading).
let scheduled = false;
const observer = new MutationObserver(() => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    highlightOwnedPunks();
  });
});

observer.observe(document.body, { childList: true, subtree: true });

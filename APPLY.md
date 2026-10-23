# Portfolio update, round 6: Colour + Typography + Foundations + Urdu

This package brings the code up to the three brand kits (Colour v6, Typography Set A, Foundations) and adds the Urdu version of every page. It needs **no new npm packages**.

## 1. Apply it (PowerShell, from `C:\Projects\portfolio\next-portfolio`)

```powershell
# 1. Keep a copy of the old source, then remove it (old files must not stay: several moved).
Copy-Item .\src ..\src-before-round6 -Recurse
Remove-Item .\src -Recurse -Force

# 2. Extract this zip over the project folder (src\, next.config.ts, .gitattributes).
Expand-Archive -Path "$HOME\Downloads\portfolio-round6.zip" -DestinationPath . -Force

# 3. Delete the extra files that came with the zip (this file) if you do not want them in git.
Remove-Item .\APPLY.md

# 4. Build.
npm run build
npm run dev
```

`public\` is unchanged, so it is not in the zip. Nothing else in the project root changes.

### Files removed or moved (already gone if you delete `src` first)
- `src/app/layout.tsx`, `page.tsx`, `not-found.tsx`, `error.tsx` -> now in `src/app/[lang]/`
- `src/app/work/**`, `src/app/posts/**` -> now in `src/app/[lang]/work/**` and `[lang]/posts/**`

`src/app/feed.xml`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `apple-icon.tsx`, `icon.svg` stay at the app root.

## 2. How the languages work
- English keeps clean addresses: `/`, `/work`, `/work/zivora`, `/posts`. Urdu lives under `/ur`: `/ur`, `/ur/work`, ...
- `src/proxy.ts` (Next 16's renamed middleware) serves the English pages from the `[lang]` folder and redirects `/en/...` to the clean address. The page language is never guessed from the browser: **every visit starts in English**; the switch (header, and at the foot of the menu on phones) changes language.
- Interface text: `src/i18n/dictionaries/en.ts` and `ur.ts` (same keys, enforced by TypeScript). Content: English files in `src/content` stay the source of truth; `src/content/ur` holds only the Urdu words. A missing Urdu entry falls back to English.
- Urdu: right to left, Urdu-Indic digits in prose, Noto Nastaliq Urdu for text, Noto Sans Arabic for labels, no letter spacing, no italics, taller lines, animations run by word, never by letter. Code, URLs, e-mail and tech names stay left to right and Latin.
- Share images (Open Graph) are English for both languages: the image renderer has no Urdu font.
- RSS: `/feed.xml` (English), `/ur/feed.xml` (Urdu). The sitemap lists both languages with hreflang.
- **Have a native Urdu reader check the translations once** (`i18n/dictionaries/ur.ts`, `content/ur/*`). They are a careful first translation.

## 3. What changed per kit
**Colour (v6)** `src/styles/palettes.css` (generated from the kit) holds every token for Violet (default), Saffron, Ember, Harbor, light and dark, plus status colours and mesh strengths. All colours are registered, so a palette or theme change glides (0.7 s; instant for reduced motion).
- Theme: light/dark toggle only, defaults to the system, saved when the visitor clicks. Set before first paint by an inline script.
- Palette per page: Home Violet, Zivora Violet, Legal Case Management Harbor, Personal Portfolio Violet (`palette` in `content/projects.ts`). On Home the project row in the middle of the screen sets the palette; leaving the list (and Contact) returns to Violet. On a case page the Next project block previews the next palette. Never changes while text is selected or a field is focused.
- Class renames: `bg-ink`->`bg-page`, `text-paper`->`text-fg`, text on accent `text-ink`->`text-accent-ink`, accent text `text-accent`->`text-accent-text` (large) / `text-accent-small` (small), `rounded-ui`->`rounded-md`.
- Text over pictures is always white on a 60% black scrim. Hero uses the brand mesh (`.mesh`).

**Typography (Set A)** Fonts and the scale from the kit, English and Urdu. One step was added: `text-title` (case-study block titles and post titles), which replaces three separate hand-written sizes.

**Foundations** 4 px grid; radius xs 4 / sm 8 / **md 12 (buttons, tags, cards)** / lg 16 / xl 24; containers `max-w-xs ... xl, page`; z-index tokens (`--z-raised`... `--z-skip`); buttons 12x24 padding with 44 px minimum height on touch screens; tags 8x12; icon buttons 44x44 (`icon-btn`); small links get a bigger invisible hit area (`tap`); drift fixes applied (e.g. `pb-0.5`->`pb-1`, `py-7`->`py-6`, `py-9`->`py-10`, `pt-28`->`pt-24`); em-based limits replace `ch` limits. Arrows that mean "forward/back" flip in Urdu (`mirror`); hover nudges follow the reading direction (`nudge-*`).

## 4. Tested and not tested (honest)
Done here:
- TypeScript check of all source files against stand-in module types (no errors in project code; the Urdu dictionary is checked against the English keys).
- The new `globals.css` compiled with the Tailwind 4.3 engine: no errors; the new utilities (`nudge-*`, `mirror`, `tap`, `icon-btn`, `hero-name`, `ur:` variant, tokens) are generated.
- Link/path helpers (`localePath`, `splitLocale`, `alternatePath`) and the date/number formatting (Urdu digits and months) run against sample inputs.

**Not possible here, please check on your machine:** `next build`, `next dev`, how the pages look (both languages, both themes, all palettes), font loading, the proxy rewrites, and the language switch. In particular look at: the Urdu hero and menu sizes on a phone, the home palette changes while scrolling, and `/ur/work/legal-case-management` (Harbor).

## 5. Choices I made for you (change if you disagree)
Button radius 12 px; 44 px hit areas; Lucide kept with scaling stroke; the up-right arrow is mirrored in Urdu; no zoom-safe fluid sizes (existing clamp tokens kept); Urdu fonts are not preloaded, so the first Urdu visit swaps fonts once; no category icons.

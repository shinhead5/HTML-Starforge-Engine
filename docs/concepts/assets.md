# Assets

Assets are loaded via a manifest and cached for reuse.

```ts
await engine.assets.loadManifest({
  assets: [
    { id: "player", type: "image", src: "/assets/player.png" },
    { id: "level1", type: "json", src: "/levels/level1.json" }
  ]
});
```

## Progress

Provide a callback to track progress:

```ts
engine.assets.loadManifest(manifest, ({ loaded, total }) => {
  console.log(`${loaded}/${total}`);
});
```

## Caching

Loaded assets are cached by `id` and retrieved using `getImage`, `getAudio`, or `getJson`.

## Error Handling

AssetManager retries failed loads before surfacing an error. If an asset fails, check:

- The URL is correct.
- The server allows CORS for remote assets.
- The file is included in the build output.

## JSON Levels

Storing levels as JSON keeps tooling simple. You can create a custom map editor or export from Tiled and convert into the expected format.

## Streaming

For very large games, split your manifest per scene. Load only the assets you need, then unload unused resources by creating a new AssetManager.

## Manifest Organization

For medium to large games, split your manifests by feature:

- `boot-manifest.json` – fonts, UI, loading screen
- `level1-manifest.json` – level-specific sprites
- `audio-manifest.json` – music and sfx

Load only what you need per scene to keep memory usage low.

## Streaming JSON

JSON files are parsed into memory. If you have massive data, consider splitting it into multiple files and loading them on-demand.

## Tips for Asset Paths

- Assets in `public/` are served at the root (`/assets/...`).
- Assets in `src/` can be referenced with `new URL("./path", import.meta.url)`.
- Use consistent naming to avoid collisions.

## Hot Reloading

During development, Vite will reload assets when files change. If you keep asset IDs stable, you can refresh only the changed files and keep game state intact.

## Asset Lifecycle

1. Create a manifest
2. Call `loadManifest`
3. Access cached assets via `getImage`/`getAudio`/`getJson`
4. Dispose by creating a new `AssetManager` (optional)

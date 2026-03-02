# Design System — ShadcnShip Landing

## Typography

### Hero h1
```
text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight
```
- Weight: `font-medium` (pas semibold)
- Contraste visuel: partie principale en `foreground`, partie secondaire en `text-muted-foreground`

### Section heading (h2)
```
text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl
```
- Même logique foreground + muted-foreground span

### Section label (eyebrow)
```
text-sm font-semibold uppercase tracking-widest text-muted-foreground
```
- Placé au-dessus du h2, `mb-3`

### Description / body
```
text-muted-foreground md:text-lg       (hero — base size mobile, lg sur md+)
text-base text-muted-foreground        (sections)
text-sm leading-relaxed text-muted-foreground  (cards, FAQ réponses)
```

### Footer labels
```
text-xs font-semibold uppercase tracking-widest text-muted-foreground
```

---

## Spacing

### Sections
```
py-16 md:py-24 lg:py-32
```
### Section header interne
```
mb-16 text-center
```
### Container
```
container mx-auto
```
### Padding latéral
```
px-6 md:px-12   (FAQ)
px-4            (navbar)
```

---

## Layout & Borders — Aesthetic "Grid"

La landing utilise un système de bordures pour créer une grille visuelle cohérente :

- **Container** : `border-x` sur chaque section
- **Entre sections** : `border-b`
- **Navbar** : `border-b` + contenu `border-x`
- **Feature** : colonnes séparées par `divide-y divide-border` + `border-y`
- **Bento** : grille `border border-border` avec `divide-x divide-y divide-border`
- **Footer** : `border-t` > `container border-x` > `grid border-b`

---

## Animations — `fadeUp`

Helper universel utilisé partout :
```ts
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate/whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay },
})
```

- **Hero** : `animate` (pas whileInView), delays 0 → 0.1 → 0.2 → 0.3 → 0.45
- **Sections** : `whileInView` avec `viewport: { once: true, margin: "-60px" }`
- **Listes** : delay incrémental par item `0.1 + i * 0.08`

---

## Buttons

### Hero / CTA primaire
```
size="lg"                    (default variant = filled)
size="lg" variant="outline"  (secondaire)
```
- Pas de `rounded-full` — shape par défaut du composant Button

### CTA dark section
```
variant="secondary" px-8                                             (primaire sur fond sombre)
variant="ghost" text-white/60 hover:text-white hover:bg-white/10    (secondaire)
```

### Navbar
```
size="sm" variant="ghost"   (nav links)
variant="outline" size="icon"  (GitHub, ThemeToggle, Mobile)
```

---

## Badge / Tag

```tsx
<Badge variant="secondary" className="py-1 border border-border">
  {text}
</Badge>
```
- Utilisé uniquement dans le hero
- Style inline badge dans feature : `rounded-full border px-2 py-0.5 text-xs text-muted-foreground`

---

## Navbar

```
sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur
h-16 flex items-center justify-between
```
- Logo : `font-semibold` + image `h-6 w-6 dark:invert`
- Nav desktop : `NavigationMenu` avec `Button size="sm" variant="ghost"`

---

## Cards / Panels

### Feature panel (interactif)
```
p-6 text-left transition-all duration-300 min-h-36
actif   : opacity-100 bg-muted/40
inactif : opacity-35 hover:opacity-60 hover:bg-muted/20
```

### Bento card
```
group overflow-hidden bg-muted/30
image : group-hover:scale-[1.03] transition-transform duration-500
overlay : bg-background/0 group-hover:bg-background/10
label row : flex items-center justify-between px-4 py-3 border-t text-sm font-medium
arrow : opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0
```

### Image panel
```
bg-muted/30 overflow-hidden rounded-md
```

---

## CTA Section (dark)

```
bg-zinc-950 text-white overflow-hidden
```
- Grid background inline : `border-white/6` (cellules ~80px)
- Label : `text-white/40`
- Description : `text-white/50`
- h2 scale : `text-4xl md:text-5xl lg:text-6xl xl:text-7xl`

---

## FAQ Accordion (custom)

```
border-t border-b border-border   (wrapper)
border-b border-border            (chaque item)
py-5 flex items-center justify-between gap-6
question : text-base font-medium
réponse  : text-sm leading-relaxed text-muted-foreground pb-5
toggle   : Plus / Minus icons (lucide), size-4
```
- AnimatePresence : `height: 0 → auto`, duration 0.25s

---

## Logo strip

```
py-8 flex justify-center items-center gap-x-6
icons : size-6 grayscale, text-muted-foreground/60 hover:text-muted-foreground
label : "Built with the tools you already love" (hidden mobile)
```

---

## Footer

```
border-t > container border-x
grid grid-cols-2 md:grid-cols-4 border-b   (main grid)
p-8 par colonne
brand desc : text-xs leading-relaxed text-muted-foreground max-w-[200px]
links      : text-sm text-muted-foreground hover:text-foreground transition-colors gap-2.5
bottom bar : px-8 py-4 flex justify-between, text-xs text-muted-foreground
```

---

## Règles registry/blocks vs landing

- **`components/landing/`** : animations framer-motion ✅, heading deux couleurs ✅ — c'est du branding propre au site
- **`registry/blocks/`** : pas de framer-motion (dépendance externe), heading default en `string` simple
  - Le type `React.ReactNode` est autorisé pour laisser la flexibilité à l'utilisateur
  - Mais la default value doit rester un string plain, sans JSX

---

## Règles de réduction CSS

### 1. `gap` sur le parent plutôt que `mt-` / `mb-` sur les enfants
Si tous les enfants d'un `flex flex-col` ont le même espacement, utiliser `gap` sur le parent.
```tsx
// ❌ Avant
<div className="flex flex-col">
  <h1 className="mt-4">...</h1>
  <p className="mt-4">...</p>
</div>

// ✅ Après
<div className="flex flex-col gap-4">
  <h1>...</h1>
  <p>...</p>
</div>
```
Si un enfant a besoin d'un espacement différent (ex: CTA), ajouter un `mt-*` uniquement sur cet enfant en complément du `gap`.

---

### 2. `size-*` plutôt que `w-* h-*`
```tsx
// ❌ Avant
<img className="w-full h-full" />
<Icon className="w-4 h-4" />

// ✅ Après
<img className="size-full" />
<Icon className="size-4" />
```

---

### 3. `rounded` + `overflow-hidden` sur le parent — pas sur l'enfant
Quand un parent a `overflow-hidden rounded-md`, l'enfant est automatiquement clippé. Pas besoin de répéter `rounded-md` sur l'enfant.
```tsx
// ❌ Avant
<div className="overflow-hidden rounded-md">
  <img className="rounded-md" />
</div>

// ✅ Après
<div className="overflow-hidden rounded-md">
  <img />
</div>
```

---

### 4. `inset-0` plutôt que `top-0 right-0 bottom-0 left-0`
```tsx
// ❌ Avant
<div className="absolute top-0 right-0 bottom-0 left-0" />

// ✅ Après
<div className="absolute inset-0" />
```

---

### 5. Propriétés d'alignement sur le parent, pas répétées sur les enfants
```tsx
// ❌ Avant
<div className="flex flex-col">
  <h1 className="text-center">...</h1>
  <p className="text-center">...</p>
</div>

// ✅ Après
<div className="flex flex-col text-center">
  <h1>...</h1>
  <p>...</p>
</div>
```

---

### 6. Multiples de 4 pour tout spacing / gap
Utiliser uniquement les valeurs Tailwind multiples de 4 : `4`, `8`, `12`, `16`, `20`, `24`...
Éviter : `gap-3`, `gap-5`, `gap-6`, `mt-3`, `mt-5`, `mt-6`, etc.

---

## Conventions de nommage des props

| Prop | Type | Usage |
|---|---|---|
| `label` | `string` | Texte eyebrow au-dessus du heading (ex: "What's included") |
| `badge` | `string` | Badge/tag affiché dans le hero |
| `heading` | `string` | Titre principal |
| `description` | `string` | Sous-titre ou texte descriptif sous le heading |
| `buttons` | `{ primary?, secondary? }` | Groupe de boutons CTA |
| `image` | `string` | URL de l'image principale |
| `className` | `string` | Toujours en dernière prop pour la customisation externe |

---

## Couleurs sémantiques

| Usage | Token |
|---|---|
| Texte principal | `foreground` |
| Texte secondaire | `muted-foreground` |
| Fond hover / actif | `muted/40`, `muted/30`, `muted/20` |
| Borders | `border`, `border-border` |
| CTA dark | `zinc-950` + `white/{40,50,60}` |
| Logo dark mode | `dark:invert` |

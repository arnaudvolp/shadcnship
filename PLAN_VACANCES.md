# Plan de Travail - shadcn-ui-blocks v1.2.0

> Programme pour Claude Code VPS - 2.5 semaines
> Date de creation: 3 fevrier 2026

---

## INSTRUCTIONS POUR CLAUDE CODE

### Demarrage

**IMPORTANT**: Avant de commencer a coder, tu DOIS:

1. **Explorer le projet** - Prends le temps de lire et comprendre:
   - La structure globale du projet
   - Les patterns utilises dans `src/registry/blocks/`
   - Le fichier `registry.json` et comment les blocks sont enregistres
   - Les composants UI existants dans `src/components/ui/`

2. **Etudier les references existantes** - Pour chaque feature, inspire-toi des composants existants:
   - **Pricing**: Regarde `pricing-01`, `pricing-02`, `pricing-03`
   - **Table**: Regarde `table-01`
   - **Dashboard**: Regarde `dashboard-01`, `dashboard-02`
   - **Auth**: Regarde `login-01`, `register-01`
   - **Backend pattern**: Regarde `waitlist-01` (structure Supabase/PostgreSQL)

3. **Ne jamais modifier le code existant** sauf si explicitement demande

### Design et Style

- **S'inspirer de l'existant** - Le design doit etre coherent avec les composants deja presents
- **Meme style Tailwind** - Utiliser les memes conventions de classes
- **Meme structure de composants** - Suivre les patterns etablis
- **Pas d'improvisation** - Si tu hesites sur un design, regarde ce qui existe deja

### Services Externes (Stripe, Supabase, etc.)

**Tu n'as PAS acces aux services externes** (pas de cles API).

- **Implemente selon la documentation officielle** - Code propre et complet
- **Utilise des placeholders** pour les variables d'environnement
- **Cree des donnees mock** realistes pour les previews
- **Le code sera teste plus tard** avec les vraies API - il doit etre pret a fonctionner

### Donnees

- **Donnees mock obligatoires** - Pour table et dashboard, cree des donnees fictives realistes
- **Structures de donnees coherentes** - Types bien definis
- **Exemples representatifs** - Les previews doivent montrer le composant en action

### Git

```bash
# Branche de travail
git checkout -b feature/1.1.test

# Commiter regulierement avec des messages clairs
git add .
git commit -m "feat(pricing-04): add pricing component with Stripe integration"

# Pusher dans la branche
git push origin feature/1.1.test
```

**Regles Git:**
- Travailler UNIQUEMENT sur la branche `feature/1.1.test`
- Commits atomiques et descriptifs
- Pusher apres chaque feature complete
- Ne JAMAIS push sur `main`

### Validation

Apres chaque composant:
```bash
# Verifier que le build passe
pnpm build

# Si erreur TypeScript ou build, corriger avant de continuer
```

### En cas de blocage

1. **Erreur de build** → Corriger immediatement
2. **Incertitude sur le design** → Regarder les composants existants similaires
3. **Pattern inconnu** → S'inspirer de waitlist-01 pour le backend
4. **Dependance manquante** → L'installer avec pnpm

---

## Resume Executif

Ce plan couvre le developpement de 4 fonctionnalites majeures pour enrichir la bibliotheque shadcn-ui-blocks avec des composants SaaS integres au backend.

### Priorites

| Priorite | Fonctionnalite | Complexite | Stacks |
|----------|----------------|------------|--------|
| 1 | Pricing + Stripe | Haute | Next.js, Stripe API |
| 2 | Table avec BDD | Moyenne-Haute | Supabase, PostgreSQL/Drizzle/Neon |
| 3 | Dashboard Data-Driven | Moyenne | Supabase, PostgreSQL/Drizzle/Neon |
| 4 | Authentification | Haute | Supabase Auth (Google, GitHub, etc.) |

---

## Architecture Reference

### Pattern a suivre (inspire de waitlist-01)

```
/src/registry/blocks/{block-name}/
  ├── {block-name}.tsx          # Composant principal (stack-agnostic)
  ├── /components/              # Sous-composants
  │   └── index.ts              # Barrel exports
  ├── /supabase/                # Integration Supabase
  │   ├── use-{feature}.ts      # Hook client-side
  │   └── README.md             # Documentation stack
  └── /postgres/                # Integration PostgreSQL
      ├── action.ts             # Server Action Next.js
      ├── schema.ts             # Schema Drizzle (optionnel)
      └── README.md             # Documentation stack
```

### Fichiers a mettre a jour pour chaque nouveau block

1. `registry.json` - Enregistrement du block
2. `src/config/categories.ts` - Si nouvelle categorie
3. `public/r/previews/{block-name}.webp` - Screenshot preview

---

## 1. PRICING + STRIPE INTEGRATION

### 1.1 Objectif

Creer des composants pricing avec integration Stripe Checkout complete pour permettre aux utilisateurs de la librairie d'avoir un systeme de paiement fonctionnel.

### 1.2 Composants a Creer

#### pricing-04 (Stripe Ready)

```
/src/registry/blocks/pricing-04/
  ├── pricing.tsx                    # UI principale (plans cards)
  ├── /components/
  │   ├── plan-card.tsx              # Carte de plan individuelle
  │   ├── feature-list.tsx           # Liste des fonctionnalites
  │   ├── price-display.tsx          # Affichage prix (mensuel/annuel)
  │   ├── billing-toggle.tsx         # Switch mensuel/annuel
  │   └── index.ts
  ├── /stripe/
  │   ├── checkout-action.ts         # Server Action pour creer session Checkout
  │   ├── webhook-handler.ts         # Handler pour webhooks Stripe
  │   ├── config.ts                  # Configuration Stripe (prix IDs, etc.)
  │   └── README.md                  # Guide d'installation Stripe
  └── /types/
      └── pricing.ts                 # Types pour plans, features, etc.
```

### 1.3 Fonctionnalites Pricing

- [ ] Toggle mensuel/annuel avec remise affichee
- [ ] Highlight du plan recommande
- [ ] Badge "Popular" ou "Best Value"
- [ ] Liste de features avec icones check/x
- [ ] Bouton CTA avec integration Checkout
- [ ] Support des plans gratuits (Free tier)
- [ ] Affichage des prix en plusieurs devises (EUR, USD)

### 1.4 Integration Stripe

#### Server Actions

```typescript
// stripe/checkout-action.ts
"use server"

export async function createCheckoutSession(priceId: string, mode: 'payment' | 'subscription') {
  // 1. Creer session Stripe Checkout
  // 2. Retourner URL de redirection
}

export async function createPortalSession(customerId: string) {
  // Pour gestion abonnement existant
}
```

#### Webhooks

```typescript
// stripe/webhook-handler.ts (pour app/api/stripe/webhook/route.ts)
export async function handleStripeWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
    case 'invoice.payment_succeeded':
    case 'invoice.payment_failed':
  }
}
```

### 1.5 Variables d'Environnement Requises

```env
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

### 1.6 Documentation a Fournir

- Guide de configuration Stripe Dashboard
- Setup des Price IDs
- Configuration webhook endpoint
- Exemple de schema BDD pour stocker subscriptions

---

## 2. TABLE AVEC BASE DE DONNEES

### 2.1 Objectif

Creer un composant table data-driven qui charge les donnees depuis une base de donnees avec pagination serveur, tri, filtres, et recherche.

### 2.2 Composants a Creer

#### table-02 (Data-Driven Table)

```
/src/registry/blocks/table-02/
  ├── table.tsx                      # Composant principal
  ├── /components/
  │   ├── data-table.tsx             # Table avec TanStack Table
  │   ├── pagination.tsx             # Pagination serveur
  │   ├── column-header.tsx          # Header avec tri
  │   ├── filters.tsx                # Barre de filtres
  │   ├── search-input.tsx           # Recherche
  │   ├── bulk-actions.tsx           # Actions groupees
  │   ├── row-actions.tsx            # Actions par ligne (dropdown)
  │   ├── loading-skeleton.tsx       # Skeleton pendant chargement
  │   └── index.ts
  ├── /supabase/
  │   ├── use-table-data.ts          # Hook pour fetch avec filtres
  │   ├── table-actions.ts           # CRUD operations
  │   └── README.md
  ├── /postgres/
  │   ├── fetch-action.ts            # Server Action fetch avec pagination
  │   ├── crud-actions.ts            # Server Actions CRUD
  │   ├── schema.ts                  # Schema Drizzle exemple
  │   └── README.md
  └── /types/
      ├── table.ts                   # Types generiques table
      └── filters.ts                 # Types pour filtres
```

### 2.3 Fonctionnalites Table

#### Core Features
- [ ] Pagination serveur (pas de chargement complet)
- [ ] Tri par colonnes (ASC/DESC)
- [ ] Recherche globale
- [ ] Filtres par colonne (text, select, date range, number range)
- [ ] Selection de lignes (checkbox)
- [ ] Actions groupees sur selection
- [ ] Actions par ligne (edit, delete, view)

#### UX Features
- [ ] Loading states (skeleton)
- [ ] Empty state
- [ ] Error state avec retry
- [ ] Compteur de resultats
- [ ] Indicateur de filtres actifs
- [ ] Reset des filtres
- [ ] Export CSV (optionnel)

### 2.4 Integration Supabase

```typescript
// supabase/use-table-data.ts
"use client"

interface UseTableDataOptions<T> {
  tableName: string;
  columns: string[];
  pageSize?: number;
  initialFilters?: Filter[];
}

export function useTableData<T>(options: UseTableDataOptions<T>) {
  // Retourne: { data, loading, error, pagination, setFilters, setSort, refetch }
}
```

#### Query Pattern Supabase

```typescript
const query = supabase
  .from(tableName)
  .select('*', { count: 'exact' })
  .range(offset, offset + pageSize - 1)
  .order(sortColumn, { ascending: sortDirection === 'asc' });

// Appliquer filtres dynamiquement
filters.forEach(filter => {
  switch(filter.operator) {
    case 'eq': query.eq(filter.column, filter.value);
    case 'ilike': query.ilike(filter.column, `%${filter.value}%`);
    case 'gte': query.gte(filter.column, filter.value);
    // etc.
  }
});
```

### 2.5 Integration PostgreSQL/Drizzle/Neon

```typescript
// postgres/fetch-action.ts
"use server"

import { db } from "@/db";
import { sql, count, asc, desc, ilike, eq, gte, lte } from "drizzle-orm";

interface FetchTableDataParams {
  page: number;
  pageSize: number;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  filters?: Filter[];
  search?: string;
}

export async function fetchTableData<T>(
  table: PgTable,
  params: FetchTableDataParams
): Promise<{ data: T[]; total: number }> {
  // 1. Construire WHERE clause dynamique
  // 2. Appliquer pagination LIMIT/OFFSET
  // 3. Appliquer ORDER BY
  // 4. Retourner data + count total
}
```

#### Schema Drizzle Exemple

```typescript
// postgres/schema.ts
import { pgTable, serial, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }),
  status: varchar("status", { length: 50 }).default("active"),
  role: varchar("role", { length: 50 }).default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});
```

### 2.6 SQL Schemas

#### Supabase

```sql
-- Table exemple pour demo
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'active',
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

#### PostgreSQL (Neon/Vercel)

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
```

---

## 3. DASHBOARD DATA-DRIVEN

### 3.1 Objectif

Creer un nouveau dashboard (dashboard-03) qui fetch des donnees reelles depuis le backend avec metriques, graphiques, et tables - pas de donnees hardcodees.

### 3.2 Composants a Creer

#### dashboard-03 (Data-Driven Dashboard)

```
/src/registry/blocks/dashboard-03/
  ├── dashboard.tsx                  # Layout principal
  ├── /components/
  │   ├── sidebar.tsx                # Navigation (reprendre pattern dashboard-01)
  │   ├── header.tsx                 # Header avec user menu
  │   ├── stat-card.tsx              # Card metrique avec loading state
  │   ├── chart-card.tsx             # Container pour graphiques
  │   ├── recent-activity.tsx        # Liste activites recentes
  │   ├── quick-actions.tsx          # Actions rapides
  │   ├── data-table-widget.tsx      # Mini table integree
  │   └── index.ts
  ├── /supabase/
  │   ├── use-dashboard-data.ts      # Hook agregation donnees
  │   ├── use-realtime-stats.ts      # Hook temps reel (optionnel)
  │   └── README.md
  ├── /postgres/
  │   ├── dashboard-actions.ts       # Server Actions pour fetch stats
  │   ├── queries.ts                 # Requetes SQL optimisees
  │   └── README.md
  └── /types/
      └── dashboard.ts               # Types pour stats, widgets
```

### 3.3 Widgets Dashboard

- [ ] **Stat Cards** (4) - KPIs principaux avec evolution
- [ ] **Revenue Chart** - Graphique ligne/barre revenus
- [ ] **Activity Feed** - Dernieres actions/evenements
- [ ] **User Growth Chart** - Evolution utilisateurs
- [ ] **Recent Items Table** - 5-10 derniers items
- [ ] **Quick Actions** - Boutons actions frequentes
- [ ] **Alerts/Notifications** - Alertes systeme

### 3.4 Integration Supabase

```typescript
// supabase/use-dashboard-data.ts
"use client"

interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  activeSubscriptions: number;
  conversionRate: number;
  revenueHistory: { date: string; amount: number }[];
  recentActivity: Activity[];
}

export function useDashboardData() {
  // Agregation de plusieurs requetes
  // Retourne: { stats, loading, error, refetch }
}
```

#### Requetes Supabase

```typescript
// Stats agregees
const [
  { count: totalUsers },
  { data: revenueData },
  { data: recentActivity }
] = await Promise.all([
  supabase.from('users').select('*', { count: 'exact', head: true }),
  supabase.from('orders').select('amount').gte('created_at', startOfMonth),
  supabase.from('activity_log').select('*').order('created_at', { ascending: false }).limit(10)
]);
```

### 3.5 Integration PostgreSQL/Drizzle

```typescript
// postgres/dashboard-actions.ts
"use server"

export async function getDashboardStats(): Promise<DashboardStats> {
  const [users, revenue, activity] = await Promise.all([
    db.select({ count: count() }).from(usersTable),
    db.select({
      total: sql<number>`SUM(amount)`,
      date: sql<string>`DATE(created_at)`
    }).from(ordersTable).groupBy(sql`DATE(created_at)`),
    db.select().from(activityTable).orderBy(desc(activityTable.createdAt)).limit(10)
  ]);

  return { totalUsers: users[0].count, ... };
}
```

### 3.6 SQL Schemas Necessaires

```sql
-- Activity log
CREATE TABLE activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders (pour revenus)
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_activity_created ON activity_log(created_at DESC);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
```

---

## 4. AUTHENTIFICATION SUPABASE

### 4.1 Objectif

Creer des composants d'authentification integres avec Supabase Auth, supportant les providers OAuth (Google, GitHub, etc.) et l'authentification par email.

### 4.2 Composants a Creer

#### auth-01 (Complete Auth Flow)

```
/src/registry/blocks/auth-01/
  ├── /components/
  │   ├── login-form.tsx             # Formulaire connexion
  │   ├── register-form.tsx          # Formulaire inscription
  │   ├── forgot-password-form.tsx   # Reset password
  │   ├── oauth-buttons.tsx          # Boutons Google, GitHub, etc.
  │   ├── magic-link-form.tsx        # Connexion sans mot de passe
  │   ├── verify-email.tsx           # Page verification email
  │   ├── auth-layout.tsx            # Layout commun auth pages
  │   └── index.ts
  ├── /supabase/
  │   ├── auth-actions.ts            # Server Actions auth
  │   ├── use-auth.ts                # Hook etat authentification
  │   ├── auth-provider.tsx          # Context provider
  │   ├── middleware.ts              # Middleware protection routes
  │   └── README.md
  ├── /hooks/
  │   ├── use-user.ts                # Hook user courant
  │   └── use-session.ts             # Hook session
  └── /types/
      └── auth.ts                    # Types User, Session, etc.
```

### 4.3 Fonctionnalites Auth

#### Methodes d'Authentification
- [ ] Email + Password (signup/login)
- [ ] Magic Link (passwordless)
- [ ] OAuth Providers:
  - [ ] Google
  - [ ] GitHub
  - [ ] Discord (optionnel)
  - [ ] Twitter/X (optionnel)

#### Flows
- [ ] Inscription avec verification email
- [ ] Connexion
- [ ] Deconnexion
- [ ] Mot de passe oublie
- [ ] Reset mot de passe
- [ ] Update profil
- [ ] Delete compte

### 4.4 Integration Supabase Auth

#### Server Actions

```typescript
// supabase/auth-actions.ts
"use server"

import { createClient } from "@/lib/supabase/server";

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return { user: data.user };
}

export async function signUpWithEmail(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) throw new Error(error.message);
  return { user: data.user };
}

export async function signInWithOAuth(provider: 'google' | 'github') {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) throw new Error(error.message);
  return { url: data.url };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function resetPassword(email: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  });

  if (error) throw new Error(error.message);
}
```

#### Auth Provider

```typescript
// supabase/auth-provider.tsx
"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
```

#### Middleware Protection

```typescript
// supabase/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { /* cookie handlers */ } }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Redirect unauthenticated users
  if (!user && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}
```

### 4.5 Configuration Supabase Dashboard

#### Providers a configurer

```
Supabase Dashboard > Authentication > Providers

1. Google OAuth
   - Client ID
   - Client Secret
   - Authorized redirect URI: https://[project].supabase.co/auth/v1/callback

2. GitHub OAuth
   - Client ID
   - Client Secret
   - Authorization callback URL: https://[project].supabase.co/auth/v1/callback
```

### 4.6 Variables d'Environnement

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4.7 Route Handler Callback

```typescript
// app/auth/callback/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/error`);
}
```

---

## 5. CHECKLIST GLOBALE

### Avant de commencer chaque feature

- [ ] Lire les composants existants similaires
- [ ] Verifier les patterns dans waitlist-01
- [ ] S'assurer de ne pas modifier le code existant inutilement

### Pour chaque nouveau block

- [ ] Creer la structure de dossiers
- [ ] Implementer le composant principal (stack-agnostic)
- [ ] Implementer l'integration Supabase
- [ ] Implementer l'integration PostgreSQL/Drizzle
- [ ] Ajouter les types TypeScript
- [ ] Mettre a jour registry.json
- [ ] Creer la preview image (.webp)
- [ ] Documenter dans README.md par stack
- [ ] Tester le build (`pnpm build`)

### Tests a effectuer

- [ ] Composant render sans erreur
- [ ] Integration Supabase fonctionnelle
- [ ] Integration PostgreSQL fonctionnelle
- [ ] Responsive design (mobile/desktop)
- [ ] Loading states affichees
- [ ] Error states gerees
- [ ] Types TypeScript corrects

---

## 6. ORDRE D'EXECUTION RECOMMANDE

### Semaine 1 (Jours 1-7)

1. **Pricing-04 + Stripe** (3-4 jours)
   - Jour 1-2: UI composants pricing
   - Jour 3-4: Integration Stripe Checkout + Webhooks
   - Jour 4: Documentation + tests

2. **Table-02 Base** (3 jours)
   - Jour 5-6: UI table avec TanStack Table
   - Jour 7: Pagination, filtres, tri basiques

### Semaine 2 (Jours 8-14)

3. **Table-02 Integrations** (3 jours)
   - Jour 8-9: Integration Supabase
   - Jour 10: Integration PostgreSQL/Drizzle/Neon

4. **Dashboard-03** (4 jours)
   - Jour 11-12: UI dashboard + widgets
   - Jour 13: Integration Supabase
   - Jour 14: Integration PostgreSQL

### Semaine 3 (Jours 15-18)

5. **Auth-01** (4 jours)
   - Jour 15-16: UI formulaires auth
   - Jour 17: Integration Supabase Auth
   - Jour 18: OAuth providers + middleware

---

## 7. RESSOURCES

### Documentation

- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase OAuth](https://supabase.com/docs/guides/auth/social-login)
- [Drizzle ORM](https://orm.drizzle.team/docs/overview)
- [TanStack Table](https://tanstack.com/table/latest)
- [Neon PostgreSQL](https://neon.tech/docs)

### Dependencies a installer si necessaire

```bash
# Stripe
pnpm add stripe @stripe/stripe-js

# TanStack Table (si pas deja present)
pnpm add @tanstack/react-table

# Drizzle (pour templates postgres)
pnpm add drizzle-orm
pnpm add -D drizzle-kit
```

---

## 8. NOTES IMPORTANTES

1. **Ne jamais modifier waitlist-01** - uniquement s'en inspirer
2. **Toujours deux versions** pour les features backend (Supabase + PostgreSQL)
3. **Stack-agnostic components** - le composant UI ne doit pas dependre du backend
4. **Server Actions** pour PostgreSQL (pas de client-side)
5. **Hooks client** pour Supabase (avec `"use client"`)
6. **Documentation** obligatoire pour chaque stack

---

## 9. DONNEES MOCK

### Pour Table-02

Creer des donnees mock realistes dans le composant pour la preview:

```typescript
// Exemple de donnees mock pour la table
const mockUsers = [
  { id: "1", email: "jean.dupont@example.com", name: "Jean Dupont", status: "active", role: "admin", createdAt: "2026-01-15" },
  { id: "2", email: "marie.martin@example.com", name: "Marie Martin", status: "active", role: "user", createdAt: "2026-01-18" },
  { id: "3", email: "pierre.durand@example.com", name: "Pierre Durand", status: "pending", role: "user", createdAt: "2026-01-20" },
  // ... 10-20 entrees pour montrer la pagination
];
```

### Pour Dashboard-03

```typescript
// Stats mock
const mockStats = {
  totalUsers: 1247,
  totalRevenue: 45890,
  activeSubscriptions: 342,
  conversionRate: 3.2,
};

// Donnees de graphique mock
const mockRevenueHistory = [
  { date: "Jan", amount: 4500 },
  { date: "Feb", amount: 5200 },
  { date: "Mar", amount: 4800 },
  // ...
];

// Activite recente mock
const mockActivity = [
  { id: "1", action: "New signup", user: "jean@example.com", time: "2 min ago" },
  { id: "2", action: "Subscription upgraded", user: "marie@example.com", time: "15 min ago" },
  // ...
];
```

### Pour Pricing-04

```typescript
// Plans mock
const mockPlans = [
  {
    name: "Starter",
    price: { monthly: 0, yearly: 0 },
    features: ["5 projects", "Basic analytics", "Email support"],
    highlighted: false,
    cta: "Get Started"
  },
  {
    name: "Pro",
    price: { monthly: 29, yearly: 290 },
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "API access"],
    highlighted: true,
    badge: "Popular",
    cta: "Start Free Trial"
  },
  {
    name: "Enterprise",
    price: { monthly: 99, yearly: 990 },
    features: ["Everything in Pro", "Custom integrations", "Dedicated support", "SLA guarantee"],
    highlighted: false,
    cta: "Contact Sales"
  }
];
```

---

## 10. RAPPEL FINAL

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   1. EXPLORER le code existant avant de commencer                 ║
║   2. S'INSPIRER des composants similaires (pricing-01, etc.)      ║
║   3. IMPLEMENTER selon la doc officielle (Stripe, Supabase)       ║
║   4. UTILISER des donnees mock pour les previews                  ║
║   5. PUSHER sur feature/1.1.test uniquement                       ║
║   6. VERIFIER le build apres chaque feature                       ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

*Document genere le 3 fevrier 2026*
*Pour execution sur Claude Code VPS*
*Branche: feature/1.1.test*

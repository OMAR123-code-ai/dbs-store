# DBS Store

Boutique e-commerce React/Vite de Digital Business Store.

## Démarrage local

```bash
npm install
npm run dev
```

Puis ouvrir l'URL locale affichée par Vite.

## Architecture prévue

- Frontend React/Vite
- Catalogue dynamique
- Panier et checkout
- Données de démonstration tant que l'API n'est pas branchée
- Future passerelle Cloudflare Function -> Google Apps Script
- Futur tableau de bord connecté au même Apps Script

## API

Sans `VITE_API_URL`, la boutique utilise `src/data/catalog.js`.

Quand la passerelle sera prête, créer un fichier `.env.local` :

```env
VITE_API_URL=https://votre-passerelle.example.com/api
```

Endpoints prévus :

- `GET /catalog`
- `POST /orders`

Le contrat de données contient déjà produits, images, variantes, stock, caractéristiques, promotions et catégories.

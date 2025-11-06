# Orly Valet – Application web de voiturier

Ce dépôt contient le code source de **Orly Valet**, un site web créé avec Vite et React.  
Le site permet de réserver un service de voiturier à l’aéroport d’Orly et est conçu pour être
hébergé gratuitement via **GitHub Pages** avec un domaine personnalisé.

## Pré-requis

- [Node.js](https://nodejs.org/) ≥ 18 (installé sur votre machine)
- Un compte [GitHub](https://github.com/) pour héberger le site
- Un nom de domaine (facultatif) : ce projet est configuré pour utiliser `valet-orly.fr`.

## Installation et développement local

1. **Cloner le dépôt ou décompresser l’archive** :
   ```bash
   git clone https://github.com/votre-utilisateur/orly-valet.git
   cd orly-valet
   ```
   ou bien décompressez l’archive ZIP fournie et ouvrez le dossier correspondant.

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Démarrer l’environnement de développement** :
   ```bash
   npm run dev
   ```
   L’application sera accessible à l’adresse `http://localhost:5173/` par défaut.

## Construction d’une version statique

Pour générer une version optimisée prête à être déployée sur GitHub Pages :

```bash
npm run build
```

Le résultat se trouve dans le dossier `dist/`. Ce dossier contient une version statique du site.

## Déploiement sur GitHub Pages

1. **Créer un dépôt GitHub** intitulé `orly-valet` (ou un autre nom de votre choix).  
   Si vous utilisez l’archive fournie, vous pouvez simplement utiliser l’interface web de GitHub pour
   uploader tous les fichiers de ce dossier.

2. **Activer GitHub Pages** : dans les paramètres du dépôt (`Settings → Pages`), sélectionnez la
   branche `main` et le dossier racine (`/(root)`). Validez en cliquant sur **Save**.

3. **Nom de domaine personnalisé** : ce dépôt contient un fichier [`CNAME`](./CNAME)
   indiquant `valet-orly.fr`. Si vous utilisez votre propre domaine, modifiez ce fichier en
   remplaçant son contenu par votre nom de domaine. GitHub générera automatiquement un
   certificat HTTPS.

4. **Configuration DNS** : chez votre registraire (OVH par exemple), créez les entrées suivantes :

   | Type | Cible                 |
   |------|----------------------|
   | A    | 185.199.108.153      |
   | A    | 185.199.109.153      |
   | A    | 185.199.110.153      |
   | A    | 185.199.111.153      |
   | CNAME (optionnel) | `www` → `votre-utilisateur.github.io.` |

   Ces adresses pointent vers les serveurs de GitHub Pages.

Une fois les modifications DNS propagées (généralement quelques minutes), votre site sera accessible à
votre domaine personnalisé. Pour plus d’informations, consultez la documentation officielle de
[GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages).

## Assistance

Ce projet a été généré à partir des outils Base44 et modifié pour un déploiement sur GitHub Pages.  
Si vous rencontrez des problèmes ou avez des questions, n’hésitez pas à contacter l’équipe
Base44 à l’adresse : **app@base44.com**.
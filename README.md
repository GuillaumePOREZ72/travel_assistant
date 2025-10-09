# Travel Assistant 🌍

Une application web moderne pour explorer les pays du monde entier avec des informations détaillées, des cartes interactives et un convertisseur de devises.

## ✨ Fonctionnalités

- 🗺️ **Exploration des pays** : Parcourez plus de 250 pays avec leurs informations détaillées
- 🔍 **Recherche et filtrage** : Recherchez par nom de pays et filtrez par région
- 🗾 **Cartes interactives** : Visualisez la localisation des capitales avec Leaflet
- 💱 **Convertisseur de devises** : Conversion en temps réel entre différentes monnaies
- 🌓 **Mode sombre** : Interface adaptative avec support du thème sombre
- 📱 **Design responsive** : Optimisé pour mobile, tablette et desktop
- ⚡ **Performance optimisée** : Chargement progressif des cartes et des images

## 🚀 Technologies utilisées

- **Framework** : [Next.js 15.5.4](https://nextjs.org/) avec React 19
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Cartes** : Leaflet
- **Animations** : Framer Motion
- **Icônes** : Lucide React
- **API** : [REST Countries API](https://restcountries.com/)

## 📋 Prérequis

- Node.js 18.0 ou supérieur
- pnpm (recommandé) ou npm/yarn

## 🛠️ Installation

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/travel_assistant.git
cd travel_assistant/travel_app
```

2. **Installer les dépendances**
```bash
pnpm install
# ou
npm install
```

3. **Lancer le serveur de développement**
```bash
pnpm dev
# ou
npm run dev
```

4. **Ouvrir l'application**

Accédez à [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
travel_app/
├── src/
│   └── app/
│       ├── components/        # Composants React
│       │   ├── CountryCard.tsx
│       │   ├── Map.tsx
│       │   ├── LazyMap.tsx
│       │   └── ...
│       ├── page.tsx          # Page principale
│       ├── layout.tsx        # Layout global
│       └── globals.css       # Styles globaux
├── public/                   # Fichiers statiques
├── package.json
└── README.md
```

## 🎯 Commandes disponibles

```bash
# Développement
pnpm dev

# Build de production
pnpm build

# Démarrer en production
pnpm start

# Linter
pnpm lint
```

## 🌐 API utilisée

L'application utilise l'API gratuite [REST Countries](https://restcountries.com/) pour récupérer les informations sur les pays :
- Données géographiques
- Informations démographiques
- Devises et langues
- Drapeaux et armoiries

## 🎨 Fonctionnalités principales

### Cartes interactives
- Affichage de la localisation des capitales
- Zoom et navigation fluides
- Marqueurs personnalisés avec popups informatifs

### Convertisseur de devises
- Conversion en temps réel
- Support de toutes les devises mondiales
- Interface intuitive et responsive

### Performance
- Lazy loading des cartes
- Optimisation des images avec Next.js
- Chargement progressif du contenu

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge (dernières versions)
- ✅ iOS Safari
- ✅ Chrome mobile / Android

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

Votre nom - [@votre-username](https://github.com/votre-username)

## 🙏 Remerciements

- [REST Countries API](https://restcountries.com/) pour les données
- [Leaflet](https://leafletjs.com/) pour les cartes
- [Flagcdn](https://flagcdn.com/) pour les drapeaux HD
- La communauté Next.js

---

⭐ N'oubliez pas de mettre une étoile si vous aimez le projet

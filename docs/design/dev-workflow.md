# Workflow de développement

## 1. <a name="serveurs"></a>Serveurs

1. Se placer dans le répertoire du projet à tester. 

1. Lancer Brunch en mode "watch", afin de repèrer toute modification de fichier. Dès qu'il y a un changement, il va
construire à nouveau le package de l'application.
En lançant le serveur web en même temps, vous avez la possibilité d'accéder au package directement via une url.
```
brunch w -s
```
(raccourci de `brunch watch --server`)
Brunch va automatiquement créer un package de développement dans le répertoire `build` à la racine du projet (par
défaut; peut être configuré dans les [paramètres de Brunch][brunch-config]).
Le serveur web Brunch utilise ce répertoire comme racine de site.

1. Lancer le serveur FB-FLO :
```
node flo.js
```

1. Ouvrir l’application dans CHROME, avec l’url définie par le serveur de Brunch <http://localhost:3333> ou avec votre
propre serveur web

1. Ouvrir les DEV TOOLS de CHROME.

1. Activer le module FB-FLO

## 2. <a name="developpement"></a>Développement
Modifier les sources avec son éditeur préféré (PHPStorm, Eclipse, Sublime Text, etc.).
Les sources étant automatiquement compilées et injectées dans Chrome, il suffit d'accéder à l'application pour voir
directement les changements opérés.

## 3. <a name="packaging"></a>Packaging
Le packaging de l’application pour la production s'effectue avec la commande suivante, après une extraction GIT clean.
```
npm i --production
brunch b -P
```
(raccourci de `brunch build --production`)

D'autres environnements peuvent être créés (se référer à la [configuration de Brunch][brunch-config]) 


[brunch-config]: <https://github.com/brunch/brunch/blob/stable/docs/config.md> (Configuration de Brunch)
# Environnement de développement

__Note__ : il peut être nécessaire de préfixer les commandes à exécuter avec la commande `sudo`, pour installer les
différents outils en tant qu'administrateur, selon le type d'OS.

__Note__ : bien que celà soit déconseillé, ces différents outils peuvent être installés localement, dans un projet, en
supprimant l'option `-g` qui suit la commande `npm install`.

## 1. Middleware Javascript [Node][node]
Node est un middleware pour l'exécution de code Javascript, sans nécessiter l'installation d'un navigateur. Node fournit
également l'installeur NPM, permettant d'installer et exécuter facilement des applications Javascript.

Node est utilisé pour l'exécution des outils de construction (build) et de test. Il n'est pas utilisé pour l'exécution
de l'application.

- Télécharger et installer Node.

__Note__ : sous Windows, télécharger l'installeur `MSI`, car l'exécutable seul `node.exe` ne donne pas accès à
l'installeur de packages `npm`. Pendant l'installation, ne pas sélectionner l'option "Add to PATH".

- [Windows] : créer une variable d'environnement `NODE_HOME` contenant la valeur est le chemin absolu du répertoire
d'installation de Node.
- [Windows] : créer une variable d'environnement `NODEGLOBALCACHE_HOME` contenant le répertoire racine du cache des
dépendances globales `%APPDATA%\npm`.
- Contrôler que Node est correctement installé en affichant son numéro de version :

  ```sh
node -v
v0.10.33
  ```

- Contrôler que NPM est correctement installé en affichant son numéro de version :

  ```sh
npm -v
1.4.28
  ```

## 2. Gestionnaire de dépendances [Bower][bower]
Bower est un gestionnaire de dépendances Javascript, utilisable pour le développement d'applications web. Bower est
lui-même écrit en Javascript, ce qui nécessite de disposer d'une version opérationnelle du middleware Node pour
l'utiliser.

- Ouvrir invite de commandes et exécuter la commande suivante :

  ```sh
npm install -g bower
  ```

- Contrôler que Bower est correctement installé en affichant son numéro de version :

  ```sh
bower --version
1.3.12
  ```

## 3. Compilateur [Brunch][brunch]
Brunch compile l'ensemble des ressources Javascript, CSS utilisées de pages HTML, pour optimiser leur temps de
téléchargement, et leur exécution sur les navigateurs des utilisateurs.

- Ouvrir invite de commandes et exécuter la commande suivante :

  ```sh
npm install -g brunch
  ```

- Contrôler que Bower est correctement installé en affichant son numéro de version :

  ```sh
brunch -V
1.7.18
  ```

## 4. Synchronisation front [client fb-flo][fb-flo-client]/[serveur fb-flo][fb-flo-server]
fb-flo est un couple serveur + extension pour le navigateur Chrome, capable de synchroniser automatiquement les
ressources statiques d'un projet avec celles que possède le navigateur. En phase de développement d'applications web, il
n'est plus nécessaire de recharger une page web sur le navigateur pour recevoir les dernières mises à jour de scripts
Javascript, de feuilles de styles CSS, ou tout autre ressource statique. Le serveur observe les changements dans le
système de fichiers, l'extension se charge du rafraîchissement à la volée.

- Ouvrir invite de commandes et exécuter la commande suivante :

  ```sh
npm install -g fb-flo
  ```

- Installer l'extension fb-flo sur le navigateur Chrome (depuis Chrome Web Store).

[node]: <http://nodejs.org> (Node)
[bower]: <http://bower.io> (Bower)
[brunch]: <http://brunch.io> (Brunch)
[fb-flo-client]: <https://chrome.google.com/webstore/detail/fb-flo/ahkfhobdidabddlalamkkiafpipdfchp> (Extension fb-flo pour Chrome)
[fb-flo-server]: <https://facebook.github.io/fb-flo> (Serveur fb-flo)

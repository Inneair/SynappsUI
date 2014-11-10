# Processus de développement

## <a name="sourcelayout"></a>1. Structure du code source
- Le répertoire `app` contient l'ensemble des fichiers sources de l'application front.
- Le répertoire `app/assets` contient les ressources non compilées dites "statiques" (images, pages HTML, ...).
- Le répertoire `app/css` contient les feuilles de style CSS.
- Le répertoire `app/javascript` contient les scripts Javascript.
- Le répertoire `public` est généré automatiquement par Brunch lors de la compilation. Le serveur fb-flo scrute ce
répertoire pour y détecter toute modification de fichier.

## <a name="commands"></a>2. Commandes élémentaires
### 2.1. Compilation
La compilation des script Javascript et des feuilles de Style CSS s'effectue à l'aide d'une des commandes suivantes :
```sh
brunch build [--production]
brunch b [-P]
```
Les options `-P` et `--production` permettent d'optimiser la compilation en vue d'un déploiement sur un environnement de
production.

### 2.2. Publication d'un package

__TBD__

## <a name="injection"></a>3. Injection à la volée
L'injection à la volée permet de rafraîchir automatiquement une page visualisée dans un navigateur Chrome, dès qu'une
modification a lieu sur une des ressources utilisées dans la page. Les étapes décrites ci-dessous ne sont pas
obligatoires pour développer, mais peuvent grandement accélérer le test de modifications

- Se placer dans le répertoire racine du projet. 
- Démarrer la compilation à la volée de Brunch avec l'une des commandes suivantes :

  ```sh
brunch watch [-server]
brunch w [-s]
```
Les options `-s` et `--server` démarrent un serveur HTTP, pour permettre d'accéder aux ressources du répertoire
`public`. Cette option est utile dans le cas où aucun serveur HTTP n'est installé ou configuré sur le poste de
développement pour visualiser ces ressources. Cette commande, raccourci de `brunch watch [--server]`, va automatiquement
compiler - via la commande `brunch build` - dans le répertoire `public` les ressources générées dynamiquement (scripts
Javascript et feuilles de style CSS), et copier les ressources statiques. Ce répertoire est paramétrable dans la
[configuration de Brunch][brunch-config].

- Démarrer le serveur fb-flo pour détecter les modifications à chaud dans le répertoire `public` :

  ```sh
node flo.js
```

- Ouvrir le navigateur Chrome, et accéder à la page principale de l'application (l'URL peut alors cibler un serveur HTTP
type Apache, ou le serveur HTTP Brunch situé par défaut à l'adresse <http://localhost:3333>).

- Dans Chrome, ouvrir les outils de développement.
- Vérifier que l'extension fb-flo est activée (option dans l'onglet 'flo' des outils de développement).


## <a name="developpement"></a>4. Développement
Si l'injection à la volée a été activée (cf. paragraphe précédent), les fichiers sources sont automatiquement compilés
et le résultat de la compilation ré-injecté dans le navigateur Chrome, dès qu'une modification a lieu. Il n'est alors
plus nécessaire de rafraîchir la page (cas des scripts Javascript et des feuilles de style CSS).

[brunch-config]: <https://github.com/brunch/brunch/blob/stable/docs/config.md> (Configuration de Brunch)

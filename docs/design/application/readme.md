# L'application en détail

L'application front est composée d'une page HTML, de feuilles de style CSS, et de scripts Javascript. Cet ensemble
suffit à fournir un dynamisme sur l'interface graphique (le navigateur web), et à interagir avec l'application côté
serveur.

Les scripts Javascript peuvent être des scripts de frameworks (AngularJS, ...), de librairies du marché (PLupload, ...),
ou des scripts de l'application.

## <a name="framework"></a>1. Le framework

### 1.1. Initialisation

La première fois qu'un utilisateur souhaite accéder à l'interface web de l'application, il saisit une URL dans le
navigateur (typiquement quelque chose comme `http://www.monapplication.com`). Après validation, le navigateur contacte
le serveur correspondant à l'URL saisie, pour obtenir la page demandée, et reçoît en principe une réponse contenant de
l'HTML. Cette réponse provient du fichier `app/assets/index.html`. Le code HTML ci-dessous montre les éléments
principaux qui entrent en jeu dans la création de l'interface web sur le navigateur :
```html
<!DOCTYPE html>
<html data-ng-app="inneair.origami" data-ng-strict-di>
<head>
    <meta charset="UTF-8">
    <base href="/">
    <title>Unique page de l'application | Page d'accueil</title>
    <script src="/js/vendor.js" type="text/javascript"></script>
    <script src="/js/app-x.y.z.js" type="text/javascript"></script>
</head>
<body data-ui-view="home">
    <!-- Menu principal de l'application -->
    <div data-ui-view="menu">
        Le menu de l'application devrait apparaître ici.
    </div>

    <!-- Contenu contextuel -->
    <div data-ui-view="content">
        Le contenu de la page devrait apparaître ici.
    </div>
</body>
</html>
```
L'élément HTML qui porte l'attribut `data-ng-app` modélise le modèle de disposition dans AngularJS (template layout).
Cet attribut indique au framework AngularJS l'élément HTML qui "porte" l'application Javascript. Lorsque le framework
trouve cet attribut, il exécute 3 actions importantes :
- Création de l'injecteur de dépendances (voir la section suivante).
- Création du contexte de l'application, qui délimite la portée (visibilité) de l'application à l'intérieur de la page.
- Compilation du DOM à partir de l'élément sur lequel est apposé l'attribut `data-ng-app`, afin de détecter et traiter
les directives et les bindings dynamiques qui y sont inscrits.
- Recherche et instanciation des fournisseurs ('providers') AngularJS.

L'attribut `data-ng-strict-di` permet d'activer un mode strict dans l'injecteur de dépendances, afin que celui-ci
reporte une erreur si un service/fabrique/fournisseur/contrôleur n'utilise pas des annotations explicites pour qualifier
ses dépendances. Cet attribut a du sens dans le cas où le code Javascript est optimisé pendant la construction (build),
car les variables sont renommées, et l'injecteur risque de ne plus trouver les dépendances attendues. La déclaration
explicite des dépendances couplée à l'utilisation de cet attribut est la solution recommandée en cas d'optimisation du
code.

L'utilisation de l'élément HTML `base` est nécessaire lorsque le binding de la barre d'adresse avec l'application
Javascript génère des chemins et non des ancres.

Le script Javascript `vendor.js` est construit automatiquement par [Brunch][brunch], et contient le code Javascript
optimisé des bibliothèques tierces (framework AngularJS, bibliothèques de composants, etc.).

Le script Javascript `app-x.y.z.js` est construit automatiquement par [Brunch][brunch], et contient le code Javascript
optimisé de l'application.

L'attribut `data-ui-view` marque l'élément racine des modèles de visualisation (communément appelés "vues"). Le modèle
de disposition sert de conteneur pour les vues. Leur inclusion dans le modèle de disposition est régit par le composant
`angular-ui-router`. Ce composant, dissocié du framework, met en relation les contrôleurs, les vues, et l'URL affichée
dans la barre d'adresse du navigateur. Le composant `angular-ui-router` fournit une meilleure abstraction de l'état de
l'interface graphique, et des fonctionnalités avancées.

__Note__ : l'attribut `data-ui-view` provient du composant `angular-ui-router`. Ce composant est une alternative à celui
proposé par défaut dans AngularJS (`angular-route`), et qui fonctionne avec l'attribut `data-ng-view`. Ces deux
composants ne peuvent pas fonctionner conjointement, et seul l'un des deux peut être utilisé.

### 1.2. Injection de dépendances

L'injecteur de dépendances charge les définitions des modules, leurs fournisseurs, et récupère les instances de services
quand celà est nécessaire. Il est utilisé lors de la création d'un contrôleur, d'un service, d'une fabrique d'objets,
d'un fournisseur, pour identifier les dépendances du composant créé, les instancier si nécessaire, et les injecter dans
le constructeur.

Cet [article][angularjs-instantiation] explique en détail les différences entre un fournisseur, une fabrique, un
service, un contrôleur, et leur instanciation.

### 1.3. Structure du code source

La structure proposée ci-après pour le code source est intimement liée à l'utilisation de [Brunch][brunch].
L'utilisation d'un autre outil de construction peut nécessiter la révision de cette structure.

```
/app
    /assets
        index.html
        /css
            /theme1
                stylesheet1.css
                ...
        /domain1
            view1.html
            /subdomain1
                view11.html
                ...
    /domain1
        Domain1Module.js
        /subdomain1
            Model11.js
            Model12.js
            Model11Controller.js
            Model11Store.js
            Model12Manager.js
        /subdomain2
            Model21.js
            ...
    /domain2
        Domain2Module.js
        ...
    /library1
        Object1.js
        Object2.js
    ApplicationModule.js
/bower_components
/public
bower.json
brunch-config.coffee
flo.js
package.json
```

#### 1.3.1. Fichiers de configuration

Le fichier `bower.json` contient la configuration du gestionnaire de packages Javascript [Bower][bower]. C'est un
équivalent du gestionnaire de packages PHP [Composer][composer].

#### 1.3.2. Vues HTML

Les fichiers contenant les vues HTML doivent être déposés dans le répertoire `app/assets`. Le cas échéant, ils peuvent être
classés par domaine/sous-domaine métier. La vue principale de l'interface graphique est située dans le fichier
`app/assets/index.html`. Ce fichier est chargé quelque soit l'URL saisie par l'utilisateur.

#### 1.3.3. Feuilles de style CSS

Les feuilles de style doivent être déposées dans le répertoire `app/assets/css`. L'organisation des feuilles de style
est libre, mais elle doit permettre de gérer différent thèmes graphiques. Pour celà, une structure de sous-répertoires
de "thème" peut être avantageuse.

#### 1.3.4. Scripts Javascript

Les scripts Javascript doivent être déposés dans le répertoire `app`, et en dehors du répertoire `app/assets`. La
contrainte principale d'organisation est d'utiliser un fichier par composant :
modules/contrôleurs/services/fabriques/modèles AngularJS, ou composants libres. Tous les fichiers Javascript doivent
débuter par la directive `"use strict";`.

### 1.4. Modèles de programmation

#### 1.4.1. Modules

De nos jours, les applications sont structurées en module, afin de faciliter la maintenance, l'évolution, et limiter le
couplage entre les composants. Le framework AngularJS fournit un mécanisme permettant de répartir les composants dans
des modules. Un module AngularJS est un objet qui regroupe logiquement un ensemble de fonctionnalités. La structure
préconisée est d'utiliser un fichier pour la déclaration de chaque module, soit un fichier pour le module de
l'application, et un fichier par modules métier. Le nom des fichiers respecte la syntaxe `*Module.js`. Le préfixe est
libre, et ce même pour le fichier du module de l'application, `app\ApplicationModule.js` dans l'exemple précédent.

Les modules contiennent la configuration de l'application, du routage (déclaration des "états" possibles), et de
façon générale de certains services.

##### a) Module d'application
```javascript
'use strict';

// Create the application module, and declare its dependencies (modules).
angular.module('myapplication', [
    'ui.router',
    'inneair.origami.studio',
    'inneair.origami.editor'
]).config([
    '$locationProvider',
    '$urlRouterProvider',
    '$stateProvider',
    function($locationProvider, $urlRouterProvider, $stateProvider) {
        // Tries to use HTML5 history component for URLs, if supported. Use anchors as a fallback.
        $locationProvider.html5Mode(true);

        // Routing rules.
        // Default path when bootstrapping the application, or for unknown paths.
        // A state is activated when its path matches the path in the browser URL.
        $urlRouterProvider.otherwise('/editor');

        // The 'origami' state is the root router state, it declares two views are existing simultaneously, and
        // implicitly targets the topmost 'data-ui-view' HTML attribute.
        $stateProvider.state({
            name: 'origami',
            views: {
                'menu': {
                    templateUrl: '/menu.html'
                },
                'content': {
                }
            }
        });
    }
]);
```

##### b) Module métier
```javascript
'use strict';

// Create the editor module, and declare its dependencies (modules).
angular.module('mymodule', [
    'ngResource'
]).config([
    '$urlRouterProvider',
    '$stateProvider',
    function($urlRouterProvider, $stateProvider) {
        // Routing rules.
        // Default URL for the module.
        $urlRouterProvider.when('/editor', '/editor/page');

        // The 'editor' state is the root router state of the editor module.
        // The 'page' state matches the display of the list of pages.
        $stateProvider.state({
            name: 'editor',
            parent: 'origami',
            url: '/editor',
            views: {
                'content@': {
                    template: '<div data-ui-view></div>'
                }
            }
        }).state({
            name: 'page',
            parent: 'editor',
            url: '/page',
            templateUrl: '/editor/page-list.html',
            controller: 'MyModuleController'
        });
    }
]);
```

Il est important de noter que la vue dans laquelle le template de l'état `editor` est affiché, est celle identifiée par
`content@` dans la page `app/assets/index.html`.

##### c) Configuration Brunch

L'outil de construction de l'application doit être configuré afin que les fichiers des modules soient agrégés en premier
dans le script optimisé qui est produit à la fin de la construction. Les fichiers de modules créent réellement les
modules, tandis que les autres fichiers créent des composants à l'intérieur de ces modules. Il est donc impératif que le
code des fichiers de modules soit exécuté en premier lieu. Cette configuration intervient dans le fichier
`brunch-config.coffee`, par l'intermédiaire de la directive `order` :
```coffee
exports.config =
    modules:
        definition: false
        wrapper: false
    files:
        javascripts:
            joinTo:
                'js/app-1.0.0.js': /^app/
                'js/vendor.js': /^(bower_components|vendor)/
            order:
                before: [
                    'app/ApplicationModule.js',
                    'app/domain1/Domain1Module.js',
                    'app/domain2/Domain2Module.js'
                ]
        stylesheets:
            joinTo:
                'css/app-1.0.0.css': /^app/
                'css/vendor.css': /^(?!app)/
        templates:
            joinTo: 'js/app-1.0.0.js'
```

#### 1.4.2. Modèles métier

Un modèle métier est un objet qui regroupe logiquement un ensemble de propriétés et de comportement, et qui représente
un concept traité par l'application. Le nom des fichiers contenant l'implémentation d'un modèle métier respecte la
syntaxe `<NomDuModèle>.js`.

##### a) Sans dépendance

```javascript
"use strict";

angular.module('mymodule').factory(
    'Wheel',
    [function WheelFactory() {
        function Wheel(data) {
            this.brandName = null;
            this.modelName = null;
            this.diameter = null;

            if (data != null) {
                for (var property in this) {
                    if (data.hasOwnProperty(property)) {
                        this[property] = data[property];
                    }
                }
            }
        }

        Wheel.prototype.getProductName = function() {
            return this.brandName + ' ' + this.modelName + ' ' + this.diameter + 'x';
        };

        return Wheel;
    }]
);
```

##### b) Avec dépendance

```javascript
"use strict";

angular.module('mymodule').factory(
    'Bike',
    ['Wheel', function BikeFactory(Wheel) {
        function Bike(data) {
            this.brandName = null;
            this.modelName = null;
            this.wheels = [new Wheel(), new Wheel()];

            if (data != null) {
                for (var property in this) {
                    if (data.hasOwnProperty(property)) {
                        this[property] = data[property];
                    }
                }
            }
        }

        Bike.prototype.getNumberOfWheels = function() {
            return this.wheels.length;
        };

        return Bike;
    }]
);
```

#### 1.4.3. Services

##### a) Modèle

Qu'il soit métier ou purement technique, un service peut-être créé de 3 façons avec AngularJS. La solution préconisée
ci-après est la seule permettant de pousser une configuration à l'initialisation de l'application. Par soucis
d'homogénéïté et de clarté du code, tous les services devront adopter le modèle d'implémentation suivant :
```javascript
"use strict";

angular.module('mymodule').provider(
    'BikeManufacturer',
    function BikeManufacturerProvider() {
        this.maxNumberOfBike = null;

        this.setMaxNumberOfBike = function(maxNumberOfBike) {
            this.maxNumberOfBike = maxNumberOfBike;
        };

        this.$get = ['Bike', function BikeManufacturerFactory(Bike) {
            function BikeManufacturer(data) {
                this.maxNumberOfBike = 1;
                this.bikeStore = [];

                for (var property in this) {
                    if (data.hasOwnProperty(property)) {
                        this[property] = data[property];
                    }
                }
            }

            BikeManufacturer.prototype.addBike = function(bike) {
                if (this.bikeStore.length < maxNumberOfBike) {
                    this.bikeStore.push(bike);
                }
            };

            return new BikeManufacturer({maxNumberOfBike: this.maxNumberOfBike});
        }];
    }
);
```

##### b) Configuration

La configuration du service se fait au travers du 'provider' auto-généré par AngularJS, typiquement injecté dans le
module d'application :
```javascript
'use strict';

// Create the application module, and declare its dependencies.
angular.module('myapplication', [
    'ui.router',
    'mymodule',
]).config([
    'BikeManufacturerProvider',
    function(bikeManufacturerProvider) {
        bikeManufacturerProvider.setMaxNumberOfBike(10);
    }
]);
```

#### 1.4.4. Contrôleur

Les contrôleur AngularJS servent à faire le lien entre le modèle de visualisation (vue HTML), les modèles contenant les
informations à afficher, et les services. Ils ne comportent aucun traitement métier.
```javascript
'use strict';

angular.module('mymodule').controller(
    'BikeController',
    ['$scope', 'BikeManufacturer', function BikeController($scope, bikeManufacturer) {
        $scope.maxNumberOfBike = bikeManufacturer.maxNumberOfBike;
    }]
);
```

[angularjs-instantiation]: <http://www.frangular.com/2012/12/differentes-facons-de-creer-un-service-angularjs.html> (Instanciation de composants AngularJS)
[composer]: <http://getcomposer.org> (Composer)
[bower]: <http://bower.io> (Bower)
[brunch]: <http://brunch.io> (Brunch)

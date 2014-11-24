# Modèle de page
Le code ci-dessous sert de référence pour construire un châpitre de la documentation.

    # Titre du châpitre
    ## 1. Présentation du besoin
    ### 1.1 Concept métier
    ### 1.2 Concept métier
    ## 2. User stories
    ### 2.1 US001 - Titre de l'histoire
    > Ceci est la syntaxe à utiliser pour indiquer un message d'information ou d'erreur.
    ### 2.2 US002 - Titre de l'histoire

# Guide de démarrage

Pour définir des __titres__, utiliser la syntaxe suivante :

    # Titre 1
    ## 1. Titre 2
    ### Titre 3
    #### Titre 4

Ce qui devrait produire:

> # Titre 1
> ## 1. Titre 2
> ### Titre 3
> #### Titre 4

Lorsque le formattage ne se passe pas comment prévu, celà peut être du à des lignes vides manquantes entre les
paragraphes.

La numérotation des titres n'est pas automatique, et doit être gérée manuellement. En revanche, celle des listes peut
être automatisée, avec une hiérarchisation, sous réserve d'utiliser une numérotation simple à un chiffre. Utiliser
systématiquement le même chiffre pour chaque élément, car le processeur incrémentera lui-même les chiffres
automatiquement :

    1. Elément 1
    1. Elément 2

devrait produire :

> 1. Elément 1
> 1. Elément 2

Les __caractères spéciaux__ doivent être échapés avec le caractère anti-slash (\\), pour désactiver leur comportement
par défaut.

Pour insérer un __lien__, définir tout d'abord celui-ci à la fin du document :

    [lien1]: <url entre < et >> (titre entre parenthèses)

Insérer le lien ensuite dans le document :

    Accéder au projet sur [GitHub][lien1].

Ce qui devrait produire:

[lien1]: <http://github.com/VincentClair/origami> (titre entre parenthèses)
> Accéder au projet sur [GitHub][lien1].

Des __ancres__ sont définies automatiquement pour chaque titre. Le titre suivant :

#### Un titre

est accessible en utilisant le code ci-dessous (l'ID de l'ancre est le texte du titre en minuscule, des tirets
remplaçant chaque espace) :

    [link2]: <#un-titre> (Une ancre vers un titre)
    Voici un lien vers [un titre][link2]

Ce qui devrait produire :

[link2]: <#un-titre> (Une ancre vers un titre)
> Voici un lien vers [un titre][link2]

Cependant, il est préférable d'utiliser une syntaxe alternative pour les ancres, qui consiste à insérer manuellement une
ancre HTML au début du titre :

    #### <a name="titre-bis"></a>Un autre titre bis

Ce qui devrait produire :

#### <a name="titre-bis"></a>Un titre bis
[link3]: <#titre-bis> (Une ancre vers un titre bis)
> Voici un lien vers [un titre bis][link3]

Utiliser un __tiret__ suivi d'un espace pour préfixer chaque __élément__ d'une liste :

- Elément 1
- Elément 2

Utiliser un simple underscore pour mettre un texte en __italique__ :

> _Avertissement_ : utiliser avec soin.

Utiliser un double underscore pour mettre un texte en __gras__ :

> __Avertissement__ : utiliser avec soin.

Utiliser \`\`\` pour encadrer un bloc de code :
```
public function isValid();
```
Ajouter optionnellement un nom de langage après les \`\`\` ouvrant, pour obtenir une coloration syntaxique. Par exemple,
en ajoutant `php` :
```php
public function isValid();
```

Utiliser le caractère \` pour mettre en évidence du code dans une phrase :

> Le code `echo $result;` permet de montrer la valeur de la variable.

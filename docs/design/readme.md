# Conception Technique

## 1. <a name="objectifs"></a>Objectifs
Il s'agit d'utiliser les meilleures technologies pour rendre :
- le code modulaire et lisible,
- le développement rapide basé sur des solutions éprouvées en appliquant les bonnes pratiques,
- le coût de production réduit.

## 2. <a name="index"></a>Table des matières
1. [Technologies][technologies]
  1. [Base][technologies-base]
  1. [Méta-langages][technologies-meta-langages]
  1. [Frameworks][technologies-frameworks]
  1. [Outils de développement et packaging][technologies-tools-packaging]
1. [Environnemnt de développement][dev-environment]
1. [Initialisation du projet][project-setup]
  1. [Depuis un répertoire vide][project-setup-scratch]
  1. [Depuis un modèle][project-setup-template]
1. [Workflow de développement][dev-workflow]
  1. [Structure du code source][dev-workflow-sourcelayout]
  1. [Commandes élémentaires][dev-workflow-commands]
    1. Compilation
    1. Publication d'un package
  1. [Injection à la volée][dev-workflow-injection]
  1. [Développement][dev-workflow-development]
1. [L'application en détails][application]
  1. [Le framework][application-fwk]
    1. Initialisation
    1. Injection de dépendances
    1. Structure du code source
      1. Fichiers de configuration
      1. Vues HTML
      1. Feuilles de style CSS
      1. Scripts Javascript
    1. Modèles de programmation
      1. Modules
        1. Module d'application
        1. Module métier
        1. Configuration Brunch
      1. Modèles métier
        1. Sans dépendance
        1. Avec dépendance
      1. Services
        1. Modèle
        1. Configuration
      1. Contrôleurs

[application]: <application/readme.md> (L'application en détails)
[application-fwk]: <application/readme.md#framework> (Le framework)

[dev-environment]: <dev-environment.md> (Environnement de développement)

[dev-workflow]: <dev-workflow.md> (Workflow de développement)
[dev-workflow-commands]: <dev-workflow.md#commands> (Commandes élémentaires)
[dev-workflow-sourcelayout]: <dev-workflow.md#sourcelayout> (Structure du code source)
[dev-workflow-injection]: <dev-workflow.md#injection> (Injection à la volée)
[dev-workflow-development]: <dev-workflow.md#developpement> (Développement)

[project-setup]: <project-setup.md> (Initialisation du projet)
[project-setup-scratch]: <project-setup.md#scratch> (Initialisation depuis un répertoire vide)
[project-setup-template]: <project-setup.md#template> (Initialisation depuis un modèle)

[technologies]: <technologies.md> (Technologies)
[technologies-base]: <technologies.md#base> (Technologies - Base)
[technologies-meta-langages]: <technologies.md#meta-langages> (Technologies - Méta-langages)
[technologies-frameworks]: <technologies.md#frameworks> (Technologies - Frameworks)
[technologies-tools-packaging]: <technologies.md#tools-packaging> (Technologies - Outils de développement et packaging)

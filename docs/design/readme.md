# Conception Technique

## 1. <a name="objectifs"></a>Objectifs
Les objectifs de ce document est de présenter les choix majeurs d'architecture et de conception, dont la compréhension
est indispensable pour maintenir le code de l'application.

Ces choix ont quant à eux pour objectifs de rendre le code maintenable, en le segmentant par domaine métier, et en
suivant les normes de développement pour chaque langage utilisé. Ceci devrait avoir pour effet immédiat d'accélérer les
temps de développement, et ainsi réduire les coûts de production.

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
  1. [Commandes élémentaires][dev-workflow-commands]
    1. Ajout de dépendances
    1. Mise à jour de dépendances
    1. Compilation
    1. Publication d'un package
  1. [Injection à la volée][dev-workflow-injection]
  1. [Développement][dev-workflow-development]
1. [L'application en détails][application]
  1. [Initialisation][application-bootstrap]
  1. [Injection de dépendances][application-ioc]
  1. [Structure du code source][application-codelayout]
    1. Fichiers de configuration
    1. Vues HTML
    1. Feuilles de style CSS
    1. Scripts Javascript
  1. [Modèles de programmation][application-templates]
    1. Modules
      1. Module d'application
      1. Module métier
      1. Configuration Brunch
    1. Modèles métier
      1. Sans dépendance
      1. Avec dépendance
    1. Services
      1. Service métier
      1. Service d'accès aux données
      1. Configuration
    1. Contrôleurs

[application]: <application/readme.md> (L'application en détails)
[application-bootstrap]: <application/readme.md#bootstrap> (Initialisation)
[application-ioc]: <application/readme.md#ioc> (Injection de dépendances)
[application-codelayout]: <application/readme.md#code-layout> (Structure du code source)
[application-templates]: <application/readme.md#bootstrap> (Modèles de programmation)

[dev-environment]: <dev-environment.md> (Environnement de développement)

[dev-workflow]: <dev-workflow.md> (Workflow de développement)
[dev-workflow-commands]: <dev-workflow.md#commands> (Commandes élémentaires)
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

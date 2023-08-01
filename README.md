
# Test Technique - BridgeDataProcessor

Ce projet est un test technique qui comprend un programme appelé `BridgeDataProcessor` conçu pour extraire et traiter des données à partir de l'API de BridgeAPI  et les sauvegarder dans un fichier JSON.

BridgeAPI docs : https://docs.bridgeapi.io/docs

## Prérequis

Avant d'exécuter ce programme, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Node.js (version 18.16.0)
- NPM (version 9.5.1)

## Installation

1. Clonez ce dépôt de code sur votre machine locale en utilisant la commande suivante :

```bash
git clone https://github.com/votre_utilisateur/test-technique-bridge.git
```

2. Accédez au répertoire du projet :

```bash
cd test-technique-bridge
```

3. Installez les dépendances requises en utilisant NPM :

```bash
npm install
```

## Exécution

Pour exécuter le programme `BridgeDataProcessor`, utilisez la commande suivante :

```bash
npm start
```

Le programme effectuera les actions suivantes :

1. Effectuer une demande d'authentification à l'API de BridgeAPI pour obtenir un jeton d'accès.
2. Extraire les éléments, comptes et transactions associés à ce jeton d'accès.
3. Sauvegarder les données extraites dans un fichier JSON nommé `result.json` dans le répertoire du projet.

## Virtualisation légère

Ou vous pouvez utiliser le docker que j'ai créer, si vous avez docker d'installer sur votre environnement.
Tapez les commandes suivantes :
-   docker build -t test-bridge .
-   docker run -it --rm test-bridge

## Configuration

Créez un fichier .env où vous y mettrez le CLIENT_ID, CLIENT_SECRET, EMAIL, PASSWD (password du user)

## Tests

Pour exécuter les tests unitaires pour le programme `BridgeDataProcessor`, utilisez la commande suivante :

```bash
npm test
```

Les tests utilisent Jest comme framework de test et comprennent des tests pour les différentes fonctionnalités du programme.

## Auteur

ELONGO PAMBA Grady 

## Licence

Ce projet est sous licence [MIT](LICENSE).

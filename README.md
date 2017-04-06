# npa-chat-client

L'objectif de ce TP est de découvrir les concepts d'Angular en implémentant une application basique de chat. 5 étapes sont nécessaires pour obtenir un résultat fonctionnel. Une sixème étape (bonus) permet d'expérimenter le *router* d'Angular avec l'implémentation d'une fonctionnalité de saisie de pseudonyme.

La correction de chaque étape est implémentée dans une branche `git` et vous permet à tout moment de repartir sur une base de code propre (`git checkout step-X`, avec X un chiffre de 1 à 6).

L'application de démarrage pour le TP se trouve sur la branche `master`.
- Récupérez le projet existant : `git clone https://github.com/nicolaspayot/npa-chat-client.git`
- Installez les dépendances requises avec `npm install`
- Lancer le serveur de développement local avec `npm start`. Si tout se passe bien, vous devriez avoir accès à l'application web sur `http://localhost:4200` :metal:

### Etape 1

Tout le code HTML se trouve pour l'instant dans le fichier `src/app/app.component.html`. La première étape consiste à mettre en place des composants pour simplifier ce template trop chargé.
- Créez un composant `InputComponent` dans un fichier `src/app/input/input.component.ts`. Il contient le contenu de la balise `<footer>`.
- Créez un composant `MessageListComponent` dans un fichier `src/app/message/message-list.component.ts`. Il contient le contenu de la balise `<main>` (la liste des messages à afficher).
- Enfin, créez un composant `MessageComponent` dans un fichier `src/app/message/message.component.ts`. Il contient le contenu de chaque message, c'est à dire la balise `<div class="message">`. Ce composant va être utilisé autant de fois qu'il y a de messages. Il doit donc pouvoir recevoir des données en entrée (`@Input()`). Ces propriétés sont les suivantes : `avatar`, `sender`, `timestamp`, `content`.

N'oubliez pas d'importer et déclarer (tableau `declarations`) tous ces composants dans le module principal de l'application, le fichier `src/app.module.ts`.

### Etape 2

La deuxième étape consiste à retirer du HTML le contenu des messages en dur pour créer une liste sur laquelle nous allons itérer.

- Utilisez le contenu de la liste [ici](https://gist.github.com/nicolaspayot/f090c27d671f0304966d10caea75a679) pour créer un fichier `src/app/message/messages.data.ts`.
- Vous remarquerez que la liste est typée : `Message[]`. Créez un fichier `src/app/message/message.ts`. Il contient une interface `Message` (exportée) et une interface `Sender` (interne).
- Créez un service `MessageService` dans un fichier `src/app/message/message.service.ts`, dont le rôle est de retourner la liste des messages dans une méthode `getMessages()`. Cette méthode retourne un `Observable` sur cette liste via `Observable.of(MESSAGES)`. Un `Observable` s'importe depuis `'rxjs/Rx'`. En retournant directement un `Observable`, nous n'aurons pas besoin de modifier l'implémentation du composant `MessageListComponent` quand `MessageService` utilisera le service `Http`, à la prochaine étape.

 `MessageService` va être injecté et utilisé par `MessageListComponent`. N'oubliez pas de configurer l'injecteur de ce service dans le module principal de l'application (tableau `providers`).
- Déclarez une variable `messages` dans `MessageListComponent` pour stocker la liste des messages du service. Utilisez la méthode `ngOnInit() { ... }` (implémentez l'interface `OnInit`) pour souscrire à la méthode `getMessages()` et instantier la liste.
- Utilisez la directive structurelle `*ngFor` sur la balise `<npa-message>` dans le template HTML de `MessageListComponent` pour afficher chaque message.

Maintenant que les messages se trouvent dans une liste, vous pouvez simplifier le composant `MessageComponent` en remplaçant ses propriétés par une seul et unique propriété (`data` par exemple), qui contiendra chaque objet *message* au complet.

### Etape 3

Dans cette troisième étape, nous allons effectuer une requête `GET` avec le service `Http` pour récupérer la liste des messages sur un serveur REST. L'URL à utiliser est la suivante : https://npa-chat.herokuapp.com/api/messages.

- Injectez le service `Http` dans `MessageService` (`@Injectable()`) et modifiez l'implémentation de la méthode `getMessages()` pour qu'elle retourne la liste des messages avec un appel à la méthode `get` de `Http`. Vous aurez besoin de l'operateur `map` (`import 'rxjs/add/operator/map'`) pour convertir un objet de type `Response` en liste de `Message`.
- Supprimez le dossier `src/assets/img/` et la liste des messages en dur. Normalement, les messages doivent s'afficher mais sans les avatars. En effet, les liens retournés sont de la forme `img/avatar.png`. Il vous faut donc construire l'URL complète de récupération de l'avatar du message courant, dans le composant `MessageComponent`. Cette dernière a la forme suivante : https://npa-chat.herokuapp.com/img/avatar.png.

### Etape 4

La quatrième étape consiste à permettre l'envoi d'un message.

- Utilisez le service `MessageService` pour implémenter une méthode `send(message)`. Cette méthode effectue une requête `POST` sur l'URL https://npa-chat.herokuapp.com/api/messages, avec pour paramètre un objet `{ message }` (*ES2015 shorthand notation*).
- Utilisez le composant `InputComponent` pour récupérer le contenu du nouveau message (propriété `[value]`, évènement `(input)`, sur le champ de saisie). Ce composant ne va pas utiliser directement `MessageService`, mais émettre un événement (`@Output()`) à destination de son composant parent `AppComponent`.  C'est cet événement qui transmettra le nouveau message, à partir de l'événement `(click)` du bouton "SEND".
- Enfin, dans le template HTML de `AppComponent`, interceptez l'événement provenant de `InputComponent` et envoyez le message reçu grâce à `MessageService`.

Votre message devrait s'afficher dans la liste après un rechargement de la page.

### Etape 5

Cette étape va nous permettre d'afficher automatiquement chaque message envoyé, sans avoir besoin de rafraîchir la page. Pour cela, nous allons utiliser une WebSocket avec `socket.io`.

- Installez les dépendances suivantes : 
  - `npm install --save socket.io-client`
  - `npm install --save @types/socket.io-client`
- Importez le module `io` dans `MessageService` : `import * as io from 'socket.io-client';`.
- Implémentez une méthode `onNewMessage()` dont le but est d'ouvir une connexion sur l'URL https://npa-chat.herokuapp.com, puis de retourner un `Observable` chargé d'émettre un événement à chaque fois qu'un nouveau message est reçu. Il faut ensuite "écoutez" l'événement `'messages/new'` avec cette `socket` et transmettre le message par l'`Observable` :

```typescript
onNewMessage(): Observable<Message> {
  const socket = io.connect(HOST_URL);
  return Observable.create(observer => {
    socket.on('messages/new', message => observer.next(message));
    return () => socket.disconnect();
  });
}
```

C'est au composant `MessageListComponent` que revient la charge d'incrémenter la liste des messages avec le nouveau message reçu : `this.messageService.onNewMessage().subscribe(...)`.

Comme vous pouvez le remarquer, l'écran qui contient la liste des messages ne scroll pas automatiquement vers le bas à chaque nouveau message, ce qui n'est pas idéal. Pour effectuer cette tâche, vous pouvez utiliser la méthode suivante :

```typescript
scrollToBottom() {
  const parent = this.elementRef.nativeElement.parentNode;
  setTimeout(() => {
    parent.scrollTop = parent.scrollHeight;
  });
}
```
N'oubliez pas d'importer et injecter `ElementRef` dans le composant. Appelez cette méthode à chaque fois que la liste des messages est incrémentée.

### Etape 6 (bonus)

L'objectif de la dernière étape est d'utiliser le *router* d'Angular. Pour cela, nous allons implémenter une fonctionnalité de saisie de pseudonyme afin que chaque utilisateur puisse identifier ses messages.

- Commencez par déplacer les dossiers `input`, et `message` dans un dossier `src/app/chat`.
- Créez un composant `ChatComponent` dans un fichier `src/app/chat/chat.component.ts`. Le template HTML associé contient maintenant le contenu du template HTML du composant principal.
- Créez ensuite un composant `LoginComponent` dans un fichier `src/app/login/login.component.ts`. Le template HTML à associer se trouve [ici](https://gist.github.com/nicolaspayot/2ef0632d328c1b5ea3b09857e4940a5c).
- Configurez les routes de l'application dans un fichier `src/app/app.routing.ts` pour que l'URL de base (`''`) affiche la vue de login et l'URL `'/chat'` la vue de saisie des messages. Le template HTML du composant principal ne contient plus que la balise `<router-outlet></router-outlet>`.

Il faut maintenant récupérer le pseudonyme de l'utilisateur et l'associer à chaque message saisi.

- Utilisez le composant `LoginComponent` pour récupérer le contenu du champ `nickname-input` (événement `(input)`). Vous pouvez utiliser le service `MessageService` pour y stocker la valeur de ce champ.
- Le bouton "START" redirige l'utilisateur sur la vue en charge de la saisie des messages (`routerLink`).
- Enfin, modifier l'implémentation de la méthode `send` du service `MessageService` pour envoyer le pseudonyme de l'utilisateur (paramètre `nickname`) avec son message.

Vous ne devriez plus être des `johndoe` :wink:












# MyTeam application

### General notes
1. API provides login and registration options only for defined users, for example michael.lawson@reqres.in, password doesn't matter as long as it fits validation
2. I chose SPA over SSR since to me it seems like a classic SPA example, a bunch of pages that user goes back and forth between
3. All actions, like login, register, update and delete are implemented according to reqres.in possibilities, meaning that the calls are being made and you can see the changes on the screen, but they won't persist between reloads or page changes, since on each page load I'm fetching information from the server

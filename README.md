# AFFIDA - CRM - APP

## TUTORIAL
Used https://github.com/iffy/electron-updater-example

## DEVELOP MODE
```
Package.json - main:"background.js"
```

## HOW TO PUBLISH
```
Delete dist_electron folder.
Delete dist folder.
Package.json - main:"background.js"
vue-cli-service electron:build
Package.json - main:"dist_electron/bundled/background.js"
electron-builder -p always
```


## WHAT IS IT?
L'app era stata sviluppata in Vue3 e con Electron aggiornato, l'auto-updater e i vari servizi funzionavano.
Unica modifica c'era bisogno di un preload.js al cui interno erano presenti le funzionalità per accedere al ipcRender.

Unico problema non risolto era il fatto che non fosse possibile utilizzare mongoose, per tanto è stato necessario fare un downgrade ad un progetto precedentemente funzionante per potersi collegare al database.



## TODO
1) Collegare BANCHE con RAPPEL BANCA -> Aggiungere campo obbiettivo annuo. / IDEGG Banca.




 https://finance.blackbird71.com/api/v2/data/entity/opportunityStage/query
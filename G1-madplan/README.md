# G1 Madplan

Dette er en simpel app til at holde styr på madopskrifter og planlægge ugens mad. Man kan gemme sine yndlingsretter, sætte dem ind i en ugeplan for hver ugedag, og få en samlet indkøbsliste ud fra det man har valgt.

## Hvad kan appen

1. Tilføje en ret med navn og ingredienser
2. Sætte en ret i en gruppe, for eksempel sunde retter eller hurtige retter
3. Redigere eller slette en gemt ret igen
4. Vælge en ret til hver dag i ugeplanen
5. Fjerne en valgt ret fra en dag igen
6. Åbne en indkøbsliste ud fra de retter der er valgt i ugeplanen
7. Gemme alt lokalt på telefonen, så data ikke forsvinder når appen lukkes

## Sider i appen

1. Favoritter. Viser alle gemte retter, gruppet hvis man har lavet grupper. Herfra kan man trykke sig ind på en ret for at se detaljer eller redigere den.
2. Detaljer om en ret. Åbnes ved tryk på en ret i favoritlisten og viser navn, gruppe og ingredienser.
3. Rediger ret. Åbnes fra detaljesiden og bruges til at ændre navn, ingredienser eller gruppe.
4. Tilføj ret. Siden hvor man opretter en ny ret med navn, ingredienser og en gruppe.
5. Ugeplan. Viser mandag til søndag med en knap per dag til at vælge en ret. Herfra kan man også åbne indkøbslisten.

## Teknisk

Appen er lavet med Expo og React Native. Data gemmes lokalt med AsyncStorage. Navigation mellem siderne foregår med React Navigation, både med bundfaner og en stack til favoritsiderne.

## Sådan køres appen

Kør npm install for at installere alle pakker. Kør derefter npm start for at starte Expo. Man kan også bruge npm run ios eller npm run android alt efter hvilken platform man tester på.

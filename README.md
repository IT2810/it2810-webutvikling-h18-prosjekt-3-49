# it2810-webutvikling-h18-prosjekt-3-49

## IT2810 Webutvikling - Gruppe 49 - Prosjekt 3 - Dokumentasjon

## Konsept
Dette prosjektet gikk ut på å lage en cross platform telefon-app sentrert rundt en kalender. Vi har tatt utgangspunkt i en 3rd party open source kalender. Applikasjonen vi har laget utover dette har tre hovedfunksjonaliteter. Den har en kontaktliste av venner, en liste av mål og mulighet for å lage events i kalenderen hvor man kan bestemme hvem fra kontaktene eventet skal være med og hvilket mål eventet rettes mot.

Eksempel på dette er å sette et mål som "komme i bedre form" og sette opp noen treningsøkter rettet mot dette målet. Hvis man har en gruppe treningskamerater som finnes i kontaktlisten skal man da kunne sette opp hvilken treningsøkt som skal være med hvem, og få en visualisering som gjør det lett å holde styr på hva man skal, hvorfor man skal det og med hvem. Visuelt kan dette understrekes med fargekoding.

Vi valgte å ha en liste av mål for å få events i kalenderen til å rette seg mot noe. Litteraturen rundt å sette klare mål, og delmål for å oppnå målene er krystallklar på at dette fører til økt motivasjon og økt gjennomføringskraft. Dette virket også implementeringsmessig som passende i henhold til oppgavens omfang. Det var også relevant å kunne planlegge møter med venner og bekjente på en tydelig måte, og det var derfor naturlig å ha en kontaktliste med appen. 

Det er altså tre hovedsystemer for appen, en kontaktliste, en liste av mål og en kalender med events.

## Struktur
Appen bruker components fra React, og er strukturert med en App.js i front, som importerer og bruker components som er definert i andre filer. 

Contacts består av en Contact klasse og en ContactManager klasse i én til mange struktur, hvor ideen er at ContactManager holder styr på Contact componentene, og tar seg av å liste dem opp, lagre dem, slette dem og legge dem til. Ettersom ikke komplekse objekter som klasser egner seg godt for lagring i Async storage blir listen av kontakter lagret som en Dictionary i ContactManager, som kan mappe dem til objekter fra listen i sin render funksjon. Denne strukturen ga mest mening for lagring og skalerbarhet, men flere andre strukturer ble prøvd ut. Contact kunne også forenkles og bli gjort til en funksjon, men dette ble valgt vekk for å øke muligheten for videre utvikling - det er lettere å videreutvikle mer komplekse objekter som klasser. 

Storage er klassen som brukes for å lese og skrive til async storage, den brukes alle steder lagring trengs, og benytter JSON som lagringsmateriale. Vi valgte å lagre på denne måten for å kunne bevare komplekse objekter i lager. 

Goals er strukturert på nesten akkurat samme måte som Contacts, men her lagres bare Goals som en Array i state, heller enn som egne komponenter. Dette er altså en forenkling, som var mer hensiktsmessig for Goals, da vi ikke anså det sannsynlig å tilføre videre funksjonalitet som for å gjøre dem mer komplekse, og det var da ikke nødvendig å representere dem som klasser. 

Calendar tar utgangspunkt i et 3rd-party-bibliotek. Oppå dette har vi laget et system for events, og gitt dem en objektstruktur hvor all dataen pakkes inn i et objekt og representeres. Det er mange felter i dette objektet som ikke er påkrevd, for eksempel er det ikke nødvendig å legge til noen person på et event, men man kan legge inn flere om man vil. Man kan også knytte events til opp til ett goal, men ikke flere. Dette var for å motivere brukere til å lage spesifikke mål, og å sette opp events for å følge disse målene. Et mål som “Gjøre viktige ting” vil da ikke fungere godt, ettersom det gjerne vil overlappe med andre mål man har satt seg. 


Vi har også laget en demo av akselerometerfunksonalitet. Dette var ment som en enkel demonstrasjon av hvoran man bruker native funksjoner på mobile, som oppgaven spurte om. Funksjonaliteten involverer å lese av hvordan brukeren har telefonen sin, stående sidelengs eller liggende, og endre farge og melding utifra dette. Dette er bare en demo, og er med for å vise forståelse for bruk av funksjonaliteten, men er ikke ellers relevant for appen. Med videre utvikling kan akselerometeret brukes til navigering eller annen funksjonalitet, men det var ikke relevant for dette scopet av prosjekt.

## Kom i gang


### Avhengigheter
For å kjøre applikasjonen trenger du:

- Node.js
Brukes til å laste ned expo-cli, som er nødvendig for å kjøre og teste applikasjonen.

- Expo
Brukes for å lage React-Native applikasjonen med alle de nødvendige node_modulene. Lastes ned med kommandoen `npm install expo-cli --global`

- React-native-calendars
3rd-party-bibliotek som blir brukt for å opprette en kalender i appen. Vi valgte å bruke dette apiet fordi det å lage en kalender er et løst problem, og vi ville bruke tiden vår på å lage funksjonalitet utover dette. Ved å bruke React-native-calendars kunne vi raskt komme i gang og teste funksjonalitet med en kalender, og vi fikk også tilgang til mye funksjonalitet som lot oss spesifisere oppførselen slik vi ville. 

- Jest

Sentralt for testing av appen. Bruker 'react-test-renderer' til å kjøre snapshot based enhetstesting av funksjonaliteten. Tester også Async storage. 

- React-Navigation
Brukes til å navigere mellom de ulike sidene i appen på en naturlig måte

- Round-to
Brukes for å runde av tall på en effektiv måte


For å starte appen må du klone eller laste ned dette repositoriet samt node.js. Deretter kjører du kommandoene
```
npm install
expo start
```

## Bruksanvisning
Velg en dag i kalenderen for å få opp en agenda. Bruk Add for å legge til events, hvor du kan velge i listen av mål og kontakter for å legge dem til.
`Swipe høyre` for å navigere mellom sider.


## Innhold og funksjonalitet
Applikasjonen displayer en kalender som kan inneholde events. Du kan trykke på dagene for å få opp agendaen din for den dagen. Her kan du legge til events, for å planlegge uken din. Appen lar deg også legge til kontakter i en egen kontaktliste, som du kan knytte til eventsene, og likedan lar den deg sette mål som også kan knyttes til eventsene. Dermed kan man enkelt se når man har planer, hvem man har planer med og hvilket mål man jobber mot. Hvis du for eksempel har et mål om å komme i bedre form kan du legge til dette, og så sette opp treningsøkter mot dette målet. Her kan du også legge til treningskompisene dine, og finne ut når du trener med hvem. 

Appen har support for lagring med Async storage som gjør det mulig å lagre dataen lokalt, og bruke den neste gang du åpner appen. Dette er essensielt for at appen skal fungere i praksis. 

## Bruk av teknologi

Mye av teknologien vi har brukt var krav til oppgaven, og dette blir derfor begrunnelsen for deres bruk. Dette var dog hensiktsmessig teknologi. Etter å ha brukt Expo på prosjektet er vår mening at verktøyet er for ustabilt og tregt til at det er optimalt, men det var verdifullt å prøve ut, og det har absolutt sterke sider. 
Ellers var vi veldig fornøyd med den teknologien som ble brukt på prosjektet. 
### React native
Applikasjonen er en react native applikasjon som er opprettet ved bruk av expo-cli. Dette betyr at den er basert på React, men har tilgang til native funksjonalitet som finnes på mobiler, som gjør det mulig å utvikle cross platform uten å bruke tid på porting. Appen vil derfor funke både på Android og iOS.

### AsyncStorage
Applikasjonen benytter seg av AsyncStorage for lagring. Dette gjør det mulig å lagre data i appen lokalt, slik at den kan bevares fra session til session. Dette er essensielt, ettersom brukere forventer at for eksempel kontaktlisten deres vil bli lagret fra gang til gang. 

### Plattformuavhengig
Bruk av React native gjør plattformuavhengighet helt sømløst - appen vil kjøre både på Android og iOS uten problemer. 

### Git
Git er et sentralt verktøy når man jobber i team. Det sørger for versjonskontroll og fasiliterer arbeidsflyt, samt gjør det mulig for flere å jobbe på samme oppgave uten fysisk nærhet. Det fungerer også bra som backup for eldre versjoner, og fjernlagring. Sentralt ved vår bruk av Git er også Git-Hub, som har mange viktige redskap for organisering og arbeidsflyt. Issues og  pull-requests er to av de mest sentrale verktøyene innen dette. 

## Testing
Til testing har vi benyttet Jest, som er et rammeverk for enklere testing av JavaScript. Det kan installeres ved å kjøre kommandoen `npm i jest`. Testene kan deretter kjøres med kommandoen `npm test` som ser etter alle filer i en __test__-mappe, eller som slutter på test.js eller spec.js. Om man legger til flagget `--coverage` opprettes også en fil som forteller hvilken kode som testes. Bruk av Jest har vært viktig for å kjøre enkel enhetstesting av funksjonaliteten, slik at man kan avdekke feil og forsørge kodekvalitet. Det at Jest er enkelt å bruke gjør også at ovehread-kostnaden ved å teste underveis i utviklingen blir redusert, som fører til at man tester mer. 

#videreutvikling
Dette er en forholdsvis enkel app, som legger til funksjonalitet på en kalender. Det er derfor stort potensiale for å videreutvikle produktet. Funksjonalitet som kan være sentral å legge inn er å hente kontakter fra sosiale medier, eller fra kontaktlisten på telefonen. Det hadde også vært praktisk å kunne dele events med andre brukere, slik at man kunne sette opp felles events med andre. Det hadde også gått ann å gjøre mål mer komplekse, ved å gi dem en viss mengde innsats som trengtes for å nå mål, slik at man måtte fullføre en viss mengde events knyttet til et mål for å oppnå det. Her er det også stort spillerom for gamification, med Exp barer og achievements osv. Kontaktlisten kan også gjøres mer kompleks utover sosial integrering, hvor man bruker mer informasjon som bilder, tlf nr. og muligheten til å chatte etc. Bruk av notifications for å minne deg på events kunne også vært relevant å legge til. Vi har strukturert koden på en modulær nok måte til at videreutvikling burde være mulig. 


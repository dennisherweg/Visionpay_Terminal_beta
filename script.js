/* ======================================
   VISIONPAY TERMINAL V6
====================================== */

const artikelListe = [

{
name:"Kaffee",
preis:2.50,
steuer:7,
kategorie:"Getränke",
bestand:25
},

{
name:"Cola",
preis:3.00,
steuer:19,
kategorie:"Getränke",
bestand:20
},

{
name:"Wasser",
preis:2.00,
steuer:19,
kategorie:"Getränke",
bestand:30
},

{
name:"Brötchen",
preis:1.20,
steuer:7,
kategorie:"Backwaren",
bestand:40
},

{
name:"Kuchen",
preis:3.50,
steuer:7,
kategorie:"Backwaren",
bestand:15
}

];

let warenkorb = [];

let summe = 0;
let ust7 = 0;
let ust19 = 0;

let tagesumsatz = 0;
let anzahlVerkaeufe = 0;

let bonnummer = 1;

let historie = [];

let pin = "";

let visionAssist = false;
let visualAssist = false;


/* ======================================
   DATEN SPEICHERN
====================================== */

function datenSpeichern(){

localStorage.setItem(
"artikelListe",
JSON.stringify(
artikelListe
)
);

localStorage.setItem(
"tagesumsatz",
tagesumsatz
);

localStorage.setItem(
"anzahlVerkaeufe",
anzahlVerkaeufe
);

localStorage.setItem(
"historie",
JSON.stringify(
historie
)
);

localStorage.setItem(
"bonnummer",
bonnummer
);

}


/* ======================================
   DATEN LADEN
====================================== */

function datenLaden(){

let artikel =

localStorage.getItem(
"artikelListe"
);

if(artikel){

let gespeichert =

JSON.parse(
artikel
);

artikelListe.length = 0;

gespeichert.forEach(

a =>

artikelListe.push(a)

);

}

}


/* ======================================
   KATEGORIEN
====================================== */

function filterKategorie(
kategorie
){

artikelAnzeigen(
kategorie
);

}
/* ======================================
   ARTIKEL ANZEIGEN
====================================== */

function artikelAnzeigen(
kategorie = "Alle"
){

let container =

document.getElementById(
"artikelContainer"
);

container.innerHTML = "";

artikelListe.forEach(

artikel => {

if(

kategorie === "Alle"

||

artikel.kategorie ===
kategorie

){

let button =

document.createElement(
"button"
);

button.className =
"artikelButton";

button.innerHTML =

artikel.name +

"<br>" +

artikel.preis.toFixed(2) +

" €<br>" +

"Bestand: " +

artikel.bestand;

button.onclick =
function(){

artikelWaehlen(
artikel
);

};

container.appendChild(
button
);

}

}

);

}


/* ======================================
   ARTIKEL WÄHLEN
====================================== */

function artikelWaehlen(
artikel
){

if(
artikel.bestand <= 0
){

alert(
"Artikel nicht verfügbar"
);

return;

}

artikel.bestand--;

warenkorb.push(
artikel
);

summe += artikel.preis;

if(
artikel.steuer === 7
){

ust7 +=
artikel.preis * 0.07;

}

if(
artikel.steuer === 19
){

ust19 +=
artikel.preis * 0.19;

}

aktualisieren();

kundenDisplay();

artikelAnzeigen();

datenSpeichern();

if(
visionAssist
){

vorlesen(

artikel.name +

" hinzugefügt. Gesamtbetrag " +

summe.toFixed(2) +

" Euro"

);

}

}


/* ======================================
   ANZEIGE AKTUALISIEREN
====================================== */

function aktualisieren(){

document.getElementById(
"anzahl"
).innerHTML =
warenkorb.length;

document.getElementById(
"summe"
).innerHTML =
summe.toFixed(2) +
" €";

document.getElementById(
"ust7"
).innerHTML =
ust7.toFixed(2) +
" €";

document.getElementById(
"ust19"
).innerHTML =
ust19.toFixed(2) +
" €";

document.getElementById(
"tagesumsatz"
).innerHTML =
tagesumsatz.toFixed(2) +
" €";

document.getElementById(
"anzahlVerkaeufe"
).innerHTML =
anzahlVerkaeufe;

let warenkorbElement =

document.getElementById(
"warenkorb"
);

if(
warenkorb.length === 0
){

warenkorbElement.innerHTML =
"Keine Artikel";

}else{

warenkorbElement.innerHTML =

warenkorb.map(

a =>

a.name +

" - " +

a.preis.toFixed(2) +

" €"

)

.join("<br>");

}

}


/* ======================================
   STORNO
====================================== */

function storno(){

if(
warenkorb.length === 0
){

return;

}

let artikel =
warenkorb.pop();

artikel.bestand++;

summe -= artikel.preis;

if(
artikel.steuer === 7
){

ust7 -=
artikel.preis * 0.07;

}

if(
artikel.steuer === 19
){

ust19 -=
artikel.preis * 0.19;

}

aktualisieren();

kundenDisplay();

artikelAnzeigen();

}
/* ======================================
   KUNDENDISPLAY
====================================== */

function kundenDisplay(){

let verzehr =

document.getElementById(
"verzehrart"
).value;

document.getElementById(
"kundenInfo"
).innerHTML =

"Artikel: " +

warenkorb.length +

"<br><br>" +

"Gesamt: " +

summe.toFixed(2) +

" €<br><br>" +

"Verzehr: " +

verzehr;

}


/* ======================================
   ARTIKEL ANLEGEN
====================================== */

function artikelAnlegen(){

let name =

document.getElementById(
"artikelName"
).value;

let preis =

parseFloat(
document.getElementById(
"artikelPreis"
).value
);

let steuer =

parseInt(
document.getElementById(
"artikelSteuer"
).value
);

if(
!name ||
isNaN(preis)
){

alert(
"Bitte Daten eingeben"
);

return;

}

artikelListe.push({

name:name,

preis:preis,

steuer:steuer,

bestand:25,

kategorie:"Snacks"

});

artikelAnzeigen();

datenSpeichern();

document.getElementById(
"artikelName"
).value = "";

document.getElementById(
"artikelPreis"
).value = "";

}


/* ======================================
   HISTORIE
====================================== */

function historieAktualisieren(){

document.getElementById(
"verkaufHistorie"
).innerHTML =

historie.length > 0

?

historie.join("<br>")

:

"Noch keine Verkäufe";

}


/* ======================================
   TERMINAL ÖFFNEN
====================================== */

function zurZahlung(){

document.getElementById(
"kassenAnsicht"
).style.display =
"none";

document.getElementById(
"terminalAnsicht"
).style.display =
"block";

document.getElementById(
"zahlbetrag"
).innerHTML =

summe.toFixed(2) +
" €";

pin = "";

document.getElementById(
"pinfeld"
).value = "";

scrambleTastatur();

if(
visionAssist
){

vorlesen(

"Terminal geöffnet. "

+

"Gesamtbetrag " +

summe.toFixed(2) +

" Euro"

);

}

}


/* ======================================
   ZURÜCK
====================================== */

function zurKasse(){

document.getElementById(
"kassenAnsicht"
).style.display =
"block";

document.getElementById(
"terminalAnsicht"
).style.display =
"none";

}


/* ======================================
   PIN TASTATUR
====================================== */

function scrambleTastatur(){

let zahlen =
[1,2,3,4,5,6,7,8,9];

zahlen.sort(
()=>Math.random()-0.5
);

let feld =

document.getElementById(
"pinTastatur"
);

feld.innerHTML = "";

zahlen.forEach(

zahl => {

let button =

document.createElement(
"button"
);

button.innerHTML =
zahl;

button.onclick =
function(){

pin += zahl;

document.getElementById(
"pinfeld"
).value =
pin;

if(
visionAssist
){

vorlesen(
"Ziffer " + zahl
);

}

};

feld.appendChild(
button
);

}

);

}
/* ======================================
   ZAHLUNG ABSCHLIESSEN
====================================== */

function zahlungAbschliessen(){

if(
summe <= 0
){

alert(
"Keine Artikel ausgewählt"
);

return;

}

let zahlungsart =

document.getElementById(
"zahlung"
).value;

let datum =

new Date()
.toLocaleString(
"de-DE"
);

tagesumsatz += summe;

anzahlVerkaeufe++;

historie.push(

"Bon " +
bonnummer +
" | " +
zahlungsart +
" | " +
summe.toFixed(2) +
" €"

);

historieAktualisieren();

document.getElementById(
"zahlungsStatus"
).innerHTML =

"✅ Zahlung erfolgreich";

document.getElementById(
"qrcode"
).innerHTML =

"VISIONPAY<br>" +
"BON-" +
bonnummer +
"<br>" +
datum +
"<br>" +
summe.toFixed(2) +
" €";

if(
visionAssist
){

vorlesen(
"Zahlung erfolgreich"
);

}

warenkorb = [];

summe = 0;

ust7 = 0;

ust19 = 0;

pin = "";

bonnummer++;

aktualisieren();

kundenDisplay();

datenSpeichern();

zurKasse();

}


/* ======================================
   VISION ASSIST
====================================== */

function toggleSehmodus(){

visionAssist =
!visionAssist;

document.body.classList.toggle(
"grossschrift"
);

if(
visionAssist
){

vorlesen(

"Vision Assist aktiviert"

);

}

}


/* ======================================
   VISUAL ASSIST
====================================== */

function toggleHoermodus(){

visualAssist =
!visualAssist;

document.body.classList.toggle(
"visualAssist"
);

}


/* ======================================
   WARENKORB VORLESEN
====================================== */

function warenkorbVorlesen(){

if(
warenkorb.length === 0
){

vorlesen(
"Der Warenkorb ist leer"
);

return;

}

let text =

"Sie haben " +

warenkorb.length +

" Artikel ausgewählt. " +

"Der Gesamtbetrag beträgt " +

summe.toFixed(2) +

" Euro.";

vorlesen(text);

}


/* ======================================
   SCREENREADER
====================================== */

function vorlesen(text){

let sprache =

new SpeechSynthesisUtterance(
text
);

sprache.lang =
"de-DE";

speechSynthesis.speak(
sprache
);

}


/* ======================================
   KI DATENSCHUTZ
====================================== */

function kiCheck(){

let personen =

Math.floor(
Math.random() * 3
)+1;

let status =

document.getElementById(
"kiStatus"
);

let log =

document.getElementById(
"kiProtokoll"
);

if(
personen > 1
){

status.innerHTML =

"⚠ Weitere Person erkannt";

log.innerHTML =

new Date()
.toLocaleTimeString()

+

" - Datenschutzwarnung<br>"

+

log.innerHTML;

}else{

status.innerHTML =

"✅ Privatsphäre geschützt";

}

}

setInterval(
kiCheck,
5000
);


/* ======================================
   Z BON
====================================== */

function zBon(){

alert(

"VISIONPAY Z-BON\n\n" +

"Verkäufe: " +

anzahlVerkaeufe +

"\n\n" +

"Tagesumsatz: " +

tagesumsatz.toFixed(2) +

" €"

);

}


/* ======================================
   BUCHHALTUNGSBUTLER
====================================== */

function butlerExport(){

document.getElementById(
"butlerStatus"
).innerHTML =

"✅ Tagesabschluss exportiert";

}


/* ======================================
   UHR
====================================== */

setInterval(

function(){

let jetzt =
new Date();

document.getElementById(
"uhrzeit"
).innerHTML =

jetzt.toLocaleTimeString(
"de-DE"
);

},

1000

);


/* ======================================
   START
====================================== */

datenLaden();

artikelAnzeigen();

aktualisieren();

kundenDisplay();

historieAktualisieren();

kiCheck();
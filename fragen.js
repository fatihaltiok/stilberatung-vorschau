/*
 * Inhalt des Stil-Interviews — VERTRAG (Orchestrator). Die Oberfläche (index.html, app.js,
 * styles.css) liest nur dieses Objekt und erfindet keine Fragen, Antworten oder Regeln dazu.
 *
 * Frage-Typen:
 *   "bild"  — Kacheln mit Foto (option.bild = Pfad relativ zu index.html)
 *   "farbe" — Kacheln mit Farbstreifen (option.farben = Liste von Hexwerten)
 *   "wahl"  — Kacheln nur mit Text
 *   "text"  — keine Kacheln, nur das Notizfeld
 * mehrfach: true = mehrere Kacheln wählbar; max = höchstens so viele (fehlt = unbegrenzt).
 * notiz: true = Notizfeld (tippen oder einsprechen) unter den Kacheln; notizHinweis = Platzhalter.
 * bildJe: "<frage-id>" (nur Typ "bild") = das Bild jeder Option hängt von der Antwort auf jene Frage ab:
 *   deren Optionen werden in ihrer Reihenfolge durchgegangen; die ERSTE gewählte, für die
 *   option.bilder[<ihre id>] existiert, bestimmt das Bild. Keine passt → option.bild.
 *   Gilt für die Kachel UND für das Moodboard im Stilprofil (INTERFACES §1 D.2).
 * raum: "<option-id der Frage raum>" = Frage aus dem Raum-Teil dieses Raums (INTERFACES §1 D.3):
 *   nur sichtbar, wenn dieser Raum gewählt ist; raum: "ganze-wohnung" zusätzlich, wenn gar kein
 *   Raum gewählt ist. Fragen ohne raum gehören zum gemeinsamen Teil und sind immer sichtbar.
 *   Die Raum-Teile stehen in der Reihenfolge der Raumliste.
 * Keine Frage ist Pflicht — „Weiter" geht immer.
 */
var BEZUG = [
  { id: "leder", label: "Leder", bild: "bilder/material-leder.jpg" },
  { id: "webstoff", label: "Webstoff", bild: "bilder/material-webstoff.jpg" },
  { id: "samt", label: "Samt", bild: "bilder/material-samt.jpg" },
  { id: "boucle", label: "Bouclé", bild: "bilder/material-boucle.jpg" }
];
function bildOptionen(frageId, liste) {
  return liste.map(function (o) { return { id: o[0], label: o[1], bild: "bilder/" + frageId + "-" + o[0] + ".jpg" }; });
}
window.INTERVIEW = {
  titel: "Stilberatung",
  marke: "Sofa & Co.",
  fragen: [
    {
      id: "raum", typ: "wahl", mehrfach: true,
      frage: "Um welchen Raum geht es?",
      hilfe: "Mehrere möglich.",
      optionen: [
        { id: "wohnzimmer", label: "Wohnzimmer" },
        { id: "essbereich", label: "Essbereich" },
        { id: "kueche", label: "Küche" },
        { id: "schlafzimmer", label: "Schlafzimmer" },
        { id: "kinderzimmer", label: "Kinderzimmer" },
        { id: "arbeitszimmer", label: "Arbeitszimmer" },
        { id: "flur", label: "Flur und Eingang" },
        { id: "ganze-wohnung", label: "Die ganze Wohnung" }
      ],
      notiz: true, notizHinweis: "Größe, Dachschräge, Fenster, Besonderheiten …"
    },
    {
      id: "ziel", typ: "wahl", mehrfach: false,
      frage: "Was möchten Sie erreichen?",
      optionen: [
        { id: "neu", label: "Komplett neu einrichten" },
        { id: "auffrischen", label: "Auffrischen mit ein paar neuen Stücken" },
        { id: "problem", label: "Ein bestimmtes Problem lösen" },
        { id: "ideen", label: "Erst einmal Ideen sammeln" }
      ],
      notiz: true, notizHinweis: "Was genau soll anders werden?"
    },
    {
      id: "stil", typ: "bild", mehrfach: true, max: 2, bildJe: "raum",
      frage: "Welche Räume gefallen Ihnen?",
      hilfe: "Bis zu zwei Bilder. Aus dem Bauch heraus.",
      optionen: [
        { id: "modern", label: "Klar und modern", bild: "bilder/stil-modern.jpg",
          bilder: { wohnzimmer: "bilder/stil-modern.jpg", essbereich: "bilder/stil-modern-essbereich.jpg", kueche: "bilder/stil-modern-kueche.jpg", schlafzimmer: "bilder/stil-modern-schlafzimmer.jpg",
                    kinderzimmer: "bilder/stil-modern-kinderzimmer.jpg",
                    arbeitszimmer: "bilder/stil-modern-arbeitszimmer.jpg", flur: "bilder/stil-modern-flur.jpg" } },
        { id: "skandinavisch", label: "Hell und skandinavisch", bild: "bilder/stil-skandinavisch.jpg",
          bilder: { wohnzimmer: "bilder/stil-skandinavisch.jpg", essbereich: "bilder/stil-skandinavisch-essbereich.jpg", kueche: "bilder/stil-skandinavisch-kueche.jpg", schlafzimmer: "bilder/stil-skandinavisch-schlafzimmer.jpg",
                    kinderzimmer: "bilder/stil-skandinavisch-kinderzimmer.jpg",
                    arbeitszimmer: "bilder/stil-skandinavisch-arbeitszimmer.jpg", flur: "bilder/stil-skandinavisch-flur.jpg" } },
        { id: "mediterran", label: "Warm und mediterran", bild: "bilder/stil-mediterran.jpg",
          bilder: { wohnzimmer: "bilder/stil-mediterran.jpg", essbereich: "bilder/stil-mediterran-essbereich.jpg", kueche: "bilder/stil-mediterran-kueche.jpg", schlafzimmer: "bilder/stil-mediterran-schlafzimmer.jpg",
                    kinderzimmer: "bilder/stil-mediterran-kinderzimmer.jpg",
                    arbeitszimmer: "bilder/stil-mediterran-arbeitszimmer.jpg", flur: "bilder/stil-mediterran-flur.jpg" } },
        { id: "klassisch", label: "Klassisch und elegant", bild: "bilder/stil-klassisch.jpg",
          bilder: { wohnzimmer: "bilder/stil-klassisch.jpg", essbereich: "bilder/stil-klassisch-essbereich.jpg", kueche: "bilder/stil-klassisch-kueche.jpg", schlafzimmer: "bilder/stil-klassisch-schlafzimmer.jpg",
                    kinderzimmer: "bilder/stil-klassisch-kinderzimmer.jpg",
                    arbeitszimmer: "bilder/stil-klassisch-arbeitszimmer.jpg", flur: "bilder/stil-klassisch-flur.jpg" } },
        { id: "natuerlich", label: "Natürlich und verspielt", bild: "bilder/stil-natuerlich.jpg",
          bilder: { wohnzimmer: "bilder/stil-natuerlich.jpg", essbereich: "bilder/stil-natuerlich-essbereich.jpg", kueche: "bilder/stil-natuerlich-kueche.jpg", schlafzimmer: "bilder/stil-natuerlich-schlafzimmer.jpg",
                    kinderzimmer: "bilder/stil-natuerlich-kinderzimmer.jpg",
                    arbeitszimmer: "bilder/stil-natuerlich-arbeitszimmer.jpg", flur: "bilder/stil-natuerlich-flur.jpg" } },
        { id: "loft", label: "Loft mit Charakter", bild: "bilder/stil-loft.jpg",
          bilder: { wohnzimmer: "bilder/stil-loft.jpg", essbereich: "bilder/stil-loft-essbereich.jpg", kueche: "bilder/stil-loft-kueche.jpg", schlafzimmer: "bilder/stil-loft-schlafzimmer.jpg",
                    kinderzimmer: "bilder/stil-loft-kinderzimmer.jpg",
                    arbeitszimmer: "bilder/stil-loft-arbeitszimmer.jpg", flur: "bilder/stil-loft-flur.jpg" } }
      ],
      notiz: true, notizHinweis: "Was gefällt Ihnen daran besonders?"
    },
    {
      id: "farbe", typ: "farbe", mehrfach: true, max: 2,
      frage: "Mit welchen Farben möchten Sie leben?",
      hilfe: "Bis zu zwei Farbwelten.",
      optionen: [
        { id: "hell", label: "Hell und neutral", farben: ["#FFFFFF", "#F4F1EC", "#E6DFD3", "#CFC6B8"] },
        { id: "erde", label: "Warme Erdtöne", farben: ["#E3CDB0", "#C8A27A", "#A0673F", "#7A5236"] },
        { id: "kraeftig", label: "Kräftig und fröhlich", farben: ["#E0A526", "#C0392B", "#2E8B57", "#1F6F8B"] },
        { id: "dunkel", label: "Dunkel und edel", farben: ["#8C7A5B", "#5A4632", "#3B2F2F", "#1E2A38"] },
        { id: "pastell", label: "Sanfte Pastelltöne", farben: ["#F1E6CF", "#E8D5D0", "#DCD6E8", "#CFDCD6"] }
      ],
      notiz: true, notizHinweis: "Lieblingsfarbe, Farben, die gar nicht gehen …"
    },
    {
      id: "bewohner", typ: "wahl", mehrfach: true,
      frage: "Wer lebt mit in der Wohnung?",
      optionen: [
        { id: "erwachsene", label: "Nur Erwachsene" },
        { id: "kinder", label: "Kinder" },
        { id: "tier", label: "Hund oder Katze" },
        { id: "gaeste", label: "Oft Besuch" }
      ],
      notiz: true, notizHinweis: "Wie viele Personen, wie alt sind die Kinder?"
    },
    {
      id: "gefuehl", typ: "wahl", mehrfach: true, max: 2,
      frage: "Wie wollen Sie sich fühlen, wenn Sie hereinkommen?",
      hilfe: "Bis zu zwei.",
      optionen: [
        { id: "ruhe", label: "Ruhe" },
        { id: "gemuetlich", label: "Gemütlichkeit" },
        { id: "eleganz", label: "Eleganz" },
        { id: "energie", label: "Energie" },
        { id: "weite", label: "Weite" },
        { id: "geborgen", label: "Geborgenheit" }
      ],
      notiz: false
    },

    /* ---------- Raum-Teil: Wohnzimmer ---------- */
    {
      id: "wohnzimmer-sofa", raum: "wohnzimmer", typ: "bild", mehrfach: true, max: 2,
      frage: "Welche Sofa-Form passt zu Ihnen?",
      hilfe: "Bis zu zwei.",
      optionen: bildOptionen("wohnzimmer-sofa", [
        ["ecksofa", "Ecksofa"], ["wohnlandschaft", "Wohnlandschaft"],
        ["zweisitzer", "Zweisitzer mit Sessel"], ["schlafsofa", "Schlafsofa"]]),
      notiz: true, notizHinweis: "Wie viele sollen bequem sitzen oder liegen?"
    },
    {
      id: "wohnzimmer-bezug", raum: "wohnzimmer", typ: "bild", mehrfach: true, max: 2,
      frage: "Welcher Bezug fürs Sofa?",
      hilfe: "Bis zu zwei.",
      optionen: BEZUG,
      notiz: true, notizHinweis: "Oder: weiß ich noch nicht."
    },
    {
      id: "wohnzimmer-nutzung", raum: "wohnzimmer", typ: "wahl", mehrfach: true,
      frage: "Wofür nutzen Sie das Wohnzimmer am meisten?",
      optionen: [
        { id: "fernsehen", label: "Fernsehen und Filme" },
        { id: "lesen", label: "Lesen und Ausruhen" },
        { id: "bewirten", label: "Gäste bewirten" },
        { id: "spielen", label: "Mit den Kindern spielen" },
        { id: "schlafsofa", label: "Übernachtungsgäste" },
        { id: "mittagsschlaf", label: "Mittagsschlaf" }
      ],
      notiz: true, notizHinweis: "Wie viele Personen sitzen meistens hier?"
    },
    {
      id: "wohnzimmer-stoert", raum: "wohnzimmer", typ: "wahl", mehrfach: true,
      frage: "Was stört Sie im Wohnzimmer heute am meisten?",
      optionen: [
        { id: "dunkel", label: "Zu dunkel" },
        { id: "voll", label: "Zu voll" },
        { id: "kalt", label: "Wirkt kalt und ungemütlich" },
        { id: "zusammen", label: "Nichts passt zusammen" },
        { id: "stauraum", label: "Zu wenig Stauraum" },
        { id: "unbequem", label: "Das Sofa ist unbequem" }
      ],
      notiz: true, notizHinweis: "Was noch?"
    },

    /* ---------- Raum-Teil: Essbereich ---------- */
    {
      id: "essbereich-tisch", raum: "essbereich", typ: "bild", mehrfach: true, max: 2,
      frage: "Welcher Tisch gefällt Ihnen?",
      hilfe: "Bis zu zwei.",
      optionen: bildOptionen("essbereich-tisch", [
        ["holz", "Langer Holztisch"], ["rund", "Runder Tisch"],
        ["stein", "Stein- oder Keramikplatte"], ["bank", "Tisch mit Bank"]]),
      notiz: true, notizHinweis: "Soll er ausziehbar sein?"
    },
    {
      id: "essbereich-personen", raum: "essbereich", typ: "wahl", mehrfach: false,
      frage: "Wie viele sitzen meistens am Tisch?",
      optionen: [
        { id: "zwei", label: "Zwei" },
        { id: "vier", label: "Vier" },
        { id: "sechs", label: "Sechs" },
        { id: "acht", label: "Acht und mehr" }
      ],
      notiz: true, notizHinweis: "Und an Feiertagen?"
    },
    {
      id: "essbereich-sitzen", raum: "essbereich", typ: "wahl", mehrfach: true,
      frage: "Wie sitzen Sie am liebsten?",
      optionen: [
        { id: "polster", label: "Gepolsterte Stühle" },
        { id: "holz", label: "Holzstühle" },
        { id: "armlehnen", label: "Stühle mit Armlehnen" },
        { id: "bank", label: "Auf einer Bank" },
        { id: "lange", label: "Lange sitzen bleiben, gemütlich" }
      ],
      notiz: true, notizHinweis: "Was noch?"
    },
    {
      id: "essbereich-stoert", raum: "essbereich", typ: "wahl", mehrfach: true,
      frage: "Was stört Sie am Essplatz heute am meisten?",
      optionen: [
        { id: "eng", label: "Zu eng" },
        { id: "klein", label: "Der Tisch ist zu klein" },
        { id: "unbequem", label: "Die Stühle sind unbequem" },
        { id: "dunkel", label: "Zu dunkel, Licht über dem Tisch fehlt" },
        { id: "stauraum", label: "Kein Platz für Geschirr" },
        { id: "kalt", label: "Wirkt kalt und ungemütlich" }
      ],
      notiz: true, notizHinweis: "Was noch?"
    },

    /* ---------- Raum-Teil: Küche ---------- */
    {
      id: "kueche-form", raum: "kueche", typ: "bild", mehrfach: true, max: 2,
      frage: "Welche Küchenform passt zu Ihnen?",
      hilfe: "Bis zu zwei.",
      optionen: bildOptionen("kueche-form", [
        ["zeile", "Küchenzeile"], ["l-form", "L-Form"],
        ["u-form", "U-Form"], ["insel", "Mit Kochinsel"]]),
      notiz: true, notizHinweis: "Größe der Küche, Fenster, Anschlüsse …"
    },
    {
      id: "kueche-fronten", raum: "kueche", typ: "bild", mehrfach: true, max: 2,
      frage: "Welche Fronten gefallen Ihnen?",
      hilfe: "Bis zu zwei.",
      optionen: bildOptionen("kueche-fronten", [
        ["matt", "Matt und grifflos"], ["holz", "Holz"],
        ["hochglanz", "Hochglanz"], ["landhaus", "Landhaus"]]),
      notiz: true, notizHinweis: "Lieblingsfarbe für die Küche?"
    },
    {
      id: "kueche-leben", raum: "kueche", typ: "wahl", mehrfach: true,
      frage: "Wie leben Sie in der Küche?",
      optionen: [
        { id: "taeglich", label: "Wir kochen jeden Tag" },
        { id: "schnell", label: "Meist schnell und einfach" },
        { id: "backen", label: "Wir backen gern" },
        { id: "gemeinsam", label: "Mit Familie und Gästen kochen" },
        { id: "essplatz", label: "Wir essen auch in der Küche" }
      ],
      notiz: true, notizHinweis: "Was noch?"
    },
    {
      id: "kueche-umfang", raum: "kueche", typ: "wahl", mehrfach: false,
      frage: "Was soll sich an der Küche ändern?",
      optionen: [
        { id: "gestaltung", label: "Nur Farben, Licht und Deko" },
        { id: "essplatz", label: "Ein neuer Essplatz in der Küche" },
        { id: "fronten", label: "Neue Fronten, Geräte bleiben" },
        { id: "komplett", label: "Eine ganz neue Küche" },
        { id: "unklar", label: "Noch unklar" }
      ],
      notiz: true, notizHinweis: "Was soll auf jeden Fall bleiben?"
    },

    /* ---------- Raum-Teil: Schlafzimmer ---------- */
    {
      id: "schlafzimmer-bett", raum: "schlafzimmer", typ: "bild", mehrfach: true, max: 2,
      frage: "Welches Bett gefällt Ihnen?",
      hilfe: "Bis zu zwei.",
      optionen: bildOptionen("schlafzimmer-bett", [
        ["polster", "Polsterbett"], ["holz", "Holzbett"],
        ["boxspring", "Boxspringbett"], ["metall", "Metallbett"]]),
      notiz: true, notizHinweis: "Breite, Höhe zum Einsteigen, Matratze …"
    },
    {
      id: "schlafzimmer-kleidung", raum: "schlafzimmer", typ: "wahl", mehrfach: true,
      frage: "Wo soll die Kleidung hin?",
      optionen: [
        { id: "schrank", label: "Kleiderschrank" },
        { id: "massschrank", label: "Schrank nach Maß" },
        { id: "ankleide", label: "Begehbarer Schrank" },
        { id: "kommode", label: "Kommode" },
        { id: "reicht", label: "Ist schon gelöst" }
      ],
      notiz: true, notizHinweis: "Dachschräge, Nische, Länge der Wand …"
    },
    {
      id: "schlafzimmer-nutzung", raum: "schlafzimmer", typ: "wahl", mehrfach: true,
      frage: "Was machen Sie im Schlafzimmer außer schlafen?",
      optionen: [
        { id: "lesen", label: "Lesen im Bett" },
        { id: "fernsehen", label: "Fernsehen" },
        { id: "ankleiden", label: "Ankleiden und Schminken" },
        { id: "arbeiten", label: "Arbeiten" },
        { id: "sport", label: "Sport und Yoga" },
        { id: "nur", label: "Nur schlafen" }
      ],
      notiz: true, notizHinweis: "Was noch?"
    },
    {
      id: "schlafzimmer-stoert", raum: "schlafzimmer", typ: "wahl", mehrfach: true,
      frage: "Was stört Sie im Schlafzimmer heute am meisten?",
      optionen: [
        { id: "hell", label: "Morgens zu hell" },
        { id: "dunkel", label: "Zu dunkel" },
        { id: "stauraum", label: "Zu wenig Stauraum" },
        { id: "unruhig", label: "Wirkt unruhig" },
        { id: "bett", label: "Das Bett ist unbequem" },
        { id: "kalt", label: "Wirkt kalt und ungemütlich" }
      ],
      notiz: true, notizHinweis: "Was noch?"
    },

    /* ---------- Raum-Teil: Kinderzimmer ---------- */
    {
      id: "kinderzimmer-alter", raum: "kinderzimmer", typ: "wahl", mehrfach: true,
      frage: "Wie alt ist das Kind?",
      hilfe: "Mehrere möglich, wenn sich Geschwister das Zimmer teilen.",
      optionen: [
        { id: "baby", label: "Baby" },
        { id: "kleinkind", label: "Ein bis drei Jahre" },
        { id: "kindergarten", label: "Drei bis sechs Jahre" },
        { id: "schulkind", label: "Schulkind" },
        { id: "teenager", label: "Jugendlich" }
      ],
      notiz: true, notizHinweis: "Name, Lieblingsfarbe, Lieblingsthema des Kindes …"
    },
    {
      id: "kinderzimmer-bett", raum: "kinderzimmer", typ: "bild", mehrfach: true, max: 2,
      frage: "Welches Bett passt?",
      hilfe: "Bis zu zwei.",
      optionen: bildOptionen("kinderzimmer-bett", [
        ["babybett", "Babybett"], ["hausbett", "Hausbett"],
        ["hochbett", "Hochbett"], ["etagenbett", "Etagenbett"]]),
      notiz: true, notizHinweis: "Soll das Bett mitwachsen?"
    },
    {
      id: "kinderzimmer-nutzung", raum: "kinderzimmer", typ: "wahl", mehrfach: true,
      frage: "Was passiert im Kinderzimmer?",
      optionen: [
        { id: "spielen", label: "Spielen" },
        { id: "lernen", label: "Lernen und Hausaufgaben" },
        { id: "lesen", label: "Lesen und Kuscheln" },
        { id: "freunde", label: "Freunde übernachten" },
        { id: "geschwister", label: "Geschwister teilen sich das Zimmer" }
      ],
      notiz: true, notizHinweis: "Was noch?"
    },
    {
      id: "kinderzimmer-stauraum", raum: "kinderzimmer", typ: "wahl", mehrfach: true,
      frage: "Was braucht Platz?",
      optionen: [
        { id: "spielsachen", label: "Spielsachen" },
        { id: "kleidung", label: "Kleidung" },
        { id: "buecher", label: "Bücher" },
        { id: "schule", label: "Schulsachen" },
        { id: "basteln", label: "Mal- und Bastelsachen" }
      ],
      notiz: true, notizHinweis: "Was stört heute im Kinderzimmer?"
    },

    /* ---------- Raum-Teil: Arbeitszimmer ---------- */
    {
      id: "arbeitszimmer-arbeit", raum: "arbeitszimmer", typ: "wahl", mehrfach: false,
      frage: "Wie oft arbeiten Sie hier?",
      optionen: [
        { id: "taeglich", label: "Jeden Tag im Homeoffice" },
        { id: "manchmal", label: "Ein paar Tage die Woche" },
        { id: "selten", label: "Gelegentlich" },
        { id: "hobby", label: "Eher für ein Hobby" }
      ],
      notiz: true, notizHinweis: "Arbeiten hier auch zwei Personen?"
    },
    {
      id: "arbeitszimmer-schreibtisch", raum: "arbeitszimmer", typ: "bild", mehrfach: true, max: 2,
      frage: "Welcher Schreibtisch gefällt Ihnen?",
      hilfe: "Bis zu zwei.",
      optionen: bildOptionen("arbeitszimmer-schreibtisch", [
        ["hoehenverstellbar", "Höhenverstellbar"], ["holz", "Holzschreibtisch"],
        ["sekretaer", "Klein, zum Zuklappen"], ["doppelt", "Für zwei Personen"]]),
      notiz: true, notizHinweis: "Bildschirme, Drucker, Akten …"
    },
    {
      id: "arbeitszimmer-zusatz", raum: "arbeitszimmer", typ: "wahl", mehrfach: true,
      frage: "Was soll das Zimmer noch können?",
      optionen: [
        { id: "schlafsofa", label: "Gästezimmer mit Schlafsofa" },
        { id: "hobby", label: "Hobby, Nähen, Musik" },
        { id: "bibliothek", label: "Bücher und Lesesessel" },
        { id: "video", label: "Schöner Hintergrund für Videocalls" },
        { id: "nur", label: "Nur arbeiten" }
      ],
      notiz: true, notizHinweis: "Was noch?"
    },
    {
      id: "arbeitszimmer-stoert", raum: "arbeitszimmer", typ: "wahl", mehrfach: true,
      frage: "Was stört Sie im Arbeitszimmer heute am meisten?",
      optionen: [
        { id: "ruecken", label: "Rücken, Stuhl, Haltung" },
        { id: "dunkel", label: "Zu dunkel" },
        { id: "kabel", label: "Kabel und Unordnung" },
        { id: "stauraum", label: "Zu wenig Stauraum" },
        { id: "ablenkung", label: "Zu viel Ablenkung" },
        { id: "kalt", label: "Wirkt kalt und ungemütlich" }
      ],
      notiz: true, notizHinweis: "Was noch?"
    },

    /* ---------- Raum-Teil: Flur und Eingang ---------- */
    {
      id: "flur-garderobe", raum: "flur", typ: "bild", mehrfach: true, max: 2,
      frage: "Welche Garderobe gefällt Ihnen?",
      hilfe: "Bis zu zwei.",
      optionen: bildOptionen("flur-garderobe", [
        ["offen", "Offene Garderobe"], ["schrank", "Garderobenschrank"],
        ["bank", "Haken und Sitzbank"], ["einbau", "Einbau nach Maß"]]),
      notiz: true, notizHinweis: "Breite und Tiefe des Flurs …"
    },
    {
      id: "flur-platz", raum: "flur", typ: "wahl", mehrfach: true,
      frage: "Was muss im Flur Platz finden?",
      optionen: [
        { id: "jacken", label: "Jacken" },
        { id: "schuhe", label: "Viele Schuhe" },
        { id: "kleinkram", label: "Taschen und Schlüssel" },
        { id: "kinderwagen", label: "Kinderwagen oder Roller" },
        { id: "spiegel", label: "Ein großer Spiegel" },
        { id: "sitzen", label: "Ein Platz zum Schuheanziehen" }
      ],
      notiz: true, notizHinweis: "Was noch?"
    },
    {
      id: "flur-stoert", raum: "flur", typ: "wahl", mehrfach: true,
      frage: "Was stört Sie im Flur heute am meisten?",
      optionen: [
        { id: "dunkel", label: "Zu dunkel" },
        { id: "eng", label: "Zu eng" },
        { id: "stauraum", label: "Schuhe und Jacken liegen überall" },
        { id: "kahl", label: "Der erste Eindruck ist kahl" },
        { id: "zusammen", label: "Passt nicht zum Rest der Wohnung" }
      ],
      notiz: true, notizHinweis: "Was noch?"
    },

    /* ---------- Raum-Teil: Die ganze Wohnung (auch, wenn kein Raum gewählt ist) ---------- */
    {
      id: "wohnung-anfang", raum: "ganze-wohnung", typ: "wahl", mehrfach: true, max: 2,
      frage: "Womit sollen wir anfangen?",
      hilfe: "Bis zu zwei Räume.",
      optionen: [
        { id: "wohnzimmer", label: "Wohnzimmer" },
        { id: "essbereich", label: "Essbereich" },
        { id: "kueche", label: "Küche" },
        { id: "schlafzimmer", label: "Schlafzimmer" },
        { id: "kinderzimmer", label: "Kinderzimmer" },
        { id: "arbeitszimmer", label: "Arbeitszimmer" },
        { id: "flur", label: "Flur und Eingang" }
      ],
      notiz: true, notizHinweis: "Warum gerade diese Räume?"
    },
    {
      id: "wohnung-bezug", raum: "ganze-wohnung", typ: "bild", mehrfach: true, max: 2,
      frage: "Welcher Bezug fürs Sofa?",
      hilfe: "Bis zu zwei.",
      optionen: BEZUG,
      notiz: true, notizHinweis: "Oder: weiß ich noch nicht."
    },
    {
      id: "wohnung-stoert", raum: "ganze-wohnung", typ: "wahl", mehrfach: true,
      frage: "Was stört Sie in der Wohnung heute am meisten?",
      optionen: [
        { id: "dunkel", label: "Zu dunkel" },
        { id: "voll", label: "Zu voll" },
        { id: "kalt", label: "Wirkt kalt und ungemütlich" },
        { id: "zusammen", label: "Nichts passt zusammen" },
        { id: "stauraum", label: "Zu wenig Stauraum" },
        { id: "unbequem", label: "Das Sofa ist unbequem" }
      ],
      notiz: true, notizHinweis: "Was noch?"
    },

    /* ---------- Gemeinsamer Schluss ---------- */
    {
      id: "bleibt", typ: "text",
      frage: "Was soll auf jeden Fall bleiben?",
      hilfe: "Ein Erbstück, ein Bild, ein Lieblingsstuhl.",
      optionen: [],
      notiz: true, notizHinweis: "Einfach erzählen …"
    },
    {
      id: "budget", typ: "wahl", mehrfach: false,
      frage: "Welcher Rahmen ist geplant?",
      hilfe: "Für alles zusammen, ungefähr.",
      optionen: [
        { id: "bis3", label: "Bis 3.000 €" },
        { id: "3bis7", label: "3.000 bis 7.000 €" },
        { id: "7bis15", label: "7.000 bis 15.000 €" },
        { id: "ueber15", label: "Über 15.000 €" },
        { id: "offen", label: "Noch offen" }
      ],
      notiz: false
    },
    {
      id: "zeit", typ: "wahl", mehrfach: false,
      frage: "Bis wann soll es fertig sein?",
      optionen: [
        { id: "sofort", label: "So bald wie möglich" },
        { id: "1bis3", label: "In ein bis drei Monaten" },
        { id: "3bis6", label: "In drei bis sechs Monaten" },
        { id: "ohne-eile", label: "Ohne Eile" }
      ],
      notiz: true, notizHinweis: "Fester Termin, Umzug, Feier …"
    }
  ],

  /*
   * Hinweise für Andrea im Stilprofil. Eine Regel greift, wenn JEDE Bedingung erfüllt ist;
   * eine Bedingung ist erfüllt, wenn bei der Frage MINDESTENS EINE der genannten Optionen gewählt ist.
   * frage darf auch eine Liste von Frage-IDs sein: dann genügt es, wenn es bei EINER davon zutrifft.
   * Es zählen nur sichtbare Fragen (INTERFACES §1 D.3); jeder Hinweistext erscheint höchstens einmal.
   */
  hinweise: [
    {
      wenn: [{ frage: "bewohner", enthaelt: ["kinder", "tier"] },
             { frage: ["wohnzimmer-bezug", "wohnung-bezug"], enthaelt: ["samt", "boucle"] }],
      text: "Kinder oder Tier im Haushalt und Samt oder Bouclé gewünscht: strapazierfähige, gut zu reinigende Qualitäten zeigen."
    },
    {
      wenn: [{ frage: "bewohner", enthaelt: ["tier"] },
             { frage: ["wohnzimmer-bezug", "wohnung-bezug"], enthaelt: ["leder"] }],
      text: "Hund oder Katze und Leder gewünscht: auf kratzfestes, gedecktes Leder hinweisen."
    },
    {
      wenn: [{ frage: ["wohnzimmer-nutzung", "wohnzimmer-sofa", "arbeitszimmer-zusatz"], enthaelt: ["schlafsofa"] }],
      text: "Übernachtungsgäste: passende Schlafsofas aus dem Programm mitbringen."
    },
    {
      wenn: [{ frage: ["wohnzimmer-stoert", "essbereich-stoert", "schlafzimmer-stoert", "arbeitszimmer-stoert", "flur-stoert", "wohnung-stoert"], enthaelt: ["dunkel"] },
             { frage: "farbe", enthaelt: ["dunkel"] }],
      text: "Raum wirkt heute zu dunkel, gewünscht ist aber eine dunkle Farbwelt: mit Licht und hellen Akzenten ausgleichen."
    },
    {
      wenn: [{ frage: ["wohnzimmer-stoert", "essbereich-stoert", "schlafzimmer-stoert", "arbeitszimmer-stoert", "flur-stoert", "wohnung-stoert"], enthaelt: ["stauraum"] }],
      text: "Zu wenig Stauraum: Möbel nach Maß vom Schreiner ansprechen."
    },
    {
      wenn: [{ frage: "raum", enthaelt: ["kueche"] }],
      text: "Küche gewünscht: Sofa & Co. führt heute keine Küchen. Klären, ob es um Gestaltung geht (Farben, Licht, Essplatz, Deko) oder um eine neue Küche."
    },
    {
      wenn: [{ frage: "kinderzimmer-alter", enthaelt: ["baby", "kleinkind", "kindergarten"] }],
      text: "Kleines Kind: an mitwachsende Möbel denken, die später noch passen."
    },
    {
      wenn: [{ frage: "kinderzimmer-nutzung", enthaelt: ["geschwister"] }],
      text: "Geschwister teilen sich das Zimmer: Hoch- oder Etagenbett und je einen eigenen Bereich einplanen."
    },
    {
      wenn: [{ frage: "budget", enthaelt: ["offen"] }],
      text: "Budget noch offen: im Gespräch klären."
    }
  ],

  /*
   * Auftrag an die KI (im Muster nur angezeigt und kopierbar, NICHT gesendet).
   * {PROFIL} wird durch die Textfassung des Stilprofils ersetzt.
   */
  kiAuftrag:
    "Du bist Interior-Beraterin für das Einrichtungshaus Sofa & Co. in Frankfurt am Main.\n" +
    "Hier ist das Stilprofil einer Kundin oder eines Kunden aus dem Beratungsgespräch:\n\n" +
    "{PROFIL}\n\n" +
    "Entwickle daraus für jeden genannten Raum drei unterschiedliche Einrichtungsvorschläge, die zusammen " +
    "zur ganzen Wohnung passen. Nenne je Vorschlag: Grundidee in einem Satz, Wandfarbe, die wichtigsten Möbel " +
    "des Raums (im Wohnzimmer das Sofa mit Form und Bezug), Teppich, Licht, zwei bis drei Accessoires, und warum " +
    "es zu dieser Person passt. Berücksichtige die Hinweise und das Budget."
};

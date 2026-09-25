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
 * Keine Frage ist Pflicht — „Weiter" geht immer.
 */
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
      id: "material", typ: "bild", mehrfach: true, max: 2,
      frage: "Welcher Bezug fürs Sofa?",
      hilfe: "Bis zu zwei.",
      optionen: [
        { id: "leder", label: "Leder", bild: "bilder/material-leder.jpg" },
        { id: "webstoff", label: "Webstoff", bild: "bilder/material-webstoff.jpg" },
        { id: "samt", label: "Samt", bild: "bilder/material-samt.jpg" },
        { id: "boucle", label: "Bouclé", bild: "bilder/material-boucle.jpg" }
      ],
      notiz: true, notizHinweis: "Oder: weiß ich noch nicht."
    },
    {
      id: "bewohner", typ: "wahl", mehrfach: true,
      frage: "Wer lebt mit im Raum?",
      optionen: [
        { id: "erwachsene", label: "Nur Erwachsene" },
        { id: "kinder", label: "Kinder" },
        { id: "tier", label: "Hund oder Katze" },
        { id: "gaeste", label: "Oft Besuch" }
      ],
      notiz: true, notizHinweis: "Alter der Kinder, welches Tier …"
    },
    {
      id: "nutzung", typ: "wahl", mehrfach: true,
      frage: "Wofür nutzen Sie den Raum am meisten?",
      optionen: [
        { id: "fernsehen", label: "Fernsehen und Filme" },
        { id: "lesen", label: "Lesen und Ausruhen" },
        { id: "bewirten", label: "Gäste bewirten" },
        { id: "arbeiten", label: "Arbeiten" },
        { id: "schlafsofa", label: "Übernachtungsgäste" },
        { id: "mittagsschlaf", label: "Mittagsschlaf" }
      ],
      notiz: true, notizHinweis: "Wie viele Personen sitzen meistens hier?"
    },
    {
      id: "bleibt", typ: "text",
      frage: "Was soll auf jeden Fall bleiben?",
      hilfe: "Ein Erbstück, ein Bild, ein Lieblingsstuhl.",
      optionen: [],
      notiz: true, notizHinweis: "Einfach erzählen …"
    },
    {
      id: "stoert", typ: "wahl", mehrfach: true,
      frage: "Was stört Sie heute am meisten?",
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
   */
  hinweise: [
    {
      wenn: [{ frage: "bewohner", enthaelt: ["kinder", "tier"] }, { frage: "material", enthaelt: ["samt", "boucle"] }],
      text: "Kinder oder Tier im Haushalt und Samt oder Bouclé gewünscht: strapazierfähige, gut zu reinigende Qualitäten zeigen."
    },
    {
      wenn: [{ frage: "bewohner", enthaelt: ["tier"] }, { frage: "material", enthaelt: ["leder"] }],
      text: "Hund oder Katze und Leder gewünscht: auf kratzfestes, gedecktes Leder hinweisen."
    },
    {
      wenn: [{ frage: "nutzung", enthaelt: ["schlafsofa"] }],
      text: "Übernachtungsgäste: passende Schlafsofas aus dem Programm mitbringen."
    },
    {
      wenn: [{ frage: "stoert", enthaelt: ["dunkel"] }, { frage: "farbe", enthaelt: ["dunkel"] }],
      text: "Raum wirkt heute zu dunkel, gewünscht ist aber eine dunkle Farbwelt: mit Licht und hellen Akzenten ausgleichen."
    },
    {
      wenn: [{ frage: "stoert", enthaelt: ["stauraum"] }],
      text: "Zu wenig Stauraum: Sideboard nach Maß vom Schreiner ansprechen."
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
    "Entwickle daraus drei unterschiedliche Einrichtungsvorschläge. Nenne je Vorschlag: Grundidee in einem Satz, " +
    "Wandfarbe, Sofa (Form und Bezug), Teppich, Licht, zwei bis drei Accessoires, und warum es zu dieser Person passt. " +
    "Berücksichtige die Hinweise und das Budget."
};

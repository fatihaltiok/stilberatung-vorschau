/*
 * Stil-Interview — Oberflächen-Logik (Auftrag IA-1).
 * Liest ausschließlich window.INTERVIEW (fragen.js) — Fragen, Optionen, Hinweis-Regeln
 * und KI-Auftrag werden nicht erfunden, nur gezeigt. Klassisches Skript, keine
 * Netzanfragen, läuft direkt per Doppelklick (file://).
 */
(function () {
  "use strict";

  var interview = window.INTERVIEW;
  var fragen = interview.fragen;

  /* ---------- Helfer ---------- */

  function el(tag, attribute) {
    var knoten = document.createElement(tag);
    if (attribute) {
      Object.keys(attribute).forEach(function (schluessel) {
        var wert = attribute[schluessel];
        if (wert === null || wert === undefined) return;
        if (schluessel === "text") knoten.textContent = wert;
        else if (schluessel === "klasse") knoten.className = wert;
        else if (schluessel === "testid") knoten.setAttribute("data-testid", wert);
        else if (schluessel === "html") knoten.innerHTML = wert; /* nur feste, eigene Zeichenketten */
        else knoten.setAttribute(schluessel, wert);
      });
    }
    for (var i = 2; i < arguments.length; i++) {
      var kind = arguments[i];
      if (kind === null || kind === undefined) continue;
      if (Array.isArray(kind)) {
        kind.forEach(function (eintrag) { if (eintrag) knoten.appendChild(eintrag); });
      } else if (typeof kind === "string") {
        knoten.appendChild(document.createTextNode(kind));
      } else {
        knoten.appendChild(kind);
      }
    }
    return knoten;
  }

  function deutschesDatum(datum) {
    function zwei(zahl) { return (zahl < 10 ? "0" : "") + zahl; }
    return zwei(datum.getDate()) + "." + zwei(datum.getMonth() + 1) + "." + datum.getFullYear();
  }

  function zahlwort(zahl) {
    var woerter = { 1: "eins", 2: "zwei", 3: "drei", 4: "vier", 5: "fünf" };
    return woerter[zahl] || String(zahl);
  }

  function verbinde(textA, textB) {
    textA = (textA || "").trim();
    textB = (textB || "").trim();
    if (textA && textB) return textA + " " + textB;
    return textA || textB;
  }

  function frageNachId(id) {
    for (var i = 0; i < fragen.length; i++) {
      if (fragen[i].id === id) return fragen[i];
    }
    return null;
  }

  function beschriftungZu(frage, optionId) {
    for (var i = 0; i < frage.optionen.length; i++) {
      if (frage.optionen[i].id === optionId) return frage.optionen[i].label;
    }
    return optionId;
  }

  /* ---------- Zustand ---------- */

  var zustand = {
    schritt: -1, /* -1 Start, 0–11 Frage, 12 Profil */
    kunde: "",
    datum: deutschesDatum(new Date()),
    antworten: {}
  };
  fragen.forEach(function (frage) {
    zustand.antworten[frage.id] = { gewaehlt: [], notiz: "" };
  });

  var wurzel = document.getElementById("wurzel");
  var startBereich, interviewBereich, profilBereich;
  var frageArtikel = [];
  var fortschrittText, fortschrittBalken;
  var zurueckKnopf, weiterKnopf;
  var kundenFeld, kiFeld;
  var aktiveAufnahme = null;

  var SVG_HAEKCHEN =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M5 12.5 10 17.5 19 7" fill="none" stroke="currentColor" ' +
    'stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var SVG_MIKROFON =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M12 14.6a2.9 2.9 0 0 0 2.9-2.9V6a2.9 2.9 0 0 0-5.8 0v5.7a2.9 2.9 0 0 0 2.9 2.9Z" ' +
    'fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>' +
    '<path d="M6.2 11.4a5.8 5.8 0 0 0 11.6 0M12 17.2v3.6" fill="none" ' +
    'stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';

  /* ---------- Start ---------- */

  function baueStart() {
    kundenFeld = el("input", {
      klasse: "feld-input", testid: "kunde", type: "text", id: "kunde-feld",
      autocomplete: "off", maxlength: "80", placeholder: "Name, freiwillig"
    });
    kundenFeld.addEventListener("input", function () { zustand.kunde = kundenFeld.value; });
    kundenFeld.addEventListener("keydown", function (ereignis) {
      if (ereignis.key === "Enter") { ereignis.preventDefault(); gespraechBeginnen(); }
    });

    var beginnen = el("button", { klasse: "knopf", testid: "start", type: "button", text: "Gespräch beginnen" });
    beginnen.addEventListener("click", gespraechBeginnen);

    startBereich = el("section", { klasse: "start" },
      el("img", { klasse: "start-marke", src: "bilder/logo.png", alt: interview.marke, width: "150", height: "56" }),
      el("h1", { text: interview.titel }),
      el("p", {
        klasse: "start-intro",
        text: "In zwölf kurzen Fragen finden wir gemeinsam heraus, wie Sie wohnen möchten — " +
              "alles lässt sich anklicken, eintippen oder einsprechen, und am Ende steht Ihr " +
              "Stilprofil für die Beratung."
      }),
      el("div", { klasse: "start-formular" },
        el("label", { klasse: "feld-label", for: "kunde-feld", text: "Für wen ist die Beratung?" }),
        kundenFeld,
        el("p", { klasse: "start-datum", text: "Datum: " + zustand.datum }),
        el("div", { klasse: "start-aktion" }, beginnen),
        el("p", { klasse: "start-hinweis", text: "Dieses Muster speichert nichts. Beim Schließen sind die Antworten weg." })
      )
    );
    wurzel.appendChild(startBereich);
  }

  function gespraechBeginnen() {
    zustand.schritt = 0;
    zeigeFrage();
  }

  /* ---------- Interview ---------- */

  function baueInterview() {
    fortschrittText = el("span", { testid: "fortschritt", klasse: "fortschritt-text" });
    fortschrittBalken = el("span");
    zurueckKnopf = el("button", { klasse: "textknopf", testid: "zurueck", type: "button", text: "Zurück" });
    weiterKnopf = el("button", { klasse: "knopf", testid: "weiter", type: "button", text: "Weiter" });
    zurueckKnopf.addEventListener("click", function () {
      if (zustand.schritt > 0) { zustand.schritt--; zeigeFrage(); }
    });
    weiterKnopf.addEventListener("click", function () {
      if (zustand.schritt >= fragen.length - 1) zeigeProfil();
      else { zustand.schritt++; zeigeFrage(); }
    });

    var fragenListe = document.createDocumentFragment();
    fragen.forEach(function (frage, index) {
      fragenListe.appendChild(baueFrage(frage, index));
    });

    interviewBereich = el("section", { klasse: "interview", hidden: "hidden" },
      el("p", { klasse: "fortschritt-zeile" }, fortschrittText),
      el("div", { klasse: "fortschritt-linie" }, fortschrittBalken),
      el("div", { klasse: "fragen" }, fragenListe),
      el("nav", { klasse: "unere-leiste druck-weg", "aria-label": "Blättern" },
        zurueckKnopf, weiterKnopf)
    );
    wurzel.appendChild(interviewBereich);
  }

  function baueFrage(frage, index) {
    var titel = el("h2", {
      klasse: "frage-titel", tabindex: "-1", id: "frage-titel-" + frage.id, text: frage.frage
    });
    var links = el("div", { klasse: "frage-links" }, titel);
    if (frage.hilfe) links.appendChild(el("p", { klasse: "frage-hilfe", text: frage.hilfe }));

    var ansicht = el("div", { klasse: "frage-ansicht" }, links);
    if (frage.optionen && frage.optionen.length) {
      ansicht.appendChild(baueKacheln(frage, titel.id));
    } else {
      ansicht.classList.add("ohne-kacheln");
    }
    /* Unter 900 px (Handy/Hochformat) stehen die Kacheln VOR dem Notizfeld —
       im Querformat rückt das CSS die Notiz in die linke Spalte (Befund 24.09.). */
    if (frage.notiz) ansicht.appendChild(baueNotiz(frage));

    var artikel = el("article", {
      klasse: "frage", testid: "frage", "data-frage-id": frage.id, hidden: "hidden"
    }, ansicht);
    frageArtikel[index] = artikel;
    return artikel;
  }

  function baueNotiz(frage) {
    var feld = el("textarea", {
      klasse: "notiz-feld", testid: "notiz", id: "notiz-" + frage.id,
      rows: "3", placeholder: frage.notizHinweis || ""
    });
    feld.addEventListener("input", function () {
      zustand.antworten[frage.id].notiz = feld.value;
    });

    var status = el("span", { klasse: "sprech-status", role: "status" });
    status.textContent = "Einsprechen";
    var knopf = el("button", {
      klasse: "sprech-knopf", testid: "sprechen", type: "button",
      html: SVG_MIKROFON, "aria-label": "Einsprechen"
    });

    var Erkennung = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (!Erkennung) {
      knopf.disabled = true;
      status.textContent = "Einsprechen geht in Chrome und Edge.";
    } else {
      knopf.addEventListener("click", function () {
        einsprechenUmschalten(frage, feld, status, knopf, Erkennung);
      });
    }

    return el("div", { klasse: "notiz" },
      el("label", { klasse: "notiz-label", for: feld.id, text: "Notiz" }),
      feld,
      el("div", { klasse: "einsprech-zeile" }, knopf, status)
    );
  }

  /* Einsprechen: Web Speech API, erkanntes wird an den vorhandenen Text angehängt */

  function einsprechenUmschalten(frage, feld, status, knopf, Erkennung) {
    if (aktiveAufnahme && aktiveAufnahme.frageId === frage.id) {
      aufnahmeStoppen();
      return;
    }
    aufnahmeStoppen();

    var erkennung = new Erkennung();
    erkennung.lang = "de-DE";
    erkennung.interimResults = true;
    erkennung.continuous = true;

    aktiveAufnahme = {
      erkennung: erkennung, basis: feld.value,
      frageId: frage.id, status: status, knopf: knopf
    };

    erkennung.onresult = function (ereignis) {
      if (!aktiveAufnahme || aktiveAufnahme.erkennung !== erkennung) return;
      var ganz = "", zwischen = "";
      for (var i = ereignis.resultIndex; i < ereignis.results.length; i++) {
        var stueck = ereignis.results[i][0].transcript;
        if (ereignis.results[i].isFinal) ganz += stueck;
        else zwischen += stueck;
      }
      if (ganz) aktiveAufnahme.basis = verbinde(aktiveAufnahme.basis, ganz);
      feld.value = verbinde(aktiveAufnahme.basis, zwischen);
      zustand.antworten[frage.id].notiz = feld.value;
    };
    erkennung.onerror = function (ereignis) {
      if (ereignis && ereignis.error === "aborted") return; /* eigenes Stoppen */
      if (!aktiveAufnahme || aktiveAufnahme.erkennung !== erkennung) return;
      var meldung = aktiveAufnahme.status;
      aufnahmeStoppen();
      meldung.textContent = "Das Einsprechen hat gerade nicht geklappt. Bitte tippen Sie einfach.";
    };
    erkennung.onend = function () {
      if (aktiveAufnahme && aktiveAufnahme.erkennung === erkennung) aufnahmeStoppen();
    };

    try {
      erkennung.start();
    } catch (fehler) {
      aktiveAufnahme = null;
      status.textContent = "Das Einsprechen hat gerade nicht geklappt. Bitte tippen Sie einfach.";
      return;
    }
    knopf.classList.add("nimmt-auf");
    knopf.setAttribute("aria-label", "Einsprechen beenden");
    status.textContent = "Hört zu … nochmal tippen zum Beenden";
  }

  function aufnahmeStoppen() {
    if (!aktiveAufnahme) return;
    var aufnahme = aktiveAufnahme;
    aktiveAufnahme = null;
    try { aufnahme.erkennung.stop(); } catch (fehler) { /* läuft schon nicht mehr */ }
    aufnahme.knopf.classList.remove("nimmt-auf");
    aufnahme.knopf.setAttribute("aria-label", "Einsprechen");
    aufnahme.status.textContent = "Einsprechen";
  }

  /* ---------- Kacheln ---------- */

  function baueKacheln(frage, titelId) {
    var behaelter = el("div", {
      klasse: "kacheln kacheln-typ-" + frage.typ,
      role: "group", "aria-labelledby": titelId
    });
    var kachelZuOption = {};
    var maxHinweis = el("p", { klasse: "max-hinweis", role: "status" });
    var maxTimer = null;

    function aktualisiereAuswahl() {
      var gewaehlt = zustand.antworten[frage.id].gewaehlt;
      frage.optionen.forEach(function (option) {
        var kachel = kachelZuOption[option.id];
        var ist = gewaehlt.indexOf(option.id) >= 0;
        kachel.setAttribute("aria-pressed", ist ? "true" : "false");
      });
    }

    function zeigeMaxHinweis() {
      maxHinweis.textContent = "Höchstens " + zahlwort(frage.max) + ".";
      maxHinweis.classList.add("da");
      if (maxTimer) clearTimeout(maxTimer);
      maxTimer = setTimeout(function () { maxHinweis.classList.remove("da"); }, 2200);
    }

    function kachelGeklickt(option) {
      var antwort = zustand.antworten[frage.id];
      var stelle = antwort.gewaehlt.indexOf(option.id);
      if (stelle >= 0) {
        antwort.gewaehlt.splice(stelle, 1); /* abwählen geht immer */
      } else if (!frage.mehrfach) {
        antwort.gewaehlt = [option.id]; /* ein Klick ersetzt die vorige Wahl */
      } else if (frage.max && antwort.gewaehlt.length >= frage.max) {
        zeigeMaxHinweis(); /* weiterer Klick wird nicht angenommen */
      } else {
        antwort.gewaehlt.push(option.id);
      }
      aktualisiereAuswahl();
    }

    frage.optionen.forEach(function (option) {
      var kachel;
      if (frage.typ === "bild") {
        kachel = el("button", {
          klasse: "kachel kachel-typ-bild", testid: "option", type: "button",
          "data-option-id": option.id, "aria-pressed": "false"
        },
          el("img", { klasse: "kachel-bild", src: option.bild, alt: option.label }),
          el("span", { klasse: "kachel-name", text: option.label }),
          el("span", { klasse: "kachel-haekchen", html: SVG_HAEKCHEN, "aria-hidden": "true" })
        );
      } else if (frage.typ === "farbe") {
        var streifen = el("span", { klasse: "streifen", "aria-hidden": "true" });
        option.farben.forEach(function (hexwert) {
          var streifenStueck = el("span");
          streifenStueck.style.background = hexwert;
          streifen.appendChild(streifenStueck);
        });
        kachel = el("button", {
          klasse: "kachel kachel-typ-farbe", testid: "option", type: "button",
          "data-option-id": option.id, "aria-pressed": "false"
        },
          streifen,
          el("span", { klasse: "kachel-name", text: option.label }),
          el("span", { klasse: "kachel-haekchen", html: SVG_HAEKCHEN, "aria-hidden": "true" })
        );
      } else {
        kachel = el("button", {
          klasse: "kachel kachel-typ-wahl", testid: "option", type: "button",
          "data-option-id": option.id, "aria-pressed": "false"
        },
          el("span", { klasse: "kachel-text" },
            el("span", { text: option.label }),
            el("span", { klasse: "kachel-haken", html: SVG_HAEKCHEN, "aria-hidden": "true" })
          )
        );
      }
      kachel.addEventListener("click", function () { kachelGeklickt(option); });
      kachelZuOption[option.id] = kachel;
      behaelter.appendChild(kachel);
    });

    behaelter.appendChild(maxHinweis);
    return behaelter;
  }

  /* ---------- Anzeige steuern ---------- */

  function zeigeFrage() {
    aufnahmeStoppen();
    startBereich.hidden = true;
    profilBereich.hidden = true;
    interviewBereich.hidden = false;
    frageArtikel.forEach(function (artikel, index) {
      artikel.hidden = index !== zustand.schritt;
    });
    fortschrittText.textContent = "Frage " + (zustand.schritt + 1) + " von " + fragen.length;
    fortschrittBalken.style.width = ((zustand.schritt + 1) / fragen.length * 100) + "%";
    zurueckKnopf.disabled = zustand.schritt === 0;
    weiterKnopf.textContent = zustand.schritt === fragen.length - 1 ? "Stilprofil zeigen" : "Weiter";
    var titel = frageArtikel[zustand.schritt].querySelector(".frage-titel");
    if (titel) titel.focus();
  }

  /* ---------- Stilprofil ---------- */

  function berechneHinweise() {
    var raus = [];
    interview.hinweise.forEach(function (regel) {
      var greift = regel.wenn.every(function (bedingung) {
        var frage = frageNachId(bedingung.frage);
        if (!frage) return false;
        var gewaehlt = zustand.antworten[frage.id].gewaehlt;
        return bedingung.enthaelt.some(function (optionId) {
          return gewaehlt.indexOf(optionId) >= 0;
        });
      });
      if (greift) raus.push(regel.text);
    });
    return raus;
  }

  function baueProfiltext(kunde, antworten, hinweise) {
    var zeilen = [kunde ? "Stilprofil für " + kunde : "Stilprofil", "Datum: " + zustand.datum];
    fragen.forEach(function (frage) {
      var antwort = antworten[frage.id];
      var beschriftungen = antwort.gewaehlt.map(function (optionId) {
        return beschriftungZu(frage, optionId);
      });
      zeilen.push("", frage.frage);
      zeilen.push("Antwort: " + (beschriftungen.length ? beschriftungen.join(", ") : "—"));
      if (antwort.notiz.trim()) zeilen.push("Notiz: " + antwort.notiz.trim());
    });
    zeilen.push("");
    if (hinweise.length) {
      zeilen.push("Hinweise:");
      hinweise.forEach(function (hinweis) { zeilen.push("- " + hinweis); });
    } else {
      zeilen.push("Hinweise: keine");
    }
    return zeilen.join("\n");
  }

  function gewaehlteOptionen(frage) {
    return frage.optionen.filter(function (option) {
      return zustand.antworten[frage.id].gewaehlt.indexOf(option.id) >= 0;
    });
  }

  function baueCollage() {
    var fotos = [];
    var baender = [];
    var gefuehle = [];
    fragen.forEach(function (frage) {
      var gewaehlt = gewaehlteOptionen(frage);
      if (frage.typ === "bild") {
        gewaehlt.forEach(function (option) { fotos.push(option); });
      } else if (frage.typ === "farbe") {
        gewaehlt.forEach(function (option) { baender.push(option); });
      } else if (frage.id === "gefuehl") {
        gewaehlt.forEach(function (option) { gefuehle.push(option); });
      }
    });

    var collage = el("div", { klasse: "collage" });
    fotos.forEach(function (option, index) {
      var klasse = "collage-foto";
      if (fotos.length === 1) klasse += " breit";
      else if (index % 2 === 1) klasse += " rechts";
      collage.appendChild(el("figure", { klasse: klasse },
        el("img", { src: option.bild, alt: option.label })));
    });
    baender.forEach(function (option) {
      var streifen = el("span", { klasse: "streifen", "aria-hidden": "true" });
      option.farben.forEach(function (hexwert) {
        var stueck = el("span");
        stueck.style.background = hexwert;
        streifen.appendChild(stueck);
      });
      collage.appendChild(el("figure", { klasse: "collage-band" },
        streifen,
        el("span", { klasse: "collage-band-name", text: option.label })));
    });
    if (gefuehle.length) {
      var worte = el("div", { klasse: "collage-gefuehle" });
      gefuehle.forEach(function (option) { worte.appendChild(el("span", { text: option.label })); });
      collage.appendChild(worte);
    }
    return collage;
  }

  function baueAntwortenListe() {
    var liste = document.createDocumentFragment();
    fragen.forEach(function (frage) {
      var antwort = zustand.antworten[frage.id];
      var beschriftungen = antwort.gewaehlt.map(function (optionId) {
        return beschriftungZu(frage, optionId);
      });
      var haupt = el("div", null,
        el("p", { klasse: "antwort-text", text: beschriftungen.length ? beschriftungen.join(", ") : "—" }));
      if (antwort.notiz.trim()) {
        haupt.appendChild(el("p", { klasse: "antwort-notiz", text: "Notiz: " + antwort.notiz.trim() }));
      }
      liste.appendChild(el("div", { klasse: "antwort-zeile" },
        el("p", { klasse: "antwort-frage", text: frage.frage }),
        haupt));
    });
    return liste;
  }

  function zeigeProfil() {
    aufnahmeStoppen();
    var kunde = zustand.kunde.trim();
    var hinweise = berechneHinweise();

    var antwortenKopie = {};
    fragen.forEach(function (frage) {
      antwortenKopie[frage.id] = {
        gewaehlt: zustand.antworten[frage.id].gewaehlt.slice(),
        notiz: zustand.antworten[frage.id].notiz
      };
    });
    window.STILPROFIL = {
      kunde: kunde,
      datum: zustand.datum,
      antworten: antwortenKopie,
      hinweise: hinweise.slice()
    };

    var profiltext = baueProfiltext(kunde, antwortenKopie, hinweise);
    var kiText = interview.kiAuftrag.replace("{PROFIL}", profiltext);

    /* Moodboard nur, wenn etwas gewählt ist — keine leeren Rahmen */
    var fotosDa = fragen.some(function (frage) {
      return frage.typ === "bild" && gewaehlteOptionen(frage).length > 0;
    });
    var baenderDa = fragen.some(function (frage) {
      return frage.typ === "farbe" && gewaehlteOptionen(frage).length > 0;
    });
    var gefuehleDa = gewaehlteOptionen(frageNachId("gefuehl")).length > 0;

    profilBereich.textContent = "";
    profilBereich.appendChild(el("header", { klasse: "profil-kopf" },
      el("h2", { tabindex: "-1", text: kunde ? "Stilprofil für " + kunde : "Stilprofil" }),
      el("p", { klasse: "profil-datum", text: zustand.datum })));

    if (fotosDa || baenderDa || gefuehleDa) {
      profilBereich.appendChild(el("section", { klasse: "pinnwand", "aria-label": "Moodboard" },
        el("div", { klasse: "pinnwand-inhalt" },
          el("img", {
            klasse: "handschrift", src: "bilder/handschrift.png", alt: "",
            width: "260", height: "62"
          }),
          baueCollage())));
    }

    var hinweisBereich = el("section", { klasse: "hinweise" },
      el("h3", { text: "Hinweise für Andrea" }));
    if (hinweise.length) {
      hinweise.forEach(function (text) {
        hinweisBereich.appendChild(el("p", { klasse: "hinweis", testid: "hinweis", text: text }));
      });
    } else {
      hinweisBereich.appendChild(el("p", {
        klasse: "hinweise-leer", text: "Keine besonderen Hinweise aus diesen Antworten."
      }));
    }

    kiFeld = el("textarea", {
      klasse: "ki-text", testid: "ki-text", readonly: "readonly", rows: "12",
      "aria-label": "Auftrag an die KI"
    });
    kiFeld.value = kiText;

    var kopierenKnopf = el("button", { klasse: "knopf", testid: "kopieren", type: "button", text: "Text kopieren" });
    kopierenKnopf.addEventListener("click", function () { textKopieren(kopierenKnopf); });

    profilBereich.appendChild(el("section", { klasse: "antworten" },
      el("h3", { text: "Ihre Antworten" }),
      baueAntwortenListe()));
    profilBereich.appendChild(hinweisBereich);
    profilBereich.appendChild(el("section", { klasse: "ki druck-weg" },
      el("h3", { text: "Übergabe an die KI" }),
      kiFeld,
      el("div", { klasse: "ki-zeile" },
        kopierenKnopf,
        el("button", {
          klasse: "knopf", testid: "ki-knopf", type: "button",
          text: "Vorschläge von der KI holen", disabled: "disabled"
        }),
        el("p", {
          klasse: "ki-hinweis",
          text: "Kommt im nächsten Schritt: Hier schickt der Assistent das Profil an die KI."
        }))));
    profilBereich.appendChild(el("div", { klasse: "aktion-leiste druck-weg" },
      el("button", { klasse: "knopf", testid: "drucken", type: "button", text: "Als PDF speichern" }),
      el("button", { klasse: "textknopf", testid: "neu", type: "button", text: "Neues Gespräch" })));

    profilBereich.querySelector("[data-testid=drucken]").addEventListener("click", function () {
      window.print();
    });
    profilBereich.querySelector("[data-testid=neu]").addEventListener("click", allesNeu);

    zustand.schritt = fragen.length;
    startBereich.hidden = true;
    interviewBereich.hidden = true;
    profilBereich.hidden = false;
    var kopf = profilBereich.querySelector(".profil-kopf h2");
    if (kopf) kopf.focus();
  }

  function textKopieren(knopf) {
    var text = kiFeld ? kiFeld.value : "";
    var urschrift = knopf.textContent;
    function zuruecksetzen() {
      setTimeout(function () { knopf.textContent = urschrift; }, 2400);
    }
    function fertig() {
      knopf.textContent = "Kopiert";
      zuruecksetzen();
    }
    function ohneKlemmbrettSchnittstelle() {
      var geklappt = false;
      try {
        kiFeld.focus();
        kiFeld.select();
        geklappt = document.execCommand("copy");
      } catch (fehler) {
        geklappt = false;
      }
      if (geklappt) {
        fertig();
      } else {
        knopf.textContent = "Kopieren nicht möglich";
        zuruecksetzen();
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(fertig, ohneKlemmbrettSchnittstelle);
    } else {
      ohneKlemmbrettSchnittstelle();
    }
  }

  function allesNeu() {
    aufnahmeStoppen();
    zustand.schritt = -1;
    zustand.kunde = "";
    fragen.forEach(function (frage) {
      zustand.antworten[frage.id] = { gewaehlt: [], notiz: "" };
    });
    delete window.STILPROFIL;
    kiFeld = null;
    kundenFeld.value = "";
    frageArtikel.forEach(function (artikel) {
      artikel.hidden = true;
      var kacheln = artikel.querySelectorAll("[data-testid=option]");
      for (var i = 0; i < kacheln.length; i++) {
        kacheln[i].setAttribute("aria-pressed", "false");
      }
      var notiz = artikel.querySelector("[data-testid=notiz]");
      if (notiz) notiz.value = "";
      var maxHinweis = artikel.querySelector(".max-hinweis");
      if (maxHinweis) maxHinweis.classList.remove("da");
    });
    profilBereich.textContent = "";
    weiterKnopf.textContent = "Weiter";
    profilBereich.hidden = true;
    interviewBereich.hidden = true;
    startBereich.hidden = false;
    kundenFeld.focus();
  }

  /* ---------- Anfang ---------- */

  baueStart();
  baueInterview();
  profilBereich = el("section", { testid: "stilprofil", klasse: "profil", hidden: "hidden" });
  wurzel.appendChild(profilBereich);
})();

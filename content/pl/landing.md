# Landing copy, Polish

Source copy for the Polish site. Written from the claims settled in
`content/en/landing.md`, not from its sentences. Where Polish says a thing differently,
it says it differently.

**Commentary is in English, copy is in Polish.** Everything inside a blockquote is the
copy and it is Polish. Everything outside one is commentary for whoever works on this
next, and it matches the English files so the two can be read side by side. Tickets 07
and 08 can take the blockquotes alone and lose nothing they need.

**Gate markers.** Same gates as the English file, block for block. `Gate: shipped`
means a person can go and see the behaviour today. Anything else names the Journal
ticket that has to land first. A block gated in English is gated in Polish, and a block
that becomes publishable becomes publishable in both languages at once.

**The reader is never assigned a gender.** Polish inflects the second person in the past
tense and in adjectives, so an ordinary sentence addressed to the reader picks a gender
for them. Every sentence below stays in the present tense, the imperative, or an
impersonal construction. No slash forms. This is the constraint the English never has to
solve, and it is why several sentences here are built differently rather than closely.

**Terminology.** The app already ships in Polish, so the site follows it: wpis, nastrój,
tagi, skale, zestaw, kamienie milowe, podsumowanie, wyniki badań, blokada aplikacji,
kamuflaż, szybkie wyjście, tranzycja. Terms the shipped app has no Polish word for were
decided here and recorded in `.agents/product-marketing.md`.

---

## Product overview

### Hero

*Gate: shipped.*

**Headline**

> Dziennik tranzycji, który zostaje na twoim urządzeniu.

Two alternatives, if the design wants a different weight. *Zapisuj, jak ci mija dzień.
Bez konta, bez chmury.* leads with the habit and keeps a claim, but it names the storage
only by what it is not. *Twoja tranzycja, na twoich zasadach.* is the line that could sit
on any product, so it is here as the one to beat.

Going with the first, for the same reason the English does: it carries the claim, and
the claim is why anyone stays on the page. The possessive in `twoim` is doing real work
here, since the whole point is whose device it is, so it stays despite Polish normally
dropping it.

**Subheadline**

> Zapisz, jak minął dzień, i mierz to, co chcesz mierzyć. Konta nie zakładasz,
> synchronizować nie ma czego.

**Primary action**

Start journal. Owned by ticket 06, which also decides whether that button keeps its
English name in Polish. The English file fixed the wording from the spec; the Polish
name is a live question and this ticket does not settle it.

### What it is

*Gate: shipped.*

> Gender Diary to dziennik tranzycji. We wpisie mieści się nastrój, notatka, twoje
> skale, tagi i zdjęcia, a żeby wpis się liczył, wystarczy jedno z tego. Jeśli jeden
> wpis nie oddaje całego dnia, napisz kilka. Jeśli dzień przepadł, dopisz go z datą
> wsteczną.
>
> Aplikacje do notowania nastroju mają dobry kształt na codzienny nawyk i nie mają
> gdzie zapisać tego, na czym najbardziej ci zależy. Gender Diary zostawia ten kształt
> i dokłada skale. Zapisuje to, co jej powiesz, i niczego z tego nie interpretuje.

### Where it stands on privacy

*Gate: shipped. The full page is ticket 04 and this is only the handoff to it.*

> Twój dziennik jest zapisany na twoim urządzeniu. Nie ma konta Gender Diary, a wpisy
> nie trafiają na serwer Gender Diary.
>
> Co to chroni, a czego nie chroni, nie mieści się w jednym zdaniu, więc ma osobną
> stronę.

---

## Visual tour

### The line that covers the whole tour

*Gate: shipped. Required by the spec: public screenshots use synthetic Journal data.*

> Wszystkie zrzuty ekranu zrobiono na zmyślonych danych. Nie ma tu niczyjego dziennika.

Place it where a person meets the first screenshot. The captions on the five screens
that show written entries repeat it in short form, exactly as in English.

### Captions

*Gate: shipped, all eight.*

**Ekran główny**

> Powitanie, co przed tobą, i ostatnie siedem dni w kolorze, który wybierasz. Pasek
> nastrojów zapisuje wpis na teraz jednym ruchem, więc w dzień, w którym pisanie nie
> wchodzi w grę, nadal da się coś zapisać. Wpisy zmyślone.

**Wpis**

> Nastrój, twoje skale, tagi, notatka, zdjęcia. Wpisowi wystarczy jedno z tego, więc
> dzień, w którym starczyło tylko na nastrój, i tak jest dniem zapisanym. Wpis zmyślony.

**Miesiąc**

> Kolor bierze się z nastroju albo z dowolnej skali, którą wybierzesz. Dni bez wpisu
> zostają neutralne, bo luka to nie jest zły dzień i kolor nigdy tego nie sugeruje.

**Jeden dzień, dwa wpisy**

> Poczucie płci potrafi się zmieniać w ciągu dnia, więc dzień mieści tyle wpisów, ile
> trzeba, i każdy dostaje swoją godzinę. Kolor całego dnia to ich średnia. Wpisy
> zmyślone.

**Wyszukiwanie**

> Szuka w notatkach i tagach w trakcie pisania. Polskie znaki nie mają znaczenia w żadną
> stronę: wpisz „lozko”, a znajdzie łóżko. Wpisy zmyślone.

**Pół roku jednej skali**

> Każda skala ma swój wykres i swoją średnią z okresu, który wybierzesz. Dni z kilkoma
> wpisami liczą się jako średnia, a po otwarciu wykresu widać, które to dni.

**Kamienie milowe**

> Ważne daty, po kolei. Te przed tobą odliczają dni. Te za tobą wracają co roku.

**Eksport**

> Eksport pakuje całość do jednego archiwum i szyfruje je hasłem, które wybierasz, zanim
> plik gdziekolwiek trafi. Dziennik zmyślony.

---

## Feature summary

### Writing it down

*Gate: shipped.*

> **Wpisy.** Nastrój w pięciu stopniach, notatka, tagi, zdjęcia i twoje skale. Kilka
> dziennie albo z datą wsteczną, do dnia, który przepadł.
>
> **Skale.** Pięć jest wbudowanych, wśród nich Poczucie płci, od dysforii na jednym
> końcu do euforii na drugim. Własną skalę definiujesz od zera: dwie etykiety końców i
> zakres, jaki chcesz. Te, których używasz, łączysz w zestaw, żeby ekran wpisu pytał
> tylko o to, co faktycznie mierzysz.
>
> **Tagi.** Pogrupowane, do zmiany w każdej chwili. Całą grupę można wyłączyć, kiedy
> przestaje być na temat. Ukryty tag wbudowany znika ze wszystkich list wyboru, a wpisy,
> które już go mają, zostają nietknięte.
>
> **Zdjęcia.** Trzymane w pamięci samej aplikacji. Nie trafiają do galerii telefonu, więc
> nie wyskoczą komuś, kto akurat przewija zdjęcia.

### Reading it back

*Gate: shipped.*

> **Miesiąc.** Kalendarz w jednym kolorze o różnej sile, sterowany nastrojem albo
> wybraną skalą.
>
> **Wyszukiwanie.** Notatki i nazwy tagów, dopasowywane w trakcie pisania, bez oglądania
> się na polskie znaki.
>
> **Wykresy.** Jeden na skalę, w zakresie od 7 do 365 dni, z twoją serią dni z wpisem. Po
> otwarciu wykresu widać listę wartości z datami, więc linię da się sprawdzić, a nie
> tylko przyjąć na wiarę.
>
> **Tagi w liczbach.** Dla wybranej skali widać, jak wypadają dni z danym tagiem wobec
> dni bez niego. To obserwacja, nie wyrok. Tagi z mniej niż trzema wpisami w zakresie
> wypadają z zestawienia, bo przy takiej liczbie różnica jest szumem.
>
> **Podsumowanie.** Co się złożyło na miniony miesiąc. Skończony rok dostaje własne.
>
> **Kamienie milowe i oś czasu.** Odliczanie do tego, co przed tobą, rocznice tego, co
> za tobą.
>
> **Wyniki badań.** Trzymasz własne liczby i patrzysz, jak zmieniają się w czasie.
> Aplikacja ich nie interpretuje.

### Keeping it

*Gate: shipped.*

> **Archiwa.** Eksport pakuje dziennik do jednego pliku i szyfruje go hasłem, które
> wybierasz, zanim plik opuści aplikację. Import wkłada go z powrotem, dokładając do
> tego, co już jest, albo zastępując całość.
>
> **Przejście z Daylio.** Import bierze plik CSV z Daylio. Zanim cokolwiek zapisze,
> pokazuje liczby i to, jak przełoży nastroje, a zawsze tylko dokłada do tego, co już
> masz.
>
> **Eksport zwykły.** CSV albo JSON, do arkusza albo na własną kopię. Taki plik nie jest
> zaszyfrowany, aplikacja mówi to wprost i każe potwierdzić, zanim go zapisze.
>
> **Kiedy minęło trochę czasu.** Jeśli ostatnie archiwum ma więcej niż 30 dni, ekran
> główny mówi o tym raz. Można to zamknąć.

### If you need to be careful

*Gate: shipped, including disguise and quick exit, which Journal ticket 15 records as
implemented for the web today. App lock, disguise, lock on leave and quick exit all
default to off in the Journal's preference catalogue. Every sentence here keeps the
app-lock counterweight attached, per the marketing context. Ticket 04 owns the longer
treatment.*

> Wszystko w tej sekcji jest wyłączone, dopóki tego nie włączysz. Prowadzenie dziennika
> o własnym życiu to nic wstydliwego i aplikacja nie zachowuje się, jakby było inaczej.
> Te funkcje istnieją, bo bywają sytuacje naprawdę niebezpieczne, a czy twoja taka jest,
> wiesz tylko ty.
>
> **Blokada aplikacji.** PIN przed wejściem do aplikacji. Zatrzymuje kogoś, kto bierze do
> ręki odblokowany telefon i chce poczytać. Nie jest szyfrowaniem tego, co zapisane, i ta
> strona nie będzie tego sugerować.
>
> **Kamuflaż.** Karta przeglądarki pokazuje „Notes” zamiast Gender Diary.
>
> **Szybkie wyjście.** Zjechanie dwoma palcami w dół wygasza kartę, a jeśli blokada
> aplikacji jest włączona, blokuje ją.

The disguise title is the literal string `Notes`, set in the Journal's
`src/routes/+layout.svelte` and not translated, so the Polish copy quotes it as it
appears rather than as it would read. If that string ever gets localised, this sentence
changes with it.

### How it looks

*Gate: shipped.*

> **Osiem palet**: transpłciowa, niebinarna, genderfluid, biseksualna, lesbijska,
> panseksualna, agender i tęczowa. Każda przemalowuje całą aplikację, razem z wykresami
> i kalendarzem, i każda działa w jasnym i w ciemnym motywie.
>
> **Kolor niczego nie ocenia.** Nie ma czerwonego na zły dzień ani zielonego na dobry.
> Kalendarz używa jednego koloru o różnej sile, a pusty dzień zostaje pusty.
>
> **Dwa języki.** Polski i angielski, do przełączenia w ustawieniach, a daty idą za
> wybranym językiem.

The palette names are English labels in the app's settings screen. On the site they are
flag names in ordinary Polish, because here they describe the palettes rather than name
a control the reader has to find. Polish leads with Polish in the language line, which
the English file has no reason to do.

### Staged, not published

None of the blocks below may appear on the page yet, in either language. Gates match the
English file block for block.

*Gate: Journal ticket 11. There is no Android project in the repository, so no sentence
on this site may say the app runs on Android.*

> **Na Androidzie.** Ten sam dziennik, te same dane, jako aplikacja.

*Gate: Journal tickets 11 and 14.*

> **Przypomnienia.** Leki, zastrzyki, wizyty. Jednorazowe albo powtarzalne, jako
> powiadomienia w telefonie.
>
> **Codzienne pytanie.** Jedno pytanie dziennie, o porze, którą wybierasz, pomijane w
> dni, kiedy i tak już coś zapiszesz.

*Gate: Journal tickets 11 and 16.*

> **Kopia według harmonogramu.** Zaszyfrowane archiwum zapisywane do wybranego folderu,
> co tydzień albo co miesiąc, bez pamiętania o tym.

*Gate: Journal ticket 03, on its evidence rather than on its status line. See the
English file for why: the ticket reads `Status: done` over an unchecked acceptance list
and a repository with no service worker, no manifest and no PWA plugin.*

> **Instalacja.** Dodaj aplikację do ekranu głównego i otwieraj ją bez przeglądarki po
> drodze.
>
> **Działa bez sieci.** Po instalacji nie potrzebuje sieci, żeby się otworzyć.

*Gate: Journal ticket 09 and its evidence gate. Ticket 04 owns this wording, and
`content/pl/privacy.md` carries the Polish. Listed here only so the feature summary does
not look complete without it.*

> Szyfrowanie samego dziennika tam, gdzie jest zapisany.

---

## Source, licence and support

### Source

*Gate: shipped as far as the licence goes. The "you can read it" phrasing additionally
needs the Journal repository to actually be public, which is a deliberate step it has not
taken yet.*

> **Można to przeczytać.** Gender Diary jest wolnym oprogramowaniem na licencji GPLv3.
> Kod jest publiczny i tylko dlatego warto wierzyć w cokolwiek, co ta strona mówi o tym,
> co aplikacja robi z twoim dziennikiem. Zajrzyj albo poproś o to kogoś, komu ufasz.
>
> Licencja znaczy też, że wolno ten kod uruchamiać, zmieniać i przekazywać dalej. Jeśli
> projekt kiedyś stanie, ten kod może podnieść ktoś inny, a twoje archiwa mają
> udokumentowany format, a nie taki, który otwiera tylko ta jedna aplikacja.

### Support

*Gate: shipped. The prohibition on asking for sensitive material is required by the spec
and is not optional wording.*

> **Jeśli coś nie działa**, napisz, jakie kroki prowadzą do problemu, czego się
> spodziewasz i co dzieje się zamiast tego. Zwykle to w zupełności wystarczy.
>
> **Nie przysyłaj nam swojego dziennika.** Ani archiwum, ani zrzutu ekranu z wpisami, ani
> logu z sesji, w której coś piszesz. Nigdy o nic z tego nie poprosimy, a jeśli jakaś
> prośba tak wygląda, nie pochodzi od nas.

The English writes this as "say what you did, what you expected and what happened
instead". Every one of those is a past-tense address to the reader, which in Polish picks
a gender. The Polish asks for the same three things in the present tense instead.

### Privacy policy and security contact

*Gate: Journal ticket 21, which writes the policy and fixes the security contact. This
site presents them and may not run ahead of them. No copy here yet.*

The English file keeps its placeholder inside a blockquote, which is the one place a
placeholder must never sit, since tickets 07 and 08 take the blockquotes as copy. It is
outside one here. Worth fixing over there.

---

## Notes for later tickets

Ticket 06 owns Start journal and the channel list, in both languages. The Polish name of
that button is open: the spec fixes the English wording, and nothing yet fixes what it
says in Polish.

Ticket 07 owns titles, descriptions and structured data. The Polish page needs its own,
written as Polish, not as a translated title tag. The only claims available to mark up
are the ones marked shipped here.

Ticket 09 is where Polish length stops being a copy question and becomes a layout one.
Polish runs longer than English almost everywhere in this file, and the feature labels
run longest.

Numbers and dates in Polish copy: a space as the thousands separator, a comma for
decimals, `24.02.2026` or `24 lutego 2026` for dates, `14:30` for times, months and
languages in lower case. Nothing in this file needs a formatted date yet, but ticket 09
and the Play listing will.

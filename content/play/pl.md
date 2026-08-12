# Play listing, Polish (pl-PL)

Source copy for the Google Play listing, Polish locale. Written from the claims the
English listing settles, not from its sentences, the same rule as the rest of
`content/pl/`. Where the shipped Polish site already says a thing well, this file
reuses that sentence rather than writing a second Polish sentence for the same claim,
because those sentences were written as Polish by ticket 05 and a paraphrase would
only add drift.

**Commentary is in English, copy is in Polish.** Everything inside a blockquote is the
copy and it is Polish. Everything outside one is commentary. Gates match `en.md` block
for block, including its baseline definition (Journal tickets 11, 12 and 18); a block
published in one locale is published in both at once.

**The reader is never assigned a gender, and neither is the author.** Present tense,
imperative or impersonal for the reader; present and future for the first person. No
slash forms. The rules and the reasoning are in `content/pl/landing.md`.

**Length limits.** The same as English, and Play counts characters, so every Polish
diacritic costs one. Counts recorded per field, worst case with every gate passed.

---

## Title

*Gate: baseline. Limit 30 characters. Play's strongest ranking signal, and the brand's
own words, gender and diary, are English tokens that do nothing for Polish queries, so
the suffix has to carry Polish.*

> Gender Diary: tranzycja

23 of 30 characters. "tranzycja" is the highest-intent Polish search this app can
honestly meet, and the one the brand covers least. "dziennik nastroju", the Polish
mood-tracker aisle, was the other candidate and does not fit: with the brand and a
separator it needs 31. It goes to the short description instead, one field down.
Alternatives and reasoning in `keywords.md`.

## Short description

*Gate: baseline. Limit 80 characters. Indexed, and visible without expanding.*

> Dziennik tranzycji i nastroju, który zostaje na twoim urządzeniu. Bez konta.

76 of 80 characters. Carries the three Polish terms the title could not hold together:
dziennik, nastrój, and the device claim, with "tranzycja" repeated from the title
because the two fields are read separately. The possessive in "twoim" is doing real
work, the same call `content/pl/landing.md` records for the hero.

## Full description

*Gate: per block, below. Limit 4,000 characters, assembled the same way as the
English: published blocks in order, blank line between blocks, headers as plain lines,
no markup. Full assembly, every gate passed: 3,837 characters.*

*Gate: baseline.*

> Gender Diary to dziennik tranzycji. Wpis to nastrój, notatka, twoje skale, tagi i
> zdjęcia, a żeby się liczył, wystarczy jedno z tego. Napisz kilka jednego dnia, a
> dzień, który przepadł, dopisz z datą wsteczną.
>
> Aplikacje do notowania nastroju dobrze pasują do codziennego rytuału, tylko nie mają
> gdzie zapisać płci. Gender Diary działa tak samo i dokłada skale, które nazywasz po
> swojemu. Zapisuje to, co jej powiesz, i niczego nie interpretuje.

*Gate: baseline.*

> Twój dziennik, twoje urządzenie
>
> Twój dziennik jest zapisany na twoim urządzeniu. Nie ma konta Gender Diary, nie ma
> serwera z kopią i nic nie synchronizuje się w tle.

*Gate: Journal tickets 09, 10 and 13, exactly as in `en.md`, including the reasoning:
the exclusion list is required wherever the claim is made, and there is no passphrase
sentence because on Android the key sits in the Keystore.*

> Dziennik jest zaszyfrowany tam, gdzie jest zapisany: wpisy, zdjęcia i miniatury,
> razem z plikami roboczymi. Klucz jest losowy i trzyma go dla ciebie Android
> Keystore. Na zewnątrz zostaje kilka ustawień, żeby aplikacja mogła wystartować i dać
> się odblokować: zapakowany klucz i ustawienia, z których się go wyprowadza, motyw,
> paleta i język, stan blokady przy wyjściu i kamuflażu, oraz znaczniki czasu
> spowalniające błędne próby PIN-u. Nic z tego nie jest tym, co piszesz.

*Gate: baseline.*

> Zapisywanie
>
> Nastrój w pięciu stopniach, notatka, tagi, zdjęcia i twoje skale. Pięć skal jest
> wbudowanych, wśród nich Poczucie płci, od dysforii na jednym końcu do euforii na
> drugim. Własne skale ustawiasz od zera i łączysz w zestaw, żeby ekran wpisu pytał
> tylko o to, co mierzysz.

*Gate: baseline, which includes ticket 12's Android photo storage, same as `en.md`.*

> Zdjęcia są trzymane w pamięci samej aplikacji. Nie trafiają do galerii telefonu,
> więc nie wyskoczą komuś, kto przewija zdjęcia.

*Gate: baseline.*

> Wracanie do wpisów
>
> Miesiąc to kalendarz w jednym kolorze o różnej sile, sterowany nastrojem albo
> wybraną skalą. Dni bez wpisu zostają neutralne, bo luka to nie jest zły dzień.
>
> Wyszukiwanie szuka w notatkach i tagach w trakcie pisania, bez oglądania się na
> polskie znaki. Każda skala ma wykres w zakresie od 7 do 365 dni. Kamienie milowe
> odliczają dni do dat przed tobą i wracają co roku do tych za tobą. Wyniki badań
> dostają wykres i nic więcej: bez norm referencyjnych i bez oceniania.

*Gate: baseline.*

> Archiwa i eksport
>
> Eksport pakuje dziennik do jednego archiwum i szyfruje je hasłem, które wybierasz,
> zanim plik opuści aplikację. Import wkłada go z powrotem. Import z Daylio bierze
> plik CSV: zanim cokolwiek zapisze, pokazuje liczby i to, jak przełoży nastroje, a
> zawsze tylko dokłada. Jest też zwykły eksport do CSV albo JSON; taki plik nie jest
> zaszyfrowany i aplikacja każe to potwierdzić.

*Gate: Journal ticket 16.*

> Kopia według harmonogramu sama zapisuje zaszyfrowane archiwum do wybranego folderu,
> co tydzień albo co miesiąc.

*Gate: Journal ticket 14.*

> Przypomnienia
>
> Leki, zastrzyki, wizyty. Jednorazowe albo powtarzalne. Codzienne pytanie przychodzi
> raz dziennie, o porze, którą wybierasz, i pomija dni, w których już coś zapiszesz.

*Gate: Journal tickets 13 and 15, same as `en.md`: the counterweight sentence is
required and the disguise and quick exit wording gets checked against what ticket 15
actually ships before upload.*

> Jeśli musisz uważać
>
> Wszystko w tej sekcji jest wyłączone, dopóki tego nie włączysz. Blokada aplikacji
> stawia PIN przed wejściem: zatrzymuje kogoś z twoim odblokowanym telefonem w ręku i
> nie jest szyfrowaniem tego, co zapisane. Kamuflaż daje aplikacji zwyczajną nazwę i
> ikonę. Szybkie wyjście czyści ekran jednym ruchem i blokuje aplikację, jeśli blokada
> jest włączona.

*Gate: baseline.*

> Wygląd
>
> Osiem palet: transpłciowa, niebinarna, genderfluid, biseksualna, lesbijska,
> panseksualna, agender i tęczowa. Każda przemalowuje całą aplikację, z wykresami i
> kalendarzem, w jasnym i ciemnym motywie. Kolor niczego nie ocenia: nie ma czerwonego
> na zły dzień, a pusty dzień zostaje pusty.
>
> Gender Diary jest po polsku i po angielsku.

*Gate: the Journal repository actually being public, same as `en.md`.*

> Wolne oprogramowanie
>
> Gender Diary jest wolnym oprogramowaniem na licencji GPLv3. Nie musisz mi wierzyć na
> słowo: kod jest publiczny. Zajrzyj albo poproś o to kogoś, komu ufasz. Jeśli ten
> projekt kiedyś stanie, kod może podnieść ktoś inny.

*Gate: baseline. Synthetic-data sentence required by the spec.*

> Wszystkie zrzuty ekranu zrobiono na zmyślonych danych. Nie ma tu niczyjego
> dziennika.
>
> Nie przysyłaj mi swojego dziennika, nawet żeby zgłosić błąd: nigdy o niego nie
> poproszę. Jeśli ktoś prosi, to nie ja.

Bug-reporting instructions live in Play's support fields and on the site, not here,
same as the English file.

---

## Parity with the English listing

The Polish claims exactly what the English claims, block for block, and the gate on a
block is the same in both files. Where the Polish is built differently:

- "Coming from Daylio, import its CSV" addresses the reader with an imperative the
  Polish avoids here: "Import z Daylio bierze plik CSV" keeps the subject on the
  import, so no verb lands on the reader at all.
- The palette names are flag names in ordinary Polish, not the English labels from the
  settings screen, following the call already made in `content/pl/landing.md`.
- "po polsku i po angielsku": Polish leads with Polish in the language line, which the
  English file has no reason to do.

## What is deliberately not in this listing

The same absences as the English file, for the same reasons: the Play-tells-Google
line stays on the site where the channel choice is made, encryption waits for its
gate, HRT and the no-advertising sentence are not in the site's published copy so they
are not here, there are no ratings, awards, endorsements or counts to cite, and the
site sentences that did not survive the 4,000-character worst case (tag editing, tag
insights, the recap, the 30-day Archive notice, the streak) are omitted in both
locales at once.

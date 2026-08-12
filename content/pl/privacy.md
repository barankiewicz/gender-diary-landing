# Landing copy, Polish: the privacy page

Source copy for the Polish privacy page. Written from the claims settled in
`content/en/privacy.md`, not from its sentences.

**Commentary is in English, copy is in Polish.** Everything inside a blockquote is the
copy and it is Polish. Everything outside one is commentary. No placeholder ever sits
inside a blockquote.

**Gate markers.** Same gates as the English file, block for block. A block gated there is
gated here, and the *Encryption at rest* block is replaced by the fallback at the end if
this page publishes before Journal ticket 09 passes its claim gate.

**Claim annotations are not repeated here.** The English file carries the table of what
each claim rests on, and a second copy of it would drift from the first without anybody
noticing. What this file carries instead is a parity table: which Polish block answers
which English block, and where the Polish had to be built differently to say the same
thing. That is the thing a reviewer of this file actually has to check.

**The reader is never assigned a gender.** Present tense, imperative or impersonal
throughout. No slash forms. On this page it matters more than anywhere else on the site,
because the sentences a person is relying on are the ones they have to read without
tripping over being called somebody they are not.

**Four things this page refuses to blur**, in Polish as in English: gdzie jest zapisany
dziennik, co robi blokada aplikacji, co obejmuje szyfrowanie zapisanych danych, i co
chroni hasło do archiwum. Polish makes this slightly easier than English, since „hasło”
takes a qualifier naturally and the three secrets end up named apart without effort.

---

## The page

### Title and opening

*Gate: shipped.*

> **Co Gender Diary chroni, a czego nie chroni**
>
> To jest ta dłuższa odpowiedź. Dłuższa, niż strona o prywatności zwykle bywa, bo krótka
> wersja musiałaby pominąć akurat to, co jest ważne dla kogoś, kto się zastanawia, czy
> powierzyć temu swój dziennik.

### Where your journal is

*Gate: shipped.*

> Twój dziennik jest zapisany na twoim urządzeniu. Nie ma konta Gender Diary, nie ma
> kopii na naszym serwerze, nie ma niczego, co synchronizuje się w tle. Wpis ląduje w
> pamięci urządzenia, na którym powstał, i zostaje tam, dopóki go nie wyeksportujesz albo
> nie usuniesz.
>
> Naszego serwera nie ma, więc nie ma serwera, do którego można się włamać, który można
> zająć nakazem albo sprzedać. Ufasz za to własnemu urządzeniu i każdemu, kto ma do niego
> dostęp.

### App lock

*Gate: shipped. The counterweight sentence is required by ADR-0014 and by the spec
wherever app lock is mentioned. It is not optional wording and does not get softened, in
either language.*

> Blokada aplikacji jest wyłączona, dopóki jej nie włączysz, tak jak każda funkcja w
> Gender Diary, która coś ukrywa. Prowadzenie dziennika o własnym życiu to zwyczajna
> rzecz. Bywają sytuacje, w których i tak jest to niebezpieczne, a czy twoja taka jest,
> wiesz tylko ty.
>
> **Co robi.** Blokada aplikacji stawia PIN przed wejściem, więc ktoś, kto weźmie do ręki
> twój odblokowany telefon, nie przeczyta dziennika, po prostu otwierając aplikację.
>
> **Czym nie jest.** Nie jest szyfrowaniem tego, co zapisane. To bramka w interfejsie, a
> interfejs nie jest jedyną drogą do pliku. Cztery cyfry zatrzymają spojrzenie przez
> ramię. Nie zatrzymają kogoś, kto ma twoje urządzenie, czas i powód.
>
> **Jeśli zapomnisz PIN-u**, jest jedna droga z powrotem: działanie na ekranie blokady,
> które kasuje lokalny dziennik i zaczyna wszystko od nowa. Nie ma odzyskiwania, które
> zachowuje wpisy, bo PIN, który dałoby się odzyskać, niczego by nie chronił. Po błędnych
> próbach kolejna czeka coraz dłużej, a nic nie kasuje dziennika samo po ustalonej
> liczbie prób. Od takiego licznika do zniszczonego dziennika, którego nikt nie kazał
> niszczyć, wystarczy jedno znudzone dziecko albo jedna kłótnia.

### Encryption at rest

*Gate: Journal tickets 09 and 10, and the claim gate itself: a closed-app copy of the
persistent files reveals no protected text, numbers, Reminder titles, photos or
thumbnails without the unlock secret. Until that test passes this whole block is
unpublishable in both languages and the fallback at the end replaces it.*

> **Co obejmuje.** Twój dziennik tam, gdzie jest zapisany, pliki robocze leżące obok
> niego, kopię robioną przed aktualizacją, zanim cokolwiek zmieni, oraz zdjęcia i ich
> miniatury.
>
> Zdjęcia są plikami, a nie wierszami w bazie, więc szyfrowanie bazy nigdy do nich nie
> sięga. Każde jest szyfrowane osobno, tym samym kluczem. Import przechodzi przez pamięć
> i nie ląduje w pliku tymczasowym, więc po wszystkim nie zostaje na dysku wpół
> zaimportowana czyjaś historia.
>
> **Czego nie obejmuje, po nazwie, bez zaokrąglania.** Kilka rzeczy zostaje na zewnątrz,
> bo aplikacja musi się uruchomić i pozwolić ci ją odblokować: zapakowany klucz i
> ustawienia, z których się go wyprowadza, motyw, paleta i język, informacja o tym, czy
> blokada przy wyjściu i kamuflaż są włączone, oraz znaczniki czasu, przez które każda
> kolejna błędna próba PIN-u czeka dłużej. Nic z tego nie jest tym, co piszesz w
> dzienniku. Kto przeczyta tę część profilu przeglądarki, dowie się, jakie kolory
> wybierasz i czy kamuflaż jest włączony, a o żadnym wpisie nie dowie się niczego.
>
> **W przeglądarce** wybierasz hasło do dziennika. Ono samo dziennika nie szyfruje.
> Odblokowuje losowy klucz, który to robi, i dlatego hasło da się później zmienić bez
> ponownego szyfrowania kilku lat wpisów. Po zakończeniu sesji przeglądarki hasło jest
> potrzebne znowu. Obok danych nie zostaje żaden klucz, którym dałoby się je otworzyć.

*The next block needs a second gate: Journal tickets 11 and 13. Android sentences are
gated separately from encryption, because there is no Android project until ticket 11,
and the marketing context flags this as the easiest claim on the site to publish by
accident.*

> **Na Androidzie** ten sam losowy klucz trzyma Android Keystore, a nie hasło, które
> wpisujesz.

*Back to Journal tickets 09 and 10.*

> **Hasła do dziennika nie da się odzyskać.** Ani tobie, ani nam. Nie ma resetu, który
> zachowuje wpisy, nie ma maila odzyskiwania i żadne zgłoszenie do nas w tym nie pomoże,
> bo cokolwiek wpuszczałoby nas z powrotem, znaczyłoby, że szyfrowanie nigdy nie robiło
> tego, co ta strona o nim mówi. Wpisz je do menedżera haseł, zanim zapiszesz w
> dzienniku cokolwiek, czego szkoda by ci było. Aplikacja mówi to samo przy konfiguracji,
> ale to czytasz wcześniej i po to jest tutaj.

### Archives

*Gate: shipped, ADR-0007.*

> Eksport pakuje dziennik do jednego pliku archiwum i szyfruje go hasłem, które
> wybierasz, zanim plik gdziekolwiek trafi. To hasło nie jest twoim PIN-em ani hasłem do
> dziennika. Chroni ten jeden plik.
>
> **Co archiwum zdradza.** Pierwsze sześć bajtów pliku to otwartym tekstem GDIARY, dalej
> wersja formatu i ustawienia, z których powstaje klucz z twojego hasła. Ta część musi
> być czytelna bez hasła, żeby plik z nowszej wersji mógł to powiedzieć, zamiast
> odszyfrować się w bełkot. Wszystko z dziennika jest za hasłem. Kto znajdzie ten plik,
> dowie się, że masz archiwum Gender Diary, i niczego o tym, co w nim jest.
>
> **Jeśli zgubisz hasło do archiwum**, tego pliku już się nie odczyta. Innych archiwów,
> zrobionych z innymi hasłami, to nie dotyczy.

### What the web host can see

*Gate: shipped. Required by the spec: hosted web copy separates app-shell and update
traffic from journal-data traffic, and "the app makes no network requests" never appears
here unqualified, in either language.*

> Kiedy otwierasz aplikację w przeglądarce, prosisz o nią serwer WWW, a ten widzi adres
> IP, mniej więcej porę zapytania i to, że aplikacja została pobrana. Sprawdzenie, czy
> jest nowa wersja, to takie samo zapytanie. Tak działa każda strona, którą otwierasz, i
> ta też.
>
> Serwer WWW nie dostaje twojego dziennika. Wpisy, zdjęcia, notatki i wyniki badań
> nigdzie do niego nie idą, bo nie ma dokąd.
>
> Dlatego nie przeczytasz na tej stronie, że „Gender Diary nie wysyła żadnych zapytań
> sieciowych”. Pobranie aplikacji jest zapytaniem sieciowym. Wyjście twojego dziennika na
> zewnątrz jest czymś innym. To dwa różne zdania i czytelnik ma prawo dostać je osobno.

*Gate: Journal tickets 11 and 18. This is an Android sentence, so ticket 11 gates it
before Play availability does, and it may not ride along inside the shipped block above.
Ticket 06 owns the channel list itself; this is the privacy consequence of a channel, not
an offer of one.*

> Instalacja z Google Play znaczy, że Google zapisuje u siebie, że twoje konto
> zainstalowało tę aplikację. Dzieje się to po stronie Google, nie naszej, i żadne
> ustawienie w Gender Diary tego nie zmienia.

### What none of this protects against

*Gate: shipped. Spec, at-rest encryption: the guarantee excludes memory inspection, a
compromised operating system and an already unlocked app.*

> Jeśli ktoś już panuje nad twoim urządzeniem, to nie te mechanizmy stoją między nim a
> twoim dziennikiem. Odblokowany telefon w cudzych rękach, przejęty system operacyjny
> albo otwarta aplikacja na ekranie leżą poza tym, co szyfrowanie zapisanych danych umie
> zrobić. Gender Diary nie twierdzi inaczej, a wobec czegokolwiek, co twierdzi inaczej,
> warto zachować podejrzliwość.

### The policy itself

*Gate: Journal ticket 21, which writes the privacy policy and fixes the security contact.
This site presents them and may not run ahead of them. No copy here yet: this paragraph
is the handoff, not the text. The policy will need its own Polish, written the same way
as this file rather than translated from the English one.*

---

## Parity with the English page

Acceptance requires the Polish to claim exactly what the English claims, nothing stronger
and nothing weaker. This table is the check. Evidence for each claim stays in
`content/en/privacy.md`, which is the single annotated copy.

| English block | Polish block | Same claim? |
|---|---|---|
| Title and opening | Tytuł i wstęp | Yes. „Powierzyć temu swój dziennik” for "trust this with their journal" |
| Where your journal is | Gdzie jest twój dziennik | Yes. "breached, subpoenaed or sold" keeps all three, as three genuinely different things, not a rhetorical triple |
| App lock is off until you turn it on | Blokada aplikacji jest wyłączona, dopóki jej nie włączysz | Yes, and scoped the same way. „Każda funkcja, która coś ukrywa” keeps the sentence off encryption at rest and off Archive passwords, neither of which is opt-in. The English claim table guards exactly this reading |
| App lock, what it does | Co robi | Yes |
| App lock, what it is not | Czym nie jest | Yes. „Nie jest szyfrowaniem tego, co zapisane” is as flat a denial as the English, and „bramka w interfejsie” keeps the gate metaphor that carries the reason |
| Forgotten PIN | Jeśli zapomnisz PIN-u | Yes. „Nie ma odzyskiwania, które zachowuje wpisy” is final in the same way |
| What encryption covers | Co obejmuje | Yes, item for item: journal, working files, pre-upgrade copy, photos, thumbnails |
| Photos and imports | Zdjęcia, import | Yes |
| Named exclusions | Czego nie obejmuje | Yes, item for item, in the same order |
| Web passphrase wraps a key | W przeglądarce | Yes. „Ono samo dziennika nie szyfruje” keeps the distinction the whole paragraph exists for |
| Android Keystore | Na Androidzie | Yes. Separately gated in both |
| Passphrase cannot be recovered | Hasła do dziennika nie da się odzyskać | Yes. „Nie da się” is impersonal and absolute; „nie można” would have been the weaker reading, closer to "may not" |
| Archive password is separate | To hasło nie jest twoim PIN-em ani hasłem do dziennika | Yes. Three secrets, three names, none of them „hasło główne” |
| Archive header | Co archiwum zdradza | Yes, including the six bytes and what a finder learns |
| Lost Archive password | Jeśli zgubisz hasło do archiwum | Yes |
| What the host sees | Co widzi serwer WWW | Yes, including that this is true of every site. English has two nouns, *server* and *web host*; Polish needs two too, or the page denies having a server and then describes one |
| No unqualified "no network requests" | Cytat w cudzysłowie, tak samo odrzucony | Yes. Quoted and rejected, never asserted |
| Play install is visible to Google | Instalacja z Google Play | Yes. Separately gated in both |
| Out of scope: memory, compromised OS, unlocked app | Czego to nie chroni | Yes, all three named |
| Fallback: not encrypted at rest yet | Fallback: dziennik nie jest jeszcze szyfrowany | Yes. „Kto skopiuje pliki z twojego urządzenia, przeczyta, co w nich jest” concedes as much as the English does, which is the whole point of the fallback |

Where the Polish is built differently to say the same thing:

- English addresses the reader in the past tense in several places ("a day you missed",
  "anything you wrote"). Polish would pick a gender doing that, so those become present
  tense: „co piszesz”, „zanim zapiszesz”.
- „warto zachować podejrzliwość” rather than „warto być podejrzliwym”, because the
  adjective would have been masculine.
- „Jeśli coś nie działa” on the landing page replaces "say what you did", same reason.
- The English "gate in the interface" survives as „bramka w interfejsie”. The alternative
  Polish idiom, „furtka”, suggests a way in rather than a way blocked, which is the
  opposite of the sentence.

## Terms decided here

Eight terms had to be coined, nearly all of them Phase 2 vocabulary the shipped app has
no Polish for. The table, with the reasoning for each, is in
`.agents/product-marketing.md`, the file every later content ticket reads. It is
deliberately not repeated here, for the same reason this page gives for not repeating the
claim table.

One of the eight is not a clean coinage. „Archiwum” is the file, and the app already
ships „kopia zapasowa” on the stale-backup banner. The glossary keeps those apart on
purpose, Archive being the file and Backup the habit, and `content/en/landing.md` already
writes "Archive" where the app's own banner says "backup". The Polish inherits that
deviation rather than inventing it.

## Fallback wording, if this page publishes before the encryption gate

Same rule as the English file, and the two must be swapped together. If the site goes
live while Journal ticket 09 is unfinished, the *Encryption at rest* block does not
appear at all, and this replaces it. The rest of the page stands unchanged.

*Gate: shipped, and correct only while at-rest encryption has not passed its gate.*

> **Dziennik nie jest jeszcze szyfrowany tam, gdzie jest zapisany.** Blokada aplikacji
> ogranicza dostęp przez aplikację. Nie jest szyfrowaniem bazy, a kto skopiuje pliki z
> twojego urządzenia, przeczyta, co w nich jest. Szyfrowanie zapisanego dziennika
> powstaje i ta strona to napisze, wymieni, co obejmuje, i wymieni, czego nie obejmuje,
> kiedy test pokaże, że kopia zamkniętych plików niczego nie oddaje.

The same two checks as in English. The *App lock* block already says it is not
encryption, and keeps saying it in both states. And the passphrase that cannot be
recovered belongs only to the encrypted state, since before that gate there is no
„hasło do dziennika” to lose.

## Notes for later tickets

Ticket 07 owns this page's Polish title, description and canonical URL. Written as
Polish, not as a translated title tag. The only claims available to mark up are the ones
marked shipped here, which excludes encryption at rest until its gate passes.

Ticket 09 gets the longest Polish on the site here. „Czego nie obejmuje” is one sentence
with seven items in it, and it will be the paragraph that finds a layout's limits.

A Polish speaker still has to read the security, privacy and recovery wording before
release. That box on ticket 05 is a human one and stays unchecked until somebody actually
reads it.

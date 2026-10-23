# AutoLovac Oglasnik — specifikacija projekta

Besplatan oglasnik za prodaju automobila u Srbiji, povezan sa aplikacijom AutoLovac (autolovac.rs, app.autolovac.rs). Sav korisnički tekst na srpskom, ekavica, latinica.

## Cilj
- Besplatno objavljivanje oglasa u periodu lansiranja (javno formulisati kao "besplatno u periodu lansiranja", bez roka).
- Razlikovanje od velikih portala: oznaka "AutoLovac provereno" za oglase sa priloženim izveštajem o pregledu.
- Troškovi blizu nule: automatska kompresija slika, istek oglasa, zaštita od spama.

## Tehnologija (potvrditi pre početka)
- Frontend: Astro (odluka doneta, ne menjati). Režim "server" sa Cloudflare adapterom za dinamične strane (lista, oglas, Moji oglasi, admin). Interaktivni delovi (forma za oglas, filteri, galerija) kao React ili Preact "island" komponente. Strane po marki i modelu za SEO generisati iz `baza.json`.
- Baza, prijava, skladište slika: Supabase (ili Postgres na VPS-u uz Cloudflare R2 za slike).
- Hosting: Cloudflare Pages (uz Astro Cloudflare adapter) ili mali VPS. NE koristiti planove koji zabranjuju komercijalnu upotrebu (npr. Vercel Hobby).
- Prijava: email sa potvrdom (SMS verifikacija se naplaćuje po poruci, dodaje se kasnije ako spam to zahteva).
- Marke i modeli: uvoziti iz `baza.json` iz AutoLovac projekta (28+ marki, 237+ generacija).

## Ekrani
1. Početna: pretraga (marka, model, cena, godište, gorivo, grad) + najnoviji oglasi.
2. Lista rezultata: kartice (slika, cena, godište, km, grad), filteri, sortiranje.
3. Stranica oglasa: galerija, specifikacije, opis, dugme "Pozovi" i "Poruka", oznaka "AutoLovac provereno", link ka aplikaciji ("Proveri ovaj auto sa AutoLovac-om"), dugme "Prijavi oglas".
4. Postavljanje oglasa: forma u koracima (podaci, slike, opis, kontakt), do 8-10 slika, kompresija u pregledaču pre uploada, mogućnost priloga AutoLovac izveštaja (PDF ili link).
5. Moji oglasi: izmena, obnova, "prodato", brisanje.
6. Prijava / registracija.
7. Admin: pregled novih i prijavljenih oglasa, brisanje, blokiranje korisnika.

## Dizajn (iz prototipa)
- Stil: tamno zaglavlje i žuti akcenat, svetla površina za sadržaj, krupne fotografije vozila, mnogo belog prostora. Vizuelni uzori su slike u folderu `referenca/`.
- Boje, definisati kao CSS promenljive na jednom mestu: tamna #10151C, akcent #F7B500, pozadina #F4F5F7, kartica #FFFFFF, tekst #1B1F27, sekundarni tekst #5B6472, ivica #E3E7EE, provereno #1F7A45 (samo za "AutoLovac provereno"), greška #B3261E.
- Font: Inter (400 do 800), osnovni tekst najmanje 16px. Zaobljeni uglovi 10 do 18px, žuto dugme sa tamnim tekstom.
- Početna po redu: tanka top traka, zaglavlje, hero sa pretragom koja se preklapa sa njim, izbor po karoseriji, izbor po marki (tekstualna dugmad, bez logotipa proizvođača), dva banera (za prodavce i za kupce), najnoviji oglasi, "Kako to radi", saveti za bezbednu kupovinu, AutoLovac blok, footer.
- Pretraga: tabovi uz panel (Svi oglasi, Provereni, Hibridni i električni), a dugme prikazuje broj oglasa koji odgovaraju filterima (npr. "Prikaži 32 oglasa"). Taj broj dolazi iz baze, nikad izmišljen. Akcent ostaje žut; zelena je rezervisana samo za oznaku "AutoLovac provereno".
- Prvo telefon: pretraga na vrhu, kartice u jednoj koloni, fiksirano dugme "Pozovi" na dnu stranice oglasa.
- Pristupačnost: kontrast teksta najmanje 4.5:1, prava dugmad i linkovi, labele uz svako polje.
- Sadržaj: bez izmišljenih utisaka kupaca i bez izmišljenih brojača. Fotografije moraju biti sopstvene ili sa licencom, nikad preuzete sa tuđih sajtova.

## Referenca
- `referenca/` služi samo kao vizuelna inspiracija (raspored i ideje).
- HTML fajl Motors teme je komercijalna tema: NE kopirati njegov kod, CSS, JS, slike ni tekstove u projekat. Sve komponente napisati ispočetka.

## Baza (4 tabele)
- korisnici: id, email, verifikovan, datum_registracije, blokiran
- oglasi: id, korisnik_id, marka, model, godiste, km, gorivo, menjac, cena, grad, opis, status (aktivan/prodat/uklonjen/na_cekanju), proveren (bool), izvestaj_url, ističe_datum, datum_kreiranja
- slike: id, oglas_id, putanja, redosled
- prijave: id, oglas_id, razlog, datum

## Povezivanje sa AutoLovac aplikacijom (prenos podataka iz oglasa)
Na stranici oglasa dugme "Proveri ovaj auto" otvara AutoLovac aplikaciju sa podacima o vozilu u adresi, tako da se pregled odmah popuni:
`https://app.autolovac.rs/?marka=Volkswagen&model=Golf%207&godiste=2015&km=142000&gorivo=Dizel&menjac=Manuelni&cena=7450&oglas=000000&izvor=nadjiauto`
- Parametri: marka, model, godiste, km, gorivo, menjac, cena (EUR), oglas (id oglasa), izvor=nadjiauto.
- Sastaviti ih iz podataka oglasa uz `encodeURIComponent`. U adresu NE stavljati lične podatke prodavca (telefon, email, ime).
- Strana AutoLovac aplikacije (`index.html`): pri učitavanju pročitati `URLSearchParams`, očistiti i validirati vrednosti (marka i model moraju da postoje u `baza.json`, brojevi unutar razumnog opsega, ostalo ignorisati) i popuniti polja novog pregleda. Vrednosti ubaciti kao tekst, nikad kao HTML.
- Obrnuto (kasnije): posle pregleda u aplikaciji, dugme "Objavi oglas sa ovim izveštajem" vodi na formu za oglas sa istim podacima i prilogom izveštaja.

## Pravila i zaštita (obavezno od prvog dana)
- Limit: 3 aktivna oglasa po korisniku.
- Oglas ističe posle 30 dana, uz opciju obnove.
- Prvi oglas novog korisnika prolazi ručnu proveru pre objave.
- Rate limiting na prijavu i postavljanje oglasa.
- Upload: samo slike (jpg/png/webp), maksimalna veličina po slici, kompresija obavezna.
- Row Level Security: korisnik može da čita sve aktivne oglase, ali da menja/briše samo svoje. Admin ima poseban pristup.
- Pre javnog lansiranja: politika privatnosti i uslovi korišćenja (pravnu proveru obaviti sa stručnim licem).

## Van obima prve verzije
Plaćanje, chat unutar sajta, mobilna aplikacija, profili dilera/firmi, uvoz oglasa sa drugih sajtova (krši njihove uslove), više jezika.

## Redosled rada (faze)
Za svaku fazu: prvo napiši plan i sačekaj odobrenje, zatim kodiraj, zatim testiraj, zatim commit.
0. Postavljanje Astro projekta (server režim, Cloudflare adapter, Supabase klijent, struktura foldera)
1. Baza i prijava
2. Postavljanje oglasa i slike (sa kompresijom)
3. Lista i pretraga
4. Stranica oglasa
5. Admin panel
6. Veza sa AutoLovac izveštajem i oznaka "provereno"
7. SEO strane po marki i modelu (npr. /polovni/volkswagen-golf), sitemap, meta tagovi

## Pravila rada za Claude Code
- Ne dodavati funkcije van obima bez pitanja.
- Ne kopirati kod ili materijal komercijalnih tema iz `referenca/`.
- Ne menjati tehnologiju usred projekta.
- Svaku tabelu odmah zaštititi RLS pravilima.
- Tajne (ključevi) samo u env promenljivama, nikad u kodu.
- Pitanja postavljati običnim tekstom.

# Guardian Of GaYa: The SISU Protocols

### Tämä 2D-peli ja siitä kertova verkkosivu on toteutettu HTML:n, CSS:n ja JavaScriptin Canvas API:n avulla. Kyseessä on tieto- ja viestintätekniikan ohjelmointi-tutkinnonosan NÄYTTÖ, jonka  ROSVALL Satu ja ROUISSI Yahya ovat tehneet ryhmätyönä.

[Kokeile täältä](https://saturosvall.github.io/GoG-Sisu-Protocols/)

## Sisällysluettelo

- [Verkkosivun kuvaus](#verkkosivun-kuvaus)
- [Pelin kuvaus](#pelin-kuvaus)
- [Kuinka Pelata](#kuinka-pelata)
- [Pelin ominaisuudet](#pelin-ominaisuudet)
- [Asennus](#asennus)
- [Käyttö](#käyttö)
- [Osallistuminen](#osallistuminen)
- [Kiitokset](#kiitokset)
- [Lisenssi](#lisenssi)
- [Tekijät](#tekijät)

## Verkkosivun kuvaus

Pelin verkkosivu on xxx tekniikalla toteutettu. Verkkosivun avulla pelaaja pääsee tutustumaan pelin taustalla olevaan tarinaan ja katsomaan videopätkiä pelistä. Verkkosivulla pelaaja voi tutustua minkälaisia vihollisia pelissä tulee kohtaamaan ja minkälaisissa erilaisissa galakseissa pelaaja pääsee planeettoja suojelemaan.

## Pelin kuvaus

GoG: The SISU Protocols on viisi eri vaikeustasoa sisältävä peli, jossa pelaajan tehtävänä on suojella kunkin tason planeettaa ulkoavaruudesta tulevilta hyökkäyksiltä. Muukalaislajit himoitsevat planeetan fotoneja, jotka ovat planeetan suojakilven elinehto. 

Fotonien kerääminen: Pelaajan tulee kerätä riittävä määrä fotoneja **tuhoamalla vihollisia** ja **keräämällä väisteleviä hahmoja**.  Jokaisella hyökkääjällä on oma arvo, joten vihollisen tuhoaminen tai hahmon kerääminen kerryttää pelaajalle fotoneja. Fotonimäärä riippuu vihollisen laadusta. 

Fotonien menettäminen: fotoneja menettää jos vihollinen ehtii osua planeettaan tai SISUUN.

Tason vaatima fotonimäärä on kerättävä ennen kuin suojausprosentti saavuttaa nollan tai SISU menettää elämät. Jos vaadittavan fotonimäärän saavuttaa, planeetan suojakilpi aktivoituu ja planeetta on turvassa. Tällöin pelaaja pääsee siirtymään seuraavalle tasolle.

Peli loppuu jos suojausprosentti on nolla ennen riittävän fotonimäärän saavuttamista tai jos SISU menettää elämät. SISU menettää elämän jos vihollinen osuu siihen.

## Kuinka Pelata

Pääset peliin verkkosivun kautta.
Pelin vasemmassa reunassa ovat painikkeet kosketusnäyttölaitteella pelaamista varten. Suluissa vastaava näppäinkomento tietokoneella pelaamista varten:
- Fullscreen-painike (F)
- Restart-painike (R)
- Help-painike (H)
- Taukopainike (P)
- Aktivointipainike (A)


Estä vihollisia osumasta planeettaan ja SISUUN joko keräämällä tai tuhoamalla vihollinen.
#### **Tietokoneella pelatessa** 

Hiiren vasemmalla näppäimellä tarvittava määrä painalluksia hyökkääjään osuen. 
Näppäimistön A-näppäimellä vaihdetaan painalluksen toiminto (punainen tuhoaa ja sininen kerää).

#### **Kosketusnäyttölaitteella pelatessa** 
Sormella/kosketusnäyttökynällä tarvittava määrä painalluksia hyökkääjään osuen. Pelin vasemmassa reunassa aktivointipainike, josta vaihdetaan painalluksen toiminto (punainen tuhoaa ja sininen kerää).
Pelissä on viisi tasoa, joissa jokaisessa on uusia vihollisia ja erilainen planeetan suojaava fotonimäärätavoite.
Verkkosivulla on esitelty tasot ja niiden toimintaympäristöt sekä viholliset tarkemmin.

## Pelin ominaisuudet

- Peli on pelattavissa tietokoneella ja kosketusnäyttötabletilla
- UI, jossa näkyy kerätyt fotonit ja suojakilven prosenttiosuus 
- Animoitu SISU, jonka silmä seuraa pelaajan toimintaa pelialustalla
- Animoidut viholliset
- Animoitu vihollisten tuhoaminen/kerääminen äänitehosteilla
- Pysäytysvalikko sekä tasojen välissä ilmestyvät info-valikot

## Asennus

Asennusta ei tarvita. Avaa verkkosivu nykyaikaisella verkkoselaimella [täältä](https://saturosvall.github.io/GoG-Sisu-Protocols/) ja klikkaa "Play".

## Käyttö

Kloonaa arkisto ja avaa tiedosto `index.html` selaimellasi tutustuaksesi verkkosivuun ja peliin. Voit muokata peliä muokkaamalla HTML-, CSS- ja JavaScript-tiedostoja tarpeen mukaan.

## Osallistuminen

Jos haluat osallistua projektiin, voit vapaasti haarukoida arkiston ja lähettää pull requestin. Avustukset, vikailmoitukset ja palaute ovat tervetulleita!

## Kiitokset

- Etelä-Savon ammattiopisto
- Franks laboratorion Youtube-kanava
- Chris Coursesin Youtube-kanava
- Flaticon
- DragonBones
- Canvas Bootcampin Youtube-kanava
- Spicy Youghurt vinkkejä ja niksejä canvas-animaatiosta
- W3Schools
- MDN Asiakirjat
- HoanghoDev of LunDev
- Pixabay
- PngWing.com
- Optimizilla
- imageresizer.com
- Canva
- 123apps
- mp3cut.net

### Kolmannen osapuolen kirjastot

Tämä projekti EI käytä mitään kolmannen osapuolen kirjastoja tai työkaluja.

Pelin ja verkkosivun kuvamateriaali (mm. taustakuvat ja planeettakuvat) on luotu käyttämällä DALL-E 3 AI:ta Microsoft Bingin Image Creator -ohjelmaa. Näyttö-projektin tekijät ovat muokanneet ja mukauttaneet kuvamateriaalin tähän projektiin.

Pelin hahmot ovat lisenssivapaita kuvakkeita, jotka on tehnyt Smashicons ja jotka on ladattu FLATICON-sivustolta.
Silly, Sad ja Happy sprite-arkit on mukautettu ja suunniteltu sprite-arkkeina ROSVALL Satu.
GoG-favicon ja GoG-Logo on mukautettu ja muokattu ROSVALL Sadun toimesta.

- disappear1: 'quaivat-Sound Effect' Pixabaysta
- disappear2: 'lasergun-Sound Effect' Pixabaysta
- disappear3: 'space-insect-Sound Effect' Pixabaysta
- monster-roar-6985: Pixabaysta

Tekijät suunnittelivat yhdessä Canvan avulla Helpmenu-, levelinfo- ja Gameover-kuvat sekä pelin tarinavideon (music by Two Steps From Hell, title: Protectors Of The Earth).

Myös muut kuvat ja äänet ovat avoimen lähdekoodin tuotteita, joiden suunnittelussa ja mukauttamisessa on tehty yhteistyötä.

## Lisenssi

Tämä projekti on lisensoitu [MIT License](LISENSSI).

Ellei toisin mainita, tämän arkiston koodi on toimitettu MIT-lisenssin ehdoilla.

## Tekijät

- [Yahya Rouissi](https://github.com/Yaro101)
- [Satu Rosvall](https://github.com/saturosvall)

&copy; 2024 Yahya Rouissi & Satu Rosvall #664 Ohjelmointi-tutkinnonosan NÄYTTÖ
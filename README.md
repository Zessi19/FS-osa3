# Osa 3

* Heroku: https://fs-osa3-backend.herokuapp.com/
* Frontend: https://github.com/Zessi19/Fulllllstack-Open-2019/tree/master/osa3

Tämän viikon tehtävä (Puhelinluettelo Backend) on eriytetty omaksi repositoriokseen, kuten materiaalissa neuvottiin. Tämä kansa sisältää siis kaiken backendiin ja tietokantaa liittyvän koodin, sekä frontendistä muodostetun build -hakemiston. Linkki itse frontendiin yllä (piti laittaa eri kansioon, koska tämän kansion sisään laitettuna aiheutti erroria, jota en osannut ratkaista).

Tein kaikki viikon tehtävät ja backendin pitäisi toimia materiaalissa kuvatulla tavalla. Muutama huomio:
* /info pathi muutettu /api/info (ymmärsin tämän olevan backend toiminnallisuutta)
* Front- ja Backendin nimien vertailut ovat Case Insensitive:jä, Backendissä toteutettu uniqueCaseInsensitive: true validaattorilla
* Eslint korjauksissa jätetty muutama korjaamatta, koska ne eivät mielestäni edistäneet luettavuutta. Kuitenkin kokonaisuudesssaan lähes kaikki Eslintin korjausehdotukset on tehty.
* Validation errorit tarkastetaan/näytetään uuden contactin lisäämisen lisäksi myös contactin puhelinnumeron muutoksen yhteydessä. Myös Osan 2 virheilmoitus tapauksessa, jossa contacti on keretty muutoksen aikana poistaa toisessa selaimessa on säilytetty. Tapaukset on eritelty if-else lauseella (ks. Frontend: App.js, lines 78-91)

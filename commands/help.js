const { MessageEmbed } = require("discord.js")

module.exports = {
    slash: 'both',
    category: 'RPG',
    //testOnly: true,
    description: 'Jak rzucać kostką',
    callback: () => {
        const embed = new MessageEmbed()
            .setTitle('Pomoc')
            .setDescription(`Jak używać bota`)
            .addField('jak wywołać rzut kostką (/roll /r)',
                `Są trzy metody:
                **/roll** - z użyciem menu discorda, 
**/roll** i **/r** - bez użycia menu discorda. 
Oprócz tego należy podać po spacji lub jako argument w przypadku menu discorda rodzaj rzutu.`)
            .addField('Zwykły rzut (3d20)',
                `rzucić kostką wystarczy podać jako argument rodzaj kostki np. d20 
jeżeli chcesz rzucić więcej niż jedną kostkę przed symbolem kości podaj ich liczbę np. 3d6`)
            .addField('Działania matematyczne (3d6+3)',
                `do wyników rzutu można dodawać, odejmować, mnożyć, dzielić, potęgować, pierwiastkować, a także zostawiać resztę z dzielenia.
+, -, \\*, / - odpowiadają za dodawanie, odejmowanie, mnożenie, dzielenie.
\\*\\*, ^ - za potęgowanie (ułamek odpowiada za pierwiastkowanie)
% = pozostawia resztę z dzielenia np. 3%2 = 1, 20%3 = 2
działania także można wykonać na wynikach rzutu np. d4*d6`)
            .addField('Niestandardowe kostki (d% dF)',
                `Oprócz standardowych kostek, można używać także:
**d%** - kostka procentowa (odpowiednik d100), daje wyniki od 1 do 100
**dF, dF.2** - kostka Fudge, daje wyniki -, blank, +. Reprezentowane przez -1, 0, +1. Fizycznie jest to kostka d6, gdzie każda wartość znajduje się na dwóch ściankach.
Poza podstawową wersją dF jest także wersja **Df.1**, daje podobne wyniki, ale jest odpowiednikiem kostki d6, gdzie 4 ścianki są 0 i po jednej ściance na wartość -1 i +1`)
            .addField('Wartość minimalna i maksymalna (d20min5, d20max16)',
                `modyfikator **min** - Po modyfikatorze należy podać liczbę. Podana liczba będzie zastępować wylosowaną wartość, jeżeli ta okaże się niższa.
modyfikator **max** - Analogicznie do modyfikatora min z tym, że ten zastępuje wartość gdy wylosowana liczba okaże się wyższa.`)
            .addField('Zachowaj najwyższy/najniższy rzut (2d20k1, 2d20kl1)',
                `**kh**, **k** - Po podanym argumencie należy podać liczbę wyników, które chcemy zachować. Zostaje zachowana podana liczba najwyższych wyników.
**kl** - analogicznie, do powyższej instrukcji, ale zostaje zachowana podana ilość najniższych wyników.`)
            .addField('Odrzuć najwyższy/najniższy rzut (2d20d1, 2d20dh1)',
                `Działanie podobne jak w przadku modyfikatorów k,kh,kl.
                **d**, **dl** - Odrzuć podaną liczbę najniższych wyników.
                **dh** - Odrzuć podaną liczbę najwyższych wyników.`)
            .addField('Powtórz rzut (4d6k3 6)',
                `Powtórzenie rzutu wykonuje się podając drugi argument, musi być to liczba z przedziału od 1 do 20. 
Rzut zostanie powtórzony określoną w tym argumencie ilość razy, a następnie wszystkie wyniki zostaną zsumowane.`)
            .addField('Przrzuć kostkę (2d6r, 2d6ro)',
                `Modyfikator **r** - przerzuca kostkę na najniższym wyniku, dopóki nie wypadnie inny wynik.
Modyfikator **ro** - przerzuca kostkę na najniższym wyniku, ale tylko raz.
Zmiana działania - Można zmodyfikować liczbę, która ma być przerzucana np. 2d6r=3 będzie przerzucać wynik, gdy ten będzie równy 3.
2d6r<3 będzie przerzucać wynik mniejszy niż 3. (dozwolone operatory >, <, >=, <=, !=, =)`)
        return embed
    },
}
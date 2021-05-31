const { MessageEmbed } = require('discord.js')

module.exports = {
  description: 'Jak rzucać kostką?',
  callback: ({ message, args }) => {
    const embed = new MessageEmbed()
    if (args[0] === '+') {
      embed.setTitle('Dodatkowe komendy').addField('Dodaj rzut zdefiniowany (/newroll | /nr)', `Rzut zdefinowany tworzymy wywołując komendę "/newroll".
Jako pierwszy argument należy podać nazwę rzutu(musi to być jedno słowo).
Kolejne argumenty to notacja rzutu, która powinna być zgodna ze składnią, rzutów używanych przy pomocy /roll np. 4d6.
Dodatkowo można w ten sposób tworzyć rzuty wielokrotne, a także nadać im nazwę np. /newroll dnd5e 4d6d1 6 random character
Podany przykład utworzy rzut zdefiniowany, który po wywołaniu wykona 6 krotnie rzut 4-ema kostkami 6-cio ściennymi, z których odrzucona będzie najniższa.
Rzut ten będzie miał w tytule nazwę "random character".
Ograniczenia: 
-komenda dostępna tylko dla administratorów
-limit zdefiniowanych rzutów to 20 na serwer`)
        .addField('Używanie zdefiniowanego rzutu.', `
Rzutu zdefiniowanego używa się poprzez komendę /roll i jako pierwszy argument podajemny nazwę rzutu, poprzedzoną znakiem "#" np. #zdefiniowanyrzut`)
        .addField('Listowanie dostępnych zdefiniowanych rzutów. (/listroll | /lr)', `
Listowanie rzutów wywołuje się komendą /listroll`)
        .addField('Usuwanie zdefiniowanego rzutu (/deleteroll | /dr)', `
Usunięcie zdefiniowanego rzutu odbywa się przez wywołanie komendy /deleteroll z argumentem odpowiadającym nazwie jednego z dostępnych rzutów.
Komenda dostępna tylko dla administratorów.`)
    } else {
      embed.setTitle('Pomoc')
        .setDescription('Jak używać bota')
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
        .addField('Nazywanie rzutu (d20 rzut na inteligencje)',
                              `/r d20 rzut na inteligencje - Taki zapis sprawi, że w tytule rzutu wyświetli się napis "rzut na inteligencje".
**Uwaga!** - pierwszym słowem nie może być liczba, ponieważ spowoduje to wykonanie rzutu powtórzonego.
Nazywanie rzutów można stosować, również z rzutami powtórzonymi np. /r 4d6k3 6 rzut na statystyki postaci D&D5e
Podany rzut spowoduje rzucenie sześć razy czterema kostkami sześciościennymi, z pośród których wybierane będą 3 z najwyższym wynikiem i 
będzie miał tytuł "rzut na statystyki postaci D&D5e"`)
        .addField('Liczenie sukcesów (10d6>4)',
                              `/r 10d6>4 - Taki zapis spowoduje, że wynikiem będzie liczba sukcesów. 
Każda kostka na której będzie wynik większy niż 4, będzie liczona jako pojedyńczy sukces.
Operatory dozwolone do określania sukcesu (<,>,>=,<=,=)
**Uwaga!** Operator niedozwolony !=, nie można go użyć ponieważ spowoduje on dorzucenie dodatkowej kostki przy wyniku równemu liczbie po znaku równości.
Więcej na ten temat w **Wybuchające kostki**`)
        .addField('Wybuchające kostki (10d6!)',
                              `Wybuchające kostki sprawiają, że jeżeli wyrzucisz maksymalny wynik zostanie dorzucona dodatkowa kostka tego samego typu.
(jeżeli na dorzuconej kostkce wypadnie po raz kolejny maksymalny wynik, zostanie dorzucona następna.)
Można zmienić zasadę dotyczącą najwyższego wyniku, wystarczy dodać operator =,>,<,<=,>= i podać liczbę.
**Uwaga** - nie można użyć operatora !=, zapis ten spowoduje sumowanie wybuchających kostek w jednym rzucie.
Więcej informacji w **Sumowanie wybuchąjących kostek**.`)
        .addField('Sumowanie wybuchających kostek (10d6!!)',
                              `/r 10d6!! - Taki zapis spowoduje rzucenie podstawowo 10 kostek 6-cio ściennych i jeżeli wypadnie najwyższy wynik zostanie dorzucona dodatkowa kostka.
Różnica jest taka, że zamiast wykonywać dodatkowego rzutu osobno, wynik jest w miejscu, w którym kostka wybuchła.
W tym przadku dozwolone są wszystkie operatory do modyfikowania warunku wybuchu kostki.`)
        .addField('Krytyczny sukces i porażka (d20cs=20cf=1)', `
/r d20cs=20cf=1 - taki zapis spowoduje, że (cs) krytyczny sukces, będzie oznaczany przy wyniku 20, a (cf) krytyczna porażka przy wyniku 1.
Do określania krytycznego sukcesu i porażki można używać wszystkich operatorów.
    `)
        .addField('Sortowanie rzutów (10d6s)',
                              `modyfikator **s**, **sa** - taki zapis dodany na końcu, posortuje rzuty od najniższego do najwyższego.
modyfikator **sd** = przy tym zapisie rzuty są sortowane od najwyższego do najniższego. `)
        .addField('Dodatkowe komendy',
          'Informacje o dodatkowych komendach uzyskasz wywołując komendę "/help +"')
    }
    message.reply('', { embed })
  }
}

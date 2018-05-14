'use strict';

String.prototype.erLik = function(text2) {

    var text1 = erlikNormalize(this);
    text2 = erlikNormalize(text2);
                               
    return (text1 == text2) ? true : false;

    function erlikNormalize(text) {
        return text
            .replace(/é|è|ê/g,'e')
            .replace(/É|È|Ê/g, 'E')
            .replace(/ó|ò|ô/g, 'o')
            .replace(/Ó|Ò|Ô/g, 'o')
            .replace(/å/g, 'aa')
            .replace(/Å/g, 'Aa')
            .replace(/æ/g, 'ae')
            .replace(/Æ/g, 'Ae')                
            .replace(/ø/g, 'oe')
            .replace(/Ø/g, 'Oe'); 
    }
}

//Testujemy
var test = new String("bokmål");

console.log(test.erLik("bokmaal"));
console.log(test.erLik("bokmal"));
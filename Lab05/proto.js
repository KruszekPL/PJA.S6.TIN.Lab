'use strict';

String.prototype.erLik = function(target) {

    var text1 = this
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

    return (text1 == target) ? true : false;
}

//Testujemy
var test = new String("bokmål");

console.log(test.erLik("bokmaal"));
console.log(test.erLik("bokmal"));
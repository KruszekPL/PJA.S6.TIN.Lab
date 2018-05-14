'use strict';

function switchClassName(obj, str) {
    var arrClasses = obj.className.split(" ");
    var existsingClass = false;
    
    for (var i = arrClasses.length - 1; i > 0; i--) {
            if (str == arrClasses[i]) { // jezeli klasa występuje w tablicy
                    existsingClass = true;
                    arrClasses.splice(i,1); // usuwamy
            }
    }

    if (!existsingClass) {
        arrClasses.push(str); // dodajemy
    }

    obj.className = arrClasses.join(' ');
}

// Testujemy
// var obj = { className: 'first bordered' };

// switchClassName(obj, 'visible');
// console.log(obj.className);

// switchClassName(obj, 'bordered');
// console.log(obj.className);
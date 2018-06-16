/* jshint browser: true, devel: true, unused: true, globalstrict: true */
/* global $: false */

'use strict';

var goRoot = function(){
    $('h1').removeClass('clickable').click(null);
    $('nav').removeClass('small');
    $('form.newItem').css('display', 'none');
    $('section h2').css('display', 'none');
    $('section table').remove();
};

function getShowGenre(genre) {
  return function() {
    $.getJSON('/genre/'+ genre, function(data, status) {

      if(status === 'success') {
        $('nav').addClass('small');
        $('h1').addClass('clickable').click(goRoot);
        $('form.newItem').css('display', 'block');

        $('section table').remove(); // remove table
        var table = $('<table></table>');
        table.append(
          $('<tr><th>Autor</th><th>Tytuł</th></tr>'))

         $.each(data, function(index, value){
            var tr = $('<tr></tr>').append(
               $('<td></td>').addClass('author').text(value[1]),
               $('<td></td>').addClass('title').text(value[0])
            );
            table.append(tr);
         });

         $('section h2').css('display', 'block').text(genre).after(table);
      } else {
        alert(status);
      }
    });
   };
}

var postBook = function(event) {
   var newTitle = $('input', this).eq(0).val();
   var newAuthor = $('input', this).eq(1).val();
   var genre = $('section h2').text();

   let payload = {
      "title": newTitle,
      "author": newAuthor,
      "genre": genre
  };

   $.post(`/genre/${genre}`, payload).done(function (data) {
      console.log(data);

      if (data.status === 'unauthorized') {
        $('form.login').show();
        $('a.logout').show();
      }

      if (data.status === 'ok') {
        var tr = $('<tr></tr>').append(
            $('<td></td>').addClass('author').text(newAuthor),
            $('<td></td>').addClass('title').text(newTitle)
        );
        $('section table').append(tr);

        // Success notification popup
        var popup = $('<div class="popup">Pomyślnie dodano nową książkę</div>');
        $('body').append(popup);

        setTimeout(function() {
          popup.fadeOut('slow').remove();
        }, 3000);
      }
   });

   return false;
};

let login = function () {
  let payload = {
    username: $('input#username', this).val(),
    password: $('input#password', this).val()
  };

  $.post('/login', payload).done(function (data) {
    if (data.authentication === 'successful') {
      $('form.login').fadeOut('slow');
      var $jsLoggedUser = document.querySelector('.jsLoggedUser');
      $jsLoggedUser.innerHTML = payload.username;
      $('#logout').fadeIn('slow');

      var popup = $('<div class="popup">Logowanie poprawne</div>');
      $('body').append(popup);

      setTimeout(function() {
        popup.fadeOut('slow').remove();
      }, 3000);

    } else {
      alert('Błędne dane logowania');
    }
  });


  return false;
};

var setup = function() {
   $('form.newItem').submit(postBook);
   $('form.login').submit(login);

   $.getJSON('/genres', function(data, status) {
      if(status === 'success') {
         $.each(data, function(index, value) {
            var li = $('<li></li>').text(value).addClass('clickable').click(getShowGenre(value));
            $('nav ul').append(li);
         });
      } else {
         alert(status);
      }
   });
};
   
$(document).ready(setup);

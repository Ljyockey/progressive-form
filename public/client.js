function checkStorage() {
     if (!localStorage.getItem('js-enabled')) {
       populateStorage($('input:checked'));
     }
 }

function populateStorage($input) {
  var prefName = $input.prop('name'),
      prefVal = $input.val();
   
   localStorage.setItem(prefName, prefVal);

 }

$(function() {
  checkStorage();

  $('#toggle-form').submit(e => {
    populateStorage($('input:checked'));
  });

  $('#name-form').submit(e => {
    e.preventDefault();
    var $outputSection = $('#output'),
        $nameField = $('#name-field'),
        $nameNode = $('<p>', {text: $nameField.val()})

        $outputSection.append($nameNode);
  });

});
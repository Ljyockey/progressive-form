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
  /** Store some DOM elements in variables.
   * $ prefix to remind us that these are jQuery objects.
   */
  var $toggleForm = $('#toggle-form'),
      $nameForm = $('#name-form'),
      $nameField = $('#name-field'),
      $outputSection = $('#output');

  checkStorage();

  $toggleForm.change(function(e){
    populateStorage($('input:checked'));
  });

  $nameForm.submit(e => {
    e.preventDefault();

    var url = $(e.target).prop('action');
    var formData = $(e.target).serializeArray();

    $.post(url, formData).done(function(data){
      var $nameNode = $('<p>', {text: data});
      $outputSection.append($nameNode);
      $nameField.val('');
    });

  });

});
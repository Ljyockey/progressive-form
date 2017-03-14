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

 /** TODO: use $.ajax to actually call to the server 
  * & handle these forms 
  */
 $toggleForm.submit(e => {
    e.preventDefault();
    populateStorage($('input:checked'));
    $(this).submit();
  });

  $nameForm.submit(e => {
    e.preventDefault();

    /** Append submitted text to the DOM - this is temporary
     * to illusttate that JS is on, and will be replaced
     * with AJAX calls. */
    var $nameNode = $('<p>', {text: $nameField.val()});
    $outputSection.append($nameNode);
    $nameField.val('');
  });

});
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

$(function () {
  /** Store some DOM elements in variables.
   * $ prefix to remind us that these are jQuery objects.
   */
  var $toggleForm = $('#toggle-form'),
    $nameForm = $('#name-form'),
    $nameField = $('#name-field'),
    $outputSection = $('#output');

  checkStorage();

  /** Store whether or not JS is active when the selected input
   * within the form is changed. The change will be finalized when
   * the form is submitted to the server.
   */
  $toggleForm.change(function (e) {
    populateStorage($('input:checked'));
  });


  $nameForm.submit(e => {
    e.preventDefault();
    /** e.target is the element that triggered the event we're handling.
     * It's a nice way to refer back to the appropriate element.
     * We wrap it in a jQuery object so we can do jQuery things to it.
     * 
     * ...like capture its 'action' prop, then serialize it.
     */

    var url = $(e.target).prop('action');
    var formData = $(e.target).serializeArray();

    $.post(url, formData).done(function (data) {
      /** At this point, the data is simply the name we submitted, 
       * so we can make a DOM node and put the text in.
       */
      var $nameNode = $('<p>', {
        text: data
      });
      $outputSection.append($nameNode);
      $nameField.val('');
    });
  });
});
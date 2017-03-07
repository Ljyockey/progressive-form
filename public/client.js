function checkStorage() {
     if (!localStorage.getItem('js-enabled')) {
       populateStorage($('input:checked'));
     }
 }

 function populateStorage($input) {
   prefName = $input.prop('name');
   prefVal = $input.val();
   
   localStorage.setItem(prefName, prefVal);

 }

$(function() {
  checkStorage();

  $('#toggle-form').submit(e => {
    populateStorage($('input:checked'));
  });

});
function checkStorage() {
     if (!localStorage.getItem('js-enabled')) {
         populateStorage();
     } else {
         updateView();
     }
 }

 function populateStorage(e) {
     var prefName, prefVal;
     // if there is an event from the view
     if (e) {
         prefName = $(e.target).attr('name');
         prefVal = $(e.target).val();
         //set the appropriate storage prop with data from the view
         localStorage.setItem(prefName, prefVal);
     }
     updateView();
 }

 function updateView() {
     var contrast = localStorage.getItem('contrast');
     var userFont = localStorage.getItem('userFont');
     
     switch (contrast) {
         case "high":
             $('.contrast-control[value="high"]').prop('checked', true);
             $('body').addClass('high-contrast');
             break;
         default:
             $('.contrast-control[value="standard"]').prop('checked', true);
             $('body').removeClass('high-contrast');
     }
     switch (userFont) {
         case "dyslexiaFriendly":
             $('.font-control[value="dyslexiaFriendly"]').prop('checked', true);
             $('body').addClass('dyslexia-friendly');
             break;
         default:
             $('.font-control[value="standard"]').prop('checked', true);
             $('body').removeClass('dyslexia-friendly');
     }
 }

$(function() {

  // TODO: use LocalStorage to make the user's decision to enable ior disable JS persist.
});
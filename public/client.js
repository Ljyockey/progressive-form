function checkStorage() {
     if (!localStorage.getItem('jsEnabled')) {
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
   
 }

$(function() {

  // TODO: use LocalStorage to make the user's decision to enable ior disable JS persist.
});
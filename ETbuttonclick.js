var ET = ET || {};
ET.$ = jQuery.noConflict();
ET.$(document).ready(function(){
"use strict";
ET.$(".etButton").click(function() {

  ET.getListItems(this.id);

});


});

ET.getListItems = function (buttonId) {
        "use strict";
 
 ET.$.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_vti_bin/listdata.svc/ButtonClickCount?$filter=(Title eq '" + buttonId + "')",
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
            },
            success: function (data) {
if (data.d.results.length === 0) {
 ET.createButtonClickCount(buttonId);

}
else {

            ET.updateButtonClickCount(data);
} 

                 },
            error: function (error) { 
               
                 
                
            }
       });
    
};



ET.updateButtonClickCount = function (data) {
"use strict";
var numberClicks = data.d.results[0].ClickCount + 1;
var itemId = data.d.results[0].Id;
ET.$.ajax({
type: 'POST',
   url: _spPageContextInfo.webServerRelativeUrl + "/_vti_bin/listdata.svc/ButtonClickCount(" + itemId + ")",
 contentType: 'application/json',
         processData: false,
         headers: {
                "Accept": "application/json;odata=verbose",
                "X-HTTP-Method": "MERGE",
                "If-Match": "*" 
         },

                data: JSON.stringify(
                {
                                       
                    'ClickCount': numberClicks
                    
                }),
                success: function (data) {
                                   
alert("update success");
                },
                error: function (err) {
                    alert(JSON.stringify(err));
                }

  });
};


ET.createButtonClickCount = function (buttonTitle) {
"use strict";
var itemProperties = {
 'Title': buttonTitle,
 'ClickCount': 1

};
    ET.$.ajax({
        url: _spPageContextInfo.webServerRelativeUrl + "/_vti_bin/listdata.svc/ButtonClickCount",
         type: "POST", 
       processData: false, 
        contentType: "application/json;odata=verbose", 
        data: JSON.stringify(itemProperties), 
       headers: { 
             "Accept": "application/json;odata=verbose" 
       }, 

        success: function (data) {
alert("success on create!");
            
        },
        error: function (data) {
           alert("failure on create");
        }
    });

};


//works in both SharePoint 2010 and SharePoint 2013
//create list ButtonClickCount with ClickCount number column
//add this kind of tag to buttons on page: <button class="etButton" id="et_button4" >TEst4</button>
//add link to this file and <script type="text/javascript" src="https://your domain/jquery-1.11.0.min.js"></script> <script type="text/javascript" src="https://yourdomain/buttonclick.js"></script> to page

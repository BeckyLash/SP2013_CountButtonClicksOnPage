var ET || {};
ET.$ = jQuery.noConflict();
ET.$(document).ready(function(){
"use strict";
ET.$(".etButton").click(function() {
  var siteUrl = "https://yourdomain.mil";
  ET.getListItems(this.id, siteUrl);

});


});

ET.getListItems = function (buttonId, web) {
        "use strict";
//for older browsers that can't use toISOString
var today = String.format("{0:yyyy-MM-dd}",new Date());
 //hard-coded path at root of site collection
 ET.$.ajax({
            
            url: web + "/_vti_bin/listdata.svc/ButtonClickCount?$filter=(Title eq '" + buttonId + "') and (Created ge datetime'" + today + "')",
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
            },
            success: function (data) {
if (data.d.results.length === 0 || data === "undefined") {
 ET.createButtonClickCount(buttonId, web);

}
else {

            ET.updateButtonClickCount(data, web);
} 

                 },
            error: function (error) { 
               
           // alert(JSON.stringify(error));
ET.createButtonClickCount(buttonId, web);     
                
            }
       });
    
};



ET.updateButtonClickCount = function (data, web) {
"use strict";
var numberClicks = data.d.results[0].ClickCount + 1;
var itemId = data.d.results[0].Id;
ET.$.ajax({
type: 'POST',
   url: web + "/_vti_bin/listdata.svc/ButtonClickCount(" + itemId + ")",
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
                                   
//alert("update success");
                },
                error: function (err) {
                    alert(JSON.stringify(err));
                }

  });
};


ET.createButtonClickCount = function (buttonTitle, web) {
"use strict";
var itemProperties = {
 'Title': buttonTitle,
 'ClickCount': 1

};
    ET.$.ajax({
        url: web + "/_vti_bin/listdata.svc/ButtonClickCount",
         type: "POST", 
       processData: false, 
        contentType: "application/json;odata=verbose", 
        data: JSON.stringify(itemProperties), 
       headers: { 
             "Accept": "application/json;odata=verbose" 
       }, 

        success: function (data) {
//alert("success on create!");
            
        },
        error: function (data) {
          // alert("failure on create");
        }
    });

};


//works in both SharePoint 2010 and SharePoint 2013
//create list ButtonClickCount with ClickCount number column
//add this kind of tag to buttons on page: <button class="etButton" id="ET_button4" >TEst4</button>
//add link to this file and <script type="text/javascript" src="https://yourdomain/jquery-1.11.0.min.js"></script>


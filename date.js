module.exports.getDate = function ()
{
    var today = new Date();
    var options = {  // to get a custom date format
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    
    var day = today.toLocaleDateString("en-us", options); 
    // it maps the date into custom options object and creates a string

    return day;
}



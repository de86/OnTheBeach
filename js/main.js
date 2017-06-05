function ControlsManager () {
    this.resultSet = this.getResultSet();
};


// Get the results currently on the page and return
// in an array
ControlsManager.prototype.getResultSet = function () {
    return $("#results").children().toArray();
};


// Sort our result set by price then re-render the DOM
ControlsManager.prototype.sortByPriceDesc = function () {
    var sortedResultSet = this.resultSet.sort(function (x, y) {
        // Get the price from the HTML as a string for the
        // results to be compared
        var priceA = $(x).find(".sortable__price")[0].innerHTML;
        var priceB = $(y).find(".sortable__price")[0].innerHTML;
        
        // Parse our strings to ints before we compare and
        // and return the result to the sort function
        return -( parseInt(priceA) - parseInt(priceB) );
    });
    
    this.renderResultsToDom();
};


// Sort our result set by rating then re-render the DOM
ControlsManager.prototype.sortByRatingDesc = function () {
    var sortedResultSet = this.resultSet.sort(function (x, y) {
        // Get the rating by checking the number of stars in
        // results to be compared
        var ratingA = $(x).find(".sortable__rating").children().length;
        var ratingB = $(y).find(".sortable__rating").children().length;
        
        // Compare our ratings and return the result to the sort function
        return -( ratingA - ratingB );
    });
    
    this.renderResultsToDom();
};


// Sort our result set by hotel name then re-render the DOM
ControlsManager.prototype.sortByNameDesc = function () {
    var sortedResultSet = this.resultSet.sort(function (x, y) {
        // Get the hotel name for each result to be compared
        var nameA = $(x).find(".sortable__name")[0].innerHTML;
        var nameB = $(y).find(".sortable__name")[0].innerHTML;
        
        // Compare our strings and return the result to the sort
        // function
        if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            } else {
                return 0;
            }
    });
    
    this.renderResultsToDom();
};


// Reverse the order of our resultSet
ControlsManager.prototype.reverseResults = function () {
    this.resultSet.reverse();
    
    this.renderResultsToDom();
};


// Take our current resultSet and render it in the #results
// div in the DOM
ControlsManager.prototype.renderResultsToDom = function () {
    $("#results").empty();
    
    this.resultSet.forEach(function (result) {
        $("#results").append(result);
    });
};


var controlsManager = new ControlsManager();
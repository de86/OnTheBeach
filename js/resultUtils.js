// Constructor function
function resultUtils () {
    this.resultSet = this.getResultSet();
};


// Get the results currently on the page and return
// in an array
resultUtils.prototype.getResultSet = function () {
    return $("#results").children().toArray();
};


// Sort our result set by price then re-render the DOM
resultUtils.prototype.sortByPrice = function () {
    // If we are already sorted by price then just reverse
    // our results
    if ($("#results").attr("data-sorted-by") === "price") {
        this.reverseResults();
    } else {
        var sortedResultSet = this.resultSet.sort(function (x, y) {
            // Get the price from the HTML as a string for the
            // results to be compared
            var priceA = $(x).attr("data-price");
            var priceB = $(y).attr("data-price");

            // Parse our strings to ints before we compare and
            // and return the result to the sort function
            return -( parseInt(priceA) - parseInt(priceB) );
        });
    };

    $("#results").attr("data-sorted-by", "price");
    this.renderResultsToDom();
};


// Sort our result set by rating then re-render the DOM
resultUtils.prototype.sortByRating = function () {
    // If we are already sorted by rating then just reverse
    // our results
    if ($("#results").attr("data-sorted-by") === "rating") {
        this.reverseResults();
    } else {
        var sortedResultSet = this.resultSet.sort(function (x, y) {
            // Get the rating by checking the number of stars in
            // results to be compared
            var ratingA = $(x).attr("data-rating");
            var ratingB = $(y).attr("data-rating");

            // Compare our ratings and return the result to the sort function
            return -( parseInt(ratingA) - parseInt(ratingB) );
        });
    };

    $("#results").attr("data-sorted-by", "rating");
    this.renderResultsToDom();
};


// Sort our result set by hotel name then re-render the DOM
resultUtils.prototype.sortByName = function () {
    // If we are already sorted by rating then just reverse
    // our results
    if ($("#results").attr("data-sorted-by") === "name") {
        this.reverseResults();
    } else {
        var sortedResultSet = this.resultSet.sort(function (x, y) {
            // Get the hotel name for each result to be compared
            var nameA = $(x).attr("data-hotel-name");
            var nameB = $(y).attr("data-hotel-name");

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
    };

    $("#results").attr("data-sorted-by", "name");
    this.renderResultsToDom();
};


// Reverse the order of our resultSet
resultUtils.prototype.reverseResults = function () {
    this.resultSet.reverse();
    this.renderResultsToDom();
};


// Filter the results on page by hiding results that do not
// match. This solution should scale nicely as any new filter
// added to the filter controls div will automatically be
// picked up.
resultUtils.prototype.filterResults = function () {
    var resultsToShow = this.resultSet;

    // For each filter we have, if the user has selected an option,
    // remove any matching results from our resultsToShow array
    $(".controls-filter__select").each(function () {
        var filterType = $(this).attr("data-filter-by");
        var filterOption = $(this).val();

        if (filterOption !== ""){
            resultsToShow = resultsToShow.filter(function(result){
                var val = $(result).attr("data-" + filterType);
                return val === filterOption;
            });
        }

        // Hide all results on the page before showing the ones
        // that have matched our filters
        $("#results").children().attr("data-filtered", "true");

        // If we have results to show, display them
        if (resultsToShow.length > 0) {
            resultsToShow.forEach(function (result) {
                $(result).removeAttr("data-filtered");
            });
        };
    });
};


// Take our current resultSet and render it in the #results
// div in the DOM
resultUtils.prototype.renderResultsToDom = function () {
    $("#results").empty();

    this.resultSet.forEach(function (result) {
        $("#results").append(result);
    });
};

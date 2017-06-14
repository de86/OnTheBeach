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
resultUtils.prototype.sortByNumber = function (sortOption) {
    // If we are already sorted by price then just reverse
    // our results
    if ($("#results").attr("data-sorted-by") === sortOption) {
        this.reverseResults();
    } else {
        var sortedResultSet = this.resultSet.sort(function (x, y) {
            // Get the price from the HTML as a string for the
            // results to be compared
            var valA = $(x).attr("data-" + sortOption);
            var valB = $(y).attr("data-" + sortOption);

            // Parse our strings to ints before we compare and
            // and return the result to the sort function
            return -( parseInt(valA) - parseInt(valB) );
        });
    };

    $("#results").attr("data-sorted-by", sortOption);
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

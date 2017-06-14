
$(document).ready(function () {
var results = new resultUtils();
    
    // Set the states of our sort buttons
    $(".controls-sort__button-sort").click(function() {
        $(".controls-sort__button-sort").attr("data-active", "false");
        
        $(this).attr("data-active", "true");
    });
    
    
    // Sort functions
    $("#sortPrice").click(function () {
        results.sortByNumber("price");
    });
    
    
    $("#sortRating").click(function () {
        results.sortByNumber("rating");
    });
    
    
    $("#sortName").click(function () {
        results.sortByName();
    });
    
    
    // Filter function
    $(".controls-filter__select").change(function () {
        results.filterResults();
    });
    
    // Reset the filters and trigger a change event that
    // will then kick of the filter function and display 
    // all our results again
    $("#removeFilters").click(function(){
        $(".controls-filter__select").val("").change();
    });
    
    // Expand description boxes
    $(document).on("click", ".result-panel__description-expand", (function(){
        var descriptionPanel = $(this).parents(".result-panel").find(".result-panel__holiday-description");
        
        $(this).toggleClass("result-panel__description-expand--expanded");
        descriptionPanel.slideToggle();
    }));
});
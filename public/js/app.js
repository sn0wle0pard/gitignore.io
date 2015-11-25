'use strict';

$(document).ready(function () {
  $.ajax('/dropdown/templates.json').success(function(data) {
    $("#ignoreSearch").select2({
      sorter: function(results) {
        var query = $('.select2-search__field').val().toLowerCase();
        return results.sort(function(a, b) {
          return a.text.toLowerCase().indexOf(query) -
            b.text.toLowerCase().indexOf(query);
        });
      },
      placeholder: "Search Operating Systems, IDEs, or Programming Languages",
      multiple: true,
      minimumInputLength: 1,
      data: data
    });
    $("#ignoreSearch").select2("container").find("ul.select2-choices").sortable({
      containment: 'parent',
      start: function() { $("#ignoreSearch").select2("onSortStart"); },
      update: function() { $("#ignoreSearch").select2("onSortEnd"); }
    });
  });
});

function generateGitIgnore(){
  var searchString = $("#ignoreSearch").val();
  var searchLength = searchString.length;
  if (searchLength > 0){
    var files = searchString.slice(1,searchLength);
    window.location="/api/"+files;
    $("#ignoreSearch").val("");
  }
}

function generateGitIgnoreFile(){
  var searchString = $("#ignoreSearch").val();
  var searchLength = searchString.length;
  if (searchLength > 0){
    var files = searchString.slice(1,searchLength);
    window.location="/api/f/"+files;
  }
}

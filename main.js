var oldText = '';

$(document).ready(function(){

  $("#query").on('keyup focus', function(){
    do_search();
  });

  $(document).on('click', '.search_result', function(e){
    var text = $(e.toElement).text();
    $('#query').val(text);
    $('#search_results').empty();
  });

  $("#query").on('keydown', function(){
    do_search();
  });

});

function do_search(){
  var val = $('#query').val();
  if(val != oldText){
    populate_search_results(val);
    oldText = val;
  }
}

function populate_search_results(query){
  $.getJSON('https://api.viki.io/v4/search.json', {
    c: query,
    per_page: 5,
    app: '100266a',
    t: parseInt(Date.now() / 1000),
    with_people: true
  }, function(data){
    $('#search_results').empty();
    $.each(data, function(key, item){
      var res = $("<div class='search_result'>" + item.tt + "</div>");
      $('#search_results').append(res);
    });
  });
}

var players = {};

$(document).ready(function () {
  $.each($('div.player'), function(i,v) {
    var player = $(v).text();
    if (!players[player])
      players[player] = [];
    players[player].push(v);
  });

  $('div.player').hover(playerHover);
});


function playerHover() {
  var player = $(this).text();
  if (player)
    $.each($(players[player]), toggleHighlight);
}

function toggleHighlight(i,v) {
  $(v).toggleClass('highlight');
}

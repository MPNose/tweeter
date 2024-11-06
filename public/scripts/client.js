/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$("form").on('submit', function(event) {
  event.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    method: 'POST',
    url: "/tweets",
    data: data
  })
console.log(data);
});

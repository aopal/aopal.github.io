/*!
    Title: Dev Portfolio Template
    Version: 1.2.1
    Last Change: 08/27/2017
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top + 1;
        if($(window).width() > 768) // cutoff for navbar/hamburger menu switch
          scrollDistance -= $('header').height();

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        if($(window).width() > 768) // cutoff for navbar/hamburger menu switch
          scrollDistance -= $('header').height();

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    $('#menu').click(function() {
        $('header, body').removeClass('active');
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

    $('#send-message').click(function(){
      var name = $('#name');
      var email = $('#email');
      var msg = $('#message');

      if(!name.val().trim()){
        showNotice('warning', 'Please enter your name');
        return;
      }

      if(!validateEmail(email.val())) {
        showNotice('warning', 'Please enter a valid email address');
        return;
      }

      if(!msg.val().trim()){
        showNotice('warning', 'Please enter a message');
        return;
      }
      subject = 'Contact request from ' + name.val();
      $.ajax({
        url: 'https://formspree.io/anuj@aopal.ca',
        method: 'POST',
        data: {name: name.val(), message: msg.val(), _replyto: email.val(), email: email.val(), _subject: subject},
        dataType: 'json',
        success: function(data) {
          showNotice('success', 'Thanks for the message! I\'ll get back to you as soon as I can');
          msg.val("");
        },
        error: function(err) {
          showNotice('danger', 'Something went wrong! Try again or just send me an email at anuj@aopal.ca');
        }
      });
    });

})(jQuery);

function validateEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function showNotice(status, message) {
  elem = $('<div class="fade alert alert-' + status + '" role="alert">' + message + '</div>');
  $('#alert-container').append(elem);
  elem.fadeTo(4000, 1).fadeTo(500, 0).slideUp(300, function(){
    $(this).remove();
  });
}

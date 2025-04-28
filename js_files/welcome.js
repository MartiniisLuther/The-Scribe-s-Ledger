
// This event is activated when the initial HTML document has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', 
  function() {
    // these code lines access the elements of the html document
    const cardpairContainer = document.getElementById('card_pair'); //access the yellow + blue cards
    const msg4Container = document.getElementById('msg4'); //access the signup/login card div
    const loginButton = document.getElementById('btn-login'); //access the login button
    const signupButton = document.getElementById('btn-signup'); //access the signup button
    const loginSignupContainer = document.getElementById('login_signup_form'); //access the login/signup form
    const loginTab = document.getElementById('login_tab'); //access the login tab
    const signupTab = document.getElementById('signup_tab'); //access the signup tab
    const loginForm = document.getElementById('login_form'); //access the login form
    const signupForm = document.getElementById('signup_form'); //access the signup form

    // these code lines add an event listener to the login button, and toggle different elements on/off
    loginButton.addEventListener('click', function() {
      loginSignupContainer.style.display = 'block'; // show the login/signup container
      cardpairContainer.style.display = 'none'; // hide the card pair container
      msg4Container.style.display = 'none'; // hide the message container
      loginTab.classList.add('active'); // set the login tab as active
      loginForm.classList.add('active'); // set the login form as active
      signupTab.classList.remove('active'); // remove the active class from the signup tab
      signupForm.classList.remove('active'); // remove the active class from the signup form
    });

    // these code lines add an event listener to the signup button, and toggle different elements on/off
    signupButton.addEventListener('click', function() {
      loginSignupContainer.style.display = 'block'; // show the login/signup container
      cardpairContainer.style.display = 'none'; // hide the card pair container
      msg4Container.style.display = 'none'; // hide the message container
      signupTab.classList.add('active'); // set the signup tab as active
      signupForm.classList.add('active'); // set the signup form as active
      loginTab.classList.remove('active'); // remove the active class from the login tab
      loginForm.classList.remove('active'); // remove the active class from the login form
    });

    //these code lines add an event listener to the login tab, and toggle different elements on/off
    loginTab.addEventListener('click', function() {
      loginTab.classList.add('active'); // set the login tab as active
      signupTab.classList.remove('active'); // remove the active class from the signup tab
      loginForm.classList.add('active'); // set the login form as active
      signupForm.classList.remove('active'); // remove the active class from the signup form
    });

    //these code lines add an event listener to the signup tab, and toggle different elements on/off
    signupTab.addEventListener('click', function() {
      signupTab.classList.add('active'); // set the signup tab as active
      loginTab.classList.remove('active'); // remove the active class from the login tab
      signupForm.classList.add('active'); // set the signup form as active
      loginForm.classList.remove('active'); // remove the active class from the login form
    });
  
  });
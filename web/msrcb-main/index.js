// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNyyp4FGdcPkmjyntkNOTrt_Gg4-zaxJA",
  authDomain: "msrcb-d821e.firebaseapp.com",
  databaseURL: "https://msrcb-d821e-default-rtdb.firebaseio.com",
  projectId: "msrcb-d821e",
  storageBucket: "msrcb-d821e.appspot.com",
  messagingSenderId: "757348050200",
  appId: "1:757348050200:web:3b49b382fa53d888ebea6d",
  measurementId: "G-W7XP1KXYH5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Function to logout

// Function to toggle visibility of content container
function hideContentContainer() {
  var contentContainer = document.getElementById('content_container');
  if (contentContainer) {
      contentContainer.style.display = 'none';
  }
}

// Set up our register function
function register() {
  // Get all our input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!');
      return;
      // Don't continue running the code
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
          email : email,
          last_login : Date.now()
      };

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data);

      // Done
      alert('User Created!!');
      hideContentContainer(); // Hide content container after successful registration
  })
  .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
  });
}

// Set up our login function
function login() {
  // Get all our input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!');
      return;
      // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
          last_login : Date.now()
      };

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data);

      // Done
      alert('User Logged In!!');
      hideContentContainer(); // Hide content container after successful login
  })
  .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
  });
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
      // Email is good
      return true;
  } else {
      // Email is not good
      return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
      return false;
  } else {
      return true;
  }
}

function validate_field(field) {
  if (field == null) {
      return false;
  }

  if (field.length <= 0) {
      return false;
  } else {
      return true;
  }
}

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', function() {
  auth.onAuthStateChanged(function(user) {
      if (user) {
          // User is signed in
          // Hide content container
          hideContentContainer();
      } else {
          // No user is signed in
          // Show content container
          var contentContainer = document.getElementById('content_container');
          if (contentContainer) {
              contentContainer.style.display = 'block';
          }
      }
  });
});

// Function to show main when logged in or registered
function showMain() {
  var mainElement = document.querySelector('.main');
  if (mainElement) {
      mainElement.style.display = 'block';
  }
}

// Function to hide main
function hideMain() {
  var mainElement = document.querySelector('.main');
  if (mainElement) {
      mainElement.style.display = 'none';
  }
}

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', function() {
  auth.onAuthStateChanged(function(user) {
      if (user) {
          // User is signed in
          showMain(); // Show main when user is logged in
      } else {
          // No user is signed in
          hideMain(); // Hide main when user is not logged in
      }
  });
});



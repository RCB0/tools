// Function to update user profile in Firebase
function updateUserProfile(email, fullName) {
    var user = auth.currentUser;
    user.updateProfile({
        displayName: fullName,
        email: email
    }).then(function() {
        // Profile updated successfully
        console.log("User profile updated");

        // Save profile data to Firebase
        saveProfileData(email, fullName);
    }).catch(function(error) {
        // An error occurred while updating profile
        console.error("Error updating profile:", error);
    });
}

// Function to save profile data to Firebase
function saveProfileData(email, fullName) {
    var user = auth.currentUser;
    var database_ref = database.ref();

    // Generate random profile color
    var profileColor = generateProfileColor();

    // Create user data
    var user_data = {
        email: email,
        fullName: fullName,
        profileColor: profileColor,
        last_login: Date.now()
    };

    // Save user data to Firebase
    database_ref.child('users/' + user.uid).set(user_data);
}

// Function to display user profile on the profile page
function displayUserProfile() {
    var user = auth.currentUser;
    if (user) {
        // Retrieve user data from Firebase
        var database_ref = database.ref('users/' + user.uid);
        database_ref.once('value').then(function(snapshot) {
            var data = snapshot.val();
            var profileName = document.getElementById('profile-name');
            var profileEmail = document.getElementById('profile-email');
            var profileImage = document.getElementById('profile-image');

            if (profileName && profileEmail && profileImage) {
                profileName.textContent = data.fullName;
                profileEmail.textContent = data.email;
                profileImage.style.backgroundColor = data.profileColor;
            }
        });
    }
}

// Set up our register function
function register() {
    // Get all our input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const fullName = document.getElementById('full_name').value; // Retrieve full name input value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!');
        return;
        // Don't continue running the code
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        // Update user profile with full name
        updateUserProfile(email, fullName);
        
        // Declare user variable
        var user = auth.currentUser;

        // Add this user to Firebase Database
        var database_ref = database.ref();

        // Create User data
        var user_data = {
            email: email,
            last_login: Date.now()
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
    const fullName = document.getElementById('full_name').value; // Retrieve full name input value

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

        // Update user profile with full name
        updateUserProfile(email, fullName);

        // Add this user to Firebase Database
        var database_ref = database.ref();

        // Create User data
        var user_data = {
            last_login: Date.now()
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

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', function() {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            displayUserProfile(); // Display user profile when logged in
            showMain(); // Show main when user is logged in
        } else {
            // No user is signed in
            hideMain(); // Hide main when user is not logged in
        }
    });
});

function logout() {
    auth.signOut().then(function() {
        // Sign-out successful.
        // Redirect or perform any other action after logout
        console.log("User signed out");
    }).catch(function(error) {
        // An error happened.
        console.error("Error signing out:", error);
    });
}

// Function to update user profile picture
function uploadProfilePicture() {
    var fileInput = document.getElementById('profile-picture-input');
    var profileImage = document.getElementById('profile-image');

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            profileImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}

// Event listener for file input change event
document.getElementById('profile-picture-input').addEventListener('change', uploadProfilePicture);

// Function to generate a random profile color
function generateProfileColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate a random hex color
    return randomColor;
}

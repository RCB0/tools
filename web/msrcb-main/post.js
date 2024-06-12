
// Function to create a new post
function createPost() {
    var postContent = document.getElementById('postContent').value;
    var user = auth.currentUser;

    if (user && postContent) {
        var postId = database.ref().child('posts').push().key;

        var postData = {
            uid: user.uid,
            author: user.displayName || user.email,
            content: postContent,
            timestamp: Date.now()
        };

        var updates = {};
        updates['/posts/' + postId] = postData;

        database.ref().update(updates)
            .then(function() {
                console.log("Post created successfully");
                document.getElementById('postContent').value = ''; // Clear the input field
                displayPosts(); // Refresh the post list
            })
            .catch(function(error) {
                console.error("Error creating post:", error);
            });
    }
}

// Function to display posts
function displayPosts() {
    var postsRef = database.ref('posts');
    postsRef.on('value', function(snapshot) {
        var postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '';

        snapshot.forEach(function(childSnapshot) {
            var post = childSnapshot.val();
            var postId = childSnapshot.key;

            var postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = ` 
                <h2>${post.content}</h2><br>
                <h3 onclick="toggleOptions(event)">by ${post.author} at ${new Date(post.timestamp).toLocaleString()} </h3>
                
                <span id="option">
                <div id="options-container" class="options-container">
                    <button onclick="editPost('${postId}', '${post.content}')" class="lo">Edit</button>
                    <button onclick="deletePost('${postId}')" class="lo">Delete</button>
                    <button onclick="copyPostLink('${postId}')" class="lo">Copy Link</button>
                </div>
            </span>
           
            `;
            postsContainer.appendChild(postElement);
        });
    });
}

// Function to edit a post
function editPost(postId, oldContent) {
    var newContent = prompt("Edit your post:", oldContent);
    if (newContent) {
        var updates = {};
        updates['/posts/' + postId + '/content'] = newContent;

        database.ref().update(updates)
            .then(function() {
                console.log("Post edited successfully");
                displayPosts(); // Refresh the post list
            })
            .catch(function(error) {
                console.error("Error editing post:", error);
            });
    }
}

// Function to delete a post
function deletePost(postId) {
    database.ref('/posts/' + postId).remove()
        .then(function() {
            console.log("Post deleted successfully");
            displayPosts(); // Refresh the post list
        })
        .catch(function(error) {
            console.error("Error deleting post:", error);
        });
}

// Function to copy post link
function copyPostLink(postId) {
    var postLink = window.location.href + '?post=' + postId;
    navigator.clipboard.writeText(postLink).then(function() {
        alert("Post link copied to clipboard!");
    }).catch(function(error) {
        console.error("Error copying post link:", error);
    });
}

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', function() {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            displayPosts(); // Display posts when logged in
        } else {
            // No user is signed in
        }
    });
});
/*----------------------------------------------------------------*/
// Function to handle image upload
function handleImageUpload() {
    var imageInput = document.getElementById('post-image');
    var imageFile = imageInput.files[0];

    // Check if an image file is selected
    if (imageFile) {
        // You can handle the image here, such as displaying it preview or uploading it to a server
        var formData = new FormData();
        formData.append('image', imageFile);

        // Example: Upload the image to Firebase Storage
        var storageRef = firebase.storage().ref();
        var imageRef = storageRef.child('images/' + imageFile.name);

        imageRef.put(imageFile)
            .then(function(snapshot) {
                console.log('Image uploaded successfully');
                // Get the image URL
                return snapshot.ref.getDownloadURL();
            })
            .then(function(downloadURL) {
                // Now you have the download URL of the uploaded image
                console.log('Image URL:', downloadURL);

                // You can use the download URL to display the image in your post
                // For example:
                var imagePreview = document.getElementById('image-preview');
                imagePreview.src = downloadURL;

                // Or you can store the URL in your database along with other post data
                // Then retrieve and display it when needed
            })
            .catch(function(error) {
                console.error('Error uploading image:', error);
            });
    }
}

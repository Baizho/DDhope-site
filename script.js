// script.js
import { auth, storage } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-storage.js";

import context from "./posts.json" with { type: "json" };
// console.log(context);

// Register User
function registerUser(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;


    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log('User registered:', userCredential.user);
            alert('Registration successful!');
            document.getElementById('registration-form').reset();
            document.getElementById('auth-container').style.display = 'none';
        })
        .catch(error => {
            console.error('Registration error:', error);
            alert('Registration failed: ' + error.message);
        });
}

// Login User
function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log('User logged in:', userCredential.user);
            alert('Login successful!');
            document.getElementById('login-form').reset();
            document.getElementById('auth-container').style.display = 'none';
        })
        .catch(error => {
            console.error('Login error:', error);
            alert('Login failed: ' + error.message);
        });
}

// Listen for authentication state changes
onAuthStateChanged(auth, user => {
    if (user) {
        console.log('User is signed in:', user.email);
        document.getElementById('auth-container').style.display = 'none';
    } else {
        console.log('No user is signed in');
        document.getElementById('auth-container').style.display = 'flex';
        document.getElementById('post-detail').style.display = 'none';
    }
});

// Show post detail with form
function showPostDetail(title, description, imgSrc) {
    const user = auth.currentUser;
    if (!user) {
        alert("Please log in to view more details and submit the form.");
        document.getElementById('auth-container').style.display = 'flex';
        return;
    }
    // console.log(user);
    const postContent = document.getElementById('post-content');
    postContent.innerHTML = `
    <div style="padding: 20px; box-sizing: border-box; max-width: 100%; overflow-y: auto;">
        <h2 style="text-align: center; margin-bottom: 20px;">${title}</h2>
        <img src="${imgSrc}" alt="${title}" style="max-width: 100%; height: auto; display: block; margin: 0 auto; border-radius: 5px;">
        <p style="text-align: justify; margin-top: 20px;">${description}</p>
    </div>
    `;


    document.getElementById('post-detail').style.display = 'flex';
}

// Filter posts based on category
function filterPosts(category) {
    const postsContainer = document.getElementById('donation-posts');
    postsContainer.innerHTML = '';


    const filteredPosts = context.filter(post => category === 'all' || post.category === category);

    const countPosts = document.getElementById('count-posts');
    countPosts.innerText = `Количество публикаций: ${filteredPosts.length}`

    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
                <img src="${post.imgSrc}" alt="${post.title}">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <a href="#">Подробнее</a>
            `;
        // console.log(postElement.childNodes[7]);
        const anchorTag = postElement.querySelector('a');
        anchorTag.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default link behavior
            showPostDetail(post.title, post.description, post.imgSrc);
        });
        postsContainer.appendChild(postElement);
    });

}

window.filterPosts = filterPosts;

// Generate a random post
function generateRandomPost() {
    const randomPost = context[Math.floor(Math.random() * context.length)];
    filterPosts(randomPost.category);
}

window.generateRandomPost = generateRandomPost;

// Close post detail
function closePostDetail() {
    document.getElementById('post-detail').style.display = 'none';
}

// Send email using mailto
function sendEmail(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const transaction = document.getElementById('transaction').value;
    const file = document.getElementById('file').files[0];

    if (!file) {
        alert("Please attach a PDF file.");
        return;
    }

    // Upload file to Firebase Storage
    const storageRef = ref(storage, `transactions/${file.name}`);
    uploadBytes(storageRef, file)
        .then(snapshot => {
            return getDownloadURL(snapshot.ref);
        })
        .then(downloadURL => {
            console.log('File available at:', downloadURL);

            // Send email using mailto
            const mailtoLink = `mailto:ramazanedu2@gmail.com?subject=Donation Details&body=Name: ${name}%0D%0AEmail: ${email}%0D%0ATransaction Details: ${transaction}%0D%0AFile URL: ${downloadURL}`;
            window.location.href = mailtoLink;
            closePostDetail();

            document.getElementById('info-card').style.display = 'block';
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            alert('Failed to upload file. Please try again.');
        });
    document.getElementById('transaction').value = "";
    document.getElementById('file').files = null;
}

// Attach event listeners for authentication forms
document.getElementById('registration-form').addEventListener('submit', registerUser);
document.getElementById('login-form').addEventListener('submit', loginUser);
document.getElementById('detail-form').addEventListener('submit', sendEmail);

// Initialize posts on page load
document.addEventListener('DOMContentLoaded', () => {
    filterPosts('all');
});



function showLoginForm() {
    document.getElementById('register-form-container').style.display = 'none';
    document.getElementById('login-form-container').style.display = 'block';
}

// Show Register Form
function showRegisterForm() {
    document.getElementById('login-form-container').style.display = 'none';
    document.getElementById('register-form-container').style.display = 'block';
}

// Close post detail
function closePostDetail() {
    document.getElementById('post-detail').style.display = 'none';
}

function closeInfoCard() {
    document.getElementById('info-card').style.display = 'none';
}

// Filter posts based on category
function filterPosts(category) {
    const postsContainer = document.getElementById('donation-posts');
    postsContainer.innerHTML = '';

    const filteredPosts = context.filter(post => category === 'all' || post.category === category);
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
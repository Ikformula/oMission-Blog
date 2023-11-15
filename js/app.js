
function getBlogPosts(){

// Make a request for a user with a given ID
axios.get('https://jsonplaceholder.typicode.com/posts')
.then(function (response) {
  // handle success
  var postHtml = ``;
  for(blogPost of response.data) {
    postHtml += `
    <!-- Post preview-->
    <div class="post-preview">
        <a href="#post/${blogPost.id}">
            <h2 class="post-title">${blogPost.title}</h2>
            <h3 class="post-subtitle">${blogPost.body.slice(0, 10)}...</h3>
        </a>
        <p class="post-meta">
            Posted by
            <a href="#!">Iyke</a>
            on November 13, 2023
        </p>
    </div>
    <!-- Divider-->
    <hr class="my-4" />
    `;

  };
  
  $('#page-content-section').html(postHtml);
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.finally(function () {
  // always executed
});
}


$(document).ready(function () {
  var app = Sammy('#page-content-section', function () {
    this.get('#/', function () {
      // Load home content
    $('title').html('oMission Blog');
    $('#page-title').html('oMission Blog');
    $('.subheading').html('...describing truth');
      getBlogPosts();
    });

    this.get('#/posts', function () {
      // Load posts content

      $('#page-content-section').html('Posts Page Content');
    });

    // Route for single posts
    this.get('#post/:id', function () {
      var postId = this.params.id;
      // Load post content based on postId
      loadPost(postId);
    });

    // Add more routes for other sections/pages

    // Catch-all route for unknown paths
    this.notFound = function () {
      // Handle 404 errors
      $('#page-content-section').html('404 Not Found');
    };
  });

  // Run the Sammy.js application
  app.run('#/');
});

// Example function for loading blog post details
function loadPost(postId) {
  // Update the #page-content-section with the retrieved post content
  $('#page-content-section').html('Loading post ' + postId + '...');
  // Make an AJAX request to get post details from the server
  axios.get('https://jsonplaceholder.typicode.com/posts/' + postId)
  .then(function (response) {
    // handle success
    $('#page-title').html(response.data.title);
    $('.subheading').html('Post by Iyke');
    $('#page-content-section').html(response.data.body);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

}

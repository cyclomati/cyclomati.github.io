// JavaScript functions here

// Example of like post function
function likePost(postId) {
  var likes = parseInt(localStorage.getItem(postId + '_likes')) || 0;
  likes++;
  localStorage.setItem(postId + '_likes', likes);
  document.getElementById('likes-' + postId).textContent = likes;
}

// Example of add comment function
function addComment(postId) {
  var commentInput = document.getElementById('comment-' + postId);
  var commentText = commentInput.value.trim();
  if (commentText !== '') {
    var comments = JSON.parse(localStorage.getItem(postId + '_comments')) || [];
    comments.push(commentText);
    localStorage.setItem(postId + '_comments', JSON.stringify(comments));
    displayComments(postId, comments);
    commentInput.value = '';
  }
}

// Example of display comments function
function displayComments(postId, comments) {
  var commentList = document.getElementById('comments-' + postId);
  commentList.innerHTML = '';
  comments.forEach(function(comment) {
    var li = document.createElement('li');
    li.textContent = comment;
    commentList.appendChild(li);
  });
}

document.getElementById("toggle-dark-mode").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});

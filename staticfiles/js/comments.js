document.addEventListener("DOMContentLoaded", function() {
    /*
    Assign background colors to comment entries based on their index.
    So even if a user deletes their comment there won’t be the same
    background color on top of each other.
    */
    const commentEntries = document.getElementsByClassName("comment-entry");
    for (let i = 0; i < commentEntries.length; i++) {
        if (i % 2 === 0) {
            commentEntries[i].style.backgroundColor = "#F0FBFF";
        } else {
            commentEntries[i].style.backgroundColor = "#FFFFFF";
        }
    }
  
    const editButtons = document.getElementsByClassName("btn-edit");
    const deleteButtons = document.getElementsByClassName("btn-delete");
    
    /*
    Check if deleteModal exists before initializing it. 
    Otherwise, there will be an error when there are no 'deleteModal'
    in the HTML code.
    */
    const deleteModalElement = document.getElementById("deleteModal");
    let deleteModal = null;
    if (deleteModalElement) {
        deleteModal = new bootstrap.Modal(deleteModalElement);
    }
    
    const deleteForm = document.getElementById("deleteForm");
    const deleteCommentContent = document.getElementById("deleteCommentContent");
    const commentText = document.getElementById("id_content");
    const submitButton = document.getElementById("submitButton");
    const commentForm = document.getElementById("commentForm");
    const commentSuccessModalElement = document.getElementById("commentSuccessModal");
    let commentSuccessModal = null;

    if (commentSuccessModalElement) {
        commentSuccessModal = new bootstrap.Modal(commentSuccessModalElement);
    }
  
    /*
    When a user wants to edit their own comment by pressing the edit button, this specific
    comment will appear in the commenting form and the submit button will change to 
    "update".
    */
    for (let button of editButtons) {
        button.addEventListener("click", (e) => {
            let commentId = e.target.getAttribute("data-comment_id");
            let commentContent = document.getElementById(`comment${commentId}`).innerText.trim();
            if (commentText) {
                commentText.value = commentContent;
            } else {
                console.error("Element with id 'id_content' not found");
            }
            if (submitButton) {
                submitButton.innerText = "Update";
            }
            if (commentForm) {
                commentForm.setAttribute("action", `/edit_comment/${commentId}/`);
            }
        });
    }
  
    /*
    When pressing "delete" on a comment, a modal will be shown. 
    In that modal, this specific comment will be shown and ask 
    the user if they are sure to delete their comment or not.
    */
    for (let button of deleteButtons) {
        button.addEventListener("click", (e) => {
            let commentId = e.target.getAttribute("data-comment_id");
            let commentContent = e.target.getAttribute("data-comment_content");
            if (deleteCommentContent) {
                deleteCommentContent.innerText = commentContent;
            }
            if (deleteForm) {
                deleteForm.setAttribute("action", `/delete_comment/${commentId}/`);
            }
            if (deleteModal) {
                deleteModal.show();
            } else {
                console.error("Delete modal not found");
            }
        });
    }

    /*
    Check if the comment success modal should be shown based on the URL parameter.
    */
    const urlParams = new URLSearchParams(window.location.search);
    const commentPosted = urlParams.get('comment_posted');

    if (commentPosted === 'True' && commentSuccessModal) {
        commentSuccessModal.show();
    }
});

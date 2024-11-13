$(document).ready(function() {
    const postsPerPage = 12;
    let currentPage = 1;
    let postsData = [];

    // Fetch the data from the JSON file
    $.getJSON("./data/data.json", function(data) {
        postsData = data;
        renderPosts();
        renderPagination();
    });

    // Render the posts for the current page
    function renderPosts() {
        $("#articles-list").empty();
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const pagePosts = postsData.slice(start, end);

        pagePosts.forEach((post, index) => {
            $("#articles-list").append(`
                <div class="col-md-6 mb-4">
                    <div class="card bg-dark text-light shadow">
                        <img src="${post.image}" class="card-img-top" alt="${post.title}">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text"><small>${post.date} by ${post.author}</small></p>
                            <p class="card-text">${post.excerpt}</p>
                            <a href="read-more.html" class="btn btn-outline-light read-more" data-index="${index + start}">Read More</a>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    // Store post data in localStorage when "Read More" is clicked
    $("#articles-list").on("click", ".read-more", function(e) {
        const postIndex = $(this).data("index");
        localStorage.setItem("selectedPost", JSON.stringify(postsData[postIndex]));
    });

    // Render pagination controls based on the total number of posts
    function renderPagination() {
        const totalPages = Math.ceil(postsData.length / postsPerPage);
        $("#pagination-controls").empty();

        for (let i = 1; i <= totalPages; i++) {
            $("#pagination-controls").append(`
                <li class="page-item ${i === currentPage ? "active" : ""}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `);
        }
    }

    // Handle pagination link click
    $("#pagination-controls").on("click", ".page-link", function(e) {
        e.preventDefault();
        currentPage = parseInt($(this).data("page"));
        renderPosts();
        renderPagination();
    });
});

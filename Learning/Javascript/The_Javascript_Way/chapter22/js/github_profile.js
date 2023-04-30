/* The ubiquitous code sharing platform GitHub has a public API. The goal of this exercise is to display some information about a GitHub user, identified by his login. The API documentation is available here.
Use this API to show the profile picture, name and website address of a GitHub user whose login is entered in a text box.

{
    "login": "octocat",
    "id": 1,
    "node_id": "MDQ6VXNlcjE=",
    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
    "gravatar_id": "",
    "url": "https://api.github.com/users/octocat",
    "html_url": "https://github.com/octocat",
    "followers_url": "https://api.github.com/users/octocat/followers",
    "following_url": "https://api.github.com/users/octocat/following{/other_user}",
    "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
    "organizations_url": "https://api.github.com/users/octocat/orgs",
    "repos_url": "https://api.github.com/users/octocat/repos",
    "events_url": "https://api.github.com/users/octocat/events{/privacy}",
    "received_events_url": "https://api.github.com/users/octocat/received_events",
    "type": "User",
    "site_admin": false,
    "name": "monalisa octocat",
    "company": "GitHub",
    "blog": "https://github.com/blog",
    "location": "San Francisco",
    "email": "octocat@github.com",
    "hireable": false,
    "bio": "There once was...",
    "twitter_username": "monatheoctocat",
    "public_repos": 2,
    "public_gists": 1,
    "followers": 20,
    "following": 0,
    "created_at": "2008-01-14T04:33:35Z",
    "updated_at": "2008-01-14T04:33:35Z",
    "private_gists": 81,
    "total_private_repos": 100,
    "owned_private_repos": 100,
    "disk_usage": 10000,
    "collaborators": 8,
    "two_factor_authentication": true,
    "plan": {
        "name": "Medium",
        "space": 400,
        "private_repos": 20,
        "collaborators": 0
    }
}

*/

const formElement = document.querySelector("form");

formElement.addEventListener("submit", event => {
    event.preventDefault();
    const login = formElement.elements.login.value;
    console.log(login);
    fetch(`https://api.github.com/users/${login}`)
        .then(response => response.json())
        .then(user => {
            // console.log(user);
            // Get all the needed DOM elements
            const imageElement = document.getElementById("profile-image");
            const nameElement = document.getElementById("profile-name");
            const linkElement = document.getElementById("profile-link");

            // Clear the previous contents
            imageElement.src = "";
            nameElement.textContent = "";
            linkElement.href = "";

            // Add new content
            imageElement.src = user.avatar_url;
            nameElement.textContent = user.name;
            linkElement.href = user.blog;
            linkElement.textContent = linkElement.href;
        })
        .catch(error => {
            console.error(error.message);
        });
});

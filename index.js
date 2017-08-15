$(document).ready(function (){		
});

function searchRepositories(){
		let searchTerms = window.$('#searchTerms').val()

		let url = `https://api.github.com/search/repositories?q=${searchTerms}`;

		$.get(url)
			.done(function(data) {
				let response = data.items
				let responseHTML = `<ul>${response.map(repo => '<li>' + '<a href="' + repo.html_url + '">' + repo.name + '</a>' + ', ' + repo.description + ', ' + ', ' + repo.owner.login + ', ' + repo.owner.url + ', ' + repo.owner.avatar_url + ", " + '<a href="#" data-owner="' + repo.owner.login + '"data-repository="' + repo.name + '" onclick="showCommits(this)">' + 'Show Commits' + '</a>').join('')}</ul>`
  				$('#results').html(responseHTML)
  				}).fail(function(){
  					displayError()
  				})
}

function displayError(){
	$("#errors").html("I'm sorry, there's been an error. Please try again.")
}

function formatCommit(r) {
	return `<li>${r.author.login}, ${r.commit.author.name}, ${r.sha}, <img src='${r.committer.avatar_url}'></li>`
}
response[0].commit.author.name
 // SHA, the author, the author's login, and the author's avatar as an image.

function showCommits(ele){
	let userName = ele.dataset.owner
	let repoName = ele.dataset.repository
	let url = `https://api.github.com/repos/${userName}/${repoName}/commits`

	$.get(url)
		.done(function(response) {
			let responseHTML = `<ul>${response.map(commit => formatCommit(commit))}</ul>`
			$('#details').html(responseHTML)
		})
}
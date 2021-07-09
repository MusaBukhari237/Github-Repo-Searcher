var repolist = [];



function Capitalize(string) {
  string = string.replaceAll("_", " ").replaceAll("-", " ")
  var Letter = string.split(" ");
  var Output = "";
  for (let index = 0; index < Letter.length; index++) {
    Output = Output + Letter[index].charAt(0).toUpperCase() + Letter[index].slice(1) + " ";

  }

  return Output;
}


function Notfound(){
    var list = document.querySelector(".list")
    list.innerHTML = `
    <div class="list-view list-folder" >
    <img class="list-img" src="404.png">
    <a href="#">
        <h2 class="list-title">${Capitalize("Data Not found")}</h2>
    </a>
</div>
    `
}

function RepoLength() {
  var repospan = document.querySelector(".repolength")
  var repolength = document.querySelectorAll(".list-view")
  repospan.innerText = repolength.length + " Results";

}

function RepoProfile(user) {
  var chip = document.querySelector(".chip");
  var RepoProfile = document.querySelector(".list-view > .list-img").src;
  chip.innerHTML = `<img src="${RepoProfile}" alt="" >
  ${Capitalize(user)}`;

}

function PasteRepo() {
  console.log(repolist);
  var list = document.querySelector(".list");
  list.innerHTML = '';
  for (let index = 0; index < repolist.length; index++) {
    let element = repolist[index];
    list.innerHTML += `
      <div class="tooltip">     

      <div class="list-view list-folder" >
      <img class="list-img" src="${element.owner.avatar_url}">
      <a href="${element.html_url}">
          <h2 class="list-title">${Capitalize(element.name)}</h2>
      </a>
  </div>

  <span class="tooltiptext">${element.name}</span>
  </div>
      `
  }

  RepoLength();
  RepoProfile(repolist[0].owner.login);

}



function GetRepositories(user) {
  var url = 'https://api.github.com/users/' + user + '/repos';
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
     // console.log(data);
      repolist = data;

    });

    if (repolist.length < 1 ) {
      Notfound();        
    }else{
      PasteRepo();
    }


}





// var getrepo = new Promise ((resolve,reject) => {
//     GetRepositories("aamirpinger").length > 0 ? resolve() : reject();
// })


// getrepo.then(PasteRepo()).catch(console.log("Error"))

GetRepositories("aamirpinger");
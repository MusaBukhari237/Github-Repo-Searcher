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


function Notfound(string){
    var list = document.querySelector(".list")
    list.innerHTML = `
    <div class="list-view list-folder" >
    <img class="list-img" src="404.png">
    <a href="#">
        <h2 class="list-title">${Capitalize(string)}</h2>
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

function PasteRepo(datalist,type) {
  console.log(list);
  
  var list = document.querySelector(".list");
  list.innerHTML = '';
  if (type == 'users') {
    datalist = datalist.items;
    
    for (let index = 0; index < datalist.length; index++) {
      let element = datalist[index];
      list.innerHTML += `
        <div class="tooltip">     
  
        <div class="list-view list-folder" >
        <img class="list-img imgborder" src="${element.avatar_url}">
        <a href="${element.url}">
            <h2 class="list-title">${Capitalize(element.login)}</h2>
        </a>
    </div>
  
    <span class="tooltiptext">${element.login}</span>
    </div>
        `
    }
  
    RepoLength();
    RepoProfile(datalist[0].login);
  }else{
    for (let index = 0; index < datalist.length; index++) {
      let element = datalist[index];
      list.innerHTML += `
        <div class="tooltip">     
  
        <div class="list-view list-folder" >
        <img class="list-img imgborder" src="${element.owner.avatar_url}">
        <a href="${element.html_url}">
            <h2 class="list-title">${Capitalize(element.name)}</h2>
        </a>
    </div>
  
    <span class="tooltiptext">${element.name}</span>
    </div>
        `
    }
  
    RepoLength();
    RepoProfile(datalist[0].owner.login);
  }



}



function CheckData(){
  if (Array.isArray(repolist) || Array.isArray(repolist.items)) {
    if (repolist.message == "Not Found") {
      Notfound("Data Not found")
    }else{
      // Other Functions Here.....
      if (Array.isArray(repolist.items)) {
        // Users
      }else{
        // Repos
        
      }
      console.log(repolist)
    }
    
  }else{
    console.log("Api Not working Correctly")
    Notfound("Api Does Not Working Correctly Plas")
  }

}


function GetRepositories(api,param1,user) {
  var url = api + user + param1;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
     // console.log(data);
      repolist = data;
        // repolist = "data";
      CheckData();
      

    });

    



}






GetRepositories("https://api.github.com/search/users?q=","","musa");

// repolist = ["musa","tooba"];

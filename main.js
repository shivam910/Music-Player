let searchvalue = document.getElementById("search_field");
let playing = document.getElementById("playing");
let submit = document.getElementById("submit_button");
let searchform = document.getElementById("search-form");
let searchResults=document.getElementById("results");
let player = document.getElementById("music-player");


submit.addEventListener("click", goSearch);

function goSearch() {
  let searchQuery = searchvalue.value;
  console.log(searchQuery);

  fetch(
    "https://api.soundcloud.com/tracks?client_id=8538a1744a7fdaa59981232897501e04&q=" +
      searchQuery
  ).then(function (response) {
    if (response.status !== 200) {
      console.log(
        "OOPs an error occured. Status Code: " + response.status
      );
      return;
    } else {
      response.json().then(function (data) {
        //console.log(searchResults);
        console.log(data);
        for (let i = 0; i < data.length; i++) {
        //   console.log("show each title:", data[i].title);
          let markup = `
                <div class="artist_container">
                  <div class="avatar_container">
                    <img class="${data[i].stream_url}?client_id=8538a1744a7fdaa59981232897501e04" src=${data[i].user.avatar_url}>
                  <div class="title_artist">
                   <ul>
                     <li id="title">${data[i].title}</li>
                     <li id="artist">${data[i].user.username}</li>
                   </ul>
                 </div>
                </div>
                </div>   
               `;
            //    playing.innerHTML+=`${data[i].title}`;
          searchResults.innerHTML += markup;
        }
      });
    }
  });
  searchResults.innerHTML = "";
}
searchResults.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "IMG") {
    let url = e.target.className;
    // console.log(url);
    player.removeAttribute("src");
    player.setAttribute("src", url);
    player.play();
    let playerSource = player.src;
    console.log(playerSource);
  }
});

document.querySelector("#abc").style.marginBottom="80px";
document.querySelector("#abc").style.marginTop="10px";

document.querySelector(".text").style.fontSize="3em";
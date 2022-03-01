let key = "9c73aca0";
// let key="d806bdr0";
//d806bdr0

async function searchmovie() {
  try {
    let movies = document.getElementById("query").value;
    headerExpand()
    let res = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${movies}`);
    let data = await res.json();

    console.log("dat:", data);
    if(data.Response=="False")     notFound()
  

    return data.Search;
  } catch (err) {
    console.log("err:", err);
    
  }
}

async function main() {
  let data = await searchmovie();
  if (data === undefined) {
    return false;
  }
  document.getElementById("movies").style.display = "block";
  appendData(data);
  // console.log("data:", data)
}

let movies_div = document.getElementById("movies");
// let btn=document.getElementById("clickmovies")
function appendData(movies) {
  console.log(movies);
  movies_div.textContent = "";
  movies.forEach(function (el) {
    // let btn = document.createElement("button")
    // btn.addEventListener("click", selectdisply())
    let div = document.createElement("div");
    div.setAttribute("id", "scrolldiv");
    div1 = document.createElement("div");
    div.addEventListener("click", function () {
      selectdisplay(el);
      document.getElementById("movies").style.display = "none";
    });

    let div_img = document.createElement("div");
    div_img.setAttribute("id","movieDiv")
    let p = document.createElement("p");
    let img = document.createElement("img");
    img.setAttribute("class", "image");
    img.setAttribute("src", el.Poster);
    p.innerText = el.Title;

    div_img.append(img);
    div1.append(p);
    div.append(div_img, div1);

    // btn.append(div)
    movies_div.append(div);
  });
}

function selectdisplay(el) {
  document.getElementById("display").textContent = "";
  // console.log(el)
  // movies.forEach(function (el) {
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");
  div2.style.backgroundColor = " #0d1528e6";
  let img = document.createElement("img");
  img.setAttribute("class", "DisplayImage");
  img.setAttribute("src", el.Poster);
  div1.append(img);
  let name = document.createElement("h5");
  name.textContent = `Movie name-${el.Title}`;

  let year = document.createElement("h5");
  year.textContent = `Relesed-${el.Year}`;


  let rating = document.createElement("p");
  rating.setAttribute("id", "rating");
  rating.innerText = Math.round(Math.random() * 9) + 2;

  div2.append(name, year, rating);

  let display = document.getElementById("display");
  display.style.boxShadow = "rgba(149, 157, 165, 0.2) 0px 8px 24px";
  display.append(div1, div2);

}

let timerID;

function debounce(func, delay) {
  if (timerID) {
    clearTimeout(timerID);
  }
  timerID = setTimeout(function () {
    func();
  }, delay);
}



function notFound(){
    document.getElementsByClassName("display2")[0].textContent = "";

    console.log("not found")
    let display = document.getElementsByClassName("display2")[0];

    var div=document.createElement("div")
    div.setAttribute("id",'notfound')
    var img=document.createElement("img")
    img.src="./asset/cute-cat-cry-unscreen.gif"
    var p=document.createElement("h2")
    p.style.fontStyle="italic"
    p.innerText="Movie Not Found"
    p.style.color="red"
    div.append(img,p);

    display.appendChild(div);
    setTimeout(()=>{
        location.reload()
    },2000)

}


function headerExpand(){
    document.getElementsByClassName("head-txt")[0].style.fontSize="30px"
    document.getElementsByClassName("head-img")[0].style.width="50px"
    document.getElementsByClassName("head-img")[0].style.transition="1s"
    document.getElementsByClassName("head-txt")[0].style.transition="1s"
}
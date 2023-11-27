let box = document.querySelector(".box");
let form = document.querySelector(".form");

let api = "http://localhost:3000/data";

async function get() {
  try {
    const response = await fetch(api);
    const data = await response.json();
    getData(data);
  } catch (error) {
    console.error(error);
  }
}

form["file"].onchange = (event) => {
  let file = form["file"].files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  console.log(reader);
  form.onsubmit = async (ev) => {
    ev.preventDefault();

    let obj = {
      name: form["title"].value,
      img: reader.result,
    };
    
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      get();
    } catch (error) {
      console.log(error);
    }
  };
};

function getData(data) {
  box.innerHTML = "";
  data.forEach((el) => {
    let div = document.createElement("div");

    let title = document.createElement("h1");
    title.innerText = el.name;

    let img = document.createElement("img");
    img.src = el.img

    div.append(title,img);
    box.appendChild(div);
  });
}

get();

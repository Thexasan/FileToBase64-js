let API = "http://localhost:3000/data";
let box = document.querySelector(".box");
const fileInp = document.getElementById("fileInp");
const fileInp2 = document.getElementById("fileInp2");
const btn = document.getElementById("btn");
const btn2 = document.getElementById("btn2");
const textInp = document.getElementById("textInp");
const textInp2 = document.getElementById("textInp2");
let dialog = document.querySelector(".dialog");


fileInp.addEventListener("change", (e) => {
  let file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  btn.onclick = async () => {
    try {
      let { data } = await axios.post("http://localhost:3000/data", {
        img: reader.result,
        name: textInp.value,
      });
      get()
    } catch (error) {
      console.log(error);
    }
  };
});

async function get() {
  try {
    const { data } = await axios.get(API);
    getUser(data);
  } catch (error) {
    console.error(error);
  }
}

async function edit(id, user) {
  try {
    const { data } = await axios.put(`${API}/${id}`, user);
    get();
  } catch (error) {
    console.log(error);
  }
}

function editOpen(elem) {
  dialog.showModal();
  fileInp2.value = "";
  textInp2.value = elem.name;

  fileInp2.onchange = (e) => {
    let file = e.target.files[0];
    console.log(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);
    btn2.onclick = () => {
      edit(elem.id, {
        ...elem,
        name: textInp2.value,
        img: reader.result,
      });
    };
  };
}

function getUser(data) {
  box.innerHTML = "";
  data.forEach((e) => {
    let div = document.createElement("div");
    div.className = "cont";
    let p = document.createElement("span");
    let img = document.createElement("img");
    let div2 = document.createElement("div");
    let btn = document.createElement("button");
    btn.innerHTML = "edit";
    btn.onclick = () => {
      editOpen(e);
    };
    img.src = e.img;
    p.innerHTML = e.name;
    div2.append(p, btn);
    div.append(img, div2);

    box.append(div);
  });
}
get();

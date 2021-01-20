const $containerPrincipal = document.querySelector(".container-principal");
const $btnSearch = document.querySelector(".btn-search");
const $inputDate = document.querySelector(".input-date");
const $containerName = document.querySelector(".container-name")
  .firstElementChild;
const $containerDate = document.querySelector(".container-date")
  .firstElementChild;

const $containerImage = document.querySelector(".container-image")
  .firstElementChild;

const $containerDescriptions = document.querySelector(".container-descriptions")
  .firstElementChild;

let timeout = 2000;

let KEY = "deSWKiRXvp1lRs66T7DeNKgv0MVDvIR4cJ4tehDx";

$btnSearch.addEventListener("click", () => {
  if ($inputDate.value === "") {
    swal("¡Debes Ingresar una fecha!", "Vuelve a intentarlo", "error");
  } else {
    let date = $inputDate.value.split("-");
    setTimeout(() => {
      $containerPrincipal.style.opacity = 0;
    }, timeout);
    handlerReq(date);
  }
});

const getData = (arrayDate) => {
  const xhr = new XMLHttpRequest();
  let urlApi = `https://api.nasa.gov/planetary/apod?api_key=${KEY}&date=${arrayDate[0]}-${arrayDate[1]}-${arrayDate[2]}&concept_tags=True`;
  xhr.open("GET", urlApi, true);
  return new Promise((res, rej) => {
    xhr.onreadystatechange = (ev) => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          res(JSON.parse(xhr.responseText));
        } else {
          const newError = new Error(`Ups Error ${urlApi}`);
          rej(newError);
        }
      }
    };
    xhr.send();
  });
};

const handlerReq = async (arrayDate) => {
  let data = await getData(arrayDate);

  $containerName.textContent = `Titulo: ${data.title}`;
  $containerDate.textContent = `Fecha: ${data.date}`;
  $containerImage.setAttribute("src", `${data.url}`);
  $containerDescriptions.textContent = `Descripcion: ${data.explanation}`;
};

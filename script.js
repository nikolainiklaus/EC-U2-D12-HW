const getPrimary = () => {
  let albumMain = document.getElementById("album-outer");
  albumMain.style.display = "none";
  let loadingSpinner = document.getElementById("loading-spinner");
  loadingSpinner.style.display = "flex";
  let albumNode = document.getElementById("album-container");
  albumNode.innerHTML = "";
  let keyword = document.getElementById("search-box").value;
  fetch(`https://api.pexels.com/v1/search?query=${keyword}`, {
    headers: {
      Authorization:
        "Bearer 563492ad6f91700001000001e622eb3fcda44d4eb3621ccce027a259",
    },
  })
    .then((rawPictures) => rawPictures.json())
    .then((images) => {
      renderImages(images.photos);
    })
    .finally(() => {
      setTimeout(() => {
        albumMain.style.display = "flex";
        loadingSpinner.style.display = "none";
      }, "1000");
    })
    .catch((err) => console.err(err));
};

const renderImages = (images) => {
  let albumNode = document.getElementById("album-container");
  for (let image of images) {
    albumNode.innerHTML += ` <div id="${image.id}" class="col-md-4">
    <div class="card mb-4 shadow-sm">
    
    <img class="card-img-top" src="${image.src.large} width="100%" object-fit="cover" height="225" alt="Card image cap">
      <div class="card-body">
        <p class="card-text">
          This is a wider card with supporting text below as a natural
          lead-in to additional content. This content is a little bit
          longer.
        </p>
        <div
          class="d-flex justify-content-between align-items-center"
        >
          <div class="btn-group">
            <button
            onclick="renderModal(${image.id})"
            type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg"
              class="btn btn-sm btn-outline-secondary"
            >
              View
            </button>
            <button
            onclick="hideCard(${image.id})"
              type="button"
              class="btn btn-sm btn-outline-secondary"
            >
              Hide
            </button>
          </div>
          <small class="text-muted">${image.id}</small>
        </div>
      </div>
    </div>
  </div>`;
  }
};

const hideCard = (id) => {
  console.log(id);
  var card = document.getElementById(id);
  console.log(card);
  card.style.display = "none";
};

const fetchForestImgs = () => {
  let albumNode = document.getElementById("album-outer");
  albumNode.style.display = "none";
  fetch(`https://api.pexels.com/v1/search?query=forest`, {
    headers: {
      Authorization:
        "Bearer 563492ad6f91700001000001e622eb3fcda44d4eb3621ccce027a259",
    },
  })
    .then((response) => response.json())
    .then((data) => data.photos)
    .then((data) => {
      // Get the carousel elements

      const indicators = document.querySelector(".carousel-indicators");
      const slides = document.querySelector(".carousel-inner");

      // Loop through the images and add them to the carousel
      for (let i = 0; i < data.length; i++) {
        const image = data[i];
        console.log(image);

        // Create an indicator for the image
        const indicator = document.createElement("li");
        indicator.setAttribute("data-target", "#carouselExampleIndicators");
        indicator.setAttribute("data-slide-to", i);
        indicators.appendChild(indicator);

        // Create a slide for the image
        const slide = document.createElement("div");
        slide.classList.add("carousel-item");
        if (i === 0) {
          slide.classList.add("active");
        }
        slide.innerHTML = `<img src="${image.src.large}" class="d-block w-100">`;
        slides.appendChild(slide);
      }
    })
    .catch((error) => console.error(error));
};

const renderModal = (image) => {
  let modalNode = document.getElementById("modal-inner");
  fetch(`https://api.pexels.com/v1/photos/${image}`, {
    headers: {
      Authorization:
        "Bearer 563492ad6f91700001000001e622eb3fcda44d4eb3621ccce027a259",
    },
  })
    .then((response) => response.json())
    .then((image) => {
      modalNode.innerHTML = `<img width="100%" height="400px"
  src="${image.src.large}"
  " alt=""> `;
    });
};

window.onload = fetchForestImgs;

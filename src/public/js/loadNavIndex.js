// loadNav.js
fetch('/pages/admin/navIndex.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la carga del navbar');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('navbar-container-index').innerHTML = data;
    })
    .catch(error => console.error('Error al cargar el navbar:', error));


    document.addEventListener('DOMContentLoaded', () => {
  const slidesEl = document.querySelector('.slides');
  const slides   = Array.from(slidesEl.children);
  const prevBtn  = document.querySelector('.prev');
  const nextBtn  = document.querySelector('.next');
  const total    = slides.length;
  let index      = 0;

  function update() {
    // desplaza el grupo de slides
    slidesEl.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + total) % total;
    update();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % total;
    update();
  });

  // Opcional: avanzar automáticamente cada 5s
  // setInterval(() => {
  //   index = (index + 1) % total;
  //   update();
  // }, 5000);
});

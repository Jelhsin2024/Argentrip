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

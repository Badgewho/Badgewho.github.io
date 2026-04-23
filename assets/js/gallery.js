document.addEventListener('DOMContentLoaded', () => {
  const viewer = document.querySelector('[data-gallery-viewer]');
  if (!viewer) return;

  const mainImage = viewer.querySelector('[data-gallery-main]');
  const thumbnails = Array.from(viewer.querySelectorAll('[data-gallery-thumb]'));
  const prevButton = viewer.querySelector('[data-gallery-prev]');
  const nextButton = viewer.querySelector('[data-gallery-next]');

  if (!mainImage || thumbnails.length === 0) return;

  let currentIndex = 0;

  const render = (index, options = { scrollThumb: true }) => {
    currentIndex = (index + thumbnails.length) % thumbnails.length;
    const current = thumbnails[currentIndex];
    const image = current.getAttribute('data-gallery-image');
    const alt = current.getAttribute('data-gallery-alt') || '';

    if (image) {
      mainImage.src = image;
      mainImage.alt = alt;
    }

    thumbnails.forEach((thumb, idx) => {
      thumb.classList.toggle('is-active', idx === currentIndex);
    });

    if (options.scrollThumb) {
      current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      render(index);
    });
  });

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      render(currentIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      render(currentIndex + 1);
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      render(currentIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      render(currentIndex + 1);
    }
  });

  render(0, { scrollThumb: false });
});

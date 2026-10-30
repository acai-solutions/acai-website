// Preloader js
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');

  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 100);
  }
});


// product Slider
// $('.product-image-slider').slick({
//   autoplay: false,
//   infinite: true,
//   arrows: false,
//   dots: true,
//   customPaging: function (slider, i) {
//     var image = $(slider.$slides[i]).data('image');
//     return '<img class="img-fluid" src="' + image + '" alt="product-image">';
//   }
// });


const withCarousel = document.body.classList.contains('__with-carousel');

if (withCarousel) {
  window.addEventListener('load', function(){
    // https://glidejs.com/docs/
    // https://github.com/glidejs/glide
    // https://github.com/glidejs/glide/issues/202
    const sliders = document.querySelectorAll('.glide');

    sliders.forEach(item => {
      new Glide(item, {
        type: 'carousel',
        autoplay: 5000,
        hoverpause: true,
      }).mount();
    });
  });
}


// https://app.websitepolicies.com/policies/create/cookie-consent-banner
window.addEventListener("load", function () {
  window.wpcb.init({
    border: "thin",
    colors: {
      popup: { background: "#222222", text: "#ffffff", border: "#b3d0e4" },
      button: { background: "#b3d0e4", text: "#000000" },
    },
    corners: "normal",
    transparency: "5",
    position: "bottom-right",
    content: {
      message: document.getElementById("js_cookieconsent_message").value,
      link: document.getElementById("js_cookieconsent_policy_link").value,
      href: document.getElementById("js_cookieconsent_href").value,
      button: document.getElementById("js_cookieconsent_dismiss_btn").value,
    },
  });
});


// Copy article link and show a message
function copyURL(url) {
  navigator.clipboard.writeText(url)
    .then(() => {
      const alertElement = document.querySelector(".alert");
      alertElement.style.display = "block";

      setTimeout(() => {
        alertElement.style.display = "none";
      }, 2000);
    })
    .catch((error) => {
      console.error("Unable to copy to clipboard", error);
    });
}

const copyLinkBtn = document.querySelectorAll('.copy-link-element');

copyLinkBtn.forEach(el => el.addEventListener('click', event => {
  copyURL(url = el.getAttribute('data-value'));
}));

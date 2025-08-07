

/*     a11y: false, */
let scrollWidthFunc = () => {
  let scrollWidth = window.innerWidth - document.body.clientWidth;
  document.querySelector("html").style.paddingRight = scrollWidth + "px";
  document.querySelector("header").style.paddingRight = scrollWidth + "px";
};

document.addEventListener("DOMContentLoaded", function () {


  /* Mask phone */
  [].forEach.call(
    document.querySelectorAll("input[type=tel]"),
    function (input) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
        }
        let reg = matrix
          .substr(0, this.value.length)
          .replace(/_+/g, function (a) {
            return "\\d{1," + a.length + "}";
          })
          .replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (
          !reg.test(this.value) ||
          this.value.length < 5 ||
          (keyCode > 47 && keyCode < 58)
        )
          this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    }
  );
  /* End Mask phone */

  // Popups
  function popupClose(popupActive) {
    popupActive.classList.remove("open");
    document.body.classList.remove("lock");
    document.querySelector("html").removeAttribute("style");
    document.querySelector("html").classList.remove("lock");
    document.querySelector("header").removeAttribute("style");
  }
  const popupOpenBtns = document.querySelectorAll(".popup-btn");
  const popups = document.querySelectorAll(".popup");
  const originalTitlePopup2 =
    document.querySelector(".original-title").innerHTML;
  const closePopupBtns = document.querySelectorAll(".close-popup");
  closePopupBtns.forEach(function (el) {
    el.addEventListener("click", function (e) {
      popupClose(e.target.closest(".popup"));
    });
  });
  popupOpenBtns.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const path = e.currentTarget.dataset.path;
      const currentPopup = document.querySelector(`[data-target="${path}"]`);
      if (currentPopup) {
        popups.forEach(function (popup) {
          popupClose(popup);
          popup.addEventListener("click", function (e) {
            if (!e.target.closest(".popup__content")) {
              popupClose(e.target.closest(".popup"));
            }
          });
        });
        currentPopup.classList.add("open");
        if (currentPopup.getAttribute("data-target") == "popup-change") {
          let originaTitle = currentPopup.querySelector(".original-title");
          if (el.classList.contains("change__item-btn")) {

            if (el.classList.contains("change__item-btn_current")) {
              originaTitle.textContent = el.textContent;
            } else {
              let currentItem = el.closest(".change__item-title");
              let currentTitile = currentItem.querySelector(".current-title");
              originaTitle.innerHTML = currentTitile.innerHTML;
            }

          } else {
            originaTitle.innerHTML = originalTitlePopup2;
          }
        }
        scrollWidthFunc();
        document.querySelector("html").classList.add("lock");
      }
    });
  });
  /* end popups */

  /* animation */
  const animationItems = document.querySelectorAll(".animation-item");
  if (animationItems.length > 0) {
    function onEntry(e) {
      e.forEach((e) => {
        e.isIntersecting && e.target.classList.add("animation-active");
      });
    }
    let options = {
      threshold: [0.5],
    },
      observer = new IntersectionObserver(onEntry, options);
    for (let e of animationItems) observer.observe(e);
  }
  /* end animation */


  const burgerMenu = document.querySelector(".burger");
  if (burgerMenu) {
    const headerMobile = document.querySelector(".header__wrapper");
    const header = document.querySelector(".header");
    burgerMenu.addEventListener("click", () => {
      if (burgerMenu.classList.contains("active")) {
      } else {
        let height = header.offsetHeight;
        let topPos = header.getBoundingClientRect().top + window.scrollY;
        headerMobile.style.maxHeight = "calc(150vh - " + height + "px)";
      }
      headerMobile.classList.toggle("active");
      burgerMenu.classList.toggle("active");
      header.classList.toggle("active");
      document.querySelector("html").classList.toggle("burger-lock");
    });
  }

  /* Custom Select */
  const customSelects = document.querySelectorAll('.custom-select');

  customSelects.forEach(select => {
    const header = select.querySelector('.custom-select__header');
    const dropdown = select.querySelector('.custom-select__dropdown');
    const options = select.querySelectorAll('.custom-select__option');
    const placeholder = select.querySelector('.custom-select__placeholder');
    const hiddenInput = select.querySelector('.custom-select__input');


    header.addEventListener('click', (e) => {
      e.stopPropagation();


      customSelects.forEach(otherSelect => {
        if (otherSelect !== select) {
          otherSelect.classList.remove('active');
        }
      });


      select.classList.toggle('active');
    });


    options.forEach(option => {
      option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        const text = option.textContent;


        options.forEach(opt => opt.classList.remove('selected'));

        option.classList.add('selected');

        placeholder.textContent = text;
        hiddenInput.value = value;

        select.classList.remove('active');
        select.classList.add('has-value');
      });
    });
  });


  document.addEventListener('click', () => {
    customSelects.forEach(select => {
      select.classList.remove('active');
    });
  });
  /* End Custom Select */

  /* Header scroll effect */
  const header = document.querySelector('.header');

  function handleScroll() {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);

  handleScroll();

  /* End Header scroll effect */

  /* Range value update */
  const rangeInput = document.getElementById('size');
  const rangeValue = document.querySelector('.order-range-value');

  function updateRangeValue() {
    if (rangeInput && rangeValue) {
      rangeValue.textContent = rangeInput.value + '%';

      // Динамическое обновление градиента
      const value = rangeInput.value;
      const gradient = `linear-gradient(to right, #00C4F7 0%, #00C4F7 ${value}%, rgba(255, 255, 255, 0.3) ${value}%, rgba(255, 255, 255, 0.3) 100%)`;
      console.log(gradient);
      rangeInput.style.background = gradient;
    }
  }

  // Initialize the range value and add event listener
  if (rangeInput) {
    updateRangeValue();
    rangeInput.addEventListener('input', updateRangeValue);
  }
  /* End Range value update */

  /* File upload handling */
  const customFileUpload = document.querySelector('.custom-file-upload');
  const fileInput = document.getElementById('file-upload');
 
  if (customFileUpload && fileInput) {
    /* Отслеживаем выбор файла */
    fileInput.onchange = () => {
      /* Показываем название выбранного файла */
      customFileUpload.textContent = fileInput.files.length ? fileInput.files[0].name : 'Прикрепить файл';
    };
  }
  /* End File upload handling */

});






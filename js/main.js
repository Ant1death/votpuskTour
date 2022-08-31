// document.onreadystatechange = function() {
//     if (document.readyState === "interactive") {

//     }
// }
// $(window).on('load', () => {
window.addEventListener("load", function () {
  // 11.11.21
  // перенос поиска на мобайле
  const formSearch = document.getElementById("ya-site-form0");
  const navigationMenu = document.querySelector(".menu");
  document.documentElement.clientWidth <= 500 && formSearch && navigationMenu && navigationMenu.insertAdjacentElement("beforeend", formSearch);

  // variables
  // selecror
  // /selecror
  // /variables
  // ----------------------------------------------
  // universal function

  //  /universal function
  // ----------------------------------------------
  // event
  // поведения placeholder при фокусе
  function mechanicalBehaviorInput(input) {
    if (document.documentElement.clientWidth >= 1200) {
      input.placeholder = "";
      input.addEventListener("focus", () => {
        input
          .closest(".calculator-route__input")
          .querySelector(".calculator-route__input-placeholder")
          .classList.add("calculator-route__input-placeholder--active");
      });
      input.addEventListener("blur", () => {
        if (!input.value)
          input
          .closest(".calculator-route__input")
          .querySelector(".calculator-route__input-placeholder")
          .classList.remove("calculator-route__input-placeholder--active");
      });
    } else {
      input.closest(".calculator-route__input").querySelector(".calculator-route__input-placeholder").remove();
    }
  }
  for (const input of document.querySelectorAll(".calculator-route__min-input")) {
    mechanicalBehaviorInput(input);
  }
  for (const input of document.querySelectorAll(".calculator-route__big-input")) {
    mechanicalBehaviorInput(input);
  }
  // Липкие хлебные крошки
  function breadcrumbsLogic() {
    if (
      document.querySelector(".breadcrumbs-wrapper").getBoundingClientRect().top + document.querySelector(".breadcrumbs-wrapper").clientHeight <
      0
    ) {
      document.querySelector(".aside-wrapper").style.paddingTop =
        document.querySelector(".breadcrumbs-wrapper").clientHeight +
        parseFloat(getComputedStyle(document.querySelector(".aside-wrapper")).marginTop) +
        "px";
      document.querySelector(".breadcrumbs-wrapper").classList.add("breadcrumbs-wrapper--fixed");
    }
    if (document.querySelector(".aside-wrapper").getBoundingClientRect().top >= 0) {
      document.querySelector(".aside-wrapper").style.paddingTop = "";
      document.querySelector(".breadcrumbs-wrapper").classList.remove("breadcrumbs-wrapper--fixed");
    }
  }
  if (document.querySelector(".breadcrumbs-wrapper")) {
    window.addEventListener("scroll", breadcrumbsLogic);
    breadcrumbsLogic();
  }

  // Открыть/закрыть меню
  let menu = document.querySelector(".menu");
  let hamburger = document.querySelector(".burger");

  const toggleMenu = () => {
    menu.classList.toggle('menu--open');
    hamburger.classList.toggle('burger--open');
  }

  hamburger.addEventListener('click', e => {
    e.stopPropagation();

    toggleMenu();
  });

  document.addEventListener('click', e => {
    let target = e.target;
    let its_menu = target === menu || menu.contains(target);
    let its_hamburger = target === hamburger;
    let menu_is_active = menu.classList.contains('menu--open');

    if (!its_menu && !its_hamburger && menu_is_active) {
      toggleMenu();
    }
  })

  document.querySelector("body").addEventListener("click", (e) => {
    // 19.11.21
    if (e.target.closest('[data-evnt="add-ln"]')) {
      $(e.target.closest('[data-evnt="add-ln"]')).parent().remove()
      $('[data-evnt="hdd-ln"]').removeClass('null')
    }
    // 29.10.21
    // Переключения таба в калькуляторе
    if (e.target.closest(".calculator-route__tab")) {
      for (const tab of document.querySelectorAll(".calculator-route__tab")) {
        tab.classList.remove("calculator-route__tab--active");
      }
      e.target.closest(".calculator-route__tab").classList.toggle("calculator-route__tab--active");
      for (const line of document.querySelectorAll(".calculator-route__line")) {
        line.dataset.lineType !== e.target.closest(".calculator-route__tab").dataset.lineType ?
          line.classList.add("calculator-route__line--hidden") :
          line.classList.remove("calculator-route__line--hidden");
      }
    }

    // if (document.documentElement.clientWidth <= 700) {
    //   // document.querySelector(".main").style.paddingTop = document.querySelector(".main").style.paddingTop ?
    //   //   "" :
    //   //   document.querySelector(".header").clientHeight + "px";
    //   // document.querySelector(".header").classList.toggle("header--fixed");
    //   // document.querySelector("body").classList.toggle("block");
    // }

    // Кат пунктов меню на мобайле
    if (e.target.closest(".menu__column") && document.documentElement.clientWidth <= 700) {
      const $links = e.target.closest(".menu__column").querySelector(".menu__column-links");
      for (const links of document.querySelectorAll(".menu__column-links")) {
        if (links.style.height !== "" && $links !== links) links.style.height = "";
      }
      console.log($links.style.height);
      $links.style.height = $links.style.height === "" ? $links.scrollHeight + "px" : "";
    }

    // Плавный скрол к якорю
    if (e.target.closest('a[href*="#"]') && e.target.closest('.hotel-top-sticky')) {
      e.preventDefault();
      let href = e.target.closest('a[href*="#"]').getAttribute("href").substring(1);
      const scrollTarget = document.getElementById(href);
      let topOffset = document.querySelector(".breadcrumbs") ? document.querySelector(".breadcrumbs").offsetHeight + 20 : 20;
      if (e.target.closest('.hotel-page-anchor') && document.querySelector('.hotel-menu__content')) {
        topOffset = document.querySelector('.hotel-menu__content').offsetHeight
      }

      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;
      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    // Показать выпадашку профиля
    if (e.target.closest(".header__profile")) {
      document.querySelector(".header__profile-modal").classList.toggle("header__profile-modal--open");
    } else {
      document.querySelector(".header__profile-modal") &&
        document.querySelector(".header__profile-modal").classList.remove("header__profile-modal--open");
    }

    // вверх в крошках
    if (e.target.closest(".breadcrumbs__arrow")) {
      $("html, body").animate({
        scrollTop: 0
      }, 500);
    }

    // таб по Континенту\алфавиту
    if (e.target.closest("[data-type-tab]")) {
      const $tab = $(e.target.closest("[data-type-tab]"));
      $("[data-type-tab]").removeClass("active");
      $tab.addClass("active");
      $("[data-type-block]").addClass("hidden");
      $(`[data-type-block="${$tab.data("type-tab")}"]`).removeClass("hidden");
    }

    // Переключатель категорий / субкатегорий
    if (e.target.closest(".category-item")) {
      const category = e.target.closest(".category-item");
      for (const tag of document.querySelectorAll(".category-item")) {
        tag.classList.remove("active");
      }
      category.classList.add("active");
      for (const tag of document.querySelectorAll(".subcategory-item")) {
        tag.classList.add("hidden");
      }
      const subcategory = document.querySelector(`.subcategory-item[data-number-subcategory="${category.dataset.numberCatogory}"]`);
      console.log(category.dataset.numberCatogory);
      subcategory.classList.remove("hidden");
      setTimeout(() => {
        subcategory.classList.add("visible");
      }, 10);
    }

    // Поменять местами пункты назначеия
    if (e.target.closest(".calculator-route__swap")) {
      e.preventDefault();
      if (!(document.getElementById("from").value && document.getElementById("to").value)) {
        alert("не введены точки отправления и/или назначения");
      } else {
        let buffer = $("#from")[0].value;
        $("#from")[0].value = $("#to")[0].value;
        $("#to")[0].value = buffer;

        buffer = $(".calculator-route__input #w1")[0].value;
        $(".calculator-route__input #w1")[0].value = $(".calculator-route__input #w0")[0].value;
        $(".calculator-route__input #w0")[0].value = buffer;
      }
    }

    // показать еще 20 пунктов
    if (e.target.closest("[data-event-mr-lnk]")) {
      let isMore = false;
      document.querySelectorAll(".recommendation__element.hidden").forEach((item, index) => {
        index < 20 ? item.classList.remove("hidden") : (isMore = true);
      });
      !isMore && e.target.closest("[data-event-mr-lnk]").remove();
    }

    // 18.10.21
    // больше текста landmark-text
    if (e.target.closest("[data-event-lndmrk-mr]")) {
      const button = e.target.closest("[data-event-lndmrk-mr]");
      const buttonText = button.querySelector("[data-event-lndmrk-mr-txt]");

      button.classList.toggle("active");
      e.target.closest(".landmark-info").querySelector(".landmark-info__text.short").classList.toggle("open");
      buttonText.textContent = button.dataset.textEnd === buttonText.textContent ? button.dataset.textBegin : button.dataset.textEnd;
    }
  });

  let checkEventOn = false;
  if (document.querySelector("#search_form")) {
    document.querySelector("#search_form").onsubmit = (e) => {
      if (!(document.getElementById("from").value && document.getElementById("to").value)) {
        e.preventDefault();
        !checkEventOn && alert("не введены точки отправления и/или назначения");
        checkEventOn = true;
        setTimeout(() => {
          checkEventOn = false;
        }, 100);
      }
    };
  }

  // 03.11.21
  // показать еще 20 пунктов (нужна ли надпись)
  console.log();
  $(".recommendation__element").length > 20 && $("[data-event-mr-lnk]").removeClass("hidden");

  // forms

  // /forms

  // /event
  // ----------------------------------------------
  // unique function
  // /unique function
  // ----------------------------------------------
  // Page load
  // lazy loading для всех iframe
  for (const frame of document.querySelectorAll(".iframe")) {
    let atributesString = "";
    for (const atribute of frame.attributes) {
      if (atribute.name !== "class" && atribute.name !== "data-src")
        atributesString += `${atribute.name}${atribute.value ? `="${atribute.value}"` : ""} `;
    }
    setTimeout(() => {
      frame.classList.remove("iframe");
      frame.insertAdjacentHTML(
        "afterend",
        `
		        <iframe 
                    class="${frame.classList.value}"
                    src="${frame.dataset.src}"
                    ${atributesString}
		        ></iframe>
	        `
      );
      frame.remove();
    }, 1000);
  }
  // всегда правильная высота экрана на мобайлах
  function viewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  document.documentElement.clientWidth <= 700 && (window.addEventListener("resize", viewportHeight), viewportHeight());

  $(".calculator-route__swap").addClass("active");
  $(".calculator-route__submit.main").addClass("active");
  for (const placeholder of document.querySelectorAll(".calculator-route__input-placeholder")) {
    if (placeholder.closest(".calculator-route__input").querySelector("input").value) {
      placeholder.classList.add("active");
      placeholder.classList.add("calculator-route__input-placeholder--active");
    } {
      placeholder.classList.add("active");
    }
  }

  //********************** */

  // /Page load
});
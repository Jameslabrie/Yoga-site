window.addEventListener("DOMContentLoaded", function () {
  "use strict";

  let tab = document.querySelectorAll(".info-header-tab"),
    info = document.querySelector(".info-header"),
    tabContent = document.querySelectorAll(".info-tabcontent");

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove("show");
      tabContent[i].classList.add("hide");
    }
  }
  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains("hide")) {
      tabContent[b].classList.remove("hide");
      tabContent[b].classList.add("show");
    }
  }

  info.addEventListener("click", function (event) {
    let target = event.target;

    if (target && target.classList.contains("info-header-tab")) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  // Timer

  let deadline = "2023-01-26";

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());

    let seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor(t / 1000 / 60 / 60);

    return {
      total: t,
      seconds: seconds,
      minutes: minutes,
      hours: hours,
    };
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      hours = timer.querySelector(".hours"),
      minutes = timer.querySelector(".minutes"),
      seconds = timer.querySelector(".seconds"),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);

      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock("timer", deadline);

  // Modal window

  let more = document.querySelector(".more"),
    overlay = document.querySelector(".overlay"),
    close = document.querySelector(".popup-close");

  more.addEventListener("click", function () {
    overlay.style.display = "block";
    this.classList.add("more-splash");
    document.body.style.overflow = "hidden";
  });

  close.addEventListener("click", function () {
    overlay.style.display = "none";
    more.classList.remove("move-splash");
    document.body.style.overflow = "";
  });

  // Modal Window Request

  let message = {
    loading: "Идет загрузка...",
    success: "Спасибо! Мы скоро с Вами свяжемся.",
    failure: "Ошибка",
  };

  let form = document.querySelector(".main-form"),
    input = form.getElementsByTagName("button"),
    statusMessage = document.createElement("div");

  statusMessage.classList.add("status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest();

    request.open("POST", "server.php");
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");

    let formData = new FormData(form);

    let obj = {};

    formData.forEach(function (key, value) {
      obj[key] = value;
    });

    let json = JSON.stringify(obj);
    request.send(json);

    request.addEventListener("readystatechange", function () {
      if (request.readyState === 4 && request.status == 200) {
        statusMessage.innerHTML = message.success;
      } else if (request.readyState < 4) {
        statusMessage.innerHTML = message.loading;
      } else {
        statusMessage.innerHTML = message.failure;
      }
    });

    for (let i = 0; i < input.length; i++) {
      input[i] = "";
    }
  });

  //Contanct-form request

  let messageContactForm = {
    loading: "Идет загрузка...",
    success: "Спасибо! Мы скоро с Вами свяжемся.",
    failure: "Ошибка",
  };

  let contactForm = document.getElementById("form"),
    inputContactForm = contactForm.getElementsByTagName("button"),
    statusMessageContactForm = document.createElement("div");

  statusMessageContactForm.classList.add("status");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    contactForm.appendChild(statusMessageContactForm);

    let requestContactForm = new XMLHttpRequest();

    requestContactForm.open("POST", "server.php");
    requestContactForm.setRequestHeader(
      "Content-type",
      "application/json; charset=utf-8"
    );

    let formData2 = new FormData(form);

    let obj = {};

    formData2.forEach(function (key, value) {
      obj[key] = value;
    });

    let json = JSON.stringify(obj);
    requestContactForm.send(json);

    requestContactForm.addEventListener("readystatechange", function () {
      if (
        requestContactForm.readyState === 4 &&
        requestContactForm.status == 200
      ) {
        statusMessageContactForm.innerHTML = messageContactForm.success;
      } else if (requestContactForm.readyState < 4) {
        statusMessageContactForm.innerHTML = messageContactForm.loading;
      } else {
        statusMessageContactForm.innerHTML = messageContactForm.failure;
      }
    });

    for (let i = 0; i < inputContactForm.length; i++) {
      inputContactForm[i] = "";
    }
  });

  // Slider

  let sliderIndex = 1,
    slides = document.querySelectorAll(".slider-item"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    dotsWrap = document.querySelector(".slider-dots"),
    dots = document.querySelectorAll(".dot");

  showSlides(sliderIndex);

  function showSlides(n) {
    if (n > slides.length) {
      sliderIndex = 1;
    }
    if (n < 1) {
      sliderIndex = slides.length;
    }
    slides.forEach((item) => (item.style.display = "none"));

    dots.forEach((item) => item.classList.remove("dot-active"));

    slides[sliderIndex - 1].style.display = "block";
    dots[sliderIndex - 1].classList.add("dot-active");
  }

  function plusSlides(n) {
    showSlides((sliderIndex += n));
  }

  function currentSlides(n) {
    showSlides((sliderIndex = n));
  }

  prev.addEventListener("click", function () {
    plusSlides(-1);
  });

  next.addEventListener("click", function () {
    plusSlides(1);
  });

  dotsWrap.addEventListener("click", function (event) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (
        event.target.classList.contains("dot") &&
        event.target == dots[i - 1]
      ) {
        currentSlides(i);
      }
    }
  });

  // Calc

  let persons = document.querySelectorAll(".counter-block-input")[0],
    restDays = document.querySelectorAll(".counter-block-input")[1],
    place = document.getElementById("select"),
    totalValue = document.getElementById("total"),
    personsSum = 0,
    daysSum = 0,
    total = 0;

  totalValue.innerHTML = 0;
  persons.addEventListener("change", function () {
    personsSum = +this.value;
    total = (personsSum + daysSum) * 4000;

    if (restDays.value == "" || persons.value == "") {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  });

  restDays.addEventListener("change", function () {
    daysSum = +this.value;
    total = (personsSum + daysSum) * 4000;

    if (restDays.value == "" || persons.value == "") {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  });

  place.addEventListener("change", function () {
    if (restDays.value == "" || persons.value == "") {
      totalValue.innerHTML = 0;
    } else {
      let a = total;
      totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
  });
});

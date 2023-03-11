// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import logoAmazingEvents from "url:../../assets/logo-Amazing-Events.png";

export const renderNavigation = () => {
    const navLinks = [{
        name: "Home",
        alt: "Amazing Events",
        url: "./index.html",
        state: true,
        show: true,
        carouselStatic: false,
        onCarousel: ["Home", "Upcomming Events", "Past Events", "Contact"],
        carouselStatic: false,
    }, {
        name: "Upcomming Events",
        alt: "Upcomming Events",
        url: "./upcomming.html",
        state: false,
        show: true,
        carouselStatic: true,
        onCarousel: ["Home", "Upcomming Events", "Past Events", "Contact"],
        carouselStatic: true,
    }, {
        name: "Past Events",
        alt: "Past Events",
        url: "./past.html",
        state: false,
        show: true,
        carouselStatic: true,
        onCarousel: ["Home", "Upcomming Events", "Past Events", "Contact"],
        carouselStatic: true,
    }, {
        name: "Contact",
        alt: "Contact Us",
        url: "./contact.html",
        state: false,
        show: true,
        carouselStatic: true,
        onCarousel: ["Home", "Upcomming Events", "Past Events", "Contact"],
        carouselStatic: true,
    }, {
        name: "Stats",
        alt: "Statistical Info",
        url: "./stats.html",
        state: false,
        show: true,
        carouselStatic: true,
        onCarousel: ["Home", "Upcomming Events", "Past Events", "Contact", "Stats"],
        carouselStatic: true,
    }, {
        name: "Details",
        alt: "About this Event",
        url: "./details.html",
        state: false,
        show: false,
        onCarousel: ["Home", "Upcomming Events", "Past Events", "Contact", "Details"],
        carouselStatic: true,
    }, {
        name: "Component",
        alt: "New Componet",
        url: "./newComponent.html",
        state: false,
        show: false,
        onCarousel: ["Home", "Upcomming Events", "Past Events", "Contact", "Component"],
        carouselStatic: false,
    }];

    const actual = window.location.href;
    navLinks.forEach(link => { link.state = actual.includes(link.url.slice(1)) });

    // console.log(navLinks);

    let navBar = `<div class="container">
                    <a class="navbar-brand" href="./index.html">
                        <img src=${logoAmazingEvents} alt="Amazing Events Logo">
                    </a>
                    <button class="navbar-toggler ms-auto" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" 
                        aria-controls="navbarNavDropdown" 
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav ms-auto">`;
    navLinks.forEach(link => {
        if (link.show && link.state) {
            navBar += `<li class="nav-item">
            <a class="nav-link active px-4" aria-current="page" href="#">${link.name}</a>
        </li>`;
        } else if (link.show && !link.state) {
            navBar += `<li class="nav-item">
            <a class="nav-link px-4" href="${link.url}">${link.name}</a>
        </li>`
        }
    });
    navBar += "</ul></div></div>";
    document.getElementById("nav").innerHTML = navBar;

    let carouselMode = { on: "carousel", pause: false };
    let dataCarouselPause = "true";
    const carousel = document.getElementById("carousel");

    let carouselInner = `<div class="carousel-inner">`;
    let carouselActual = navLinks.find(link => link.state);

    if (!carouselActual.carouselStatic) {
        carousel.setAttribute("data-bs-ride", carouselMode.on);
    } else {
        carousel.setAttribute("data-bs-ride", carouselMode.pause);
        carousel.setAttribute("data-bs-pause", dataCarouselPause);
    }
    console.log(carousel);

    navLinks.forEach(link => {
        if (carouselActual.onCarousel.includes(link.name)) {
            carouselInner += `
        <div class="carousel-item ${link.state ? "active" : ""}">
            <a href="${link.state ? "#" : link.url}" class="carouselNow d-block w-100">
                <h2>${(!link.state && link.name == "Home") ? "Home" : link.alt}</h2>
            </a>
        </div>`
        }
    });
    carouselInner += `                                 
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>`;

    carousel.innerHTML = carouselInner;
}

renderNavigation();



// Rendering events Showcase con resultado de búsquedas:

export function renderShowCase(filteredEvents, selector) {
    const cardShow = document.getElementById(selector);
    cardShow.innerHTML = "";
    // console.log(currentDate);
    for (let event of filteredEvents) {
        const card = createCard(event);
        cardShow.appendChild(card);
        console.log(event.date, event.category);
    }
}

// Render card function
function createCard(event) {
    // card
    let s_card = document.createElement('div');
    s_card.classList.add('s-card');
    let card = document.createElement("div");
    card.classList.add("card", "m-4", "text-bg-dark", "text-center", "rgb");
    // card image
    let img = document.createElement("img");
    img.src = event.image;
    img.alt = `${event.name} picture`
    img.classList.add("card-image");
    // card body
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = event.name;
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = event.description;
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    // card footer
    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "shadow");
    const cardFooterContent = document.createElement("div");
    cardFooterContent.classList.add("d-flex", "justify-content-around");
    const eventPrice = document.createElement("p");
    eventPrice.innerText = `Price: $${event.price}`;
    const more = document.createElement("a");
    more.classList.add("btn", "btn-primary", "card-btn", "shadow");
    more.innerText = "Tell me more";
    more.href = "./details.html";
    more.setAttribute("id", event._id);
    cardFooterContent.appendChild(eventPrice);
    cardFooterContent.appendChild(more);
    cardFooter.appendChild(cardFooterContent);
    // Armado del card
    card.appendChild(img);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    s_card.appendChild(card);
    return s_card;
}

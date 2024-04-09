document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const pagination = document.querySelector('.slider-pagination');

    slides.forEach((slide, index) => {
        const bullet = document.createElement('span');
        bullet.classList.add('bullet');
        if (index === 0) {
            bullet.classList.add('active');
        }
        bullet.addEventListener('click', () => {
            goToSlide(index);
        });
        pagination.appendChild(bullet);
    });

    let currentSlide = 0;

    function goToSlide(index) {
        slides[currentSlide].style.display = 'none';
        slides[index].style.display = 'block';
        document.querySelector('.slider-pagination .active').classList.remove('active');
        document.querySelectorAll('.slider-pagination span')[index].classList.add('active');
        currentSlide = index;
    }

    // Autoplay functionality
    function autoplay() {
        if (currentSlide === 0) {
            goToSlide((currentSlide + 1) % slides.length);
            setTimeout(autoplay, 2000);
        } else {
            goToSlide((currentSlide + 1) % slides.length);
            setTimeout(autoplay, 2500);
        }
    }

    autoplay();
});


let bagItems;
onLoad();

function onLoad(){
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayItemsOnHomePage();
    displayBagIcon();
}


function addToBag(itemId) {
    bagItems.push(itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    displayBagIcon();
}

function displayBagIcon(){
    let bagItemCountElement = document.querySelector('.bag-item-count');
    if (bagItems.length > 0){
        bagItemCountElement.style.visibility = 'visible';
        bagItemCountElement.innerText = bagItems.length;
    }else{
        bagItemCountElement.style.visibility = 'hidden';
    }
}

function displayItemsOnHomePage() {
    let itemsContainerElement = document.querySelector('.items-container');
    let innerHtml = '';
    if (!itemsContainerElement){
        return;
    }
    items.forEach(items => {
        innerHtml += `
    <div class="item-container">
        <img class = "item-image" src="${items.image}" alt="item image">
        <div class="rating">
            ${items.rating.stars} ⭐ | ${formatRatingCount(items.rating.count)} reviews <!-- Apply formatting here -->
        </div>
        <div class="company-name">${items.company}</div>
        <div class="item-name">${items.item_name}</div>
        <div class="price">
            <span class="current-price">Rs ${items.current_price}</span>
            <span class="original-price">Rs ${items.original_price}</span>
            <span class="discount">(${items.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-add-bag" onclick="addToBag(${items.id})">Add to Bag</button>
    </div>`
    });

    itemsContainerElement.innerHTML = innerHtml;
}

function formatRatingCount(count) {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
    } else {
        return count;
    }
}

let allProducts = []

async function fetchData() {
    try {
        const response = await fetch('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093');
        const responseData = await response.json();
        if (responseData.data && Array.isArray(responseData.data)) {
            allProducts = responseData.data;
            displayProducts(allProducts);
        } else {
            console.error('Invalid data format:', responseData);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData()

function displayProducts(products) {
    console.log(products);
    const container = document.getElementById('productContainer');
    container.innerHTML = '';

    if (Array.isArray(products)) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            // creating a container for badge and image
            const badgeImageContainer = document.createElement('div');

            badgeImageContainer.classList.add('badge-image-container');

            // creating an span element for badge
            const badge = document.createElement('span');
            badge.innerText = product.product_badge;

            badgeImageContainer.appendChild(badge);

            // creating a image element
            const image = document.createElement('img');
            image.src = product.product_image;
            console.log(image.src);
            image.alt = product.product_title;

            badgeImageContainer.appendChild(image);

            // here append the bage ang image conatiner for product card
            productCard.appendChild(badgeImageContainer);

            // creating a container element for title, variants
            const contentContainer = document.createElement('div');

            contentContainer.classList.add('content-container');

            // creating a heading element for tittle
            const title = document.createElement('h2');
            title.innerText = product.product_title;

            contentContainer.appendChild(title);

            // creating an another container for varients(blue,red etc)
            const variantsContainer = document.createElement('div');
            variantsContainer.classList.add('variants-container');

            // Iterate through each variant object and append to the variantsContainer
            product.product_variants.forEach((variant, index) => {
                const variantElement = document.createElement('p');

                variantElement.innerText = `${Object.values(variant)[0]}`;

                variantsContainer.appendChild(variantElement);
            });

            contentContainer.appendChild(variantsContainer);

            productCard.appendChild(contentContainer);

            container.appendChild(productCard);
        });
    } else {
        console.error('Invalid products format:', products);
    }
}

function switchLayout(layout) {
    const container = document.getElementById('productContainer');
    container.classList.remove('grid-layout', 'list-layout');

    if (layout === 'grid') {
        container.classList.add('grid-layout');
    } else {
        container.classList.add('list-layout');
    }
}

function searchProducts() {
    const searchItem = document.getElementById('searchBar').value.toLowerCase();

    const filterdProducts = allProducts.filter(product =>
        product.product_badge.toLowerCase().includes(searchItem) ||
        product.product_title.toLowerCase().includes(searchItem) ||
        product.product_variants.some(varient =>
            Object.values(varient)[0].toLowerCase().includes(searchItem)
        )
    );
    displayProducts(filterdProducts)

}


document.getElementById('searchBar').addEventListener('input', searchProducts)
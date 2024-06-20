function toggleFavourites(sku, id, price, name, imageURL) {
    try {
        // Check if user is logged in
        var memberEmail = sessionStorage.getItem('memberEmail');
        if (memberEmail != null && memberEmail != '') {
            var heartIcon = document.getElementById('heart-' + sku);
            var favourites = JSON.parse(localStorage.getItem('favourites')) || {};

            if (heartIcon.classList.contains('filled-heart')) {
                // Unfill the heart and remove from favourites
                heartIcon.classList.remove('filled-heart', 'fas');
                heartIcon.classList.add('far');
                delete favourites[sku];
            } else {
                // Fill the heart and add to favourites
                heartIcon.classList.add('filled-heart', 'fas');
                heartIcon.classList.remove('far');
                favourites[sku] = true;
                if (favourites == null || favourites == '') {
                    favourites = [];
                    favourites.push({
                        id: id,
                        sku: sku,
                        price: price,
                        name: name,
                        imgURL: imageURL
                    })
                }
            }

            // Update localStorage
            localStorage.setItem('favourites', JSON.stringify(favourites));
        } else {
            window.location.href = 'memberLogin.html';
        }
    } catch (error) {
        console.error('Error toggling favourites:', error);
    }
}

// This function is to set the initial state of hearts based on localStorage
function initializeFavouriteHearts() {
    var favourites = JSON.parse(localStorage.getItem('favourites')) || {};
    for (var sku in favourites) {
        var heartIcon = document.getElementById('heart-' + sku);
        if (heartIcon) {
            heartIcon.classList.add('filled-heart', 'fas');
            heartIcon.classList.remove('far');
        }
    }
}



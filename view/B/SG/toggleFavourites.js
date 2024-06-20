function toggleFavourites(sku) {
    //check if user is logged in
    var memberEmail = sessionStorage.getItem('memberEmail');
    if (memberEmail != null && memberEmail != '') {

        var heartIcon = document.getElementById('heart-' + sku);

        if (heartIcon.classList.contains('filled')) {
            heartIcon.classList.remove('filled');
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            // removeFromFavorites(sku);
        } else {
            heartIcon.classList.add('filled');
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            // addToFavorites(sku);
        }
    } else {
        window.location.href = 'memberLogin.html'
    }

}

function addToFavorites(sku) {

    console.log('Added to favorites: ' + sku);
}

function removeFromFavorites(sku) {

    console.log('Removed from favorites: ' + sku);
}

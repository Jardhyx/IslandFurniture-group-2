async function toggleFavourites(sku) {
    try {
        // Check if user is logged in
        var memberEmail = sessionStorage.getItem('memberEmail');
        var memberId = sessionStorage.getItem('memberId'); // Assuming memberId is stored in session storage
        if (memberEmail != null && memberEmail != '') {
            var heartIcon = document.getElementById('heart-' + sku);
            if (heartIcon.classList.contains('filled')) {
                heartIcon.classList.remove('filled', 'fas');
                heartIcon.classList.add('far');
                await removeFromFavourites(memberId, sku);
            } else {
                heartIcon.classList.add('filled', 'fas');
                heartIcon.classList.remove('far');
                await addToFavourites(memberId, sku);
            }
        } else {
            window.location.href = 'memberLogin.html';
        }
    } catch (error) {
        console.error('Error toggling favourites:', error);
    }
}

async function addToFavourites(memberId, sku) {
    try {
        const response = await fetch('http://localhost:8081/api/addToFavourites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ memberId, itemId: sku })
        });
        const result = await response.json();
        console.log('Added to favourites:', result);
    } catch (error) {
        console.error('Error adding to favourites:', error);
    }
}

async function removeFromFavourites(memberId, sku) {
    try {
        const response = await fetch('http://localhost:8081/api/removeFromFavourites', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ memberId, itemId: sku })
        });
        const result = await response.json();
        console.log('Removed from favourites:', result);
    } catch (error) {
        console.error('Error removing from favourites:', error);
    }
}

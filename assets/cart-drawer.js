$('span#close-drawer').on('click', function () {
    $('.cart-drawer').removeClass('opened');
});

$('#open-cart').on('click', function () {


    fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
            document.dispatchEvent(new CustomEvent('cart:refresh', {
                bubbles: true,
                detail: cart
            }));

        $('.cart-count').text(cart.item_count);

        const cartItemsHTML = cart.items.map(item => {
            return `
                <div class="item flex gap-8" data-item-id="${item.id}">
                    <img src="${item.image}" height="100px" width="100px" />
                    <div>
                        <h3>${item.title}</h3>
                        <p>${item.variant_title}</p>
                        <p>${item.quantity} x ${item.price} </p>
                        <button class="remove-item-btn w-b-btn short" data-item-id="${item.id}">Remove</button>
                    </div>
                </div>
            `;
        }).join("");

        const cartDrawerForm = document.querySelector('.cart-drawer-form .cart-items');
        cartDrawerForm.innerHTML = cartItemsHTML;

        $('.remove-item-btn').on('click', function(event) {
            event.preventDefault();
            const itemId = $(this).data('item-id');
            const removeUrl = `/cart/change?id=${itemId}&quantity=0`;

            fetch(removeUrl, { method: 'POST' })
                .then(() => fetch('/cart.js'))
                .then(response => response.json())
                .then(updatedCart => {
                    let delItem = document.querySelector(`.cart-items .item[data-item-id="${itemId}"]`);
                    delItem.remove();
                    
                    $('.cart-count').text(updatedCart.item_count);
                })
                .catch(error => console.error(error));
        });

    });

    $('.cart-drawer').addClass('opened');
});

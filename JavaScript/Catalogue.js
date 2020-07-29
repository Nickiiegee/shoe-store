
    // Shopping Cart API
    let shoppingCart = (function () {

        // Private methods and properties
        cart = [];
        delivery = 0;

        // Constructor
        function Item(name, price, count) {
            this.name = name;
            this.price = price;
            this.count = count;
        }

        // Save cart
        function saveCart() {
            sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
        }

        // Load cart
        function loadCart() {
            cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
            delivery = JSON.parse(sessionStorage.getItem('delivery'));
        }

        if (sessionStorage.getItem("shoppingCart") != null) {
            loadCart();
        }

        // Public methods and properties
        let obj = {};

        // Add to cart
        obj.addItemToCart = function (name, price, count) {
            for (let item in cart) {
                if (cart[item].name === name) {
                    cart[item].count++;
                    saveCart();
                    return;
                }
            }
            let item = new Item(name, price, count);
            cart.push(item);
            saveCart();
        }
        // Set count from item
        obj.setCountForItem = function (name, count) {
            for (let i in cart) {
                if (cart[i].name === name) {
                    cart[i].count = count;
                    break;
                }
            }
        };
        // Remove item from cart
        obj.removeItemFromCart = function (name) {
            for (let item in cart) {
                if (cart[item].name === name) {
                    cart[item].count--;
                    if (cart[item].count === 0) {
                        cart.splice(item, 1);
                    }
                    break;
                }
            }
            saveCart();
        }

        // Remove all items from cart
        obj.removeItemFromCartAll = function (name) {
            for (let item in cart) {
                if (cart[item].name === name) {
                    cart.splice(item, 1);
                    break;
                }
            }
            saveCart();
        }

        // Clear cart
        obj.clearCart = function () {
            cart = [];
            delivery = 0;
            saveCart();
        }

        // Count cart 
        obj.totalCount = function () {
            let totalCount = 0;
            for (let item in cart) {
                totalCount += cart[item].count;
            }
            return totalCount;
        }

        // Total cart
        obj.totalCart = function () {
            let totalCart = 0;
            totalCart += Number(delivery);
            for (let item in cart) {
                totalCart += cart[item].price * cart[item].count;
            }
            return Number(totalCart.toFixed(2));
        }

        obj.addDeliveryToCart = (price) => {
            delivery = price;
            displayCart();
        }

        // List cart
        obj.listCart = function () {
            var cartCopy = [];
            for (i in cart) {
                item = cart[i];
                itemCopy = {};
                for (p in item) {
                    itemCopy[p] = item[p];

                }
                itemCopy.total = Number(item.price * item.count).toFixed(2);
                cartCopy.push(itemCopy)
            }
            return cartCopy;
        }
        return obj;
    })();

    // Triggers / Events
    // Add item
    function addItem(name, price) {
        event.preventDefault();
        shoppingCart.addItemToCart(name, price, 1);
        displayCart();
    }

    // Clear items
    function clearCart(){
        shoppingCart.clearCart();
        alert("Your cart has been cleared")
        displayCart();
    }

    function displayCart() {
        let cartArray = shoppingCart.listCart();
        let output = "";
        for (let i in cartArray) {
            output += "<tr>" +
                "<td>" + cartArray[i].name + "</td>" +
                "<td>(" + cartArray[i].price + ")</td>" +
                "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" +
                "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
                "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" +
                "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>" +
                " = " +
                "<td>" + cartArray[i].total + "</td>" +
                "</tr>";
        }
        $('.show-cart').html(output);
        $('.total-cart').html(shoppingCart.totalCart());
        $('.total-count').html(shoppingCart.totalCount());
    }

    // Delete item button

    $('.show-cart').on("click", ".delete-item", function (event) {
        let name = $(this).data('name')
        shoppingCart.removeItemFromCartAll(name);
        displayCart();
    })

    // -1
    $('.show-cart').on("click", ".minus-item", function (event) {
        let name = $(this).data('name')
        shoppingCart.removeItemFromCart(name);
        displayCart();
    })
    // +1
    $('.show-cart').on("click", ".plus-item", function (event) {
        let name = $(this).data('name')
        shoppingCart.addItemToCart(name);
        displayCart();
    })

    // Item count input
    $('.show-cart').on("change", ".item-count", function (event) {
        let name = $(this).data('name');
        let count = Number($(this).val());
        shoppingCart.setCountForItem(name, count);
        displayCart();
    });

    displayCart();

    //alert when adding an item to the cart
    $(".add-to-cart").click(function () {
        alert(`Your current total is R` + shoppingCart.totalCart());
    });



// I wanted to add the delivery option price to the cart, but couldn't get it to work
/*
var deliveryPrices = new Array();
deliveryPrices["None"] = 0;
deliveryPrices["SameDay"] = 100;
deliveryPrices["NextDay"] = 75;
deliveryPrices["TwoDays"] = 50;
deliveryPrices["Economy"] = 25;

function getDeliveryOption() {
  // Loops through delivery options and return option selected.
  var deliveryOptionPrice = 0;
  var theForm = document.getElementById("coupons");
  var selectedDelivery = theForm.elements["deliveryoptions"];
  deliveryOptionPrice = deliveryPrices[selectedDelivery.value];

  return deliveryOptionPrice;
} */

function order() {
    alert(`Order number ${Math.floor(Math.random() * 1000)} has been placed successfully!`);
};

function submit() {
    alert('You have been successfully subsrcibed to our list!')
};

function showBtn() {
    let x = document.getElementsByClassName("hide");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
};

function addDelivery(price) {
    shoppingCart.addDeliveryToCart(price);
}
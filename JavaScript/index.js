let products = [{
    "name": "Flatties",
    "price": 399,
    "img": '../GalleryImages/image3.jpg',
    "details": "Don't know what shoes to wear with your skinny jeans or your skirt? I promise you that these bad boys might look difficult to style, but they are the most versatile shoes and on top of that, it is comfortable to wear it throughout the entire day!"
  },
  {
    "name": "Casual Beachies",
    "price": 399,
    "img": "../GalleryImages/image10.jpg",
    "details": "What more can I say? They are just too cute not to have! If you are travelling to a tropical island, or just going to your local beach, these <em>beachies</em> will definitely give you that relaxed, I'm on vacation feeling. They are also very comfortable and can be worn with absolutely anything!"
  },
  {
    "name": "Suede Shoes",
    "price": 350,
    "img": "../GalleryImages/image6.jpg",
    "details": "You can do anything with your <em>Suede Shoes</em>! They can be used for both semi-formal and casual gatherings. You can really dress your outfit up with these <em>Suede Shoes</em> and even dress up cute with skinny jeans, a long-sleeved top and a scarf to match!"
  },
  {
    "name": "Bounty Country",
    "price": 450,
    "img": "../GalleryImages8.jpg",
    "details": "Feeling a little bit country? Or do you just want to add a different style to your normal look? Look no further than our <em>Bounty Country</em> boots that are not only comfortable, but warm to wear. Why not pair it with some leg warmers to give it a more, comfy feeling"
  },

];

// Creating a view for items in array
for (var i = 0; i < products.length; i++) {
  var items = document.querySelector('.primary-items');

  // Homepage View
  var product = document.createElement('div');
  product.classList.add('product');


  var itemName = products[i].name;;
  var itemDesc = products[i].details;
  var itemPrice = products[i].price;
  var itemImg = products[i].img;

  // Removed description for now (too much content)
  item.innerHTML +=
    `
<img src="${itemImg}" alt="" class="item-img" id="item-img">
<div class="overlay">
  <article class="text">
      <h3 class="item-title" id="item-title">${itemName}</h3>
      <p class="item-details" id="item-details">${itemDesc}</p>
      <p class="item-price">R${itemPrice}</span></p>
      
      <button class="view">
          <a href="./shop.html#${itemName}" class="jump-link">View in shop</a>
      </button>
  </article>
</div>
`;

  items.appendChild(item);
};

// I tried to get the navbar to when the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.padding = "30px 10px";
    document.getElementById("logo").style.fontSize = "25px";
  } else {
    document.getElementById("navbar").style.padding = "80px 10px";
    document.getElementById("logo").style.fontSize = "35px";
  }
};

// Shopping Cart API
let shoppingCart = (function () {

  // Private methods and properties
  cart = [];

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
      for (let item in cart) {
          totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
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

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();

// Triggers / Events
// Add item
$('.add-to-cart').click(function (event) {
  event.preventDefault();
  let name = $(this).data('name');
  let price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$('.clear-cart').click(function () {
  shoppingCart.clearCart();
  displayCart();
});


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
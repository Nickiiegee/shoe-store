// items to show when added to cart. Need to link from ProductInformation and Catalogue
function items(item, price) {
    this.item = item;
    this.price = price;
    this.img = img;
};

let item1 = new items(
    "Colour Wedges",
    "R350",
    "../GalleryImages/image1.jpg"
);

let item2 = new items(
    "Black Sandals",
    "R300",
    "../GalleryImages/image2.jpg"
);

let item3 = new items(
    "Flatties",
    "R399",
    "../GalleryImages/image3.jpg"
);

let item4 = new items(
    "Mighty Blacks",
    "R330",
    "../GalleryImages/image4.jpg"
);

let item5 = new items(
    "Casual Beachies",
    "R399",
    "../GalleryImages/image10.jpg"
);

let item6 = new items(
    "Black Sheep",
    "R399",
    "../GalleryImages/image5.jpg"
);

let item7 = new items(
    "Suede Shoes",
    "R350",
    "../GalleryImages/image6.jpg"
);

let item8 = new items(
    "Height Enlighter",
    "R375",
    "../GalleryImages/image7.jpg"
);

let item9 = new items(
    "Bounty Country",
    "R450",
    "../GalleryImages/image8.jpg"
);

let item10 = new items(
    "Bashful Wool",
    "R350",
    "../GalleryImages/image9.jpg"
);

for (var i = 0; i < items.length; i++) {
    var items = document.querySelector('.primary-items');

    // Homepage View
    var item = document.createElement('div');
    item.classList.add('item');


    var itemName = products[i].name;
    var itemPrice = products[i].price;
    var itemImg = products[i].img;

    // Removed description for now (too much content)
    item.innerHTML +=
        `
    <img src="${itemImg}" alt="" class="item-img" id="item-img">
    <div class="overlay">
        <article class="text">
            <h3 class="item-title" id="item-title">${itemName}</h3>
            <p class="item-price">R${itemPrice}</span></p>
            
            <button class="view">
                <a href="./cart.html" class="jump-link">Add to Cart</a>
            </button>
        </article>
    </div>
`;

    items.appendChild(item);
}


//function to work out amount for type of delivery (if loop)

/* //function to calculate order total before VAT
function vat() {

} */

//function to calculate total
function total() {
    document.getElementsByClassName("total").innerHTML = vat * 0.15
}

// confirm order function
$(function () {
    $('button').click(function () {
        $('#confirm').alert("Yay! Your order has been successfully confirmed!/nYour order number is:", Math.random());
    });
    // I want to animate this image when a mouse hovers over it
    $('img').hover(function(){
        $('totalImg').animate({height: "300px"});
    });


});

/* function priceCalculation() {
    var nameFirst = document.getElementById("first_name").value;
    var nameLast = document.getElementById("last_name").value;
    var phoneNum = document.getElementById("phone_number").value;
    var quantity = document.getElementById("quantity_order").value;    
    var price = document.getElementById("price_fixed").value;
    var total = quantity * price;
    var discountPrice = 0  ;
    var discountedTotal = 0;
    const taxRate = 0.085;
    var tax = total * taxRate;
    var totalPlusTax = total + tax;
    
       if (quantity > 9 || quantity < 20) {
            discountPrice = .10;        
            total = total - (total * discountPrice);
        }           
        else if (quantity > 19 || quantity < 30) {
            discountPrice = .20;
            total = total - (total * discountPrice);
        }
        else if (quantity > 29 || quantity < 40) {
            discountPrice = .30;
            total = total - (total * discountPrice);    
        }
        else if (quantity > 39 || quantity < 100) {
            discountPrice = .40;
            total = total - (total * discountPrice);    
        }
    
    document.getElementById("order_total").value = "$" + totalPlusTax.toFixed(2);
    
    } // end function priceCalculation(); */



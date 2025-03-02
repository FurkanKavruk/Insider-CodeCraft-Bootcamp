const name = prompt("Adınız nedir?");
const age = parseInt(prompt("Yaşınız kaç?"));
const job = prompt("Mesleğiniz nedir?");

const user = {
    name: name,
    age: age,
    job: job
};

console.log("Kullanıcı Bilgileri:", user);

let cart = [];

while (true) {
    let productName = prompt("Sepete eklemek istediğiniz ürünü yazın (Çıkmak için 'q' tuşuna basın):");
    
    if (productName.toLowerCase() === "q") {
        break;
    }
    
    let productPrice = parseFloat(prompt("Ürünün fiyatı nedir?"));
    
    if (!isNaN(productPrice) && productPrice > 0) {
        cart.push({ product: productName, price: productPrice });
        console.log(`${productName} ürünü sepete eklendi. Fiyat: ${productPrice} TL`);
    } else {
        console.log("Geçerli bir fiyat giriniz.");
    }
}

console.log("Sepetiniz:", cart);

function removeFromCart(productName) {
    let index = cart.findIndex(item => item.product.toLowerCase() === productName.toLowerCase());

    if (index !== -1) {
        let removedItem = cart.splice(index, 1); // Ürünü sepetten çıkar
        console.log(`${removedItem[0].product} ürünü sepetten çıkarıldı.`);
    } else {
        console.log("Bu ürün sepetinizde bulunamadı.");
    }
}

while (true) {
    let removeProduct = prompt("Sepetten çıkarmak istediğiniz ürünü yazın (Çıkmak için 'q' tuşuna basın):");

    if (removeProduct.toLowerCase() === "q") {
        break;
    }

    removeFromCart(removeProduct);
}

console.log("Güncellenmiş Sepet:", cart);

const totalPrice = cart.reduce((total, item) => total + item.price, 0);
console.log("Toplam Fiyat:", totalPrice + " TL");
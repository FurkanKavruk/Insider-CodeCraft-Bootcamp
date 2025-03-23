(async function () {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
    );
    if (!response.ok) throw new Error("Veriler alınamadı!");

    const products = await response.json();

    const mainContainer = document.createElement("div");
    mainContainer.style.width = "100%";
    mainContainer.style.paddingRight = "15px";
    mainContainer.style.paddingLeft = "15px";
    mainContainer.style.marginRight = "auto";
    mainContainer.style.marginLeft = "auto";
    mainContainer.style.marginBottom = "100px";

    const title = document.createElement("h2");
    title.textContent = "Beğenebileciğinizi düşündüklerimiz";
    title.style.display = "flex";
    title.style.alignItems = "center";
    title.style.justifyContent = "space-between";
    title.style.backgroundColor = "#fef6eb";
    title.style.padding = "25px 67px";
    title.style.borderTopLeftRadius = "35px";
    title.style.borderTopRightRadius = " 35px";
    title.style.fontFamily = "Quicksand-Bold";
    title.style.fontWeight = "700";
    title.style.fontSize = "3rem";
    title.style.lineHeight = "1.11";
    title.style.color = "#f28e00";
    title.style.margin = "0";
    
    const carousel = document.createElement("div");
    carousel.style.position = "relative";
    carousel.style.height = "100%";
    carousel.style.display = "flex";
    carousel.style.overflowX = "auto";
    carousel.style.gap = "20px";
    carousel.style.padding = "20px 0";
    carousel.style.whiteSpace = "nowrap";
    carousel.style.boxShadow = "15px 15px 30px 0 #ebebeb80";
    
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.style.position = "relative";
      productCard.style.overflow = "hidden";
      productCard.style.zIndex = "1";
      productCard.style.display = "block";
      productCard.style.fontFamily = "Poppins,'cursive'";
      productCard.style.fontSize = "12px";
      productCard.style.padding = "5px";
      productCard.style.color = "#7d7d7";
      productCard.style.margin = "0 0 20px 3px";
      productCard.style.border = "1px solid #ededed";
      productCard.style.borderRadius = "10px";
      productCard.style.textDecoration = "none";
      productCard.style.backgroundColor = "#fff";
      productCard.style.width = "300px";
      productCard.style.flex = "0 0 auto";

      productCard.addEventListener("click", () => {
        window.open(product.url, "_blank");
      });

      const img = document.createElement("img");
      img.src =
        product.image || product.img || "https://via.placeholder.com/200";
      img.style.width = "100%";
      img.style.Height = "203px";
      img.style.display = "block";
      img.style.borderRadius = "10px";
      img.style.maxHeight = "100%";
      img.style.objectFit = "cover";

      const productTitle = document.createElement("h4");
      productTitle.textContent = product.name;
      productTitle.style.fontSize = "1.2rem";
      productTitle.style.fontFamily = "Poppins,'cursive'";
      productTitle.style.color = "unset";
      productTitle.style.marginBottom = "10px";
      productTitle.style.display = "block";
      productTitle.style.fontWeight = "500";
      productTitle.style.unicodeBidi = "isolate";
      productTitle.style.textDecoration = "none";
      productTitle.style.whiteSpace = "normal";
      productTitle.style.overflow = "visible";
      productTitle.style.lineHeight = "1.4";

      const favButton = document.createElement("div");
      favButton.style.position = "absolute";
      favButton.style.top = "10px";
      favButton.style.right = "10px";
      favButton.style.width = "40px";
      favButton.style.height = "40px";
      favButton.style.borderRadius = "50%";
      favButton.style.backgroundColor = "#fff";
      favButton.style.display = "flex";
      favButton.style.alignItems = "center";
      favButton.style.justifyContent = "center";
      favButton.style.cursor = "pointer";
      favButton.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
      favButton.style.overflow = "hidden";

      const favImg = document.createElement("img");
      favImg.src = "https://www.e-bebek.com/assets/svg/default-favorite.svg";
      favImg.style.objectFit = "cover";

      favButton.appendChild(favImg);

      const productId = product.id || "default-product";

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      let isFavorite = favorites.includes(productId);

      favImg.src = isFavorite
        ? "https://www.e-bebek.com/assets/svg/added-favorite-hover.svg"
        : "https://www.e-bebek.com/assets/svg/default-favorite.svg";

      favButton.addEventListener("mouseenter", () => {
        if (!isFavorite) {
          favImg.src =
            "https://www.e-bebek.com/assets/svg/default-hover-favorite.svg";
        }
      });

      favButton.addEventListener("mouseleave", () => {
        if (!isFavorite) {
          favImg.src =
            "https://www.e-bebek.com/assets/svg/default-favorite.svg";
        }
      });

      favButton.addEventListener("click", () => {
        event.stopPropagation(); 
    event.preventDefault(); 
        isFavorite = !isFavorite; 

        if (isFavorite) {
          favImg.src =
            "https://www.e-bebek.com/assets/svg/added-favorite-hover.svg";
          if (!favorites.includes(productId)) favorites.push(productId);
        } else {
          favImg.src =
            "https://www.e-bebek.com/assets/svg/default-favorite.svg";
          favorites = favorites.filter((id) => id !== productId);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
      });

      const img2 = document.createElement("img");
      img2.src =
        product.image || product.img || "https://via.placeholder.com/200";
      img2.style.width = "100%";
      img2.style.Height = "203px";
      img2.style.display = "block";
      img2.style.borderRadius = "10px";
      img2.style.maxHeight = "100%";
      img2.style.objectFit = "cover";
      const priceContainer = document.createElement("div");
      priceContainer.style.margin = "10px 0";

      const price = document.createElement("p");
      price.textContent = product.price + " TL";
      price.style.fontWeight = "bold";
      price.style.color = "#e67e22";
      price.style.margin = "0";

      priceContainer.appendChild(price);

      if (product.original_price && product.original_price > product.price) {
        const originalPrice = document.createElement("p");
        originalPrice.textContent = product.original_price + " TL";
        originalPrice.style.textDecoration = "line-through";
        originalPrice.style.color = "#999";
        originalPrice.style.margin = "0";

        const discount = document.createElement("p");
        const discountAmount = product.original_price - product.price;
        discount.textContent = `İndirim: ${discountAmount} TL`;
        discount.style.color = "#d32f2f";
        discount.style.margin = "0";
        discount.style.fontWeight = "bold";

        priceContainer.appendChild(originalPrice);
        priceContainer.appendChild(discount);
      }

      const button = document.createElement("button");
      button.textContent = "Sepete Ekle";
      button.style.padding = "10px";
      button.style.width = "100%";
      button.style.border = "none";
      button.style.background = "#ff9800";
      button.style.color = "#fff";
      button.style.borderRadius = "5px";
      button.style.cursor = "pointer";

      button.addEventListener("click", (event) => {
        event.stopPropagation();
        alert(`${product.name} sepete eklendi!`);
      });
      productCard.appendChild(favButton);
      productCard.appendChild(img);
      productCard.appendChild(productTitle);
      productCard.appendChild(priceContainer);
      productCard.appendChild(button);

      carousel.appendChild(productCard);
      
      
    });
    
    mainContainer.appendChild(title);
    mainContainer.appendChild(carousel);

    const targetSection = document.querySelector(".Section2A.has-components");

    if (targetSection) {
      targetSection.parentNode.insertBefore(mainContainer, targetSection);
    } else {
      console.warn("Hedef sınıf bulunamadı!");
      document.body.prepend(mainContainer);
    }
  } catch (error) {
    console.error("Hata oluştu:", error);
  }
})();

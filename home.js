let cafes = [];

// LOAD DATA
fetch("data/db.json")
  .then(res => {
    if (!res.ok) {
      throw new Error("Lỗi load JSON");
    }
    return res.json();
  })
  .then(data => {
    cafes = data;

    // 👉 LỌC QUÁN HOT (đúng chuẩn)
    const hotList = cafes.filter(c => c.hot === true);

    // 👉 nếu không có hot thì fallback lấy 3 quán đầu
    const finalList = hotList.length > 0 ? hotList : cafes.slice(0, 3);

    displayHot(finalList);
  })
  .catch(err => {
    console.error("Lỗi:", err);
  });

// HIỂN THỊ
function displayHot(list) {
  const container = document.getElementById("hotCafe");

  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>Không có quán nào</p>";
    return;
  }

  list.forEach(cafe => {
    container.innerHTML += `
      <div class="card">
        <img src="${cafe.img}" alt="${cafe.name}">
        <h3>${cafe.name} 🔥</h3>
        <p>📍 ${cafe.district}</p>
        <button onclick="showDetail(${cafe.id})">Xem chi tiết</button>
      </div>
    `;
  });
}

// SHOW DETAIL
function showDetail(id) {
  const cafe = cafes.find(c => c.id === id);

  document.getElementById("modalImg").src = cafe.img;
  document.getElementById("modalName").innerText = cafe.name;
  
  // Hiển thị rating và số sao
  displayRating(cafe.rating, cafe.reviewCount);
  
  document.getElementById("modalDesc").innerText = cafe.desc;
  document.getElementById("modalAddress").innerText = `Địa chỉ: ${cafe.address}`;
  document.getElementById("modalOpen").innerText = cafe.open ? `Giờ mở cửa: ${cafe.open}` : "Giờ mở cửa: Chưa cập nhật";
  document.getElementById("modalPrice").innerText = cafe.price ? `Giá dao động: ${cafe.price}` : "Giá dao động: Chưa cập nhật";

  document.getElementById("modal").style.display = "block";
}

// Hàm hiển thị rating và số sao
function displayRating(rating, reviewCount) {
  const ratingText = document.getElementById("modalRating");
  const reviewCountElement = document.getElementById("modalReviewCount");
  const starsContainer = document.getElementById("modalStars");
  
  // Hiển thị rating text
  ratingText.innerText = rating || "Chưa có đánh giá";
  
  // Hiển thị số lượt đánh giá
  reviewCountElement.innerText = reviewCount || 0;
  
  // Tạo sao dựa trên rating
  if (rating) {
    const ratingNumber = parseFloat(rating.split('/')[0]);
    const fullStars = Math.floor(ratingNumber);
    const hasHalfStar = ratingNumber % 1 >= 0.5;
    
    let starsHTML = '';
    
    // Sao đầy
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<span class="star">★</span>';
    }
    
    // Sao nửa (nếu có)
    if (hasHalfStar) {
      starsHTML += '<span class="star">☆</span>';
    }
    
    // Sao rỗng
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<span class="star empty">☆</span>';
    }
    
    starsContainer.innerHTML = starsHTML;
  } else {
    starsContainer.innerHTML = '<span class="star empty">☆☆☆☆☆</span>';
  }
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
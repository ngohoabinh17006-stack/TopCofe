let cafes = [];

// LOAD JSON
fetch("data/db.json")
  .then(res => res.json())
  .then(data => {
    cafes = data;
    displayCafe(cafes);
  });

// HIỂN THỊ
function displayCafe(list) {
  const container = document.getElementById("cafeList");
  container.innerHTML = "";

  list.forEach(cafe => {
    container.innerHTML += `
      <div class="card">
        <img src="${cafe.img}">
        <h3>${cafe.name}</h3>
        <p>📍 ${cafe.district}</p>
        <button onclick="showDetail(${cafe.id})">Xem chi tiết</button>
      </div>
    `;
  });
}

// FILTER + SEARCH
function filterCafe() {
  const keyword = document.getElementById("search").value.toLowerCase();
  const district = document.getElementById("district").value;

  let result = cafes;

  if (district !== "all") {
    result = result.filter(c => c.district === district);
  }

  if (keyword) {
    result = result.filter(c => c.name.toLowerCase().includes(keyword));
  }

  displayCafe(result);
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
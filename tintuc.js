// News Page JavaScript - Load posts from admin panel

class NewsPage {
    constructor() {
        this.posts = [];
    }
    
    async init() {
        await this.loadPosts();
        this.renderNews();
    }
    
    async loadPosts() {
        try {
            // Load posts from localStorage (managed by admin panel)
            const postsData = localStorage.getItem('posts_data');
            
            if (postsData) {
                this.posts = JSON.parse(postsData);
                console.log('Loaded posts from admin panel:', this.posts);
            } else {
                console.log('No posts found in admin panel, using fallback data');
                this.posts = this.getFallbackPosts();
            }
            
            // Filter only published posts
            this.posts = this.posts.filter(post => post.status === 'published');
            
            // Sort by publish date (newest first)
            this.posts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
            
        } catch (e) {
            console.error('Error loading posts:', e);
            this.posts = this.getFallbackPosts();
        }
    }
    
    getFallbackPosts() {
        return [
            {
                id: 1,
                title: "Top 5 quán cafe đẹp nhất Sài Gòn 2026",
                content: "Khám phá top 5 quán cafe đẹp nhất Sài Gòn năm 2026 với không gian sống ảo, decor ấn tượng và menu đa dạng. Từ những quán vintage ở Quận 1 đến những nơi chill ở Gò Vấp, mỗi quán đều mang đến trải nghiệm độc đáo cho bạn. Đừng quên check-in và thưởng thức những ly cafe ngon nhé!",
                image: "anh/1.jpg",
                publishDate: "2024-01-15T10:30:00.000Z",
                status: "published",
                author: "Admin",
                excerpt: "Khám phá những quán cafe cực chill, decor sống ảo cực xịn tại Sài Gòn."
            },
            {
                id: 2,
                title: "Xu hướng cafe take-away bùng nổ",
                content: "Với nhịp sống bận rộn, cafe take-away đang bùng nổ tại Sài Gòn. Các quán như Highlands, The Coffee House cung cấp dịch vụ giao tận nơi với chất lượng cao. Xu hướng này không chỉ tiện lợi mà còn giúp bạn tiết kiệm thời gian, phù hợp cho công việc và học tập.",
                image: "anh/2.jpg",
                publishDate: "2024-01-14T09:15:00.000Z",
                status: "published",
                author: "Admin",
                excerpt: "Cafe mang đi đang trở thành lựa chọn hàng đầu của giới trẻ."
            },
            {
                id: 3,
                title: "Quán cafe học bài yên tĩnh",
                content: "Tìm kiếm quán cafe yên tĩnh để học bài? Hãy thử Moya House Coffee ở Quận 12 với không gian ấm cúng, wifi mạnh và menu phong phú. Hoặc Lonely Bean ở Gò Vấp với thiết kế hiện đại, lý tưởng cho những buổi học nhóm hoặc làm việc cá nhân.",
                image: "anh/3.jpg",
                publishDate: "2024-01-13T14:20:00.000Z",
                status: "published",
                author: "Admin",
                excerpt: "Gợi ý các quán cafe phù hợp cho sinh viên học tập."
            },
            {
                id: 4,
                title: "Cafe 24/7: Nơi làm việc không giới hạn",
                content: "Với nhu cầu làm việc muộn, cafe 24/7 như Three O'clock ở Bình Thạnh hay Khuya Cafe ở Quận 12 trở thành lựa chọn hoàn hảo. Không gian thoải mái, menu đa dạng và wifi ổn định giúp bạn tập trung tối đa.",
                image: "anh/4.jpg",
                publishDate: "2024-01-12T16:45:00.000Z",
                status: "published",
                author: "Admin",
                excerpt: "Các quán cafe mở cửa 24/24 giờ tại Bình Thạnh và Gò Vấp."
            },
            {
                id: 5,
                title: "Cafe sách: Kết hợp đọc sách và thưởng thức",
                content: "Nhà Nam Book N' Coffee ở Bình Thạnh là điểm đến lý tưởng cho những ai yêu sách. Với hàng ngàn đầu sách, không gian yên tĩnh và cafe ngon, đây là nơi hoàn hảo để thư giãn và học hỏi.",
                image: "anh/5.jpg",
                publishDate: "2024-01-11T11:30:00.000Z",
                status: "published",
                author: "Admin",
                excerpt: "Những quán cafe có khu vực sách phong phú."
            },
            {
                id: 6,
                title: "Xu hướng cafe healthy tại Sài Gòn",
                content: "Xu hướng cafe healthy đang lan tỏa với các quán như Oromia Coffee ở Quận 3, cung cấp cafe organic, trà detox và menu ăn kiêng. Đây là lựa chọn tuyệt vời cho những ai quan tâm đến sức khỏe.",
                image: "anh/6.jpg",
                publishDate: "2024-01-10T08:00:00.000Z",
                status: "published",
                author: "Admin",
                excerpt: "Cafe organic, detox đang được ưa chuộng."
            }
        ];
    }
    
    renderNews() {
        const newsGrid = document.querySelector('.news-grid');
        if (!newsGrid) {
            console.error('News grid container not found');
            return;
        }
        
        newsGrid.innerHTML = '';
        
        if (this.posts.length === 0) {
            newsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-newspaper" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i>
                    <br>Chưa có tin tức nào
                    <br><small>Hãy vào admin panel để thêm bài đăng</small>
                </div>
            `;
            return;
        }
        
        this.posts.forEach(post => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';
            
            const publishDate = new Date(post.publishDate).toLocaleDateString('vi-VN');
            
            newsCard.innerHTML = `
                <img src="${post.image || 'anh/default.jpg'}" alt="${post.title}">
                <div class="news-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt || post.content.substring(0, 100) + '...'}</p>
                    <div class="news-meta">
                        <small>Đăng bởi: ${post.author} | ${publishDate}</small>
                    </div>
                    <button onclick="newsPage.openNews('${post.title}', '${post.content}', '${post.image}')">Xem thêm</button>
                </div>
            `;
            
            newsGrid.appendChild(newsCard);
        });
        
        console.log(`Rendered ${this.posts.length} news articles`);
    }
    
    openNews(title, content, imgSrc) {
        document.getElementById("newsImg").src = imgSrc || 'anh/default.jpg';
        document.getElementById("newsTitle").innerText = title;
        document.getElementById("newsDetail").innerHTML = content; // Use innerHTML to support HTML content
        document.getElementById("newsModal").style.display = "flex";
    }
    
    closeNews() {
        document.getElementById("newsModal").style.display = "none";
    }
}

// Global news page instance
let newsPage;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('tintuc.html')) {
        newsPage = new NewsPage();
        newsPage.init();
    }
});

// Global functions for modal (backward compatibility)
function openNews(title, detail, imgSrc) {
    if (newsPage) {
        newsPage.openNews(title, detail, imgSrc);
    }
}

function closeNews() {
    if (newsPage) {
        newsPage.closeNews();
    }
}
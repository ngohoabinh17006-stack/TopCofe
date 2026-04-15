// Admin Panel Main JavaScript

// Data Store Service
class DataStore {
    static KEYS = {
        CAFES: 'cafes_data',
        POSTS: 'posts_data',
        AUTH: 'admin_auth'
    };
    
    static save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    }
    
    static load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            return null;
        }
    }
    
    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    }
    
    static async loadFromFile(filePath) {
        try {
            console.log('Attempting to load file:', filePath);
            const response = await fetch(filePath);
            console.log('Fetch response:', response);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Successfully loaded JSON data:', data);
            return data;
        } catch (e) {
            console.error('Error loading from file:', filePath, e);
            
            // If fetch fails, try alternative approach
            if (e.name === 'TypeError' && e.message.includes('fetch')) {
                console.log('Fetch failed, possibly due to CORS. Trying alternative approach...');
                // Return sample data for testing
                return this.getSampleCafeData();
            }
            
            return null;
        }
    }
    
    static getSampleCafeData() {
        console.log('Using sample cafe data for testing');
        return [
            {
                id: 1,
                name: "Moya House Coffee",
                district: "Q12",
                img: "anh/1.jpg",
                desc: "Quán cafe ở Quận 12 với không gian ấm cúng, nổi tiếng với cà phê trứng và trà đào.",
                address: "407 Tô Ký, Quận 12, TP.HCM",
                rating: "4.5/5",
                hot: true,
                open: "06:30 - 22:30",
                price: "30.000 - 50.000đ"
            },
            {
                id: 2,
                name: "Cafe Venus",
                district: "Q12",
                img: "anh/2.jpg",
                desc: "Quán cafe rộng rãi, phù hợp làm việc nhóm, nổi bật với cà phê trứng và sinh tố bơ.",
                address: "503 Nguyễn Văn Quá, Quận 12, TP.HCM",
                rating: "3.8/5",
                hot: false,
                open: "06:00 - 21:00",
                price: "20.000 - 50.000đ"
            }
        ];
    }
    
    static getSamplePostData() {
        console.log('Using sample post data for testing');
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
    
    static generateId(existingItems) {
        if (!existingItems || existingItems.length === 0) return 1;
        const maxId = Math.max(...existingItems.map(item => item.id || 0));
        return maxId + 1;
    }
}

// Cafe Manager Service
class CafeManager {
    constructor() {
        this.cafes = [];
        this.dataStore = DataStore;
    }
    
    async loadData() {
        try {
            console.log('Loading cafe data...');
            
            // Try to load from localStorage first
            let data = this.dataStore.load(this.dataStore.KEYS.CAFES);
            console.log('Data from localStorage:', data);
            
            if (!data) {
                console.log('No localStorage data, loading from db.json...');
                // Fallback to db.json
                const fileData = await this.dataStore.loadFromFile('data/db.json');
                console.log('Data from db.json:', fileData);
                
                if (fileData && Array.isArray(fileData)) {
                    data = fileData;
                    console.log('Successfully loaded', data.length, 'cafes from db.json');
                } else {
                    console.log('No valid data found in db.json');
                    data = [];
                }
            } else {
                console.log('Successfully loaded', data.length, 'cafes from localStorage');
            }
            
            this.cafes = Array.isArray(data) ? data : [];
            console.log('Final cafe data:', this.cafes);
            return this.cafes;
        } catch (e) {
            console.error('Error loading cafe data:', e);
            this.cafes = [];
            return this.cafes;
        }
    }
    
    getAll() {
        return this.cafes;
    }
    
    getById(id) {
        return this.cafes.find(cafe => cafe.id === parseInt(id));
    }
    
    create(cafeData) {
        const newCafe = {
            id: this.dataStore.generateId(this.cafes),
            name: cafeData.name,
            district: cafeData.district,
            img: cafeData.img || '',
            desc: cafeData.desc || '',
            address: cafeData.address,
            rating: cafeData.rating || '',
            reviewCount: cafeData.reviewCount || 0,
            hot: cafeData.hot || false,
            open: cafeData.open || '',
            price: cafeData.price || '',
            phone: cafeData.phone || ''
        };
        
        this.cafes.push(newCafe);
        this.save();
        return newCafe;
    }
    
    update(id, cafeData) {
        const index = this.cafes.findIndex(cafe => cafe.id === parseInt(id));
        if (index === -1) return null;
        
        this.cafes[index] = {
            ...this.cafes[index],
            name: cafeData.name,
            district: cafeData.district,
            img: cafeData.img || '',
            desc: cafeData.desc || '',
            address: cafeData.address,
            rating: cafeData.rating || '',
            reviewCount: cafeData.reviewCount || 0,
            hot: cafeData.hot || false,
            open: cafeData.open || '',
            price: cafeData.price || '',
            phone: cafeData.phone || ''
        };
        
        this.save();
        return this.cafes[index];
    }
    
    delete(id) {
        const index = this.cafes.findIndex(cafe => cafe.id === parseInt(id));
        if (index === -1) return false;
        
        this.cafes.splice(index, 1);
        this.save();
        return true;
    }
    
    getCount() {
        return this.cafes.length;
    }
    
    save() {
        return this.dataStore.save(this.dataStore.KEYS.CAFES, this.cafes);
    }
    
    async resetToOriginal() {
        this.dataStore.remove(this.dataStore.KEYS.CAFES);
        await this.loadData();
        return this.cafes;
    }
}

// Post Manager Service
class PostManager {
    constructor() {
        this.posts = [];
        this.dataStore = DataStore;
    }
    
    async loadData() {
        try {
            console.log('Loading post data...');
            
            let data = this.dataStore.load(this.dataStore.KEYS.POSTS);
            console.log('Data from localStorage:', data);
            
            if (!data || data.length === 0) {
                console.log('No post data found, using sample data...');
                data = DataStore.getSamplePostData();
                // Save sample data to localStorage for future use
                this.dataStore.save(this.dataStore.KEYS.POSTS, data);
                console.log('Saved sample post data to localStorage');
            }
            
            this.posts = Array.isArray(data) ? data : [];
            console.log('Final post data:', this.posts);
            return this.posts;
        } catch (e) {
            console.error('Error loading post data:', e);
            this.posts = [];
            return this.posts;
        }
    }
    
    getAll() {
        return this.posts;
    }
    
    getById(id) {
        return this.posts.find(post => post.id === parseInt(id));
    }
    
    create(postData) {
        const newPost = {
            id: this.dataStore.generateId(this.posts),
            title: postData.title,
            content: postData.content,
            image: postData.image || '',
            publishDate: new Date().toISOString(),
            status: postData.status || 'draft',
            author: postData.author,
            excerpt: postData.excerpt || ''
        };
        
        this.posts.push(newPost);
        this.save();
        return newPost;
    }
    
    update(id, postData) {
        const index = this.posts.findIndex(post => post.id === parseInt(id));
        if (index === -1) return null;
        
        this.posts[index] = {
            ...this.posts[index],
            title: postData.title,
            content: postData.content,
            image: postData.image || '',
            status: postData.status || 'draft',
            author: postData.author,
            excerpt: postData.excerpt || ''
        };
        
        this.save();
        return this.posts[index];
    }
    
    delete(id) {
        const index = this.posts.findIndex(post => post.id === parseInt(id));
        if (index === -1) return false;
        
        this.posts.splice(index, 1);
        this.save();
        return true;
    }
    
    toggleStatus(id) {
        const post = this.getById(id);
        if (!post) return null;
        
        post.status = post.status === 'draft' ? 'published' : 'draft';
        if (post.status === 'published') {
            post.publishDate = new Date().toISOString();
        }
        
        this.save();
        return post;
    }
    
    getCount() {
        return this.posts.length;
    }
    
    getPublishedCount() {
        return this.posts.filter(post => post.status === 'published').length;
    }
    
    getDraftCount() {
        return this.posts.filter(post => post.status === 'draft').length;
    }
    
    save() {
        return this.dataStore.save(this.dataStore.KEYS.POSTS, this.posts);
    }
    
    clearAll() {
        this.posts = [];
        this.dataStore.remove(this.dataStore.KEYS.POSTS);
        return true;
    }
}

// Content Editor Component
class ContentEditor {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.toolbar = null;
        this.content = null;
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        this.toolbar = this.container.querySelector('.editor-toolbar');
        this.content = this.container.querySelector('.editor-content');
        
        if (this.toolbar) {
            this.toolbar.addEventListener('click', (e) => this.handleToolbarClick(e));
        }
    }
    
    handleToolbarClick(event) {
        event.preventDefault();
        const button = event.target.closest('.editor-btn');
        if (!button) return;
        
        const command = button.dataset.command;
        if (command === 'createLink') {
            const url = prompt('Nhập URL:');
            if (url) {
                document.execCommand(command, false, url);
            }
        } else {
            document.execCommand(command, false, null);
        }
        
        this.content.focus();
    }
    
    getContent() {
        return this.content ? this.content.innerHTML : '';
    }
    
    setContent(html) {
        if (this.content) {
            this.content.innerHTML = html;
        }
    }
    
    clear() {
        if (this.content) {
            this.content.innerHTML = '';
        }
    }
    
    focus() {
        if (this.content) {
            this.content.focus();
        }
    }
}

// Statistics Dashboard Component
class StatsDashboard {
    constructor(cafeManager, postManager) {
        this.cafeManager = cafeManager;
        this.postManager = postManager;
    }
    
    updateStats() {
        const stats = this.getStats();
        
        document.getElementById('totalCafes').textContent = stats.totalCafes;
        document.getElementById('totalPosts').textContent = stats.totalPosts;
        document.getElementById('publishedPosts').textContent = stats.publishedPosts;
        document.getElementById('draftPosts').textContent = stats.draftPosts;
    }
    
    getStats() {
        return {
            totalCafes: this.cafeManager.getCount(),
            totalPosts: this.postManager.getCount(),
            publishedPosts: this.postManager.getPublishedCount(),
            draftPosts: this.postManager.getDraftCount()
        };
    }
}

// Toast Notification Component
class Toast {
    static show(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        if (!toast || !toastMessage) return;
        
        toastMessage.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    static success(message) {
        this.show(message, 'success');
    }
    
    static error(message) {
        this.show(message, 'error');
    }
    
    static warning(message) {
        this.show(message, 'warning');
    }
}

// Confirmation Modal Component
class ConfirmModal {
    static show(title, message, onConfirm) {
        const modal = document.getElementById('confirmModal');
        const titleElement = document.getElementById('confirmTitle');
        const messageElement = document.getElementById('confirmMessage');
        const confirmBtn = document.getElementById('confirmOk');
        const cancelBtn = document.getElementById('confirmCancel');
        
        if (!modal) return;
        
        titleElement.textContent = title;
        messageElement.textContent = message;
        
        modal.style.display = 'block';
        
        const handleConfirm = () => {
            modal.style.display = 'none';
            onConfirm();
            cleanup();
        };
        
        const handleCancel = () => {
            modal.style.display = 'none';
            cleanup();
        };
        
        const cleanup = () => {
            confirmBtn.removeEventListener('click', handleConfirm);
            cancelBtn.removeEventListener('click', handleCancel);
        };
        
        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', handleCancel);
    }
}

// Main Admin Panel Class
class AdminPanel {
    constructor() {
        this.cafeManager = new CafeManager();
        this.postManager = new PostManager();
        this.statsDashboard = new StatsDashboard(this.cafeManager, this.postManager);
        this.contentEditor = null;
        this.currentTab = 'cafe';
        this.currentCafeId = null;
        this.currentPostId = null;
    }
    
    async init() {
        // Show loading state
        this.showLoading('cafe');
        
        // Load data
        await this.cafeManager.loadData();
        await this.postManager.loadData();
        
        // Hide loading state
        this.hideLoading('cafe');
        
        // Initialize components
        this.initEventListeners();
        this.initTabs();
        this.initModals();
        this.contentEditor = new ContentEditor('contentEditor');
        
        // Update UI
        this.updateStats();
        this.renderCafeTable();
        this.renderPostTable();
    }
    
    initEventListeners() {
        // Cafe actions
        document.getElementById('addCafeBtn').addEventListener('click', () => {
            this.showCafeForm();
        });
        
        document.getElementById('resetCafesBtn').addEventListener('click', () => {
            this.resetCafes();
        });
        
        // Post actions
        document.getElementById('addPostBtn').addEventListener('click', () => {
            this.showPostForm();
        });
        
        document.getElementById('clearPostsBtn').addEventListener('click', () => {
            this.clearPosts();
        });
        
        // Form submissions
        document.getElementById('cafeForm').addEventListener('submit', (e) => {
            this.handleCafeSubmit(e);
        });
        
        document.getElementById('postForm').addEventListener('submit', (e) => {
            this.handlePostSubmit(e);
        });
    }
    
    initTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }
    
    switchTab(tabId) {
        // Update buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabId}Tab`).classList.add('active');
        
        this.currentTab = tabId;
    }
    
    initModals() {
        // Close modal buttons
        document.querySelectorAll('.modal-close, #cancelCafeForm, #cancelPostForm').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModals();
            });
        });
        
        // Click outside to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });
    }
    
    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        this.currentCafeId = null;
        this.currentPostId = null;
    }
    
    updateStats() {
        this.statsDashboard.updateStats();
    }
    
    // Cafe Management Methods
    renderCafeTable() {
        const tbody = document.getElementById('cafeTableBody');
        const cafes = this.cafeManager.getAll();
        
        if (!tbody) {
            console.error('Cafe table body not found');
            return;
        }
        
        tbody.innerHTML = '';
        
        if (cafes.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="6" style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-coffee" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i>
                    <br>Chưa có dữ liệu quán cafe
                    <br><small>Dữ liệu sẽ được tải từ data/db.json</small>
                </td>
            `;
            tbody.appendChild(row);
            return;
        }
        
        cafes.forEach((cafe, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${cafe.name || 'N/A'}</td>
                <td>${cafe.district || 'N/A'}</td>
                <td>${cafe.address || 'N/A'}</td>
                <td>
                    ${cafe.hot ? '<span class="hot-badge">HOT</span>' : ''}
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-sm btn-edit" onclick="adminPanel.editCafe(${cafe.id})">
                            <i class="fas fa-edit"></i> Sửa
                        </button>
                        <button class="btn-sm btn-delete" onclick="adminPanel.deleteCafe(${cafe.id})">
                            <i class="fas fa-trash"></i> Xóa
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        console.log(`Rendered ${cafes.length} cafes in table`);
    }
    
    showCafeForm(cafe = null) {
        const modal = document.getElementById('cafeModal');
        const title = document.getElementById('cafeModalTitle');
        const form = document.getElementById('cafeForm');
        
        if (cafe) {
            title.textContent = 'Chỉnh sửa quán cafe';
            this.populateCafeForm(cafe);
            this.currentCafeId = cafe.id;
        } else {
            title.textContent = 'Thêm quán cafe mới';
            form.reset();
            this.currentCafeId = null;
        }
        
        this.clearFormErrors();
        modal.style.display = 'block';
    }
    
    populateCafeForm(cafe) {
        document.getElementById('cafeName').value = cafe.name || '';
        document.getElementById('cafeDistrict').value = cafe.district || '';
        document.getElementById('cafeAddress').value = cafe.address || '';
        document.getElementById('cafeImg').value = cafe.img || '';
        document.getElementById('cafeRating').value = cafe.rating || '';
        document.getElementById('cafeReviewCount').value = cafe.reviewCount || '';
        document.getElementById('cafeDesc').value = cafe.desc || '';
        document.getElementById('cafeOpen').value = cafe.open || '';
        document.getElementById('cafePrice').value = cafe.price || '';
        document.getElementById('cafePhone').value = cafe.phone || '';
        document.getElementById('cafeHot').checked = cafe.hot || false;
    }
    
    handleCafeSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const cafeData = {
            name: formData.get('name').trim(),
            district: formData.get('district').trim(),
            address: formData.get('address').trim(),
            img: formData.get('img').trim(),
            desc: formData.get('desc').trim(),
            rating: formData.get('rating').trim(),
            reviewCount: parseInt(formData.get('reviewCount')) || 0,
            open: formData.get('open').trim(),
            price: formData.get('price').trim(),
            phone: formData.get('phone').trim(),
            hot: formData.has('hot')
        };
        
        // Validate required fields
        if (!this.validateCafeForm(cafeData)) {
            return;
        }
        
        try {
            if (this.currentCafeId) {
                // Update existing cafe
                this.cafeManager.update(this.currentCafeId, cafeData);
                Toast.success('Cập nhật thành công');
            } else {
                // Create new cafe
                this.cafeManager.create(cafeData);
                Toast.success('Thêm quán thành công');
            }
            
            this.closeModals();
            this.renderCafeTable();
            this.updateStats();
        } catch (error) {
            Toast.error('Có lỗi xảy ra: ' + error.message);
        }
    }
    
    validateCafeForm(cafeData) {
        this.clearFormErrors();
        let isValid = true;
        
        if (!cafeData.name) {
            this.showFieldError('cafeNameError', 'Vui lòng nhập tên quán');
            isValid = false;
        }
        
        if (!cafeData.district) {
            this.showFieldError('cafeDistrictError', 'Vui lòng nhập quận');
            isValid = false;
        }
        
        if (!cafeData.address) {
            this.showFieldError('cafeAddressError', 'Vui lòng nhập địa chỉ');
            isValid = false;
        }
        
        return isValid;
    }
    
    editCafe(id) {
        const cafe = this.cafeManager.getById(id);
        if (cafe) {
            this.showCafeForm(cafe);
        }
    }
    
    deleteCafe(id) {
        const cafe = this.cafeManager.getById(id);
        if (!cafe) return;
        
        ConfirmModal.show(
            'Xác nhận xóa',
            `Bạn có chắc muốn xóa quán "${cafe.name}"?`,
            () => {
                if (this.cafeManager.delete(id)) {
                    Toast.success('Xóa quán thành công');
                    this.renderCafeTable();
                    this.updateStats();
                } else {
                    Toast.error('Không thể xóa quán');
                }
            }
        );
    }
    
    resetCafes() {
        ConfirmModal.show(
            'Khôi phục dữ liệu gốc',
            'Bạn có chắc muốn khôi phục dữ liệu gốc? Tất cả thay đổi sẽ bị mất.',
            async () => {
                try {
                    await this.cafeManager.resetToOriginal();
                    Toast.success('Đã khôi phục dữ liệu gốc');
                    this.renderCafeTable();
                    this.updateStats();
                } catch (error) {
                    Toast.error('Không thể khôi phục dữ liệu');
                }
            }
        );
    }
    
    // Post Management Methods
    renderPostTable() {
        const tbody = document.getElementById('postTableBody');
        const posts = this.postManager.getAll();
        
        tbody.innerHTML = '';
        
        posts.forEach((post, index) => {
            const publishDate = new Date(post.publishDate).toLocaleDateString('vi-VN');
            const statusClass = post.status === 'published' ? 'status-published' : 'status-draft';
            const statusText = post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp';
            const toggleText = post.status === 'published' ? 'Ẩn' : 'Xuất bản';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${post.title}</td>
                <td>${post.author}</td>
                <td>${publishDate}</td>
                <td>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-sm btn-edit" onclick="adminPanel.editPost(${post.id})">
                            <i class="fas fa-edit"></i> Sửa
                        </button>
                        <button class="btn-sm btn-toggle" onclick="adminPanel.togglePostStatus(${post.id})">
                            <i class="fas fa-toggle-on"></i> ${toggleText}
                        </button>
                        <button class="btn-sm btn-delete" onclick="adminPanel.deletePost(${post.id})">
                            <i class="fas fa-trash"></i> Xóa
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    showPostForm(post = null) {
        const modal = document.getElementById('postModal');
        const title = document.getElementById('postModalTitle');
        const form = document.getElementById('postForm');
        
        if (post) {
            title.textContent = 'Chỉnh sửa bài đăng';
            this.populatePostForm(post);
            this.currentPostId = post.id;
        } else {
            title.textContent = 'Thêm bài đăng mới';
            form.reset();
            this.contentEditor.clear();
            this.currentPostId = null;
        }
        
        this.clearFormErrors();
        modal.style.display = 'block';
    }
    
    populatePostForm(post) {
        document.getElementById('postTitle').value = post.title || '';
        document.getElementById('postAuthor').value = post.author || '';
        document.getElementById('postImage').value = post.image || '';
        document.getElementById('postStatus').value = post.status || 'draft';
        document.getElementById('postExcerpt').value = post.excerpt || '';
        this.contentEditor.setContent(post.content || '');
    }
    
    handlePostSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const postData = {
            title: formData.get('title').trim(),
            author: formData.get('author').trim(),
            image: formData.get('image').trim(),
            status: formData.get('status'),
            excerpt: formData.get('excerpt').trim(),
            content: this.contentEditor.getContent()
        };
        
        // Validate required fields
        if (!this.validatePostForm(postData)) {
            return;
        }
        
        try {
            if (this.currentPostId) {
                // Update existing post
                this.postManager.update(this.currentPostId, postData);
                Toast.success('Cập nhật bài đăng thành công');
            } else {
                // Create new post
                this.postManager.create(postData);
                Toast.success('Thêm bài đăng thành công');
            }
            
            this.closeModals();
            this.renderPostTable();
            this.updateStats();
        } catch (error) {
            Toast.error('Có lỗi xảy ra: ' + error.message);
        }
    }
    
    validatePostForm(postData) {
        this.clearFormErrors();
        let isValid = true;
        
        if (!postData.title) {
            this.showFieldError('postTitleError', 'Vui lòng nhập tiêu đề');
            isValid = false;
        }
        
        if (!postData.author) {
            this.showFieldError('postAuthorError', 'Vui lòng nhập tác giả');
            isValid = false;
        }
        
        if (!postData.content || postData.content.trim() === '') {
            this.showFieldError('postContentError', 'Vui lòng nhập nội dung');
            isValid = false;
        }
        
        return isValid;
    }
    
    editPost(id) {
        const post = this.postManager.getById(id);
        if (post) {
            this.showPostForm(post);
        }
    }
    
    deletePost(id) {
        const post = this.postManager.getById(id);
        if (!post) return;
        
        ConfirmModal.show(
            'Xác nhận xóa',
            `Bạn có chắc muốn xóa bài đăng "${post.title}"?`,
            () => {
                if (this.postManager.delete(id)) {
                    Toast.success('Xóa bài đăng thành công');
                    this.renderPostTable();
                    this.updateStats();
                } else {
                    Toast.error('Không thể xóa bài đăng');
                }
            }
        );
    }
    
    togglePostStatus(id) {
        const post = this.postManager.toggleStatus(id);
        if (post) {
            const message = post.status === 'published' ? 'Đã xuất bản bài đăng' : 'Đã ẩn bài đăng';
            Toast.success(message);
            this.renderPostTable();
            this.updateStats();
        } else {
            Toast.error('Không thể thay đổi trạng thái');
        }
    }
    
    clearPosts() {
        ConfirmModal.show(
            'Xóa tất cả bài đăng',
            'Bạn có chắc muốn xóa tất cả bài đăng? Hành động này không thể hoàn tác.',
            () => {
                if (this.postManager.clearAll()) {
                    Toast.success('Đã xóa tất cả bài đăng');
                    this.renderPostTable();
                    this.updateStats();
                } else {
                    Toast.error('Không thể xóa bài đăng');
                }
            }
        );
    }
    
    // Utility Methods
    showLoading(type) {
        const loadingElement = document.getElementById(`${type}Loading`);
        if (loadingElement) {
            loadingElement.style.display = 'block';
        }
    }
    
    hideLoading(type) {
        const loadingElement = document.getElementById(`${type}Loading`);
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }
    
    showFieldError(fieldId, message) {
        const errorElement = document.getElementById(fieldId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    clearFormErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }
}

// Global admin panel instance
let adminPanel;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('admin.html')) {
        adminPanel = new AdminPanel();
        adminPanel.init();
    }
});
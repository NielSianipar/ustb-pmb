        // Data Storage
        let users = [
            { id: 1, name: 'Ahmad Rizki', email: 'ahmad@email.com', role: 'admin', status: 'active', joinDate: '2024-01-15' },
            { id: 2, name: 'Siti Nurhaliza', email: 'siti@email.com', role: 'user', status: 'active', joinDate: '2024-01-10' },
            { id: 3, name: 'Budi Santoso', email: 'budi@email.com', role: 'moderator', status: 'inactive', joinDate: '2024-01-05' }
        ];

        let products = [
            { id: 1, name: 'Laptop Gaming', price: 15000000, category: 'elektronik', stock: 5 },
            { id: 2, name: 'Kemeja Batik', price: 250000, category: 'fashion', stock: 20 },
            { id: 3, name: 'Kopi Arabica', price: 75000, category: 'makanan', stock: 100 }
        ];

        let orders = [
            { id: 1, customer: 'Ahmad Rizki', product: 'Laptop Gaming', status: 'completed', total: 15000000, date: '2024-01-15' },
            { id: 2, customer: 'Siti Nurhaliza', product: 'Kemeja Batik', status: 'processing', total: 250000, date: '2024-01-16' },
            { id: 3, customer: 'Budi Santoso', product: 'Kopi Arabica', status: 'pending', total: 75000, date: '2024-01-17' }
        ];

        let editingUserId = null;

        // Page Navigation
        function showPage(pageName) {
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.remove('active');
            });
            
            // Remove active state from all sidebar items
            document.querySelectorAll('.sidebar-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(`page-${pageName}`).classList.add('active', 'fade-in');
            
            // Add active state to selected sidebar item
            event.target.classList.add('active');
            
            // Update page title
            const titles = {
                dashboard: { title: 'Dashboard', subtitle: 'Selamat datang kembali, Admin!' },
                users: { title: 'Manajemen Pengguna', subtitle: 'Kelola data pengguna sistem' },
                products: { title: 'Manajemen Produk', subtitle: 'Kelola katalog produk' },
                orders: { title: 'Manajemen Pesanan', subtitle: 'Pantau dan kelola pesanan' },
                analytics: { title: 'Analitik', subtitle: 'Lihat statistik dan laporan' },
                profile: { title: 'Profil Saya', subtitle: 'Kelola informasi akun Anda' },
                settings: { title: 'Pengaturan', subtitle: 'Konfigurasi sistem' }
            };
            
            document.getElementById('pageTitle').textContent = titles[pageName].title;
            document.getElementById('pageSubtitle').textContent = titles[pageName].subtitle;
            
            // Load data for specific pages
            if (pageName === 'dashboard') loadDashboard();
            else if (pageName === 'users') loadUsers();
            else if (pageName === 'products') loadProducts();
            else if (pageName === 'orders') loadOrders();
        }

        // Dashboard Functions
        function loadDashboard() {
            // Update stats
            document.getElementById('dashTotalUsers').textContent = users.length;
            document.getElementById('dashTotalProducts').textContent = products.length;
            document.getElementById('dashTotalOrders').textContent = orders.length;

            // Load recent activities
            const activities = [
                { action: 'Pengguna baru terdaftar', user: 'Ahmad Rizki', time: '2 menit yang lalu', icon: '👤' },
                { action: 'Produk baru ditambahkan', user: 'Admin', time: '15 menit yang lalu', icon: '📦' },
                { action: 'Pesanan diselesaikan', user: 'Siti Nurhaliza', time: '1 jam yang lalu', icon: '✅' },
                { action: 'Stok produk diperbarui', user: 'Admin', time: '2 jam yang lalu', icon: '📊' }
            ];

            document.getElementById('recentActivities').innerHTML = activities.map(activity => `
                <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div class="text-2xl">${activity.icon}</div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-800">${activity.action}</p>
                        <p class="text-xs text-gray-500">oleh ${activity.user} • ${activity.time}</p>
                    </div>
                </div>
            `).join('');

            // Load top products
            const topProducts = [
                { name: 'Laptop Gaming', sales: 45, trend: '↗️' },
                { name: 'Kemeja Batik', sales: 32, trend: '↗️' },
                { name: 'Kopi Arabica', sales: 28, trend: '↘️' }
            ];

            document.getElementById('topProducts').innerHTML = topProducts.map(product => `
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                        <p class="font-medium text-gray-800">${product.name}</p>
                        <p class="text-sm text-gray-600">${product.sales} terjual</p>
                    </div>
                    <div class="text-xl">${product.trend}</div>
                </div>
            `).join('');
        }

        // Users Management
        function loadUsers() {
            const tbody = document.getElementById('usersTableBody');
            tbody.innerHTML = users.map(user => `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                ${user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${user.name}</div>
                                <div class="text-sm text-gray-500">${user.email}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeClass(user.role)}">
                            ${user.role}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(user.status)}">
                            ${user.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${user.joinDate}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button onclick="editUser(${user.id})" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                        <button onclick="deleteUser(${user.id})" class="text-red-600 hover:text-red-900">Hapus</button>
                    </td>
                </tr>
            `).join('');
        }

        function getRoleBadgeClass(role) {
            const classes = {
                admin: 'bg-red-100 text-red-800',
                moderator: 'bg-yellow-100 text-yellow-800',
                user: 'bg-blue-100 text-blue-800'
            };
            return classes[role] || 'bg-gray-100 text-gray-800';
        }

        function getStatusBadgeClass(status) {
            return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
        }

        // Products Management
        function loadProducts() {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = products.map(product => `
                <div class="bg-gray-50 rounded-lg p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h4 class="text-lg font-semibold text-gray-800">${product.name}</h4>
                        <div class="flex space-x-2">
                            <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-800">✏️</button>
                            <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-800">🗑️</button>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <p class="text-2xl font-bold text-green-600">Rp ${product.price.toLocaleString('id-ID')}</p>
                        <p class="text-sm text-gray-600">Kategori: ${product.category}</p>
                        <p class="text-sm text-gray-600">Stok: ${product.stock} unit</p>
                    </div>
                </div>
            `).join('');
        }

        // Orders Management
        function loadOrders() {
            const container = document.getElementById('ordersList');
            container.innerHTML = orders.map(order => `
                <div class="bg-gray-50 rounded-lg p-6">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="flex items-center space-x-4 mb-2">
                                <h4 class="text-lg font-semibold text-gray-800">Pesanan #${order.id}</h4>
                                <span class="px-3 py-1 text-sm font-semibold rounded-full ${getOrderStatusClass(order.status)}">
                                    ${getOrderStatusText(order.status)}
                                </span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div>
                                    <p><strong>Pelanggan:</strong> ${order.customer}</p>
                                    <p><strong>Produk:</strong> ${order.product}</p>
                                </div>
                                <div>
                                    <p><strong>Total:</strong> Rp ${order.total.toLocaleString('id-ID')}</p>
                                    <p><strong>Tanggal:</strong> ${order.date}</p>
                                </div>
                                <div class="flex space-x-2">
                                    <select onchange="updateOrderStatus(${order.id}, this.value)" class="px-3 py-1 border border-gray-300 rounded text-sm">
                                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Diproses</option>
                                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Selesai</option>
                                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Dibatalkan</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function getOrderStatusClass(status) {
            const classes = {
                pending: 'bg-yellow-100 text-yellow-800',
                processing: 'bg-blue-100 text-blue-800',
                completed: 'bg-green-100 text-green-800',
                cancelled: 'bg-red-100 text-red-800'
            };
            return classes[status] || 'bg-gray-100 text-gray-800';
        }

        function getOrderStatusText(status) {
            const texts = {
                pending: 'Pending',
                processing: 'Diproses',
                completed: 'Selesai',
                cancelled: 'Dibatalkan'
            };
            return texts[status] || status;
        }

        // Profile Functions
        function editProfile() {
            alert('Fitur edit profil akan segera tersedia!');
        }

        function changePassword() {
            alert('Modal ubah password akan ditampilkan di sini!');
        }

        function toggle2FA() {
            alert('Pengaturan 2FA akan dikonfigurasi di sini!');
        }

        function changeProfilePicture() {
            alert('Fitur upload foto profil akan segera tersedia!');
        }

        // Modal Functions
        function showAddUserModal() {
            editingUserId = null;
            document.getElementById('userModalTitle').textContent = 'Tambah Pengguna';
            document.getElementById('userForm').reset();
            document.getElementById('userModal').classList.remove('hidden');
            document.getElementById('userModal').classList.add('flex');
        }

        function closeUserModal() {
            document.getElementById('userModal').classList.add('hidden');
            document.getElementById('userModal').classList.remove('flex');
        }

        function saveUser(event) {
            event.preventDefault();
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const role = document.getElementById('userRole').value;

            if (editingUserId) {
                const userIndex = users.findIndex(u => u.id === editingUserId);
                users[userIndex] = { ...users[userIndex], name, email, role };
            } else {
                const newId = Math.max(...users.map(u => u.id)) + 1;
                users.push({ 
                    id: newId, 
                    name, 
                    email, 
                    role, 
                    status: 'active',
                    joinDate: new Date().toISOString().split('T')[0]
                });
            }

            closeUserModal();
            loadUsers();
        }

        function editUser(id) {
            const user = users.find(u => u.id === id);
            if (user) {
                editingUserId = id;
                document.getElementById('userModalTitle').textContent = 'Edit Pengguna';
                document.getElementById('userName').value = user.name;
                document.getElementById('userEmail').value = user.email;
                document.getElementById('userRole').value = user.role;
                document.getElementById('userModal').classList.remove('hidden');
                document.getElementById('userModal').classList.add('flex');
            }
        }

        function deleteUser(id) {
            if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
                users = users.filter(u => u.id !== id);
                loadUsers();
            }
        }

        function searchUsers() {
            const searchTerm = document.getElementById('userSearch').value.toLowerCase();
            const filteredUsers = users.filter(user => 
                user.name.toLowerCase().includes(searchTerm) || 
                user.email.toLowerCase().includes(searchTerm)
            );
            
            const tbody = document.getElementById('usersTableBody');
            tbody.innerHTML = filteredUsers.map(user => `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                ${user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${user.name}</div>
                                <div class="text-sm text-gray-500">${user.email}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeClass(user.role)}">
                            ${user.role}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(user.status)}">
                            ${user.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${user.joinDate}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button onclick="editUser(${user.id})" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                        <button onclick="deleteUser(${user.id})" class="text-red-600 hover:text-red-900">Hapus</button>
                    </td>
                </tr>
            `).join('');
        }

        function updateOrderStatus(id, newStatus) {
            const order = orders.find(o => o.id === id);
            if (order) {
                order.status = newStatus;
                loadOrders();
            }
        }

        function filterOrders() {
            const filter = document.getElementById('orderFilter').value;
            const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);
            
            const container = document.getElementById('ordersList');
            container.innerHTML = filteredOrders.map(order => `
                <div class="bg-gray-50 rounded-lg p-6">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="flex items-center space-x-4 mb-2">
                                <h4 class="text-lg font-semibold text-gray-800">Pesanan #${order.id}</h4>
                                <span class="px-3 py-1 text-sm font-semibold rounded-full ${getOrderStatusClass(order.status)}">
                                    ${getOrderStatusText(order.status)}
                                </span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div>
                                    <p><strong>Pelanggan:</strong> ${order.customer}</p>
                                    <p><strong>Produk:</strong> ${order.product}</p>
                                </div>
                                <div>
                                    <p><strong>Total:</strong> Rp ${order.total.toLocaleString('id-ID')}</p>
                                    <p><strong>Tanggal:</strong> ${order.date}</p>
                                </div>
                                <div class="flex space-x-2">
                                    <select onchange="updateOrderStatus(${order.id}, this.value)" class="px-3 py-1 border border-gray-300 rounded text-sm">
                                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Diproses</option>
                                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Selesai</option>
                                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Dibatalkan</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function logout() {
            if (confirm('Apakah Anda yakin ingin keluar?')) {
                alert('Anda telah keluar dari sistem!');
            }
        }
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            loadDashboard();
        });
    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'984786aee715fd17',t:'MTc1ODc3MTg5OS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
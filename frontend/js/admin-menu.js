        // Toggle between student and admin dashboard
        function toggleDashboard() {
            const studentDash = document.getElementById('studentDashboard');
            const adminDash = document.getElementById('adminDashboard');
            const toggleBtn = document.getElementById('toggleView');
            const currentUser = document.getElementById('currentUser');

            if (studentDash.classList.contains('hidden')) {
                studentDash.classList.remove('hidden');
                adminDash.classList.add('hidden');
                toggleBtn.textContent = 'Lihat Dashboard Admin';
                currentUser.textContent = 'Ahmad Rizki';
            } else {
                studentDash.classList.add('hidden');
                adminDash.classList.remove('hidden');
                toggleBtn.textContent = 'Lihat Dashboard Mahasiswa';
                currentUser.textContent = 'Admin PMB';
                initCharts();
            }
        }

        document.getElementById('toggleView').addEventListener('click', toggleDashboard);

        // Initialize charts for admin dashboard
        function initCharts() {
            // Registration trend chart
            const ctx1 = document.getElementById('registrationChart').getContext('2d');
            new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
                    datasets: [{
                        label: 'Pendaftar',
                        data: [120, 350, 580, 920, 1200, 2847],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });

            // Program study distribution chart
            const ctx2 = document.getElementById('prodiChart').getContext('2d');
            new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: ['Teknik Informatika', 'Manajemen', 'Akuntansi', 'Psikologi', 'Lainnya'],
                    datasets: [{
                        data: [850, 620, 480, 390, 507],
                        backgroundColor: [
                            '#3b82f6',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444',
                            '#8b5cf6'
                        ]
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }

        // Modal functions
        function showModal(title, content) {
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalContent').innerHTML = content;
            document.getElementById('modal').classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('modal').classList.add('hidden');
        }

        // Student dashboard functions
        function showBiodata() {
            const content = `
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                            <input type="text" value="Ahmad Rizki Pratama" class="w-full p-3 border border-gray-300 rounded-lg" readonly>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">NIK</label>
                            <input type="text" value="3201234567890123" class="w-full p-3 border border-gray-300 rounded-lg" readonly>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Tempat Lahir</label>
                            <input type="text" value="Jakarta" class="w-full p-3 border border-gray-300 rounded-lg" readonly>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir</label>
                            <input type="date" value="2005-08-15" class="w-full p-3 border border-gray-300 rounded-lg" readonly>
                        </div>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div class="flex items-center">
                            <span class="text-green-600 text-xl mr-2">✅</span>
                            <span class="text-green-800 font-medium">Biodata telah lengkap dan tersimpan</span>
                        </div>
                    </div>
                </div>
            `;
            showModal('Biodata Diri', content);
        }

        function showUpload() {
            const content = `
                <div class="space-y-4">
                    <div class="grid grid-cols-1 gap-4">
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h4 class="font-medium text-gray-800">Ijazah/SKL</h4>
                                    <p class="text-sm text-gray-600">ijazah_ahmad_rizki.pdf</p>
                                </div>
                                <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Menunggu Verifikasi</span>
                            </div>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h4 class="font-medium text-gray-800">KTP</h4>
                                    <p class="text-sm text-gray-600">ktp_ahmad_rizki.jpg</p>
                                </div>
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Diterima</span>
                            </div>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h4 class="font-medium text-gray-800">Kartu Keluarga</h4>
                                    <p class="text-sm text-gray-600">kk_ahmad_rizki.jpg</p>
                                </div>
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Diterima</span>
                            </div>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h4 class="font-medium text-gray-800">Pas Foto</h4>
                                    <p class="text-sm text-gray-600">foto_ahmad_rizki.jpg</p>
                                </div>
                                <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Menunggu Verifikasi</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            showModal('Status Upload Berkas', content);
        }

        // Admin dashboard functions
        function showApplicants() {
            const content = `
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <input type="text" placeholder="Cari nama atau nomor pendaftaran..." class="flex-1 p-3 border border-gray-300 rounded-lg mr-4">
                        <select class="p-3 border border-gray-300 rounded-lg">
                            <option>Semua Status</option>
                            <option>Menunggu Verifikasi</option>
                            <option>Lulus Verifikasi</option>
                            <option>Ditolak</option>
                        </select>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full border-collapse border border-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="border border-gray-200 p-3 text-left">No. Pendaftaran</th>
                                    <th class="border border-gray-200 p-3 text-left">Nama</th>
                                    <th class="border border-gray-200 p-3 text-left">Program Studi</th>
                                    <th class="border border-gray-200 p-3 text-left">Status</th>
                                    <th class="border border-gray-200 p-3 text-left">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="border border-gray-200 p-3">PMB2024001234</td>
                                    <td class="border border-gray-200 p-3">Ahmad Rizki Pratama</td>
                                    <td class="border border-gray-200 p-3">Teknik Informatika</td>
                                    <td class="border border-gray-200 p-3"><span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Menunggu Verifikasi</span></td>
                                    <td class="border border-gray-200 p-3">
                                        <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm mr-2">Detail</button>
                                        <button class="bg-green-600 text-white px-3 py-1 rounded text-sm">Verifikasi</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border border-gray-200 p-3">PMB2024001235</td>
                                    <td class="border border-gray-200 p-3">Siti Nurhaliza</td>
                                    <td class="border border-gray-200 p-3">Manajemen</td>
                                    <td class="border border-gray-200 p-3"><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Lulus Verifikasi</span></td>
                                    <td class="border border-gray-200 p-3">
                                        <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm mr-2">Detail</button>
                                        <button class="bg-gray-400 text-white px-3 py-1 rounded text-sm">Terverifikasi</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            showModal('Manajemen Pendaftar', content);
        }

        function showVerification() {
            const content = `
                <div class="space-y-4">
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 class="font-medium text-yellow-800 mb-2">Berkas Menunggu Verifikasi: 342</h4>
                        <p class="text-yellow-700 text-sm">Prioritaskan verifikasi berkas yang sudah menunggu lebih dari 3 hari</p>
                    </div>
                    <div class="space-y-3">
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-medium text-gray-800">Ahmad Rizki Pratama</h4>
                                    <p class="text-sm text-gray-600">PMB2024001234 - Teknik Informatika</p>
                                    <p class="text-xs text-gray-500 mt-1">Menunggu: 2 hari</p>
                                </div>
                                <div class="flex space-x-2">
                                    <button class="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">Setujui</button>
                                    <button class="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700">Tolak</button>
                                </div>
                            </div>
                            <div class="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                                <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">✅ KTP</span>
                                <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">⏳ Ijazah</span>
                                <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">✅ KK</span>
                                <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">⏳ Foto</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            showModal('Verifikasi Berkas', content);
        }

        function showPayments() {
            const content = `
                <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 class="font-medium text-green-800">Pembayaran Berhasil</h4>
                            <p class="text-2xl font-bold text-green-600">1,923</p>
                        </div>
                        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 class="font-medium text-orange-800">Menunggu Konfirmasi</h4>
                            <p class="text-2xl font-bold text-orange-600">45</p>
                        </div>
                        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h4 class="font-medium text-red-800">Pembayaran Gagal</h4>
                            <p class="text-2xl font-bold text-red-600">12</p>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full border-collapse border border-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="border border-gray-200 p-3 text-left">No. Pendaftaran</th>
                                    <th class="border border-gray-200 p-3 text-left">Nama</th>
                                    <th class="border border-gray-200 p-3 text-left">Jumlah</th>
                                    <th class="border border-gray-200 p-3 text-left">Status</th>
                                    <th class="border border-gray-200 p-3 text-left">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="border border-gray-200 p-3">PMB2024001234</td>
                                    <td class="border border-gray-200 p-3">Ahmad Rizki Pratama</td>
                                    <td class="border border-gray-200 p-3">Rp 300.000</td>
                                    <td class="border border-gray-200 p-3"><span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Menunggu</span></td>
                                    <td class="border border-gray-200 p-3">10 Mar 2024</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            showModal('Manajemen Keuangan', content);
        }

        function showSettings() {
            const content = `
                <div class="space-y-6">
                    <div>
                        <h4 class="font-medium text-gray-800 mb-4">Jadwal Penting</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Batas Pendaftaran</label>
                                <input type="date" value="2024-03-15" class="w-full p-3 border border-gray-300 rounded-lg">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Ujian</label>
                                <input type="date" value="2024-03-25" class="w-full p-3 border border-gray-300 rounded-lg">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Pengumuman</label>
                                <input type="date" value="2024-04-05" class="w-full p-3 border border-gray-300 rounded-lg">
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-800 mb-4">Pengumuman Baru</h4>
                        <textarea class="w-full p-3 border border-gray-300 rounded-lg h-32" placeholder="Tulis pengumuman untuk calon mahasiswa..."></textarea>
                        <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Publikasikan</button>
                    </div>
                </div>
            `;
            showModal('Pengaturan Sistem', content);
        }

        function showReports() {
            const content = `
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="border border-gray-200 rounded-lg p-4">
                            <h4 class="font-medium text-gray-800 mb-2">Laporan Pendaftar per Prodi</h4>
                            <p class="text-sm text-gray-600 mb-4">Data lengkap pendaftar berdasarkan program studi</p>
                            <button class="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">📊 Export Excel</button>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <h4 class="font-medium text-gray-800 mb-2">Laporan Keuangan PMB</h4>
                            <p class="text-sm text-gray-600 mb-4">Ringkasan transaksi dan pembayaran</p>
                            <button class="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">💰 Export PDF</button>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <h4 class="font-medium text-gray-800 mb-2">Laporan Verifikasi Berkas</h4>
                            <p class="text-sm text-gray-600 mb-4">Status verifikasi dokumen pendaftar</p>
                            <button class="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700">📋 Export CSV</button>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <h4 class="font-medium text-gray-800 mb-2">Laporan Kelulusan</h4>
                            <p class="text-sm text-gray-600 mb-4">Daftar calon mahasiswa yang lulus seleksi</p>
                            <button class="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700">🏆 Export Excel</button>
                        </div>
                    </div>
                </div>
            `;
            showModal('Laporan PMB', content);
        }

        // Close modal when clicking outside
        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

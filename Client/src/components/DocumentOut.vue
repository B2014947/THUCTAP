<template>
    <div class="document-management">
        <h2>Danh sách văn bản gửi đi</h2>

        <!-- Form tìm kiếm -->
        <div class="search-form">
            <form @submit.prevent="searchDocuments">
                <div class="form-group">
                    <input type="text" v-model="searchTerm" placeholder="Tìm kiếm...">
                    <select v-model="selectedPriority">
                        <option value="">Tất cả ưu tiên</option>
                        <option v-for="priority in priorities" :key="priority.id" :value="priority.name">{{
                            priority.name }}</option>
                    </select>
                    <button type="submit">Tìm kiếm</button>
                </div>
            </form>
        </div>

        <!-- Bảng danh sách văn bản -->
        <div class="document-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên văn bản</th>
                        <th>Loại văn bản</th>
                        <th>Người gửi</th>
                        <th class="priority">Ưu tiên</th>
                        <th class="status">Trạng thái</th>
                        <th>Ghi chú</th>
                        <th>Vị trí hiện tại</th>
                        <th>Ngày tạo</th>
                        <th>Ngày kết thúc</th>
                        <th>Tệp đính kèm</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="document in filteredDocuments" :key="document.id">
                        <td>{{ document.id }}</td>
                        <td>{{ document.name }}</td>
                        <td>{{ document.documentType }}</td>
                        <td>{{ document.sender }}</td>
                        <td class="priority" :class="priorityClass(document.priority)">{{ document.priority }}</td>
                        <td class="status" :class="statusClass(document.status)">{{ document.status }}</td>
                        <td>{{ document.note }}</td>
                        <td>{{ document.currentPosition }}</td>
                        <td>{{ formatDateTime(document.createdDate) }}</td>
                        <td>{{ formatDateTime(document.endDate) }}</td>
                        <td>
                            <a :href="document.attachedFile" target="_blank" v-if="document.attachedFile">Xem tệp đính
                                kèm</a>
                            <span v-else>Không có tệp đính kèm</span>
                        </td>
                        <td>
                            <button @click="editDocument(document.id)">Chỉnh sửa</button>
                            <button @click="deleteDocument(document.id)">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            documents: [], // Danh sách văn bản
            searchTerm: '', // Thuật ngữ tìm kiếm
            selectedPriority: '', // Ưu tiên được chọn
            priorities: [ // Danh sách ưu tiên
                { id: 1, name: 'Bình thường' },
                { id: 2, name: 'Quan trọng' },
                { id: 3, name: 'Khẩn cấp' }
            ]
        };
    },
    mounted() {
        this.fetchDocuments();
    },
    methods: {
        fetchDocuments() {
            // Gọi API để lấy danh sách văn bản gửi đi từ đường dẫn của bạn
            fetch('http://localhost:5000/api/documentsOutgoing')
                .then(response => response.json())
                .then(data => {
                    this.documents = data;
                })
                .catch(error => {
                    console.error('Error fetching documents:', error);
                });
        },
        editDocument(id) {
            // Chuyển hướng hoặc thực hiện hành động chỉnh sửa văn bản
            console.log('Chỉnh sửa văn bản có ID:', id);
        },
        deleteDocument(id) {
            // Xác nhận xóa văn bản
            if (confirm('Bạn có chắc chắn muốn xóa văn bản này?')) {
                // Gọi API để xóa văn bản
                fetch(`http://localhost:5000/api/documentsOutgoing/${id}`, {
                    method: 'DELETE'
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.message);
                        // Sau khi xóa, cập nhật lại danh sách văn bản
                        this.fetchDocuments();
                    })
                    .catch(error => {
                        console.error('Error deleting document:', error);
                    });
            }
        },
        searchDocuments() {
            // Xử lý tìm kiếm với các tham số như searchTerm và selectedPriority
            // Gọi API để tìm kiếm văn bản với các tham số này
            console.log('Đang tìm kiếm với thuật ngữ:', this.searchTerm, 'và ưu tiên:', this.selectedPriority);
        },
        formatDateTime(dateTimeString) {
            // Hàm định dạng ngày giờ
            return new Date(dateTimeString).toLocaleString();
        },
        priorityClass(priority) {
            // Hàm trả về lớp CSS tương ứng với mức ưu tiên
            if (priority === 'Bình thường') {
                return 'normal';
            } else if (priority === 'Quan trọng') {
                return 'priority';
            } else if (priority === 'Khẩn cấp') {
                return 'urgent';
            } else {
                return '';
            }
        },
        statusClass(status) {
            // Hàm trả về lớp CSS tương ứng với trạng thái
            switch (status) {
                case 'Đã khởi tạo':
                    return 'initiated';
                case 'Đang xử lý':
                    return 'processing';
                case 'Đã hoàn thành':
                    return 'completed';
                case 'Đã hủy bỏ':
                    return 'cancelled';
                case 'Đã trả lại':
                    return 'returned';
                case 'Đã trả lại cho người gửi':
                    return 'returned-to-sender';
                case 'Đã chuyển tiếp':
                    return 'transferred';
                default:
                    return '';
            }
        }
    },
    computed: {
        filteredDocuments() {
            // Lọc danh sách văn bản dựa trên thuật ngữ tìm kiếm và ưu tiên được chọn
            if (!this.searchTerm && !this.selectedPriority) {
                return this.documents;
            }
            return this.documents.filter(document => {
                const matchesSearch = !this.searchTerm ||
                    document.name.toLowerCase().includes(this.searchTerm.toLowerCase());
                const matchesPriority = !this.selectedPriority ||
                    document.priority === this.selectedPriority;
                return matchesSearch && matchesPriority;
            });
        }
    }
};
</script>

<style scoped>
/* CSS đã được cung cấp */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    height: 100%;
}

.document-management {
    width: 100%;
    max-width: 100%;
    margin: auto;
    padding: 20px;
    background-color: #fffffe;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    color: #0f0e17;
}

.search-form {
    margin-bottom: 20px;
}

.search-form form {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.search-form .form-group {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    width: 100%;
}

.search-form input,
.search-form select {
    flex: 1;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
}

.search-form button {
    padding: 12px 16px;
    background-color: #ff8906;
    color: #fffffe;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.document-table {
    margin-bottom: 20px;
    overflow-x: auto;
}

.document-table table {
    width: 100%;
    border-collapse: collapse;
}

.document-table th,
.document-table td {
    border: 1px solid #ddd;
    padding: 10px;
    /* Reduced padding for smaller cells */
    text-align: center;
    white-space: normal;
    /* Allow content to wrap */
    word-wrap: break-word;
    /* Break long words */
}

.document-table th {
    background-color: #0f0e17;
    color: #fffffe;
}

.document-table button {
    margin-right: 8px;
    padding: 12px 16px;
    background-color: #ff8906;
    color: #fffffe;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.document-table button:hover {
    background-color: #e53170;
}

.add-document-form {
    width: 100%;
    max-width: 100%;
    margin-top: 20px;
}

.add-document-form form {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.add-document-form .form-group {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    width: 100%;
}

.add-document-form input,
.add-document-form select,
.add-document-form textarea {
    flex: 1;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
}

.add-document-form button {
    padding: 12px 16px;
    background-color: #ff8906;
    color: #fffffe;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

/* Additional classes for urgency levels */
.urgent {
    background-color: #e53170;
    color: #fffffe;
}

.priority {
    background-color: #ff8906;
    color: #fffffe;
}

.normal {
    background-color: #0f0e17;
    color: #fffffe;
}

/* Additional styling for status and priority columns */
td.priority,
td.status {
    width: 120px;
}

.initiated {
    background-color: #ff8906;
    color: #fffffe;
}

.processing {
    background-color: #f25f4c;
    color: #fffffe;
}

.completed {
    background-color: #70c1b3;
    color: #0f0e17;
}

.cancelled {
    background-color: #a7a9be;
    color: #0f0e17;
}

.returned {
    background-color: #e53170;
    color: #fffffe;
}

.returned-to-sender {
    background-color: #e53170;
    color: #fffffe;
}

.transferred {
    background-color: #f25f4c;
    color: #fffffe;
}
</style>
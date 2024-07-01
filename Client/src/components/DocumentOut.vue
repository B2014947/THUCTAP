<template>
    <div class="document-management">
        <h1>Quản lý văn bản đi</h1>

        <!-- Form tìm kiếm -->
        <div class="search-form">
            <h2>Tìm kiếm và cập nhật</h2>
            <form @submit.prevent="searchDocuments">
                <div class="form-group">
                    <input type="text" v-model="searchParams.name" placeholder="Tên văn bản">
                    <input type="text" v-model="searchParams.sender" placeholder="Người gửi">
                    <input type="text" v-model="searchParams.code" placeholder="Mã văn bản">
                </div>
                <div class="form-group">
                    <select v-model="searchParams.status">
                        <option value="">Tất cả trạng thái</option>
                        <option value="Khởi tạo">Khởi tạo</option>
                        <option value="Đang xử lý">Đang xử lý</option>
                        <option value="Hoàn thành">Hoàn thành</option>
                        <option value="Hủy văn bản">Hủy văn bản</option>
                        <option value="Bị trả về">Bị trả về</option>
                        <option value="Đã trả cho người nộp">Đã trả cho người nộp</option>
                        <option value="Đã chuyển hồ sơ">Đã chuyển hồ sơ</option>
                    </select>
                    <input type="text" v-model="searchParams.department" placeholder="Chọn phòng ban">
                    <select v-model="searchParams.documentType">
                        <option value="">Tất cả loại văn bản</option>
                        <option value="GM">Giấy mời</option>
                        <option value="TB">Thông báo</option>
                        <option value="KH">Kế hoạch</option>
                    </select>
                </div>
                <div class="form-group">
                    <input type="text" v-model="searchParams.priority" placeholder="Mức độ">
                    <input type="date" v-model="searchParams.createdDate" placeholder="Ngày tạo">
                    <input type="date" v-model="searchParams.updatedDate" placeholder="Ngày cập nhật">
                    <button type="submit">Tìm kiếm</button>
                </div>
            </form>
        </div>

        <!-- Bảng danh sách văn bản -->
        <div class="document-table">
            <h2>Danh sách văn bản</h2>
            <button @click="goToAddDocumentPage">Thêm văn bản</button>
            <table>
                <thead>
                    <tr>
                        <th>Mã văn bản</th>
                        <th>Tên văn bản</th>
                        <th>Loại văn bản</th>
                        <th>Người gửi</th>
                        <th>Mức độ</th>
                        <th>Trạng thái</th>
                        <th>Ghi chú</th>
                        <th>Vị trí hiện tại</th>
                        <th>Ngày khởi tạo</th>
                        <th>Ngày kết thúc</th>
                        <th>File đính kèm</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="document in filteredDocuments" :key="document.id">
                        <td>{{ document.code }}</td>
                        <td>{{ document.name }}</td>
                        <td>{{ document.documentType }}</td>
                        <td>{{ document.sender }}</td>
                        <td :class="priorityClass(document.priority)">{{ document.priority }}</td>
                        <td :class="statusClass(document.status)">{{ document.status }}</td>
                        <td>{{ document.note }}</td>
                        <td>{{ document.currentPosition }}</td>
                        <td>{{ document.createdDate }}</td>
                        <td>{{ document.endDate }}</td>
                        <td>
                            <!-- Kiểm tra nếu có file đính kèm -->
                            <template v-if="document.attachment">
                                <a :href="document.attachment.url" target="_blank">{{ document.attachment.name }}</a>
                            </template>
                            <template v-else>
                                Không có file đính kèm
                            </template>
                        </td>
                        <td>
                            <button @click="viewDocument(document.id)">Xem chi tiết</button>
                            <button @click="editDocument(document.id)">Sửa</button>
                            <button @click="deleteDocument(document.id)">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { documentsOutgoing } from '@/data/documentsOutgoing.js';

export default {
    data() {
        return {
            searchParams: {
                name: '',
                sender: '',
                code: '',
                status: '',
                department: '',
                documentType: '',
                priority: '',
                createdDate: '',
                updatedDate: ''
            },
            documents: documentsOutgoing,
            newDocument: {
                code: '',
                name: '',
                documentType: '',
                sender: '',
                priority: '',
                status: '',
                note: '',
                currentPosition: ''
            }
        };
    },
    computed: {
        filteredDocuments() {
            return this.documents.filter(document =>
                this.matchSearchParams(document)
            );
        }
    },
    methods: {
        matchSearchParams(document) {
            return (
                document.name.toLowerCase().includes(this.searchParams.name.toLowerCase()) &&
                document.sender.toLowerCase().includes(this.searchParams.sender.toLowerCase()) &&
                document.code.toLowerCase().includes(this.searchParams.code.toLowerCase()) &&
                (this.searchParams.status === '' || document.status === this.searchParams.status) &&
                (this.searchParams.department === '' || document.department === this.searchParams.department) &&
                (this.searchParams.documentType === '' || document.documentType === this.searchParams.documentType) &&
                (this.searchParams.priority === '' || document.priority === this.searchParams.priority) &&
                (this.searchParams.createdDate === '' || document.createdDate === this.searchParams.createdDate) &&
                (this.searchParams.updatedDate === '' || document.updatedDate === this.searchParams.updatedDate)
            );
        },
        searchDocuments() {
            console.log('Đang tìm kiếm văn bản...');
            // Xử lý tìm kiếm tại đây (ví dụ: gửi yêu cầu API, hoặc xử lý mảng dữ liệu)
        },
        goToAddDocumentPage() {
            this.$router.push('/add-document'); // Điều hướng đến route "/add-document"
        },
        viewDocument(id) {
            console.log('Xem chi tiết văn bản', id);
            // Xử lý xem chi tiết văn bản (ví dụ: hiển thị popup, chuyển hướng trang, ...)
        },
        editDocument(id) {
            console.log('Chỉnh sửa văn bản', id);
            // Xử lý chỉnh sửa văn bản (ví dụ: hiển thị form chỉnh sửa, gửi yêu cầu API, ...)
        },
        deleteDocument(id) {
            console.log('Xóa văn bản', id);
            this.documents = this.documents.filter(document => document.id !== id);
            // Xử lý xóa văn bản (ví dụ: gửi yêu cầu API, xóa khỏi mảng dữ liệu, ...)
        },
        priorityClass(priority) {
            switch (priority) {
                case 'Khẩn cấp':
                    return 'urgent';
                case 'Ưu tiên':
                    return 'priority';
                case 'Bình thường':
                    return 'normal';
                default:
                    return '';
            }
        },
        statusClass(status) {
            switch (status) {
                case 'Khởi tạo':
                    return 'initiated';
                case 'Đang xử lý':
                    return 'processing';
                case 'Hoàn thành':
                    return 'completed';
                case 'Hủy văn bản':
                    return 'cancelled';
                case 'Bị trả về':
                    return 'returned';
                case 'Đã trả cho người nộp':
                    return 'returned-to-sender';
                case 'Đã chuyển hồ sơ':
                    return 'transferred';
                default:
                    return '';
            }
        }
    }
};
</script>

<style scoped>
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

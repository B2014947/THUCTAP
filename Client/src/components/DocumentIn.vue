<template>
    <div class="document-management">
        <h1>Quản lý văn bản đến</h1>

        <!-- Form tìm kiếm -->
        <div class="search-form">
            <h2>Tìm kiếm và cập nhật</h2>
            <form @submit.prevent="searchDocuments">
                <div class="form-group">
                    <input type="text" v-model="searchParams.name" placeholder="Tên văn bản">
                    <input type="text" v-model="searchParams.department" placeholder="Đơn vị ban hành">
                    <input type="text" v-model="searchParams.code" placeholder="Sổ đến">
                    <input type="date" v-model="searchParams.arrivalDate" placeholder="Ngày đến">
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
                    <input type="text" v-model="searchParams.sender" placeholder="Người nhận">
                    <input type="text" v-model="searchParams.documentType" placeholder="Loại văn bản">
                    <input type="text" v-model="searchParams.priority" placeholder="Mức độ">
                    <input type="date" v-model="searchParams.createdDate" placeholder="Ngày tạo">
                    <input type="date" v-model="searchParams.updatedDate" placeholder="Ngày cập nhật">
                    <button type="submit">Tìm kiếm</button>
                </div>
            </form>
        </div>

        <!-- Bảng danh sách văn bản -->
        <div class="document-table">
            <h2>Danh sách văn đến</h2>
            <button @click="goToAddDocumentPage">Thêm văn bản</button>
            <table>
                <thead>
                    <tr>
                        <th>Sổ đến</th>
                        <th>Tên văn bản</th>
                        <th>Loại văn bản</th>
                        <th>Đơn vị ban hành</th>
                        <th>Người nhận</th>
                        <th>Mức độ</th>
                        <th>Trạng thái</th>
                        <th>Ghi chú</th>
                        <th>Vị trí hiện tại</th>
                        <th>Ngày đến</th>
                        <th>File đính kèm</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="document in filteredDocuments" :key="document.id">
                        <td>{{ document.code }}</td>
                        <td>{{ document.name || '' }}</td>
                        <td>{{ document.documentType }}</td>
                        <td>{{ document.department }}</td>
                        <td>{{ document.sender }}</td>
                        <td :class="priorityClass(document.priority)">{{ document.priority }}</td>
                        <td :class="statusClass(document.status)">{{ document.status }}</td>
                        <td>{{ document.note }}</td>
                        <td>{{ document.currentPosition }}</td>
                        <td>{{ document.arrivalDate }}</td>
                        <td>
                            <ul>
                                <li v-for="file in document.attachedFiles" :key="file.name">
                                    <a :href="file.url" target="_blank">{{ file.name }}</a>
                                </li>
                            </ul>
                        </td>
                        <td>
                            <button @click="viewDocument(document.id)">Xem chi tiết</button>
                            <button @click="editDocument(document.id)">Sửa</button>
                            <button @click="deleteDocument(document.id)">Xóa</button>
                            <button @click="transferDocument(document.id)">Chuyển</button>
                            <button @click="processDocument(document.id)">Chuyển xử lý</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { documentsIncoming } from '@/data/documentsIncoming.js';
import { members } from '@/data/members.js';
export default {
    data() {
        return {
            searchParams: {
                name: '',
                department: '',
                code: '',
                arrivalDate: '',
                status: '',
                sender: '',
                documentType: '',
                priority: '',
                createdDate: '',
                updatedDate: ''
            },
            documents: documentsIncoming,
            newDocument: {
                code: '',
                name: '',
                documentType: '',
                department: '',
                sender: '',
                priority: '',
                status: '',
                note: '',
                currentPosition: '',
                arrivalDate: '',
                attachedFiles: []
            },
            members: members
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
                (!this.searchParams.name || document.name.toLowerCase().includes(this.searchParams.name.toLowerCase())) &&
                (!this.searchParams.department || document.department.toLowerCase().includes(this.searchParams.department.toLowerCase())) &&
                (!this.searchParams.code || document.code.toLowerCase().includes(this.searchParams.code.toLowerCase())) &&
                (!this.searchParams.arrivalDate || document.arrivalDate.toLowerCase().includes(this.searchParams.arrivalDate.toLowerCase())) &&
                (!this.searchParams.status || document.status.toLowerCase().includes(this.searchParams.status.toLowerCase())) &&
                (!this.searchParams.sender || document.sender.toLowerCase().includes(this.searchParams.sender.toLowerCase())) &&
                (!this.searchParams.documentType || document.documentType.toLowerCase().includes(this.searchParams.documentType.toLowerCase())) &&
                (!this.searchParams.priority || document.priority.toLowerCase().includes(this.searchParams.priority.toLowerCase())) &&
                (!this.searchParams.createdDate || document.createdDate.toLowerCase().includes(this.searchParams.createdDate.toLowerCase())) &&
                (!this.searchParams.updatedDate || document.updatedDate.toLowerCase().includes(this.searchParams.updatedDate.toLowerCase()))
            );
        },
        searchDocuments() {
            console.log('Đang tìm kiếm văn đến...');
            // Xử lý tìm kiếm tại đây (ví dụ: gửi yêu cầu API, hoặc xử lý mảng dữ liệu)
        },
        goToAddDocumentPage() {
            this.$router.push('/add-document-in'); // Điều hướng đến route "/add-document"
        },
        viewDocument(id) {
            console.log('Xem chi tiết văn đến', id);
            // Xử lý xem chi tiết văn bản (ví dụ: hiển thị popup, chuyển hướng trang, ...)
        },
        editDocument(id) {
            console.log('Chỉnh sửa văn đến', id);
            // Xử lý chỉnh sửa văn bản (ví dụ: hiển thị form chỉnh sửa, gửi yêu cầu API, ...)
        },
        deleteDocument(id) {
            console.log('Xóa văn đến', id);
            this.documents = this.documents.filter(document => document.id !== id);
            // Xử lý xóa văn bản (ví dụ: gửi yêu cầu API, xóa khỏi mảng dữ liệu, ...)
        },
        transferDocument(id) {
            console.log('Chuyển văn đến', id);
            // Xử lý chuyển văn bản (ví dụ: gửi yêu cầu API, cập nhật trạng thái, ...)
        },
        processDocument(id) {
            console.log('Chuyển xử lý văn đến', id);
            // Xử lý chuyển xử lý văn bản (ví dụ: gửi yêu cầu API, cập nhật trạng thái, ...)
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
    /* Add horizontal scrolling if needed */
}

.document-table table {
    width: 100%;
    border-collapse: collapse;
}

.document-table th,
.document-table td {
    border: 1px solid #ddd;
    padding: 8px;
    /* Reduce padding to make cells smaller */
    text-align: center;
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
    display: grid;
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

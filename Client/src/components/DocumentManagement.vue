<template>
    <div class="document-management">
        <h1>Quản lý văn bản</h1>

        <!-- Form tìm kiếm -->
        <div class="search-form">
            <h2>Tìm kiếm và cập nhật</h2>
            <form @submit.prevent="searchDocuments">
                <input type="text" v-model="searchParams.name" placeholder="Tên văn bản">
                <input type="text" v-model="searchParams.sender" placeholder="Người gửi">
                <input type="text" v-model="searchParams.code" placeholder="Mã văn bản">
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
                    <!-- Thêm các loại văn bản khác tại đây -->
                </select>
                <input type="text" v-model="searchParams.priority" placeholder="Mức độ">
                <input type="date" v-model="searchParams.createdDate" placeholder="Ngày tạo">
                <input type="date" v-model="searchParams.updatedDate" placeholder="Ngày cập nhật">
                <button type="submit">Tìm kiếm</button>
            </form>
        </div>

        <!-- Bảng danh sách văn bản -->
        <div class="document-table">
            <h2>Danh sách văn bản</h2>
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
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="document in filteredDocuments" :key="document.id">
                        <td>{{ document.code }}</td>
                        <td>{{ document.name }}</td>
                        <td>{{ document.documentType }}</td>
                        <td>{{ document.sender }}</td>
                        <td>{{ document.priority }}</td>
                        <td>{{ document.status }}</td>
                        <td>{{ document.note }}</td>
                        <td>{{ document.currentPosition }}</td>
                        <td>
                            <button @click="viewDocument(document.id)">Xem chi tiết</button>
                            <button @click="editDocument(document.id)">Sửa</button>
                            <button @click="deleteDocument(document.id)">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Form thêm mới văn bản -->
        <div class="add-document-form">
            <h2>Thêm mới văn bản</h2>
            <form @submit.prevent="addNewDocument">
                <input type="text" v-model="newDocument.code" placeholder="Mã văn bản">
                <input type="text" v-model="newDocument.name" placeholder="Tên văn bản">
                <select v-model="newDocument.documentType">
                    <option value="GM">Giấy mời</option>
                    <option value="TB">Thông báo</option>
                    <option value="KH">Kế hoạch</option>
                    <!-- Thêm các loại văn bản khác tại đây -->
                </select>
                <input type="text" v-model="newDocument.sender" placeholder="Người gửi">
                <select v-model="newDocument.priority">
                    <option value="Bình thường">Bình thường</option>
                    <option value="Ưu tiên">Ưu tiên</option>
                    <option value="Khẩn cấp">Khẩn cấp</option>
                </select>
                <select v-model="newDocument.status">
                    <option value="Khởi tạo">Khởi tạo</option>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Hủy văn bản">Hủy văn bản</option>
                    <option value="Bị trả về">Bị trả về</option>
                    <option value="Đã trả cho người nộp">Đã trả cho người nộp</option>
                    <option value="Đã chuyển hồ sơ">Đã chuyển hồ sơ</option>
                </select>
                <input type="text" v-model="newDocument.note" placeholder="Ghi chú">
                <input type="text" v-model="newDocument.currentPosition" placeholder="Vị trí hiện tại">
                <button type="submit">Thêm mới</button>
            </form>
        </div>
    </div>
</template>

<script>
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
            documents: [
                {
                    id: 1,
                    code: 'VB001',
                    name: 'Thông báo về cuộc họp',
                    documentType: 'TB',
                    sender: 'Ban giám đốc',
                    priority: 'Ưu tiên',
                    status: 'Đang xử lý',
                    note: 'Cần chuẩn bị kế hoạch chi tiết cho cuộc họp',
                    currentPosition: 'Lãnh đạo phòng'
                },
                {
                    id: 2,
                    code: 'GM002',
                    name: 'Giấy mời tham dự sự kiện',
                    documentType: 'GM',
                    sender: 'Phòng Hành chính',
                    priority: 'Bình thường',
                    status: 'Hoàn thành',
                    note: 'Đã gửi thông tin chi tiết về sự kiện',
                    currentPosition: 'Văn thư'
                },
                // Thêm các văn bản khác tại đây
            ],
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
            // Xử lý tìm kiếm tại đây (ví dụ: gửi yêu cầu API, hoặc xử lý mảng dữ liệu)
            console.log('Đang tìm kiếm văn bản...');
        },
        addNewDocument() {
            // Xử lý thêm mới văn bản tại đây (ví dụ: gửi yêu cầu API, hoặc thêm vào mảng dữ liệu)
            console.log('Đang thêm mới văn bản...');
            this.documents.push({
                id: this.documents.length + 1,
                code: this.newDocument.code,
                name: this.newDocument.name,
                documentType: this.newDocument.documentType,
                sender: this.newDocument.sender,
                priority: this.newDocument.priority,
                status: this.newDocument.status,
                note: this.newDocument.note,
                currentPosition: this.newDocument.currentPosition
            });
            // Đặt lại form thêm mới sau khi thêm thành công
            this.newDocument = {
                code: '',
                name: '',
                documentType: '',
                sender: '',
                priority: '',
                status: '',
                note: '',
                currentPosition: ''
            };
        },
        viewDocument(id) {
            // Xử lý xem chi tiết văn bản (ví dụ: hiển thị popup, chuyển hướng trang, ...)
            console.log('Xem chi tiết văn bản', id);
        },
        editDocument(id) {
            // Xử lý chỉnh sửa văn bản (ví dụ: hiển thị form chỉnh sửa, gửi yêu cầu API, ...)
            console.log('Chỉnh sửa văn bản', id);
        },
        deleteDocument(id) {
            // Xử lý xóa văn bản (ví dụ: gửi yêu cầu API, xóa khỏi mảng dữ liệu, ...)
            console.log('Xóa văn bản', id);
            this.documents = this.documents.filter(document => document.id !== id);
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
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    background-color: #fffffe;
    /* White background */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    /* Shadow */
    border-radius: 8px;
    /* Rounded corners */
    color: #0f0e17;
    /* Text color */
}

.search-form {
    margin-bottom: 20px;
}

.search-form form {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.search-form input,
.search-form select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: calc(50% - 5px);
    /* Dynamic width for input and select with gap */
}

.search-form button {
    padding: 8px 12px;
    background-color: #ff8906;
    /* Orange background */
    color: #fffffe;
    /* White text */
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.document-table {
    margin-bottom: 20px;
}

.document-table table {
    width: 100%;
    border-collapse: collapse;
}

.document-table th,
.document-table td {
    border: 1px solid #ddd;
    padding: 12px;
    /* Increased padding for better spacing */
    text-align: center;
}

.document-table th {
    background-color: #0f0e17;
    /* Dark background */
    color: #fffffe;
    /* White text */
}

.document-table button {
    margin-right: 5px;
    padding: 8px 12px;
    background-color: #ff8906;
    /* Orange background */
    color: #fffffe;
    /* White text */
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.document-table button:hover {
    background-color: #e53170;
    /* Dark pink on hover */
}

.add-document-form {
    width: 100%;
    max-width: 600px;
    margin-top: 20px;
}

.add-document-form form {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.add-document-form input,
.add-document-form select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
}

.add-document-form button {
    padding: 8px 12px;
    background-color: #ff8906;
    /* Orange background */
    color: #fffffe;
    /* White text */
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>

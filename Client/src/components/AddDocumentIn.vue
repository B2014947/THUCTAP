<template>
    <div class="add-new-document">
        <h1>Thông tin văn bản đến</h1>
        <form @submit.prevent="transferToMembers">
            <div class="form-group">
                <div class="form-row">
                    <label for="code">Ký hiệu:</label>
                    <input type="text" id="code" v-model="newDocument.code" disabled>
                </div>
                <div class="form-row">
                    <label for="id">Số ký hiệu (*):</label>
                    <input type="text" id="id" v-model="newDocument.id" required>
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <label for="name">Tên văn bản (*):</label>
                    <input type="text" id="name" v-model="newDocument.name" required>
                </div>
                <div class="form-row">
                    <label for="summary">Trích yếu (*):</label>
                    <textarea id="summary" v-model="newDocument.summary" required></textarea>
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <label for="documentType">Loại văn bản (*):</label>
                    <select id="documentType" v-model="newDocument.documentType" required>
                        <option v-for="(type, index) in documentTypes" :key="index" :value="type.code">{{ type.name }}
                        </option>
                    </select>
                </div>
                <div class="form-row">
                    <label for="department">Đơn vị ban hành:</label>
                    <input type="text" id="department" v-model="newDocument.department" required>
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <label for="priority">Mức độ khẩn (*):</label>
                    <select id="priority" v-model="newDocument.priority" required>
                        <option value="Khẩn cấp">Khẩn cấp</option>
                        <option value="Ưu tiên">Ưu tiên</option>
                        <option value="Bình thường">Bình thường</option>
                    </select>
                </div>
                <div class="form-row">
                    <label for="status">Trạng thái:</label>
                    <select id="status" v-model="newDocument.status" required>
                        <option value="Khởi tạo">Khởi tạo</option>
                        <option value="Đang xử lý">Đang xử lý</option>
                        <option value="Hoàn thành">Hoàn thành</option>
                        <option value="Hủy văn bản">Hủy văn bản</option>
                        <option value="Bị trả về">Bị trả về</option>
                        <option value="Đã trả cho người nộp">Đã trả cho người nộp</option>
                        <option value="Đã chuyển hồ sơ">Đã chuyển hồ sơ</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <label for="note">Ghi chú:</label>
                    <textarea id="note" v-model="newDocument.note"></textarea>
                </div>
                <div class="form-row">
                    <label for="currentPosition">Vị trí hiện tại:</label>
                    <input type="text" id="currentPosition" v-model="newDocument.currentPosition" :disabled="true">
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <label for="createdDate">Ngày đến (*):</label>
                    <input type="date" id="createdDate" v-model="newDocument.createdDate" required>
                </div>
                <div class="form-row">
                    <label for="endDate">Hạn xử lý:</label>
                    <input type="date" id="endDate" v-model="newDocument.endDate">
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <label for="file">File đính kèm: </label>
                    <input type="file" id="file" @change="handleFileUpload">
                </div>
                <div class="form-row">
                    <label for="documentBook">Sổ văn bản:</label>
                    <select id="documentBook" v-model="newDocument.documentBook" required>
                        <option value="Sổ văn bản đến">Sổ văn bản đến</option>
                        <option value="Sổ văn bản đi">Sổ văn bản đi</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <label for="processingContent">Nội dung xử lý:</label>
                    <textarea id="processingContent" v-model="newDocument.processingContent"></textarea>
                </div>
            </div>
            <div class="button-group">
                <button type="button" @click="showMemberSelection(true)">Chuyển đến các thành viên được chọn</button>
                <button type="button" @click="showMemberSelection(false)">Chuyển xử lý</button>
                <button type="button" @click="closeForm">Đóng form</button>
            </div>
        </form>

        <div v-if="showMemberModal" class="modal">
            <div class="modal-content">
                <h2>Chọn thành viên</h2>
                <form @submit.prevent="confirmMemberSelection">
                    <div v-for="(member, index) in members" :key="index" class="member-item">
                        <label>{{ member.fullName }} - {{ member.role }}</label>
                        <input type="checkbox" v-if="multiSelect" :value="member.fullName" v-model="selectedMembers">
                        <input type="radio" v-else :value="member.fullName" v-model="selectedMembers">
                    </div>
                    <div class="button-group">
                        <button type="submit">Xác nhận</button>
                        <button type="button" @click="closeMemberModal">Đóng</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { documents } from '@/data/documents'; // Import documents data
import { documentTypes } from '@/data/documentTypes'; // Import document types data
import { members } from '@/data/members'; // Import members data

export default {
    data() {
        return {
            newDocument: {
                code: '',
                id: '',
                name: '',
                summary: '',
                documentType: '',
                department: '',
                priority: 'Bình thường',
                status: 'Khởi tạo',
                note: '',
                currentPosition: '', // Will be populated dynamically based on sender's position
                createdDate: '', // Will be populated with current date
                endDate: '', // Optional end date
                file: null, // File attachment
                documentBook: 'Sổ văn bản đến', // Default document book
                processingContent: '' // Added field for processing content
            },
            documentTypes: [], // Array to hold document types
            members: [], // Array to hold members
            showMemberModal: false,
            multiSelect: true, // Flag to toggle between multiple and single selection
            selectedMembers: [] // Array to hold selected members
        };
    },
    mounted() {
        this.documentTypes = documentTypes; // Assign document types from imported data
        this.members = members; // Assign members from imported data
    },
    methods: {
        showMemberSelection(multiSelect) {
            this.multiSelect = multiSelect;
            this.selectedMembers = multiSelect ? [] : '';
            this.showMemberModal = true;
        },
        confirmMemberSelection() {
            if (this.multiSelect) {
                alert('Đã chuyển đến các thành viên được chọn');
            } else {
                alert('Đã chuyển xử lý đến một thành viên');
            }
            this.showMemberModal = false;
        },
        closeMemberModal() {
            this.showMemberModal = false;
        },
        handleFileUpload(event) {
            this.newDocument.file = event.target.files[0];
        },
        closeForm() {
            this.$router.push('/document-in');
        }
    }
};
</script>

<style scoped>
h2 {
    text-align: center;
}

.add-new-document {
    width: 100%;
    max-width: 1000px;
    margin: auto;
    padding: 20px;
    background-color: #fffffe;
    color: #0f0e17;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.form-group {
    width: 48%;
    display: flex;
    flex-direction: column;
}

.form-row {
    margin-bottom: 15px;
}

label {
    width: 60vh;
    font-weight: bold;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
}

input,
textarea,
select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
}

textarea {
    resize: vertical;
}

.button-group {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
}

button {
    padding: 12px 24px;
    background-color: #ff8906;
    color: #fffffe;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #e53170;
}

/* Modal styles */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
}

.member-item {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
}
</style>

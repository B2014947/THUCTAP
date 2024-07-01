<template>
    <div class="add-new-document">
        <h1>Thông tin văn bản</h1>
        <form @submit.prevent="addNewDocument">
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
                    <label for="department">Đơn vị soạn thảo:</label>
                    <select id="department" v-model="newDocument.department" required>
                        <option v-for="(member, index) in members" :key="index" :value="member.fullName">{{
                            member.fullName }} - {{ member.role }}</option>
                    </select>
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
                    <label for="createdDate">Ngày khởi tạo (*):</label>
                    <input type="date" id="createdDate" v-model="newDocument.createdDate" required>
                </div>
                <div class="form-row">
                    <label for="endDate">Hạn xử lý:</label>
                    <input type="date" id="endDate" v-model="newDocument.endDate">
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <label for="file">File đính kèm:</label>
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
            <div class="button-group">
                <button type="submit">Thêm mới</button>
                <button type="button" @click="submitToLeader">Trình lãnh đạo đơn vị</button>
                <button type="button" @click="publishDocument">Ban hành</button>
            </div>
        </form>
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
                documentBook: 'Sổ văn bản đến' // Default document book
            },
            documentTypes: [], // Array to hold document types
            members: [] // Array to hold members
        };
    },
    mounted() {
        this.documentTypes = documentTypes; // Assign document types from imported data
        this.members = members; // Assign members from imported data
    },
    methods: {
        addNewDocument() {
            // Generate document code (combination of document type code and sequence number)
            const documentType = this.documentTypes.find(type => type.code === this.newDocument.documentType);
            const sequenceNumber = Math.floor(Math.random() * 1000); // Generate a random sequence number (example)
            this.newDocument.code = `${documentType.code}-${sequenceNumber}`;

            // Set current position based on sender's position
            const senderInfo = this.members.find(member => member.fullName === this.newDocument.department);
            this.newDocument.currentPosition = senderInfo.role; // Assign role as currentPosition for demonstration

            // Convert createdDate to ISO string
            if (this.newDocument.createdDate) {
                this.newDocument.createdDate = new Date(this.newDocument.createdDate).toISOString();
            }

            // Optionally convert endDate to ISO string if provided
            if (this.newDocument.endDate) {
                this.newDocument.endDate = new Date(this.newDocument.endDate).toISOString();
            }

            // Add new document to the documents array
            documents.push(this.newDocument);

            // Simulate adding document (replace with actual API call or data storage)
            alert('Đã thêm mới văn bản');
            console.log('Thông tin văn bản mới:', this.newDocument);

            // Navigate to document list page after adding document
            this.$router.push('/document-management');
        },
        handleFileUpload(event) {
            // Handle file upload, if needed
            this.newDocument.file = event.target.files[0];
        },
        submitToLeader() {
            // Logic to submit the document to the leader
            alert('Đã trình lãnh đạo đơn vị');
        },
        publishDocument() {
            // Logic to publish the document
            alert('Đã ban hành văn bản');
        }
    }
};
</script>

<style scoped>
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
    font-weight: bold;
    margin-bottom: 5px;
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
</style>

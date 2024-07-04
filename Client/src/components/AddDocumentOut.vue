<template>
    <div class="add-new-document">
        <h1>Thông tin văn bản đi</h1>
        <form @submit.prevent="addNewOutgoingDocument">
            <div class="form-group">
                <div class="form-row">
                    <label for="name">Tên văn bản (*):</label>
                    <input type="text" id="name" v-model="newOutgoingDocument.name" required>
                </div>
                <div class="form-row">
                    <label for="documentType">Loại văn bản (*):</label>
                    <select id="documentType" v-model="newOutgoingDocument.documentType" required>
                        <option v-for="type in documentTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <label for="priority">Mức độ ưu tiên (*):</label>
                    <select id="priority" v-model="newOutgoingDocument.priority" required>
                        <option v-for="priority in priorities" :key="priority.id" :value="priority.id">{{ priority.name
                            }}</option>
                    </select>
                </div>
                <div class="form-row">
                    <label for="status">Trạng thái (*):</label>
                    <select id="status" v-model="newOutgoingDocument.status" required>
                        <option v-for="status in statuses" :key="status.id" :value="status.id">{{ status.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <label for="note">Ghi chú:</label>
                    <textarea id="note" v-model="newOutgoingDocument.note"></textarea>
                </div>
                <div class="form-row">
                    <label for="endDate">Hạn xử lý:</label>
                    <input type="date" id="endDate" v-model="newOutgoingDocument.endDate">
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <label for="department">Bộ phận phát hành (*):</label>
                    <select id="department" v-model="newOutgoingDocument.departmentId" required>
                        <option v-for="department in departments" :key="department.id" :value="department.id">{{
                            department.name }}</option>
                    </select>
                </div>
                <div class="form-row">
                    <label for="attachedFile">Tệp đính kèm:</label>
                    <input type="file" id="attachedFile" ref="file" @change="handleFileChange">
                </div>
            </div>
            <div class="button-group">
                <button type="submit">Thêm mới</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            newOutgoingDocument: {
                name: '',
                documentType: '',
                priority: '',
                status: '',
                note: '',
                endDate: '',
                departmentId: '',
                attachedFile: null
            },
            documentTypes: [],
            priorities: [],
            statuses: [],
            departments: []
        };
    },
    mounted() {
        this.fetchDocumentTypes();
        this.fetchPriorities();
        this.fetchStatuses();
        this.fetchDepartments();
    },
    methods: {
        fetchDocumentTypes() {
            axios.get('http://localhost:5000/api/documentTypes')
                .then(response => {
                    this.documentTypes = response.data;
                })
                .catch(error => {
                    console.error('Error fetching document types:', error);
                });
        },
        fetchPriorities() {
            axios.get('http://localhost:5000/api/priorities')
                .then(response => {
                    this.priorities = response.data;
                })
                .catch(error => {
                    console.error('Error fetching priorities:', error);
                });
        },
        fetchStatuses() {
            axios.get('http://localhost:5000/api/statuses')
                .then(response => {
                    this.statuses = response.data;
                })
                .catch(error => {
                    console.error('Error fetching statuses:', error);
                });
        },
        fetchDepartments() {
            axios.get('http://localhost:5000/api/departments')
                .then(response => {
                    this.departments = response.data;
                })
                .catch(error => {
                    console.error('Error fetching departments:', error);
                });
        },
        handleFileChange(event) {
            this.newOutgoingDocument.attachedFile = event.target.files[0];
        },
        addNewOutgoingDocument() {
            let formData = new FormData();
            formData.append('name', this.newOutgoingDocument.name);
            formData.append('documentType', this.newOutgoingDocument.documentType);
            formData.append('priority', this.newOutgoingDocument.priority);
            formData.append('status', this.newOutgoingDocument.status);
            formData.append('note', this.newOutgoingDocument.note);
            formData.append('endDate', this.newOutgoingDocument.endDate);
            formData.append('departmentId', this.newOutgoingDocument.departmentId);
            formData.append('attachedFile', this.newOutgoingDocument.attachedFile);

            axios.post('http://localhost:5000/api/documentsOutgoing', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    alert('Thêm văn bản đi thành công');
                    console.log('Thông tin văn bản mới:', response.data);
                    this.$router.push('/document-out');
                })
                .catch(error => {
                    console.error('Lỗi khi thêm văn bản đi:', error);
                    alert('Lỗi khi thêm văn bản đi');
                });
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

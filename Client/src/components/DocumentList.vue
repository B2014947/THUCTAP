<template>
    <div class="document-list">
        <h1>Quản lý loại sổ văn bản</h1>
        <div class="search-bar">
            <input type="text" v-model="searchKeyword" placeholder="Nhập từ khóa tìm kiếm...">
            <button @click="search()">Tìm kiếm</button>
        </div>
        <button @click="navigateToAddNew()">Thêm mới</button>
        <table>
            <thead>
                <tr>
                    <th>Số</th>
                    <th>Ký hiệu</th>
                    <th>Tên loại văn bản</th>
                    <th>Ghi chú</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(document, index) in filteredDocuments" :key="document.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ document.code }}</td>
                    <td>{{ document.name }}</td>
                    <td>{{ document.note }}</td>
                    <td>
                        <button @click="editDocument(document.id)">Sửa</button>
                        <button @click="deleteDocument(document.id)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { documentTypes } from '@/data/documentTypes.js';

export default {
    data() {
        return {
            documents: documentTypes.map(doc => ({ ...doc, note: '' })),
            searchKeyword: ''
        };
    },
    computed: {
        filteredDocuments() {
            if (!this.searchKeyword) {
                return this.documents;
            }
            const keyword = this.searchKeyword.toLowerCase();
            return this.documents.filter(doc =>
                doc.code.toLowerCase().includes(keyword) ||
                doc.name.toLowerCase().includes(keyword) ||
                doc.note.toLowerCase().includes(keyword)
            );
        }
    },
    methods: {
        editDocument(id) {
            alert(`Chỉnh sửa văn bản với id: ${id}`);
        },
        deleteDocument(id) {
            this.documents = this.documents.filter(doc => doc.id !== id);
            alert(`Đã xóa văn bản với id: ${id}`);
        },
        navigateToAddNew() {
            this.$router.push('/add-new-document');
        },
        search() {

            console.log('Từ khóa tìm kiếm:', this.searchKeyword);
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

.document-list {
    width: 100%;
    padding: 20px;
    background-color: #fffffe;
    color: #0f0e17;
    min-height: 100vh;

    overflow: auto;

    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #0f0e17;
    color: #fffffe;
}

button {
    margin: 0 5px;
    padding: 5px 10px;
    background-color: #ff8906;
    color: #fffffe;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #e53170;
}

.search-bar {
    margin-bottom: 20px;

    display: flex;
    align-items: center;
}

.search-bar input[type="text"] {
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.search-bar button {
    padding: 8px 12px;

    background-color: #ff8906;
    color: #fffffe;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.search-bar button:hover {
    background-color: #e53170;
}
</style>

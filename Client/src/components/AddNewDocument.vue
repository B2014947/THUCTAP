<template>
    <div class="add-new-document">
        <h1>Thêm mới loại văn bản</h1>
        <form @submit.prevent="addNewDocument">
            <label for="code">Ký hiệu:</label>
            <input type="text" id="code" v-model="newDocument.code" required>
            <br><br>
            <label for="name">Tên loại văn bản:</label>
            <input type="text" id="name" v-model="newDocument.name" required>
            <br><br>
            <label for="note">Ghi chú:</label>
            <textarea id="note" v-model="newDocument.note"></textarea>
            <br><br>
            <button type="submit">Thêm mới</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newDocument: {
                code: '',
                name: '',
                note: ''
            }
        };
    },
    methods: {
        addNewDocument() {
            // Xử lý logic thêm mới văn bản
            // Ví dụ: Gửi dữ liệu này lên server, hoặc lưu vào danh sách documents
            alert('Đã thêm mới loại văn bản');
            // Sau khi thêm thành công, có thể điều hướng về trang danh sách loại văn bản
            this.$router.push('/document-list');
        }
    }
};
</script>

<style scoped>
.add-new-document {
    width: 1200px;
    padding: 20px;
    background-color: #fffffe;
    color: #0f0e17;
    border-radius: 8px;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    font-weight: bold;
}

input,
textarea {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

button {
    padding: 10px 20px;
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

<template>
    <div class="add-new-department">
        <h1>Thêm mới phòng ban</h1>
        <form @submit.prevent="addDepartment">
            <div class="form-group">
                <label for="name">Tên phòng ban:</label>
                <input type="text" id="name" v-model="department.name" required>
            </div>
            <div class="form-group">
                <label for="note">Ghi chú:</label>
                <textarea id="note" v-model="department.note"></textarea>
            </div>
            <div class="form-group">
                <button type="submit">Thêm mới</button>
                <button type="button" @click="goBack">Quay lại</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const department = ref({
    name: '',
    note: ''
});

const router = useRouter();

async function addDepartment() {
    try {
        const response = await axios.post('http://localhost:5000/api/departments', {
            name: department.value.name,
            note: department.value.note
        });
        alert('Thêm mới phòng ban thành công!');
        router.push('/department-list'); // Chuyển hướng về danh sách phòng ban sau khi thêm mới
    } catch (error) {
        console.error('Lỗi khi thêm mới phòng ban:', error);
        alert('Đã xảy ra lỗi khi thêm mới phòng ban.');
    }
}

function goBack() {
    router.push('/department-list'); // Quay lại danh sách phòng ban nếu không muốn thêm mới nữa
}
</script>

<style scoped>
.add-new-department {
    width: 100%;
    max-width: 600px;
    padding: 20px;
    background-color: #fffffe;
    color: #0f0e17;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: auto;
    /* Canh giữa trang */
    margin-top: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 8px 16px;
    background-color: #ff8906;
    color: #fffffe;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
}

button:hover {
    background-color: #e53170;
}
</style>

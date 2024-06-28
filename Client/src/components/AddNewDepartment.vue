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
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { departments } from '@/data/departments.js';

const department = ref({
    name: '',
    note: ''
});

function addDepartment() {
    // Tạo ID mới cho phòng ban (ví dụ sử dụng timestamp)
    const newDepartment = {
        id: Date.now(),
        name: department.value.name,
        note: department.value.note
    };

    // Thêm phòng ban vào danh sách
    departments.push(newDepartment);

    // Reset form
    department.value.name = '';
    department.value.note = '';

    alert('Đã thêm mới phòng ban thành công!');
}
</script>

<style scoped>
.add-new-department {
    width: 1200px;
    padding: 20px;
    background-color: #fffffe;
    color: #0f0e17;
    margin-top: 20px;
    border-radius: 8px;
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
}

button:hover {
    background-color: #e53170;
}
</style>

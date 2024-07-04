<template>
    <div class="page-wrapper">
        <div class="edit-department">
            <h1>Chỉnh sửa thông tin phòng ban</h1>
            <form @submit.prevent="saveChanges">
                <label for="name">Tên phòng ban:</label>
                <input type="text" id="name" v-model="editedDepartment.name" required>

                <label for="note">Ghi chú:</label>
                <textarea id="note" v-model="editedDepartment.note"></textarea>

                <button type="submit">Lưu thay đổi</button>
                <button type="button" @click="goBack">Quay lại</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const department = ref(null);
        const editedDepartment = ref({
            name: '',
            note: ''
        });
        const route = useRoute();
        const router = useRouter();
        const departmentId = route.params.id;

        // Lấy thông tin phòng ban và khởi tạo các dữ liệu cần thiết
        onMounted(async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/departments/${departmentId}`);
                department.value = response.data;
                editedDepartment.value.name = response.data.name; // Cập nhật tên phòng ban
                editedDepartment.value.note = response.data.note; // Cập nhật ghi chú
            } catch (error) {
                console.error('Error fetching department details:', error);
            }
        });

        const goBack = () => {
            router.push('/department-list');
        };

        const saveChanges = async () => {
            try {
                await axios.put(`http://localhost:5000/api/departments/${departmentId}`, editedDepartment.value);
                Object.assign(department.value, editedDepartment.value); // Cập nhật thông tin phòng ban
                router.push('/department-list');
            } catch (error) {
                console.error('Error saving department changes:', error);
            }
        };

        return {
            department,
            editedDepartment,
            saveChanges,
            goBack
        };
    }
};
</script>

<style scoped>
/* CSS cho trang chỉnh sửa phòng ban */
.page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #f4f4f9;
}

.edit-department {
    width: 100%;
    max-width: 600px;
    padding: 20px;
    background-color: #fffffe;
    color: #0f0e17;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    font-size: 1.5rem;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

input[type="text"],
textarea {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    margin-top: 10px;
    padding: 8px 12px;
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

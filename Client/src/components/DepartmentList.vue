<template>
    <div class="page-wrapper">
        <div class="department-list">
            <h1>Quản lý phòng ban</h1>
            <button @click="navigateToAddNew">Thêm mới</button>
            <input type="text" v-model="searchQuery" placeholder="Tìm kiếm theo tên phòng ban">
            <table>
                <thead>
                    <tr>
                        <th>Số</th>
                        <th>Tên phòng ban</th>
                        <th>Ghi chú</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody v-if="filteredDepartments.length > 0">
                    <tr v-for="(department, index) in filteredDepartments" :key="department.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ department.name }}</td>
                        <td>{{ department.note }}</td>
                        <td>
                            <button @click="editDepartment(department.id)">Sửa</button>
                            <button @click="deleteDepartment(department.id)">Xóa</button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="4" style="text-align: center;">Không có dữ liệu phòng ban phù hợp</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup() {
        const searchQuery = ref('');
        const filteredDepartments = ref([]);
        const router = useRouter();

        // Function to fetch departments from backend
        const fetchDepartments = () => {
            axios.get('http://localhost:5000/api/departments')
                .then(response => {
                    filteredDepartments.value = response.data;
                })
                .catch(error => {
                    console.error('Error fetching departments: ', error);
                });
        };

        // Call fetchDepartments when component is mounted
        onMounted(fetchDepartments);

        // Function to edit department
        const editDepartment = (id) => {
            router.push({ name: 'edit-department', params: { id } });
        };

        // Function to delete department
        const deleteDepartment = (id) => {
            const confirmed = confirm(`Bạn có chắc muốn xóa phòng ban với ID: ${id}?`);
            if (confirmed) {
                axios.delete(`http://localhost:5000/api/departments/${id}`)
                    .then(() => {
                        fetchDepartments(); // Refresh department list after deletion
                        alert(`Đã xóa phòng ban với ID: ${id}`);
                    })
                    .catch(error => {
                        console.error('Error deleting department: ', error);
                        alert('Xóa phòng ban không thành công');
                    });
            }
        };

        // Function to navigate to add new department page
        const navigateToAddNew = () => {
            router.push('/add-new-department');
        };

        return {
            searchQuery,
            filteredDepartments,
            editDepartment,
            deleteDepartment,
            navigateToAddNew
        };
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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f9;
    /* Background color for the entire page */
}

.department-list {
    width: 100%;
    max-width: 1000px;
    margin: 20px auto;
    /* Center align and add margin for spacing */
    padding: 20px;
    background-color: #fffffe;
    color: #0f0e17;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-height: 100vh;
    /* Ensure it covers the full height of the viewport */
    overflow: auto;
    /* Allow scrolling if content exceeds viewport height */
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
    text-align: center;
}

th {
    background-color: #0f0e17;
    color: #fffffe;
}

button {
    margin: 0 5px;
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

input[type="text"] {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

@media (max-width: 1000px) {
    .department-list {
        width: 100%;
        max-width: 100%;
    }
}
</style>

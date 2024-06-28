<template>
    <div class="role-management">
        <h1>Quản lý vai trò</h1>
        <button @click="navigateToAddNew()">Thêm mới</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên vai trò</th>
                    <th>Mô tả</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(role, index) in roles" :key="role.id">
                    <td>{{ role.id }}</td>
                    <td>{{ role.name }}</td>
                    <td>{{ role.description }}</td>
                    <td>
                        <button @click="editRole(role.id)">Sửa</button>
                        <button @click="deleteRole(role.id)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { roles } from '@/data/roles.js'; // Import danh sách vai trò từ file roles.js

export default {
    setup() {
        const router = useRouter();

        const editRole = (id) => {
            alert(`Chỉnh sửa vai trò với ID: ${id}`);
        };

        const deleteRole = (id) => {
            const confirmed = confirm(`Bạn có chắc muốn xóa vai trò với ID: ${id}?`);
            if (confirmed) {
                const index = roles.findIndex(role => role.id === id);
                if (index !== -1) {
                    roles.splice(index, 1);
                    alert(`Đã xóa vai trò với ID: ${id}`);
                }
            }
        };

        const navigateToAddNew = () => {
            router.push('/add-new-role');
        };

        return {
            roles,
            editRole,
            deleteRole,
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
}

.role-management {
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
</style>

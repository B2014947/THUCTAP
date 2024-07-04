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
                    <th>Quyền</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="role in roles" :key="role.id">
                    <td>{{ role.id }}</td>
                    <td>{{ role.name }}</td>
                    <td>{{ role.description }}</td>
                    <td>
                        <div class="permission-list">
                            <span v-for="(permission, index) in role.permissions" :key="index" class="permission-item">
                                {{ permission }}
                            </span>
                        </div>
                    </td>
                    <td>
                        <button @click="editRole(role.id)">Sửa</button>
                        <button @click="confirmDelete(role.id)">Xóa</button>
                    </td>
                </tr>
                <tr v-if="roles.length === 0">
                    <td colspan="5" style="text-align: center;">Không có dữ liệu vai trò</td>
                </tr>
            </tbody>
        </table>

        <!-- Nút hoặc liên kết để mở trang chỉnh sửa vai trò -->
        <router-link v-if="selectedRoleId !== null" :to="{ path: `/edit-role/${selectedRoleId}` }">Chỉnh sửa vai
            trò</router-link>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const roles = ref([]);
        const selectedRoleId = ref(null);
        const router = useRouter();

        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/roles');
                roles.value = response.data;
            } catch (error) {
                console.error('Lỗi khi lấy danh sách vai trò:', error);
                alert('Đã xảy ra lỗi khi lấy danh sách vai trò.');
            }
        };

        onMounted(fetchRoles);

        const editRole = async (id) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/roles/${id}`);
                selectedRoleId.value = id;
            } catch (error) {
                console.error('Lỗi khi lấy thông tin vai trò:', error);
                alert('Đã xảy ra lỗi khi lấy thông tin vai trò.');
            }
        };

        const confirmDelete = async (id) => {
            const confirmed = confirm(`Bạn có chắc muốn xóa vai trò với ID: ${id}?`);
            if (confirmed) {
                try {
                    await axios.delete(`http://localhost:5000/api/roles/${id}`);
                    roles.value = roles.value.filter(role => role.id !== id);
                    alert(`Đã xóa vai trò với ID: ${id}`);
                } catch (error) {
                    console.error('Lỗi khi xóa vai trò:', error);
                    alert('Đã xảy ra lỗi khi xóa vai trò.');
                }
            }
        };

        const navigateToAddNew = () => {
            router.push('/add-new-role');
        };

        return {
            roles,
            selectedRoleId,
            editRole,
            confirmDelete,
            navigateToAddNew
        };
    }
};
</script>

<style scoped>
.role-management {
    width: 100%;
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fffffe;
    color: #0f0e17;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-height: 100vh;
    overflow: auto;
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
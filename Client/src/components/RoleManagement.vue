<template>
    <div class="role-management">
        <h1>Quản lý vai trò</h1>
        <div class="action-bar">
            <button @click="navigateToAddNew()">Thêm mới</button>
        </div>
        <div class="table-container">
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
                    <tr v-if="roles.length === 0">
                        <td colspan="5" style="text-align: center;">Không có dữ liệu vai trò</td>
                    </tr>
                    <tr v-for="role in roles" :key="role.id">
                        <td>{{ role.id }}</td>
                        <td>{{ role.name }}</td>
                        <td>{{ role.description }}</td>
                        <td>
                            <div class="permission-list">
                                <span class="permission-item" v-for="(permission, index) in role.permissions"
                                    :key="index">
                                    {{ permission }}
                                </span>
                            </div>
                        </td>
                        <td>
                            <router-link :to="`/edit-role/${role.id}`" class="action-link">Sửa</router-link>
                            <button @click="confirmDelete(role.id)" class="action-button">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Router link for editing a selected role -->
        <router-link v-if="selectedRoleId !== null" :to="{ path: `/edit-role/${selectedRoleId}` }"
            class="action-link">Chỉnh sửa vai trò</router-link>
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
            confirmDelete,
            navigateToAddNew
        };
    }
};
</script>

<style scoped>
.role-management {
    width: 100%;
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fffffe;
    color: #0f0e17;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 12px;
}

th {
    background-color: #0f0e17;
    color: #fffffe;
    white-space: nowrap;
}

button {
    padding: 10px 20px;
    background-color: #ff8906;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #e53170;
}

@media (max-width: 768px) {
    .role-management {
        padding: 15px;
    }

    .role-management h1 {
        font-size: 24px;
    }

    .table-container {
        overflow-x: auto;
    }

    table {
        font-size: 14px;
    }

    th,
    td {
        padding: 10px;
    }
}

.action-link {
    display: inline-block;
    margin-right: 10px;
    padding: 10px 20px;
    background-color: #ff8906;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
}

.action-button {
    padding: 10px 20px;
    background-color: #ff8906;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.action-button:hover,
.action-link:hover {
    background-color: #e53170;
}

.permission-list {
    display: flex;
    flex-wrap: wrap;
}

.permission-item {
    padding: 1px 1px;
    background-color: #9bffac;
    border-radius: 2px;
    color: #333333;
}
</style>

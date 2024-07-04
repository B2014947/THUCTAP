<template>
    <div class="edit-role">
        <h2>Chỉnh sửa vai trò và quyền</h2>
        <p>ID vai trò: {{ selectedRoleId }}</p>
        <p>Tên vai trò: {{ selectedRole.name }}</p>
        <p>Mô tả: {{ selectedRole.description }}</p>

        <h3>Quyền:</h3>
        <div class="permissions">
            <span v-for="(permission, index) in selectedRole.permissions" :key="index" class="permission">
                {{ permission.name }}
            </span>
        </div>

        <router-link :to="{ path: '/role-management' }">Quay lại danh sách vai trò</router-link>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const selectedRoleId = ref(null);
        const selectedRole = ref({});
        const route = useRoute();

        onMounted(async () => {
            const roleId = parseInt(route.params.id);
            if (!isNaN(roleId)) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/roles/${roleId}`);
                    selectedRoleId.value = roleId;
                    selectedRole.value = response.data;
                } catch (error) {
                    console.error('Lỗi khi lấy thông tin vai trò:', error);
                    alert('Đã xảy ra lỗi khi lấy thông tin vai trò.');
                }
            } else {
                alert('ID vai trò không hợp lệ.');
            }
        });

        return {
            selectedRoleId,
            selectedRole,
        };
    }
};
</script>

<style scoped>
.edit-role {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
}

.edit-role h2 {
    margin-bottom: 20px;
    color: #333333;
    font-size: 24px;
}

.edit-role p {
    margin-bottom: 10px;
    color: #666666;
}

.edit-role h3 {
    margin-top: 30px;
    margin-bottom: 15px;
    color: #333333;
    font-size: 20px;
}

.permissions {
    display: flex;
    flex-wrap: wrap;
}

.permission {
    background-color: #f0f0f0;
    padding: 10px 15px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    color: #333333;
    font-size: 14px;
    display: inline-block;
}

.permission:last-child {
    margin-right: 0;
}

.router-link {
    margin-top: 20px;
    display: inline-block;
    color: #007bff;
    text-decoration: none;
    font-size: 16px;
}

.router-link:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .edit-role {
        padding: 15px;
    }

    .edit-role h2 {
        font-size: 22px;
    }

    .edit-role h3 {
        font-size: 18px;
    }

    .permission {
        font-size: 13px;
        padding: 8px 12px;
    }
}
</style>

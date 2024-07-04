<template>
    <div class="edit-role">
        <h2>Chỉnh sửa vai trò và quyền</h2>
        <p>ID vai trò: {{ selectedRoleId }}</p>

        <div class="form-group">
            <label for="roleName">Tên vai trò:</label>
            <input id="roleName" v-model="selectedRole.name" />
        </div>

        <div class="form-group">
            <label for="roleDescription">Mô tả:</label>
            <input id="roleDescription" v-model="selectedRole.description" />
        </div>

        <h3>Quyền:</h3>
        <ul class="permissions">
            <li v-for="(permission, index) in selectedRole.permissions" :key="index" class="permission">
                {{ permission.name }}
                <button @click="removePermission(permission.id)">Xóa</button>
            </li>
        </ul>

        <div class="form-group">
            <label for="newPermission">Thêm quyền mới:</label>
            <select id="newPermission" v-model="newPermissionId">
                <option v-for="permission in allPermissions" :key="permission.id" :value="permission.id">
                    {{ permission.name }}
                </option>
            </select>
            <button @click="addPermission">Thêm</button>
        </div>

        <button @click="updateRole">Cập nhật vai trò</button>
        <button class="back-button" @click="goToRoleList">Quay lại danh sách vai trò</button>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

export default {
    setup() {
        const selectedRoleId = ref(null);
        const selectedRole = ref({});
        const allPermissions = ref([]);
        const newPermissionId = ref(null);
        const route = useRoute();
        const router = useRouter();

        onMounted(async () => {
            const roleId = parseInt(route.params.id);
            if (!isNaN(roleId)) {
                try {
                    // Lấy thông tin vai trò
                    const roleResponse = await axios.get(
                        `http://localhost:5000/api/roles/${roleId}`
                    );
                    selectedRoleId.value = roleId;
                    selectedRole.value = roleResponse.data;

                    // Lấy tất cả quyền
                    const permissionsResponse = await axios.get(
                        "http://localhost:5000/api/permissions"
                    );
                    allPermissions.value = permissionsResponse.data;
                } catch (error) {
                    console.error("Lỗi khi lấy thông tin vai trò:", error);
                    alert("Đã xảy ra lỗi khi lấy thông tin vai trò.");
                }
            } else {
                alert("ID vai trò không hợp lệ.");
            }
        });

        const removePermission = (permissionId) => {
            selectedRole.value.permissions = selectedRole.value.permissions.filter(
                (permission) => permission.id !== permissionId
            );
        };

        const addPermission = () => {
            const permission = allPermissions.value.find(
                (perm) => perm.id === newPermissionId.value
            );
            if (
                permission &&
                !selectedRole.value.permissions.some((perm) => perm.id === permission.id)
            ) {
                selectedRole.value.permissions.push(permission);
            }
        };

        const updateRole = async () => {
            try {
                const updateData = {
                    name: selectedRole.value.name,
                    description: selectedRole.value.description,
                    permissions: selectedRole.value.permissions.map((perm) => perm.id),
                };
                await axios.put(
                    `http://localhost:5000/api/roles/${selectedRoleId.value}`,
                    updateData
                );
                alert("Cập nhật vai trò thành công.");
                router.push("/role-management");
            } catch (error) {
                console.error("Lỗi khi cập nhật vai trò:", error);
                alert("Đã xảy ra lỗi khi cập nhật vai trò.");
            }
        };

        const goToRoleList = () => {
            router.push("/role-management");
        };

        return {
            selectedRoleId,
            selectedRole,
            allPermissions,
            newPermissionId,
            removePermission,
            addPermission,
            updateRole,
            goToRoleList,
        };
    },
};
</script>

<style scoped>
.edit-role {
    background-color: #ffffff;
    color: #333333;
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
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
}

.permission {
    background-color: #eaeaea;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 4px;
    color: #333333;
    font-size: 14px;
    display: flex;
    align-items: center;
}

.permission button {
    margin-left: 10px;
    background-color: #e74c3c;
    color: #ffffff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.permission button:hover {
    background-color: #c0392b;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #333333;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #cccccc;
    border-radius: 4px;
}

button {
    background-color: #ff8906;
    color: #ffffff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    margin-right: 10px;
}

button:hover {
    background-color: #e53170;
}

.back-button {
    background-color: #ff8906;
    color: #ffffff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
}

.back-button:hover {
    background-color: #e53170;
}
</style>

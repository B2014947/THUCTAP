<template>
    <div class="add-new-role">
        <h1>Thêm mới vai trò</h1>
        <form @submit.prevent="addRole">
            <div class="form-group">
                <label for="name">Tên vai trò:</label>
                <input type="text" id="name" v-model="newRole.name" required>
            </div>
            <div class="form-group">
                <label for="description">Mô tả:</label>
                <textarea id="description" v-model="newRole.description" required></textarea>
            </div>
            <div class="form-group">
                <label>Chọn quyền:</label>
                <div class="permission-list">
                    <div v-for="category in categorizedPermissions" :key="category.name" class="permission-category">
                        <h3>{{ category.name }}</h3>
                        <div v-for="permission in category.permissions" :key="permission.id" class="permission-item">
                            <input type="checkbox" :id="'perm-' + permission.id" :value="permission.id"
                                v-model="newRole.permissions">
                            <label :for="'perm-' + permission.id">{{ permission.name }}</label>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit">Thêm mới</button>
        </form>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup() {
        const newRole = ref({
            name: '',
            description: '',
            permissions: []
        });

        const permissions = ref([]);
        const categorizedPermissions = ref([]);

        const fetchPermissions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/permissions');
                permissions.value = response.data;

                // Categorize permissions
                const categorized = categorizePermissions(response.data);
                categorizedPermissions.value = categorized;
            } catch (error) {
                console.error('Error fetching permissions:', error);
            }
        };

        const categorizePermissions = (permissions) => {
            const categorized = {
                'Phòng ban': [],
                'Loại văn bản': [],
                'Văn bản': [],
                'Thành viên': [],
                'Vai trò': [],
                'Truy cập hệ thống': [],
                'Khác': []
            };

            permissions.forEach(permission => {
                const category = getCategory(permission.name);
                categorized[category].push(permission);
            });

            // Remove empty categories
            Object.keys(categorized).forEach(key => {
                if (categorized[key].length === 0) {
                    delete categorized[key];
                }
            });

            return Object.keys(categorized).map(key => ({
                name: key,
                permissions: categorized[key]
            }));
        };

        // Function to categorize permissions
        const getCategory = (permissionName) => {
            if (permissionName.includes('phòng ban')) {
                return 'Phòng ban';
            } else if (permissionName.includes('loại văn bản')) {
                return 'Loại văn bản';
            } else if (permissionName.includes('văn bản')) {
                return 'Văn bản';
            } else if (permissionName.includes('thành viên')) {
                return 'Thành viên';
            } else if (permissionName.includes('vai trò')) {
                return 'Vai trò';
            } else if (permissionName.includes('truy cập hệ thống')) {
                return 'Truy cập hệ thống';
            } else {
                return 'Khác';
            }
        };

        onMounted(() => {
            fetchPermissions();
        });

        const router = useRouter();

        const addRole = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/roles', newRole.value);
                if (response.status === 201) {
                    alert('Vai trò mới đã được thêm');
                    router.push('/role-management');
                }
            } catch (error) {
                console.error('Lỗi khi thêm vai trò:', error);
                alert('Đã xảy ra lỗi khi thêm vai trò.');
            }
        };

        return {
            newRole,
            categorizedPermissions,
            addRole
        };
    }
};
</script>
<style scoped>
.add-new-role {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    color: #333333;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
textarea {
    width: calc(100% - 22px);
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    font-size: 14px;
}

textarea {
    min-height: 100px;
}

button {
    margin-top: 15px;
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

.permission-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;

}

.permission-category {
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 15px;
}

.permission-category h3 {
    color: #333333;
    margin-bottom: 15px;
}

.permission-item {
    display: flex;
    align-items: center;
    background-color: #f3a756;
    color: #333333;
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid #cccccc;
    cursor: pointer;
    margin: 10px;
}

.permission-item input[type="checkbox"] {
    margin-right: 8px;
}

.permission-item label {
    flex-grow: 1;

    /* Để nhãn chiếm phần còn lại của dòng */
}

@media (max-width: 768px) {
    .add-new-role {
        width: 100%;
        padding: 15px;
    }

    .add-new-role h1 {
        font-size: 24px;
    }

    .permission-category {
        max-width: 100%;
    }
}
</style>

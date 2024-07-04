<template>
    <div class="member-detail" v-if="member">
        <div class="avatar-container">
            <h1>Thông tin chi tiết thành viên</h1>
            <img :src="member.avatarUrl" alt="Avatar">
        </div>
        <div class="detail-container">
            <div class="detail-group">
                <div class="detail-item">
                    <label>ID:</label>
                    <span>{{ member.id }}</span>
                </div>
                <div class="detail-item">
                    <label>Tên tài khoản:</label>
                    <span>{{ member.username }}</span>
                </div>
                <div class="detail-item">
                    <label>Họ và tên:</label>
                    <input type="text" v-model="editedMember.fullName" :disabled="!isEditing">
                </div>
                <div class="detail-item">
                    <label>Email:</label>
                    <input type="text" v-model="editedMember.email" :disabled="!isEditing">
                </div>
                <div class="detail-item">
                    <label>Số điện thoại:</label>
                    <input type="text" v-model="editedMember.phone" :disabled="!isEditing">
                </div>
                <div class="detail-item">
                    <label>Số nội bộ:</label>
                    <input type="text" v-model="editedMember.internalNumber" :disabled="!isEditing">
                </div>
                <div class="detail-item">
                    <label>Chứng minh nhân dân:</label>
                    <input type="text" v-model="editedMember.cmnd" :disabled="!isEditing">
                </div>
                <div class="detail-item">
                    <label>Địa chỉ:</label>
                    <input type="text" v-model="editedMember.address" :disabled="!isEditing">
                </div>
            </div>
            <div class="detail-group">
                <div class="detail-item">
                    <label>Ngày bắt đầu làm việc:</label>
                    <input type="text" v-model="editedMember.startDate" :disabled="!isEditing">
                </div>
                <div class="detail-item">
                    <label>Trình độ học vấn:</label>
                    <input type="text" v-model="editedMember.education" :disabled="!isEditing">
                </div>
                <div class="detail-item">
                    <label>Bằng cấp:</label>
                    <input type="text" v-model="editedMember.qualification" :disabled="!isEditing">
                </div>
                <div class="detail-item">
                    <label>Kinh nghiệm làm việc:</label>
                    <input type="text" v-model="editedMember.experience" :disabled="!isEditing">
                </div>
                <div class="detail-item">
                    <label>Kỹ năng:</label>
                    <input type="text" v-model="editedMember.skills" :disabled="!isEditing">
                </div>
                <div class="detail-item">
                    <label>Giới thiệu ngắn:</label>
                    <textarea v-model="editedMember.bio" :disabled="!isEditing"></textarea>
                </div>
                <div class="detail-item">
                    <label>Phòng ban:</label>
                    <select v-model="editedMember.departmentId" :disabled="!isEditing">
                        <option v-for="department in departments" :key="department.id" :value="department.id">
                            {{ department.name }}
                        </option>
                    </select>
                </div>
                <div class="detail-item">
                    <label>Vai trò:</label>
                    <select v-model="editedMember.roleId" :disabled="!isEditing">
                        <option v-for="role in roles" :key="role.id" :value="role.id">
                            {{ role.name }}
                        </option>
                    </select>
                </div>
                <div class="detail-item">
                    <label>Trạng thái:</label>
                    <select v-model="editedMember.status" :disabled="!isEditing">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="button-container">
            <button @click="toggleEdit">{{ isEditing ? 'Hủy' : 'Sửa' }}</button>
            <button @click="saveChanges" v-if="isEditing">Lưu</button>
            <button @click="goBack">Quay lại</button>
        </div>
    </div>
    <div v-else>
        <p>Không tìm thấy thành viên.</p>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup() {
        const member = ref(null);
        const editedMember = ref(null);
        const departments = ref([]);
        const roles = ref([]);
        const route = useRoute();
        const router = useRouter();
        const memberId = route.params.id;
        const isEditing = ref(false);
        onMounted(async () => {
            try {
                const [memberResponse, departmentsResponse, rolesResponse] = await Promise.all([
                    axios.get(`http://localhost:5000/api/members/member-details/${memberId}`),
                    axios.get('http://localhost:5000/api/departments'),
                    axios.get('http://localhost:5000/api/roles')
                ]);
                member.value = memberResponse.data;
                editedMember.value = { ...memberResponse.data }; 
                departments.value = departmentsResponse.data;
                roles.value = rolesResponse.data;
            } catch (error) {
                console.error('Error fetching member details:', error);
            }
        });

        const goBack = () => {
            router.push('/member-list');
        };

        const toggleEdit = () => {
            isEditing.value = !isEditing.value;
        };

        const saveChanges = async () => {
            try {
                const { id, ...updateData } = editedMember.value;
                await axios.put(`http://localhost:5000/api/members/member-details/${memberId}`, updateData);
                Object.assign(member.value, editedMember.value); 
                isEditing.value = false;
                router.push('/member-list');
            } catch (error) {
                console.error('Error saving member changes:', error);
            }
        };

        return {
            member,
            editedMember,
            departments,
            roles,
            isEditing,
            toggleEdit,
            saveChanges,
            goBack
        };
    }
};
</script>

<style scoped>
.member-detail {
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fffffe;
    color: #0f0e17;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.avatar-container {
    margin-bottom: 20px;
}

.avatar-container img {
    max-width: 200px;
    border-radius: 50%;
    display: block;
    margin: 0 auto 10px;
}

.detail-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.detail-group {
    width: calc(50% - 10px);
    margin-bottom: 20px;
}

.detail-item {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f4f4f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.detail-item label {
    font-weight: bold;
}

.detail-item input,
.detail-item textarea,
.detail-item select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.button-container button {
    margin: 0 10px;
}

button {
    padding: 10px 20px;
    background-color: #ff8906;
    color: #fffffe;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    opacity: 0.8;
}

@media (max-width: 768px) {
    .detail-group {
        width: 100%;
    }
}
</style>

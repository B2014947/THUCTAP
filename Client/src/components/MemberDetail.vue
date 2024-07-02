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
                    <label>Mật khẩu:</label>
                    <input type="text" v-model="editedMember.password" :disabled="!isEditing">
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
                    <input type="text" v-model="editedMember.department" :disabled="!isEditing">
                </div>
                <div class="detail-item">
                    <label>Vai trò:</label>
                    <input type="text" v-model="editedMember.role" :disabled="!isEditing">
                </div>
                <div class="detail-item">
                    <label>Trạng thái:</label>
                    <input type="text" v-model="editedMember.status" :disabled="!isEditing">
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
import { members } from '@/data/members.js';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup() {
        const member = ref(null);
        const editedMember = ref(null);
        const route = useRoute();
        const router = useRouter();
        const memberId = route.params.id;
        let isEditing = ref(false);

        onMounted(() => {
            member.value = members.find(m => m.id === parseInt(memberId));
            editedMember.value = { ...member.value }; // Khởi tạo thông tin sửa đổi từ thành viên hiện tại
        });

        const goBack = () => {
            router.push('/member-list');
        };

        const toggleEdit = () => {
            isEditing.value = !isEditing.value;
        };

        const saveChanges = () => {
            Object.assign(member.value, editedMember.value);
            isEditing.value = false;
            router.push('/member-list');
        };

        return {
            member,
            editedMember,
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
    text-align: center; /* Căn giữa nội dung */
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
    flex-wrap: wrap; /* Cho phép các nhóm chi tiết linh hoạt dưới các điều kiện màn hình khác nhau */
}

.detail-group {
    width: calc(50% - 10px); /* Độ rộng của mỗi nhóm, trừ đi khoảng cách giữa chúng */
    margin-bottom: 20px;
}

.detail-item {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f4f4f9; /* Màu nền nhẹ */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.detail-item label {
    font-weight: bold;
}

.detail-item input,
.detail-item textarea {
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
    margin-top: 20px;
    padding: 10px 20px;
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

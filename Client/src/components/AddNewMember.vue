<template>
    <div class="add-new-member">
        <h1>Thêm mới thành viên</h1>
        <form @submit.prevent="addMember">
            <div class="form-group">
                <label for="username">Tên tài khoản:</label>
                <input type="text" id="username" v-model="newMember.username" required>
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu:</label>
                <input type="password" id="password" v-model="newMember.password" required>
            </div>
            <div class="form-group">
                <label for="fullName">Họ và tên:</label>
                <input type="text" id="fullName" v-model="newMember.fullName" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="newMember.email" required>
            </div>
            <div class="form-group">
                <label for="phone">Số điện thoại:</label>
                <input type="text" id="phone" v-model="newMember.phone" required>
            </div>
            <div class="form-group">
                <label for="internalNumber">Số nội bộ:</label>
                <input type="text" id="internalNumber" v-model="newMember.internalNumber" required>
            </div>
            <div class="form-group">
                <label for="cmnd">Chứng minh nhân dân:</label>
                <input type="text" id="cmnd" v-model="newMember.cmnd" required>
            </div>
            <div class="form-group">
                <label for="address">Địa chỉ:</label>
                <input type="text" id="address" v-model="newMember.address" required>
            </div>
            <div class="form-group">
                <label for="startDate">Ngày bắt đầu làm việc:</label>
                <input type="date" id="startDate" v-model="newMember.startDate" required>
            </div>
            <div class="form-group">
                <label for="avatar">Ảnh đại diện:</label>
                <input type="file" id="avatar" @change="onFileChange">
            </div>
            <div class="form-group">
                <label for="education">Trình độ học vấn:</label>
                <input type="text" id="education" v-model="newMember.education" required>
            </div>
            <div class="form-group">
                <label for="qualification">Bằng cấp:</label>
                <input type="text" id="qualification" v-model="newMember.qualification" required>
            </div>
            <div class="form-group">
                <label for="experience">Kinh nghiệm làm việc:</label>
                <textarea id="experience" v-model="newMember.experience" required></textarea>
            </div>
            <div class="form-group">
                <label for="skills">Kỹ năng:</label>
                <textarea id="skills" v-model="newMember.skills" required></textarea>
            </div>
            <div class="form-group">
                <label for="bio">Giới thiệu ngắn:</label>
                <textarea id="bio" v-model="newMember.bio" required></textarea>
            </div>
            <div class="form-group">
                <label for="department">Phòng ban:</label>
                <select id="department" v-model="newMember.department" required>
                    <option v-for="department in departments" :key="department.id" :value="department.name">
                        {{ department.name }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="role">Vai trò:</label>
                <select id="role" v-model="newMember.role" required>
                    <option v-for="role in roles" :key="role.id" :value="role.name">{{ role.name }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="status">Trạng thái:</label>
                <select id="status" v-model="newMember.status" required>
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Không hoạt động">Không hoạt động</option>
                </select>
            </div>
            <button type="submit">Thêm mới</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { departments } from '@/data/departments.js';
import { roles } from '@/data/roles.js';

export default {
    setup() {
        const newMember = ref({
            username: '',
            password: '',
            fullName: '',
            email: '',
            phone: '',
            internalNumber: '',
            cmnd: '',
            address: '',
            startDate: '',
            avatar: null,
            education: '',
            qualification: '',
            experience: '',
            skills: '',
            bio: '',
            department: '',
            role: '',
            status: 'Hoạt động'
        });

        const router = useRouter();

        const onFileChange = (event) => {
            newMember.value.avatar = event.target.files[0];
        };

        const addMember = async () => {
            try {
                const formData = new FormData();
                formData.append('username', newMember.value.username);
                formData.append('password', newMember.value.password);
                formData.append('fullName', newMember.value.fullName);
                formData.append('email', newMember.value.email);
                formData.append('phone', newMember.value.phone);
                formData.append('internalNumber', newMember.value.internalNumber);
                formData.append('cmnd', newMember.value.cmnd);
                formData.append('address', newMember.value.address);
                formData.append('startDate', newMember.value.startDate);
                formData.append('avatar', newMember.value.avatar);
                formData.append('education', newMember.value.education);
                formData.append('qualification', newMember.value.qualification);
                formData.append('experience', newMember.value.experience);
                formData.append('skills', newMember.value.skills);
                formData.append('bio', newMember.value.bio);
                formData.append('departmentId', newMember.value.department); // Assuming departmentId is sent
                formData.append('roleId', newMember.value.role); // Assuming roleId is sent
                formData.append('status', newMember.value.status);

                await axios.post('http://localhost:5000/api/members', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                alert('Thành viên mới đã được thêm');
                router.push('/member-list');
            } catch (error) {
                console.error('Error adding member:', error);
                alert('Thêm thành viên không thành công.');
            }
        };

        return {
            newMember,
            addMember,
            departments,
            roles,
            onFileChange
        };
    }
};
</script>

<style scoped>
.add-new-member {
    width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fffffe;
    color: #0f0e17;
    border-radius: 8px;
}

form div {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"],
input[type="file"],
select,
textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

textarea {
    height: 100px;
    resize: vertical;
}

button {
    padding: 10px 20px;
    background-color: #ff8906;
    color: #fffffe;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #e53170;
}

.form-group {
    margin-bottom: 10px;
}
</style>

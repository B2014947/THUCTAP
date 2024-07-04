<template>
    <div class="add-new-member">
        <h1>Thêm Thành Viên Mới</h1>
        <form @submit.prevent="addMember">
            <div class="form-group">
                <label for="username">Tên đăng nhập:</label>
                <input type="text" id="username" v-model="member.username" required />
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu:</label>
                <input type="password" id="password" v-model="member.password" required />
            </div>
            <div class="form-group">
                <label for="fullName">Họ và tên:</label>
                <input type="text" id="fullName" v-model="member.fullName" required />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="member.email" required />
            </div>
            <div class="form-group">
                <label for="phone">Số điện thoại:</label>
                <input type="text" id="phone" v-model="member.phone" required />
            </div>
            <div class="form-group">
                <label for="internalNumber">Số nội bộ:</label>
                <input type="text" id="internalNumber" v-model="member.internalNumber" required />
            </div>
            <div class="form-group">
                <label for="cmnd">Số CMND:</label>
                <input type="text" id="cmnd" v-model="member.cmnd" required />
            </div>
            <div class="form-group">
                <label for="address">Địa chỉ:</label>
                <input type="text" id="address" v-model="member.address" required />
            </div>
            <div class="form-group">
                <label for="startDate">Ngày bắt đầu:</label>
                <input type="date" id="startDate" v-model="member.startDate" required />
            </div>
            <div class="form-group">
                <label for="education">Học vấn:</label>
                <input type="text" id="education" v-model="member.education" required />
            </div>
            <div class="form-group">
                <label for="qualification">Trình độ:</label>
                <input type="text" id="qualification" v-model="member.qualification" required />
            </div>
            <div class="form-group">
                <label for="experience">Kinh nghiệm:</label>
                <input type="text" id="experience" v-model="member.experience" required />
            </div>
            <div class="form-group">
                <label for="skills">Kỹ năng:</label>
                <input type="text" id="skills" v-model="member.skills" required />
            </div>
            <div class="form-group">
                <label for="bio">Tiểu sử:</label>
                <textarea id="bio" v-model="member.bio" required></textarea>
            </div>
            <div class="form-group">
                <label for="departmentId">Phòng ban:</label>
                <select id="departmentId" v-model="member.departmentId" required>
                    <option v-for="department in departments" :key="department.id" :value="department.id">
                        {{ department.name }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="roleId">Vai trò:</label>
                <select id="roleId" v-model="member.roleId" required>
                    <option v-for="role in roles" :key="role.id" :value="role.id">
                        {{ role.name }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="status">Trạng thái:</label>
                <select id="status" v-model="member.status" required>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            <div class="form-group">
                <label for="avatarUrl">URL ảnh đại diện:</label>
                <input type="text" id="avatarUrl" v-model="member.avatarUrl" />
            </div>
            <button type="submit">Thêm Thành Viên</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            member: {
                username: '',
                password: '',
                fullName: '',
                email: '',
                phone: '',
                internalNumber: '',
                cmnd: '',
                address: '',
                startDate: '',
                education: '',
                qualification: '',
                experience: '',
                skills: '',
                bio: '',
                departmentId: '',
                roleId: '',
                status: '',
                avatarUrl: ''
            },
            departments: [],
            roles: []
        };
    },
    created() {
        this.fetchDepartments();
        this.fetchRoles();
    },
    methods: {
        fetchDepartments() {
            axios.get('http://localhost:5000/api/departments')
                .then(response => {
                    this.departments = response.data;
                })
                .catch(error => {
                    console.error('Error fetching departments:', error);
                });
        },
        fetchRoles() {
            axios.get('http://localhost:5000/api/roles')
                .then(response => {
                    this.roles = response.data;
                })
                .catch(error => {
                    console.error('Error fetching roles:', error);
                });
        },
        addMember() {
            axios.post('http://localhost:5000/api/members', this.member)
                .then(response => {
                    alert('Member added successfully');
                    this.$router.push('/member-list');
                })
                .catch(error => {
                    console.error('Error adding member:', error);
                    alert('Error adding member');
                });
        }
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

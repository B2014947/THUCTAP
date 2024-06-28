<template>
    <div class="add-new-member">
        <h1>Thêm mới thành viên</h1>
        <form @submit.prevent="addMember">
            <div>
                <label for="username">Tên tài khoản:</label>
                <input type="text" id="username" v-model="newMember.username" required>
            </div>
            <div>
                <label for="fullName">Họ và tên:</label>
                <input type="text" id="fullName" v-model="newMember.fullName" required>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="newMember.email" required>
            </div>
            <div>
                <label for="phone">Số điện thoại:</label>
                <input type="text" id="phone" v-model="newMember.phone" required>
            </div>
            <div>
                <label for="internalNumber">Số nội bộ:</label>
                <input type="text" id="internalNumber" v-model="newMember.internalNumber" required>
            </div>
            <div>
                <label for="department">Phòng ban:</label>
                <select id="department" v-model="newMember.department" required>
                    <option v-for="department in departments" :key="department.id" :value="department.name">
                        {{ department.name }}
                    </option>
                </select>
            </div>
            <div>
                <label for="role">Vai trò:</label>
                <select id="role" v-model="newMember.role" required>
                    <option v-for="role in roles" :key="role.id" :value="role.name">{{ role.name }}</option>
                </select>
            </div>
            <div>
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
import { members } from '@/data/members.js';
import { departments } from '@/data/departments.js'; // Import danh sách phòng ban
import { roles } from '@/data/roles.js'; // Import danh sách vai trò

export default {
    setup() {
        const newMember = ref({
            username: '',
            fullName: '',
            email: '',
            phone: '',
            internalNumber: '',
            department: '',
            role: '',
            status: 'Hoạt động'
        });

        const router = useRouter();

        const addMember = () => {
            const id = members.length ? members[members.length - 1].id + 1 : 1;
            members.push({ ...newMember.value, id });
            alert('Thành viên mới đã được thêm');
            router.push('/member-list');
        };

        return {
            newMember,
            addMember,
            departments, // Sử dụng danh sách phòng ban để hiển thị trong dropdown
            roles // Sử dụng danh sách vai trò để hiển thị trong dropdown
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
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
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
    background-color: #e53170;
}
</style>

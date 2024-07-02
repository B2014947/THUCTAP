<template>
    <div class="member-list">
        <h1>Quản lý thành viên</h1>
        <button @click="navigateToAddNew()">Thêm mới</button>
        <input type="text" v-model="searchQuery"
            placeholder="Tìm kiếm theo họ và tên, tên tài khoản, email, số điện thoại">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên tài khoản</th>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Phòng ban</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="member in filteredMembers" :key="member.id">
                    <td>{{ member.id }}</td>
                    <td>{{ member.username }}</td>
                    <td>{{ member.fullName }}</td>
                    <td>{{ member.email }}</td>
                    <td>{{ member.phone }}</td>
                    <td>{{ member.department }}</td>
                    <td>{{ member.role }}</td>
                    <td>{{ member.status }}</td>
                    <td>
                        <button @click="navigateToDetail(member.id)">Thông tin chi tiết</button>
                        <button @click="editMember(member.id)">Sửa</button>
                        <button @click="deleteMember(member.id)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const searchQuery = ref('');
        const router = useRouter();
        const members = ref([]);

        // Fetch members data from API
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/members');
                members.value = response.data;
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        // Call fetchMembers when component is mounted
        onMounted(() => {
            fetchMembers();
        });

        const filteredMembers = computed(() => {
            return members.value.filter(member => {
                const query = searchQuery.value.toLowerCase();
                return (
                    member.username.toLowerCase().includes(query) ||
                    member.fullName.toLowerCase().includes(query) ||
                    member.email.toLowerCase().includes(query) ||
                    member.phone.includes(query)
                );
            });
        });

        const editMember = (id) => {
            router.push(`/edit-member/${id}`);
        };

        const deleteMember = async (id) => {
            const confirmed = confirm(`Bạn có chắc muốn xóa thành viên với ID: ${id}?`);
            if (confirmed) {
                try {
                    await axios.delete(`http://localhost:5000/api/members/${id}`);
                    members.value = members.value.filter(member => member.id !== id);
                    alert(`Đã xóa thành viên với ID: ${id}`);
                } catch (error) {
                    console.error('Error deleting member:', error);
                    alert('Xóa thành viên không thành công.');
                }
            }
        };

        const navigateToAddNew = () => {
            router.push('/add-new-member');
        };

        const navigateToDetail = (id) => {
            router.push(`/member-detail/${id}`);
        };

        return {
            searchQuery,
            filteredMembers,
            editMember,
            deleteMember,
            navigateToAddNew,
            navigateToDetail
        };
    }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    height: 100%;
}

.home-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.content-wrapper {
    display: flex;
    flex: 1;
}

.sidebar {
    width: 250px;
    background-color: #1a1b1d;
    color: #fffffe;
    padding: 20px;
    min-height: 100vh;
}

.content {
    flex: 1;
    padding: 20px;
    background-color: #0f0e17;
    /* Assuming the color based on your previous preference */
    color: #fffffe;
    /* Assuming the color based on your previous preference */
    min-height: 100vh;
    overflow: auto;
}

.member-list {
    width: 100%;
    padding: 20px;
    background-color: #fffffe;
    color: #0f0e17;
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

table {
    width: 100%;
    border-collapse: collapse;
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

td {
    background-color: #f4f4f9;
}

button {
    margin: 0 5px;
    padding: 5px 10px;
    background-color: #ff8906;
    color: #fffffe;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #e53170;
}

input[type="text"] {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>

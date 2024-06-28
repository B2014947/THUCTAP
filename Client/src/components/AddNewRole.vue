<template>
    <div class="add-new-role">
        <h1>Thêm mới vai trò</h1>
        <form @submit.prevent="addRole">
            <div>
                <label for="name">Tên vai trò:</label>
                <input type="text" id="name" v-model="newRole.name" required>
            </div>
            <div>
                <label for="description">Mô tả:</label>
                <textarea id="description" v-model="newRole.description" required></textarea>
            </div>
            <button type="submit">Thêm mới</button>
        </form>
    </div>
</template>

<script>
import { roles } from '@/data/roles.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const newRole = ref({
            name: '',
            description: ''
        });

        const router = useRouter();

        const addRole = () => {
            const id = roles.length ? roles[roles.length - 1].id + 1 : 1;
            roles.push({ ...newRole.value, id });
            alert('Vai trò mới đã được thêm');
            router.push('/role-management');
        };

        return {
            newRole,
            addRole
        };
    }
};
</script>

<style scoped>
.add-new-role {
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
textarea {
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

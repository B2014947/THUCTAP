<template>
    <div>
        <h1>Danh sách văn bản của bạn</h1>
        <ul>
            <li v-for="document in documents" :key="document.id">
                {{ document.name }} - {{ document.status }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            documents: []
        };
    },
    created() {
        this.fetchDocuments();
    },
    methods: {
        async fetchDocuments() {
            try {
                const response = await axios.get('http://localhost:5000/api/documentsOutgoing', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.documents = response.data;
            } catch (error) {
                console.error('Lỗi khi lấy danh sách văn bản:', error);
            }
        }
    }
};
</script>
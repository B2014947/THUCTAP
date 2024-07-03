<template>
    <div id="wrapper">
        <form id="form-login" @submit.prevent="login">
            <h1 class="form-heading">Hệ thống quản lý văn bản</h1>
            <div class="form-group">
                <i class="far fa-user"></i>
                <input type="text" class="form-input form-control" placeholder="Tên đăng nhập" v-model="username">
            </div>
            <div class="form-group">
                <i class="fas fa-key"></i>
                <input type="password" class="form-input form-control" placeholder="Mật khẩu" v-model="password"
                    :type="showPassword ? 'text' : 'password'">
                <div id="eye" @click="toggleShowPassword">
                    <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
                </div>
            </div>
            <div>
                <a href="#" class="forgot-password">Quên mật khẩu</a>
            </div>
            <button type="submit" class="form-submit" :disabled="isLoading">{{ isLoading ? 'Đang đăng nhập...' :
                'ĐĂNGNHẬP' }}</button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <div v-if="showSuccessMessage" class="success-message">
                <p>{{ successMessage }}</p>
            </div>
        </form>
    </div>
</template>

<script>
import { axiosInstance } from '@/main'; // Điều chỉnh đường dẫn alias phù hợp với cấu hình của bạn

export default {
    data() {
        return {
            username: '',
            password: '',
            showPassword: false,
            errorMessage: '',
            showSuccessMessage: false,
            successMessage: '',
            isLoading: false // Thêm biến isLoading để hiển thị tải khi đang xử lý
        };
    },
    methods: {
        async login() {
            try {
                this.isLoading = true; // Bật biểu tượng tải

                // Gửi yêu cầu đăng nhập
                const response = await axiosInstance.post('/auth/login', {
                    username: this.username,
                    password: this.password
                });

                // Xử lý kết quả đăng nhập thành công
                const { message, token } = response.data;
                console.log(message);
                console.log('Token:', token);

                // Lưu token vào localStorage hoặc sessionStorage
                localStorage.setItem('token', token);

                // Hiển thị thông báo đăng nhập thành công và chuyển hướng
                this.successMessage = message;
                this.showSuccessMessage = true;

                // Chuyển hướng tới trang chủ sau một khoảng thời gian
                setTimeout(() => {
                    this.$router.push('/'); // Chuyển hướng đến trang homepage
                }, 1000); // Chuyển hướng sau 1 giây (tùy chỉnh thời gian theo ý của bạn)
            } catch (error) {
                // Xử lý lỗi đăng nhập
                console.error('Lỗi đăng nhập:', error);

                // In ra chi tiết lỗi từ response nếu có
                if (error.response) {
                    console.error('Response:', error.response);
                    if (error.response.data && error.response.data.error) {
                        this.errorMessage = error.response.data.error;
                    } else {
                        this.errorMessage = 'Đã xảy ra lỗi trong quá trình đăng nhập.';
                    }
                } else if (error.request) {
                    // In ra lỗi từ request
                    console.error('Request:', error.request);
                    this.errorMessage = 'Không kết nối được tới máy chủ.';
                } else {
                    // In ra lỗi chung
                    console.error('Error:', error.message);
                    this.errorMessage = 'Đã xảy ra lỗi trong quá trình đăng nhập.';
                }
            } finally {
                this.isLoading = false; // Tắt biểu tượng tải
            }
        },
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        }
    }
};
</script>

<style scoped>
a {
    color: #2e2f3e;
    transition: color 0.3s ease;
}

a:hover {
    color: #ff8906;
}

#wrapper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0f0e17;
}

#form-login {
    border-radius: 14px;
    max-width: 400px;
    background-color: #fffffe;
    flex-grow: 1;
    padding: 30px 30px 40px;
    box-shadow: 0px 0px 17px 2px rgba(255, 255, 255, 0.8);
}

.form-heading {
    font-size: 25px;
    color: #2e2f3e;
    text-align: center;
    margin-bottom: 30px;
}

.form-group {
    border-bottom: 1px solid #fff;
    margin-top: 15px;
    margin-bottom: 20px;
    display: flex;
}

.form-group i {
    color: #fff;
    font-size: 14px;
    padding-top: 5px;
    padding-right: 10px;
}

.form-input {
    background: transparent;
    outline: 0;
    border-radius: 14px;
    color: #2e2f3e;
    flex-grow: 1;
}

.form-input::placeholder {
    color: #2e2f3e;
}

#eye {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
}

#eye i {
    font-size: 18px;
}

.form-submit {
    background: transparent;
    border: 1px solid #2e2f3e;
    border-radius: 14px;
    color: #2e2f3e;
    width: 100%;
    text-transform: uppercase;
    padding: 10px 0;
    transition: 0.25s ease-in-out;
    margin-top: 30px;
}

.form-submit:hover {
    border: 1px solid #54ffaf;
}

.error-message {
    color: #ff3e3e;
    text-align: center;
    margin-top: 10px;
}

.success-message {
    background-color: #54ffaf;
    color: #2e2f3e;
    border: 1px solid #2e2f3e;
    border-radius: 14px;
    text-align: center;
    padding: 10px;
    margin-top: 20px;
    animation: fadeOut 3s forwards;
    /* Hiệu ứng fadeOut sau 3 giây */
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>

<template>
    <div class="homepage">
        <div class="hero-section animated-element">
            <h1>Welcome to TeleConnect</h1>
            <p>Your Partner in Telecommunications Solutions</p>
        </div>
        <div class="company-info animated-element">
            <h2>About Us</h2>
            <p>
                TeleConnect is dedicated to providing cutting-edge telecommunications services
                to businesses and individuals worldwide. Our mission is to connect people and
                businesses seamlessly through innovative technology solutions.
            </p>
        </div>
        <div class="services animated-element">
            <h2>Our Services</h2>
            <ul>
                <li>Telecommunication Network Design</li>
                <li>VoIP Solutions</li>
                <li>Internet Services</li>
                <li>Mobile Network Solutions</li>
            </ul>
        </div>
        <div class="contact-info animated-element">
            <h2>Contact Us</h2>
            <p>Email: contact@teleconnect.com</p>
            <p>Phone: +1234567890</p>
            <p>Address: 123 Telecom Blvd, City, Country</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    const animateElements = () => {
        const elements = document.querySelectorAll('.animated-element');

        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * 500); // Animate each element with a delay of 0.5 seconds
        });

        setTimeout(() => {
            elements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.remove('animate');
                }, index * 500 + 500); // Remove animate class after 0.5 seconds delay
            });
            setTimeout(animateElements, elements.length * 500 + 500); // Repeat animation after all elements are animated
        }, elements.length * 500 + 500); // Wait for the last animation to complete before repeating
    };

    animateElements();
});
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
    background-color: #f4f4f9;
    /* Normal background color */
}

.homepage {
    width: auto;
    padding: 20px;
    min-height: 100vh;
    /* Ensure it covers the full height of the viewport */
    overflow: auto;
    border-radius: 8px;
    /* Allow scrolling if content overflows */
}

.hero-section,
.company-info,
.services,
.contact-info {
    text-align: center;
    margin-bottom: 20px;
    background-color: #ff8906;
    /* Banner background color */
    color: #fffffe;
    /* Text color */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Subtle shadow for better separation */
}

.animated-element {
    animation: moveUpDown 0.5s ease-in-out infinite alternate;
    /* Use alternate direction for infinite animation loop */
}

.services ul {
    list-style-type: none;
    padding: 0;
}

.services li {
    margin-bottom: 5px;
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

@keyframes moveUpDown {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-10px);
    }
}
</style>

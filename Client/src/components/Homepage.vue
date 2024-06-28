<template>
    <div class="homepage">
        <div class="hero-section">
            <h1>Welcome to Our Company</h1>
            <p>We are committed to delivering excellence.</p>
        </div>
        <div class="company-info">
            <h2>About Us</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero sit amet leo commodo, in
                rutrum nisi placerat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                curae.
            </p>
        </div>
        <div class="services">
            <h2>Our Services</h2>
            <ul>
                <li>Service 1</li>
                <li>Service 2</li>
                <li>Service 3</li>
                <li>Service 4</li>
            </ul>
        </div>
        <div class="contact-info">
            <h2>Contact Us</h2>
            <p>Email: contact@company.com</p>
            <p>Phone: +1234567890</p>
            <p>Address: 123 Company St, City, Country</p>
        </div>
    </div>
</template>

<script setup>
// Import any necessary components or data
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

.homepage {
    width: auto;
    padding: 20px;
    background-color: #fffffe;
    color: #0f0e17;
    min-height: 100vh;
    /* Ensure it covers the full height of the viewport */
    overflow: auto;
    border-radius: 8px;
    /* Allow scrolling if content overflows */
}

.hero-section {
    text-align: center;
    margin-bottom: 20px;
}

.company-info,
.services,
.contact-info {
    margin-bottom: 40px;
    background-color: #f4f4f9;
    /* Light background for sections */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Subtle shadow for better separation */
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
</style>

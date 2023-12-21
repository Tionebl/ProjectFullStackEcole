<template>
    <div>
      <h2>Registration Form</h2>
      <form @submit.prevent="registerUser">
        <label for="name">Name:</label>
        <input type="text" v-model="name" required />
  
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
  
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
  
        <button type="submit">Register</button>
      </form>
    </div>
</template>
  
<script setup lang="ts">
  import { ref } from 'vue';

  import { useApi } from '../api/api';
  
  const api = useApi();

  const name = ref('');
  const email = ref('');
  const password = ref('');
  
  const registerUser = () => {
    console.log('User registered:', { name: name.value, email: email.value, password: password.value });
    name.value = '';
    email.value = '';
    password.value = '';
    api.createUser({ name: name.value, email: email.value, password: password.value })
  };
</script>
  
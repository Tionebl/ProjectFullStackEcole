<template>
    <div class="character-wrapper">
      <div class="characters-container">
        <div v-for="p in char" :key="p.id" class="character">
          <span>{{ p.name }}</span>
          <span>{{ p.class }}</span>
          <span>{{ p.level }}</span>
        </div>
      </div>
    </div>
  </template>
  
  
<script setup lang="ts">
import { useApi } from '../api/api';
import { ref } from 'vue';



const api = useApi();

const char = ref<any[]>([]);
const fetchCharacters = async () => {
  try {
    const characters = await api.GetAll();
    char.value = characters;
    console.log(characters);
  } catch (error) {
    console.error('Erreur lors de la récupération des personnages :', error);
  }
};

fetchCharacters();

console.log(char.value);
</script>
  
<style>
  body {
    background-image: url('/assets/images/bg2.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .character-wrapper {
  position: absolute;
  top: 20px;
  right: 20px;
}

.characters-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px;
  width: 200px;
}

.character {
  margin-bottom: 10px; /* Ajustez la valeur pour l'espacement entre les personnages */
}
</style>
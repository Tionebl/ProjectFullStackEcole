<template>
  <div class="flex justify-end">
    <div class=" p-4 w-1/4 border rounded w-[300px] mx-12 mt-12 h-full">
      <h1 class="font-bold text-center border-b p-2 mb-4 text-white">Liste des personnages</h1>
      <div v-for="p in char" :key="p.id" class=" grid grid-rows-2 mb-2 border rounded p-2 bg-blue-400">
        <span class="font-bold">{{ p.name }}
           <button @click="showEditCharacterFrom(p._id)" class=" w-8 font-semibold text-xs text-slate-50"> Edit </button>
           <button @click="deleteChar(p._id)" class=" w-8 font-semibold text-xs text-red-400"> X </button>
        </span>
        <span class="italic text-slate-200 text-xs">{{ p.charClass }} - Level {{ p.level }}</span>
      </div>
      <button class="mx-8 border bg-blue-500 p-2 rounded text-white font-bold" @click="showAddCharacterForm">Ajouter un personnage</button>
    </div>
    <div v-if="showAddForm" class="fixed inset-0 flex items-center justify-center">
      <add-character-form @added="addChar" @cancel="cancelAdd"/>
    </div>
    <div v-if="showEditForm" class="fixed inset-0 flex items-center justify-center">
      <edit-characters :char="itemToEdit"  @edited="handleEdit" @cancel="cancelEdit"/>
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { useApi } from '../api/api';
  import { ref } from 'vue';
  import AddCharacterForm from '../components/AddCharacters.vue';
  import EditCharacters from '@/components/EditCharacters.vue';
  
  const api = useApi();
  
  const char = ref<any[]>([]);
  const showAddForm = ref(false);
  const showEditForm = ref(false);
  
  const fetchCharacters = async () => {
    try {
      const characters = await api.GetAll();
      char.value = characters;
      console.log(characters);
    } catch (error) {
      console.error('Erreur lors de la récupération des personnages :', error);
    }
  };
  
  const addChar = (newChar: any) => {
    char.value.push(newChar);
    showAddForm.value = false;
  };
  const showAddCharacterForm = () => {
    showAddForm.value = true;
  };

  const itemToEdit = ref<any>(null);

  const showEditCharacterFrom = (id: string) => {
    itemToEdit.value = char.value.find((c) => c._id === id);
    showEditForm.value = true;
  };
  
  const deleteChar = async (id: string) => {
    try {
      await api.Delete(id);
      fetchCharacters();
    } catch (error) {
      console.error('Erreur lors de la suppression du personnage :', error);
    }
  };
  fetchCharacters();
  
  const cancelAdd = () => {
    showAddForm.value = false;
  };

  const cancelEdit = () => {
    showEditForm.value = false;
  };

  const handleEdit = (editedChar: any) => {
    const index = char.value.findIndex((c) => c._id === editedChar._id);
    char.value[index] = editedChar;
    showEditForm.value = false;
  };
</script>
  
<style>
    body {
      background-image: url('/assets/images/bg2.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
    }
</style>
  
<template>
    <div class="border rounded bg-blue-400">
      <h2 class="m-2 border-b font-semibold pb-2 flex justify-center">Ajouter un nouveau personnage</h2>
      <form class="grid grid-rows-2 mx-8 p-2" @submit.prevent="addCharacter">
        <label class="text-white" for="name">Nom:</label>
        <input v-model="newCharacter.name" type="text" id="name" required />
  
        <label class="text-white" for="class">Classe:</label>
        <input v-model="newCharacter.charClass" type="text" id="class" required />
    
        <label class="text-white" for="realm">Royaume:</label>
        <input v-model="newCharacter.realm" type="text" id="realm" required />
  
        <label class="text-white" for="region">Région:</label>
        <input v-model="newCharacter.region" type="text" id="region" required />
  
        <button class="border mt-4 rounded bg-yellow-400 font-semibold mb-2" type="submit">Ajouter</button>
        <button class="border rounded bg-red-400 font-semibold mb-6" @click="cancel">Annuler</button>

      </form>
    </div>
</template>
  
<script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue';
  import { useApi } from '../api/api';
  
  const props = defineProps({
  });

  const emits = defineEmits(['added', "cancel"]);
  
  const api = useApi();
  const newCharacter = ref({
    name: '',
    charClass: '',
    level: 1,
    realm: '',
    region: '',
  });
  
  const addCharacter = async () => {
    try {
      await api.Add(newCharacter.value);
      emits('added', newCharacter.value); // Émettre l'événement 'added' pour que le parent puisse réagir à l'ajout d'un personnage
      emits
      // Réinitialiser le formulaire après l'ajout réussi
      newCharacter.value = {
        name: '',
        charClass: '',
        level: 1,
        realm: '',
        region: '',
      };
      console.log('Personnage ajouté avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du personnage :', error);
    }
  };

  const cancel = async () => {
    newCharacter.value = {
        name: '',
        charClass: '',
        level: 1,
        realm: '',
        region: '',
      };
  emits('cancel'); // Émettre l'événement 'cancel' lorsque le bouton "Annuler" est cliqué
};
</script>
  
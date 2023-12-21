<template>
    <div class="border rounded bg-blue-400">
      <h2 class="m-2 border-b font-semibold pb-2 flex justify-center">Éditer le personnage</h2>
      <form class="grid grid-rows-2 mx-8 p-2" @submit.prevent="editCharacter">
        <label class="text-white" for="name">Nom:</label>
        <input v-model="newCharacter.name" type="text" id="name" required />
  
        <label class="text-white" for="class">Classe:</label>
        <input v-model="newCharacter.charClass" type="text" id="class" required />
  
        <label class="text-white" for="realm">Royaume:</label>
        <input v-model="newCharacter.realm" type="text" id="realm" required />
  
        <label class="text-white" for="region">Région:</label>
        <input v-model="newCharacter.region" type="text" id="region" required />
  
        <button class="border mt-4 rounded bg-yellow-400 font-semibold mb-2" type="submit">Éditer</button>
        <button class="border rounded bg-red-400 font-semibold mb-6" @click="cancel">Annuler</button>
      </form>
    </div>
</template>
  
<script setup lang="ts">
    import { ref, defineProps, defineEmits, onMounted } from 'vue';
    import { useApi } from '../api/api';

    const props = defineProps(['char']);
  
    const emits = defineEmits(['edited', 'cancel']);
  
    const api = useApi();
    const newCharacter = ref({
      name: '',
      charClass: '',
      level: 1,
      realm: '',
      region: '',
    });
  
    onMounted(() => {
      // Remplir le formulaire avec les informations du personnage existant
      newCharacter.value = { ...props.char };
    });
  
    const editCharacter = async () => {
      try {
        await api.Update(props.char._id, newCharacter.value);
        emits('edited', newCharacter.value); // Émettre l'événement 'edited' pour que le parent puisse réagir à l'édition du personnage
  
        // Réinitialiser le formulaire après l'édition réussie
        newCharacter.value = {
          name: '',
          charClass: '',
          level: 1,
          realm: '',
          region: '',
        };
        console.log('Personnage édité avec succès');
      } catch (error) {
        console.error('Erreur lors de l\'édition du personnage :', error);
      }
    };
  
    const cancel = () => {
      emits('cancel'); // Émettre l'événement 'cancel' lorsque le bouton "Annuler" est cliqué
    };
</script>
  
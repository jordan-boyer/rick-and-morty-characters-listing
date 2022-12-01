<script setup lang="ts">
import { type Character } from "rickmortyapi/dist/interfaces";
import { useToast } from "vue-toastification";

const { params: parameters } = useRoute();
const router = useRouter();
const id = computed(() => Number(parameters.id) || 1);
const character = ref<Character | undefined>();
const toast = useToast();

watch(
  id,
  async () => {
    const { data, error } = await useFetchCharacter(Number(parameters.id));

    if (error.value) {
      toast.error(error.value);
    }

    character.value = data.value;
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  { immediate: true }
);

function onBack() {
  router.back();
}
</script>

<template>
  <v-btn variant="text" class="my-4" @click="onBack"> back </v-btn>
  <character-card v-if="character" :character="character" />
</template>

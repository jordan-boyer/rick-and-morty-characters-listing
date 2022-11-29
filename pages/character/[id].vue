<script setup lang="ts">
import type { Character } from 'rickmortyapi/dist/interfaces'
import { useToast } from 'vue-toastification'

const { params } = useRoute()
const router = useRouter()
const id = computed(() => Number(params.id) || 1)
const character = ref<Character | undefined>()
const toast = useToast()

watch(id, async () => {
  const { data, error } = await useFetchCharacter(Number(params.id))

  if (error.value)
    toast.error(error.value)

  character.value = data.value
}, { immediate: true })

const onBack = () => {
  router.back()
}

const splitEpisodeName = (episode: string) => {
  return episode.split('/').splice(-2, 2).join('-')
}
</script>

<template>
  <div v-if="character" class="grid grid-cols-2 bg-white mb-4">
    <img :src="character.image" class="w-full">
    <div class="flex flex-col items-center p-8">
      <span class="font-semibold">{{ character.name }}</span>
      <span>{{ character.gender }}</span>
      <span>{{ character.species }}</span>
      <span>{{ character.status }}</span>
      <span class="my-4 self-start font-semibold">Episode listing:</span>
      <div class="grid grid-cols-3 gap-y-2 gap-x-12 self-start">
        <a v-for="episode in character.episode" :key="episode" class="underline" href="episode" target="_blank">{{ splitEpisodeName(episode) }}</a>
      </div>
    </div>
  </div>
  <button class="border border-solid border-white text-white px-4" @click="onBack">
    back
  </button>
</template>

<style>

</style>

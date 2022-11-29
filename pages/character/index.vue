<script setup lang="ts">
import type { Character } from 'rickmortyapi/dist/interfaces'
import { useToast } from 'vue-toastification'

const { query, path } = useRoute()
const router = useRouter()
const page = ref(Number(query.page) || 1)
const characters = ref<Character[]>([])
const pageSize = ref(20)
const total = ref(0)
const statusFilter = ref('')
const nameFilter = ref('')
const statusOptions = ['', 'Alive', 'Dead', 'unknown']
const toast = useToast()

watch(page, () => {
  router.push({ path, query: { ...query, page: page.value.toString() } })
})

const fetchCharacter = async ({ currentPage }: { currentPage: number }) => {
  const { data, error } = await useFetchCharacters(
    { page: currentPage, status: statusFilter.value || undefined, name: nameFilter.value || undefined },
  )

  if (error.value)
    toast.error(error.value)

  total.value = data.value.info?.count ?? 0
  characters.value = data.value.results ?? []
}

await fetchCharacter({ currentPage: page.value })

const {
  currentPage,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total,
  page,
  pageSize,
  onPageChange: fetchCharacter,
})

const forceUpdate = () => {
  if (currentPage.value !== 1)
    return currentPage.value = 1
  fetchCharacter({ currentPage: currentPage.value })
}

const onStatusFilterChange = (value: string) => {
  statusFilter.value = value
  forceUpdate()
}

const triggerSearch = useDebounceFn((value: string) => {
  nameFilter.value = value
  forceUpdate()
}, 1000)

const onClickDetails = (id: number) => {
  router.push({ path: `${path}/${id}` })
}
</script>

<template>
  <div class="mb-4 flex items-center flex-col gap-2">
    <input class="p-2 rounded" type="text" placeholder="Search for characters" :value="nameFilter" @input="triggerSearch($event.target.value)">
    <div>
      <label for="statusFilter" class="mr-2">filter by status:</label>
      <select id="statusFilter" class="p-2 rounded" @change="onStatusFilterChange($event.target.value)">
        <option v-for="status in statusOptions" :key="status" :value="status" :selected="statusFilter === status">
          {{ status }}
        </option>
      </select>
    </div>
  </div>
  <div class="grid-cols-3 grid gap-4">
    <div v-for="character in characters" :key="character.id" class="flex flex-col items-center cursor-pointer p-16 bg-white pb-8" @click="onClickDetails(character.id)">
      <img :src="character.image" class="w-full mb-4">
      <span class="font-semibold">{{ character.name }}</span>
      <span>{{ character.species }}</span>
      <span>{{ character.status }}</span>
    </div>
  </div>
  <div class="flex justify-center mt-4 gap-2">
    <button :disabled="isFirstPage" class="bg-white px-2 border border-solid" :class="{ 'border-zinc-700 bg-transparent text-zinc-700': isFirstPage }" @click="prev">
      prev
    </button>
    <button
      v-for="item in pageCount"
      :key="item"
      :disabled="currentPage === item"
      class="w-8 h-8 border border-solid border-white text-white"
      :class="{ 'border-zinc-700': currentPage === item, 'text-zinc-700': currentPage === item }"
      @click="currentPage = item"
    >
      {{ item }}
    </button>
    <button :disabled="isLastPage" class="bg-white px-2 border border-solid" :class="{ 'border-zinc-700 bg-transparent text-zinc-700': isLastPage }" @click="next">
      next
    </button>
  </div>
</template>

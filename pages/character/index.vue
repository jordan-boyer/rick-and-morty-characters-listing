<script setup lang="ts">
import type { Character } from "rickmortyapi/dist/interfaces";
import { useToast } from "vue-toastification";

const pageSizeConstant = 20;

const { query, path } = useRoute();
const router = useRouter();
const page = ref(Number(query.page) || 1);
const characters = ref<Character[]>([]);
const pageSize = ref(pageSizeConstant);
const total = ref(0);
const statusFilter = ref("");
const nameFilter = ref("");
const statusOptions = ["", "Alive", "Dead", "unknown"];
const toast = useToast();

watch(page, () => {
  void router.push({ path, query: { ...query, page: page.value.toString() } });
});

async function fetchCharacter({
  currentPage,
}: Readonly<{ currentPage: number }>) {
  const { data, error } = await useFetchCharacters({
    page: currentPage,
    status: statusFilter.value || undefined,
    name: nameFilter.value || undefined,
  });

  if (error.value) {
    toast.error(error.value);
  }

  total.value = data.value.info?.count ?? 0;
  characters.value = data.value.results ?? [];
}

await fetchCharacter({ currentPage: page.value });

const {
  currentPage,
  pageCount,
  prev: previous,
  next,
} = useOffsetPagination({
  total,
  page,
  pageSize,
  onPageChange: fetchCharacter,
});

function forceUpdate() {
  if (currentPage.value !== 1) {
    currentPage.value = 1;
    return;
  }
  void fetchCharacter({ currentPage: currentPage.value });
}

const searchDelay = 1000;
const triggerSearch = useDebounceFn(() => {
  forceUpdate();
}, searchDelay);
</script>

<template>
  <v-row>
    <v-col :cols="6">
      <v-text-field
        v-model="nameFilter"
        label="Search for characters"
        hide-details="auto"
        @update:model-value="triggerSearch"
      />
    </v-col>
    <v-col :cols="6">
      <v-select
        v-model="statusFilter"
        :items="statusOptions"
        label="filter by status:"
        @update:model-value="forceUpdate"
      />
    </v-col>
  </v-row>
  <character-list :characters="characters" />
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="4">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              density="comfortable"
              class="my-4"
              :length="pageCount"
              :on-prev="previous"
              :on-next="next"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

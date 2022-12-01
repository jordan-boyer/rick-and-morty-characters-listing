<script setup lang="ts">
import { type Character } from "rickmortyapi/dist/interfaces";

defineProps<{ characters: Character[] }>();

const { path } = useRoute();
const router = useRouter();

function onClickDetails(id: number) {
  void router.push({ path: `${path}/${id}` });
}
</script>

<template>
  <v-row>
    <v-col v-for="character in characters" :key="character.id" cols="3">
      <v-card>
        <v-card-item>
          <v-card-title>{{ character.name }}</v-card-title>
        </v-card-item>
        <v-img :src="character.image" height="400px" cover />
        <v-card-text> Status: {{ character.status }} </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="() => onClickDetails(character.id)">
            Show more details
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

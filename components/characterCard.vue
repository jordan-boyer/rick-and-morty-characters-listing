<script setup lang="ts">
import { type Character } from "rickmortyapi/dist/interfaces";

defineProps<{ character: Character }>();

function splitEpisodeName(episode: string): string {
  const removedItem = 2;
  return episode.split("/").splice(-removedItem, removedItem).join("-");
}
</script>

<template>
  <v-card>
    <v-row>
      <v-card-item>
        <v-card-title>{{ character.name }}</v-card-title>
      </v-card-item>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-img :src="character.image" height="800px" cover />
      </v-col>
      <v-col cols="6">
        <v-card-text> Gender: {{ character.gender }} </v-card-text>
        <v-card-text> Status: {{ character.status }} </v-card-text>
        <v-row>
          <v-col v-for="episode in character.episode" :key="episode" cols="2">
            <v-card-text> {{ splitEpisodeName(episode) }} </v-card-text>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

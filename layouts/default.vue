<template>
  <v-app-bar app>
    <v-app-bar-nav-icon />
    <v-toolbar-title>Rick and Morty characters listing</v-toolbar-title>
  </v-app-bar>
  <v-main>
    <v-container>
      <slot />
    </v-container>
  </v-main>
</template>

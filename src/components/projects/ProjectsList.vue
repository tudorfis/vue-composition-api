<template>
  <base-container v-if="user">
    <h2>{{ user.fullName }}: Projects</h2>
    <base-search v-if="hasProjects" @search="updateSearch" :search-term="enteredSearchTerm"></base-search>
    <ul v-if="hasProjects">
      <project-item v-for="prj in availableProjects" :key="prj.id" :title="prj.title"></project-item>
    </ul>
    <h3 v-else>No projects found.</h3>
  </base-container>
  <base-container v-else>
    <h3>No user selected.</h3>
  </base-container>
</template>

<script>
import useSearch from '../../hooks/searchHook.js'
import { computed, toRefs, watch } from 'vue'
import ProjectItem from './ProjectItem.vue';

export default {
  components: {
    ProjectItem,
  },
  props: ['user'],
  setup( props ) {
    const { user } = toRefs( props )

    const projects = computed(function() { 
      return user.value ? user.value.projects : []
    })
    
    const {
        enteredSearchTerm,
        availableItems: availableProjects,
        updateSearch
    } = useSearch( projects, 'title' ) 

    const hasProjects = computed(function() {
      return props.user.projects && availableProjects.value.length > 0
    })

    watch( user, function() {
      updateSearch( '' )
    })

    return {
      enteredSearchTerm,
      hasProjects,
      availableProjects,
      updateSearch,
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
<template>
  <base-container>
    <h2>Active Users</h2>
    <base-search @search="updateSearch" :search-term="enteredSearchTerm"></base-search>
    <div>
      <button @click="sort('asc')" :class="{selected: sorting === 'asc'}">Sort Ascending</button>
      <button @click="sort('desc')" :class="{selected: sorting === 'desc'}">Sort Descending</button>
    </div>
    <ul>
      <user-item
        v-for="user in displayedUsers"
        :key="user.id"
        :user-name="user.fullName"
        :id="user.id"
        @list-projects="$emit('list-projects', $event)"
      ></user-item>
    </ul>
  </base-container>
</template>

<script>
import { toRefs } from 'vue'
import useSearch from '../../hooks/searchHook.js'
import useSort from '../../hooks/sortHook.js'
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  props: ['users'],
  emits: ['list-projects'],
  setup( props ) {
    const {
        enteredSearchTerm,
        availableItems: availableUsers,
        updateSearch
    } = useSearch( toRefs( props ).users, 'fullName' ) 

    ////////////////////////////////

    const {
        sorting,
        sortedItems: displayedUsers,
        sort
    } = useSort( availableUsers, 'fullName' )

    return {
      enteredSearchTerm,
      displayedUsers,
      updateSearch, 
      sorting,
      sort
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
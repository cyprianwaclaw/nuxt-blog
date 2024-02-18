import { defineStore } from 'pinia'
export const useState = defineStore('state', {

    state: () => ({
        openSearch: false as boolean,
        searchQuery: '' as string
    }),
    actions: {
        is0penSearch() {
            this.openSearch = true
            this.searchQuery = '';
        },
        isCloseSearch() {
            this.openSearch = false
            this.searchQuery = '';
        },
        setSearchQuery(query: string) {
            this.searchQuery = query;
        }
    }
})
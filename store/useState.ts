import { defineStore } from 'pinia'
export const useState = defineStore('state', {

    state: () => ({
        openSearch: false as boolean,
        searchQuery: '' as string
    }),
    actions: {
        is0penCloseSearch() {
            this.openSearch = !this.openSearch;
            this.searchQuery = '';
        },
        setSearchQuery(query: string) {
            this.searchQuery = query;
        }
    }
})
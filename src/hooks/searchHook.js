
import { ref, computed, watch } from 'vue'

export default function useSearch( items, filterProp ) {
    const enteredSearchTerm = ref( '' )
    const activeSearchTerm = ref( '' )

    const availableItems = computed(function(){
        let filteredItems = [];
        if (activeSearchTerm.value) {
            filteredItems = items.value.filter((item) =>
                item[ filterProp ].includes(activeSearchTerm.value)
            );
        } else if (items.value) {
            filteredItems = items.value;
        }
        return filteredItems;
    })

    function updateSearch(val) {
        enteredSearchTerm.value = val;
    }

    watch(enteredSearchTerm, function (newValue) {
        setTimeout(() => {
            if (newValue === enteredSearchTerm.value) {
                activeSearchTerm.value = newValue;
            }
        }, 300);
    })

    return {
        enteredSearchTerm,
        availableItems,
        updateSearch
    }
}

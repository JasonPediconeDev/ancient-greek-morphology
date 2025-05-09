// Keep track of active filters
const activeFilters = {
    filter1: new Set(),
    filter2: new Set(),
    filter3: new Set()
};

function filterCategory(filterType, value) {
    const button = event.target;
    const filterSet = activeFilters[filterType];
    
    // Toggle the filter
    if (filterSet.has(value)) {
        filterSet.delete(value);
        button.classList.remove('active');
    } else {
        filterSet.add(value);
        button.classList.add('active');
    }
    
    // Apply all active filters
    applyFilters();
}

function applyFilters() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        let shouldShow = true;
        
        // Check each filter type
        for (const [filterType, activeValues] of Object.entries(activeFilters)) {
            if (activeValues.size > 0) {
                const cardValue = card.getAttribute(`data-${filterType}`);
                if (!activeValues.has(cardValue)) {
                    shouldShow = false;
                    break;
                }
            }
        }
        
        card.style.display = shouldShow ? '' : 'none';
    });
}

function resetFilters() {
    // Clear all active filters
    Object.values(activeFilters).forEach(set => set.clear());
    
    // Remove active class from all buttons
    document.querySelectorAll('.filter-bar button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.style.display = '');
} 
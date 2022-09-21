document.addEventListener('alpine:init', () => {
    Alpine.data('disease', () => ({
        searchInput: '',
        message: '',
        open:false,
        results: {},
        treatment: {},
        symptoms: {},
        

        search() {
            axios.post(`http://localhost:5000/api/diseases/`, {
                disease_name: this.searchInput
            }).then(response => {
                if (response.data.isFound) {
                    console.log(response.data.search_results[0]);
                    this.message = 'Results found'
                    this.results = response.data.search_results[0];
                    this.open = true;
                    console.log(response.data.search_results)
                } else {
                    this.message = response.data.status
                }
            })
        },
    }))
})
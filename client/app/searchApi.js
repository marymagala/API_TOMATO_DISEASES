document.addEventListener('alpine:init', () => {
    Alpine.data('disease', () => ({
        searchInput: '',
        message: '',
        open:false,
        results: {},
        treatment: {},
        symptoms: {},
        hideList: true,
       
        
        // clearSearch(){
        //  setTimeout(()=>{
        //       this.open = false
        //  },6000)
        // },

        search() {
            axios.post(`/api/diseases/`, {
                disease_name: this.searchInput
            }).then(response => {
                if (response.data.isFound) {
                    console.log(response.data.search_results[0]);
                    this.message = 'Results found'
                    this.results = response.data.search_results[0];
                    this.hideList = false;
                    this.open = true;
                    this.clearSearch()
                    console.log(response.data.search_results)
                } else {
                    this.message = response.data.status
                }
            })
        },
    }))
})
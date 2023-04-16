class getDataFromApi {
    url = "";
    data = null;

    constructor(newURL) {
        this.url = newURL;
    }

    async getData() {
        if (this.data === null) {

            await fetch(this.url)
                .then(function (response) {
                    return response.json();
                }).then((data) => {
                    this.data = data;
                });

        }
        return this.data;
    }
}

getDataFromApi = new getDataFromApi("./data/data.json");
getDataFromApi.getData().then((data) => {
    console.log(data);
});



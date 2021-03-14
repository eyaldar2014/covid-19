// the table

const ctx = document.querySelector('#myChart').getContext('2d');

let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'COVID 19',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [1]
        }]
    },

    // Configuration options go here
    options: {}
});



// API's

const apiOne = 'https://corona-api.com/countries'
const apiTwo = 'https://restcountries.herokuapp.com/api/v1'
// const proxyLink = 'https://api.codetabs.com/v1/proxy/?quest=';
const proxyLink = 'https://api.codetabs.com/v1/proxy/?quest='

let mainObj = []
const buttons = document.querySelectorAll("input")
const loader = document.querySelector("#loader")

// console.log(loader)
// get API's by country information

async function getCountriesInfo() {

    loader.style.left = 'calc(50vw - 300px);'
    
    let countries = []
    const result = await fetch(proxyLink + apiOne)
    const datas = await result.json()

    datas.data.map(element => {
        let temp = {}
        temp.name = element.name
        temp.code = element.code
        temp.confirmed = element.latest_data.confirmed
        temp.deaths = element.latest_data.deaths
        temp.recovered = element.latest_data.recovered
        temp.critical = element.latest_data.critical
        temp.todayDeath = element.today.deaths
        temp.todayConfirmed = element.today.confirmed
        countries.push(temp)
    })

    loader.style.left = '-9999px'
    return countries
}


// adjust the table to hold intire world info by countries without region
async function world() {
    buttons.forEach(btn=>{
        btn.disabled = true;
    })
    mainObj = {}
    mainObj = await getCountriesInfo()

    chart.data.labels = []
    chart.data.datasets[0].data = []

    mainObj.forEach(country => {
        chart.data.labels.push(country.name)
    })
    chart.update()
    buttons.forEach(btn=>{
        btn.disabled = false;
    })
    // console.log(mainObj)
}


// intire world info by countries with region
async function getCountriesRegion(continent) {

    buttons.forEach(btn=>{
        btn.disabled = true;
    })

    mainObj = []
    let countriesByRegion = []

    const answer = await getCountriesInfo()
    loader.style.left = 'calc(50vw - 300px)'
    const result = await fetch(proxyLink + apiTwo)
    const datas = await result.json()


    datas.map(country => {
        newArray = answer.map(anotherCountry => {
            if (country.cca2 === anotherCountry.code) {

                let temp = {}
                temp.name = anotherCountry.name
                temp.code = anotherCountry.code
                temp.region = country.region
                temp.confirmed = anotherCountry.confirmed
                temp.deaths = anotherCountry.deaths
                temp.recovered = anotherCountry.recovered
                temp.critical = anotherCountry.critical
                temp.todayDeath = anotherCountry.deaths
                temp.todayConfirmed = anotherCountry.confirmed
                countriesByRegion.push(temp)
            }
        })
    })


    // mainObj.forEach(country =>{
    //     if(country.region === continent){
    //         mainObj[country.code] = country
    //     }
    // })


    countriesByRegion.forEach(country =>{
        if(country.region === continent){
            mainObj.push(country)
        }
    })

    // console.log(mainObj)
    chart.data.labels = []
    chart.data.datasets[0].data = []
    mainObj.forEach(country => {
        chart.data.labels.push(country.name)
    })
    chart.update()   

    buttons.forEach(btn=>{
        btn.disabled = false;
    })

    loader.style.left = '-9999px'
    return mainObj
}



// all situation functions for regoins
function confirmed() {
    chart.data.labels = []
    chart.data.datasets[0].data = []
    mainObj.forEach(country => {
        chart.data.labels.push(country.name)
        chart.data.datasets[0].data.push(country.confirmed)
    })
    chart.update()   
}

function deaths() {
    chart.data.labels = []
    chart.data.datasets[0].data = []
    mainObj.forEach(country => {
        chart.data.labels.push(country.name)
        chart.data.datasets[0].data.push(country.deaths)
    })
    chart.update()   
}

function recovered() {
    chart.data.labels = []
    chart.data.datasets[0].data = []
    mainObj.forEach(country => {
        chart.data.labels.push(country.name)
        chart.data.datasets[0].data.push(country.recovered)
    })
    chart.update()   
}

function critical() {
    chart.data.labels = []
    chart.data.datasets[0].data = []
    mainObj.forEach(country => {
        chart.data.labels.push(country.name)
        chart.data.datasets[0].data.push(country.critical)
    })
    chart.update()   
}

function todayDeath() {
    chart.data.labels = []
    chart.data.datasets[0].data = []
    mainObj.forEach(country => {
        chart.data.labels.push(country.name)
        chart.data.datasets[0].data.push(country.todayDeath)
    })
    chart.update()   
}

function todayConfirmed() {
    chart.data.labels = []
    chart.data.datasets[0].data = []
    mainObj.forEach(country => {
        chart.data.labels.push(country.name)
        chart.data.datasets[0].data.push(country.todayConfirmed)
    })
    chart.update()   
}
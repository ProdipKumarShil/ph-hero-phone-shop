const loadData = (inputText = '') => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data.data))
}

// show data
const showData = (allData) => {
    const cardsContainer = document.getElementById("cardContainer")
    cardsContainer.innerHTML = ''
    console.log(allData.length)

    // no data found message
    const container = document.getElementById('notFound')
    if(allData.length > 0) {
        container.classList.add('hidden')
    }
    else{
        container.classList.remove('hidden')
    }

    allData.forEach((data) => {
        const{brand, phone_name, image, slug} = data
        const div = document.createElement('div');
        div.classList.add('flex')
        div.classList.add('items-center')
        div.classList.add('justify-center')
        div.innerHTML = `
        <div class="card card-compact w-96 bg-base-100 h-[380px] shadow-xl">
            <figure><img src="${image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone_name}</h2>
                <p>Brand new ${phone_name} phone. Manufacture by ${brand}</p>
                <div class="card-actions justify-end">
                    <label onclick="phoneDetails('${slug}')" for="my-modal-4" class="btn btn-primary">Buy Now</label>
                </div>
            </div>
        </div>
        `
        cardsContainer.appendChild(div)
    })
}

document.getElementById('searchBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputField').value
    loadData(inputText)
})

const phoneDetails = (phonesData) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phonesData}`
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => showModalData(data.data))
}

const showModalData = (phones) => {
    const {name, image, releaseDate} = phones
    const displaySize = (phones.mainFeatures.displaySize).split(',')
    const chipSet = (phones.mainFeatures.chipSet).split('-')
    const memory = (phones.mainFeatures.memory).split(',')
    const storage = (phones.mainFeatures.storage).split(',')

    const modal = document.getElementById('card')
    modal.innerHTML = ''
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card card-side">
        <figure><img src="${image}" alt="Movie" /></figure>
        <div class="card-body">
            <h2 class="card-title">${name}</h2>
            <p>Display Size: ${displaySize[0]}</p>
            <p>Chip-Set: ${chipSet[0]}</p>
            <p>Memory: ${memory[0]}</p>
            <p>Storage: ${storage[0]}</p>
            <p>Release Date: ${(releaseDate ? releaseDate: 'Release date not found')}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Watch</button>
            </div>
        </div>
    </div>
    `
    modal.appendChild(div)
}

loadData()

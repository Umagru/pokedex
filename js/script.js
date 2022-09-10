const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')
const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const buttonPrev =document.querySelector('.btn-prev')
const buttonNext =document.querySelector('.btn-next')
let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    const data = await fetchPokemon(pokemon)
    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        //GERAÇÃO 8 VAI ATÉ O 899
        if (data.id > 0 && data.id < 650) {
            // GERAÇÃO 5 COM ANIMAÇÃO
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        } else if (data.id >= 650 && data.id < 899) {
            pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default']
        } else {
            pokemonImage.style.display = 'none'
        }
        input.value = ''
        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found :C'
        pokemonNumber.innerHTML = ''
    }
    // GERAÇÃO 7 (NÃO VAI A GERAÇÃO 8)
    // pokemonImage.src = data['sprites']['versions']['generation-vii']['icons']['front_default']
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})
renderPokemon(searchPokemon)
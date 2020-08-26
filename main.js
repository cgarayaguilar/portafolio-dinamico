const grid = new Muuri('.grid', {
  layout: {
    fillGaps: false,
    horizontal: false,
    alignRight: false,
    alignBottom: false,
    rounding: false
  }
})

//Agregamos los listener para filtrar por categorias
window.addEventListener('load', () => {
  grid.refreshItems().layout()
  document.getElementById('grid').classList.add('images-loaded')

  const links = document.querySelectorAll('#categories a')

  links.forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault()
      links.forEach(link => link.classList.remove('active'))

      event.target.classList.add('active')

      const category = event.target.innerHTML.toLowerCase()

      category === 'todos'
        ? grid.filter('[data-category]')
        : grid.filter(`[data-category="${category}"]`)
    })
  })
})

document.querySelector('#search-bar').addEventListener('input', event => {
  const searchTerm = event.target.value

  grid.filter(item => item.getElement().dataset.label.includes(searchTerm))
})

//Agregamos listener para las imagenes
const overlay = document.getElementById('overlay')

document.querySelectorAll('.grid .item img').forEach(element => {
  element.addEventListener('click', () => {
    const path = element.getAttribute('src')
    const description = element.parentNode.parentNode.dataset.description

    overlay.classList.add('active')
    document.querySelector('#overlay img').src = path
    document.querySelector('#overlay .description').innerHTML = description
  })
})

document.querySelector('#btn-close-popup').addEventListener('click', () => {
  overlay.classList.remove('active')
})

overlay.addEventListener('click', event => {
  event.target.id === 'overlay' && overlay.classList.remove('active')
})

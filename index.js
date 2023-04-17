const container = document.getElementById('image-container')
let page = 1

// Fetch images and random text from the APIs and append them to the container
async function getImagesAndText() {
  const imagesRes = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=9`
  )
  const images = await imagesRes.json()

  const textRes = await fetch(`https://api.quotable.io/random?count=9`)
  const texts = await textRes.json()

  images.forEach((image, index) => {
    // Create the image element
    const img = document.createElement('img')
    img.src = image.download_url

    // Create the text element
    const text = document.createElement('p')
    text.innerText = texts[index].content

    // Create the item container and append the elements to it
    const itemContainer = document.createElement('div')
    itemContainer.classList.add('item-container')
    itemContainer.appendChild(img)
    itemContainer.appendChild(text)

    // Append the item container to the main container
    container.appendChild(itemContainer)
  })

  page++
}

// Detect when the user has scrolled to the bottom of the page
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    getImagesAndText()
  }
})

// Load initial set of images and text
getImagesAndText()

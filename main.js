const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song Authors
const authors = ['hey', 'summer', 'test']

// Keep track of authors
let authorIndex = 2

// Initially load author info DOM
loadAuthor(songs[authorIndex])

// Update song details
function loadAuthor(author) {
    title.innerText = author
    audio.src = `music/${author}.mp3`
    cover.src = `images/${author}.jpg`
}

function playSong() {
musicContainer.classList.add('play')
playBtn.querySelector('.fas').classList.remove('fa-play')
playBtn.querySelector('.fas').classList.add('fa-pause')
}

function pauseSong() {

}

// Event Listeners
playBtn.addEventListener('click', ()=> {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPLaying) {
        pauseSong()
        
    } else {
        playSong()
    }
})
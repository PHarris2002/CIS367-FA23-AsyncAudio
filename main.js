const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const cover = document.querySelector('#cover')

// Songs
const songs = ['Better Days', 'Best Part of Me', 'Aidan']
const authors = ['LAKEY INSPIRED','The Dunwells', 'Jonathan Ceaser']

// Keep track of songs and authors
let songIndex = 0
let authorIndex = 0

// Initially load song info DOM
loadSongAndAuthor(songs[songIndex], authors[authorIndex])

// Update song details
function loadSongAndAuthor(song, artist) {
    title.innerText = song
    author.innerText = artist
    audio.src=`songs/${song}.mp3`
    cover.src=`albumart/${song}.jpg`
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.play-button').classList.remove('fa-play')
    playBtn.querySelector('i.play-button').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.play-button').classList.add('fa-play')
    playBtn.querySelector('i.play-button').classList.remove('fa-pause')
    
    audio.pause()
}

function prevSong() {
    songIndex--
    authorIndex--

    if(songIndex < 0) {
        songIndex = songs.length - 1
        authorIndex = authors.length - 1
    }

    loadSongAndAuthor(songs[songIndex], authors[authorIndex])

    playSong()
}

function nextSong() {
    songIndex++
    authorIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0
        authorIndex = 0
    }

    loadSongAndAuthor(songs[songIndex], authors[authorIndex])

    playSong()
}

function updateProgress(e) {
   const {duration, currentTime} = e.srcElement
   const progressPercent = (currentTime/duration) * 100
   progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX/width) * duration
}

// Event Listeners
playBtn.addEventListener('click', ()=> {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
        
    } else {
        playSong()
    }
})

// Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)
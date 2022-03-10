// song.addEventListener("loadeddata", progressAudioTimeManually);
song.addEventListener("timeupdate", progressBarWidth);
progressBarInput.addEventListener("change", progressAudioTimeManually);

onload = function () {
    for (let i = 0; i < songList.length; i++) {
        playlistContainer.innerHTML += `<section class="songs cent">

                                             <article class="song-info centColumn">
                                                <img src="${songList[i].cover}" class="cover" alt="playIcon">
                                                <h1>${songList[i].title}</h1>
                                                <p>${songList[i].autor}</p>
                                             </article>

                                             <audio class="audio" src="${songList[i].src}"></audio>
                                        </section>`;
    }

    for (let s of songs) {
        s.addEventListener("click", playSelectedSong);
    }

    infoSong();
    startCounter();
};

function calcTime(value) {
    const secs = parseInt(value);
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - hours * 3600) / 60);
    let seconds = secs - hours * 3600 - minutes * 60;

    if (hours == 0) return minutes + ":" + (seconds >= 10 ? seconds : "0" + seconds);

    if (hours !== 0) return hours + ":" + (minutes >= 10 ? minutes : "0" + minutes) + ":" + (seconds >= 10 ? seconds : "0" + seconds);
}
function startCounter() {
    counterTotalTime = setInterval(function () {
        songTotalTime.innerHTML = calcTime(song.duration);
    }, 1);

    counterCurrentTime = setInterval(function () {
        songCurrentTime.innerHTML = calcTime(song.currentTime);
    }, 1000);
}

function infoSong() {
    song.src = songList[index].src;
    songInfo.children[0].src = songList[index].cover;
    songInfo.children[1].innerHTML = songList[index].title;
    songInfo.children[2].innerHTML = songList[index].autor;
}

function playSelectedSong() {
    let songSelected = this.children[1].src;
    let songSelectedInfo = this.children[0].innerHTML;

    song.src = songSelected;
    song.pause();
    song.currentTime = 0;
    songInfo.innerHTML = songSelectedInfo;
    songInfo.children[0].setAttribute("width", "250px");

    addEventListener("click", function () {
        if (song.paused && song.currentTime === 0) {
            playSong.setAttribute("src", "./assets/pause.png");
            song.play();
            return;
        }
    });
}

function progressAudioTimeManually() {
    progressBarInput.setAttribute("max", `${song.duration * 1000}`);
    timeCurrent = progressBarInput.value / 1000;
    song.currentTime = timeCurrent;
}
function progressBarWidth() {
    progressBarInput.value = song.currentTime * 1000;
    time = song.currentTime * (1000 / song.duration);
    width = time / 10;
    progressBar.style.width = `${width}%`;
}

prevSong.addEventListener("click", function () {
    index--;
    song.src = songList[index].src;
    infoSong();
    playSong.setAttribute("src", "./assets/pause.png");
    song.play();
});

playSong.addEventListener("click", function () {
    if (song.paused) {
        playSong.setAttribute("src", "./assets/pause.png");
        progressBarInput.setAttribute("max", `${song.duration * 1000}`);
        song.play();
        return;
    }

    if (!song.paused) {
        playSong.setAttribute("src", "./assets/play.png");
        song.pause();
        return;
    }
});

nextSong.addEventListener("click", function () {
    index++;
    if (index === songList.length) {
        index = 0;
    }
    song.src = songList[index].src;
    infoSong();
    playSong.setAttribute("src", "./assets/pause.png");
    song.play();
});

repeatSong.addEventListener("click", function () {
    if (repeatSong.classList.contains("repeatHover") === false && buttonRepeatState === false) {
        buttonRepeatState = true;
        repeatSong.classList.add("repeatHover");
        song.addEventListener("timeupdate", function () {
            if (song.currentTime === song.duration && buttonRepeatState === true) {
                song.currentTime = 0;
                song.play();
            }
        });
        return;
    }

    if (repeatSong.classList.contains("repeatHover") === true && buttonRepeatState === true) {
        buttonRepeatState = false;
        repeatSong.classList.remove("repeatHover");
        return;
    }
});

function showFooterContainer() {
    footerContainer.style.height = "130px";
    footerContainer.addEventListener("mouseleave", function () {
        footerContainer.style.height = "32px";
    });
}

footerContainer.addEventListener("mouseover", showFooterContainer);

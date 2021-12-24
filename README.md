# randomMusicPlayer

site which currently plays audio (.mp3/.wav/.flac) files at random

modes currently supported:
- default songs: collection of songs i uploaded to a third-party site
- folder select: lets user select a local folder; recursively includes all audio files
- osu! collection: select your osu! folder, then pick one of your collections from the list
  - note: all song folders with a tilde character ('~') seem to be inaccessible with the File System Access API, so these songs are silently removed :(
  - deployed version doesn't seem to support this; seems to require cloning and running locally

## to run locally

- clone repo and navigate to root folder in two shells
- make sure that port 3000 (and probably also 5000) is free
- in one shell, do npm run start
- in the other, do npm run hotloader
- site should be served on localhost:5000

## todo
kete
- move songs around
- improve textboxes
- sort pool list
- option to export collection to an osu! subfolder
- or use api https://github.com/remanifest/s-ul-curl-uploader
- pool filter functions etc.
- reimplement scrollIfNeeded for pool box
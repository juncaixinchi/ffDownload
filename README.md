# ffDownload
Remote downloader with Firefox Send

### setup

+ require:
    - [ffsend](https://github.com/timvisee/ffsend/releases)
    - nodejs
+ setup script
```bash
git clone https://github.com/juncaixinchi/ffDownload.git
cd ffDownload
npm i
```

### run

start server on port 3000 in yourserver
```bash
npm start

# in background
nohup node index.js &
```

visit http://yourserverdomain:3000/?url=someurltodownload
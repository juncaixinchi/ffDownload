
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

yarn
```

### run

start server on port 3000 in yourserver
```bash
yarn start

# in background
nohup node index.js &
```

visit http://yourserverdomain:3000/?url=someurltodownload

# Try in Gitpod
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/juncaixinchi/ffDownload) 
const path = require('path');
const fs = require('fs');
const del = require('del');
const createCertificate = require('webpack-dev-server/lib/utils/createCertificate');
const resolveExtensions = /\.(jsx?|tsx?)$/;

const getEntry = function (pathname, base = path.basename(pathname), entry = {}) {
    let files = fs.readdirSync(pathname),
        name = '';
    files.forEach(function (file) {
        if (fs.lstatSync(path.join(pathname, file)).isDirectory()) {
            getEntry(path.join(pathname, file), `${base}/${file}`, entry);
        } else if (resolveExtensions.test(file)) {
            name = `${base}/${file.replace(resolveExtensions,'')}`;
            entry[name] = path.join(pathname, file);
        }
    });
    return entry;
}

//项目根目录
const ROOT_PATH = path.join(__dirname, '..');

//打包输出目录
const OUT_PATH = path.join(__dirname, '../dist');

//打包入口目录
const ENTRY_PATH = path.join(__dirname, '../src/pages');

//copy目录
const COPY_PATH = path.join(__dirname, '../src/lib');

//copy目标目录
const COPY_DEST_PATH = path.join(OUT_PATH, 'lib');

//解析entry
const ENTRY = getEntry(ENTRY_PATH);

const PUBLICBASE = '';
//根目录base，默认未“/”
const BASEPATH = PUBLICBASE ? PUBLICBASE + '/' : '/';

//配置CDN,HOST
const HOST = {
    js: 'j1.58cdn.com.cn',
    css: 'c.58cdn.com.cn',
    img: 'img.58cdn.com.cn'
};
const PUBLICPATH = HOST.js ? `//${HOST.js}${BASEPATH}` : BASEPATH;
const IMGPUBLICPATH = HOST.img ? `//${HOST.img}${BASEPATH}` : BASEPATH;
const CSSPUBLICPATH = HOST.css ? `//${HOST.css}${BASEPATH}` : BASEPATH;

module.exports = {
    ROOT_PATH,
    OUT_PATH,
    ENTRY_PATH,
    COPY_PATH,
    COPY_DEST_PATH,
    ENTRY,
    HOST,
    PUBLICBASE,
    BASEPATH,
    PUBLICPATH,
    IMGPUBLICPATH,
    CSSPUBLICPATH,
    ssl(options = {}) {
        let fakeCert;
        if (!options.key || !options.cert) {
            // Use a self-signed certificate if no certificate was configured.
            // Cycle certs every 24 hours
            const certPath = path.join(ROOT_PATH, 'node_modules/webpack-dev-server/ssl/server.pem');

            let certExists = fs.existsSync(certPath);

            if (certExists) {
                const certTtl = 1000 * 60 * 60 * 24;
                const certStat = fs.statSync(certPath);

                const now = new Date();

                // cert is more than 30 days old, kill it with fire
                if ((now - certStat.ctime) / certTtl > 30) {
                    this.log.info('SSL Certificate is more than 30 days old. Removing.');

                    del.sync([certPath], {
                        force: true
                    });

                    certExists = false;
                }
            }

            if (!certExists) {
                this.log.info('Generating SSL Certificate');

                const attrs = [{
                    name: 'commonName',
                    value: 'localhost'
                }];

                const pems = createCertificate(attrs);

                fs.writeFileSync(
                    certPath,
                    pems.private + pems.cert, {
                        encoding: 'utf-8'
                    }
                );
            }
            fakeCert = fs.readFileSync(certPath);
        }
        return {
            key: options.key || fakeCert,
            cert: options.cert || fakeCert
        }
    }
}
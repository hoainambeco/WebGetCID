const axios = require("axios");
const https = require('https');
exports.home = (req, res, next) => {
    res.render('home', {
        display: 'block',
        img: 'images/android_dialer_FILL0_wght700_GRAD0_opsz48.svg',
    });
}
exports.iid = async (req, res, next) => {
    var registerf = req.body.registerf;

    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
        str = str.replace(/\u02C6|\u0306|\u031B/g, "");
        str = str.trim();
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");
        str = str.replace(/q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m/g, "");
        return str;
    }

    var iid = removeVietnameseTones(registerf);
    console.log(iid);
    try {
        https.get(`https://getcid.info/api/${iid}/12a3p1q0m0g`, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                console.log(data);
                if (data == 'Exceeded IID.' || data == 'Wrong IID.' || data == 'Blocked IID.' || data == 'Not legimate key. Maybe blocked.' || data == 'Sorry, API Token cannot be empty.' || data == 'Sorry, your API Token does not exist.' || data == 'Your IP reach request limit.' || data == 'Your IP is being locked.' || data == 'Your IID reach request limit.' || data == 'Your IID is being locked.' || data == 'Sorry, your API Token has been used 5/5 times.') {
                    res.render('home', {
                        alert: '<div class="alert-danger" style="width: fit-content; margin: auto; padding: 10px; border-radius: 10px">\n' +
                            `<h1>${data}</h1>\n` +
                            '            </div>',
                        iid: iid,
                        cid: data,
                        messageCID: "Your confirmation ID is located below",
                        img: 'images/done.svg'
                    });
                } else {
                    let cid = data.slice(0,6) + " " + data.slice(6,12) + " "+ data.slice(12,18) + " "+ data.slice(18,24) + " "+ data.slice(24,30) + " "+ data.slice(30,36) + " "+ data.slice(36,42)+ " "+ data.slice(42,data.length);
                    res.render('home', {
                        iid: iid,
                        cid: cid,
                        messageCID: "Your confirmation ID is located below",
                        img: 'images/done.svg'
                    });
                }
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    } catch (e) {
        res.json("server mất kết nối mạng")
    }
}

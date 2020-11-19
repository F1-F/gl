const axios = require("axios");

axios.defaults.headers.common.cookie = '_ga=GA1.2.1951897742.1602815004; koa:sess=eyJ1c2VySWQiOjU1MjM2LCJjb2RlIjoiR1NBQUQtV0E0R0wtNEswVzItSkdRUDEiLCJfZXhwaXJlIjoxNjI5MTE1NzI2NTE5LCJfbWF4QWdlIjoyNTkyMDAwMDAwMH0=; koa:sess.sig=W0eFVo4noQrt4Xs9TMmEmpgiYQs; _gid=GA1.2.1714327065.1605769098; _gat_gtag_UA_104464600_2=1';
const SCKEY = "SCU128030T713e50dde26a733c32fe93eb5ddd81185fb6342aaae30";

const checkIn = () => {
    return axios({
        method: 'post',
        url: 'https://glados.rocks/api/user/checkin',
        data: {
            token: "glados_network"
        }
    })
}

const status = () => {
    return axios({
        method: 'get',
        url: 'https://glados.rocks/api/user/status'
    })
}

const server = (checkInMessage, leftDays) => {
    return axios({
        method: 'get',
        url: `https://sc.ftqq.com/${SCKEY}.send`,
        params: {
            text: `${checkInMessage}，${leftDays}天后到期`
        }
    })
}

axios.all([checkIn(), status()])
    .then(axios.spread((checkInResult, statusInfo) => {
        let checkInMessage = checkInResult.data.message;
        let leftDays = parseInt(statusInfo.data.data.leftDays);
        return { checkInMessage, leftDays }
    })).then(data => {
        let { checkInMessage, leftDays } = data;
        if (SCKEY) {
            server(checkInMessage, leftDays);
        }
    });
const axios = require("axios");

const SCKEY = process.env.SCKEY;
axios.defaults.headers.common.cookie = process.env.COOKIE;

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
            text: `${leftDays}天后到期，${checkInMessage}`
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

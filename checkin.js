const axios = require("axios");

const SCKEY = process.env.SCKEY;
axios.defaults.headers.common.cookie = process.env.COOKIE;

const checkIn = async (cookie) => {
    return axios({
        method: 'post',
        url: 'https://glados.rocks/api/user/checkin',
        data: {
            token: "glados_network"
        }
    })
}

const status = async (cookie) => {
    return axios({
        method: 'get',
        url: 'https://glados.rocks/api/user/status'
    })
}

const push = (checkInMessage, email, leftDays) => {
    return axios({
        method: 'get',
        url: `https://sctapi.ftqq.com/${SCKEY}.send`,
        params: {
            title: `${leftDays}天后到期，${checkInMessage}`
        }
    })
}

const executeCheckIn = async () => {
    const cookies = process.env.COOKIES;
    console.log(cookies);
    console.log(typeof cookies);
    // const result = [];

    // for (const cookie of cookies) {
    //     const checkInMessage = (await checkIn(cookie))?.data?.message;

    //     const userStatus = (await status(cookie))?.data?.data;
    //     const email = userStatus?.email;
    //     const leftDays = parseInt(userStatus?.leftDays);

    //     console.log(checkInMessage, email, leftDays);
    //     result.push({
    //         checkInMessage,
    //         email,
    //         leftDays
    //     })
    // }
    // return result;
}

const GLaDOSCheckIn = async () => {
    await executeCheckIn();
    // if (SCKEY) {
    //     server(checkInMessage, email, leftDays);
    // }
}

GLaDOSCheckIn();

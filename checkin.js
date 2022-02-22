const axios = require("axios");

const SCKEY = process.env.SCKEY;

const checkIn = async (cookie) => {
    return axios({
        method: 'post',
        url: 'https://glados.rocks/api/user/checkin',
        headers: {
            'Cookie': cookie
        },
        data: {
            token: "glados_network"
        }
    })
}

const getStatus = async (cookie) => {
    return axios({
        method: 'get',
        url: 'https://glados.rocks/api/user/status',
        headers: {
            'Cookie': cookie
        }
    })
}

const checkInAndGetStatus = async (cookie) => {
    const checkInMessage = (await checkIn(cookie))?.data?.message;

    const userStatus = (await getStatus(cookie))?.data?.data;
    const email = userStatus?.email;
    const leftDays = parseInt(userStatus?.leftDays);

    console.log(checkInMessage, email, leftDays);
    return {
        checkInMessage,
        email,
        leftDays
    };
}

// const push = (checkInMessage, email, leftDays) => {
//     return axios({
//         method: 'get',
//         url: `https://sctapi.ftqq.com/${SCKEY}.send`,
//         params: {
//             title: `${leftDays}天后到期，${checkInMessage}`
//         }
//     })
// }

const GLaDOSCheckIn = async () => {
    const cookies = process.env.COOKIES?.split(",") ?? [];

    const result = await Promise.all(cookies.map(async cookie => await checkInAndGetStatus(cookie)));

    console.log(result);
    // if (SCKEY) {
    //     server(checkInMessage, email, leftDays);
    // }
}

GLaDOSCheckIn();

const axios = require('axios');

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
    });
};

const getStatus = async (cookie) => {
    return axios({
        method: 'get',
        url: 'https://glados.rocks/api/user/status',
        headers: {
            'Cookie': cookie
        }
    });
};

const checkInAndGetStatus = async (cookie) => {
    const checkInMessage = (await checkIn(cookie))?.data?.message;

    const userStatus = (await getStatus(cookie))?.data?.data;
    const email = userStatus?.email;
    const leftDays = parseInt(userStatus?.leftDays);

    return {
        '账号': email,
        '天数': leftDays,
        '签到情况': checkInMessage
    };
};

const pushplus = (token, infos) => {
    if (infos.length === 0) return;

    const data = {
        token,
        title: `账号：${infos?.[0].email}`.padEnd(32, ' ') + `天数：${infos?.[0].leftDays}`.padEnd(32, ' ') + `签到情况：${infos?.[0].checkInMessage}`,
        content: JSON.stringify(infos),
        template: 'json'
    };
    console.log(data);

    axios({
        method: 'post',
        url: `http://www.pushplus.plus/send`,
        data
    });
};

const GLaDOSCheckIn = async () => {
    const cookies = process.env.COOKIES?.split(",") ?? [];

    const results = await Promise.all(cookies.map(async cookie => await checkInAndGetStatus(cookie)));
    console.log(results);

    const PUSHPLUS = process.env.PUSHPLUS;

    if (PUSHPLUS) {
        pushplus(PUSHPLUS, results);
    }
};

GLaDOSCheckIn();

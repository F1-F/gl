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
        checkInMessage,
        email,
        leftDays
    };
};

const pushplus = (token, infos) => {
    if (infos.length === 0) return;

    let content = '';
    for (const info of infos) {
        const { checkInMessage, email, leftDays } = info;

        content += `${email}：${leftDays}天后到期，${checkInMessage}<br/>`;
    }

    axios({
        method: 'post',
        url: `http://www.pushplus.plus/send`,
        data: {
            token,
            title: `${infos?.[0].email}：${infos?.[0].leftDays}天后到期，${infos?.[0].checkInMessage}`,
            content
        }
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

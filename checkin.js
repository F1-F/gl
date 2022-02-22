import axios from "axios";

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
};

const getStatus = async (cookie) => {
    return axios({
        method: 'get',
        url: 'https://glados.rocks/api/user/status',
        headers: {
            'Cookie': cookie
        }
    })
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

const push = (infos) => {
    let desp = '';
    for (const info of infos) {
        const { checkInMessage, email, leftDays } = info;

        desp += `${email}：${leftDays}，${checkInMessage}\n`;
    }

    return axios({
        method: 'post',
        url: `https://sctapi.ftqq.com/${SCKEY}.send`,
        data: {
            title: `${infos?.[0].email}：${infos?.[0].leftDays}，${infos?.[0].checkInMessage}`,
            desp
        }
    })
};

const GLaDOSCheckIn = async () => {
    const cookies = process.env.COOKIES?.split(",") ?? [];

    const results = await Promise.all(cookies.map(async cookie => await checkInAndGetStatus(cookie)));
    console.log(results);

    if (SCKEY) {
        push(results);
    }
};

GLaDOSCheckIn();

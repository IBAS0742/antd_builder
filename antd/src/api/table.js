export const STableData = ({pageNo,pageSize}) => {
    let data = [
        {
            id: 1,
            cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
            title: 'Alipay',
            description: '那是一种内在的东西， 他们到达不了，也无法触及的',
            status: 1,
            updatedAt: '2018-07-26 00:00:00'
        },
        {
            id: 2,
            cover: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
            title: 'Angular',
            description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
            status: 1,
            updatedAt: '2018-07-26 00:00:00'
        },
        {
            id: 3,
            cover: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
            title: 'Ant Design',
            description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
            status: 1,
            updatedAt: '2018-07-26 00:00:00'
        },
        {
            id: 4,
            cover: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
            title: 'Ant Design Pro',
            description: '那时候我只会想自己想要什么，从不想自己拥有什么',
            status: 1,
            updatedAt: '2018-07-26 00:00:00'
        },
        {
            id: 5,
            cover: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
            title: 'Bootstrap',
            description: '凛冬将至',
            status: 1,
            updatedAt: '2018-07-26 00:00:00'
        },
        {
            id: 6,
            cover: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
            title: 'Vue',
            description: '生命就像一盒巧克力，结果往往出人意料',
            status: 1,
            updatedAt: '2018-07-26 00:00:00'
        }
    ];
    return new Promise(s => { s({
        "message": "",
        "result": {
            "data": (() => {
                let d = [];
                for (let i = 0;i < pageSize;i++) {
                    d.push(JSON.parse(JSON.stringify(data[i % 6])));
                    d[i].id = i + pageSize * (pageNo - 1);
                }
                return d;
            })(),
            "pageSize": 10,
            "pageNo": pageNo,
            "totalPage": 6,
            "totalCount": 57
        },
        "status": 200,
        "timestamp": 1534955098193
    }) }).then(_ => _.result)
};
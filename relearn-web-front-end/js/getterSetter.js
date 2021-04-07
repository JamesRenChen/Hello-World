{
    const oInput1 = document.querySelector('#input1')
    const oInput2 = document.querySelector('#input2')
    const oSpan = document.querySelector('#span')
    
    // 确实是看的晚了些哈哈。房子的贷款也下来了，第一个月还7500，之后每个月都是5500，但是他们没给我开发票，说是十月交房了才能开，可是北京提取公积金的话必须要发票，就很烦。
    // 磨磨唧唧到九点半大家都来了，看情况不忙的话我继续学习，有事情就把事情做了，不过最近基本不忙，大部分时间还是学习为主。越看书越感觉自己菜的不行。也挺有意思的。
    // 中午十一点半跟大家去吃饭，正餐很少吃了，除非偶尔迟到没吃早饭，才去吃点盖饭什么的，都是直接买个玉米、红薯。
    // 公司的食堂、外卖，家里附近的外卖都吃腻了。
    // 3月12日星期五，燕郊那边通知合同可以取了，我查了下政策，来往北京和燕郊还是需要两天内的核酸检测证明，请了星期六的假去做核酸吧。查了一圈附近的医院，全都预约满了，只能找个稍远点的检测机构，80块钱做一次，公立医院的话只要40。
    // 3月13日星期六，磨磨唧唧出门又快12点了，天气暖和了，借了同事的电瓶车出门，这车放了好久没骑了，擦他车擦了20分钟，这应该是我第一次骑电瓶车，还好，拧两下就往前跑了，操作还是很方便的。不过骑了5公里就后悔了，这会骑车还是很冻手的，
    // 也没带个手套出来。而且啊，现在的电动车都被限速了，最高才30km/h，巨慢，但是都骑了一半了，没办法继续往前骑吧。45分钟才骑到检测机构，花了不到一分钟做完核酸了，回去的路上顺便去趟邮政局，年前给你寄的1500元生活费
    // 被退回来了，都没人给我打电话说一声，我看你那个账户余额一直没变化，翻出来汇款号查了下才知道被退回了。来到邮政局，就给了我一个小纸条，退款单据，说是还得去邮政银行才能取到钱。出了邮政局的门，跨上小电驴，这个时候发现小电驴
    // 真香，随骑随走。然后去邮政把钱取了，看情况再给你汇过去吧。
    // 
    const Vue = {}
    Object.defineProperties(Vue, {
        input1Val: {
            configurable: true,
            enumerable : true,
            get: function () {
                oInput1.value = 0
                oInput2.value = 0
                oSpan.innerHTML = 0
                return 11
            },
            set: function (newVal) {
                console.log(11111111111)
                console.log(newVal)
                oInput2.value = newVal  
                oSpan.innerHTML = Number(newVal) ? Number(newVal) : 0
            },
        },
        input2Val: {
            configurable: true,
            enumerable : true,
            get: function () {
                oInput1.value = 0
                oInput2.value = 0
                oSpan.innerHTML = 0
                return 22
            },
            set: function (newVal) {
                console.log(22222222222)
                console.log(newVal)
                oInput1.value = newVal
                oSpan.innerHTML = Number(newVal) + 1
            },
        },
    })

    oInput1.value = Vue.input1Val
    oInput1.addEventListener('keyup', function () {
        Vue.input1Val = oInput1.value
    }, false)

    oInput2.addEventListener('keyup', function () {
        Vue.input2Val = oInput2.value
    }, false)


    console.log(Vue)
}
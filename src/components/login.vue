<template>
    <div class="outbox">
        <div class="seven">
            <div class="container c11">
                <div class="d11">
                    <p><span class="spaan">x</span><span class="spaan">x</span><span class="spaan">x</span><span
                            class="spaan">奶</span><span class="spaan">茶</span><span class="spaan">管</span><span
                            class="spaan">理</span><span class="spaan">系</span><span class="spaan">统</span></p>
                    <input type="text" name="username" placeholder="请输入用户名/邮箱/手机号码">
                    <input type="password" name="passwd" placeholder="请输入密码">
                    <button>登陆</button>
                </div>
            </div>
            <div class="container c12">
                <div class="d12"></div>

            </div>
        </div>
    </div>
    <!-- 本页面参考 http://www.bootstrapmb.com/item/12298/preview -->
</template>

<script>
export default {

}
</script>

<style scoped>
.outbox {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e2e3e7;
    min-width: 720px;
}

.seven {
    width: 60%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: -5px -5px 10px #fcfcfc, 5px 5px 10px #babebc;
}

.container {
    width: 50%;
    height: 100%;
    background: #ebecf0;
}

.c11 {
    display: flex;
    align-items: center;
}

.c11 .d11 {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.c11 .d11 p {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    font-weight: bold;

}

.c11 .d11 .spaan {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 2px;
}

.c11 .d11 input {
    background: #eee;
    padding: 16px;
    margin: 8px 0;
    width: 85%;
    border: 0;
    outline: 0;
    border-radius: 20px;
    box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
}

.c11 .d11 button {
    border-radius: 20px;
    border: 0;
    outline: 0;
    font-size: 12px;
    font-weight: bold;
    padding: 15px 45px;
    margin: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 80ms ease-in;
    box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;

}

.c12 {
    background-color: #ff4b2b;
    display: flex;
    align-items: center;
    justify-content: center;
}

.d12 {
    width: 80%;
    height: 80%;
    background-image: url("../assets/milk-tee.svg");
    /* 图标作者 https://www.iconfont.cn/user/detail?spm=a313x.7781069.0.d214f71f6&uid=4130393&nid=RnbYP3dXUkPG */
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
}
</style>
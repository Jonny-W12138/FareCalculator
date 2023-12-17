<template>
    <div class="gradient-background">
        <h1 style="text-align: center;position: relative;top: 5%;color:white">
            快速算钱小助手</h1>
        <div class="container" style="position: relative;top: 10%;">
            <div class="content">
                <div style="text-align: center;align-items: center;">
                    <h3>输入人员信息</h3>
                    <div v-for="(person, index) in people" :key="index">
                        <van-field v-model="person.name" label="姓名" placeholder="请输入姓名" label-align="center" />
                    </div>
                    <van-button icon="plus" type="primary" @click="addPerson" size="small">添加人员</van-button>
                </div>
            </div>
        </div>

        <div class="container" style="position: relative;top: 15%;">
            <div class="content">
                <div>
                    <h3 style="text-align: center;align-items: center;">输入商品信息</h3>
                    <div v-for="(item, index) in items" :key="index" style="position: relative;top: 15%;">
                        <van-field v-model="item.name" label="商品名称" placeholder="请输入商品名称" label-align="center" />
                        <van-field v-model.number="item.price" label="商品价格" type="number" placeholder="请输入商品价格"
                            label-align="center" />
                        <!--van-field v-model="item.buyer" label="购买人" placeholder="请输入购买人" label-align="center" /-->
                        <label style="position: relative;left: 10%;">
                            购买人:
                            <select v-model="item.buyer">
                                <option v-for="(person, index) in people" :key="index" :value="person.name">
                                    {{ person.name }}
                                </option>
                            </select>
                        </label>
                    </div>
                    <div style="text-align: center;align-items: center;">
                        <van-button icon="plus" type="primary" @click="addItem" size="small"
                            style="position: relative;top: 15%;">添加商品</van-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" style="position: relative;top: 20%;">
            <div class="content">
                <div style="text-align: center;align-items: center;">
                    <h3>输入最终支付价格</h3>
                    <van-field v-model.number="discountedTotal" type="number" label="最终支付价格" placeholder="请输入价格总和" />
                </div>

                <div v-if="totalShares.length > 0">
                    <van-dialog v-model:show="show" title="计算结果">
                        <div v-for="(share, index) in totalShares" :key="index" style="margin-left: 10%;">
                            <p>{{ share.name }} 需要支付的费用为: {{ share.amount }}</p>
                        </div>
                    </van-dialog>

                </div>
                <div style="text-align: center;align-items: center;">
                    <van-button icon="gold-coin-o" type="primary" @click="calculateShare" size="small">计算分摊价格</van-button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { showFailToast } from 'vant';
import { ref } from 'vue';
export default {
    setup() {
        const show = ref(false);
        return { show };
    },
    data() {
        return {
            people: [],
            items: [],
            totalShares: [],
            discountedTotal: 0,
        };
    },
    methods: {
        addPerson() {
            this.people.push({ name: '' });
        },
        addItem() {
            this.items.push({ name: '', price: 0, buyer: '' });
        },
        calculateShare() {
            const originalTotal = this.items.reduce((acc, item) => acc + item.price, 0);

            if (originalTotal === 0) {
                showFailToast('商品总价为零，请输入有效价格');
                return;
            }

            const discountFactor = this.discountedTotal / originalTotal;
            console.log(originalTotal);

            const shares = this.items.reduce((acc, item) => {
                const buyer = item.buyer;
                const price = item.price * discountFactor;
                const existingShareIndex = acc.findIndex(share => share.name === buyer);
                if (existingShareIndex !== -1) {
                    acc[existingShareIndex].amount += price;
                } else {
                    acc.push({ name: buyer, amount: price });
                }
                return acc;
            }, []);

            this.totalShares = shares;
            this.show = true;
        },

    },
};
</script>
  
<style>
/* 全局样式 */
html,
body,
#app {
    height: 100%;
    /* 确保容器撑满整个视口 */
    margin: 0;
}

/* 页面背景渐变样式 */
.gradient-background {
    height: 100%;
    /* 撑满整个视口 */
    background: linear-gradient(to bottom, #3068ba, #6b9ef1);
    overflow: auto;
    /* 使用自定义的颜色 */
    /* 添加其他样式以适应你的页面布局和需求 */
}

/* 容器样式，设置左右边距为 10% */
.container {
    display: flex;
    justify-content: center;
    width: 70%;
    margin: 0 15%;
    overflow: auto;
    /* 左右边距为 (100% - 70%) / 2 */
}

/* 内容样式，圆角矩形白色背景 */
.content {
    background-color: white;
    border-radius: 20px;
    /* 圆角大小，根据需要调整 */
    padding: 20px;
    /* 可根据内容调整内边距 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    /* 可选的阴影效果 */
    /* 添加其他样式以适应你的页面布局和需求 */
}
</style>
  
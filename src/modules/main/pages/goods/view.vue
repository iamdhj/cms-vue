<template>
    <div>
        <div class="cms-main-title">{{ title }}</div>
        <div>
            <Card class="cms-good-item" v-for="(good, index) in goodList" :key="index" :title="good.name">
                <router-link :to="editLink + good.id" slot="extra">
                    <Icon type="edit"></Icon>
                </router-link>
                <img :src="good.img" alt="">
                <div class="price">￥{{ShowPrice(good.price)}}</div>
            </Card>
        </div>
    </div>
</template>

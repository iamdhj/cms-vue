<template>
    <div>
        <div class="cms-main-title">{{ title }}</div>
        <Table :columns="labels" :data="orderListPage" :loading="loading" @on-sort-change="sortChange" stripe></Table>
        <div class="page-ctn">
            <Page :current="page" :total="orderTotal" :page-size="pageSize" @on-change="pageChange" show-elevator></Page>
        </div>
    </div>
</template>


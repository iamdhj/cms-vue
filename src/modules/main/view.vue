<template>
    <Layout class="cms-container">
        <Header>
            <div class="cms-header-menu">
                <a @click="logout">
                    <Icon type="android-exit"></Icon>
                    <span>退出</span>
                </a>
            </div>
        </Header>
        <div>
            <Layout class="cms-layout">
                <Sider class="cms-layout-sider">
                    <Menu ref="navMenu" :active-name="activeMenu" width="auto">
                        <router-link v-for="(link, index) in links" :key="index" :to="link.path">
                            <MenuItem :name="`${index}`">{{link.title}}</MenuItem>
                        </router-link>
                    </Menu>
                </Sider>
                <Layout>
                    <router-view class="cms-main" :title="viewTitle" :paths="paths"></router-view>
                </Layout>
            </Layout>
        </div>
    </Layout>
</template>

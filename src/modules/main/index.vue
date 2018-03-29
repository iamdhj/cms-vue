<template>
    <Layout>
        <Header></Header>
        <div class="self-container">
            <Layout>
                <Sider>
                    <Menu ref="navMenu" :active-name="activeName" width="auto">
                        <router-link v-for="(link, index) in links" :key="index" :to="link.path">
                            <MenuItem :name="`${index}`">{{link.title}}</MenuItem>
                        </router-link>
                    </Menu>
                </Sider>
                <Layout>
                    <router-view></router-view>
                </Layout>
            </Layout>
        </div>
    </Layout>
</template>

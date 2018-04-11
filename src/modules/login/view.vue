<template>
    <div>
        <Form class="cms-login-form" ref="userInfo" :model="userInfo" :rules="rules">
            <FormItem label="帐号" label-for="account" prop="account">
                <Input class="cms-login-input" element-id="account" v-model="userInfo.account" placeholder="帐号"/>
            </FormItem>
            <FormItem label="密码" label-for="password" prop="password">
                <Input class="cms-login-input" type="password" element-id="password" v-model="userInfo.password" placeholder="密码"/>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="login('userInfo')" long>登录</Button>
            </FormItem>
        </Form>
    </div>
</template>

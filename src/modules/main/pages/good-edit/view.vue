<template>
    <div>
        <div class="cms-main-title">{{ title }}</div>
        <Form class="cms-form" ref="goodInfo" :model="goodInfo" :rules="rules">
            <FormItem label="名称" label-for="name" prop="name">
                <Input class="cms-form-input" element-id="name" v-model="goodInfo.name" placeholder="名称"/>
            </FormItem>
            <FormItem label="图片" label-for="image" prop="img">
                <upload-image accept="image/*" v-model="goodInfo.img"/>
            </FormItem>
            <FormItem label="价格" label-for="price" prop="price">
                <Input class="cms-form-input" element-id="price" v-model="goodInfo.price" placeholder="价格"/>
            </FormItem>
            <FormItem label="描述" label-for="desc" prop="desc">
                <Input class="cms-form-input" type="textarea" element-id="desc" v-model="goodInfo.desc" placeholder="描述"/>
            </FormItem>
            <FormItem>
                <Button @click="submit('goodInfo')">确定</Button>
            </FormItem>
        </Form>
    </div>
</template>

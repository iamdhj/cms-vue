<template>
    <label>
        <img :src="dataUrl" alt="">
        <input type="file" :accept="accept" @change="onChange">
    </label>
</template>

<style lang="scss" scoped>
img {
    display: inline-block;
    width: 200px;
    height: 200px;
    border-radius: 5px;
    background: #ccc;
    object-fit: cover;
}
input {
    display: none;
}
</style>

<script>
export default {
    name: 'UploadImage',
    props: {
        value: String,
        accept: String
    },
    data: () => ({
        dataUrl: ''
    }),
    methods: {
        onChange(e) {
            let files = e.target.files

            if (!files || !files[0]) {
                return
            }

            let file = files[0]

            if (1048576 < file.size) {
                this.$log('图片不能大于1M')
            }

            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                if (reader.error) {
                    this.$log('upload-image read error')
                    return
                }
                this.dataUrl = reader.result
                this.$emit('input', this.dataUrl)
            }
        }
    }
}
</script>

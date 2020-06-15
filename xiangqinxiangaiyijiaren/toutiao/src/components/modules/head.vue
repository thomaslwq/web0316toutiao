<template>
  <div class="header">
            <img src="https://s3.pstatp.com/toutiao/static/img/logo.271e845.png" @click='goIndex'>
            <slot></slot>
        </div>
</template>

<script>
export default {
    methods: {
      goIndex(){
        this.$router.push('/')
      }
    },
}
</script>

<style lang='less' scoped>
.header {
            background-color: #fff;
            margin: 0 auto;
            min-width: 1200px;
            box-sizing: border-box;
            padding: 0 140px;
            box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
            display: flex;
            justify-content: space-between;
            height: 65px;
            align-items: center;


            img {
                widows: 107px;
                height: 30px;
                cursor: pointer;
            }

            .searchBox {
                width: 340px;
                font-weight: 100;
                margin: 15px 0;
                display: flex;

                input {
                    width: 100%;
                    height: 40px;
                    border: 1px solid #e8e8e8;
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                    color: #585858;
                    padding: 10px;
                    box-sizing: border-box;
                    background-color: #f5f6f7;
                    outline: none;
                }

                input:hover,
                input:focus {
                    border: 1px solid #428bd9;
                    border-right: 0px;
                }

                .btn {
                    border: none;
                    background-color: #428bd9;
                    color: white;
                    font-weight: 100;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            }
        }
</style>
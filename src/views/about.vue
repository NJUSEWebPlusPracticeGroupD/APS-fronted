<template>
    <div class="background">
        <ParticleEffectButton
                :visible.sync="btnOps.visible"
                :animating.sync="btnOps.animating"
                :options="btnOps"
                class="btn-cls"
        >
            hello eveybody!
        </ParticleEffectButton>
    </div>
</template>

<script>
    import ParticleEffectButton from "vue-particle-effect-buttons"
    export default {
        name: "about",
        components: {
            ParticleEffectButton
        },
        data() {
            return {
                btnOps: {
                    type: "triangle",
                    easing: "easeOutQuart",
                    size: 8,
                    particlesAmountCoefficient: 4,
                    oscillationCoefficient: 2,
                    color: function () {
                        return Math.random() < 0.5 ? "#000000" : "#ffffff";
                    },
                    onComplete: () => {
                        console.log("complete");
                    },
                    onBegin: () => {
                        console.log("begin");
                    },
                    visible: true,
                    animating: false
                },
            }
        },

    }
</script>

<style scoped>
    .background{
        background: linear-gradient(120deg, #baedff, #07a2da);
        margin: 0;
        padding: 0;
        width:100%;
        height:800px;
    }
    .btn-cls{
        margin-top: 350px;
    }

</style>
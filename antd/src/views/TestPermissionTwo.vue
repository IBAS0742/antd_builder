<template>
    <div>
        <div style="width: 500px;height: 350px; margin: 1em;text-align: center;float:left;">
            <HeaderSC silderWidth="80px">
                <div slot="header">
                    HEADER
                </div>
                <div slot="sider">
                    SIDER
                </div>
                <div slot="content" style="background: #faad14;height: 100%;">
                    CONTENT
                </div>
            </HeaderSC>
        </div>
        <div style="width: 500px;height: 350px; margin: 1em;text-align: center;float:left;">
            <SliderHCF silderWidth="80px"
                :logo-style="{
                    background: '#F44336',
                    height: '50px'
                }">
                <div slot="header">
                    HEADER
                </div>
                <div slot="logo">
                    LOGO
                </div>
                <div slot="sider" style="height: 100%;background: rgba(0, 0, 0, 0.65);color: #fff;">
                    SIDER
                </div>
                <div slot="content" style="height: 100%;position: absolute;width: 100%;background: #faad14;">
                    CONTENT
                </div>
                <div slot="footer">
                    FOOTER
                </div>
            </SliderHCF>
        </div>
    </div>
</template>
<script>
    import HeaderSC from "../components/layout/HeaderSC/HeaderSC";
    import SliderHCF from "../components/layout/SliderHCF/SliderHCF";
    export default {
        components: {SliderHCF, HeaderSC}
    }
</script>
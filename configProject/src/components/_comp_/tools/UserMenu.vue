<template>
    <div class="def-user-menu">
        <span class="def-action">
            <a-icon type="question-circle-o"></a-icon>
        </span>
        <a-dropdown>
          <span class="def-action ant-dropdown-link user-dropdown-menu">
            <a-avatar class="avatar" size="small" :src="avatar"/>
            <span>IBAS</span>
          </span>
            <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
                <a-menu-item key="0">
                    <a-icon type="user"/>
                    <span>个人中心</span>
                </a-menu-item>
                <a-menu-item key="1">
                    <a-icon type="setting"/>
                    <span>账户设置</span>
                </a-menu-item>
                <a-menu-item key="2" disabled>
                    <a-icon type="setting"/>
                    <span>测试</span>
                </a-menu-item>
                <a-menu-divider/>
                <a-menu-item key="3">
                    <a-icon type="logout"/>
                    <span>退出登录</span>
                </a-menu-item>
            </a-menu>
        </a-dropdown>
    </div>
</template>

<script>

    export default {
        name: "UserMenu",
        data() {
            return {
                avatar: require('./../../../assets/logo.png')
            }
        }
    }
</script>

<style scoped lang="less">
    .def-user-menu {
        float: right;
        height: 100%;
        .def-action {
            cursor: pointer;
            padding: 0 12px;
            display: inline-block;
            transition: all .3s;
            height: 100%;
            color: rgba(0, 0, 0, 0.65);

            &:hover {
                 background: rgba(0, 0, 0, 0.025);
             }

            .avatar {
                margin: 20px 8px 20px 0;
                color: #1890ff;
                background: hsla(0, 0%, 100%, .85);
                vertical-align: middle;
            }

            .icon {
                font-size: 16px;
                padding: 4px;
            }
        }
    }
    // 外置的样式控制
    .user-dropdown-menu {
        span {
            user-select: none;
        }
    }
    .user-dropdown-menu-wrapper.ant-dropdown-menu {
        padding: 4px 0;

        .ant-dropdown-menu-item {
            width: 160px;
        }

        .ant-dropdown-menu-item > .anticon:first-child,
        .ant-dropdown-menu-item > a > .anticon:first-child,
        .ant-dropdown-menu-submenu-title > .anticon:first-child
        .ant-dropdown-menu-submenu-title > a > .anticon:first-child {
            min-width: 12px;
            margin-right: 8px;
        }

    }
</style>
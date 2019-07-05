import {
    Tooltip,
    Icon
} from 'ant-design-vue'
/**
 * @param h render 函数
 * @param moreTip   \
 * @param tip       /
 * */
export const renderTip = (h,{ moreTip, tip }) => {
    return h('div',{
        slot: 'label',
        style: {
            display: 'inline-block'
        },
    },moreTip ? [
        tip,
        h(Tooltip,{
            prop: {
                placement: 'right'
            },
        },[
           h(Icon,{
               props: {
                   type: 'question-circle'
               },
               style: {
                   padding: '0 5px'
               }
           }),
            h('span',{
                slot: 'title'
            },moreTip)
        ])
    ] : tip);
};

/**
 * <a-tooltip placement="topLeft" >
 <template slot="title">
 <span>prompt text</span>
 </template>
 <a-icon type="question-circle" />
 </a-tooltip>
 * */
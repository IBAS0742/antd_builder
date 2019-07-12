/**
 * options = { style: {} }
 * */
export const LeafletButtonControl = (id,name,event,options) => {
    return new Promise(s => {
        let button = document.createElement('button');
        button.id = id || ('id_' + (parseInt(Math.random() * 10000)));
        button.innerText = name;
        button.style.border = '2px solid rgba(0,0,0,0.2)';
        button.style.fontWeight = 'bold';
        button.style.backgroundClip = 'padding-box';
        button.style.background = 'white';
        button.style.color = 'black';
        if (options) {
            if ('style' in options) {
                for (let i in options.style) {
                    button.style[i] = options.style[i];
                }
            }
        }
        button.onclick = function (e) {
            event(e)
        };
        s(button);
    });
};
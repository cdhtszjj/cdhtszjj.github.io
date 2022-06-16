function changeAttribute(img, reg, attributeName, newPath) {
    const attribute = img.getAttribute(attributeName);
    if (attribute) {
        img.setAttribute(attributeName, attribute.replace(reg, newPath));
    }
}

function changeImgDom(parentClass, theme) {
    const doms = document.getElementsByClassName(parentClass);
    for (let index = 0; index < doms.length; index++) {
        const imgs = doms[index].getElementsByTagName('img');
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].title = 'logo';
            imgs[i].alt = 'logo';
            if (theme === 'dark') {
                const reg = /\/avatar.png/g;
                changeAttribute(imgs[i], reg, 'src', '/avatar_dark.png');
                changeAttribute(imgs[i], reg, 'data-src', '/avatar_dark.png');
                changeAttribute(imgs[i], reg, 'data-srcset', '/avatar_dark.png');
                changeAttribute(imgs[i], reg, 'srcset', '/avatar_dark.png');
            }
            else {
                const reg = /\/avatar_dark.png/g;
                changeAttribute(imgs[i], reg, 'src', '/avatar.png');
                changeAttribute(imgs[i], reg, 'data-src', '/avatar.png');
                changeAttribute(imgs[i], reg, 'data-srcset', '/avatar.png');
                changeAttribute(imgs[i], reg, 'srcset', '/avatar.png');
            }
        }
    }
}

function loadTheme() {
    if (window.localStorage) {
        const theme = localStorage.getItem('theme');
        changeImgDom('home-avatar', theme);
        changeImgDom('home-title', theme);
        changeImgDom('header-title', theme);
    }
}

(function () {
    console.log('欢迎来到 free 笔记');

    const orignalSetItem = localStorage.setItem;
    localStorage.setItem = function (key) {
        var setItemEvent = new Event("setItemEvent");
        setItemEvent.key = key;
        window.dispatchEvent(setItemEvent);
        orignalSetItem.apply(this, arguments);
    };

    window.addEventListener("setItemEvent", function (e) {
        if (e.key == 'theme') {
            setTimeout(() => { loadTheme(); }, 0);
        }
    });

    setTimeout(() => { loadTheme(); }, 0);
})();
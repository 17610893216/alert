

module.exports = {
    $panel: '',
    Alert: function (option) {
        const optionDefault = {
            title: '提示信息', // 头部文案
            content: '内容', // 内容区文案
            showHeader: true, // 是否显示头部
            isConfirm: false,
            showIconClose: true, // 是否显示关闭图标
            effect: 'box-in', // 弹框弹出效果（class名）
            confirmButtonText: '确定', // 确定按钮文案
            confirmCallback: null, // 确定按钮回调函数
            showCancelButton: false, // 是否显示取消按钮
            showConfirmButton: true, // 是否显示确定按钮
            cancelButtonText: '取消', // 取消按钮文案
            cancelCallback: null, // 取消按钮回调函数
            showIcon: false, // 是否显示提示icon
            iconType: 'shopping-cart', // 此处用的是svg,只需传入icon-后的部分
            handleFunc: null, // 处理函数，用于处理页面样式等
            autoClose: true // 点击确定是否立即关闭,
        };

        for (const item in optionDefault) {
            if (!option.hasOwnProperty(item)) {
                option[item] = optionDefault[item];
            }
        }

        let $panel = $('#modal');

        if ($panel.length == 0) {
            $panel = $('<div id="modal" class="modal-box modal"><div class="modal-dialog u-modal-dialog"><div class="modal-header"><span class="modal-title"></span></div><div class="modal-body"><div class="modal-icon venus_iconfont"></div><div class="modal-content"></div></div><div class="modal-footer"><span class="modal-btn u-btn" data-act="confirm">确定</span><span class="modal-btn modal-btn-close u-btn" data-act="hide">取消</span></div><span class="modal-close glyphicon glyphicon-remove icon-close" data-act="close"></span></div><div class="u-cover j-cover"></div></div>');
            $panel.appendTo($('body'));
        }

        let $dialog = $panel.find('.modal-dialog'),
            $header = $panel.find('.modal-header'),
            $title = $panel.find('.modal-title'),
            $content = $panel.find('.modal-content'),
            $btnClose = $panel.find('.modal-btn-close'),
            $btnConfirm = $panel.find('.modal-btn[data-act="confirm"]'),
            $icon = $panel.find('.modal-icon'),
            $iconClose = $panel.find('.icon-close'),
            showHeader = option.showHeader,
            title = option.title,
            content = option.content,
            isConfirm = false,
            confirmButtonText = option.confirmButtonText,
            cancelButtonText = option.cancelButtonText,
            showCancelButton = option.showCancelButton,
            showConfirmButton = option.showConfirmButton,
            confirmCallback = option.confirmCallback,
            cancelCallback = option.cancelCallback,
            effect = option.effect,
            showIcon = option.showIcon,
            iconType = option.iconType,
            showIconClose = option.showIconClose,
            handleFunc = option.handleFunc,
            autoClose = option.autoClose;

        if (!showHeader) {
            $header.hide();
        }

        if (showCancelButton) {
            $btnClose.show().css({ marginLeft: 10, display: 'inline-block' });
        }

        if (!showConfirmButton) {
            $btnConfirm.hide();
        } else {
            $btnConfirm.show();
        }
        if (!showCancelButton) {
            $btnClose.hide();
        } else {
            $btnClose.show();
        }

        if (showIcon) {
            const className = `icon-${iconType}`;
            $icon.show();
            $icon.addClass(className);
        }

        if (!showIconClose) {
            $iconClose.hide();
        }

        if ($.isFunction(handleFunc)) {
            handleFunc();
        }

        function closeFn(e) {
            $('.j-cover').hide();
            $panel.remove();
        }
        function hiddenFn(e) {
            if (isConfirm == false && $.isFunction(cancelCallback)) {
                cancelCallback();
            }
            $('.j-cover').hide();
            $panel.remove();
        }
        function confirmFn(e) {
            isConfirm = true;
            e.stopImmediatePropagation();
            confirmCallback ? confirmCallback() : '';
            if (autoClose) {
                $panel.remove();
                $('.j-cover').hide();
            }
        }

        $panel.on('hidden', hiddenFn);
        $('.j-cover').on('click', hiddenFn);
        $btnClose.off('click').on('click', hiddenFn);
        $panel.find('[data-act="close"]').off('click').one('click', closeFn);
        $panel.find('[data-act="hide"]').off('click').one('click', hiddenFn).text(cancelButtonText);
        $panel.find('[data-act="confirm"]').off('click').one('click', confirmFn).text(confirmButtonText);

        $title.text(title);
        $panel.find('.modal-content').html(content);
        $dialog.css({ animation: `${effect}.3s` });
        exports.$panel = $('.j-cover').hide();
        exports.$panel = $('#modal .j-cover').show();
        return exports.$panel;
    },
    Close: function () {
        $('.j-cover').hide();
        exports.$panel.remove();
    }
};

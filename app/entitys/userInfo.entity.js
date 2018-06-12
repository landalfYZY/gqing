'use strict';
var entity = [
    { label: '_id', require: true, type: String, remark: 'ID' },
    { label: 'telNumber', require: true, type: String, length: 11, remark: '手机号码' },
    { label: 'password',encrypt:'md5', require: true, type: String, length: 20, remark: '密码' },
    { label: 'lpassword',encrypt:'md5', require: true, type: String, length: 20, remark: '确认密码' },
    {
        //ACTIVE:激活,FROZEN:冻结
        label: 'status', require: true, type: String, remark: '状态',
        defaultValue: 'ACTIVE', valueOption: ['ACTIVE', 'FROZEN']
    },
]

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            welcome: "Welcome",
            test: "Test",
            control: "CONTROL",
            new: "Create",
            age: "Age",
            name: "Name",
            account: "Account",
            operate: "Operate",
            modify: "Modify",
            delete: "Delete",
            selectLanguage: "Select Language",
            confirm: "Confirm",
            cancel: "Cancel",
            modifyConfirmMessage: "Are you sure you want to modify this user?",
            addConfirmMessage: "Are you sure you want to add this user?",
            deleteConfirmMessage: "Are you sure you want to delete this user?"
        },
        cn: {
            welcome: "歡迎",
            test: "測試",
            control: "選擇語言",
            new: "新增",
            age: "年龄",
            name: "名字",
            account: "帳號",
            operate: "操作",
            modify: "修改",
            delete: "删除",
            selectLanguage: "選擇語言",
            confirm: "确认",
            cancel: "取消",
            modifyConfirmMessage: "您确实要修改该用户吗?",
            addConfirmMessage: "您确定要添加该用户吗?",
            deleteConfirmMessage: "您确定要删除该用户吗？"
        }
    }
}))
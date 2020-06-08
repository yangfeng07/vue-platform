const getters = {
    userId: state => state.app.userId,
    token: state => state.app.token,
    menuBigData: state => state.app.menuBigData,
    menuData: state => state.app.menuData,
    cnjr: state => state.app.cnjr,
    subTypeList: state => state.app.subTypeList,
    bzText: state => state.app.bzText,
    masterId: state => state.app.masterId,
    stepId: state => state.app.stepId
}

export default getters
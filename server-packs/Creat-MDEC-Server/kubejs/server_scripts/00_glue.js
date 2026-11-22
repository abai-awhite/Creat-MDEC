// [CDR→MDEC 胶水] KubeJS 2101 兼容：CDR 旧版配方移除工具函数
// 旧版 remove_recipes_id / remove_recipes_output 由被剪掉的 util/recipes.js 提供，这里补回来
function remove_recipes_id(e, ids) {
    (Array.isArray(ids) ? ids : [ids]).forEach(id => e.remove({ id: id }))
}
function remove_recipes_output(e, outputs) {
    (Array.isArray(outputs) ? outputs : [outputs]).forEach(o => e.remove({ output: o }))
}

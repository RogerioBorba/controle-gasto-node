const permission = async (req, res, next) => {
    if(!req.usuario.isAdmin)
        return res.status(403).send("Sem permissão para esta operação.")
    next()
}
module.exports=permission 
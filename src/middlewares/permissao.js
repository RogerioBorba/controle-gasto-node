
const permissao = async (req, res, next) => {
    if(!req.usuario.isAdministrador)
        return res.status(403).send("Sem autorização para executar esta operação")
    next()
}
module.exports=permissao

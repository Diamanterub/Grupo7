import UserController from '../controllers/UserController.js'

export default class SignInView {
    constructor() {
        this.userController = new UserController();
        
        this.Form          = document.getElementById('form');          //form
        this.txtUsername   = document.getElementById('txtUsername');   //texto onde está o username
        this.txtEmail      = document.getElementById('txtEmail');      //texto onde está o email
        this.imgPFP        = document.getElementById('imgPFP');        //imagem onde está a pfp
        this.inputUsername = document.getElementById('inputUsername'); //input para mudar o user
        this.inputEmail    = document.getElementById('inputEmail');    //input para mudar o email
        this.inputPassword = document.getElementById('inputPassword'); //input para mudar a pass
        this.inputPassConf = document.getElementById('inputPassConf'); //input para confirmar a pass
        this.inputPFP      = document.getElementById('inputPFP');      //input para mudar a pfp
        this.divUsername   = document.getElementById('divUsername');   //div para alternar o txt e input do user
        this.divEmail      = document.getElementById('divEmail');      //div para alternar o txt e input do email
        this.divPassword   = document.getElementById('divPassword');   //div para input da pass
        this.divPassConf   = document.getElementById('divPassConf');   //div para input da passconf
        this.divPFP        = document.getElementById('divPFP');        //div para input da pfp
        this.divButton     = document.getElementById('divButton');     //div para butões

        const info = this.userController.getInfo();
    }
}
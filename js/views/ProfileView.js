import UserController from '../controllers/UserController.js'

export default class ProfileView {
    constructor() {
        this.userController = new UserController();
        
        this.Form = document.getElementById('form'); //form

        this.imgPFP = document.getElementById('imgPFP'); //imagem onde está a pfp

        this.divUsername = document.getElementById('divUsername'); //div para alternar o txt e input do user
        this.divEmail    = document.getElementById('divEmail');    //div para alternar o txt e input do email
        this.divPassword = document.getElementById('divPassword'); //div para input da pass
        this.divPassConf = document.getElementById('divPassConf'); //div para input da passconf
        this.divPFP      = document.getElementById('divPFP');      //div para input da pfp
        this.divButton   = document.getElementById('divButton');   //div para botões

        this.buildProfile();
    }

    buildProfile() {
        this.info = this.userController.userModel.getAll()[this.getId()];

        this.imgPFP.src            = this.info.pfp;
        this.divUsername.innerHTML = `<h1>${this.info.username}</h1>`;
        this.divEmail.innerHTML    = `<p>${this.info.email}</p>`;
        this.divPassword.innerHTML = ``;
        this.divPassConf.innerHTML = ``;
        this.divPFP.innerHTML      = ``;
        this.divButton.innerHTML   = `<input type="button" value="EDIT" id="btnEdit">`;
        document.getElementById('btnEdit').addEventListener('click', event => {this.buildForm()});
    }

    buildForm() {
        this.divUsername.innerHTML = `<input type="text" value="${this.info.username}" id="inputUsername" placeholder="Username">`;
        this.divEmail.innerHTML    = `<input type="text" value="${this.info.email}" id="inputEmail" placeholder="Email">`;
        this.divPassword.innerHTML = `<input type="password" id="inputPassword" placeholder="New Password">`;
        this.divPassConf.innerHTML = `<input type="password" id="inputPassConf" placeholder="Confirm Password">`;
        this.divPFP.innerHTML      = `<input type="text" value="${this.info.pfp}" id="inputPFP" placeholder="Profile Picture URL">`;
        this.divButton.innerHTML   = `<input type="button" value="SUBMIT" id="btnSubmit">`;

        this.inputUsername = document.getElementById('inputUsername'); //input para mudar o user
        this.inputEmail    = document.getElementById('inputEmail');    //input para mudar o email
        this.inputPassword = document.getElementById('inputPassword'); //input para mudar a pass
        this.inputPassConf = document.getElementById('inputPassConf'); //input para confirmar a pass
        this.inputPFP      = document.getElementById('inputPFP');      //input para mudar a pfp

        document.getElementById('btnSubmit').addEventListener('click', event => { this.sendEdit() ? this.buildProfile() : {} ; });
    }

    sendEdit() {
        return this.userController.editInfo(this.inputUsername.value, this.inputEmail.value, this.inputPassword.value, this.inputPassConf.value, this.inputPFP.value);
    }
}
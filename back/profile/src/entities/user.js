class User { 
    constructor(email, password, name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
    getEmail(){
        return this.email;
    }
};


export default User;


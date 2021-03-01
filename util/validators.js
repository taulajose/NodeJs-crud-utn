module.exports={
    isGoodPassword:(value)=>{
        const pass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
        return pass.test(value);
    },
    emailValidate:(input)=>{
        const email = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return email.test(input);
    }

}
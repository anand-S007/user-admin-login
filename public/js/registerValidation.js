const nameId = document.getElementById('nameField');
const emailId = document.getElementById('emailField');
const mobileId = document.getElementById('mobileField');
const passwordId = document.getElementById('passwordField');
const error1 = document.getElementById('error1');
const error2 = document.getElementById('error2');
const error3 = document.getElementById('error3');
const error4 = document.getElementById('error4');
const registerform = document.getElementById('registerForm');

function emailValidate(){
    console.log('hehello')
    const emailvalue = emailId.value 
    const emailpattern =  /^([a-zA-Z0-9._-]+)@([a-zA-Z.-]+).([a-zA-z]{2,4})$/ 
    if(!emailpattern.test(emailvalue)){
        error2.style.display = 'block'
        error2.innerHTML = 'Invalid Format!!!'
    }else{
        error2.style.display = "none"
        error2.innerHTML = ""
    }
}

function passwordValidate(){
    const passwordvalue = passwordId.value
    const alpha = /[a-zA-Z]/
    const digit = /\d/
    if(passwordvalue.length < 8){
        error4.style.display = "block"
        error4.innerHTML = "Must have atleast 8 characters"
    }
    else if(!alpha.test(passwordvalue) || !digit.test(passwordvalue) )
    {
        error4.style.display = "block"
        error4.innerHTML = "Should contain Numbers and Alphabets!!"
    }
    else{

        error4.style.display = "none"
        error4.innerHTML = ""
    }
}

function nameValidate(){
    const nameValue = nameId.value
    if(nameValue.trim() ===''){
        error1.style.display = "block"
        error1.innerHTML = "Please Enter a valid Name."
    }
    else{
        error1.style.display = "none"
        error1.innerHTML = ""
    }
}

function mobileValidate(){
    const mobilevalue = mobileId.value
    const digit = /\d/
    if(mobilevalue.trim()===""){
        error3.style.display = 'block'
        error3.innerHTML = 'Please enter a valid mobile number'
    }else if(mobilevalue < 10 || mobilevalue >13){
        error3.style.display = 'block'
        error3.innerHTML = 'Enter atleast 10 digits'
    }else if(!digit.test(mobilevalue)){
        error3.style.display = 'block'
        error3.innerHTML = 'Enter only digit values'
    }
    else{
        error3.style.display = 'none'
        error3.innerHTML = ''
    }
}

nameId.addEventListener('blur',nameValidate)
emailId.addEventListener('blur',emailValidate);
passwordId.addEventListener('blur',passwordValidate);
mobileId.addEventListener('blur',mobileValidate)

registerform.addEventListener('submit',function(e){
    emailValidate()
    nameValidate()
    mobileValidate()
    passwordValidate()
    
    if(error2.innerHTML || error4.innerHTML || error1.innerHTML || error3.innerHTML )
    {
        e.preventDefault()
    }
})
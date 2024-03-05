const emailid = document.getElementById('emailField');
const passwordid = document.getElementById('passwordField');
const error1 = document.getElementById('error1');
const error2 = document.getElementById('error2');
const logform = document.getElementById('logform')

function emailValidate(){
    const emailValue = emailid.value
    const emaiPattern = /^([a-zA-Z0-9._-]+)@([a-zA-Z.-]+).([a-zA-z]{2,4})$/ 
    if(!emaiPattern.test(emailValue)){
        error1.style.display = 'block'
        error1.innerHTML = 'Invalid email format!!'
    }else{
        error1.style.display = 'none'
        error1.innerHTML = ''
    }
}

function passwordValidate(){
    const passValue = passwordid.value
    const alpha = /[a-zA-Z]/
    const digit = /\d/

    if(passValue.length <8){
        error2.style.display = 'block'
        error2.innerHTML = 'Password must contain atleast 8 characters'
    }else if(!alpha.test(passValue)|| !digit.test(passValue)){
        error2.style.display = 'block'
        error2.innerHTML = 'Password must contain chars and nums'
    }else{
        error2.style.display = "none"
        error2.innerHTML = ''
    }
}

emailid.addEventListener('blur',emailValidate)
emailid.addEventListener('blur',passwordValidate)

logform.addEventListener('submit',(e)=>{
    emailValidate()
    passwordValidate()
    if(error1.innerHTML|| error2.innerHTML){
        e.preventDefault()
    }
})

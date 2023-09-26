import emailjs from '@emailjs/browser';

export const sendThisMail = (userData : any) => {
    var templateParams = {
        user_name: userData.userName,
        user_email: userData.email,
        user_password: userData.password
    };
    console.log(templateParams)
    emailjs.send('service_ebqx6vr', 'template_blgchp8', templateParams, 'p9vHFTrfHp5W4igrO')
        .then(function (response) {
            //console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });
}
const nodemailer = require('nodemailer');

// Encapsulamos el envío del correo en una función
function enviarCorreo(asunto, texto) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'joaquingusman77@gmail.com', // Tu dirección de correo de Gmail
            pass: '' // Tu contraseña o contraseña de aplicación de Gmail
        }
    });

    let mailOptions = {
        from: 'tu_usuario@gmail.com',
        to: 'destinatario@example.com', // Cambia esto por el correo del destinatario real
        subject: asunto,
        text: texto
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
}

// Aquí llamamos a la función con los datos del correo
enviarCorreo('Asunto del correo', 'Texto del correo');
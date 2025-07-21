import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.titan.email',
  port: 587,
  secure: false,
  auth: {
    user: 'no-reply@sarahmartins.com.br',
    pass: 'noreply@2025',
  },
});

export async function sendPasswordResetEmail(email: string, link: string) {
  const htmlTemplate = `
      <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Redefinição de Senha</title>
    <style>
      body {
        margin: 0; padding: 30px; background-color: #171923; font-family: Arial, sans-serif; color: #e2e8f0;
      }
      .container {
        max-width: 600px; margin: 40px auto; background: #2d3748; border-radius: 12px; padding: 30px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        border: 1px solid #4c51bf;
      }
      h1 {
        color: #fff; font-weight: 700; font-size: 28px; margin-bottom: 20px;
      }
      p {
        font-size: 16px; line-height: 1.5; color: #cbd5e0; margin-bottom: 30px;
      }
      a.button {
        display: inline-block; padding: 12px 24px; background-color: #5a67d8; color: white;
        border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px;
        box-shadow: 0 4px 10px rgba(90, 103, 216, 0.5);
        transition: background-color 0.3s ease;
      }
      a.button:hover {
        background-color: #434190;
      }
      .footer {
        margin-top: 40px; font-size: 12px; color: #718096; text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container" role="main">
      <h1>Redefinição de Senha Solicitada</h1>
      <br>
        Recebemos uma solicitação para redefinir a senha da sua conta associada a este e-mail. </br> </br>  Clique no botão abaixo para escolher uma nova senha:
      </p>
      <p style="text-align:center;">
        <a href="${link}" class="button" target="_blank" rel="noopener noreferrer">
          Redefinir Minha Senha
        </a>
      </p>
      <p>
        Se você não solicitou essa alteração, ignore este e-mail. O link expira em 15 minutos para sua segurança.
      </p>
      <div class="footer">
        <p>Atenciosamente,<br />Equipe Sarah Martins</p>
      </div>
    </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: '"Sarah Martins" <no-reply@sarahmartins.com.br>',
    to: email,
    subject: 'Redefinir senha',
    html: htmlTemplate,
  });
}

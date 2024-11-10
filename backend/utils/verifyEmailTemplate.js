const verifyEmailTemplate = ({ name, url }) => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #333; text-align: center;">Welcome to QuickCart, ${name}!</h2>
        <p>Thank you for joining us at QuickCart! We’re excited to have you on board and can’t wait for you to experience everything we have to offer.</p>
        
        <p>To get started, please confirm your email address by clicking the button below:</p>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="${url}" style="background-color: #FF8C00; color: #FFF; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Verify Email
          </a>
        </div>
        
        <p style="margin-top: 20px;">If you didn’t create an account with QuickCart, you can safely ignore this email.</p>
        
        <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">
          QuickCart Inc., 123 Commerce St., City, Country<br>
          © ${new Date().getFullYear()} QuickCart. All rights reserved.
        </p>
      </div>
    `;
};

module.exports = verifyEmailTemplate;

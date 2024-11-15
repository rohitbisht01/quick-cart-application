const forgotPasswordTemplate = ({ name, otp }) => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #333; text-align: center;">Hello, ${name}!</h2>
        <p>We received a request to reset your password. To proceed, please use the following OTP code:</p>
        
        <div style="background-color: #FFEB3B; font-size: 24px; padding: 20px; text-align: center; font-weight: 800; border-radius: 5px; margin-top: 20px;">
          ${otp}
        </div>
        
        <p style="margin-top: 20px;">This OTP is valid for 1 hour. Enter the code on the <strong>QuickCart</strong> website to reset your password.</p>
        
        <p style="margin-top: 30px;">If you didn't request a password reset, you can ignore this email.</p>
        
        <p style="margin-top: 30px;">Thanks,</p>
        <p><strong>QuickCart</strong></p>
        
        <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">
          QuickCart Inc., 123 Commerce St., City, Country<br>
          © ${new Date().getFullYear()} QuickCart. All rights reserved.
        </p>
      </div>
    `;
};

module.exports = forgotPasswordTemplate;

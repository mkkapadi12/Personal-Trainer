const adminWelcomeTemplate = (name) => `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
  <h2>Welcome to Personal Trainer App Admin Portal!</h2>
  <p>Hi ${name || 'Admin'},</p>
  <p>Your admin account has been successfully created. You now have full access to the Personal Trainer App dashboard and management tools.</p>
  <p>Best regards,<br>The Personal Trainer App Team</p>
</div>
`;

const userWelcomeTemplate = (firstName) => `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
  <h2>Welcome to Personal Trainer App!</h2>
  <p>Hi ${firstName || 'User'},</p>
  <p>Thank you for registering. We are thrilled to have you on board!</p>
  <p>Enjoy exploring our products and services.</p>
  <p>Best regards,<br>The Personal Trainer App Team</p>
</div>
`;

const userDeletedTemplate = (firstName) => `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
  <h2>Account Removed</h2>
  <p>Hi ${firstName || 'User'},</p>
  <p>This email is to inform you that your account on <b>Personal Trainer App</b> has been removed by an administrator.</p>
  <p>If you believe this is a mistake or have any questions, please contact our support team.</p>
  <p>Best regards,<br>The Personal Trainer App Team</p>
</div>
`;

module.exports = {
  adminWelcomeTemplate,
  userWelcomeTemplate,
  userDeletedTemplate,
};

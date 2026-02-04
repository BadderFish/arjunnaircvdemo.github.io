# EmailJS Setup Guide

This guide will help you set up EmailJS to enable direct email sending from your portfolio contact form.

## What is EmailJS?

EmailJS allows you to send emails directly from client-side JavaScript without a backend server. It's free for up to 200 emails/month.

---

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (top right)
3. Create account with your email (or use Google sign-in)
4. Verify your email address

---

## Step 2: Add Email Service

1. After logging in, go to **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Choose **Gmail** (or your preferred email provider)
4. Click **"Connect Account"**
5. Follow the OAuth flow to connect your Gmail account
6. Once connected, you'll see a **Service ID** (e.g., `service_abc123`)
7. **Copy this Service ID** - you'll need it later

---

## Step 3: Create Email Template

1. Go to **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Set up your template:

### Template Settings:
- **Template Name**: Portfolio Contact Form (or any name)
- **Template ID**: Will be auto-generated (e.g., `template_xyz789`)

### Email Content Template:

**Subject Line:**
```
Portfolio E-Mail from {{from_name}}
```

**Email Body:**
```
You have received a new message from your portfolio website.

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Click **"Save"** in the top right
5. **Copy the Template ID** - you'll need it later

---

## Step 4: Get Your Public Key

1. Click on your **profile/account name** in the top right
2. Go to **"Account"** or **"API Keys"**
3. Find your **Public Key** (looks like: `AbCd123EfGh456...`)
4. **Copy this Public Key** - you'll need it later

---

## Step 5: Configure Your Local Environment

1. In your project's `/app` folder, create a file named `.env`:

```bash
cd app
```

2. Create `.env` file with this content:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. **Replace the placeholder values** with the IDs you copied:
   - `your_service_id_here` → Your Service ID from Step 2
   - `your_template_id_here` → Your Template ID from Step 3
   - `your_public_key_here` → Your Public Key from Step 4

### Example `.env` file:
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=AbCd123EfGh456IjKl789MnOp
```

---

## Step 6: Test Locally

1. **Restart your dev server** (important - .env changes require restart):
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. Open `http://localhost:5173/arjunnair-portfolio/` (or whatever port it shows)

3. Scroll to the contact form at the bottom

4. Fill out all fields and click **"Send Message"**

5. Check for:
   - Green success message
   - Email arrives in your inbox (the Gmail you connected)

---

## Step 7: Deploy to Production

When deploying to GitHub Pages:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add each of these secrets:
   - Name: `VITE_EMAILJS_SERVICE_ID` → Value: (your service ID)
   - Name: `VITE_EMAILJS_TEMPLATE_ID` → Value: (your template ID)
   - Name: `VITE_EMAILJS_PUBLIC_KEY` → Value: (your public key)

5. Update the GitHub Actions workflow to include env vars (already configured in `.github/workflows/deploy.yml` if needed)

---

## Troubleshooting

### "EmailJS configuration is missing" error
- Make sure `.env` file exists in `/app` folder
- Check that variable names start with `VITE_`
- Restart dev server after creating/editing `.env`

### Email not arriving
- Check EmailJS dashboard for delivery status
- Verify template variables match: `{{from_name}}`, `{{from_email}}`, `{{message}}`
- Check spam folder
- Verify you're under 200 emails/month limit (free tier)

### Success message but no email
- Log in to EmailJS dashboard
- Go to **"Email Log"** to see delivery status
- Check if email service is still connected

---

## Free Tier Limits

EmailJS free tier includes:
- **200 emails per month**
- **2 email templates**
- **1 email service**

This is more than enough for a portfolio site. If you exceed limits, you'll get a notification.

---

## Security Notes

- ✅ `.env` is in `.gitignore` - your keys won't be committed
- ✅ Public key is safe to expose (it's meant for client-side use)
- ✅ EmailJS has rate limiting to prevent abuse
- ⚠️ Never commit actual keys to Git - always use environment variables

---

## Alternative: Web3Forms (If You Prefer)

If you prefer not to use EmailJS, **Web3Forms** is another option:
- Also free
- No account needed initially
- Just need an API key
- Similar setup process

Let me know if you want to switch to Web3Forms instead!

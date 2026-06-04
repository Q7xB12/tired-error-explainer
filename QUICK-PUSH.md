# 🚀 Quick Push to GitHub - Execute These Commands

Copy and paste these commands one by one. Replace `YOUR_NAME` and `YOUR_EMAIL` with your info.

## Step 1: Configure Git (First Time Only)

```bash
# Set your name (this will appear on commits)
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"
```

## Step 2: Create Initial Commit

```bash
# Create commit
git commit -m "feat: initial commit with comprehensive improvements

- 31 rules covering Python, Node, TypeScript, React, Next.js, Vite
- React rules: hooks, hydration, keys, re-renders, unmounted updates
- Next.js rules: SSR, App Router, Server Components, metadata, images
- Vite rules: import resolution, exports, ports, modules, sourcemaps
- ESLint and Prettier configuration for code quality
- GitHub Actions CI/CD pipeline
- Comprehensive documentation and contribution guide
- MIT License"
```

## Step 3: Create GitHub Repository

1. Go to: **https://github.com/new**
2. Repository name: **tired-error-explainer**
3. Description: **A practical, rule-based CLI that turns ugly developer errors into calm explanations**
4. Choose: **Public**
5. **DO NOT** check any boxes (no README, no .gitignore, no license)
6. Click: **Create repository**

## Step 4: Connect and Push

```bash
# Add your GitHub repository (replace YOURUSERNAME)
git remote add origin https://github.com/YOURUSERNAME/tired-error-explainer.git

# Push to GitHub
git push -u origin main
```

**If it asks for authentication:**
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your password!)
  - Create token here: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Select scope: `repo`
  - Copy the token and paste it as password

## Step 5: Verify

Visit: `https://github.com/YOURUSERNAME/tired-error-explainer`

You should see all your files! 🎉

## Step 6: Update Repository URLs

After pushing, replace `yourusername` with your actual GitHub username in:
- `README-GITHUB.md`
- `package.json`
- `package-enhanced.json`

```bash
# After editing, commit the changes
git add .
git commit -m "docs: update repository URLs"
git push
```

## Step 7: Set Up Repository (On GitHub)

1. **Add Description** (top right, click ⚙️):
   - Description: "A practical, rule-based CLI that turns ugly developer errors into calm explanations"
   - Topics: `cli`, `errors`, `debugging`, `developer-tools`, `nodejs`, `react`, `nextjs`, `vite`

2. **Enable Features** (Settings → General):
   - ✅ Issues
   - ✅ Discussions

3. **Use README-GITHUB.md as main README**:
   ```bash
   # In your local repo
   mv README.md README-ORIGINAL.md
   mv README-GITHUB.md README.md
   git add .
   git commit -m "docs: use comprehensive README for GitHub"
   git push
   ```

## That's It! 🎉

Your project is now on GitHub and ready for:
- Community contributions
- npm publishing
- CI/CD automation
- GitHub stars ⭐

---

## Quick Commands Summary

```bash
# 1. Configure git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 2. Commit
git commit -m "feat: initial commit with comprehensive improvements..."

# 3. Add remote (create repo on GitHub first!)
git remote add origin https://github.com/YOURUSERNAME/tired-error-explainer.git

# 4. Push
git push -u origin main

# Done! Visit GitHub to see your repo
```

## Troubleshooting

### "Author identity unknown"
→ Run the git config commands from Step 1

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOURUSERNAME/tired-error-explainer.git
```

### "Authentication failed"
→ Use a Personal Access Token instead of your password
→ Create at: https://github.com/settings/tokens

### "Permission denied"
→ Make sure your token has `repo` scope
→ Try HTTPS URL instead of SSH

---

**Need more details?** Read `PUSH-TO-GITHUB.md` for the full guide.

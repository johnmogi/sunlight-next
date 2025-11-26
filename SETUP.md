# Setup Guide - SunLight Next.js

## ✅ What's Already Done

1. ✅ Next.js 14 project created
2. ✅ Tailwind CSS + shadcn/ui installed
3. ✅ Prisma 6 with SQLite configured
4. ✅ Database created (`prisma/dev.db`)
5. ✅ All components built
6. ✅ Build successful

## 📸 Next: Copy Your Images

### From Old Project → New Project

Copy these 4 hero images:

bash
# From: SunLight/images2/newconcept/
# To: sunlight-nextjs/public/images/hero/

cp "../SunLight/images2/newconcept/Professional_product_photography_showing_complete_Sunlight_Ta_248c090a-1c66-4314-af24-c42e4cbe4a2c_3.jpg" "public/images/hero/"

cp "../SunLight/images2/newconcept/Professional_product_photography_showing_complete_Sunlight_Ta_dab0b734-af2d-4d1c-83fe-70f39c7759f0_0.jpg" "public/images/hero/"

cp "../SunLight/images2/newconcept/Lifestyle_product_photography_showing_hands_interacting_with__1749cf23-e461-4e12-b6bd-7b8b13fdc29e_3.jpg" "public/images/hero/"

cp "../SunLight/images2/newconcept/httpss.mj.run0IQrGhxpiSk_httpss.mj.rung4W2tiBad54_Professiona_61a0086b-6914-459c-b962-717197bcb3d8_2.jpg" "public/images/hero/"


Or manually copy from Windows Explorer:
- Source: `C:\Users\USUARIO\Documents\LOCAL\PROJECTS\SunLight\images2\newconcept\`
- Destination: `C:\Users\USUARIO\Documents\LOCAL\PROJECTS\sunlight-nextjs\public\images\hero\`

### For Card Images (later)

Copy all tarot card images:

bash
# From: SunLight/images2/updatedCards/
# To: sunlight-nextjs/public/images/cards/

cp -r "../SunLight/images2/updatedCards/"* "public/images/cards/"


## 🚀 Run Development Server

bash
npm run dev


Open: http://localhost:3000

You should see:
- ✅ Animated hero slider (4 images rotating)
- ✅ "Join the Journey" button
- ✅ Dark/Light mode toggle (top right)
- ✅ Language switcher (globe icon)
- ✅ Mobile menu (hamburger on mobile)
- ✅ Horizontal reveal join form (when you click CTA button)

## 🧪 Test the Join Form

1. Click "Join the Journey" button
2. Form slides down horizontally
3. Fill name + email
4. Click "Join Waitlist"
5. Data saved to `prisma/dev.db`

View database:
bash
npx prisma studio


## 🌍 Test Languages

Visit:
- http://localhost:3000/en (English)
- http://localhost:3000/he (Hebrew - RTL layout!)
- http://localhost:3000/es (Spanish)
- http://localhost:3000/fr (French)
- http://localhost:3000/ar (Arabic - RTL)

## 🌙 Test Dark Mode

Click sun/moon icon in header to toggle.

## 📱 Test Mobile

1. Open DevTools (F12)
2. Click device toggle
3. Select iPhone/iPad
4. Check hamburger menu works
5. Check form is responsive

## 🚢 Deploy to Vercel

bash
# Initialize git (if not already)
git init
git add .
git commit -m "feat: SunLight Next.js v1 - Hero + Join Form"

# Push to GitHub
git remote add origin <your-repo-url>
git push -u origin main


Then:
1. Go to [vercel.com](https://vercel.com)
2. Import repository
3. Deploy (no environment variables needed for SQLite!)

**For production MySQL:**
1. Set `DATABASE_URL` in Vercel environment variables
2. Update `prisma/schema.prisma` datasource to `mysql`
3. Run `npx prisma generate` and redeploy

## 📦 Project Status

### ✅ Section 1 Complete
- Header with navigation
- Hero CTA slider (parallax, auto-rotate)
- Join form (horizontal reveal)
- Dark/Light mode
- Multi-language (5 languages)
- Mobile responsive
- Prisma + SQLite database
- API endpoint for subscriptions

### 🚧 Next Sections (To Build)
- About section
- Gallery with card filtering
- Daily Spread feature
- Complete Deck view
- Card detail modals
- Comments system
- Voting system
- Behind the Scenes

## 🐛 Troubleshooting

### Images not showing
- Check images are in `public/images/hero/`
- Filenames must match exactly
- Try hard refresh (Ctrl+Shift+R)

### Build errors
bash
# Clear cache
rm -rf .next
npm run build


### Database errors
bash
# Reset database
rm prisma/dev.db
npx prisma db push


## 📊 Size Info

- **Project size**: ~60MB (node_modules)
- **Build size**: ~15MB (.next folder)
- **Image size**: 500MB (when you copy them)
- **Total deployment**: ~515MB

✅ **Vercel limit**: 250MB for functions, unlimited for static files
✅ **Your images**: Static files, won't count toward function limit
✅ **You're good to deploy!**

---

Ready to rock! 🚀

# 📝 Panduan Setup CMS Dashboard - Blog Bagas

## 🎯 Overview

Dashboard CMS ini menggunakan **Decap CMS** (formerly Netlify CMS) yang memungkinkan Anda mengelola konten blog tanpa perlu edit file markdown secara manual.

### ✨ Fitur:
- ✅ Edit blog posts via web UI
- ✅ Upload images untuk hero image
- ✅ Markdown editor dengan preview
- ✅ Auto-commit ke GitHub
- ✅ Draft & publish workflow
- ✅ Akses dari mana saja (browser)

---

## 🚀 Setup Awal (One-Time Setup)

### Step 1: Setup GitHub OAuth Application

Untuk bisa login ke CMS dashboard, Anda perlu membuat OAuth App di GitHub:

1. **Buka GitHub Settings:**
   - Go to: https://github.com/settings/developers
   - Atau: GitHub → Settings → Developer settings → OAuth Apps

2. **Create New OAuth App:**
   - Click "New OAuth App"
   - Isi form berikut:

   ```
   Application name: Blog Bagas CMS
   Homepage URL: https://blog-bagas.web.app (atau URL production Anda)
   Application description: CMS Dashboard untuk Blog Bagas
   Authorization callback URL: https://api.netlify.com/auth/done
   ```

3. **Generate Client Secret:**
   - Setelah dibuat, click "Generate a new client secret"
   - **SIMPAN** Client ID dan Client Secret (Anda akan butuh ini)

### Step 2: Deploy ke Netlify (untuk OAuth Backend)

Decap CMS butuh OAuth backend. Cara termudah adalah deploy ke Netlify:

**Option A: Netlify Hosting (Recommended)**

1. **Push code ke GitHub** (jika belum):
   ```bash
   git add .
   git commit -m "Add Decap CMS dashboard"
   git push origin main
   ```

2. **Import ke Netlify:**
   - Login ke https://netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub → pilih repo "Blog_Bagas"
   
3. **Configure Build Settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Add Environment Variables** (di Netlify dashboard):
   - Go to: Site settings → Environment variables
   - Add:
     - `GITHUB_CLIENT_ID` = (Client ID dari Step 1)
     - `GITHUB_CLIENT_SECRET` = (Client Secret dari Step 1)

5. **Enable Netlify Identity & Git Gateway:**
   - Go to: Site settings → Identity → Enable Identity
   - Settings → Services → Git Gateway → Enable Git Gateway

**Option B: Firebase Hosting (Current)**

Jika tetap pakai Firebase, Anda perlu setup OAuth proxy sendiri atau gunakan Netlify hanya untuk OAuth:

1. Deploy ke Netlify (hanya untuk `/admin` path)
2. Atau gunakan `git-gateway` alternative
3. Setup akan lebih kompleks - **Recommended: pakai Option A**

---

## 📖 Cara Menggunakan CMS Dashboard

### 1. **Akses Dashboard**

Setelah deploy, akses dashboard di:
```
https://your-site-url.netlify.app/admin
```

Atau jika local development:
```
http://localhost:4321/admin
```

### 2. **Login**

- Click "Login with GitHub"
- Authorize aplikasi
- Anda akan diarahkan ke dashboard

### 3. **Membuat Blog Post Baru**

1. **Di dashboard, click "Blog Posts"**
2. **Click "New Blog Post"**
3. **Isi form:**
   - **Title**: Judul artikel (wajib)
   - **Description**: Deskripsi singkat (wajib)
   - **Publish Date**: Tanggal publikasi (wajib)
   - **Updated Date**: Tanggal update (opsional)
   - **Hero Image**: Upload gambar utama (opsional)
   - **Body**: Konten artikel dalam Markdown (wajib)

4. **Save Draft atau Publish:**
   - **Save Draft**: Simpan sebagai draft (belum publish)
   - **Set to Review**: Tandai ready untuk review
   - **Publish**: Publish langsung ke blog

5. **Workflow:**
   ```
   Draft → In Review → Ready → Publish
   ```

### 4. **Edit Blog Post Existing**

1. Click "Blog Posts" di sidebar
2. Pilih post yang ingin di-edit
3. Edit content
4. Click "Save" atau "Publish"

### 5. **Delete Blog Post**

1. Buka post yang ingin dihapus
2. Click tombol "Delete entry" (icon trash)
3. Confirm delete

### 6. **Upload Images**

- Click field "Hero Image"
- Drag & drop atau click "Choose an image"
- Image akan di-upload ke `src/assets/`
- Path otomatis generate di frontmatter

---

## 🛠️ Local Development

### Test CMS di Local (Opsional)

Jika ingin test CMS tanpa GitHub OAuth, gunakan local backend:

1. **Edit `public/admin/config.yml`**, uncomment line:
   ```yaml
   local_backend: true
   ```

2. **Install Decap CMS Proxy:**
   ```bash
   npm install -g decap-server
   ```

3. **Run proxy server:**
   ```bash
   npx decap-server
   ```

4. **Di terminal lain, run Astro dev server:**
   ```bash
   npm run dev
   ```

5. **Akses:**
   ```
   http://localhost:4321/admin
   ```

6. **Login dengan credentials apa saja** (local mode tidak validasi)

**⚠️ PENTING:** Jangan lupa comment kembali `local_backend: true` sebelum push ke production!

---

## 📁 File Structure CMS

```
Blog_Bagas/
├── public/
│   └── admin/
│       ├── index.html          # CMS dashboard UI
│       └── config.yml          # CMS configuration
│
├── src/
│   ├── assets/                 # Media uploads disimpan di sini
│   └── content/
│       └── blog/               # Blog posts (markdown files)
│           ├── Bank-App.md
│           ├── CRUD-Library-Book.md
│           └── ...
│
└── CMS_SETUP.md               # File ini
```

---

## 🔧 Troubleshooting

### Error: "Login Failed"

**Penyebab:**
- GitHub OAuth tidak dikonfigurasi dengan benar
- Client ID/Secret salah

**Solusi:**
1. Cek GitHub OAuth App settings
2. Pastikan callback URL: `https://api.netlify.com/auth/done`
3. Cek environment variables di Netlify

---

### Error: "Config Error"

**Penyebab:**
- Syntax error di `config.yml`
- Field tidak match dengan schema

**Solusi:**
1. Validate YAML syntax di https://www.yamllint.com/
2. Cek `backend.repo` sudah benar: `username/repo-name`

---

### Error: "Failed to Load Entries"

**Penyebab:**
- Git Gateway tidak enabled
- Permission issue

**Solusi:**
1. Enable Git Gateway di Netlify: Settings → Services → Git Gateway
2. Cek repo permissions (harus public atau Anda harus punya write access)

---

### Image Upload Gagal

**Penyebab:**
- Folder `src/assets` tidak ada
- Permission issue

**Solusi:**
1. Pastikan folder `src/assets` exist (sudah ada di project Anda)
2. Commit & push folder ke Git jika belum

---

### Changes tidak muncul di website

**Penyebab:**
- Build belum selesai
- Deploy gagal

**Solusi:**
1. Cek Netlify deploy log: Deploys → Check status
2. Tunggu 2-5 menit untuk build selesai
3. Clear browser cache: Ctrl+Shift+R

---

## 🎨 Customization (Opsional)

### Mengubah Tema Dashboard

Edit `public/admin/index.html`, tambahkan custom CSS:

```html
<style>
  :root {
    --primary: #your-color;
    --secondary: #your-color;
  }
</style>
```

### Menambah Collection Baru

Edit `public/admin/config.yml`, tambahkan collection:

```yaml
collections:
  - name: "pages"
    label: "Pages"
    folder: "src/pages"
    # ... dst
```

### Menambah Field Baru

Edit fields di `config.yml`:

```yaml
fields:
  - label: "Tags"
    name: "tags"
    widget: "list"
```

**⚠️ IMPORTANT:** Jika tambah field, update juga schema di `src/content.config.ts`

---

## 📊 Workflow Recommended

### Daily Workflow:
```
1. Buka /admin di browser
2. Login (jika belum)
3. Create/Edit post
4. Save as Draft
5. Preview
6. Publish when ready
7. Wait 2-5 min
8. Verify di website
```

### Best Practices:
- ✅ Gunakan **Draft mode** untuk work in progress
- ✅ **Preview** sebelum publish
- ✅ Gunakan **descriptive titles** dan slugs
- ✅ **Compress images** sebelum upload (untuk performance)
- ✅ Write in **Markdown** untuk konsistensi

---

## 🔐 Security Notes

### Yang perlu dijaga:
- ❗ **Client Secret** GitHub OAuth (jangan commit ke Git)
- ❗ **Netlify account** access
- ❗ **GitHub account** access (karena auto-commit atas nama Anda)

### Yang aman:
- ✅ File `config.yml` (tidak ada sensitive data)
- ✅ File `index.html` (public)
- ✅ Client ID GitHub (boleh public)

---

## 📚 Resources

- **Decap CMS Documentation:** https://decapcms.org/docs/
- **Configuration Options:** https://decapcms.org/docs/configuration-options/
- **Widgets Reference:** https://decapcms.org/docs/widgets/
- **Astro Content Collections:** https://docs.astro.build/en/guides/content-collections/

---

## 🆘 Support

Jika ada masalah:

1. **Cek dokumentasi:** https://decapcms.org/docs/
2. **GitHub Issues:** https://github.com/decaporg/decap-cms/issues
3. **Community:** https://decapcms.org/community/

---

## ✅ Next Steps

Setelah setup selesai:

1. ✅ Deploy ke Netlify
2. ✅ Setup GitHub OAuth
3. ✅ Test create blog post
4. ✅ Test edit & delete
5. ✅ Test image upload
6. ✅ Verify publishing workflow

---

**Selamat! Dashboard CMS Anda siap digunakan! 🎉**

Sekarang Anda bisa manage blog content tanpa perlu edit file markdown secara manual.

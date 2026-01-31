# 🎓 ID Card Generator (Educational Demo)

A **Next.js (App Router) client-side project** that demonstrates how to generate a **single ID card layout** from user-provided data and export it as an image.  
This project is intended **strictly for educational and UI/UX experimentation purposes**.

> ⚠️ **Disclaimer:**  
> This project is **NOT** intended for producing real, official, or legally valid identification documents.  
> Do **NOT** use this project for impersonation, fraud, or any unlawful activity.

---

## ✨ Features

- Client-side rendering using **Next.js**
- Live preview of an ID card layout
- Editable personal fields (name, address, dates, etc.)
- Passport photo upload with visual noise overlay
- Signature capture via canvas
- Export final card as a **PNG image**
- Uses `html2canvas` to convert HTML → image
- Fully browser-based (no backend required)

---

## 🧠 Educational Goals

This project is designed to help developers learn:

- React state management for form-driven UIs
- Absolute positioning for print-style layouts
- Image processing and canvas rendering in the browser
- Exporting DOM elements as images
- Handling file uploads (images)
- Signature capture using a custom canvas component

---

## 🛠️ Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **html2canvas**

---

## 📁 Project Structure (Simplified)

/app
  └─ page.tsx        # Main UI + ID card preview
/components
  ├─ signBox.tsx     # Signature drawing component
  ├─ passportWithNoise.tsx  # Passport image with noise effect
  ├─ html2PNG.ts     # DOM → PNG export helper
/public
  └─ bg.png          # ID card background image


### `/app/page.tsx`
- Main entry point of the app.
- Contains the form for user input (name, address, DOB, etc.).
- Displays a **live preview** of the ID card.
- Handles the **export to PNG** functionality using `html2canvas`.

### `/components/signBox.tsx`
- Canvas-based signature component.
- Lets the user **draw their signature** directly in the browser.
- Exposes an `onExport` callback to provide the drawn signature as a data URL.

### `/components/passportWithNoise.tsx`
- Renders uploaded passport photos onto the card.
- Adds **visual noise overlay** to simulate ID card security features.
- Supports configurable dimensions and opacity.

### `/components/html2PNG.ts`
- Utility function to convert any DOM element to a PNG image.
- Uses **html2canvas** under the hood.
- Handles automatic download of the generated image.

### `/public/bg.png`
- Background image of the ID card.
- Serves as the static card template on which all elements are layered.



## 🚀 Getting Started
- 1️⃣ Install dependencies
```bash
npm install
```

- 2️⃣ Run the development server
```bash
npm run dev
```

-3️⃣ Open in browser
```bash
http://localhost:3000
```

## 🧾 How It Works

User enters personal details via the form

Data is rendered in real time onto a fixed-size ID card layout

Passport image and signature are layered onto the card

Clicking Generate & Download:

Captures the ID card container

Converts it into a PNG image

Automatically downloads it

## 🖼️ Export Logic

The export is handled by:

- A ref pointing to the ID card container

- A utility function (convertHtmlToPng)

- html2canvas for rendering the DOM into a canvas

- Everything happens entirely on the client.

## 🔒 Legal & Ethical Notice

This project is for:

- ✅ UI prototyping
- ✅ Frontend experimentation
- ✅ Educational demos

It is NOT for:

- ❌ Creating real identification
- ❌ Impersonation
- ❌ Fraud or misuse

You are responsible for how you use this code.

## 📌 Limitations

Single card only (no batch export)

No backend or database

No validation for real-world formats

Not optimized for printing accuracy

## 📜 License

This project is licensed under the [MIT License](LICENSE).  
It is provided for **educational purposes only** and **not for illegal or deceptive use**.

You may modify and learn from it, but do not use it for illegal or deceptive purposes.


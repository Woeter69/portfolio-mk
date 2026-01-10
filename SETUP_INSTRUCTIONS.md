# Portfolio Setup Instructions (Dr. Alex Molecule)

This document records the steps taken to set up the animated 3D intro using `ColorBends` from React Bits.

## 1. Project Initialization
The project was initialized with `shadcn` using default settings:
```bash
npx shadcn@latest init -d
```

## 2. Component Installation (Manual Workaround)
The standard registry command (`npx shadcn@latest add ...`) failed, so the component was installed manually.

1.  **Source:** Cloned the repository `https://github.com/DavidHDev/React-Bits.git`.
2.  **Location:** Located the TypeScript + Tailwind version at `src/ts-tailwind/Backgrounds/ColorBends/ColorBends.tsx`.
3.  **Destination:** Copied the file to `src/components/react-bits/ColorBends.tsx`.

## 3. Dependencies
Installed the required 3D library:
```bash
npm install three @types/three
```

## 4. Component Configuration
The `ColorBends.tsx` component required a directive to work with Next.js App Router.
- **Action:** Added `"use client";` to the very top of `src/components/react-bits/ColorBends.tsx`.

## 5. Implementation
Updated `src/app/page.tsx` to use the component as a background:

```tsx
import ColorBends from "@/components/react-bits/ColorBends";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <ColorBends
          className="h-full w-full"
          colors={["#00c3ff", "#ffff1c", "#ff0099"]}
          speed={0.3}
          warpStrength={2}
          mouseInfluence={0.5}
        />
      </div>
      {/* Content ... */}
    </div>
  );
}
```

## 6. Verification
Ran `npm run build` to ensure no TypeScript errors were present.

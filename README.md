# TRANSPORTALIA

Aplicació creada amb React, Vite, Tailwind CSS, shadcn/ui i PNPM.

---

# Requisits previs

Abans d’executar el projecte necessites instal·lar:

- NVM (Node Version Manager)
- Node.js
- PNPM

---

# 1. Instal·lar NVM

## Linux / macOS

Executa:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

o bé:

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Després reinicia la terminal o executa:

```bash
source ~/.bashrc
```

o:

```bash
source ~/.zshrc
```

Comprova que funciona:

```bash
nvm --version
```

---

## Windows

Instal·la **NVM for Windows**:

[NVM for Windows](https://github.com/coreybutler/nvm-windows/releases?utm_source=chatgpt.com)

Descarrega:

```txt
nvm-setup.exe
```

Instal·la’l i reinicia la terminal.

Comprova:

```bash
nvm version
```

---

# 2. Instal·lar Node.js amb NVM

Instal·la la versió LTS recomanada:

```bash
nvm install --lts
```

Utilitza-la:

```bash
nvm use --lts
```

Comprova:

```bash
node -v
```

També pots comprovar npm:

```bash
npm -v
```

---

# 3. Instal·lar PNPM

Instal·la PNPM globalment:

```bash
npm install -g pnpm
```

Comprova:

```bash
pnpm -v
```

---

# 4. Obrir el projecte

Obre la terminal dins la carpeta del projecte.

---

# 5. Instal·lar dependències

```bash
pnpm install
```

---

# 6. Executar el projecte

```bash
pnpm dev
```

Obre al navegador:

```txt
http://localhost:5173
```

---

# Build de producció

Crear build:

```bash
pnpm build
```

Previsualitzar:

```bash
pnpm preview
```

---

# Tecnologies utilitzades

- React
- Vite
- Tailwind CSS
- shadcn/ui
- PNPM

---

# Estructura del projecte

```txt
src/
components/
components/ui/
pages/
public/
```

---

# Notes

- Els components de shadcn/ui es troben a `components/ui`
- Tailwind CSS ja està configurat
- El projecte utilitza PNPM com a gestor de paquets

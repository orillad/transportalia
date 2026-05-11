# TRANSPORTALIA - Aplicació de Gestió de Transports

Aplicació web interactiva per gestionar transports, conductors i camions. Construïda amb React, Tailwind CSS i shadcn/ui.

## 🚀 Característiques

### Pantalles Principals

1. **Inici** (`/`)
   - Pàgina d'aterratge amb logo i imatge hero
   - Selector d'idioma (Català, Castellà, Anglès)
   - Botó d'accés

2. **Login** (`/login`)
   - Formulari d'inici de sessió amb email i contrasenya
   - Validació mock (email: `m@example.com`, password: `password123`)
   - Missatges d'error
   - Link per recuperar contrasenya

3. **Recuperar Contrasenya** (`/recuperar-contrasenya`)
   - Formulari amb camp DNI
   - Alertes de validació (èxit, error de reconeixement, error en el canvi)
   - DNI vàlid de prova: `15566965A`

4. **Transports d'Avui** (`/transports-avui`)
   - Taula amb tots els transports del dia
   - Estadístiques: Programats, Iniciats, Finalitzats, Cancel·lats
   - Filtres i cerca

5. **Assignacions** (`/assignacions`)
   - Assignar conductors a camions
   - Llistes interactives de conductors i camions disponibles
   - Pestanya per desassignar conductors

6. **Desassignacions** (`/desassignacions`)
   - Veure conductors assignats
   - Desassignar conductors de camions
   - Missatges de confirmació

7. **Transports** (`/transports`)
   - Crear nous transports
   - Seleccionar ruta, data, dimensions
   - Grid de camions disponibles amb imatges

8. **Desbloqueig** (`/desbloqueig`)
   - Llista d'usuaris bloquejats
   - Desbloquejar usuaris amb un clic

9. **Usuari** (`/usuari`)
   - Perfil d'usuari
   - Editar dades personals
   - Canviar contrasenya

## 🎨 Interactivitat

- ✅ Navegació entre pantalles amb React Router
- ✅ Formularis interactius amb validació
- ✅ Dropdowns i menús desplegables
- ✅ Modals i alertes
- ✅ Tabs i pestanyes
- ✅ Hover effects
- ✅ Selecció múltiple d'elements
- ✅ Estats visuals (success, error, info)

## 🛠️ Tecnologies

- **React 18** - Framework principal
- **React Router 7** - Navegació
- **Tailwind CSS 4** - Estils
- **shadcn/ui** - Components UI
- **TypeScript** - Tipat estàtic
- **Vite** - Build tool

## 📁 Estructura del Projecte

```
/src
  /app
    /components
      - Header.tsx          # Capçalera amb logo i idioma
      - Sidebar.tsx         # Menu lateral de navegació
      - UserMenu.tsx        # Menu d'usuari
      /ui                   # Components de shadcn/ui
    /pages
      - HomePage.tsx
      - LoginPage.tsx
      - RecuperarContrasenyaPage.tsx
      - TransportsAvuiPage.tsx
      - AssignacionsPage.tsx
      - DesassignacionsPage.tsx
      - TransportsPage.tsx
      - DesbloqueigPage.tsx
      - UsuariPage.tsx
    /mock
      - data.ts             # Dades mock
    - routes.tsx            # Configuració de rutes
    - App.tsx               # Component principal
  /imports                  # Assets de Figma
  /styles                   # Estils globals
```

## 🎯 Dades Mock

### Usuaris de prova
- Email: `m@example.com` / Password: `password123`
- DNI vàlid: `15566965A`

### Conductors
- Anna Martí Soler (33333333 C)
- Oriol Lladó Real (11111111 A)
- Marc Garcia Puig (22222222 B)
- Joan Puig Font (44444444 D)

### Camions
- Múltiples camions amb diferents capacitats i dimensions

### Rutes
- BCN - MAD (Barcelona - Madrid)
- SEV - BIL (Sevilla - Bilbao)
- ZAR - BCN (Zaragoza - Barcelona)
- MAD - SEV (Madrid - Sevilla)

## 🚦 Com usar

1. **Pàgina d'inici**: Fes clic a "Accedir" per anar al login
2. **Login**: Usa les credencials de prova per accedir
3. **Dashboard**: Navega pel menú lateral per accedir a les diferents seccions
4. **Assignacions**: Selecciona un conductor i un camió, després clica "Assignar"
5. **Transports**: Omple el formulari i cerca camions disponibles
6. **Perfil**: Edita les teves dades des del menú d'usuari

## ⚡ Funcionalitat

- **NO** hi ha backend real
- **NO** hi ha autenticació real
- **NO** es guarden dades (tot és temporal amb useState)
- **SÍ** hi ha validació visual
- **SÍ** hi ha interactivitat completa
- **SÍ** és navegable i responsive

## 🎨 Paleta de Colors

- **Primary**: `#133e6f` (Blau fosc)
- **Secondary**: `#FC8D24` / `#FB8D24` (Taronja)
- **Success**: `#22c55e` (Verd)
- **Error**: `#dc2626` (Vermell)
- **Warning**: `#f97316` (Taronja)

## 📱 Responsive

L'aplicació està optimitzada per:
- Desktop (1440px+)
- Tablet (768px - 1439px)
- Mobile (< 768px)

---

**Nota**: Aquest és un projecte demo sense funcionalitat backend. Totes les dades són mock i no es persisteixen.

# TRANSPORTALIA

Aplicació frontend de gestió de transports construïda amb React i Vite. El projecte simula un entorn intern per consultar transports, gestionar assignacions i accedir a dades d'usuari mitjançant dades mock.

## Tecnologies

- React 18
- React Router 7
- Vite 6
- Tailwind CSS 4
- PNPM
- shadcn/ui

## Requisits

Abans d'executar el projecte necessites:

- Node.js LTS
- PNPM

Si no tens `pnpm` instal·lat:

```bash
npm install -g pnpm
```

## Instal·lació

1. Clona o descarrega el projecte.
2. Obre una terminal a l'arrel del repositori.
3. Instal·la les dependències:

```bash
pnpm install
```

## Execució en desenvolupament

Per arrencar el projecte en local:

```bash
pnpm dev
```

Per defecte quedarà disponible a:

```txt
http://localhost:5173
```

## Build de producció

Per generar la build:

```bash
pnpm build
```

La sortida es genera a la carpeta `dist/`.

Per previsualitzar la build localment:

```bash
pnpm exec vite preview
```

## Credencials per defecte

El projecte utilitza autenticació mock. Per accedir al login de demo:

- Email: `test@test.com`
- Contrasenya: `1234`

Per provar la pantalla de recuperació de contrasenya:

- DNI vàlid de demo: `15566965A`

## Comportament de la demo

- No hi ha backend real ni base de dades.
- El login valida contra dades mock locals.
- Les dades de transports, camions, rutes i usuaris són simulades.
- Els canvis no tenen persistència real.

## Scripts útils

- `pnpm dev`: arrenca el servidor de desenvolupament
- `pnpm build`: genera la build de producció
- `pnpm exec vite preview`: obre una previsualització de la build

## Desplegament

El projecte està preparat per publicar-se com a web estàtica. Si es desplega a GitHub Pages, les rutes funcionen amb hash router, per exemple:

```txt
/#/login
```

## Estructura principal

```txt
src/
  app/
    components/
    hooks/
    mock/
    pages/
```

## Notes

- Les credencials anteriors són només per a la demo..
- La lògica d'accés no és segura i no s'ha d'utilitzar en producció.

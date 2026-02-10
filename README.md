# MonitorPreco

MonitorPreco is an Angular-based application that lets users register products and set price alerts directly in the browser. Alerts are stored locally, enabling quick prototyping and demos without backend dependencies.

## Contact
- Email: peh.costa11@gmail.com
- Instagram: [@phcostat](https://instagram.com/phcostat)
- GitHub: [@phcostat](https://github.com/phcostat)
  

## Features
- Register products with desired price thresholds.
- Prevent duplicate alerts per product using client-side validation.
- Persist alerts with `localStorage` for instant feedback.
- Simple CRUD workflow that showcases reusable Angular services.

## Tech Stack
- Angular
- TypeScript
- HTML / SCSS
- LocalStorage API

## Getting Started
```bash
# install dependencies
npm install

# run dev server
ng serve -o
```

## Lint & Tests
```bash
npm run lint
npm test
```

## Project Structure
```
src/
 ├─ app/
 │   ├─ components/    // UI components (forms, lists, etc.)
 │   ├─ model/         // Domain models (e.g., Alerta)
 │   └─ services/      // Business logic & storage (e.g., alerta.service.ts)
 └─ assets/            // Static assets
```

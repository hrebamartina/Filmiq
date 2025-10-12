<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# Filmiq
Персональний веб-додаток для відстеження фільмів.
Детальний опис проекту та фінальний дизайн у Figma:
Переглянути дизайн можна за посиланням:   https://www.figma.com/design/JMgnFjIGZpBE1L47NAxQVS/Untitled?node-id=0-1&t=YqLnSwhhjHyqWbvy-1

1. Аутентифікація 
Функціональність:
Користувач може створити обліковий запис або увійти, щоб користуватися сайтом.
Аутентифікація через електронну пошту та пароль.
Logout: можливість вийти з облікового запису (кнопка доступна у шапці сайту.

3. Профіль користувача
Функціональність:
Перегляд основної інформації (аватар, біо).
Керування особистими списками фільмів:
Watchlist – фільми, які користувач планує подивитися.
Favorites – улюблені фільми.
Відображення активності користувача:
Кількість фільмів, доданих цього місяця.
Загальна кількість доданих фільмів.
Улюблений жанр.
Кількість написаних відгуків.
Кнопка Random Movie: після натискання користувач переходить на сторінку Random Movie, де програма обирає випадковий фільм на основі жанру, вибраного користувачем.

4. Головна сторінка (Home)
Функціональність:
Відображення популярних фільмів за жанрами у вигляді слайдерів:
 Action, Comedy, Horror, Romance, Science Fiction, Drama, Adventure.
У кожному слайдері показуються найпопулярніші фільми відповідного жанру.
Натиснувши на конкретний фільм, користувач переходить на сторінку з детальною інформацією Movie Details.
Поле пошуку: користувач вводить назву фільму й отримує результати через TMDb API.
Кнопка Random Movie – аналогічно профілю, веде на сторінку Random Movie.

5. Сторінка фільму (MovieDetails)
Функціональність:
Детальна інформація про фільм: постер, опис, рік випуску, жанр.
Кнопки: Add to Watchlist, Add to Favorites.
Можливість написати власний відгук у модальному вікні.
Перегляд Community Reviews (відгуків спільноти) через TMDb API.
Список акторів (Cast) та ключових учасників знімальної групи (Crew).

6. Випадковий фільм (Random Movie)
Функціональність:
Користувач обирає жанр у випадаючому списку.
Через TMDb API отримується список фільмів цього жанру.
Випадковим чином обирається один фільм і відображається на сторінці.
Якщо фільм не підходить, користувач може натиснути кнопку Try another.
Якщо фільм подобається – натискає кнопку Add to Watchlist.


>>>>>>> 8d34301 (Create README.md)

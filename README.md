
# **ECOAPETITE: Comida excelente a un precio decente** 🍽️ 

## **Descripción del Proyecto**
**ECOAPETITE** es la solución innovadora que transforma la manera en que los restaurantes gestionan sus excedentes y los consumidores acceden a comida de calidad a precios reducidos. A través de nuestra plataforma, los establecimientos pueden vender platillos frescos que no fueron vendidos en el transcurso de su comercialización, pero que aún están en óptimas condiciones, ofreciendo así una alternativa deliciosa, económica y sostenible para todos.

### 🌱 **Un modelo de consumo inteligente y responsable**  
En **ECOAPETITE**, conectamos a restaurantes con usuarios que buscan opciones asequibles sin comprometer la calidad, reduciendo el desperdicio alimentario y fomentando un consumo más consciente. Con nuestra integración con plataformas de delivery como **Rappi** y nuestros planes de suscripción flexibles, brindamos beneficios tanto a los negocios como a los consumidores, generando un impacto positivo en la economía y en el medio ambiente.

### 🚀 **Beneficios para todos**  
✅ **Usuarios**: Comida de calidad a precios reducidos, acceso a una variedad de opciones gastronómicas y la satisfacción de contribuir a una causa social.  
✅ **Restaurantes**: Recuperación de costos, reducción de pérdidas y atracción de nuevos clientes con una mayor visibilidad en la plataforma.  
✅ **Planeta**: Menos desperdicio de alimentos, menor huella de carbono y una cultura de consumo más sostenible.  

Cada compra en **ECOAPETITE** es un paso hacia un futuro más sostenible. **Tú ahorras, los restaurantes recuperan costos y el planeta gana.** 🌍✨  


---

## **Frontend de Ecoapetitte**

A continuación, se describe la estructura, funcionalidades y el estado actual del frontend de **ECOAPETITE**.

---

## **Tecnologías Utilizadas**

El frontend de **ECOAPETITE** está desarrollado con las siguientes tecnologías:
- **React.js** como librería principal para la construcción de la interfaz.
- **Vite** como entorno de desarrollo rápido.
- **React Router** para la gestión de rutas.
- **Axios** para la realización de peticiones HTTP.
- **Tailwind CSS** para el estilizado de la interfaz.
- **Redux Toolkit** para la gestión de estado global.

---

## **Estructura del Proyecto**

El proyecto está organizado de la siguiente manera:

- `src/components/`: Contiene los componentes reutilizables como botones, formularios y modales.
- `src/pages/`: Define las vistas principales, como **Login**, **Dashboard** y **Perfil**.
- `src/services/`: Contiene las funciones para interactuar con la API.
- `src/store/`: Maneja el estado global con **Redux**.
- `src/utils/`: Contiene funciones auxiliares como validaciones y formateadores.

---

## **Estado Actual de la Implementación**

### **Funcionalidades ya implementadas**

✔️ **Autenticación básica** con JWT (login y logout).  
✔️ **Gestión de rutas protegidas** con React Router.  
✔️ **Interfaz de usuario (UI)** inicial con componentes estilizados en **Tailwind CSS**.  
✔️ **Peticiones HTTP** a la API con **Axios**.  
✔️ **Gestión de estado** con **Redux Toolkit**.  
✔️ **Manejo de roles y permisos** de usuario.  
✔️ **Persistencia del estado de autenticación**.



## React + TypeScript + Vite

Esta plantilla proporciona una configuración mínima para hacer funcionar React con Vite, incluyendo recarga en caliente (HMR) y algunas reglas de ESLint.

Actualmente, hay dos plugins oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) usa [Babel](https://babeljs.io/) para Fast Refresh  
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) usa [SWC](https://swc.rs/) para Fast Refresh

## Ampliar la configuración de ESLint

Si estás desarrollando una aplicación para producción, se recomienda actualizar la configuración para habilitar reglas de lint que reconozcan los tipos:

```js
export default tseslint.config({
  extends: [
    // Elimina ...tseslint.configs.recommended y reemplázalo con esto
    ...tseslint.configs.recommendedTypeChecked,
    // Alternativamente, usa esto para reglas más estrictas
    ...tseslint.configs.strictTypeChecked,
    // Opcionalmente, agrega esto para reglas de estilo
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // otras opciones...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

También puedes instalar [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) y [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) para reglas de lint específicas de React:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Agrega los plugins react-x y react-dom
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // otras reglas...
    // Habilita sus reglas recomendadas para TypeScript
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```



const req = require.context('.', true, /\.\/[^/]+\/[^/]+\/index\.js$/)

req.keys().forEach((key) => {
  const componentName = key.replace(/^.+\/([^/]+)\/index\.js/, '$1')
  module.exports[componentName] = req(key).default
})

// export { default as Card } from './molecules/Card';

// export { default as CardList } from './organisms/CardList';
// export { default as Header } from './organisms/Header';
// export { default as Footer } from './organisms/Footer';
// export { default as LoginForm } from './organisms/LoginForm';

// export { default as LoginTemplate } from './templates/LoginTemplate';
// export { default as PageTemplate } from './templates/PageTemplate';

// export { default as HomePage } from './pages/HomePage';
// export { default as LoginPage } from './pages/LoginPage';

import React from 'react';
import ArticleSearch from './components/ArticleSearch';

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#DC143C] text-white p-4 text-center">
        <h1 className="text-2xl">News Search By Ahmad Hassan</h1>
      </header>
      <main className="p-4">
        <ArticleSearch />
      </main>
    </div>
  );
};

export default App;

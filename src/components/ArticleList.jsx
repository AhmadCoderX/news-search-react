import React from "react";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <div
          key={index}
          className="border bg-white rounded-[0.8vw] shadow-md p-4 flex flex-col items-center justify-between"
        >
          <div className="w-full flex flex-col items-center">
            <h2 className="font-bold text-[3.5vw] sm:text-[1.6vw] md:text-[1.2vw]">{article.title}</h2>
            <p className="leading-[4vw] sm:leading-[2vw] md:leading-5 mt-2 text-[3vw] sm:text-[1.3vw] md:text-[1vw]">{article.description}</p>
          </div>
          <div className="w-full flex items-center justify-between text-[3vw] sm:text-[1.3vw] md:text-[1vw] mt-1">
            <p className="text-gray-400 italic">{article?.source?.name}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DC143C]"
            >
              Read more
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;

import React from "react";

const Filters = ({
  keyword,
  handleKeywordChange,
  fetchArticles,
  filters,
  handleFilterChange,
  categories,
  sources,
}) => {
  return (
    <div className="w-full h-fit mb-4">
      <div className="w-full sm:w-[60%] flex items-center justify-center mx-auto">
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Search articles"
          className="border py-[2vw] px-[2.3vw] sm:py-[1vw] sm:px-[1.3vw] rounded-[1.8vw] sm:rounded-[0.8vw] flex-[80%] outline-none"
        />
        <button onClick={fetchArticles} className="bg-[#DC143C] text-white rounded-[0.8vw] -ml-10 py-[2.1vw] px-[2.3vw] sm:py-[1.05vw] sm:px-[1.3vw] flex-[8%]">
          Search
        </button>
      </div>
      <div className="w-full sm:w-[60%] flex flex-col sm:flex-row items-stretch justify-center gap-2 py-2 mx-auto text-[3vw] sm:text-[1.4vw] md:text-[1.1vw]">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="border px-[1.9vw] sm:px-[0.6vw] py-[0.8vw] sm:py-[0.2vw] rounded-[1.8vw] sm:rounded-[0.8vw] "
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border px-[1.9vw] sm:px-[0.6vw] py-[0.8vw] sm:py-[0.2vw] rounded-[1.8vw] sm:rounded-[0.8vw]"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <select
          name="source"
          value={filters.source}
          onChange={handleFilterChange}
          className="border px-[1.9vw] sm:px-[0.6vw] py-[0.8vw] sm:py-[0.2vw] rounded-[1.8vw] sm:rounded-[0.8vw]"
        >
          <option value="">All Sources</option>
          {sources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;

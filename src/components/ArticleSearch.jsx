import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import ArticleList from "./ArticleList";
import Filters from "./Filters";
import Pagination from "./Pagination";

const categories = [
  { value: "", label: "All" },
  { value: "business", label: "Business" },
  { value: "entertainment", label: "Entertainment" },
  { value: "general", label: "General" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
];

const ArticleSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    category: "",
    source: "",
  });
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [sources, setSources] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);

  useEffect(() => {
    fetchArticles();
  }, [filters]);

  useEffect(() => {
    updateSources();
  }, [articles]);

  const fetchArticles = async () => {
    if (keyword === "") {
      return;
    }
    setLoading(true);
    setNoResults(false);

    let url = "https://newsapi.org/v2/";
    let params = {};

    if (filters.category) {
      url += "top-headlines";
      params = {
        category: filters.category,
        apiKey: "7ad61e5ef88a4e10964839f8b55b03a4",
        q: keyword,
        from: filters.date,
      };
    } else {
      url += "everything";
      params = {
        q: keyword,
        apiKey: "7ad61e5ef88a4e10964839f8b55b03a4",
        from: filters.date,
      };
    }

    try {
      const response = await axios.get(url, { params });
      setArticles(response.data.articles);
      if (response.data.articles.length === 0) {
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching articles", error);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchArticles = useCallback(debounce(fetchArticles, 500), [
    keyword,
    filters,
  ]);

  useEffect(() => {
    debouncedFetchArticles();
    return debouncedFetchArticles.cancel;
  }, [keyword, debouncedFetchArticles]);

  const updateSources = () => {
    if (keyword === "") {
      return;
    }
    const uniqueSources = [
      ...new Set(articles.map((article) => article.source.name)),
    ];
    setSources(uniqueSources);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredArticles = articles.filter((article) => {
    if (filters.source && article.source.name !== filters.source) {
      return false;
    }
    return true;
  });

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  return (
    <div className="container mx-auto p-4">
      <Filters
        keyword={keyword}
        handleKeywordChange={handleKeywordChange}
        fetchArticles={fetchArticles}
        filters={filters}
        handleFilterChange={handleFilterChange}
        categories={categories}
        sources={sources}
      />
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          {keyword === "" ? (
            <div className="text-center">Search Something ...</div>
          ) : noResults ? (
            <div className="text-center">No results found</div>
          ) : (
            <>
              <ArticleList articles={currentArticles} />
              <Pagination
                articlesPerPage={articlesPerPage}
                totalArticles={filteredArticles.length}
                paginate={handlePageChange}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleSearch;

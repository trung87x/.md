const Heading = ({ level = "h2", children, className = "" }) => {
  const Tag = level;
  const styles = {
    h1: "text-4xl font-extrabold text-gray-900 mb-6",
    h2: "text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4",
    h3: "text-xl font-semibold text-gray-800 mb-3",
  };

  return <Tag className={`${styles[level]} ${className}`}>{children}</Tag>;
};

export default Heading;

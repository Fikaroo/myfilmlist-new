import { useAppSelector } from "../../state/hooks";
import Error from "../ErrorData/Error";
import MovieItemLoading from "../Loading/MovieItemLoading";
import MovieItem from "./MovieItem";

const Movies = () => {
  const { data, error, loading, response } = useAppSelector(
    (state) => state.movies
  );
  return !response ? null : loading ? (
    <div className="grid grid-cols-3 gap-4 my-12">
      <MovieItemLoading />
    </div>
  ) : error ? (
    <Error />
  ) : (
    <div className="grid grid-cols-3 gap-4 my-12">
      {data.map((filmData) => (
        <MovieItem key={filmData.id} filmData={filmData} />
      ))}
    </div>
  );
};

export default Movies;

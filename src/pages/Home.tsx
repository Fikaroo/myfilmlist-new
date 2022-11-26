import { useEffect } from "react";
import Nav from "../components/Layout/Nav";
import Movies from "../components/MovieList/Movies";
import HeroSlider from "../components/Slider/HeroSlider";
import { useAppDispatch } from "../state/hooks";
import { getPopularData } from "../state/slices/PopularSlice";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPopularData());
  }, []);

  return (
    <div>
      <Nav />
      <div className="pt-24">
        <HeroSlider />
        <Movies />
      </div>
    </div>
  );
};

export default Home;

import WeatherPage from './WeatherPage';
import Spline from '@splinetool/react-spline';

function App() {
  return (
    <div className="App">
      <Spline
        scene="https://prod.spline.design/UTN7Gt-IjMLjsjHs/scene.splinecode"
        className="svg"
      />
      <WeatherPage />
    </div>
  );
}

export default App;

import styles from "./App.module.css";
import Form from "./components/Form/Form";
import useWeather from "./components/hooks/useWeather";

function App() {

  const { fetchWeather } = useWeather()
  console.log(import.meta.env)
  return (
    <>
      <header className={styles.header}>
        <p>Hola desde Header</p>
      </header>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form 
          fetchWeather={fetchWeather}
        />
        <p>2</p>
      </div>
    </>
  );
}

export default App;

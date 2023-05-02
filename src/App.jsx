import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

// Components
import Meal from "./components/Meal";
import logo from "./assets/logo.png";

// Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);

function App() {
  // State qui me sert à stockrer la data
  const [data, setData] = useState();
  // State qui me sert à savoir si la data a été récupérée
  const [isLoading, setIsLoading] = useState(true);

  // La callback de mon useEffect va être appelée une seule fois au premier rendu de mon composant
  useEffect(() => {
    // Je déclare la fonction qui fait la requête (dans le seul but de la rendre async, car je ,ne pux pas le faire sur la callback du useEffect)
    const fetchData = async () => {
      // Ma requête peut échouer docn je la place dans un try catch
      try {
        const response = await axios.get("http://localhost:3200/");
        // Je stocke le résultat dans data
        setData(response.data);
        // Je fais paser isLoading à false
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    // J'appelle ma fonction
    fetchData();
  }, []);

  // Tant que isLoading vaut true, j'affiche un indicateur de chargement
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    // sinon j'affiche le contenu de ma page
    <div>
      <header>
        <div className="container">
          <img src={logo} alt="" />
        </div>
      </header>
      <section className="hero">
        {" "}
        <div className="container">
          <div>
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img src={data.restaurant.picture} alt="tartines" />
        </div>
      </section>
      <main>
        <div className="container">
          <section className="col-left">
            {/* Je parcours le tableau categories, chacuns des objets de ce tableau sera mentionnable sous le nom category */}
            {data.categories.map((category) => {
              // Si ma catégorie contient des plats, j'affiche une catégorie
              if (category.meals.length !== 0) {
                return (
                  <div key={category.name}>
                    {/* J'affiche le titre de ma categorie */}
                    <h2>{category.name}</h2>
                    <div className="meals-container">
                      {/* Je parcours le tableau meals contenu dans la clef meals de mon objet représentant une categorie */}
                      {category.meals.map((meal) => {
                        // J'affiche un composant Meal pour chaque objet dans le tableau meals (chaque objet représentant un plat)
                        // Je donne en props cet objet à mon composant
                        return <Meal key={meal.id} meal={meal} />;
                      })}
                    </div>
                  </div>
                );
                // Sinon rien
              } else {
                return null;
              }
            })}
          </section>
          <section className="col-right"></section>
        </div>
      </main>
    </div>
  );
}

export default App;

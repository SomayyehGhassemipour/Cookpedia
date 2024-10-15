import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Recipe } from "../model/Recipe";
import { auth } from "../sevices/firebase/config";
import { Loading } from "../sharedComponents/Loading";
import { Header } from "../sharedComponents/Header";
import { CardBody } from "../sharedComponents/card/CardBody";
import { RecipeList } from "../components/recipe/RecipeList";
import MESSAGES from "../data/message.json";
import { getAllBookmarksByUserID } from "../sevices/recipie/BookmarkService";
import { getRecipesBookmarked } from "../helpers/getRecipesData";
import { Button } from "../sharedComponents/Button";
import { useNavigate } from "react-router-dom";
import { Icon } from "../sharedComponents/Icon";

export const MyBookmarksPage = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId: string = user.uid;
        try {
          const bookmarks = await getAllBookmarksByUserID(userId);
          let bookmarkedRecipes = getRecipesBookmarked(bookmarks);
          try {
            setRecipes(await bookmarkedRecipes);
          } catch (error: any) {
            console.log(MESSAGES.ERROR_IN_READING_RECIPIES_OF_USER + error);
          }
        } catch (error: any) {
          console.log(MESSAGES.ERROR_IN_READING_BOOKMARKS_OF_USER + error);
        }
      } else {
        console.log(MESSAGES.NO_LOGGED_IN_USER);
      }
    });
    return () => unsubscribe();
  }, []);
  if (!recipes) return <Loading />;
  return (
    <>
      <Header>
        <div className="flex-row-justify-start ">
          <Button
            data_type="container"
            data_bg="transparent"
            clickHandler={() => navigate(-1)}
          >
            <Icon name="back" size="lg" />
          </Button>

          <h2>Bookmarks</h2>
        </div>
      </Header>
      <CardBody>
        <RecipeList recipes={recipes} />
      </CardBody>
    </>
  );
};
